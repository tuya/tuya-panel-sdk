// 告警相关接口
import { TYSdk } from 'tuya-panel-kit';
import { AlarmList, ISetAlarmSwitch } from './interface';

/**
 * 根据设备 ID 查询告警列表信息
 * @param {string} devId 设备Id
 * @docs https://developer.tuya.com/cn/docs/iot/alarm-related-interface?id=K9pouo57yi0b2#title-0-%E6%9F%A5%E8%AF%A2%E5%91%8A%E8%AD%A6%E5%88%97%E8%A1%A8%E4%BF%A1%E6%81%AF
 */
const getDevAlarmList = (devId: string): Promise<AlarmList[]> => {
  return TYSdk.apiRequest('tuya.m.linkage.rule.product.query', { devId });
};

/**
 * 启用或者禁用设备的告警
 * @param {string} devId 设备Id
 * @param {string} ruleIds 要开启或关闭的告警id, 用","隔开
 * @param {bool} disabled 是否禁用
 * @docs https://developer.tuya.com/cn/docs/iot/alarm-related-interface?id=K9pouo57yi0b2#title-1-%E5%90%AF%E7%94%A8%E6%88%96%E8%80%85%E7%A6%81%E7%94%A8%E8%AE%BE%E5%A4%87%E7%9A%84%E5%91%8A%E8%AD%A6
 */
const setAlarmSwitch = (params: ISetAlarmSwitch): Promise<boolean> => {
  return TYSdk.apiRequest('tuya.m.linkage.dev.warn.set', { ...params });
};

export default {
  getDevAlarmList,
  setAlarmSwitch,
};
