import { DeviceEventEmitter } from 'react-native';
import { Observable } from 'rxjs';
import {
  distinctUntilChanged,
} from 'rxjs/operators';
import 'rxjs/operators/pluck';
import 'rxjs/operators/filter';
import 'rxjs/operators/map';
import 'rxjs/operators/concatMap';
import 'rxjs/operators/partition';
import 'rxjs/operators/scan';
import 'rxjs/operators/withLatestFrom';

import _join from 'lodash/join';
import _isEqual from 'lodash/isEqual';
import { TYSdk } from '@tuya-rn/tuya-native-components';

import Api from '../../../api';
import logger from '../../LoggerUtils';
import { handleError } from '../../FunctionUtils';
import { TYRCTGyroMapManager } from '../../../components/Basic/RCTGyroMap';

interface IAllTransferData {
  dataList: string[];
  hasNext: boolean;
  startRow: string;
  subRecordId: number;
  status: number;
}

function extractError(error: Error) {
  return Observable.of(error);
}

function isNotError(value: any) {
  if (value instanceof Error) {
    handleError(value);
    return false;
  }
  return true;
}

function isEqual(pre: any, next: any) {
  return _isEqual(pre, next);
}

const getAllTransferData = () => {
  const size = 500;
  const latestMapData$ = (start: undefined | string) =>
    Observable.fromPromise(Api.getGyroMapLatestMedia(start, size))
      .catch(extractError)
      .filter(isNotError);

  const latestMapDataAll$ = (start: undefined | string): Observable<any> => {
    return Observable.defer(() =>
      // ** 请求接口
      latestMapData$(start).flatMap((data: undefined | IAllTransferData) => {
        if (data) {
          const { dataList, hasNext, startRow, subRecordId } = data;

          const items$ = Observable.of({ dataList: _join(dataList, ''), subRecordId });
          const next$ = hasNext ? latestMapDataAll$(startRow) : Observable.empty();
          // ** 将这一次获得的数据和下一次的数据拼接
          return Observable.concat(items$, next$);
        } else {
          return Observable.empty();
        }
      })
    );
  };
  return latestMapDataAll$(undefined);
};

const getHistoryTransferData = ({ subRecordId }: { subRecordId: string }) => {
  const size = 500;
  const latestMapData$ = (start: undefined | string) =>
    Observable.fromPromise(Api.getGyroMapHistoryMedia(subRecordId, start, size))
      .catch(extractError)
      .filter(isNotError);

  const latestMapDataAll$ = (start: undefined | string): Observable<any> => {
    return Observable.defer(() =>
      // ** 请求接口
      latestMapData$(start).flatMap((data: undefined | IAllTransferData) => {
        // console.warn('data===', data, subRecordId);
        
        if (data) {
          const { dataList, hasNext, startRow, subRecordId } = data;

          const items$ = Observable.of({ dataList: _join(dataList, ''), subRecordId });
          const next$ = hasNext ? latestMapDataAll$(startRow) : Observable.empty();
          // ** 将这一次获得的数据和下一次的数据拼接
          return Observable.concat(items$, next$);
        } else {
          return Observable.empty();
        }
      })
    );
  };
  return latestMapDataAll$(undefined);
};

const createRx = () => {
  const loop = () => {};
  const transferDataChannel$ = Observable.fromEventPattern(
    (handle: any) => {
      TYRCTGyroMapManager.startConnect();
      TYSdk.DeviceEventEmitter.addListener('transferData', handle);
      DeviceEventEmitter.addListener('transferData', loop); // 这样写不会报警告
    },
    (handle: any) => {
      TYRCTGyroMapManager.disSubscribeDevice();
      TYRCTGyroMapManager.stopConnect();
      TYSdk.DeviceEventEmitter.removeListener('transferData', handle);
      DeviceEventEmitter.removeListener('transferData', loop);
    }
  )
    .pipe(distinctUntilChanged(isEqual))
    .map((value: any) => {
      const { data: increData } = value;
      return {
        header: increData.substring(0, 25),
        body: increData.substring(26),
      };
    });

  const transferStateChannel$ = Observable.fromEventPattern(
    (handle: any) => {
      TYSdk.DeviceEventEmitter.addListener('transferState', handle);
    },
    (handle: any) => {
      TYSdk.DeviceEventEmitter.removeListener('transferState', handle);
    }
  ).pipe(distinctUntilChanged(isEqual));

  const latestMediaChannel$ = getAllTransferData().pipe(distinctUntilChanged(isEqual));

  if (__DEV__) {
    latestMediaChannel$.subscribe(d => {
      logger.success('流服务全量数据-latestMediaChannel$', d);
    });
    transferDataChannel$.subscribe(d => {
      logger.success('流服务增量数据-transferDataChannel$', d);
    });

    transferStateChannel$.subscribe(d => {
      logger.success('流服务状态-transferStateChannel$', d);
    });
  }

  return {
    latestMediaChannel$,
    transferDataChannel$,
    transferStateChannel$,
  };
};

const createHistoryRx = ({ subRecordId }: { subRecordId: string }) => {
  const historyMediaChannel$ = getHistoryTransferData({ subRecordId }).pipe(
    distinctUntilChanged(isEqual)
  );

  if (__DEV__) {
    historyMediaChannel$.subscribe(d => {
      logger.success(`流服务历史${subRecordId}数据-historyMediaChannel$`, d);
    });
  }

  return {
    historyMediaChannel$,
  };
};

export default {
  createRx,
  createHistoryRx,
};
