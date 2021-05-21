// 云端定时接口
import { TYSdk } from 'tuya-panel-kit';
import {
  IAndSingleTime,
  IQueryTimerTasks,
  IModifySingleTimer,
  IAndGroupTimer,
  IModifyGroupTimer,
  IModDeleteTaskByIds,
  IModDeleteTaskByCategory,
  IGetDpLastTimer,
  IGetLastTimerPeriod,
  IGetAstronomicalList,
  IAstronomical,
  IUpdateAstronomicalStatus,
  IQueryTimerTasksResponse,
  IGetDpLastTimerResponse,
  IGetLastTimerPeriodResponse,
  IGetAstronomicalListResponse,
} from './interface';

/**
 * 添加单次定时
 * @param {string} bizId 单设备 ID（devId） 或者群组设备 ID（groupId)
 * @param {number} bizType 资源类型。0：单设备；1：群组设备。
 * @param {string} actions {/“dps/”:{},/“time/”:“”}
 * @param {string} loops 在0000000基础上，把所选择日期对应位置的 0 改成 1，第一位表示周日。
 * @param {string} category 分类类别
 * @param {number} status 初始化状态，0：关闭；1：开启。
 * @param {boolean} isAppPush 是否发送执行通知
 * @param {string} aliasName 定时备注
 * @docs https://developer.tuya.com/cn/docs/iot/cloud-timing-interface?id=K9m1dlbzt0kdz#title-1-%E6%B7%BB%E5%8A%A0%E5%8D%95%E6%AC%A1%E5%AE%9A%E6%97%B6
 */
const addSingleTimer = (params: IAndSingleTime): Promise<number> => {
  return TYSdk.apiRequest('tuya.m.clock.dps.add', {
    ...params,
  });
};

/**
 * 查询定时任务
 * @param {string} bizId 单设备 ID（devId） 或者群组设备 ID（groupId)
 * @param {number} bizType 资源类型。0：单设备；1：群组设备。
 * @param {string} category 定时分类
 * @docs https://developer.tuya.com/cn/docs/iot/cloud-timing-interface?id=K9m1dlbzt0kdz#title-2-%E6%9F%A5%E8%AF%A2%E5%AE%9A%E6%97%B6%E4%BB%BB%E5%8A%A1
 */
const queryTimerTasks = (params: IQueryTimerTasks): Promise<IQueryTimerTasksResponse> => {
  return TYSdk.apiRequest('tuya.m.clock.dps.list', {
    ...params,
  });
};

/**
 * 修改单次定时
 * @param {string} bizId 单设备 ID（devId） 或者群组设备 ID（groupId)
 * @param {number} bizType 资源类型。0：单设备；1：群组设备。
 * @param {string} id 定时任务主键
 * @param {string} actions {/“dps/”:{},/“time/”:“”}
 * @param {string} loops 在0000000基础上，把所选择日期对应位置的 0 改成 1，第一位表示周日。
 * @param {number} status 初始化状态，0：关闭；1：开启。
 * @param {boolean} isAppPush 是否发送执行通知
 * @param {string} aliasName 定时备注
 * @docs https://developer.tuya.com/cn/docs/iot/cloud-timing-interface?id=K9m1dlbzt0kdz#title-3-%E4%BF%AE%E6%94%B9%E5%8D%95%E6%AC%A1%E5%AE%9A%E6%97%B6
 */
const modifySingleTimer = (params: IModifySingleTimer): Promise<boolean> => {
  return TYSdk.apiRequest('tuya.m.clock.dps.update', {
    ...params,
  });
};

