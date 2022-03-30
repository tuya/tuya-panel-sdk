import { getSchema } from '../schema/index';
import { getFormater } from '../format/index';
import configUtils from '../configUtils';
import dpUtils from '../utils/dpUtils';
import { hasInDps, getDpByCode, updateDp } from '../gateway';
import DpMapFactory from '../factory/DpMapFactory';
import { hasProp } from '../utils';
import {
  DpSchema,
  IDpWorker,
  DpData,
  Config,
  IFormater,
  Rule,
  DpMapSetting,
  SendOption,
} from '../interface';
import { isEqual } from 'lodash';

export enum WorkerStatus {
  Waiting,
  Invalid,
  Sending,
  Complete,
}

export default class DpWorker implements IDpWorker {
  originData: DpData;
  data: DpData;
  willSendData: DpData;
  dpCodes: string[] = [];
  status: WorkerStatus;
  time: number = 0;
  option: number = 0;
  isPutDpById: boolean = true;
  dpIdResult: DpData;
  updateValidTime: string = 'reply';
  constructor(data: DpData, config: Config) {
    const { voiceOption, isPutDpById, updateValidTime } = config;
    this.status = WorkerStatus.Waiting;
    this.originData = data;
    this.updateValidTime = updateValidTime;
    this.format(data, config);
    this.isPutDpById = isPutDpById;
    // 音效处理
    const options: number[] = [];
    this.dpCodes.forEach(code => {
      if (hasProp(voiceOption, code)) {
        options.push(voiceOption[code]);
      }
    });
    if (options.length) {
      this.option = Math.max(...options);
    } else {
      this.option = voiceOption.default || 0;
    }
  }

  format(data: DpData, config: Config) {
    const { rules, dpMap = {}, checkCurrent } = config;
    const result: DpData = {};
    const dpIdResult: DpData = {};

    /*
     * 校验数据是否合法
     * 如照明dp下，只有当工作模式为彩光时，才能下发彩光
     */
    data = this.handleRule(data, rules, dpMap);
    this.willSendData = data;
    Object.keys(data).forEach(key => {
      let value = data[key];
      let current = getDpByCode(key);
      if (hasProp(dpMap, key)) {
        value = DpMapFactory.format(dpMap[key], value);
        current = DpMapFactory.format(dpMap[key], current);
      } else {
        const formater = getFormater(key);
        if (formater) {
          value = formater.format(value);
          current = formater.format(current);
        }
      }
      const schema = getSchema(key);
      if (schema && schema.validate(value)) {
        if (checkCurrent) {
          if (
            value === current ||
            (typeof value === 'string' && value.toUpperCase() === current.toUpperCase())
          ) {
            return;
          }
        }
        result[key] = value;
        dpIdResult[schema.id] = value;
      } else {
        console.warn(`dp code【${key}】不支持, dp value 【${value}】`);
      }
    });

    const codes = Object.keys(result);
    if (codes.length === 0) {
      // 无效 worker
      this.status = WorkerStatus.Invalid;
    } else {
      this.data = result;
      this.dpIdResult = dpIdResult;
      this.dpCodes = codes;
    }
  }

