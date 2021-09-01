import { Notification, GlobalToast, TYSdk } from 'tuya-panel-kit';
import { NativeModules } from 'react-native';

const bleManager = NativeModules.TYRCTBLEManager;
let flag = true;

// export const reconnectBle = (countdown: number) => {
//   // 如果设备离线，则在面板内自动触发一次蓝牙连接
//   const { devId, deviceOnline } = TYSdk.devInfo;
//   if (!deviceOnline && flag) {
//     let timer;
//     let time = countdown;
//     flag = false;
//     timer = setInterval(() => {
//       time--;
//       Notification.show({
//         theme: {
//           warningIcon: 'black',
//         },
//         message: Strings.formatValue('connectBle', time),
//         enableClose: false,
//         autoCloseTime: time * 1000,
//       });
//       if (deviceOnline) {
//         flag = true;
//         clearInterval(timer);
//         Notification.hide();
//         GlobalToast.show({
//           showIcon: false,
//           text: Strings.getLang('bleConnectSuccess'),
//         });
//       }
//       if (time === 1) {
//         flag = true;
//         clearInterval(timer);
//         GlobalToast.show({
//           showIcon: false,
//           text: Strings.getLang('bleConnectFailed'),
//         });
//       }
//     }, 1000);
//     return bleManager.startConnectBleDevice(devId);
//   }
// };

/**
 * @language zh-CN
 * @description 检测是否拥有需要的能力并且没有不需要的能力
 * @param {number} hex 设备能力值
 * @return {boolean} 返回是否满足条件
 */
/**
 * @language en-US
 * @description Check whether 'capability' have the required abilities and whether 'capability' don’t have the abilities you don’t need
 * @param {number} capability device capability
 * @return {boolean} Return whether the condition is met
 */
export const getPswMaxLen = (hex: number) => {
  const hexMap = { 4: 12, 5: 12, 6: 12, 7: 11, 8: 11, 9: 10, 10: 10 };
  return hexMap[hex] || 10;
};

/**
 * @language zh-CN
 * @description 检测是否拥有需要的能力并且没有不需要的能力
 * @param {number} capability 设备能力值
 * @return {boolean} 返回是否满足条件
 */
/**
 * @language en-US
 * @description Check whether 'capability' have the required abilities and whether 'capability' don’t have the abilities you don’t need
 * @param {number} capability device capability
 * @return {boolean} Return whether the condition is met
 */
export const getDefaultRandomLen = (hex: number) => {
  const hexMap = { 4: 8, 5: 8, 6: 8, 7: 8, 8: 7, 9: 7, 10: 6 };
  return hexMap[hex] || 6;
};
