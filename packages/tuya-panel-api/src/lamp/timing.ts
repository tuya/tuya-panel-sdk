/* eslint-disable @typescript-eslint/ban-ts-comment */
import { TYSdk, Utils } from 'tuya-panel-kit';
import { IEditTimerParams, ITimerParams } from './interface';
import { parseJSON } from './utils';
const { TimeUtils } = Utils;

/**
 * @description: 更新定时,支持群组定时
 * @param {string} bizId 群组id或设备id
 * @param {int} bizType 类型：0设备，1群组
 * @param {string} timeZone 地区
 * @param {boolean} isAppPush 是否发送执行通知
 * @param {string} actionType 类型
 * @param {object} options 参数配置
 */
const addTimer = (params: ITimerParams) => {
  return new Promise((resolve, reject) => {
    // @ts-ignore
    const { groupId: devGroupId, devId } = TYSdk.devInfo;
    const defaultParams = {
      bizId: devGroupId || devId,
      bizType: devGroupId ? 1 : 0,
      timeZone: TimeUtils.timezone(),
      isAppPush: false,
      actionType: devGroupId ? 'device_group' : 'device',
      options: {},
    };
    const postData = { ...defaultParams, ...params };
    TYSdk.native.apiRNRequest(
      {
        a: 'tuya.m.timer.group.add',
        postData,
        v: '4.0',
      },
      (d: any) => {
        const data = parseJSON(d);
        resolve(data);
      },
      (e: any) => {
        reject(e);
      }
    );
  });
};

/**
 * @description: 更新定时,支持群组定时
 * @param {string} bizId 群组id或设备id
 * @param {int} bizType 类型：0设备，1群组
 * @param {string} timeZone 地区
 * @param {boolean} isAppPush 是否发送执行通知
 * @param {string} actionType 类型
 * @param {object} options 参数配置
 */
const updateTimer = (params: IEditTimerParams) => {
  return new Promise((resolve, reject) => {
    // @ts-ignore
    const { groupId: devGroupId, devId } = TYSdk.devInfo;
    const defaultParams = {
      bizId: devGroupId || devId,
      bizType: devGroupId ? 1 : 0,
      timeZone: TimeUtils.timezone(),
      isAppPush: false,
      actionType: devGroupId ? 'device_group' : 'device',
      options: {},
    };
    const postData = { ...defaultParams, ...params };
    TYSdk.native.apiRNRequest(
      {
        a: 'tuya.m.timer.group.update',
        postData,
        v: '4.0',
      },
      (d: any) => {
        const data = parseJSON(d);
        resolve(data);
      },
      (e: any) => {
        reject(e);
      }
    );
  });
};

/**
 * @description: 获取某个分类下的定时,支持群组定时
 * @param {string} type 群组id或设备id
 * @param {int} bizType 类型：0设备，1群组
 * @param {string} category 分类类别
 */
const getCategoryTimerList = (category: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    // @ts-ignore
    const { groupId, devId } = TYSdk.devInfo;
    TYSdk.native.apiRNRequest(
      {
        a: 'tuya.m.timer.group.list',
        postData: {
          type: groupId ? 'device_group' : 'device',
          bizId: groupId || devId,
          category,
        },
        v: '2.0',
      },
      d => {
        const data = parseJSON(d);
        resolve(data);
      },
      (e: any) => {
        reject(e);
      }
    );
  });
};

/**
 * [removeTimer description]
 * @param {[type]} groupId  [description]
 * @param {[type]} category [description]
 * @return {[type]}          [description]
 * 删除定时
 * 支持群组定时
 */
const removeCloudTimer = (groupId: string, category: string, devInfo?: any) => {
  return new Promise((resolve, reject) => {
    const { groupId: devGroupId, devId } = devInfo || TYSdk.devInfo;

    TYSdk.native.apiRNRequest(
      {
        a: 'tuya.m.timer.group.remove',
        postData: {
          type: devGroupId ? 'device_group' : 'device',
          bizId: devGroupId || devId,
          groupId,
          category,
        },
        v: '2.0',
      },
      (d: any) => {
        const data = parseJSON(d);
        resolve(data);
      },
      (e: any) => {
        reject(e);
      }
    );
  });
};

/**
 * [updateStatus description]
 * @param {[type]} category [description]
 * @param {[type]} groupId  [description]
 * @param {[type]} status   [description]
 * @return {[type]}          [description]
 * 更新某个组定时的状态
 * 支持群组定时
 */
const updateTimerStatus = (
  category: string,
  groupId: string | number,
  status: number,
  devInfo?: any
) => {
  return new Promise((resolve, reject) => {
    const { groupId: devGroupId, devId } = devInfo || TYSdk.devInfo;
    TYSdk.native.apiRNRequest(
      {
        a: 'tuya.m.timer.group.status.update',
        postData: {
          type: devGroupId ? 'device_group' : 'device',
          bizId: devGroupId || devId,
          category,
          groupId,
          status,
        },
        v: '2.0',
      },
      (d: any) => {
        const data = parseJSON(d);
        resolve(data);
      },
      (e: any) => {
        reject(e);
      }
    );
  });
};

export default {
  addTimer,
  updateTimer,
  removeCloudTimer,
  updateTimerStatus,
  getCategoryTimerList,
};
