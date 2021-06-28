import { TYSdk, Utils } from 'tuya-panel-kit';
import {
  IMessage,
  IGetLaserHistoryListOpts,
  ILaserOriginRecordList,
  ILaserRecordExportList,
  ILaserMultiFloorExportList,
} from './interface';
import { updateCloudConfig, getCloudFileUrl } from './ossDataApi';

function resolveErr(e: IMessage): Promise<Error> {
  return Promise.reject(new Error(`${e.message || e.errorMsg}`));
}

/**
 * 获取激光品类地图历史记录
 * @export
 * @param {IGetLaserHistoryListOpts} opt
 * @return {*}  {(Promise<ILaserRecordExportList | Error>)}
 * @docs https://developer.tuya.com/cn/docs/control-panel-sdk/laser-sweeper-data-api?id=Kacloflhzfi1p#title-0-%E6%9F%A5%E8%AF%A2%E5%8E%86%E5%8F%B2%E6%B8%85%E6%89%AB%E8%AE%B0%E5%BD%95
 */
export async function getLaserMapHistoryList(
  opt?: IGetLaserHistoryListOpts
): Promise<ILaserRecordExportList | Error> {
  const { page = 0, pageLimit = 10 } = opt || {};
  const a = 'tuya.m.dev.common.file.list';
  const offset = page * pageLimit;

  const postData = {
    devId: TYSdk.devInfo.devId,
    fileType: 'pic',
    offset,
    limit: pageLimit,
  };
  const version = '1.0';

  try {
    await updateCloudConfig();
    const data: ILaserOriginRecordList = await TYSdk.apiRequest(a, postData, version);
    const { totalCount = 0 } = data;

    if (typeof data.datas === 'undefined' || data.datas.length === 0) {
      return {
        dataList: [],
        hasNext: false,
      };
    }
    const dataList = [];

    data.datas.forEach(async ({ id, bucket, file, extend, time }) => {
      const fileUrl = await getCloudFileUrl(bucket, file);
      dataList.push({
        id,
        file: fileUrl,
        value: extend,
        timestamp: time,
      });
    });
    console.log('offset, data.datas.length, totalCount', offset, data.datas.length, totalCount);

    return {
      dataList,
      hasNext: offset + data.datas.length < totalCount,
    };
  } catch (e) {
    return resolveErr(e);
  }
}

/**
 * 获取激光品类地图历史记录
 *
 * @export
 * @param {IGetLaserHistoryListOpts} opt
 * @return {*}  {(Promise<ILaserMultiFloorExportList | Error>)}
 * @docs https://developer.tuya.com/cn/docs/control-panel-sdk/laser-sweeper-data-api?id=Kacloflhzfi1p#title-1-%E6%9F%A5%E8%AF%A2%E5%9C%B0%E5%9B%BE%E5%88%97%E8%A1%A8
 */
export async function getLaserMultiFloorMapList(
  opt?: IGetLaserHistoryListOpts
): Promise<ILaserMultiFloorExportList | Error> {
  const { page = 0, pageLimit = 5 } = opt || {};
  const a = 'tuya.m.dev.common.file.list';
  const offset = page * pageLimit;

  const postData = {
    devId: TYSdk.devInfo.devId,
    fileType: 'collect_recode',
    offset,
    limit: pageLimit,
  };
  const version = '1.0';

  try {
    await updateCloudConfig();
    const data: ILaserOriginRecordList = await TYSdk.apiRequest(a, postData, version);
    const { totalCount = 0 } = data;

    if (typeof data.datas === 'undefined' || data.datas.length === 0) {
      return {
        dataList: [],
        hasNext: false,
      };
    }
    const dataList = [];

    data.datas.forEach(async ({ id, bucket, file, extend, time }) => {
      const [backupFile, historyFile] = file.split(',');
      const fileUrl = await getCloudFileUrl(bucket, historyFile);
      const backupFileUrl = await getCloudFileUrl(bucket, backupFile);
      dataList.push({
        id,
        historyFile: fileUrl,
        backupFile: backupFileUrl,
        value: extend,
        timestamp: time,
      });
    });

    return {
      dataList,
      hasNext: offset + data.datas.length < totalCount,
    };
  } catch (e) {
    return resolveErr(e);
  }
}
