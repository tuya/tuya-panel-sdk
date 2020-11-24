import { Utils, TYSdk } from '@tuya-rn/tuya-native-components';
import { NativeModules } from 'react-native';
import Base64 from 'base64-js';
import _ from 'lodash';
import CustomError from '../utils/CustomError';
import Toast from '../components/Display/Toast';
import i18n from '../i18n';
import _isString from 'lodash/isString';

import laserUIApi from './laserUIApi';

const TYLaserManager = NativeModules.TYRCTLaserManager;

export function fetch<T>(a: string, postData: any, v: string) {
  const sucStyle = 'background: green; color: #fff;';
  const errStyle = 'background: red; color: #fff;';
  return new Promise<T>((resolve, reject) => {
    TYSdk.apiRequest({
      a,
      postData,
      v,
    })
      .then((d: any) => {
        const data = Utils.JsonUtils.parseJSON(d);
        console.log(`API Success: %c${a}%o`, sucStyle, data, postData);
        resolve(data);
      })
      .catch((err: any) => {
        const e = Utils.JsonUtils.parseJSON(err);
        console.log(`API Failed: %c${a}%o`, errStyle, e.message || e.errorMsg || e, postData);
        reject(err);
      });
  });
}

// -------------------------激光地图接口----------------------------

// ----数据操作处理-----

/**
 * 鉴权，获取存储桶的访问权限
 *
 * @param {String} [devId=TYSdk.devInfo.devId]
 * @returns
 */
function updateCloudConfig(devId = TYSdk.devInfo.devId) {
  return new Promise((resolve, reject) => {
    TYLaserManager.updateCloudConfig(devId, resolve, reject);
  });
}

/**
 *
 * @param {string} bucket 权限验证
 * @param {string} filePath 文件相对路径
 * @returns {string} fileUrl 文件的Url
 */
function getCloudFileUrl(bucket: string, filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    TYLaserManager.getCloudFileUrl(bucket, filePath, resolve, reject);
  });
}

/**
 * 取消地图通道连接，退出面板的时候再调用，不能在地图组件的生命周期内。
 *
 * @returns
 */
function laserMapStopChannel() {
  return new Promise(resolve => {
    TYLaserManager.stopConnectSweeperDataChannel();
    resolve();
  });
}

/**
 * lz4解压
 */
function laserDecompressLZ4(lz4Data: string, length: number) {
  return new Promise((resolve, reject) => {
    TYLaserManager.laserDecompressLZ4(lz4Data, length, resolve, reject);
  });
}

function laserBitmapToImageBase64(opts: {
  width: number;
  height: number;
  points: string;
  pointLength: number;
  colorsMaps: { [index: string]: string };
  scale: number;
  orientation:
    | 'up'
    | 'down'
    | 'left'
    | 'right'
    | 'upMirrored'
    | 'downMirrored'
    | 'leftMirrored'
    | 'rightMirrored';
}) {
  const { width, height, points, pointLength, colorsMaps, scale, orientation } = opts;
  return new Promise((resolve, reject) => {
    if (!TYLaserManager.laserBitmapToImageBase64)
      reject('no TYLaserManager.laserBitmapToImageBase64');

    TYLaserManager.laserBitmapToImageBase64(
      width,
      height,
      points,
      pointLength,
      JSON.stringify(colorsMaps),
      scale,
      orientation,
      resolve,
      reject
    );
  });
}
/**
 * 获取最近一次地图文件数据
 *
 * @returns {Object} { mapPath, routePath }
 * mapPath: 地图数据云端的bin文件路径
 * routePath: 路径bin文件路径
 */
function getLatestMapFile(): Promise<{ mapPath: string; routePath: string }> {
  return new Promise((resolve, reject) => {
    TYLaserManager.getSweeperCurrentPath(TYSdk.devInfo.devId, resolve, reject);
  });
}
function getCloudConfig(type = 'Common') {
  return new Promise((resolve, reject) => {
    TYSdk.apiRequest({
      a: 'tuya.m.dev.storage.config.get',
      postData: {
        type,
        devId: TYSdk.devInfo.devId,
      },
      v: '1.0',
    })
      .then(d => {
        resolve(Utils.JsonUtils.parseJSON(d));
      })
      .catch(e => {
        reject(e);
      });
  });
}

