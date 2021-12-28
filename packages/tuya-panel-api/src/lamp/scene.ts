/* eslint-disable @typescript-eslint/ban-ts-comment */
import { TYSdk } from 'tuya-panel-kit';
import { ISceneData, ISceneInfo } from './interface';

/**
 * @description: 获取当前情景库版本及版本集合
 * @param {string} bizId 群组id或设备id
 * @param {int} bizType 类型：0设备，1群组
 * @param {string} pid 产品id
 */
export const getSceneVersionInfo = () => {
  // @ts-ignore
  const { groupId, devId, productId } = TYSdk.devInfo;
  return new Promise((resolve, reject) => {
    TYSdk.native.apiRNRequest(
      {
        a: 'tuya.m.light.scenelib.version.list',
        postData: {
          bizId: groupId || devId,
          bizType: groupId ? 1 : 0,
          pid: productId,
        },
        v: '1.0',
      },
      (d: ISceneInfo) => {
        resolve(d);
      },
      (err: any) => {
        reject(err);
      }
    );
  });
};

/**
 * @description: 获取情景资源
 * @param {string} bizId 群组id或设备id
 * @param {int} bizType 类型：0设备，1群组
 * @param {string} pid 产品id
 * @param {string} libVersion 版本号
 */
export const getSceneData = (libVersion: string) => {
  // @ts-ignore
  const { groupId, devId, productId } = TYSdk.devInfo;
  return new Promise((resolve, reject) => {
    TYSdk.native.apiRNRequest(
      {
        a: 'tuya.m.light.panel.scenelib.get',
        postData: {
          bizId: groupId || devId,
          bizType: groupId ? 1 : 0,
          pid: productId,
          libVersion,
        },
        v: '1.0',
      },
      (d: ISceneData) => {
        resolve(d);
      },
      (err: any) => {
        reject(err);
      }
    );
  });
};

/**
 * @description: 更新情景库版本
 * @param {string} bizId 群组id或设备id
 * @param {int} bizType 类型：0设备，1群组
 * @param {string} pid 产品id
 * @param {string} libVersion 版本号
 */
export const updateVersion = (libVersion: string) => {
  // @ts-ignore
  const { groupId, devId, productId } = TYSdk.devInfo;
  return new Promise((resolve, reject) => {
    TYSdk.native.apiRNRequest(
      {
        a: 'tuya.m.light.panel.scenelib.version.upgrade',
        postData: {
          bizId: groupId || devId,
          bizType: groupId ? 1 : 0,
          pid: productId,
          libVersion,
        },
        v: '1.0',
      },
      (d: boolean) => {
        resolve(d);
      },
      (err: any) => {
        reject(err);
      }
    );
  });
};

export default {
  getSceneVersionInfo,
  getSceneData,
  updateVersion,
};
