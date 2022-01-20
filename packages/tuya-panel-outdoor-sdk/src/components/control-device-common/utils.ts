import { AsyncStorage, NativeModules } from 'react-native';
import { TYSdk } from 'tuya-panel-kit';
import { putDpfindDevice } from './api';
import { putDpData } from '../../utils';

const _TYDeviceDevice = NativeModules.TYRCTDeviceModule || NativeModules.TYRCTPanelManager;

/**
  查询是否首次加载modal
 */
export const loadedModal = async (key: string): Promise<boolean> => {
  try {
    // const exist = await AsyncStorage.getItem(getPidKey(key));
    // if (exist === 'true') {
    //   // 已经存在，不显示
    //   return true;
    // }
    // await AsyncStorage.setItem(getPidKey(key), 'true');
    return false;
  } catch (error) {
    return false;
  }
};

const getPidKey = (name: string) => {
  const { productId } = TYSdk.devInfo;
  return `${productId}_${name}`;
};

// 获取手机经纬度，app最低支持3.33。这个是3.33之后开发的
export const getCurrentLocation = () => {
  const getLocation = NativeModules.TYRCTPanelManager.requirePreciseLocation;
  return new Promise((resolve, reject) => {
    getLocation(
      {},
      (d: any) => {
        resolve(d);
      },
      (d: any) => {
        reject(d);
      }
    );
  });
};
/**
 *
 * @param bleState 是否手机蓝牙
 * @param dpCode
 * @param dpValue
 */
export const putDpType = async (bleState: boolean, dpCode: string, dpValue: boolean) => {
  if (bleState) {
    putDpData({ [dpCode]: dpValue });
  } else {
    putDpfindDevice(dpCode, dpValue);
  }
};