// 获取激光清扫记录
function getHistoryFileList(
  fileType = 'pic',
  offset,
  limit,
  startTime = undefined,
  endTime = undefined
) {
  return new Promise((resolve, reject) => {
    TYSdk.apiRequest({
      a: 'tuya.m.dev.common.file.list',
      postData: {
        devId: TYSdk.devInfo.devId,
        fileType,
        offset,
        limit,
        startTime,
        endTime,
      },
      v: '1.0',
    })
      .then(d => {
        resolve(Utils.JsonUtils.parseJSON(d));
      })
      .catch(e => {
        reject(e);
      });
  });
}

/**
 * 激光-删除清扫记录
 *
 * @param {*} ids
 * @returns
 */
function deleteLog(...ids) {
  return new Promise((resolve, reject) => {
    TYSdk.apiRequest({
      a: 'tuya.m.common.file.delete',
      postData: {
        devId: TYSdk.devInfo.devId,
        fileIds: ids,
      },
      v: '1.0',
    })
      .then(d => {
        resolve(Utils.JsonUtils.parseJSON(d));
      })
      .catch(e => {
        reject(e);
      });
  });
}

/**
 * 激光 - 多地图获取
 * https://wiki.tuya-inc.com:7799/pages/viewpage.action?pageId=36883266
 */
function getMultipleMapFiles() {
  return new Promise<{
    datas: Array<{
      extend: string;
      bucket: string;
      file: string;
      id: number;
      time: number;
    }>;
    totalCount: number;
  }>((resolve, reject) => {
    TYSdk.apiRequest({
      a: 'tuya.m.dev.common.file.list',
      postData: {
        devId: TYSdk.devInfo.devId,
        fileType: 'collect_recode',
        offset: 0,
        limit: 5,
      },
      v: '1.0',
    })
      .then(d => {
        resolve(Utils.JsonUtils.parseJSON(d));
      })
      .catch(e => {
        reject(e);
      });
  });
}

// -------------------------------end-------------------------------
// -----------------------------陀螺仪地图接口------------------------

/**
 * 陀螺仪地图-获取历史清扫地图
 *
 * @param {*} subRecordId
 * @param {*} start
 * @param {*} size
 * @returns
 */
function getGyroMapHistoryMedia(subRecordId, start, size) {
  return new Promise((resolve, reject) => {
    const startRow = typeof start === 'undefined' ? '' : start;
    TYSdk.apiRequest({
      a: 'tuya.m.device.media.detail',
      postData: {
        devId: TYSdk.devInfo.devId,
        subRecordId,
        start: startRow,
        size,
      },
      v: '2.0',
    })
      .then(d => {
        resolve(Utils.JsonUtils.parseJSON(d));
      })
      .catch(e => {
        reject(e);
      });
  });
}

/**
 * 陀螺仪地图-获取最新清扫地图
 *
 * @param {*} start
 * @param {*} size
 * @returns
 */
function getGyroMapLatestMedia(start, size) {
  return new Promise((resolve, reject) => {
    const startRow = typeof start === 'undefined' ? '' : start;
    TYSdk.apiRequest({
      a: 'tuya.m.device.media.latest',
      postData: {
        devId: TYSdk.devInfo.devId,
        start: startRow,
        size,
      },
      v: '2.0',
    })
      .then(d => {
        resolve(Utils.JsonUtils.parseJSON(d));
      })
      .catch(e => {
        reject(e);
      });
  });
}

/** 陀螺仪-获取清扫记录 */

function getGyroMapHistoryList(dpIds: number[], offset: number, limit: number) {
  return new Promise((resolve, reject) => {
    TYSdk.apiRequest({
      a: 'm.smart.scale.history.get.list',
      postData: {
        devId: TYSdk.devInfo.devId,
        dpIds,
        offset,
        limit,
        userId: '0',
      },
      v: '1.0',
    })
      .then(d => {
        const data = typeof d === 'string' ? JSON.parse(d) : d;
        resolve(data);
      })
      .catch(e => {
        reject(e);
      });
  });
}

interface TuyaStreamData {
  dataList: string[];
  hasNext: boolean;
  startRow: number;
  subRecordId: number;
}
interface ITransferParams {
  subRecordId: number;
  start: number;
  size: number;
  mapId?: number;
}

/**
 * 陀螺仪地图-获取最新清扫地图v3 (配合流服务v2使用)
 *
 * @returns
 */
