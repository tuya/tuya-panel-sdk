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
  IGetLogInSpecifiedTimeResponse,
  IGetDpReportLogResponse,
  IGetDpLogDaysResponse,
  IGetDpResultByMonthResponse,
  IGetDpResultByHourResponse,
  IGetDataWithSpecifiedResponse,
  IGetWeekWithSpecifiedResponse,
  IGetMonthWithSpecifiedResponse,
  IGetMultiDpsAllResultResponse,
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
 * @docs https://developer.tuya.com/cn/docs/iot/data-statistics-related-interface?id=K9m1dlf41ex5f#title-0-%E8%8E%B7%E5%8F%96%20DP%20%E7%82%B9%E6%8C%87%E5%AE%9A%E6%97%B6%E9%97%B4%E6%AE%B5%E4%B8%8A%E6%8A%A5%E6%97%A5%E5%BF%97
 */
const getLogInSpecifiedTime = (
  params: IGetLogInSpecifiedTime
): Promise<IGetLogInSpecifiedTimeResponse> => {
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
 * @docs https://developer.tuya.com/cn/docs/iot/data-statistics-related-interface?id=K9m1dlf41ex5f#title-1-%E8%8E%B7%E5%8F%96%20DP%20%E7%82%B9%E4%B8%8A%E6%8A%A5%E6%97%A5%E5%BF%97
 */
const getDpReportLog = (params: IGetDpReportLog): Promise<IGetDpReportLogResponse> => {
  return TYSdk.apiRequest('m.smart.operate.log', { ...params }, '2.0');
};

/**
 * 获取用户操作的下发日志
 * @param {string} devId 设备Id
 * @param {string} dpIds dpId
 * @param {number} offset 偏离值
 * @param {number} limit 最大值, 最大值上限为 1000,
 * @param {string} sortType 'DESC' 倒序 或 'ASC' 顺序, 默认为 'DESC'
 * @docs https://developer.tuya.com/cn/docs/iot/data-statistics-related-interface?id=K9m1dlf41ex5f#title-2-%E8%8E%B7%E5%8F%96%E7%94%A8%E6%88%B7%E6%93%8D%E4%BD%9C%E7%9A%84%E4%B8%8B%E5%8F%91%E6%97%A5%E5%BF%97
 */
const getLogUserAction = (
  params: IGetDpReportLog,
  version = '1.0'
): Promise<IGetDpReportLogResponse> => {
  return TYSdk.apiRequest('m.smart.operate.publish.log', { ...params }, version);
};

/**
 * 获取设备月的每日上报的数据统计
 * @param {string} devId 设备Id
 * @param {string} dpId dpId
 * @param {string} startDay 开始日期，例如20180529
 * @param {string} endDay 结束日期，例如20180531
 * @param {string} type 统计的类型，sum、minux 或 max
 * @docs https://developer.tuya.com/cn/docs/iot/data-statistics-related-interface?id=K9m1dlf41ex5f#title-3-%E8%8E%B7%E5%8F%96%E8%AE%BE%E5%A4%87%E6%AF%8F%E6%97%A5%E4%B8%8A%E6%8A%A5%E7%9A%84%E6%95%B0%E6%8D%AE%E7%BB%9F%E8%AE%A1
 */
const getDpLogDays = (params: IGetDpLogDays): Promise<IGetDpLogDaysResponse> => {
  return TYSdk.apiRequest('tuya.m.dp.stat.days.list', { ...params });
};

/**
 * 按月（一年）获取 DP 点的统计结果
 * @param {string} devId 设备Id
 * @param {string} dpId dpId
 * @param {string} type 统计的类型，sum、minux 或 max
 * @docs https://developer.tuya.com/cn/docs/iot/data-statistics-related-interface?id=K9m1dlf41ex5f#title-4-%E6%8C%89%E6%9C%88%EF%BC%88%E4%B8%80%E5%B9%B4%EF%BC%89%E8%8E%B7%E5%8F%96%20DP%20%E7%82%B9%E7%9A%84%E7%BB%9F%E8%AE%A1%E7%BB%93%E6%9E%9C
 */
const getDpResultByMonth = (params: IGetDpResultByMonth): Promise<IGetDpResultByMonthResponse> => {
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
 * @docs https://developer.tuya.com/cn/docs/iot/data-statistics-related-interface?id=K9m1dlf41ex5f#title-5-%E6%8C%89%E5%B0%8F%E6%97%B6%E8%8E%B7%E5%8F%96%20DP%20%E7%82%B9%E7%9A%84%E7%BB%9F%E8%AE%A1%E7%BB%93%E6%9E%9C
 */
const getDpResultByHour = (params: IGetDpResultByHour): Promise<IGetDpResultByHourResponse> => {
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
 * @docs https://developer.tuya.com/cn/docs/iot/data-statistics-related-interface?id=K9m1dlf41ex5f#title-6-%E8%8E%B7%E5%8F%96%E6%8C%87%E5%AE%9A%E5%A4%A9%E6%95%B0%E8%8C%83%E5%9B%B4%E5%86%85%E7%9A%84%E6%95%B0%E6%8D%AE
 */
const getDataWithSpecified = (
  params: IGetDataWithSpecified
): Promise<IGetDataWithSpecifiedResponse> => {
  return TYSdk.apiRequest('tuya.m.dp.rang.stat.day.list', { ...params }, '2.0');
};

/**
 * 获取指定周范围内的数据
 * @param {string} devId 设备Id
 * @param {string} dpId dpId
 * @param {string} startWeek 开始周
 * @param {string} endWeek 结束周
 * @param {string} type 统计的类型，sum、minux 或 avg
 * @docs https://developer.tuya.com/cn/docs/iot/data-statistics-related-interface?id=K9m1dlf41ex5f#title-7-%E8%8E%B7%E5%8F%96%E6%8C%87%E5%AE%9A%E5%91%A8%E8%8C%83%E5%9B%B4%E5%86%85%E7%9A%84%E6%95%B0%E6%8D%AE
 */
const getWeekWithSpecified = (
  params: IGetWeekWithSpecified
): Promise<IGetWeekWithSpecifiedResponse> => {
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
 * @docs https://developer.tuya.com/cn/docs/iot/data-statistics-related-interface?id=K9m1dlf41ex5f#title-8-%E8%8E%B7%E5%8F%96%E6%8C%87%E5%AE%9A%E6%9C%88%E8%8C%83%E5%9B%B4%E5%86%85%E7%9A%84%E6%95%B0%E6%8D%AE
 */
const getMonthWithSpecified = (
  params: IGetMonthWithSpecified
): Promise<IGetMonthWithSpecifiedResponse> => {
  return TYSdk.apiRequest('tuya.m.dp.rang.stat.month.list', { ...params }, '2.0');
};

/**
 * 获取单个 DP 点所有统计结果的聚合
 * @param {string} devId 设备Id
 * @param {string} dpId dpId
 * @param {string} type 统计的类型，sum、minux 或 avg
 * @docs https://developer.tuya.com/cn/docs/iot/data-statistics-related-interface?id=K9m1dlf41ex5f#title-9-%E8%8E%B7%E5%8F%96%E5%8D%95%E4%B8%AA%20DP%20%E7%82%B9%E6%89%80%E6%9C%89%E7%BB%9F%E8%AE%A1%E7%BB%93%E6%9E%9C%E7%9A%84%E8%81%9A%E5%90%88
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
 * @docs https://developer.tuya.com/cn/docs/iot/data-statistics-related-interface?id=K9m1dlf41ex5f#title-10-%E8%8E%B7%E5%8F%96%E5%A4%9A%E4%B8%AA%20DP%20%E7%82%B9%E6%89%80%E6%9C%89%E7%BB%9F%E8%AE%A1%E7%BB%93%E6%9E%9C%E7%9A%84%E8%81%9A%E5%90%88
 */
const getMultiDpsAllResult = (
  params: IGetMultiDpsAllResult
): Promise<IGetMultiDpsAllResultResponse> => {
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