/**
 * 添加分组定时
 * @param {string} bizId 单设备 ID（devId） 或者群组设备 ID（groupId)
 * @param {number} bizType 资源类型。0：单设备；1：群组设备。
 * @param {string} actions [{/“dps/”:{},/“time/”:“”}]，JSON 数据格式。
 * @param {string} loops 在0000000基础上，把所选择日期对应位置的 0 改成 1，第一位表示周日。
 * @param {string} category 分类类别
 * @param {number} status 初始化状态，0：关闭；1：开启。
 * @param {boolean} isAppPush 是否发送执行通知
 * @param {string} aliasName 定时备注
 * @docs https://developer.tuya.com/cn/docs/iot/cloud-timing-interface?id=K9m1dlbzt0kdz#title-5-%E6%B7%BB%E5%8A%A0%E5%88%86%E7%BB%84%E5%AE%9A%E6%97%B6
 */
const addGroupTimer = (params: IAndGroupTimer): Promise<number> => {
  return TYSdk.apiRequest('tuya.m.clock.dps.group.add', {
    ...params,
  });
};

/**
 * 分组定时查询
 * @param {string} bizId 单设备 ID（devId） 或者群组设备 ID（groupId)
 * @param {number} bizType 资源类型。0：单设备；1：群组设备。
 * @param {string} category 定时分类
 * @docs https://developer.tuya.com/cn/docs/iot/cloud-timing-interface?id=K9m1dlbzt0kdz#title-6-%E6%9F%A5%E8%AF%A2%E5%88%86%E7%BB%84%E5%AE%9A%E6%97%B6
 */
const queryGroupTimerTasks = (params: IQueryTimerTasks): Promise<IQueryTimerTasksResponse> => {
  return TYSdk.apiRequest('tuya.m.clock.dps.group.list', {
    ...params,
  });
};

/**
 * 修改分组定时
 * @param {string} bizId 单设备 ID（devId） 或者群组设备 ID（groupId)
 * @param {number} bizType 资源类型。0：单设备；1：群组设备。
 * @param {string} actionsArray [{/“dps/”:{},/“time/”:“”,/“timerId/”:“”}]，JSON 数据格式。
 * @param {string} loops 在0000000基础上，把所选择日期对应位置的 0 改成 1，第一位表示周日。
 * @param {number} status 初始化状态，0：关闭；1：开启。
 * @param {boolean} isAppPush 是否发送执行通知
 * @param {string} aliasName 定时备注
 * @docs https://developer.tuya.com/cn/docs/iot/cloud-timing-interface?id=K9m1dlbzt0kdz#title-7-%E4%BF%AE%E6%94%B9%E5%88%86%E7%BB%84%E5%AE%9A%E6%97%B6
 */
const modifyGroupTimer = (params: IModifyGroupTimer): Promise<boolean> => {
  return TYSdk.apiRequest('tuya.m.clock.dps.group.update', {
    ...params,
  });
};

/**
 * 根据 ids 修改（ 删除 ）任务状态
 * @param {string} bizId 单设备 ID（devId） 或者群组设备 ID（groupId)
 * @param {number} bizType 资源类型。0：单设备；1：群组设备。
 * @param {string} ids 定时任务的 ID。提交多任务时使用逗号（,）分隔。例如"1,2,3,4"。单次提交任务数量不得超过 168。
 * @param {number} status 初始化状态，0：关闭；1：开启；2：删除。
 * @docs https://developer.tuya.com/cn/docs/iot/cloud-timing-interface?id=K9m1dlbzt0kdz#title-9-%E6%A0%B9%E6%8D%AE%20Ids%20%E4%BF%AE%E6%94%B9%EF%BC%88%20%E5%88%A0%E9%99%A4%20%EF%BC%89%E5%AE%9A%E6%97%B6%E4%BB%BB%E5%8A%A1
 */
const modDeleteTaskByIds = (params: IModDeleteTaskByIds): Promise<boolean> => {
  return TYSdk.apiRequest('tuya.m.clock.batch.status.update', {
    ...params,
  });
};

