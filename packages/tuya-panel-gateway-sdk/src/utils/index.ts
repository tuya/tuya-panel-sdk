import { TYSdk, Utils, DevInfo } from 'tuya-panel-kit';
import { unsupportedBluetoothPidList } from '../config';

const { getBitValue } = Utils.NumberUtils;

/**
 * @language zh-CN
 * @description 设备能力位的枚举
 */
/**
 * @language en-US
 * @description Enumeration of device capability bits
 */
// eslint-disable-next-line no-shadow
export enum DeviceCapability {
  WIFI = 0, // Wi-Fi
  CABLE = 1, // cable（以太网）
  GPRS = 2, // gprs（2/3/4G）
  NBIOT = 3, // NB-IOT
  BLUETOOTH = 10, // 蓝牙BLE
  BLEMESH = 11, // 涂鸦mesh
  ZIGBEE = 12, // zigbee
  INFRARED = 13, // infrared（红外）
  SUBPIECES = 14, // subpieces（315，433等）
  SIGMESH = 15, // Sigmesh
  MCU = 16, // MCU
  TYMESH = 17, // 涂鸦Sub-G Mesh
  ZWAVE = 18, // Zwave
  PLMESH = 19, // 蓝牙mesh
  CAT1 = 20, // LTE Cat1
  BEACON = 21, // 蓝牙beacon
  // 以下能力，具体值待确认
  // CAT4 = 22,
  // CAT10 = 23,
  // ITECATM = 24,
  // THREAD = 25,
}

/**
 * @language zh-CN
 * @description 检测是否拥有需要的能力并且没有不需要的能力
 * @param {number} capability 设备能力值
 * @param {Array<DeviceCapability | number>} requiredCapabilityList 需要的能力位列表
 * @param {Array<DeviceCapability | number>} unneededCapabilityList 不需要的能力位列表
 * @return {boolean} 返回是否满足条件
 */
/**
 * @language en-US
 * @description Check whether 'capability' have the required abilities and whether 'capability' don’t have the abilities you don’t need
 * @param {number} capability device capability
 * @param {Array<DeviceCapability | number>} requiredCapabilityList List of required ability bits
 * @param {Array<DeviceCapability | number>} unneededCapabilityList List of unneeded ability bits
 * @return {boolean} Return whether the condition is met
 */
const checkCapability = (
  capability: number,
  requiredCapabilityList: Array<DeviceCapability | number> = [],
  unneededCapabilityList: Array<DeviceCapability | number> = []
): boolean => {
  return (
    requiredCapabilityList.every(d => !!getBitValue(capability, d)) &&
    !unneededCapabilityList.some(d => !!getBitValue(capability, d))
  );
};

/**
 * @language zh-CN
 * @description 获取当前家庭下所有设备
 * @return {Promise<Array<DevInfo>>} 返回所有设备的列表的Promise对象
 */
/**
 * @language en-US
 * @description Get all devices in the current family
 * @return {Promise<Array<DevInfo>>} Promise object that returns a list of all devices
 */
const getAllDevice = (): Promise<Array<DevInfo>> => {
  return new Promise((resolve, reject) => {
    TYSdk.native.getDeviceList(resolve, reject);
  });
};

/**
 * @language zh-CN
 * @description 获取网关下的所有子设备
 * @param {string} devId 网关设备id
 * @return {Promise<Array<DevInfo>>} 子设备列表的Promise对象
 */
/**
 * @language en-US
 * @description Get a list of all sub-devices under the gateway
 * @param {string} devId Gateway devId
 * @return {Promise<Array<DevInfo>>} A promise of list of all sub-devices under the gateway
 */
const getAllSubDevList = (devId?: string): Promise<Array<DevInfo>> => {
  return new Promise((resolve, reject) => {
    TYSdk.native.getSubDeviceList(
      {
        devId: devId || TYSdk.devInfo.devId,
      },
      resolve,
      reject
    );
  });
};

