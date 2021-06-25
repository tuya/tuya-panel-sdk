// 电费统计接口
import { TYSdk } from 'tuya-panel-kit';
import { IUpdateBillConfigure, Bill } from './interface';

/**
 * 获取电费账单配置
 * @param {string} devId 设备Id
 * @param {number} billType 账单类型，填1
 * @docs https://developer.tuya.com/cn/docs/iot/electricity-charge-statistics-interface?id=K9m1dlgx19t20#title-0-%E8%8E%B7%E5%8F%96%E7%94%B5%E8%B4%B9%E8%B4%A6%E5%8D%95%E9%85%8D%E7%BD%AE
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
 * @docs https://developer.tuya.com/cn/docs/iot/electricity-charge-statistics-interface?id=K9m1dlgx19t20#title-1-%E6%9B%B4%E6%96%B0%E8%B4%A6%E5%8D%95%E9%85%8D%E7%BD%AE
 */
const updateBillConfigure = (params: IUpdateBillConfigure): Promise<boolean> => {
  return TYSdk.apiRequest('tuya.m.bill.config.update', {
    ...params,
  });
};

/**
 * 获取货币列表
 * @docs https://developer.tuya.com/cn/docs/iot/electricity-charge-statistics-interface?id=K9m1dlgx19t20#title-2-%E8%8E%B7%E5%8F%96%E8%B4%A7%E5%B8%81%E5%88%97%E8%A1%A8
 */
const getCurrencyList = (): Promise<boolean> => {
  return TYSdk.apiRequest('tuya.m.bill.config.currency.list', {});
};

export default {
  getBillConfigure,
  updateBillConfigure,
  getCurrencyList,
};
