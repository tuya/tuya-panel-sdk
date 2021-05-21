import { TYSdk } from 'tuya-panel-kit';
import {
  IGetLinkageDeviceList,
  IBindRule,
  IGetBindRuleList,
  IRemoveRule,
  IGetLinkageDeviceListResponse,
  IGetSceneListResponse,
  IGetBindRuleListResponse,
  IBindRuleResponse,
} from './interface';

/**
 * 获取家庭下支持联动的设备列表
 * @param {number} gid 家庭id
 * @param {string} sourceType 业务范围
 * @docs https://developer.tuya.com/cn/docs/iot/linkage-related?id=Kae3peiox1r2q#title-0-%E8%8E%B7%E5%8F%96%E6%94%AF%E6%8C%81%E8%81%94%E5%8A%A8%E8%AE%BE%E5%A4%87%E5%88%97%E8%A1%A8
 */
const getLinkageDeviceList = (
  params: IGetLinkageDeviceList
): Promise<IGetLinkageDeviceListResponse> => {
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
 * @docs https://developer.tuya.com/cn/docs/iot/linkage-related?id=Kae3peiox1r2q#title-1-%E8%8E%B7%E5%8F%96%E5%9C%BA%E6%99%AF%E5%88%97%E8%A1%A8
 */
const getSceneList = ({ devId }: { devId: string }): Promise<IGetSceneListResponse> => {
  return TYSdk.apiRequest('tuya.m.linkage.rule.brief.query', { devId });
};

/**
 * 查询已绑定的列表
 * @param {string} bizDomain 业务范围
 * @param {string} sourceEntityId 设备id
 * @param {number} entityType 实体类型
 * @docs https://developer.tuya.com/cn/docs/iot/linkage-related?id=Kae3peiox1r2q#title-2-%E8%8E%B7%E5%8F%96%E5%B7%B2%E7%BB%91%E5%AE%9A%E7%9A%84%E5%9C%BA%E6%99%AF%E5%88%97%E8%A1%A8
 */

const getBindRuleList = (params: IGetBindRuleList): Promise<IGetBindRuleListResponse> => {
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
 * @docs https://developer.tuya.com/cn/docs/iot/linkage-related?id=Kae3peiox1r2q#title-3-%E7%BB%91%E5%AE%9A%E5%9C%BA%E6%99%AF
 */
const bindRule = ({
  associativeEntityId,
  ruleId,
  entitySubIds,
  expr,
  bizDomain,
}: IBindRule): Promise<IBindRuleResponse> => {
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
 * @docs https://developer.tuya.com/cn/docs/iot/linkage-related?id=Kae3peiox1r2q#title-4-%E8%A7%A3%E9%99%A4%E7%BB%91%E5%AE%9A
 */
const removeRule = (params: IRemoveRule): Promise<boolean> => {
  return TYSdk.apiRequest('tuya.m.linkage.associative.entity.remove', {
    ...params,
  });
};

/**
 * 触发联动
 * @param {string} ruleId 规则id
 * @docs https://developer.tuya.com/cn/docs/iot/linkage-related?id=Kae3peiox1r2q#title-5-%E8%A7%A6%E5%8F%91%E5%9C%BA%E6%99%AF
 */
const triggerRule = ({ ruleId }: { ruleId: string }): Promise<boolean> => {
  return TYSdk.apiRequest('tuya.m.linkage.rule.trigger', {
    ruleId,
  });
};

/**
 *  启用联动
 * @param {string} ruleId 规则id
 * @docs https://developer.tuya.com/cn/docs/iot/linkage-related?id=Kae3peiox1r2q#title-6-%E5%90%AF%E7%94%A8%E8%A7%84%E5%88%99
 */
const enableRule = ({ ruleId }: { ruleId: string }): Promise<boolean> => {
  return TYSdk.apiRequest('tuya.m.linkage.rule.enable', {
    ruleId,
  });
};

/**
 * 停用联动
 * @param {string} ruleId 规则id
 * @docs https://developer.tuya.com/cn/docs/iot/linkage-related?id=Kae3peiox1r2q#title-7-%E5%81%9C%E7%94%A8%E8%A7%84%E5%88%99
 */
const disableRule = ({ ruleId }: { ruleId: string }): Promise<boolean> => {
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
