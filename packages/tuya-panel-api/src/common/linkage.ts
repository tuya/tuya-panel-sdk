import { TYSdk } from 'tuya-panel-kit';
import { IGetLinkageDeviceList, IBindRule, IGetBindRuleList, IRemoveRule } from './interface';

/**
 * 获取家庭下支持联动的设备列表
 * @param {number} gid 家庭id
 * @param {string} sourceType 业务范围
 */
const getLinkageDeviceList = (params: IGetLinkageDeviceList): Promise<any> => {
  return TYSdk.apiRequest(
    'tuya.m.linkage.dev.list',
    {
      ...params,
    },
    '3.0'
  );
};

/**
 * 查询一键执行场景列表
 * @param {number} devId 设备id
 */
const getSceneList = ({ devId }: { devId: string }): Promise<any> => {
  return TYSdk.apiRequest('tuya.m.linkage.rule.brief.query', { devId });
};

/**
 * 查询已绑定的列表
 * @param {string} bizDomain 业务范围
 * @param {string} sourceEntityId 设备id
 * @param {number} entityType 实体类型
 */

const getBindRuleList = (params: IGetBindRuleList): Promise<any> => {
  return TYSdk.apiRequest('tuya.m.linkage.associative.entity.id.category.query', {
    ...params,
  });
};

/**
 * 绑定联动
 * @param {string} associativeEntityId 关联DP点和DP点值的组合
 * @param {string} ruleId 关联场景 ID
 * @param {string} entitySubIds 关联 DP 点
 * @param {Array} expr 关联DP点、动作组合
 * @param {string} bizDomain 业务域
 */
const bindRule = ({
  associativeEntityId,
  ruleId,
  entitySubIds,
  expr,
  bizDomain,
}: IBindRule): Promise<any> => {
  const { devId } = TYSdk.devInfo;
  return TYSdk.apiRequest('tuya.m.linkage.associative.entity.bind', {
    relationExpr: {
      sourceEntityId: devId,
      associativeEntityId,
      associativeEntityValue: ruleId,
      triggerRuleVO: {
        conditions: [
          {
            entityId: devId,
            entityType: 1,
            condType: 1,
            entitySubIds,
            expr,
          },
        ],
        actions: [
          {
            entityId: ruleId,
            actionStrategy: 'repeat',
            actionExecutor: 'ruleTrigger',
          },
        ],
      },
      bizDomain,
      uniqueType: 3,
    },
  });
};

/**
 * 解除联动
 * @param {string} bizDomain 业务范围
 * @param {string} sourceEntityId 设备id
 * @param {string} associativeEntityId 关联dp组合
 * @param {string} associativeEntityValue 规则id
 */
const removeRule = (params: IRemoveRule): Promise<any> => {
  return TYSdk.apiRequest('tuya.m.linkage.associative.entity.remove', {
    ...params,
  });
};

/**
 * 触发联动
 * @param {string} ruleId 规则id
 */
const triggerRule = ({ ruleId }: { ruleId: string }): Promise<any> => {
  return TYSdk.apiRequest('tuya.m.linkage.rule.trigger', {
    ruleId,
  });
};

/**
 *  启用联动
 * @param {string} ruleId 规则id
 */
const enableRule = ({ ruleId }: { ruleId: string }): Promise<any> => {
  return TYSdk.apiRequest('tuya.m.linkage.rule.enable', {
    ruleId,
  });
};

/**
 * 停用联动
 * @param {string} ruleId 规则id
 */
const disableRule = ({ ruleId }: { ruleId: string }): Promise<any> => {
  return TYSdk.apiRequest('tuya.m.linkage.rule.disable', {
    ruleId,
  });
};

export default {
  getLinkageDeviceList,
  getSceneList,
  getBindRuleList,
  bindRule,
  removeRule,
  triggerRule,
  enableRule,
  disableRule,
};