/**
 * 根据 category 修改（ 删除 ）定时任务状态
 * @param {string} bizId 单设备 ID（devId） 或者群组设备 ID（groupId)
 * @param {number} bizType 资源类型。0：单设备；1：群组设备。
 * @param {string} category 定时分类
 * @param {number} status 初始化状态，0：关闭；1：开启；2：删除。
 * @docs https://developer.tuya.com/cn/docs/iot/cloud-timing-interface?id=K9m1dlbzt0kdz#title-10-%E6%A0%B9%E6%8D%AE%20Category%20%E4%BF%AE%E6%94%B9%EF%BC%88%20%E5%88%A0%E9%99%A4%20%EF%BC%89%E5%AE%9A%E6%97%B6%E4%BB%BB%E5%8A%A1
 */
const modDeleteTaskByCategory = (params: IModDeleteTaskByCategory): Promise<boolean> => {
  return TYSdk.apiRequest('tuya.m.clock.category.status.update', {
    ...params,
  });
};

/**
 * 获取某个DP点最近的定时
 * @param {string} bizId 单设备 ID（devId） 或者群组设备 ID（groupId）。
 * @param {string} type device_group 或者 device。
 * @param {string} instruct 格式为'{devId:"xxx",dpId:"1"}'。
 * @docs https://developer.tuya.com/cn/docs/iot/cloud-timing-interface?id=K9m1dlbzt0kdz#title-11-%E8%8E%B7%E5%8F%96%E6%9F%90%E4%B8%AA%20DP%20%E7%82%B9%E6%9C%80%E8%BF%91%E7%9A%84%E5%AE%9A%E6%97%B6
 */
const getDpLastTimer = (params: IGetDpLastTimer): Promise<IGetDpLastTimerResponse> => {
  return TYSdk.apiRequest('s.m.linkage.timer.nearest.get', {
    ...params,
  });
};

/**
 * 获取多个 DP 点最近的定时
 * @param {string} bizId 单设备 ID（devId） 或者群组设备 ID（groupId）。
 * @param {string} type device_group 或者 device。
 * @param {string} instruct 格式为'{devId:"xxx",dpId:"1"}'。
 * @docs https://developer.tuya.com/cn/docs/iot/cloud-timing-interface?id=K9m1dlbzt0kdz#title-12-%E8%8E%B7%E5%8F%96%E5%A4%9A%E4%B8%AA%20DP%20%E7%82%B9%E6%9C%80%E8%BF%91%E7%9A%84%E5%AE%9A%E6%97%B6
 */
const getDpsLastTimer = (params: IGetDpLastTimer): Promise<IGetDpLastTimerResponse> => {
  return TYSdk.apiRequest('s.m.linkage.timer.nearest.bat.get', {
    ...params,
  });
};

/**
 * 获取最近的一条定时（包含时间段判断）
 * @param {string} devId 设备 ID。
 * @param {string} instruct 格式为'{devId:"xxx",dpId:"1"}'。
 * @docs https://developer.tuya.com/cn/docs/iot/cloud-timing-interface?id=K9m1dlbzt0kdz#title-13-%E8%8E%B7%E5%8F%96%E6%9C%80%E8%BF%91%E7%9A%84%E5%AE%9A%E6%97%B6
 */
const getLastTimerPeriod = (params: IGetLastTimerPeriod): Promise<IGetLastTimerPeriodResponse> => {
  return TYSdk.apiRequest('tuya.m.timer.nearest.get', {
    ...params,
  });
};

/**
 * 获取天文定时列表
 * @docs https://developer.tuya.com/cn/docs/iot/cloud-timing-interface?id=K9m1dlbzt0kdz#title-15-%E8%8E%B7%E5%8F%96%E5%A4%A9%E6%96%87%E5%AE%9A%E6%97%B6
 */
const getAstronomicalList = (
  params: IGetAstronomicalList
): Promise<IGetAstronomicalListResponse> => {
  return TYSdk.apiRequest('tuya.m.timer.astronomical.list', {
    ...params,
  });
};

