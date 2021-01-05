import { TYSdk } from 'tuya-panel-kit';

interface IMessage {
  code?: string;
  message: string;
  errorMsg?: string;
}

function resolveErr(e: IMessage): Promise<Error> {
  return Promise.reject(new Error(`${e.message || e.errorMsg}`));
}

/** ------------------------------------------------------------------- */
export interface IGetGyroHistoryListOpts {
  cleanRecordCode?: string;
  page?: number;
  pageLimit?: number;
}

export interface IRecordOriginList {
  datas: IRecordOriginData[];
  hasNext: boolean;
  totalCount: number;
}

export interface IRecordOriginData {
  uuid: string;
  dps: [{ [index: string]: string }];
  gmtCreate: number;
}

export interface IRecordExportList {
  dataList: IRecordExportData[];
  hasNext: boolean;
}

export interface IRecordExportData {
  id: string;
  value: string;
  timestamp: number;
}
/**
 *  陀螺仪-查询清扫记录列表
 *
 * @param {IGetGyroHistoryListOpts} opt
 * @returns
 */
export function getGyroMapHistoryList(
  opt: IGetGyroHistoryListOpts
): Promise<IRecordExportList | Error> {
  const { cleanRecordCode = 'clean_record', page = 0, pageLimit = 10 } = opt || {};
  const dpIds = [Number(TYSdk.device.getDpIdByCode(cleanRecordCode))];
  const a = 'tuya.m.sweeper.cleaning.history.get';
  const offset = page * pageLimit;

  const postData = {
    devId: TYSdk.devInfo.devId,
    offset,
    limit: pageLimit,
  };
  const version = '1.0';

  return TYSdk.apiRequest(a, postData, version)
    .then((data: IRecordOriginList) => {
      // const { hasNext = false, totalCount = 0 } = data;
      const { totalCount = 0 } = data;
      if (typeof data.datas === 'undefined' || data.datas.length === 0) {
        return {
          dataList: [],
          hasNext: false,
        };
      }
      const dataList = data.datas.map(({ uuid, dps, gmtCreate }) => {
        const [recordDp] = dps;
        const value = recordDp[TYSdk.device.getDpIdByCode(cleanRecordCode)];

        return {
          id: uuid,
          value,
          timestamp: gmtCreate,
        };
      });

      return {
        dataList,
        hasNext: offset + dataList.length < totalCount,
      };
    })
    .catch(err => {
      return resolveErr(err);
    });
}

/** ------------------------------------------------------------------- */
/**
 * 删除清扫记录
 *
 * @export
 * @param {string[]} ids
 * @returns
 */
export function deleteGyroMapHistoryByIds(ids: string[]): Promise<boolean | Error> {
  const a = 'tuya.m.sweeper.cleaning.history.delete';

  if (!ids || !ids.length) return resolveErr({ message: 'Missing parameters: id' });
  const postData = {
    devId: TYSdk.devInfo.devId,
    uuid: ids.join(','),
  };
  const version = '1.0';

  return TYSdk.apiRequest(a, postData, version)
    .then((success: boolean) => {
      return !!success;
    })
    .catch(err => {
      return resolveErr(err);
    });
}

/** ------------------------------------------------------------------- */

export interface IGetGyroMapLatestMediaOpts {
  offset?: string;
  limit?: number;
}

export interface IGyroMapMediaOrigin {
  dataList: string[];
  datatype: number;
  devId: string;
  endTime: number;
  hasNext: boolean;
  mapId: number;
  startRow: string;
  startTime: number;
  status: number;
  subRecordId: number;
}

export interface IGyroMapMediaExport {
  dataList: string[];
  subRecordId: number;
  nextOffset: string;
}
/**
 *  查询最新一次流服务记录详情数据
 *
 * @param {IGetGyroMapLatestMediaOpts} opt
 * @returns
 */
export function getGyroMapLatestMedia(
  opt: IGetGyroMapLatestMediaOpts = {}
): Promise<IGyroMapMediaExport | Error> {
  const { offset = '', limit = 500 } = opt || {};
  const a = 'tuya.m.device.media.latest';

  const postData = {
    devId: TYSdk.devInfo.devId,
    start: offset,
    size: limit,
  };
  const version = '2.0';

  return TYSdk.apiRequest(a, postData, version)
    .then((data: IGyroMapMediaOrigin) => {
      const { dataList = [], subRecordId, startRow, hasNext = false } = data;
      const nextOffset = hasNext ? startRow : '';
      return {
        dataList,
        subRecordId,
        nextOffset,
      };
    })
    .catch(err => {
      return resolveErr(err);
    });
}

export interface IGetGyroMapHistoryMediaOpts extends IGetGyroMapLatestMediaOpts {
  subRecordId: string;
}

/**
 * 查询某次流服务记录详情数据
 *
 * @export
 * @param {IGetGyroMapHistoryMediaOpts} opt
 * @returns
 */
export function getGyroMapHistoryMediaBySubRecordId(
  opt: IGetGyroMapHistoryMediaOpts
): Promise<IGyroMapMediaExport | IMessage> {
  const { subRecordId = '', offset = '', limit = 500 } = opt || {};

  if (!subRecordId) return resolveErr({ code: '', message: 'Missing parameters: subRecordId' });
  const a = 'tuya.m.device.media.detail';

  const postData = {
    devId: TYSdk.devInfo.devId,
    subRecordId,
    start: offset,
    size: limit,
  };
  const version = '2.0';

  return TYSdk.apiRequest(a, postData, version)
    .then((data: IGyroMapMediaOrigin) => {
      const { dataList = [], subRecordId: resSubRecordId, startRow, hasNext } = data;

      const nextOffset = hasNext ? startRow : '';
      return {
        dataList,
        subRecordId: resSubRecordId,
        nextOffset,
      };
    })
    .catch(err => {
      return resolveErr(err);
    });
}
/** ------------------------------------------------------------------- */
