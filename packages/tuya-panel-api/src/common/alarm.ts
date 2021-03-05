// 告警相关接口
import { TYSdk } from 'tuya-panel-kit';
import { AlarmList, ISetAlarmSwitch } from './interface';

/**
 * 根据设备 ID 查询告警列表信息
 * @param {string} devId 设备Id
 */
const getDevAlarmList = (devId: string): Promise<AlarmList[]> => {
  return TYSdk.apiRequest('tuya.m.linkage.rule.product.query', { devId });
};

/**
 * 启用或者禁用设备的告警
 * @param {string} devId 设备Id
 * @param {string} ruleIds 要开启或关闭的告警id, 用","隔开
 * @param {bool} disabled 是否禁用
 */
const setAlarmSwitch = (params: ISetAlarmSwitch): Promise<boolean> => {
  return TYSdk.apiRequest('tuya.m.linkage.dev.warn.set', { ...params });
};

export default {
  getDevAlarmList,
  setAlarmSwitch,
};
