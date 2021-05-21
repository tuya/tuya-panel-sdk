import { IGetCustomizePositionResponse } from './interface';
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
  IGetDpsInfosResponse,
  IGetGroupDpsInfosResponse,
  IGetWeatherQualityResponse,
  IGetWeathersResponse,
} from './interface';

/**
 * 获取设备所有 DP 信息
 * @param {string} gwId 设备Id
 * @param {string} devId 设备Id
 * @docs https://developer.tuya.com/cn/docs/iot/equipment-related-interface?id=K9m1dlii6zkf7#title-0-%E8%8E%B7%E5%8F%96%E8%AE%BE%E5%A4%87%E6%89%80%E6%9C%89%20DP%20%E4%BF%A1%E6%81%AF
 */
const getDpsInfos = (params: IGetDpsInfos): Promise<IGetDpsInfosResponse> => {
  return TYSdk.apiRequest('s.m.dev.dp.get', { ...params }, '2.0');
};

/**
 * 更新设备 DP 名称
 * @param {string} gwId 设备Id
 * @param {string} devId 设备Id
 * @param {string} dpId dpId
 * @param {string} name dp自定义名称
 * @docs https://developer.tuya.com/cn/docs/iot/equipment-related-interface?id=K9m1dlii6zkf7#title-1-%E6%9B%B4%E6%96%B0%E8%AE%BE%E5%A4%87%20DP%20%E5%90%8D%E7%A7%B0
 */
const updateDpName = (params: IUpdateDpName): Promise<boolean> => {
  return TYSdk.apiRequest('s.m.dev.dp.name.update', { ...params });
};

/**
 * 获取群组设备所有 DP 信息
 * @param {string} groupId 群组id
 * @docs https://developer.tuya.com/cn/docs/iot/equipment-related-interface?id=K9m1dlii6zkf7#title-2-%E8%8E%B7%E5%8F%96%E7%BE%A4%E7%BB%84%E8%AE%BE%E5%A4%87%E6%89%80%E6%9C%89%20DP%20%E4%BF%A1%E6%81%AF
 */
const getGroupDpsInfos = (groupId: string): Promise<IGetGroupDpsInfosResponse> => {
  return TYSdk.apiRequest('s.m.dev.group.dp.get', { groupId }, '2.0');
};

/**
 * 更新群组设备 DP 名称
 * @param {string} groupId 群组id
 * @param {string} dpId dpId
 * @param {string} name dp自定义名称
 * @docs https://developer.tuya.com/cn/docs/iot/equipment-related-interface?id=K9m1dlii6zkf7#title-3-%E6%9B%B4%E6%96%B0%E7%BE%A4%E7%BB%84%E8%AE%BE%E5%A4%87%20DP%20%E5%90%8D%E7%A7%B0
 */
const updateGroupDpName = (params: IUpdateGroupDpName): Promise<boolean> => {
  return TYSdk.apiRequest('tuya.m.group.dpname.update', { ...params });
};

/**
 * 通过设备 ID 获取当天天气
 * @param {string} devId 设备Id
 * @param {boolean} isLocal 要查询的信息
 * @docs https://developer.tuya.com/cn/docs/iot/equipment-related-interface?id=K9m1dlii6zkf7#title-4-%E8%8E%B7%E5%8F%96%E5%BD%93%E5%A4%A9%E5%A4%A9%E6%B0%94
 */
const getWeatherQuality = (params: IGetWeatherQuality): Promise<IGetWeatherQualityResponse> => {
  return TYSdk.apiRequest('tuya.m.public.weather.get', { ...params });
};

/**
 * 天气预报接口
 * @param {string} devId 设备Id
 * @param {number} dataRange 预报天数（默认值为 7，最大可预报天数为 7）
 * @docs https://developer.tuya.com/cn/docs/iot/equipment-related-interface?id=K9m1dlii6zkf7#title-5-%E8%8E%B7%E5%8F%96%E5%A4%A9%E6%B0%94%E9%A2%84%E6%8A%A5
 */
const getWeathers = (params: IGetWeathers): Promise<IGetWeathersResponse> => {
  return TYSdk.apiRequest('tuya.m.public.weathers.get', { ...params });
};

/**
 * 创建设备自定义位置信息
 * @param {string} devId 设备Id
 * @param {string} lon 经度
 * @param {string} lat 纬度
 * @param {string} locationName 位置名称（目前没用，不影响天气返回结果）
 * @docs https://developer.tuya.com/cn/docs/iot/equipment-related-interface?id=K9m1dlii6zkf7#title-6-%E5%88%9B%E5%BB%BA%E8%AE%BE%E5%A4%87%E8%87%AA%E5%AE%9A%E4%B9%89%E4%BD%8D%E7%BD%AE%E4%BF%A1%E6%81%AF
 */
const saveCustomizePosition = (params: ISaveCustomizePosition): Promise<boolean> => {
  return TYSdk.apiRequest('tuya.m.device.customize.position.save', { ...params });
};

/**
 * 设备自定义位置信息获取
 * @param {string} devId 设备Id
 * @docs https://developer.tuya.com/cn/docs/iot/equipment-related-interface?id=K9m1dlii6zkf7#title-7-%E8%8E%B7%E5%8F%96%E8%87%AA%E5%AE%9A%E4%B9%89%E4%BD%8D%E7%BD%AE%E4%BF%A1%E6%81%AF
 */
const getCustomizePosition = (
  params: IGetCustomizePosition
): Promise<IGetCustomizePositionResponse> => {
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