function getGyroMapLatestMediaV3({ subRecordId, start, size }: ITransferParams) {
  const startRow = typeof start === 'undefined' ? '' : start;
  return fetch<TuyaStreamData>(
    'tuya.m.device.media.latest',
    {
      devId: TYSdk.devInfo.devId,
      start: startRow,
      size,
      subRecordId,
      datatype: 0,
    },
    '3.0'
  );
}

export async function getTotalGyroStreamDataV3(currentPage: number = 0, pageSize: number = 500) {
  let isNext = true;
  let data = [];
  let id;
  while (isNext) {
    const { dataList = [], hasNext, subRecordId } = await getGyroMapLatestMediaV3({
      subRecordId: 1,
      start: currentPage * pageSize,
      size: pageSize,
    });
    data.push(...dataList);
    id = subRecordId;
    isNext = hasNext;
    currentPage++;
  }
  return {
    id,
    data: data.join(''),
  };
}

export async function getGyroMapHistoryMediaV3Total(
  sessionId: number,
  mapId: number,
  {
    currentPage = 0,
    pageSize = 500,
    format,
  }: {
    currentPage?: number;
    pageSize?: number;
    format?(v: any): any;
  } = {
    currentPage: 0,
    pageSize: 500,
  }
) {
  let isNext = true;
  let data = [];
  while (isNext) {
    const { dataList = [], hasNext } = await getGyroMapHistoryMediaV3({
      subRecordId: sessionId,
      mapId,
      start: currentPage * pageSize,
      size: pageSize,
    });
    const formatList = format ? dataList.map(d => format(d)) : dataList;
    data.push(...formatList);
    isNext = hasNext;
    currentPage++;
  }
  return data.join('');
}

/** 陀螺仪-获取清扫记录v3 (配合流服务v2使用) */

function getGyroMapHistoryMediaV3({ subRecordId, mapId, start, size }: ITransferParams) {
  const startRow = typeof start === 'undefined' ? '' : start;

  return fetch<TuyaStreamData>(
    'tuya.m.device.media.detail',
    {
      devId: TYSdk.devInfo.devId,
      subRecordId,
      datatype: 0,
      mapId,
      start: startRow,
      size,
    },
    '3.0'
  );
}

/**
 * 陀螺仪-获取清扫记录 (废弃)
 *
 * @param {*} dpIds
 * @param {*} offset
 * @param {*} limit
 * @returns
 */
function getDpLogs(dpIds: number[], offset: number, limit) {
  return new Promise((resolve, reject) => {
    TYSdk.apiRequest({
      a: 'm.smart.operate.log',
      postData: {
        devId: TYSdk.devInfo.devId,
        dpIds,
        offset,
        limit,
      },
      v: '2.0',
    })
      .then(d => {
        resolve(Utils.JsonUtils.parseJSON(d));
      })
      .catch(e => {
        reject(e);
      });
  });
}

/**
 * 删除记录（最多100条）
 * @param {*} uuid 设备上报记录唯一标识
 */
const deleteLogs = uuid => {
  return new Promise((resolve, reject) => {
    TYSdk.apiRequest({
      a: 'm.smart.scale.history.delete',
      postData: {
        devId: TYSdk.devInfo.devId,
        uuid,
      },
      v: '1.0',
    })
      .then(d => {
        const data = typeof d === 'string' ? JSON.parse(d) : d;
        resolve(data);
      })
      .catch(e => {
        reject(e);
      });
  });
};

// -------------------------------end-------------------------------
// ----------------------------通用方法------------------------------

/**
 *
 *
 * @param {() => Promise<any>} task Promise Task
 * @param {(error: any) => boolean} when Promise need reconnection
 * @param {number} [time=1] reconnection time
 * @returns
 */
async function reconnection<Response>(
  task: () => Promise<Response>,
  when: (error: Error) => boolean,
  time: number = 1
) {
  if (time <= 1) return await task();
  let res;

  for (let index = 0; index < time; index++) {
    try {
      res = await task();
      return res;
    } catch (error) {
      if (when(error)) {
        console.log('reconnection time:', index + 1);
        Toast.info(i18n.getLang('networkTimeout'));
      }
      if (index + 1 === time) {
        throw error;
      }
    }
  }
  return res;
}

type FileType = 'blob' | 'text';

