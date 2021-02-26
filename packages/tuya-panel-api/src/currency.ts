// 电费统计接口
import { TYSdk } from 'tuya-panel-kit';
import { IUpdateBillConfigure, Bill } from './interface';

/**
 * 获取电费账单配置
 * @param {string} devId 设备Id
 * @param {number} billType 账单类型，填1
 */
const getBillConfigure = (devId: string, billType: number): Promise<Bill> => {
  return TYSdk.apiRequest('tuya.m.bill.config.get', { devId, billType });
};

/**
 * 更新账单配置
 * @param {string} devId 设备Id
 * @param {string} unit 货币单位
 * @param {boolean} notificationStatus 是否启用通知
 * @param {number} threshold 阀值
 * @param {string} cycle 统计周期
 * @param {string} position 账期日期
 * @param {number} price 单价
 * @param {number} billType 账单类型，填1
 */
const updateBillConfigure = (params: IUpdateBillConfigure): Promise<boolean> => {
  return TYSdk.apiRequest('tuya.m.bill.config.update', {
    ...params,
  });
};

/**
 * 获取货币列表
 */
const getCurrencyList = (): Promise<boolean> => {
  return TYSdk.apiRequest('tuya.m.bill.config.currency.list', {});
};

export default {
  getBillConfigure,
  updateBillConfigure,
  getCurrencyList,
};
