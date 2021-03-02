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
 */
const addSingleTimer = (params: IAndSingleTime): Promise<any> => {
  return TYSdk.apiRequest('tuya.m.clock.dps.add', {
    ...params,
  });
};

/**
 * 查询定时任务
 * @param {string} bizId 单设备 ID（devId） 或者群组设备 ID（groupId)
 * @param {number} bizType 资源类型。0：单设备；1：群组设备。
 * @param {string} category 定时分类
 */
const queryTimerTasks = (params: IQueryTimerTasks): Promise<any> => {
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
 */
const modifySingleTimer = (params: IModifySingleTimer): Promise<any> => {
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
 */
const addGroupTimer = (params: IAndGroupTimer): Promise<any> => {
  return TYSdk.apiRequest('tuya.m.clock.dps.group.add', {
    ...params,
  });
};

/**
 * 分组定时查询
 * @param {string} bizId 单设备 ID（devId） 或者群组设备 ID（groupId)
 * @param {number} bizType 资源类型。0：单设备；1：群组设备。
 * @param {string} category 定时分类
 */
const queryGroupTimerTasks = (params: IQueryTimerTasks): Promise<any> => {
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
 */
const modifyGroupTimer = (params: IModifyGroupTimer): Promise<any> => {
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
 */
const modDeleteTaskByIds = (params: IModDeleteTaskByIds): Promise<any> => {
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
 */
const modDeleteTaskByCategory = (params: IModDeleteTaskByCategory): Promise<any> => {
  return TYSdk.apiRequest('tuya.m.clock.category.status.update', {
    ...params,
  });
};

/**
 * 获取某个DP点最近的定时
 * @param {string} bizId 单设备 ID（devId） 或者群组设备 ID（groupId）。
 * @param {string} type device_group 或者 device。
 * @param {string} instruct 格式为'{devId:"xxx",dpId:"1"}'。
 */
const getDpLastTimer = (params: IGetDpLastTimer): Promise<any> => {
  return TYSdk.apiRequest('s.m.linkage.timer.nearest.get', {
    ...params,
  });
};

/**
 * 获取多个 DP 点最近的定时
 * @param {string} bizId 单设备 ID（devId） 或者群组设备 ID（groupId）。
 * @param {string} type device_group 或者 device。
 * @param {string} instruct 格式为'{devId:"xxx",dpId:"1"}'。
 */
const getDpsLastTimer = (params: IGetDpLastTimer): Promise<any> => {
  return TYSdk.apiRequest('s.m.linkage.timer.nearest.bat.get', {
    ...params,
  });
};

/**
 * 获取最近的一条定时（包含时间段判断）
 * @param {string} devId 设备 ID。
 * @param {string} instruct 格式为'{devId:"xxx",dpId:"1"}'。
 */
const getLastTimerPeriod = (params: IGetLastTimerPeriod): Promise<any> => {
  return TYSdk.apiRequest('tuya.m.timer.nearest.get', {
    ...params,
  });
};

/**
 * 获取天文定时列表
 */
const getAstronomicalList = (params: IGetAstronomicalList): Promise<any> => {
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
 */
const addAstronomical = (params: IAstronomical): Promise<any> => {
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
 */
const updateAstronomical = (params: IAstronomical): Promise<any> => {
  return TYSdk.apiRequest('tuya.m.timer.astronomical.update', {
    ...params,
  });
};

/**
 * 修改天文定时使能
 * @param {string} id 定时任务id
 * @param {number} status 0:关闭；1开启
 */
const updateAstronomicalStatus = (params: IUpdateAstronomicalStatus): Promise<any> => {
  return TYSdk.apiRequest('tuya.m.timer.astronomical.status.update', {
    ...params,
  });
};

/**
 * 删除天文定时
 * @param {string} id 定时任务 id
 */
const removeAstronomical = (params: { id: string }): Promise<any> => {
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
