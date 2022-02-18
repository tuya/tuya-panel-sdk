/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { NativeEventEmitter } from 'react-native';
import MultiDeviceManager from '../native/multiDeviceManager';

const MultiDeviceManagerEmitter = new NativeEventEmitter(MultiDeviceManager);

/**
 * 注册监听
 * @param deviceList 监听的设备列表
 * @param fn 监听函数
 */
export const registerDeviceListStatus = (deviceList: string[], fn?: any) => {
  MultiDeviceManager.registerDeviceListStatus(deviceList, (res: any) => {
    if (fn) fn(res);
  });
};

/**
 * 移除监听
 * @param deviceList 监听的设备列表
 * @param fn 监听函数
 */
export const unRegisterDeviceListStatus = (deviceList: string[], fn?: any) => {
  MultiDeviceManager.registerDeviceListStatus(deviceList, (res: any) => {
    if (fn) fn(res);
  });
};

/**
 * 跨设备下发
 * @param data 下发数据：[{ devId: '设备id',  }]
 * @returns
 */
export const putDpWithList = (data: any[]) => {
  return new Promise((resolve, reject) => {
    MultiDeviceManager.putDpWithList(
      data,
      (result: any) => {
        resolve(result);
      },
      (err: any) => {
        reject(err);
      }
    );
  });
};

/**
 * 跨设备上报
 * @param cb 回调函数
 * @returns
 */
export const onDevInfoUpdate = (cb: any) => {
  return MultiDeviceManagerEmitter.addListener('onDevInfoUpdate', cb);
};