/**
 * @language zh-CN
 * @description 获取指定规则下网关下的子设备列表
 * @param {Array<(capability: number, devInfo?: DevInfo) => boolean>} rules 筛选的规则
 * @param {string} devId 网关设备id
 * @return {Promise<Array<Array<DevInfo>>>} 返回一个Promise对象。这个Promise 返回一个数组，数组里的成员是按照规则顺序筛选出来的设备列表
 */
/**
 * @language en-US
 * @description Get the list of sub-devices under the gateway under the specified rule
 * @param {Array<(capability: number, devInfo?: DevInfo) => boolean>} rules Filtering rules
 * @param {string} devId Gateway devId
 * @return {Promise<Array<Array<DevInfo>>>} Return a Promise object. This Promise returns an array, and the members in the array are a list of devices filtered in the order of the rules
 */
const getSpecificSubDevList = async (
  rules: Array<(capability: number, devInfo?: DevInfo) => boolean> = [],
  gatewayDevId?: string
): Promise<Array<Array<DevInfo>>> => {
  const allSubDevList = await getAllSubDevList(gatewayDevId);
  const res = [];
  if (Array.isArray(rules)) {
    rules.forEach((rule, idx) => {
      res[idx] = allSubDevList.filter(devItem => rule(devItem.capability, devItem));
    });
    return res;
  }
  return [allSubDevList];
};

/**
 * @language zh-CN
 * @description 判断是否是蓝牙子设备
 * @param {number} capability 设备能力值
 * @return {boolean} 返回是否是蓝牙子设备
 */
/**
 * @language en-US
 * @description Determine whether it is a Bluetooth sub-device
 * @param {number} capability device capability
 * @return {boolean} Return whether it is a Bluetooth sub-device
 */
const isBlueSub = (capability: number): boolean => {
  return checkCapability(
    capability,
    [DeviceCapability.BLUETOOTH],
    [DeviceCapability.ZIGBEE, DeviceCapability.SIGMESH, DeviceCapability.WIFI]
  );
};

/**
 * @language zh-CN
 * @description 判断是否是sigmesh子设备
 * @param {number} capability 设备能力值
 * @return {boolean} 返回是否是sigmesh子设备
 */
/**
 * @language en-US
 * @description Determine whether it is a sigmesh sub-device
 * @param {number} capability device capability
 * @return {boolean} Return whether it is a sigmesh sub-device
 */
const isSigmeshSub = (capability: number): boolean => {
  return checkCapability(capability, [DeviceCapability.SIGMESH], [DeviceCapability.WIFI]);
};

/**
 * @language zh-CN
 * @description 判断是否是zigbee子设备
 * @param {number} capability 设备能力值
 * @return {boolean} 返回是否是zigbee子设备
 */
/**
 * @language en-US
 * @description Determine whether it is a zigbee sub-device
 * @param {number} capability device capability
 * @return {boolean} Return whether it is a zigbee sub-device
 */
const isZigbeeSub = (capability: number): boolean => {
  return checkCapability(
    capability,
    [DeviceCapability.ZIGBEE],
    [DeviceCapability.WIFI, DeviceCapability.CABLE]
  );
};

/**
 * @language zh-CN
 * @description 判断是否是beacon子设备
 * @param {number} capability 设备能力值
 * @return {boolean} 返回是否是beacon子设备
 */
/**
 * @language en-US
 * @description Determine whether it is a beacon sub-device
 * @param {number} capability device capability
 * @return {boolean} Return whether it is a beacon sub-device
 */
const isBeaconSub = (capability: number): boolean => {
  return checkCapability(
    capability,
    [DeviceCapability.BEACON],
    [DeviceCapability.WIFI, DeviceCapability.CABLE]
  );
};

