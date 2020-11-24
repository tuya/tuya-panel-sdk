import { Observable, Scheduler } from 'rxjs';
import {
  filter,
  map,
  concatMap,
  partition,
  scan,
  pluck,
  withLatestFrom,
  throttleTime,
  distinctUntilChanged,
} from 'rxjs/operators';
import 'rxjs/operators/pluck';
import 'rxjs/operators/filter';
import 'rxjs/operators/map';
import 'rxjs/operators/concatMap';
import 'rxjs/operators/partition';
import 'rxjs/operators/scan';
import 'rxjs/operators/withLatestFrom';

import _ from 'lodash';
import { TYSdk } from '@tuya-rn/tuya-native-components';

import { decodeAreaData, IAreaData } from './command';
import Api from '../../../api';
import { fileTypeMap, IPathPoint } from './constant';
import { TYLaserManager } from '../../../components/Basic/RCTLaserMap';
import { handleError } from '../../../utils/FunctionUtils';
import logger from '../../../utils/LoggerUtils';
import { createDpValue$ } from '../../../utils/RxUtils';

import ParseMapFileUtil, { ParseMapFileUtilConfig } from './utils/ParseMapFileUtil';
import { stringToAtHex, ASCIIToJson } from '../../../utils/StringsUtils';
import { TYRCTGyroMapManager } from '../../../components/Basic/RCTGyroMap';
import { tuyaStreamMessage$ } from '../../../utils/MapServiceChannelUtils/TransferV2';

const pathDataCode = 'path_data';

function isSupportIncrementsPath(code: string = pathDataCode) {
  let isExist;
  try {
    isExist = TYSdk.device.checkDpExist(code);
  } catch (error) {
    isExist = false;
  }
  return isExist;
}

export interface IMapHeader {
  id: number;
  type: number;
  bgWidth: number;
  bgHeight: number;
  originX: number;
  originY: number;
  pileX: number;
  pileY: number;
  originData: string;
  compressAfterLength?: number;
  roomEditable?: boolean;
}

export interface IMapFileData {
  mapData: {
    width: number;
    height: number;
    data: string;
    origin: {
      x: number;
      y: number;
    };
  };
  pilePosition: { x?: number; y?: number };
  header: IMapHeader;
  idColorMap?: any;
}

export interface IPathFileData {
  pathData: IPathPoint[];
  id: number;
  type: number;
  totalCount: number;
  startCount: number;
  currentCount: number;
  isFull: boolean;
  header: {
    id: number;
    type: number;
    totalCount: number;
    originData: string;
  };
}

export interface IPlanPathFileData {}

/**
 *
 * 请求路径
 * @param {string} [pathCode]
 */
function requestPathByStart({ code = pathDataCode, start = 0 } = {}) {
  if (typeof pathDataCode !== 'string') {
    logger.success(`pathDataCode: ${pathDataCode} isn't string`);
    return;
  }
  if (typeof start !== 'number') {
    logger.success(`start: ${start} isn't number `);
    return;
  }

  if (requestPathByStart.isExist === false) return;
  if (requestPathByStart.isExist === undefined) {
    try {
      requestPathByStart.isExist = TYSdk.device.checkDpExist(code);
    } catch (error) {
      requestPathByStart.isExist = false;
    }
    if (requestPathByStart.isExist === false) {
      logger.success(`dp: ${code} isn't exist!!!!`);
      return;
    }
  }

  // logger.success('debugger-requestPathByStart', start);
  const data = {
    cmd: 101,
    data: { startno: start },
  };
  TYSdk.device.putDeviceData({
    [code]: stringToAtHex(JSON.stringify(data)),
    option: 0,
  });
}

export type MapProtocolType = 'tuyaOss' | 'tuyaStream';

export interface StoreConfig {
  protocol?: any;
  mapProtocolType?: MapProtocolType;
}

