import { Dimensions, NativeModules } from 'react-native';
import { TYSdk, GlobalToast } from 'tuya-panel-kit';
import moment from 'moment';
import { getCurrentMonthViewCount, getCloudServiceStatus, getDomainUrlApi } from './api';
import Strings from './i18n';
import { IPCDpCodeType } from './interface';

/**
 * 延时调用
 * @param cb
 * @param delay
 * @returns
 */
export const delayCall = (cb: () => void, delay = 3000): ReturnType<typeof setTimeout> => {
  const timer = setTimeout(() => {
    cb && cb();
    clearTimeout(timer);
  }, delay);

  return timer;
};
/**
 * 解析16进制字符串
 * @param hex
 * @returns
 */
export const parseHexString = (hex: string): Record<string, any> => {
  if (!hex) return {};
  try {
    return JSON.parse(hex2str(hex));
  } catch (e) {
    return {};
  }
};

/**
 * 解析16进制字符串
 * @param hex
 * @returns
 */
export const hex2str = (hex: string): string => {
  const trimedStr = hex.toString().trim();
  const rawStr =
    trimedStr.substring(0, 2).toLowerCase() === '0x' ? trimedStr.substring(2) : trimedStr;
  const len = rawStr.length;
  if (len % 2 !== 0) return '';
  let curCharCode;
  const resultStr = [];
  for (let i = 0; i < len; i += 2) {
    curCharCode = parseInt(rawStr.substring(i, i + 2), 16);
    resultStr.push(String.fromCharCode(curCharCode));
  }
  return resultStr.join('');
};

/**
 * 判断面板是否支持某个 DP 点
 * @param code
 * @returns
 */
export const isSupportDp = (code: string): boolean => {
  return TYSdk.device.checkDpExist(code);
};

/**
 * 解析 DP 63 协议
 * @param code
 * @returns
 */
export const parseIPCDpCode = (code: string): IPCDpCodeType => {
  const reg = /(\d{2})/g;
  const codeArr = code.match(reg) as string[];
  const typeMap: { [key: string]: any } = {
    '00': 'open',
    '01': 'close',
  };

  const contentMap: { [key: string]: any } = {
    '00': 'openDoor',
    '01': 'alarmModal',
  };
  const requestContent = codeArr[2] === '02' ? 'image' : 'video';

  return {
    requestContent,
    action: typeMap[codeArr[0]],
    requestType: contentMap[codeArr[1]],
    withAudio: codeArr[2] === '01',
    isSupportTwoMic: codeArr[3] === '01',
  };
};

export const timeFormat = (time?: number): string => {
  if (!time) return '';
  return moment(Number(String(time).padEnd(13, '0'))).format('YYYY.MM.DD HH:mm:ss');
};

export const alarmTypeTitle: { [key: number]: any } = {
  0: Strings.getLang('TYLock_alarm_type_0'),
  1: Strings.getLang('TYLock_alarm_type_1'),
  2: Strings.getLang('TYLock_alarm_type_2'),
  3: Strings.getLang('TYLock_alarm_type_3'),
  4: Strings.getLang('TYLock_alarm_type_4'),
  5: Strings.getLang('TYLock_alarm_type_5'),
  6: Strings.getLang('TYLock_alarm_type_6'),
  7: Strings.getLang('TYLock_alarm_type_7'),
  8: Strings.getLang('TYLock_alarm_type_8'),
  9: Strings.getLang('TYLock_alarm_type_9'),
  10: Strings.getLang('TYLock_alarm_type_10'),
  11: Strings.getLang('TYLock_alarm_type_11'),
  12: Strings.getLang('TYLock_alarm_type_12'),
  13: Strings.getLang('TYLock_alarm_type_13'),
  14: Strings.getLang('TYLock_alarm_type_14'),
  15: Strings.getLang('TYLock_alarm_type_15'),
  16: Strings.getLang('TYLock_alarm_type_16'),
  17: Strings.getLang('TYLock_alarm_type_17'),
  18: Strings.getLang('TYLock_alarm_type_18'),
  19: Strings.getLang('TYLock_alarm_type_19'),
  20: Strings.getLang('TYLock_alarm_type_20'),
  21: Strings.getLang('TYLock_alarm_type_21'),
  22: Strings.getLang('TYLock_alarm_type_22'),
  23: Strings.getLang('TYLock_alarm_type_23'),
  24: Strings.getLang('TYLock_alarm_type_24'),
};

/**
 * 判断状态栏是否在手机屏幕内
 * @returns boolean
 */
export const isStatusBarInScreen = (): boolean => {
  const screen = Dimensions.get('screen');
  const window = Dimensions.get('window');

  return screen.height === window.height;
};

export const toNumber = (data: string | number | boolean): number => {
  try {
    return Number(data);
  } catch {
    return 0;
  }
};

/**
 * 查询设备记录的上次上报的 dp 点和现在的时间差
 * @param now 当前时间戳
 * @param code 查询 dp 点code
 * @returns
 */
export const getDpsTimeWithDevId = (now: number, code: string): Promise<number> => {
  return new Promise<number>((resolve, reject) => {
    try {
      NativeModules.TYRCTPanelDeviceManager.getDpsTimeWithDevId(
        TYSdk.devInfo.devId,
        [TYSdk.device.getDpIdByCode(code)],
        (success: any) => {
          const diff = moment(now).diff(success[TYSdk.device.getDpIdByCode(code)], 'seconds');

          resolve(diff);
        }
      );
    } catch (e) {
      reject(e);
    }
  });
};

/** 判断当前是否在主页面 */
export const isMainRoute = (): boolean => {
  const TYsdkNavigator = TYSdk.Navigator as any;
  /** 初始化页面时 没有这个function */
  return TYsdkNavigator.getCurrentRoute ? TYsdkNavigator.getCurrentRoute().name === 'main' : true;
};

/** 获取当月视频可观看次数 */
export const getCurrentMonthViewTime = async (): Promise<void> => {
  const res = await getCurrentMonthViewCount();
  const cloudServiceRes = await getCloudServiceStatus();
  const isVip = cloudServiceRes === 'running';
  const currentMonthTotal = isVip ? 1000 : 50;
  const restCount = currentMonthTotal - (res.count || 0);
  /** 剩余五次弹窗提示 */
  if (restCount <= 5 && restCount > 0) {
    GlobalToast.show({
      text: `本月免费视频剩余次数为${restCount}次`,
      showIcon: false,
    });
  }
};

/**
 * 获取充值链接
 * @returns
 */
export const getRechargeUrl = async (): Promise<string> => {
  return getDomainUrlApi().then((data: any) => {
    const urlData = data[0] || {};
    const { lang } = TYSdk.mobile.mobileInfo;
    const { homeId, uuid, devId } = TYSdk.devInfo;

    const h5Url = `https://${urlData?.appDomain}?lang=${lang}&homeId=${homeId}&deviceId=${devId}&instanceId=${uuid}&serveType=cloud_lock_shortvideo`;
    return h5Url;
  });
};
