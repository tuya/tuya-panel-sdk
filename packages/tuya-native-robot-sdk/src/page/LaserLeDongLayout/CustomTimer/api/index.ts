import { TYSdk, Utils } from '@tuya-rn/tuya-native-components';
import { parseJSON } from '../utils';

const { TimeUtils } = Utils;

interface ITimerParams {
  category: string;
  loops: string;
  instruct: string;
  aliasName: string;
  bizId?: string;
  bizType?: 0 | 1; // 设备定时或设备组定时
  timeZone?: string;
  isAppPush?: boolean;
  actionType?: 'device' | 'device_group';
  options?: string;
}

interface IEditTimerParams extends ITimerParams {
  groupId: string;
}

/**
 * 添加定时
 * 支持群组定时
 */
export const addTimer = (params: ITimerParams) => {
  return new Promise((resolve, reject) => {
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
    TYSdk.apiRequest(
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
 * 更新定时
 * 支持群组定时
 */
export const updateTimer = (params: IEditTimerParams) => {
  return new Promise((resolve, reject) => {
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
    TYSdk.apiRequest(
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

// 定时是否支持开启执行通知
export const checkIsSupportNotice = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const { groupId: devGroupId, devId } = TYSdk.devInfo;
    const bizType = devGroupId ? 1 : 0;
    TYSdk.apiRequest(
      {
        a: 'tuya.m.timer.support.notice',
        postData: {
          bizId: devGroupId || devId,
          bizType,
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
