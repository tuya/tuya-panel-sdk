import { TYSdk, Utils } from '@tuya-rn/tuya-native-components';
import { NativeModules } from 'react-native';

const TYVisionManager = NativeModules.TYRCTVisionManager;

const sucStyle = 'background: green; color: #fff;';
const errStyle = 'background: red; color: #fff;';

const api = function (a, postData, v = '1.0') {
  return new Promise((resolve, reject) => {
    TYSdk.apiRequest(
      {
        a,
        postData,
        v,
      },
      d => {
        const data = Utils.JsonUtils.parseJSON(d);
        console.log(`API Success: %c${a}%o`, sucStyle, data, postData);
        resolve(data);
      },
      err => {
        const e = Utils.JsonUtils.parseJSON(err);
        console.log(`API Failed: %c${a}%o`, errStyle, e.message || e.errorMsg || e, postData);
        reject(err);
      }
    );
  });
};

export const getHistoryMedia = (subRecordId, start = '', size = 500) => {
  return api(
    'tuya.m.device.media.detail',
    {
      devId: TYSdk.devInfo.devId,
      subRecordId,
      start,
      size,
    },
    '2.0'
  );
};

export const getLatestMedia = (start = '', size = 500) => {
  return api(
    'tuya.m.device.media.latest',
    {
      devId: TYSdk.devInfo.devId,
      start,
      size,
    },
    '2.0'
  );
};

/**
 * 刷新当前虚拟墙、区域清扫、指哪扫哪状态
 */
export const refreshStateView = () => {
  TYVisionManager.refreshStateView && TYVisionManager.refreshStateView();
};

/**
 * @param {Number} status - 地图状态: 0: 正常; 1: 指哪扫哪; 2: 区域清扫; 3: 禁区; 4: 虚拟墙
 * @param {Function} success - 成功回调
 */
export const setVisionMapState = (status, onSuccess) => {
  TYVisionManager.setVisionMapState(status, onSuccess);
};

/**
 * 在地图上添加组件
 * @param {Number} type - 地图状态: 0: 正常; 1: 指哪扫哪; 2: 区域清扫; 3: 禁区; 4: 虚拟墙
 */
export const addVisionMapRectWithType = type => {
  TYVisionManager.addVisionMapRectWithType(type);
};

/**
 * 获取当前状态的坐标点信息
 */
export const getVisionMapPoints = () =>
  new Promise(reject => {
    TYVisionManager.getVisionMapPoints(reject);
  });
