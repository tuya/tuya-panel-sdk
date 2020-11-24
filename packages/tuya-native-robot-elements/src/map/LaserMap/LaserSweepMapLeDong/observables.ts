import { Observable, Scheduler } from 'rxjs';
import {
  filter,
  map,
  concatMap,
  scan,
  withLatestFrom,
  distinctUntilChanged,
  combineLatest,
} from 'rxjs/operators';

import _isEmpty from 'lodash/isEmpty';
import _isEqual from 'lodash/isEqual';
import _zipObject from 'lodash/zipObject';
import { TYSdk } from '@tuya-rn/tuya-native-components';

import { createDpValue$ } from '../../../utils/RxUtils';
import logger from '../../../utils/LoggerUtils';
import { handleError, isNotError, extractError } from '../../../utils/FunctionUtils';
import { OSSRx } from '../../../utils/MapServiceChannelUtils';
import { atHexToString } from '../../../utils/StringsUtils';
import path from '../../../protocol/ledong/path';

import fileUtil from './utils/ParseMapFileUtil';
import panelMapConfig, { ILaserMapPanelConfig } from './constant/panelMapConfig';

let canUpdateMap = true;

TYSdk.event.on('MapShouldUninterruptibleSleep', () => {
  canUpdateMap = false;
});

TYSdk.event.on('MapCanRunnable', () => {
  canUpdateMap = true;
  
});

function isSupportIncrementsPath(code: string) {
  let isExist;
  try {
    isExist = TYSdk.device.checkDpExist(code);
  } catch (error) {
    isExist = false;
  }
  return isExist;
}

/**
 * 创建订阅dp点数据
 *
 */
function createDpDataChannel$(dpCodeArr: string[]) {
  const dpsChannel$ = dpCodeArr.map((code: string) => createDpValue$(code));

  // 数据格式处理为 _.zipObject(['a', 'b'], [1, 2]);
  // => { 'a': 1, 'b': 2 }
  const dpDataChannel$ = Observable.combineLatest(...dpsChannel$).pipe(
    map(v => _zipObject(dpCodeArr, v)),
    distinctUntilChanged((pre, cur) => _isEqual(pre, cur))
  ).observeOn(Scheduler.animationFrame);

  return dpDataChannel$;
}