function xmlRequestFile(url: string, fileType: FileType) {
  return new Promise((resolve, reject) => {
    const xmlRequest = new XMLHttpRequest();
    xmlRequest.timeout = 10000;
    xmlRequest.open('GET', url, true);
    xmlRequest.responseType = fileType; //这里是关键，它指明返回的数据的类型是二进制
    xmlRequest.onreadystatechange = function(e) {
      // debugger;
      if (this.readyState === 4) {
        if (this.status === 200) {
          resolve(this._response);
        } else {
          reject(new Error(this.status));
        }
      }
    };
    xmlRequest.ontimeout = function(e) {
      reject(
        new Error(
          `status: ${xmlRequest.status} \nreadyState: ${xmlRequest.readyState} \nerror: ${e} `
        )
      );
    };
    xmlRequest.send(null);
  });
}

/**
 * 下载文件，解析数据
 *
 * @param {string} url
 * @param {FileType} [fileType='text']
 * @returns
 */
async function downloadFile(url: string, fileType: FileType = 'text') {
  let response: string;
  try {
    response = await xmlRequestFile(url, fileType);
  } catch (e) {
    debugger;
    throw CustomError.mixinError(e, 'ui');
  }
  if (fileType === 'text') {
    return response;
  }
  const bytes = Base64.toByteArray(response);
  const text = _(bytes)
    .map(d => _.padStart(d.toString(16), 2, '0'))
    .value()
    .join('');
  return text;
}

async function downloadImage(url: string) {
  let response: string;
  try {
    response = await xmlRequestFile(url, 'blob');
  } catch (e) {
    throw CustomError.mixinError(e, 'ui');
  }
  return response;
}

const simpleConfirmDialog = _.debounce(
  (
    title: string,
    context: string,
    confirm: () => void = () => {},
    cancel: () => void = () => {}
  ) => {
    TYSdk.mobile.simpleConfirmDialog(title, context, confirm, cancel);
  }
);

const simpleTipDialog = _.debounce((context: string, confirm: () => void = () => {}) => {
  TYSdk.mobile.simpleTipDialog(context, confirm);
});

const getFunConfig = () => {
  const funConfig = {};
  if (!TYSdk.devInfo) return {};
  if (!TYSdk.devInfo.panelConfig) return {};
  const { fun } = TYSdk.devInfo.panelConfig;
  if (!fun) return {};
  // eslint-disable-next-line no-restricted-syntax
  for (const i in fun) {
    if (Object.prototype.hasOwnProperty.call(fun, i)) {
      const key = Utils.StringUtils.camelize(`panel_fun_${i}`);
      funConfig[key] = fun[i];
    }
  }
  return funConfig;
};

// -------------------------------end-------------------------------

export default {
  getTotalGyroStreamDataV3,
  getCloudConfig,
  deleteLog,
  getHistoryFileList,
  updateCloudConfig,
  getLatestMapFile,
  getMultipleMapFiles,
  getCloudFileUrl,
  laserMapStopChannel,
  laserBitmapToImageBase64,
  laserDecompressLZ4,

  getDpLogs,
  getGyroMapLatestMedia,
  getGyroMapHistoryMedia,
  getGyroMapHistoryList,
  getGyroMapLatestMediaV3,
  getGyroMapHistoryMediaV3,
  getGyroMapHistoryMediaV3Total,
  deleteLogs,

  downloadFile,
  downloadImage,
  simpleConfirmDialog,
  simpleTipDialog,

  getFunConfig,

  // 激光地图组件操作方法，向下兼容
  refreshLaserMapStateView: laserUIApi.refreshLaserMapStateView,
  setLaserMapStateAndEdit: laserUIApi.setLaserMapStateAndEdit,
  addLaserMapArea: laserUIApi.addLaserMapArea,
  getLaserMapPointsInfo: laserUIApi.getLaserMapPointsInfo,
  removeLaserMapPoints: laserUIApi.removeLaserMapPoints,
  updateLaserMapAreaInfo: laserUIApi.updateLaserMapAreaInfo,

  clearArea: laserUIApi.clearArea,
  getLaserMapPoints: laserUIApi.getLaserMapPoints,
  setLaserMapState: laserUIApi.setLaserMapState,
  addLaserMapRectWithType: laserUIApi.addLaserMapRectWithType,
};
