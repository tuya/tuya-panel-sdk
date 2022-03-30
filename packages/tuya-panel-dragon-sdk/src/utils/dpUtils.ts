import { NativeModules } from 'react-native';
import { DpData } from '../interface';

const _TYDeviceDevice = NativeModules.TYRCTDeviceModule || NativeModules.TYRCTPanelManager;

export const putDpData = async (data: DpData, option: number) => {
  console.log('-----数据下发', data);
  return new Promise((resolve, reject) => {
    _TYDeviceDevice.putDpData(
      {
        command: data, // {"1": true, "2": false}
        option: typeof option === 'undefined' ? 3 : option, // 0，静音； 1，震动；2,声音； 3，震动声音
      },
      () => resolve({ success: true, data }),
      (d: any) => {
        console.log('-----返回结果错误?', d);
        reject(d);
      }
    );
  });
};

export const putDpDataByCodes = async (data: DpData, option: number) => {
  console.log('-----数据下发', data);
  return new Promise((resolve, reject) => {
    _TYDeviceDevice.putDpData(
      {
        command: data, // {"1": true, "2": false}
        option: typeof option === 'undefined' ? 3 : option, // 0，静音； 1，震动；2,声音； 3，震动声音
      },
      () => resolve({ success: true, data }),
      (d: any) => {
        console.log('-----返回结果错误?', d);
        reject(d);
      }
    );
  });
};

export default { putDpData, putDpDataByCodes };
