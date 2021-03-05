// 设备接口
import { TYSdk } from 'tuya-panel-kit';
import {
  IGetDpsInfos,
  IUpdateDpName,
  IUpdateGroupDpName,
  IGetWeatherQuality,
  IGetWeathers,
  ISaveCustomizePosition,
  IGetCustomizePosition,
} from './interface';

/**
 * 获取设备所有 DP 信息
 * @param {string} gwId 设备Id
 * @param {string} devId 设备Id
 */
const getDpsInfos = (params: IGetDpsInfos): Promise<any> => {
  return TYSdk.apiRequest('s.m.dev.dp.get', { ...params }, '2.0');
};

/**
 * 更新设备 DP 名称
 * @param {string} gwId 设备Id
 * @param {string} devId 设备Id
 * @param {string} dpId dpId
 * @param {string} name dp自定义名称
 */
const updateDpName = (params: IUpdateDpName): Promise<any> => {
  return TYSdk.apiRequest('s.m.dev.dp.name.update', { ...params });
};

/**
 * 获取群组设备所有 DP 信息
 * @param {string} groupId 群组id
 */
const getGroupDpsInfos = (groupId: string): Promise<any> => {
  return TYSdk.apiRequest('s.m.dev.group.dp.get', { groupId }, '2.0');
};

/**
 * 更新群组设备 DP 名称
 * @param {string} groupId 群组id
 * @param {string} dpId dpId
 * @param {string} name dp自定义名称
 */
const updateGroupDpName = (params: IUpdateGroupDpName): Promise<any> => {
  return TYSdk.apiRequest('tuya.m.group.dpname.update', { ...params });
};

/**
 * 通过设备 ID 获取当天天气
 * @param {string} devId 设备Id
 * @param {boolean} isLocal 要查询的信息
 */
const getWeatherQuality = (params: IGetWeatherQuality): Promise<any> => {
  return TYSdk.apiRequest('tuya.m.public.weather.get', { ...params });
};

/**
 * 天气预报接口
 * @param {string} devId 设备Id
 * @param {number} dataRange 预报天数（默认值为 7，最大可预报天数为 7）
 */
const getWeathers = (params: IGetWeathers): Promise<any> => {
  return TYSdk.apiRequest('tuya.m.public.weathers.get', { ...params });
};

/**
 * 创建设备自定义位置信息
 * @param {string} devId 设备Id
 * @param {string} lon 经度
 * @param {string} lat 纬度
 * @param {string} locationName 位置名称（目前没用，不影响天气返回结果）
 */
const saveCustomizePosition = (params: ISaveCustomizePosition): Promise<any> => {
  return TYSdk.apiRequest('tuya.m.device.customize.position.save', { ...params });
};

/**
 * 设备自定义位置信息获取
 * @param {string} devId 设备Id
 */
const getCustomizePosition = (params: IGetCustomizePosition): Promise<any> => {
  return TYSdk.apiRequest('tuya.m.device.customize.position.get', { ...params });
};

export default {
  getDpsInfos,
  updateDpName,
  getGroupDpsInfos,
  updateGroupDpName,
  getWeatherQuality,
  getWeathers,
  saveCustomizePosition,
  getCustomizePosition,
};
