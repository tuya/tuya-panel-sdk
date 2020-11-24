import { Utils } from '@tuya-rn/tuya-native-components';
import Api from '../../../api';

import { atHexToString } from '../../../utils/StringsUtils';

const parseExtendRegexp = /\/*.*\/([\w|_|\d]*)\.(\w*)/;

enum IOperate {
  delete = 'delete',
  save = 'save',
  setMapInfo = 'setMapInfo',
  getMapsInfo = 'getMapsInfo',
  setMap = 'setMap',
}

export interface IHistoryMapData {
  extend: string;
  bucket: string;
  file: string;
  id: number;
  time: number;
  backupFile: string;
  historyFile: string;
  startTime: string | number;
  robotMapId: string | number;
  md5: string;
}

export enum IUploadCode {
  'success' = 0,
}

interface IUploadMapData {
  message: string;
  infoType: number;
  dInfo: { ts: string; userId: string };
  data: { operate: string; code: 0; info: string };
}

function encodeCmd(operate: IOperate, extra?: any) {
  const infoType = 21031;
  const data = {
    operate,
    extra,
  };

  return {
    infoType,
    data,
  };
}

export function decodeCmd(data: string) {
  const infoType = 21031;
  const content: IUploadMapData = Utils.JsonUtils.parseJSON(atHexToString(data));
  if (content && content.infoType === infoType) {
    return content;
  }
  return {};
}

// 获取本地地图
export function getMultiMapsFromLocal() {
  return encodeCmd(IOperate.getMapsInfo);
}

/**
 * 获取云端多地图
 */
export async function getMultiMapsFromServer() {
  const result = await Api.getMultipleMapFiles();
  if (result && result.datas) {
    return result.datas.map(cleanData => {
      const { file, extend } = cleanData;
      const [backupFile, historyFile] = file.split(',');

      // 过滤掉路径, 将extend内容和类型拆开
      // extend: '/tmp/RecordFiles/137080F1E6570014_286_1571139214_1571140255_14_0_{md5}.bkmap';
      const [extendData, type] = extend.replace(parseExtendRegexp, '$1.$2').split('.');

      const [
        robotSN,
        robotMapId,
        startTime,
        endTime,
        cleanAreaData,
        cleanTime,
        md5,
      ] = extendData.split('_');

      return {
        ...cleanData,
        backupFile,
        historyFile,
        startTime,
        robotMapId,
        md5,
      };
    });
  }
  return [];
}

export function getMultiMapsFromServerLoop(curLength: number, timeOut: number = 30000) {
  let timer: number;
  let timeCheck: number;
  const loopToServer = () => {
    return getMultiMapsFromServer()
      .then(cleanData => {
        return new Promise((resolve, reject) => {
          console.log('cleanData', cleanData, curLength);
          if (cleanData?.length === curLength) {
            // 如果数量一样，继续查询

            timer = setTimeout(() => {
              resolve(loopToServer());
            }, 5000);
          } else {
            console.log('getcleanData');

            timer && clearTimeout(timer);
            resolve(cleanData);
          }
        });
      })
      .then(v => {
        console.log('vvv', v);
        return v;
      });
  };

  return new Promise((resolve, reject) => {
    const nowTime = new Date().getTime();
    timeCheck = setInterval(() => {
      if (new Date().getTime() - nowTime >= timeOut) {
        // logger.info('dp上报超时，取消等待');
        // TYSdk.event.remove('deviceDataChange', handle);
        clearInterval(timeCheck);
        timer && clearTimeout(timer);
        reject('timeout');
      }
    });

    loopToServer().then(cleanData => {
      console.log('cleanDataLoopToServer', cleanData);
      resolve(cleanData);
    });
  });
}

// 存储在本地
export function saveLocal() {
  return encodeCmd(IOperate.save, { type: 'local' });
}

// 存储在云端
export function saveServer() {
  return encodeCmd(IOperate.save, { type: 'server' });
}

// 设置地图
export function setMultiMaps(tag: string, mapId: number) {
  const name = encodeURIComponent(tag);
  return encodeCmd(IOperate.setMapInfo, { tag: name, mapId });
}

// 从本地取地图并设置为当前地图
export function setCurMapsFromLocal(mapId: number) {
  return encodeCmd(IOperate.setMap, { type: 'local', mapId });
}

// 从云端删除地图
export function deleteFromServer(mapId: number) {
  return encodeCmd(IOperate.delete, { type: 'server', mapId });
}

// 从云端设置地图
export async function setCurMapsFromServer(params: { md5: string; file: string; bucket: string }) {
  const { md5, file, bucket } = params;
  const url = await Api.getCloudFileUrl(bucket, file);
  const cmd = {
    infoType: 21025,
    data: {
      downUrl: url,
      md5,
    },
  };
  // console.log('===下发还原地图', cmd);
  return cmd;
}

// 从云端取地图并设置为当前地图2
export function setCurMapsFromServerByServerId(id: number) {
  return encodeCmd(IOperate.setMap, { type: 'server', mapId: id });
}

// 发送云端地图列表给本地
export function putServerMapsToLocal(serverData: IHistoryMapData[]) {
  const putData = serverData.map(data => {
    const { id, extend, time } = data;
    return {
      mapId: id,
      fileName: extend,
      uploadTime: time,
    };
  });
  return encodeCmd(IOperate.getMapsInfo, { cloudMapsInfo: putData });
}

export default {
  IUploadCode,
  decodeCmd,
  getMultiMapsFromLocal,
  getMultiMapsFromServer,
  getMultiMapsFromServerLoop,
  saveLocal,
  saveServer,
  setMultiMaps,
  setCurMapsFromLocal,
  deleteFromServer,
  setCurMapsFromServer,
  setCurMapsFromServerByServerId,
  putServerMapsToLocal,
};