function createBgAndPathObservable(
  opts: { mapConfig: ILaserMapPanelConfig } = { mapConfig: panelMapConfig }
) {
  // const fileUtil = ParseMapFileUtil;
  const ossRx = new OSSRx();
  const {
    config: { dpCodesEnum },
  } = fileUtil;

  const { mapFileData$: mapFileOriginData$, fullPathFileData$ } = ossRx.createRx();

  const mapFileData$ = mapFileOriginData$
    .filter(() => canUpdateMap)
    .pipe(
      concatMap((value: string) => {
        return Observable.fromPromise(
          fileUtil.decodeMapFile(value, { mapConfig: opts.mapConfig })
        ).catch(extractError);
      }),
      filter(isNotError)
    )
    .observeOn(Scheduler.animationFrame)
    .share();

  mapFileData$.subscribe(fileUtil.incrementSubject, handleError);

  mapFileData$.take(1).subscribe(() => {
    fileUtil.requestZoneData(); // 在地图解析完成之后，再访问存盘区域
  }, handleError);

  // 增量
  const pathIncrementData$ = createDpValue$(dpCodesEnum.pathData, false, { distinct: true })
    .pipe(map((value: string) => atHexToString(value)))
    // .throttleTime(2000);

  // 增量+全量
  let fullAndIncrements$ = Observable.merge(fullPathFileData$, pathIncrementData$)
    .pipe(
      filter(() => canUpdateMap),
      map((value: string) => path.decodeToOrigin(value)),
      filter((value: any) => !_isEmpty(value)),
      withLatestFrom(mapFileData$),
      
      scan(
        ([accPath, preMap], [curPath, curMap], index) => [
          fileUtil.accumulatePath(accPath, curPath),
          curMap,
        ],
        [{
          posArray: [],
          hasPathInfo: false,
          pathID: 0,
          totalPoints: 0,
          startPos: 0,
          pointCounts: 0,
        }, {}]
      ),
      distinctUntilChanged(([prePath, preMap], [curPath, curMap]) => prePath.pointCounts === curPath.pointCounts),
      map(([path, map], index) => {
        return fileUtil.decodePathFile(path, { mapPathId: map.pathId });
      }),
      filter((value: any) => !_isEmpty(value))
    )
    .do(v => {
      logger.success('增量+全量', v);
    })
    .observeOn(Scheduler.animationFrame)
    .share();

  // fullAndIncrements$ = Observable.empty();

  fullAndIncrements$.subscribe(fileUtil.incrementSubject, handleError);

  // pathIncrementData$.subscribe(v => {
  //   logger.info('dp路径', v);
  // });
  // fullPathFileData$.subscribe(v => {
  //   logger.info('oss路径', v);
  // });
  // fullAndIncrements$.subscribe(v => {
  //   logger.info('增量+全量', v);
  // });

  const dpDataChannel$ = createDpDataChannel$([
    dpCodesEnum.robotStatus,
    dpCodesEnum.cleanMode,
  ]).share();

  const requestIncrement$ = isSupportIncrementsPath(dpCodesEnum.pathData)
    ? mapFileData$
        .first()
        .concatMapTo(Observable.timer(0, 2000))
        .pipe(
          // map(value => {
          //   logger.info('requestIncrement$ timer', value);
          //   return value;
          // }),
          withLatestFrom(
            Observable.of({
              posArray: [],
              hasPathInfo: false,
              pathID: 0,
              totalPoints: 0,
              startPos: 0,
              pointCounts: 0,
            }).concat(fullAndIncrements$),
            dpDataChannel$
          ),
          filter(() => canUpdateMap),
          filter(([timer, curPath, dpData]) => {
            if (timer === 0) return true; // 第一次必发
            if (_isEmpty(curPath)) return true;
            return path.filterRequestWithRobotStatus(curPath, dpData[dpCodesEnum.robotStatus]);
          }),

          map(([, curPath, dpData]) => {
            return curPath.pointCounts || 0;
          }),
          // map(value => {
          //   logger.info('requestIncrement$ value', value);
          //   return value;
          // })
          filter(d => d !== undefined)
        ).observeOn(Scheduler.animationFrame)
    : Observable.empty();

  requestIncrement$.subscribe((start: any) => {
    logger.info(`下发请求路径${start}`);
    fileUtil.requestPathByStart({ code: dpCodesEnum.pathData, start });
    fileUtil.incrementSubject.next({ requestStart: start });
  }, handleError);

  const commandRowChannel$ = createDpValue$(dpCodesEnum.commRaw).pipe(
    map((value: string) => {
      return fileUtil.decodeComplexCmd(atHexToString(value), { mapConfig: opts.mapConfig });
    })
  );

  commandRowChannel$.subscribe(fileUtil.incrementSubject, handleError);
}

function createHistoryFile(
  config: { bucket: any; file: any },
  opts: { mapConfig: ILaserMapPanelConfig } = { mapConfig: panelMapConfig }
) {
  const { bucket, file } = config || {};
  const ossRx = new OSSRx();
  const { createHistoryDataRx } = ossRx;
  const historyFile$ = createHistoryDataRx({ bucket, file }).pipe(
    concatMap((value: string) => {
      return Observable.fromPromise(
        fileUtil.decodeHistoryFile(value, { mapConfig: opts.mapConfig })
      );
    }),
    map(value => {
      return {
        historyList: {
          key: `${bucket}-${file}`,
          data: JSON.stringify(value),
        },
      };
    })
    // filter(isNotError)
  );
  historyFile$.subscribe(value => {
    console.warn('value', value);

    fileUtil.incrementSubject.next(value);
  }, handleError);
}

export { createBgAndPathObservable, createDpDataChannel$, createHistoryFile };
