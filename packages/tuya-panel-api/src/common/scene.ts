import { TYSdk } from 'tuya-panel-kit';
import { Scene, Automation, ISelectedScene, IBindScene } from './interface';

// 场景相关接口
/**
 * 获取当前设备已绑定的所有场景
 * @param {string} devId 设备Id
 * @docs https://developer.tuya.com/cn/docs/iot/scene-related-interface?id=K9pouo6v4lf7v#title-0-%E8%8E%B7%E5%8F%96%E8%AE%BE%E5%A4%87%E7%BB%91%E5%AE%9A%E5%9C%BA%E6%99%AF
 */
const getAllBindScenes = (devId: string): Promise<Scene[]> => {
  return TYSdk.apiRequest('tuya.m.linkage.rule.bind.wifi.query', { devId });
};

/**
 * 获取当前设备创建的所有场景
 * @param {string} devId 设备Id
 * @docs https://developer.tuya.com/cn/docs/iot/scene-related-interface?id=K9pouo6v4lf7v#title-1-%E8%8E%B7%E5%8F%96%E8%AE%BE%E5%A4%87%E5%88%9B%E5%BB%BA%E5%9C%BA%E6%99%AF
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
 * @docs https://developer.tuya.com/cn/docs/iot/scene-related-interface?id=K9pouo6v4lf7v#title-2-%E7%BB%91%E5%AE%9A%E5%9C%BA%E6%99%AF
 */
const bindSelectedScene = (params: ISelectedScene): Promise<boolean> => {
  return TYSdk.apiRequest('tuya.m.linkage.rule.bind.wifi.save', { ...params });
};

/**
 * 解绑场景
 * @param {string} btnId 按键
 * @param {string} devId 设备 Id
 * @docs https://developer.tuya.com/cn/docs/iot/scene-related-interface?id=K9pouo6v4lf7v#title-3-%E8%A7%A3%E7%BB%91%E5%9C%BA%E6%99%AF
 */
const unBindScene = (params: IBindScene): Promise<boolean> => {
  return TYSdk.apiRequest('tuya.m.linkage.rule.bind.wifi.remove', { ...params });
};

/**
 * 触发场景
 * @param {string} ruleId 场景规则 ID
 * @docs https://developer.tuya.com/cn/docs/iot/scene-related-interface?id=K9pouo6v4lf7v#title-4-%E8%A7%A6%E5%8F%91%E5%9C%BA%E6%99%AF
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