/**
 * @language zh-CN
 * @description 根据子设备和网关的mesh关系，判断子设备是否是可添加到网关下
 * @param {DevInfo} subDevInfo 子设备信息
 * @param {DevInfo} gatewayDevInfo 网关设备信息
 * @return {boolean} 设备是否是可添加到网关下
 */
/**
 * @language en-US
 * @description According to the mesh relationship between the sub-device and the gateway, determine whether the sub-device can be added to the gateway
 * @param {DevInfo} subDevInfo Sub-device information
 * @param {DevInfo} gatewayDevInfo gateway device information
 * @return {boolean} Is it a addable device
 */
const isAddableMesh = (subDevInfo: DevInfo, gatewayDevInfo = TYSdk.devInfo): boolean => {
  const { meshId, capability } = subDevInfo;
  const { sigmeshId: gatewaySigmeshId, devId: gatewayDevId } = gatewayDevInfo;
  const isSigmesh = isSigmeshSub(capability);
  return isSigmesh || meshId ? meshId === gatewaySigmeshId && meshId !== gatewayDevId : true;
};

/**
 * @language zh-CN
 * @description 判断设备是否是可添加到网关下
 * @param {DevInfo} devInfo 设备信息
 * @param {DevInfo} gatewayDevInfo 网关设备信息
 * @param {Function} isMeshValid 根据设备和网关的mesh关系，判断设备能否添加到网关下
 * @param {Array<String>} bluetoothPidBlackList 蓝牙设备的pid黑名单，如果蓝牙子设备的pid在此黑名单内，则不支持添加到网关下。
 * @param {boolean} supportBeacon 是否支持添加beacon设备
 * @return {boolean} 设备是否是可添加到网关下
 */
/**
 * @language en-US
 * @description Determine whether it is a addable device
 * @param {DevInfo} devInfo device info
 * @param {DevInfo} gatewayDevInfo gateway device information
 * @param {Function} isMeshValid According to the mesh relationship between the device and the gateway, determine whether the device can be added to the gateway
 * @param {Array<String>} isMeshValid The pid blacklist of the Bluetooth device. If the pid of the Bluetooth sub-device is in this blacklist, it is not supported to be added to the gateway.
 * @param {boolean} supportBeacon Whether to support add beacon devices
 * @return {boolean} Is it a addable device
 */
const isAddableDevice = ({
  devInfo,
  gatewayDevInfo = TYSdk.devInfo,
  isMeshValid = isAddableMesh,
  bluetoothPidBlackList = unsupportedBluetoothPidList,
  supportBeacon = false,
}: {
  devInfo: DevInfo;
  gatewayDevInfo?: DevInfo;
  isMeshValid?: (subDevInfo: DevInfo, gatewayDevInfos: DevInfo) => boolean;
  bluetoothPidBlackList?: Array<string>;
  supportBeacon?: boolean;
}): boolean => {
  const { isVDevice, devId, capability, productId } = devInfo;
  const { devId: gatewayDevId } = gatewayDevInfo;

  return (
    // 不是虚拟设备
    isVDevice !== true &&
    // 不是当前网关设备
    devId !== gatewayDevId &&
    // 不是红外设备
    checkCapability(capability, [], [DeviceCapability.INFRARED]) &&
    // 判断子设备和网关的mesh关系
    isMeshValid(devInfo, gatewayDevInfo) &&
    // 当前支持sigmesh、蓝牙、beacon子设备
    (isSigmeshSub(capability) ||
      // 不支持蓝牙1.0的设备不能加到网关
      (isBlueSub(capability) && !bluetoothPidBlackList.includes(productId)) ||
      // RN版本小于5.46的老版本app不支持添加beacon
      (supportBeacon && isBeaconSub(capability)))
  );
};

export default {
  checkCapability,
  getAllDevice,
  getAllSubDevList,
  getSpecificSubDevList,
  isBlueSub,
  isSigmeshSub,
  isZigbeeSub,
  isBeaconSub,
  isAddableMesh,
  isAddableDevice,
};
