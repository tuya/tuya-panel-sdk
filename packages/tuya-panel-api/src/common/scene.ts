import { TYSdk } from 'tuya-panel-kit';
import { Scene, Automation, ISelectedScene, IBindScene } from './interface';

// 场景相关接口
/**
 * 获取当前设备已绑定的所有场景
 * @param {string} devId 设备Id
 */
const getAllBindScenes = (devId: string): Promise<Scene[]> => {
  return TYSdk.apiRequest('tuya.m.linkage.rule.bind.wifi.query', { devId });
};

/**
 * 获取当前设备创建的所有场景
 * @param {string} devId 设备Id
 */
const getAllCreatedScenes = (devId: string): Promise<Automation[]> => {
  return TYSdk.apiRequest('tuya.m.linkage.rule.brief.query', { devId });
};

/**
 * 绑定选中场景
 * @param {string} devId 设备Id
 * @param {string} dpId dpId
 * @param {string} dpValue dpId 对应的值
 * @param {string} btnId 按键
 * @param {string} ruleId 规则 Id
 */
const bindSelectedScene = (params: ISelectedScene): Promise<boolean> => {
  return TYSdk.apiRequest('tuya.m.linkage.rule.bind.wifi.save', { ...params });
};

/**
 * 解绑场景
 * @param {string} btnId 按键
 * @param {string} devId 设备 Id
 */
const unBindScene = (params: IBindScene): Promise<boolean> => {
  return TYSdk.apiRequest('tuya.m.linkage.rule.bind.wifi.remove', { ...params });
};

/**
 * 触发场景
 * @param {string} ruleId 场景规则 ID
 */
const triggerScene = (ruleId: string): Promise<boolean> => {
  return TYSdk.apiRequest('tuya.m.linkage.rule.trigger', { ruleId });
};

export default {
  getAllBindScenes,
  getAllCreatedScenes,
  bindSelectedScene,
  unBindScene,
  triggerScene,
};
