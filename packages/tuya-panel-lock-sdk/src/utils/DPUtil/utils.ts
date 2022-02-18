import { NativeModules } from 'react-native';
import { TYSdk } from 'tuya-panel-kit';
import { DpDataType, DpKeyType, IObserver, ObjType } from './interface';
import ObserverMap from './observerMap';
import { checkHasCurrentDp, replyCb, symbolTimer } from './symbols';

/**
 * 获取 dp 上次上报的时间
 * @param code dpCode
 * @returns
 */
export const getLastDpTime = (code: string): Promise<number> =>
  new Promise((resolve, reject) => {
    try {
      NativeModules.TYRCTPanelDeviceManager.getDpsTimeWithDevId(
        TYSdk.devInfo.devId,
        [TYSdk.device.getDpIdByCode(code)],
        (success: any) => {
          resolve(success[TYSdk.device.getDpIdByCode(code)]);
        }
      );
    } catch (e) {
      reject(e);
    }
  });

/**
 * 获取一个 Observer 中 监听的 dp 上次上报的时间
 */
export const getObserverLastDpTime = async (
  dpKey: DpKeyType<string>
): Promise<ObjType | number> => {
  if (Array.isArray(dpKey)) {
    const times = await Promise.all(dpKey.map(dp => () => getLastDpTime(dp)));
    return dpKey.reduce((dpsTime, dp, index) => {
      // eslint-disable-next-line no-param-reassign
      dpsTime[dp] = times[index];
      return dpsTime;
    }, {} as ObjType);
  }
  if (typeof dpKey === 'string') {
    const time = await getLastDpTime(dpKey);
    return time;
  }
  const time = await getLastDpTime(dpKey.description);
  return time;
};

// 延时调用
export const delayCall = (cb: () => void, delay = 3000): ReturnType<typeof setTimeout> => {
  const timer = setTimeout(() => {
    cb && cb();
    clearTimeout(timer);
  }, delay);

  return timer;
};

/** dpKey Symbol化 */
export const dpKeyWrap = (dpKey: string): symbol => Symbol(dpKey);

/** 判断结果 并行触发 每个 Observer 的回调 */
export const asyncDispatchEachObserverLit = (
  obList: ObserverMap<DpKeyType<string>, IObserver<DpKeyType<string>>>,
  data: DpDataType,
  isMock: boolean,
  args: any[]
): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      let compledCount = 0;
      const totalCount = obList.size;
      if (totalCount === 0) resolve();
      obList.forEach(async (ob, dpKey) => {
        const pass = await ob[checkHasCurrentDp](data, isMock);

        if (pass) {
          let dpValues: any;

          if (typeof dpKey === 'string') {
            dpValues = data.payload[dpKey];
          } else if (Array.isArray(dpKey)) {
            dpValues = dpKey.reduce((ans, dp) => {
              // eslint-disable-next-line no-param-reassign
              ans[dp] = data.payload[dp];
              return ans;
            }, {} as ObjType);
          } else if (typeof dpKey === 'symbol') {
            dpValues = data.payload[dpKey.description];
          }

          typeof ob[replyCb] === 'function' && ob[replyCb](dpValues, ...args);
          /** 设备答复 去掉超时监听 */
          if (ob[symbolTimer] !== -1) {
            clearTimeout(ob[symbolTimer]);
            obList.delete(dpKey);
          }
        }

        compledCount += 1;
        if (compledCount === totalCount) {
          resolve();
        }
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      reject(e);
    }
  });
};