  handleRule(data: DpData, rules: Rule[], dpMap: DpMapSetting = {}) {
    const codes = Object.keys(data);
    const result: DpData = {};
    const resultCodes = rules.reduce((codes, { type, condition, effect, conditionType }, index) => {
      // 边界处理
      if (codes.length === 0) {
        return codes;
      }
      switch (type) {
        case 'NEED':
          // 判断
          if (condition === 'ALL') {
            Object.assign(result, effect);
          } else {
            let condResult;
            let codes: string[] = [];
            let needCheckValue: boolean = false;
            if (Array.isArray(condition)) {
              codes = condition as string[];
            } else if (typeof condition === 'object') {
              needCheckValue = true;
              codes = Object.keys(condition);
            }
            if (conditionType === 'OR') {
              condResult = codes.some((code: string) => {
                return (
                  // @ts-ignore
                  hasProp(data, code) && (!needCheckValue || isEqual(data[code], condition[code]))
                );
              });
            } else {
              condResult = codes.every(code => {
                return (
                  // @ts-ignore
                  hasProp(data, code) && (!needCheckValue || isEqual(data[code], condition[code]))
                );
              });
            }
            if (condResult) {
              Object.keys(effect).forEach(key => {
                if (!codes.includes(key)) {
                  let value = (effect as DpData)[key];
                  if (hasProp(dpMap, key)) {
                    value = DpMapFactory.format(dpMap[key], value);
                  } else {
                    const formater = getFormater(key);
                    if (formater) {
                      value = formater.format(value);
                    }
                  }
                  result[key] = value;
                }
              });
            }
          }
          break;
        case 'FORBIDDEN':
        case 'PASS':
          let conditions: DpData[] = condition as DpData[];
          let condResult;
          // 判断
          if (!Array.isArray(condition) && typeof condition === 'object') {
            conditions = [condition as DpData];
          }
          if (conditionType === 'OR') {
            condResult = conditions.some(cond => {
              return hasInDps(cond);
            });
          } else {
            condResult = conditions.every(cond => {
              return hasInDps(cond);
            });
          }
          // 符合条件，过滤数据
          if (condResult) {
            if (Array.isArray(effect)) {
              if (type === 'PASS') {
                // 留上支持下发的 dp
                for (let j = 0, len = codes.length; j < len; j++) {
                  if (!effect.includes(codes[j])) {
                    codes.splice(j, 1);
                    j--;
                    len--;
                  }
                }
              } else {
                // 去掉不允许下发的 dp
                effect.forEach(code => {
                  if (codes.includes(code)) {
                    codes.splice(codes.indexOf(code), 1);
                  }
                });
              }
            }
          }
          break;
        default:
      }
      return codes;
    }, codes);
    if (resultCodes.length) {
      // 加入数据
      resultCodes.forEach(code => {
        result[code] = data[code];
      });
      return result;
    }
    return {};
  }

  sendEnabled() {
    return this.status === WorkerStatus.Waiting;
  }

  /**
   * 发送数据
   * @param option
   */
  async send(option: SendOption) {
    this.status = WorkerStatus.Sending;
    this.time = +new Date();
    const data = this.isPutDpById ? this.dpIdResult : this.data;
    const { voice, updateValidTime } = option;
    const voiceOption = voice || this.option;

    // 是否下发时数据直接生效
    const updateValidTimeNow =
      typeof updateValidTime === 'string' ? updateValidTime : this.updateValidTime;
    if (updateValidTimeNow === 'syncs') {
      // 直接生效
      updateDp(this.willSendData);
    }

    // 下发数据
    let putDpData = configUtils.getPuDpData();

    if (!putDpData) {
      if (this.isPutDpById) {
        return dpUtils.putDpData(data, voiceOption);
      } else {
        return dpUtils.putDpDataByCodes(data, voiceOption);
      }
    } else {
      return putDpData(data, voiceOption);
    }
  }

  /**
   * 是否下发数据超时
   * @param timeout 超时时间
   */
  isTimeout(timeout: number) {
    const now = +new Date();
    return now - this.time > timeout;
  }

  /**
   * 校验上报的数据是否为当前worker上报的
   * @param data 上报的数据
   */
  compare(data: DpData) {
    const codes = Object.keys(data);
    const { dpCodes, data: requestData } = this;

    // 比较下发的dp是否与上报的一致
    if (dpCodes.length !== codes.length) {
      return false;
    } else {
      const isEqeal = codes.every(key => dpCodes.indexOf(key) >= 0);
      if (!isEqeal) {
        return false;
      }
    }

    // 数据值是否一致
    dpCodes.every(key => {
      // const formater = getFormater(key);
      const originValue = requestData[key];
      const targetValue = data[key];
      // if (formater) {
      //   return formater.equal(originValue, targetValue);
      // }
      return typeof targetValue === 'string'
        ? targetValue.toLowerCase() === originValue.toLowerCase()
        : targetValue === originValue;
    });
  }
}
