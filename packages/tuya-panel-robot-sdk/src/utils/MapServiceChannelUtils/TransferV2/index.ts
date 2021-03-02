import { Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import 'rxjs/operators/pluck';
import 'rxjs/operators/filter';
import 'rxjs/operators/map';
import 'rxjs/operators/concatMap';
import 'rxjs/operators/partition';
import 'rxjs/operators/scan';
import 'rxjs/operators/withLatestFrom';

import _join from 'lodash/join';
import _isEqual from 'lodash/isEqual';
import { TYSdk } from 'tuya-panel-kit';

import Api from '../../../api/customApi';
import logger from '../../LoggerUtils';
import { handleError } from '../../FunctionUtils';

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
    Observable.fromPromise(Api.getGyroMapLatestMediaV3(start, size))
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
        }
        return Observable.empty();
      })
    );
  };
  return latestMapDataAll$(undefined);
};

const getHistoryTransferData = ({ subRecordId }: { subRecordId: string }) => {
  const size = 500;
  const latestMapData$ = (start: undefined | string) =>
    Observable.fromPromise(Api.getGyroMapHistoryMediaV3(subRecordId, start, size))
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
        }
        return Observable.empty();
      })
    );
  };
  return latestMapDataAll$(undefined);
};

// 流服务状态: 是否可以订阅
const transferStateChannel$ = Observable.fromEventPattern(
  (handle: any) => {
    TYSdk.DeviceEventEmitter.addListener('transferState', handle);
  },
  (handle: any) => {
    TYSdk.DeviceEventEmitter.removeListener('transferState', handle);
  }
).pipe(distinctUntilChanged(isEqual));

export const tuyaStreamMessage$ = Observable.fromEventPattern<{ data: string }>(
  (handle: any) => {
    TYSdk.DeviceEventEmitter.addListener('transferData', handle);
  },
  (handle: any) => {
    TYSdk.DeviceEventEmitter.removeListener('transferData', handle);
  }
)
  .pipe(distinctUntilChanged(isEqual))
  .map((value: any) => {
    const { data } = value;
    return {
      header: data.substring(0, 29),
      body: data.substring(30),
    };
  });

const createRx = () => {
  // 流服务数据上报
  const transferDataChannel$ = tuyaStreamMessage$
    .pipe(distinctUntilChanged(isEqual))
    .map((value: any) => {
      const { data: increData } = value;
      return {
        header: increData.substring(0, 29),
        body: increData.substring(30),
      };
    });

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