// 划分为三条channel: bucket, mapFilePath, pathFilePath,
function createBgAndPathObservable(options: ParseMapFileUtilConfig, storeConfig?: StoreConfig) {
  let fileUtil: ParseMapFileUtil;
  if (storeConfig && storeConfig.protocol) {
    fileUtil = storeConfig.protocol;
  } else {
    fileUtil = new ParseMapFileUtil(options);
  }

  const hour = 1000 * 60 * 60;
  const bucket$ = Observable.timer(0, hour).pipe(
    concatMap(() => Observable.fromPromise(Api.updateCloudConfig()))
  );

  const [mapFilePathInitial$, pathFilePathInitial$] = Observable.fromPromise(
    Api.getLatestMapFile()
  ).pipe<string, string>(
    concatMap(({ mapPath, routePath }) => Observable.of(mapPath, routePath)),
    partition((_, idx) => idx === 0)
  );

  // 2. 流程：机器上传阿里云oss，bin文件。包括地图的map.bin和路径route.bin。云端通过mqtt 推送，通知我们文件更新了，给到我们文件的路径，让我们去下载bin文件解析内容。

  // TODO1 通过mqtt获取到机器上传的更新的地图文件和路径文件 { mapPath: 文件url, mapType: 文件类型(地图0，清扫路径1，规划路径2) }。

  const channel$ = Observable.fromEventPattern(
    (handle: any) => {
      TYLaserManager.startConnectSweeperDataChannel();
      TYSdk.DeviceEventEmitter.addListener('laserMqttEventData', handle);
    },
    (handle: any) => {
      TYLaserManager.stopConnectSweeperDataChannel();
      TYSdk.DeviceEventEmitter.removeListener('laserMqttEventData', handle);
    }
  ).share();

  function getMapPath({ mapPath }) {
    return mapPath;
  }
  function createIsEqualType(curType: any) {
    return function isEqual({ mapType }) {
      return curType === mapType;
    };
  }

  /**
   * TODO2 将机器更新的文件路径数据流，拆分为三个独立的数据流：地图数据流，清扫路径流，规划路径流。 如地图文件路径数据流[ path1, path2, path3 ]
   */

  const mapFilePathChannel$ = channel$
    .pipe(filter(createIsEqualType(fileTypeMap.map)), throttleTime(2000), map(getMapPath))
    .share()
    .do(d => {
      logger.success('mapFilePathChannel$ App推送地图文件路径', d);
    });

  const pathFilePathChannel$ = channel$
    .pipe(filter(createIsEqualType(fileTypeMap.path)), throttleTime(2000), map(getMapPath))
    .share()
    .do(d => {
      logger.success('pathFilePathChannel$ App推送路径文件路径', d);
    });

  const planPathFilePathChannel$ = channel$
    .pipe(filter(createIsEqualType(fileTypeMap.planPath)), throttleTime(2000), map(getMapPath))
    .share()
    .do(d => {
      logger.success('planPathFilePathChannel$ App推送规划路径文件路径', d);
    });

  /**
   * TODO3 将三个路径数据流，start开端加入一个起始数据后，并且通过合并bucket$服务端鉴权的key数据流,一小时更新一次, merge成新的路径数据流 [ [ path1, bucket1 ], [ path2, bucket1 ], [ path3, bucket2 ] ]
   */

  const mapFilePath$ = Observable.merge(
    Observable.zip(mapFilePathInitial$, bucket$).take(1),
    mapFilePathChannel$.withLatestFrom(bucket$)
  );

  const pathFilePath$ = Observable.merge(
    Observable.zip(pathFilePathInitial$, bucket$).take(1),
    pathFilePathChannel$.withLatestFrom(bucket$)
  );

  const planPathFilePath$ = Observable.merge(
    Observable.zip(planPathFilePathChannel$, bucket$).take(1),
    planPathFilePathChannel$.withLatestFrom(bucket$)
  );

  /**
   * TODO4 将三个文件路径数据流，[path, bucket]，通过调接口返回一个真实文件的url下载链接数据流. [url1, url2]
   */
  const [mapFileUrl$, fullPathFileUrl$, planPathFileUrl$] = [
    mapFilePath$,
    pathFilePath$,
    planPathFilePath$,
  ].map((path$, idx) =>
    path$
      .pipe(
        concatMap<any, any>(([path, bucket]) =>
          Observable.fromPromise(Api.getCloudFileUrl(bucket, path))
        )
      )
      .share()
      .do(d => {
        if (idx === 0) {
          logger.success('地图文件url链接', d);
        } else if (idx === 1) {
          logger.success('全量路径文件url链接', d);
        } else {
          logger.success('导航线文件url链接', d);
        }
      })
  );

  function isNotError(value: any) {
    if (value instanceof Error) {
      handleError(value);
      return false;
    }
    return true;
  }

  function isValidPath(value: any) {
    if (value instanceof Error) {
      handleError(value);
      return false;
    }
    try {
      return !!(value.id + 1);
    } catch (error) {
      return false;
    }
  }

  function extractError(error: Error) {
    return Observable.of(error);
  }

  /**
   * TODO5 订阅url数据流，去下载文件并且解析成 data数据流。全量地图数据流，全量路径数据流，规划路径数据流
   */
  const tuyaOssMapFileData$: Observable<IMapFileData> = mapFileUrl$
    .pipe(
      concatMap(url => Observable.fromPromise(fileUtil.decodeMapFile(url)).catch(extractError)),
      filter(isNotError)
    )
    .do(d => {
      logger.success('tuyaOss 全量地图数据', d);
    });

  const tuyaStreamState$ = Observable.fromEventPattern<{ state: boolean }>(
    (handle: any) => {
      TYRCTGyroMapManager.startConnect();
      TYSdk.DeviceEventEmitter.addListener('transferState', handle);
    },
    (handle: any) => {
      TYRCTGyroMapManager.disSubscribeDevice();
      TYRCTGyroMapManager.stopConnect();
      TYSdk.DeviceEventEmitter.removeListener('transferState', handle);
    }
  ).pipe(
    filter(({ state }) => {
      if (state) {
        TYRCTGyroMapManager.subscribeDevice();
      }
      return { state };
    })
  );

  const tuyaMqttMessage$ = Observable.merge<{ state: boolean }, { header: string; body: string }>(
    tuyaStreamState$,
    tuyaStreamMessage$
  ).pipe(
    filter<{ header: string; body: string }>(data => {
      return data.state === undefined;
    })
  );

  const [tuyaMqttPathMessage$, tuyaMqttMapMessage$] = tuyaMqttMessage$.partition(({ header }) => {
    const mapId = header.slice(4, 6);
    return mapId === '03';
  });

  // tuyaStreamState$.subscribe(d => {
  //   console.log('tuyaStreamState$', d);
  // });
  // tuyaMqttMessage$.subscribe(data => {
  //   console.log('tuyaStreamMessage$', data.body, data.header.slice(18, 20));
  // });

  // tuyaMqttMapMessage$.subscribe(d => {
  //   console.log('debugger=== tuyaMqttMapMessage', d);
  // });
  // tuyaMqttPathMessage$.subscribe(d => {
  //   console.log('debugger=== tuyaMqttPathMessage$', d);
  // });

  function createMqttPackage(message$: Observable<{ header: string; body: string }>) {
    const body$ = message$.pipe<string, string, string>(
      pluck('body'),
      distinctUntilChanged(),
      filter(body => body !== undefined)
    );

    const close$ = body$.filter(data => data.slice(4, 8) === '0080').delay(200);

    const package$ = body$

      .bufferWhen(() => close$)
      .pipe(
        map(data => {
          if (!data[0]) {
            data.shift();
          }
          if (!data[data.length - 1]) {
            data.pop();
          }
          return data;
        }),
        filter(data => {
          if (!data || !data.length) return false;
          if (data.length === 1) {
            return data[0].slice(0, 8) === '00010080';
          }
          const endHeader = `${_.padStart(data.length.toString(16), 4, '0')}0080`;
          if (
            data[0].slice(0, 8) === '00010010' &&
            data[data.length - 1].slice(0, 8) === endHeader
          ) {
            return true;
          }
          return false;
        }),

        map(data => {
          return data.reduce((pre, cur) => {
            const value = cur.slice(8);
            return pre + value;
          }, '');
        })
      );
    return package$;
  }

  const tuyaStreamMapPackage = createMqttPackage(tuyaMqttMapMessage$).do(d => {
    console.log('debugger==== tuyaStreamMapPackage', d);
  });

  const tuyaStreamPathPackage = createMqttPackage(tuyaMqttPathMessage$).do(d => {
    console.log('debugger==== tuyaStreamPathPackage', d);
  });

  const tuyaStreamMapFileData$: Observable<IMapFileData> = tuyaStreamMapPackage
    .pipe(
      map(data => {
        return fileUtil.parseMapFile(data);
      })
    )
    .do(d => {
      logger.success('tuyaStream 全量地图数据', d);
    });

  const tuyaStreamPathFileData$: Observable<IPathFileData> = tuyaStreamPathPackage
    .pipe(
      map(data => {
        return fileUtil.parsePathFile(data);
      })
    )
    .do(d => {
      logger.success('tuyaStream 全量路径数据', d);
    });
  // const tuyaStreamMapFileData$: Observable<IMapFileData> = Observable.empty();

  const fullPathFileData$: Observable<IPathFileData> = fullPathFileUrl$
    .pipe(
      concatMap(url => Observable.fromPromise(fileUtil.decodePathFile(url)).catch(extractError)),
      filter(isValidPath)
    )
    .do(d => {
      logger.success('全量路径数据', d);
    });

  const planPathFileData$: Observable<IPathFileData> = planPathFileUrl$.pipe(
    concatMap(url =>
      Observable.fromPromise(fileUtil.decodePathFile(url, true)).catch(extractError)
    ),
    filter(isValidPath)
  );

  function convertRobotPathData(data: {
    [x: string]: any;
    pathid: any;
    type: any;
    count: any;
    curnums: any;
    startno: any;
    point: any;
  }) {
    // logger.success('robot increment Json Origin Data', data)
    const {
      pathid: id,
      type,
      count: totalCount,
      curnums: currentCount,
      startno: startCount,
      point,
      ...other
    } = data;
    const convertData = {
      id,
      type,
      totalCount,
      currentCount,
      startCount,
      pathData: fileUtil.handleIncrePoints(point),
      isFull: false,
      ...other,
    };
    // logger.success('robot increment Json Converted Data', convertData)
    return convertData;
  }

  const pathIncrement$ = createDpValue$<string>(pathDataCode, false)
    // .do(d => {
    //   console.warn('debugger=== pathIncre$', d);
    // })
    .pipe(
      filter(value => !!value),
      map(value => {
        // console.warn('debugger=== pathIncreMap', ASCIIToJson(value));
        return ASCIIToJson(value);
      }),

      filter<{ cmd?: any; data?: any }>(
        ({ cmd, data } = {}) => !!(cmd === 102 && data !== undefined && data.point)
      ),
      pluck('data'),
      map(convertRobotPathData)
    )
    .do((d: any) => {
      logger.success('增量路径数据', d);
    }, handleError);

  interface IPathFile {
    id: number;
    totalCount: number;
    pathData: any[];
    type: number;
    startCount: number;
    isFull?: boolean;
    forceUpdate?: boolean | number;
  }

  function fullMergeIncrePath(full$: Observable<IPathFile>, incre$: Observable<IPathFile>) {
    if (!isSupportIncrementsPath()) {
      return full$;
    }
    const fullAndIncre$: Observable<IPathFile> = full$
      .switchMap<IPathFile, IPathFile>(full => Observable.of(full).concat(incre$))
      .do((d: any) => {
        logger.success('全量+增量所有路径的未累加数据流', d);
      }, handleError);
    const fullMergeIncre$ = fullAndIncre$
      .pipe(
        scan<IPathFile, IPathFile>((pre, cur, idx) => {
          console.log('curForceUpdatfde', idx);
          if (idx === 0) {
            return cur;
          }
          // logger.success('prePath', pre);
          // logger.success('curPath', cur);
          const {
            id: curId,
            totalCount: curTotalCount,
            pathData: curPoint,
            forceUpdate: curForceUpdate,
            type: curType,
            startCount: curStartCount,
            isFull: curIsFull,
          } = cur;
          console.log('curForceUpdate', curForceUpdate, curIsFull);
          // 全0，清空路径指令。
          if (curId === 0 && curType === 0 && curTotalCount === 0) {
            return cur;
          }
          const {
            id: preId,
            totalCount: preTotalCount,
            type: preType,
            startCount,
            pathData: prePoint,
          } = pre;

          // 当前增量的startCount 为0，认为
          // if(curStartCount === 0) {
          //   return cur
          // }

          // 维护的路径id，小于当前机器维护id，请求全量。
          // if (preId < curId) {
          //   requestFullPath();
          // }

          // 全量路径,并且id一样，抛弃此条数据，可能是其他App第一次接入引起的，oss上传文件比增量上传慢，造成数据滞后，点回跳。
          // 全量路径 类型 fileTypeMap.path 是标准定义，curType === 0是为了兼容没有增量的全量路径
          // if (curType === fileTypeMap.path || curType === 0) {
          if (curIsFull) {
            // App长时间息屏，增量数据量较大，无法传输，采用全量数据传输，id不变的时候，比较数据长度。
            if (preId === curId && curTotalCount > preTotalCount) {
              return cur;
            }
            // 全量id较大,
            if (curId > preId) {
              return cur;
            }
            // 强制更新地图标示
            if (curForceUpdate) {
              return cur;
            }
            return pre;
          }

          // 增量路径下， 1.id不同，不累加；2.起始点不匹配，不叠加。
          if (
            curType === fileTypeMap.increPath &&
            (preId !== curId || prePoint.length !== curStartCount)
            // (prePoint.length !== curStartCount)
          ) {
            return pre;
          }

          prePoint.push(...curPoint);
          return {
            id: curId,
            type: preType,
            totalCount: curTotalCount,
            currentCount: prePoint.length,
            startCount,
            pathData: [...prePoint],
          };
        }, {} as any)
        // 考虑pre数据优化
      )
      .do((d: any) => {
        logger.success('全量+增量正确的路径数据', d);
      }, handleError);

    return fullMergeIncre$;
  }

  let fullJoinIncrementsData$ = fullMergeIncrePath(fullPathFileData$, pathIncrement$);
  if (storeConfig && storeConfig.mapProtocolType === 'tuyaStream') {
    fullJoinIncrementsData$ = fullMergeIncrePath(tuyaStreamPathFileData$, pathIncrement$);
  }
  const robotStatusCode = 'status';
  const robotStatus$ = createDpValue$<string>(robotStatusCode);

  function createRequestIncrement$(path$: Observable<any>) {
    const increment$ = isSupportIncrementsPath()
      ? Observable.timer(0, 2000).pipe(
          withLatestFrom<number, string>(Observable.of(0).concat(path$.pipe(pluck('totalCount')))),
          pluck<[number, string], number>('1'),
          filter(d => d !== undefined),
          withLatestFrom(robotStatus$)
        )
      : Observable.empty<[number, string]>();
    return increment$;
  }

  const requestIncrement$ = createRequestIncrement$(fullJoinIncrementsData$);

  function createHistoryFile$(config: {
    bucket: string;
    file: string;
    mapLength: number;
    pathLength: number;
  }) {
    const historyFile$ = Observable.fromPromise(fileUtil.decodeHistoryFile(config));
    return historyFile$;
  }

  return {
    mapFileData$:
      storeConfig && storeConfig.mapProtocolType === 'tuyaStream'
        ? tuyaStreamMapFileData$
        : tuyaOssMapFileData$,
    // mapFileData$: Observable.empty(),

    pathFileData$: fullJoinIncrementsData$,
    planPathFileData$,
    createHistoryFile$,
    mapFileUrl$,
    fullPathFileUrl$,
    requestIncrement$,
    fileUtil,
  };
}

