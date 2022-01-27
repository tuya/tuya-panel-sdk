import { AsyncStorage, NativeModules } from 'react-native';
import { TYSdk } from 'tuya-panel-kit';
import { getDeviceLocation, putDpfindDevice } from './api';
import utils from '../../../utils';
import { ILocation } from './interface';

/**
 * 获取位置
 */
export const getLocation = async () => {
  try {
    // 获取设备位置
    const device = getDeviceLocation();
    // 获取手机位置
    const phone = getCurrentLocation();
    const res = await Promise.all<ILocation>([device, phone]);
    if (res.length >= 2) {
      const deviceResult = res[0];
      const phoneResult = res[1];
      const { lat, lon, reportTime } = deviceResult;
      const { address, latitude, longitude } = phoneResult;
      const p = {
        device: {
          latitude: lat,
          longitude: lon,
          reportTime,
        },
        phone: {
          address,
          latitude,
          longitude,
        },
      };
      return { error: false, ...p };
    }
    return { error: true, ...{ msg: '失败' } };
  } catch (error) {
    return { error: true, ...error };
  }
};

/**
  查询是否首次加载modal
 */
export const loadedModal = async (key: string): Promise<boolean> => {
  try {
    const exist = await AsyncStorage.getItem(getPidKey(key));
    if (exist === 'true') {
      // 已经存在，不显示
      return true;
    }
    await AsyncStorage.setItem(getPidKey(key), 'true');
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
  const location = NativeModules.TYRCTPanelManager.requirePreciseLocation;
  return new Promise((resolve, reject) => {
    location(
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
    utils.putDpData({ [dpCode]: dpValue });
  } else {
    putDpfindDevice(dpCode, dpValue);
  }
};
