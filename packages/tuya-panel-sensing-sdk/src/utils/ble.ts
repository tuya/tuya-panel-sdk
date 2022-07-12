import { TYSdk, Utils } from 'tuya-panel-kit';
import { NativeEventEmitter, NativeModules } from 'react-native';

export const TYBleNative = NativeModules.TYRCTBLEManager || {};
export const TYDeviceManager = NativeModules.TYRCTPanelDeviceManager;
export const TYRCTBLEManagerEmitter = new NativeEventEmitter(TYBleNative);
const TYBasicNative = NativeModules.TYRCTPanelDeviceManager;

export const TYBeaconNative = NativeModules.TYRCTPublicBLEBeaconManager;

const waitFunction = (fn: any, ...args: any) => {
  return new Promise((resolve, reject) => {
    fn(
      ...args,
      (result: any) => {
        resolve(result === '' ? true : result);
      },
      // eslint-disable-next-line no-shadow
      (reject: any) => {
        __DEV__ && console.warn('拒绝reject', reject);
        resolve(false);
      }
    );
  });
};

/**
 * @description 是否是蓝牙设备
 * @param capability 标识
 * @returns {boolean}
 */
export const isBleDevice = (capability: number) => {
  const isBle = !!Utils.NumberUtils.getBitValue(capability, 10);
  const isBleMesh = !!Utils.NumberUtils.getBitValue(capability, 11);
  const isSigMesh = !!Utils.NumberUtils.getBitValue(capability, 15);
  return isBle || isBleMesh || isSigMesh;
};

/**
 * @description 是否是在网关
 * @returns {boolean}
 */
export const isGateway = () => {
  const { capability, parentId, meshId = '', isCloudOnline, sigmeshId } = TYSdk.devInfo;
  const isBleMesh = !!Utils.NumberUtils.getBitValue(capability, 11);
  const isSigMesh = !!Utils.NumberUtils.getBitValue(capability, 15);
  const isMesh = isBleMesh || isSigMesh;
  let result = false;
  if (isSigMesh && parentId) {
    result = parentId !== sigmeshId;
  } else if (isBleMesh && parentId) {
    result = parentId !== meshId;
  } else if (!isMesh) {
    result = !!parentId;
  } else if (isMesh && !parentId) {
    // 安卓sigmesh设备网关下parentId不反回
    result = !!isCloudOnline;
  } else {
    result = false;
  }
  return result;
};

/**
 * @description 获取设备在线状态,返回值附带通道类型
 * @returns
 */
export const getOnlineType = () =>
  new Promise(resolve =>
    TYBasicNative.getDeviceOnlineWithDevId(TYSdk.devInfo.devId, (res: any) => resolve(res))
  );

/**
 * @description 开始蓝牙连接
 * @returns
 */
export const startBleConnect = () =>
  waitFunction(TYBleNative.connectBleDevice, TYSdk.devInfo.devId) as Promise<boolean>;

/**
 * @description 停止蓝牙连接
 * @returns
 */
export const stopBleConnect = () =>
  waitFunction(TYBleNative.disconnectBleDevice, TYSdk.devInfo.devId);

export const isBleBeacon = (): Promise<boolean> => {
  return new Promise((resolve: any) => {
    TYBeaconNative.bluetoothCapabilityOfBLEBeacon(TYSdk.devInfo.devId, (res: any) => resolve(res));
  });
};

/**
 * @description 开启大数据通道
 * @returns
 */
export const postBigData = () =>
  waitFunction(TYBleNative.postBleBigDataChannel, TYSdk.devInfo.devId, {
    type: 1,
    command: 'start',
  });

/**
 * @description 开启beacon扫描
 * @returns
 */
export const startBeaconScan = () =>
  waitFunction(TYBeaconNative.startBLEScanBeacon, TYSdk.devInfo.devId);

/**
 *
 * @returns 停止beacon 扫描
 */
export const stopBeaconScan = () =>
  waitFunction(TYBeaconNative.stopBLEScanBeacon, TYSdk.devInfo.devId);

/**
 * @description 触发监听，ps：要想监听事件有上报，需触发该方法
 * @returns
 */
export const subBleConnect = () => TYBleNative.subscribeBleConnectStatus(TYSdk.devInfo.devId);

/**
 * @description 停止监听
 * @returns
 */
export const unSubBleConnect = () => TYBleNative.unsubscribeBleConnectStatus(TYSdk.devInfo.devId);

/**
 * 前提条件是蓝牙设备，且在3.2x.xx版本的app
 * 1、进入面板，发起蓝牙连接请求 ->
 * 2.1、连接成功，app会发起大数据通道请求，等待大数据上传完成响应。面板请求断开连接。
 * 2.2、如连接失败，面板发起beacon扫描。
 * 3、断开连接后，面板发起beacon扫描
 * 4、退出面板，关闭beacon扫描
 */

/**
 * @description RN 调用原生接口 大数据通道操作，支持进度反馈
 * @returns
 */
export const postBleBigDataChannelWithProgress = () =>
  waitFunction(TYBleNative.postBleBigDataChannelWithProgress, {
    devId: TYSdk.devInfo.devId,
    params: { command: 'start' },
  });

const BleSDK = {
  isBleDevice,
  isGateway,
  getOnlineType,
  isBleBeacon,
  postBigData,
  startBeaconScan,
  stopBeaconScan,
  subBleConnect,
  unSubBleConnect,
  postBleBigDataChannelWithProgress,
  TYRCTBLEManagerEmitter,
  TYBleNative,
  TYDeviceManager,
  startBleConnect,
  stopBleConnect,
};

export default BleSDK;