function createHeart$(config: { heartCode?: string; heartEnum?: { gmap: string; inmap: string } }) {
  const { heartCode, heartEnum: { gmap, inmap } = {} } = config;

  if (!heartCode) {
    return Observable.empty();
  }
  const isExist = TYSdk.device.checkDpExist(heartCode);
  let inRange;
  if (!isExist) {
    logger.success(`heartCode: ${heartCode} dp is not exist!!!!`);
  } else {
    const { range = [] } = TYSdk.device.getDpSchema(heartCode);
    inRange = range.includes(gmap) && range.includes(inmap);
    if (!inRange) {
      logger.success(
        `heartEnum is't in range. range is ${range}, gmap is ${gmap}, inmap is ${inmap} `
      );
    }
  }

  if (!isExist || !inRange) return Observable.empty();

  const minute = 1000 * 60;

  const getMap$ = Observable.fromPromise(
    TYSdk.device.putDeviceData({
      [heartCode]: gmap,
      option: 0,
    })
  );

  const inMap$ = Observable.timer(0, minute).concatMap(() =>
    Observable.fromPromise(
      TYSdk.device.putDeviceData({
        [heartCode]: inmap,
        option: 0,
      })
    )
  );

  const heart$ = Observable.concat(getMap$, inMap$);

  return heart$;
}

const createAreaDataObservable: (commandCode?: string) => Observable<IAreaData> = (
  commandCode: string = 'command'
) => {
  const commandValueObservable = createDpValue$(commandCode);

  // 解析出的框数据Observable
  return commandValueObservable.pipe(
    map((value: string) => decodeAreaData(value)),
    scan<IAreaData>((pre, cur) => {
      return { ...pre, ...cur };
    }, {})
  );
};

function createScreenResume$() {
  const resume$ = Observable.fromEventPattern(
    (handle: any) => {
      TYSdk.DeviceEventEmitter.addListener('enterForegroundEvent', handle);
    },
    (handle: any) => {
      TYSdk.DeviceEventEmitter.removeListener('enterForegroundEvent', handle);
    }
  );
  return resume$;
}

export {
  createAreaDataObservable,
  createBgAndPathObservable,
  createHeart$,
  createScreenResume$,
  requestPathByStart,
};
