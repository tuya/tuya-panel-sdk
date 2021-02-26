// 设备接口
import { TYSdk } from 'tuya-panel-kit';
import { IGetDpsInfos, IUpdateDpName, IUpdateGroupDpName, IGetWeatherQuality } from './interface';

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
 * @param {string} dpName dp自定义名称
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
 * @param {string} dpName dp自定义名称
 */
const updateGroupDpName = (params: IUpdateGroupDpName): Promise<any> => {
  return TYSdk.apiRequest('tuya.m.group.dpname.update', { ...params });
};

/**
 * 获取设备城市天气信息
 * @param {string} devId 设备Id
 * @param {array} codes 要查询的信息
 */

// codes可查询配置
// w.temp   大气温度
// w.thigh	最高温度
// w.tlow	最低温度
// w.humidity	空气湿度
// w.condition	天气状况，晴、雨、雪等
// w.pressure	大气气压
// w.realFeel	体感温度
// w.uvi	紫外线指数
// w.sunRise	日出
// w.sunSet	日落
// w.windSpeed	风速
// w.windDir	风向
// w.windLevel	风级
// w.aqi	空气质量指数
// w.tips	实时天气的一句话提示
// w.rank	详细 AQI 实况及全国排名
// w.pm10	PM 10（可吸入颗粒物）
// w.pm25	PM 2.5（细颗粒物）
// w.o3	臭氧浓度
// w.no2	二氧化氮浓度
// w.co	一氧化碳浓度
// w.so2	二氧化硫浓度
// w.date.n	需要预报的天数，1 <= n <= 7
// t.unix	格林时间（搭配日出和日落使用）
// t.local	本地时间（搭配日出和日落使用）

const getWeatherQuality = (params: IGetWeatherQuality): Promise<any> => {
  return TYSdk.apiRequest('tuya.m.public.weather.get', { ...params });
};

export default {
  getDpsInfos,
  updateDpName,
  getGroupDpsInfos,
  updateGroupDpName,
  getWeatherQuality,
};
