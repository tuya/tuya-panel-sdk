// 数据统计接口
import { TYSdk } from 'tuya-panel-kit';
import {
  IGetLogInSpecifiedTime,
  IGetDpReportLog,
  IGetDpLogDays,
  IGetDpResultByMonth,
  IGetDpResultByHour,
  IGetDataWithSpecified,
  IGetWeekWithSpecified,
  IGetMonthWithSpecified,
  IGetMultiDpsAllResult,
} from './interface';

/**
 * 获取 DP 点指定时间段上报日志
 * @param {string} devId 设备Id
 * @param {string} dpIds dpId
 * @param {number} offset 偏离值
 * @param {number} limit 最大值, 最大值上限为 1000,
 * @param {string} startTime 设备上报的时间, 查询起始时间，单位为毫秒
 * @param {string} endTime 设备上报的时间，查询结束时间，单位为毫秒
 * @param {string} sortType DESC 倒序 或 ASC 顺序, 默认为 DESC
 */
const getLogInSpecifiedTime = (params: IGetLogInSpecifiedTime): Promise<any> => {
  return TYSdk.apiRequest('tuya.m.smart.operate.all.log', {
    ...params,
  });
};

/**
 * 获取 DP 点上报日志
 * @param {string} devId 设备Id
 * @param {string} dpIds dpId
 * @param {number} offset 偏离值
 * @param {number} limit 最大值, 最大值上限为 1000,
 * @param {string} sortType 'DESC' 倒序 或 'ASC' 顺序, 默认为 'DESC'
 */
const getDpReportLog = (params: IGetDpReportLog): Promise<any> => {
  return TYSdk.apiRequest('m.smart.operate.log', { ...params }, '2.0');
};

/**
 * 获取用户操作的下发日志
 * @param {string} devId 设备Id
 * @param {string} dpIds dpId
 * @param {number} offset 偏离值
 * @param {number} limit 最大值, 最大值上限为 1000,
 * @param {string} sortType 'DESC' 倒序 或 'ASC' 顺序, 默认为 'DESC'
 */
const getLogUserAction = (params: IGetDpReportLog): Promise<any> => {
  return TYSdk.apiRequest('m.smart.operate.publish.log', { ...params }, '2.0');
};

/**
 * 获取设备月的每日上报的数据统计
 * @param {string} devId 设备Id
 * @param {string} dpId dpId
 * @param {string} startDay 开始日期，例如20180529
 * @param {string} endDay 结束日期，例如20180531
 * @param {string} type 统计的类型，sum、minux 或 max
 */
const getDpLogDays = (params: IGetDpLogDays): Promise<any> => {
  return TYSdk.apiRequest('tuya.m.dp.stat.days.list', { ...params });
};

/**
 * 按月（一年）获取 DP 点的统计结果
 * @param {string} devId 设备Id
 * @param {string} dpId dpId
 * @param {string} type 统计的类型，sum、minux 或 max
 */
const getDpResultByMonth = (params: IGetDpResultByMonth): Promise<any> => {
  return TYSdk.apiRequest('tuya.m.dp.stat.month.list', { ...params });
};

/**
 * 按小时获取 DP 点的统计数据
 * @param {string} devId 设备Id
 * @param {string} dpId dpId
 * @param {string} date 日期
 * @param {string} type 统计的类型，sum、minux 或 avg
 * @param {string} uid 用户id
 * @param {number} auto auto=1 ：中间数据缺失时，使用上一时段的数据补充。auto=2 ：中间数据缺失时，使用#补充
 */
const getDpResultByHour = (params: IGetDpResultByHour): Promise<any> => {
  return TYSdk.apiRequest('tuya.m.dp.rang.stat.hour.list', { ...params });
};

/**
 * 获取指定天数范围内的数据
 * @param {string} devId 设备Id
 * @param {string} dpId dpId
 * @param {string} startDay 开始日期，例如20180529
 * @param {string} endDay 结束日期，例如20180531
 * @param {string} type 统计的类型，sum、minux 或 avg
 * @param {string} uid 用户id
 * @param {number} auto auto=1 ：中间数据缺失时，使用上一时段的数据补充。auto=2 ：中间数据缺失时，使用#补充
 */
const getDataWithSpecified = (params: IGetDataWithSpecified): Promise<any> => {
  return TYSdk.apiRequest('tuya.m.dp.rang.stat.day.list', { ...params }, '2.0');
};

/**
 * 获取指定周范围内的数据
 * @param {string} devId 设备Id
 * @param {string} dpId dpId
 * @param {string} startWeek 开始周
 * @param {string} endWeek 结束周
 * @param {string} type 统计的类型，sum、minux 或 avg
 */
const getWeekWithSpecified = (params: IGetWeekWithSpecified): Promise<any> => {
  return TYSdk.apiRequest('tuya.m.dp.rang.stat.week.list', {
    ...params,
  });
};

/**
 * 获取指定月范围内的数据
 * @param {string} devId 设备Id
 * @param {string} dpId dpId
 * @param {string} startMonth 开始月
 * @param {string} endMonth 结束月
 * @param {string} type 统计的类型，sum、minux 或 avg
 * @param {string} uid 用户id
 * @param {number} auto auto=1 ：中间数据缺失时，使用上一时段的数据补充。auto=2 ：中间数据缺失时，使用#补充
 */
const getMonthWithSpecified = (params: IGetMonthWithSpecified): Promise<any> => {
  return TYSdk.apiRequest('tuya.m.dp.rang.stat.month.list', { ...params }, '2.0');
};

/**
 * 获取单个 DP 点所有统计结果的聚合
 * @param {string} devId 设备Id
 * @param {string} dpId dpId
 * @param {string} type 统计的类型，sum、minux 或 avg
 */
const getDpAllStatistResult = (
  params: IGetDpResultByMonth
): Promise<{ total: string; time: number }> => {
  return TYSdk.apiRequest('tuya.m.dp.stat.total', { ...params });
};

/**
 * 获取多个 DP 点的统计结果的聚合（不限时长）
 * @param {string} devId 设备Id
 * @param {string} dpIds DP 点的 ID，多个 ID 使用逗号（,）分隔
 * @param {string} startTime 开始时间
 * @param {string} endTime 结束时间
 * @param {number} size 一条的页数
 * @param {number} reverse reverse=1: 正序 reverse=2: 倒序
 * @param {number} rowType 查询的类型 rowType=1: 下一页 rowType=-1: 上一页
 * @param {string} startRowKey 开始页索引
 * @param {string} endRowKey: 结束页索引
 */
const getMultiDpsAllResult = (params: IGetMultiDpsAllResult): Promise<any> => {
  return TYSdk.apiRequest('tuya.m.device.query.device.log', {
    ...params,
  });
};

export default {
  getLogInSpecifiedTime,
  getDpReportLog,
  getLogUserAction,
  getDpLogDays,
  getDpResultByMonth,
  getDpResultByHour,
  getDataWithSpecified,
  getWeekWithSpecified,
  getMonthWithSpecified,
  getDpAllStatistResult,
  getMultiDpsAllResult,
};