/**
 * 添加天文定时
 * @param {string} bizId 设备 ID 或群组 ID
 * @param {number} bizType 0:设备; 1:设备群组
 * @param {string} loops 周期
 * @param {any} dps dp 点，json 格式
 * @param {number} astronomicalType 天文类型， 0:日出; 1:日落
 * @param {string} timezone 时区
 * @param {string} date 日期 yyyyMMdd
 * @param {string} time 偏移时间，“HH:mm” 24 进制
 * @param {number} offsetType 偏移类型，-1 : 向前; 0 正常; 1 : 向后
 * @param {number} lat 纬度
 * @param {number} lon 经度
 * @docs https://developer.tuya.com/cn/docs/iot/cloud-timing-interface?id=K9m1dlbzt0kdz#title-16-%E6%B7%BB%E5%8A%A0%E5%A4%A9%E6%96%87%E5%AE%9A%E6%97%B6
 */
const addAstronomical = (params: IAstronomical): Promise<number> => {
  return TYSdk.apiRequest('tuya.m.timer.astronomical.add', {
    ...params,
  });
};

/**
 * 修改天文定时
 * @param {string} bizId 设备 ID 或群组 ID
 * @param {number} bizType 0:设备; 1:设备群组
 * @param {string} loops 周期
 * @param {any} dps dp 点，json 格式
 * @param {number} astronomicalType 天文类型， 0:日出; 1:日落
 * @param {string} timezone 时区
 * @param {string} date 日期 yyyyMMdd
 * @param {string} time 偏移时间，“HH:mm” 24 进制
 * @param {number} offsetType 偏移类型，-1 : 向前; 0 正常; 1 : 向后
 * @param {number} lat 纬度
 * @param {number} lon 经度
 * @docs https://developer.tuya.com/cn/docs/iot/cloud-timing-interface?id=K9m1dlbzt0kdz#title-17-%E4%BF%AE%E6%94%B9%E5%A4%A9%E6%96%87%E5%AE%9A%E6%97%B6
 */
const updateAstronomical = (params: IAstronomical): Promise<boolean> => {
  return TYSdk.apiRequest('tuya.m.timer.astronomical.update', {
    ...params,
  });
};

/**
 * 修改天文定时使能
 * @param {string} id 定时任务id
 * @param {number} status 0:关闭；1开启
 * @docs https://developer.tuya.com/cn/docs/iot/cloud-timing-interface?id=K9m1dlbzt0kdz#title-18-%E6%98%AF%E5%90%A6%E5%90%AF%E7%94%A8%E5%A4%A9%E6%96%87%E5%AE%9A%E6%97%B6
 */
const updateAstronomicalStatus = (params: IUpdateAstronomicalStatus): Promise<boolean> => {
  return TYSdk.apiRequest('tuya.m.timer.astronomical.status.update', {
    ...params,
  });
};

/**
 * 删除天文定时
 * @param {string} id 定时任务 id
 * @docs https://developer.tuya.com/cn/docs/iot/cloud-timing-interface?id=K9m1dlbzt0kdz#title-19-%E5%88%A0%E9%99%A4%E5%A4%A9%E6%96%87%E5%AE%9A%E6%97%B6
 */
const removeAstronomical = (params: { id: string }): Promise<boolean> => {
  return TYSdk.apiRequest('tuya.m.timer.astronomical.remove', {
    ...params,
  });
};

export default {
  addSingleTimer,
  queryTimerTasks,
  modifySingleTimer,
  addGroupTimer,
  queryGroupTimerTasks,
  modifyGroupTimer,
  modDeleteTaskByIds,
  modDeleteTaskByCategory,
  getDpLastTimer,
  getDpsLastTimer,
  getLastTimerPeriod,
  getAstronomicalList,
  addAstronomical,
  updateAstronomical,
  updateAstronomicalStatus,
  removeAstronomical,
};
