import BigNumber from 'bignumber.js';
import { DpSchema } from 'tuya-panel-kit';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const type = (val: string) => Object.prototype.toString.call(val).slice(8, -1).toLowerCase();

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const parseJson = (str: string) => {
  let result;
  if (str && type(str) === 'string') {
    // as jsonstring
    try {
      result = JSON.parse(str);
    } catch (parseError) {
      // error! use eval
      try {
        // eslint-disable-next-line no-eval
        result = eval(`(${str})`);
      } catch (evalError) {
        // normal string
        result = str;
      }
    }
  } else {
    result = typeof str === 'undefined' ? {} : str;
  }
  return result;
};
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const formatValue = (val: any, schema: DpSchema) => {
  if (type(val) === 'string') {
    if (val === 'true') {
      return true;
    }
    if (val === 'false') {
      return false;
    }
  } else if (type(val) === 'undefined') {
    switch (schema.type) {
      case 'bool':
        return false;
      case 'value':
        return schema.min;
      default:
        return '';
    }
  }
  return val;
};
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const isNumerical = (obj: number) => Object.prototype.toString.call(obj) === '[object Number]';
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const cameLiza = (str: number | string) => {
  if (isNumerical(str as number)) {
    return `${str}`;
  }
  // eslint-disable-next-line no-param-reassign
  str = (str as string).replace(/[-_\s]+(.)?/g, (match, chr) => (chr ? chr.toUpperCase() : ''));
  // Ensure 1st char is always lowercase
  return str.substr(0, 1).toLowerCase() + str.substr(1);
};
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const getBitValue = (num: number, index: number) => {
  // eslint-disable-next-line no-bitwise
  return (num & (1 << index)) >> index;
};

// https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
// because Object.keys(new Date()).length === 0;
// we have to do some additional check
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const isEmptyObj = (obj: Record<string, any>) =>
  Object.keys(obj).length === 0 && obj.constructor === Object;

/**
 *
 * @param {number} source 原数据
 * @returns {boolean} 是否是整数
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const isInteger = (source: number) => {
  if (typeof source !== 'number') return source;
  return source % 1 === 0;
};

/**
 * @link https://juejin.cn/post/6844903704714280968#comment
 * @description 精度丢失处理
 * @param {number} source 原数据
 * @param {number} scale 保留小数位数
 * @returns {number} 处理后数据
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const transLateNumber = (source: number, scale = 0) => {
  const target = new BigNumber(source);
  return +target.decimalPlaces(2).decimalPlaces(scale).toString();
};

/**
 * 格式化数据
 * 保留几位小数，输出了字符串
 * @param value
 * @param scale
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const formatNumber2String = (value: number, scale = 1) => {
  const [integer, decimal] = `${value}`.split('.');
  if (!decimal || scale === 0) {
    return `${integer || 0}`;
  }
  let point = decimal.slice(0, scale) || '';
  const add0Num = scale - point.length;
  for (let index = 0; index < add0Num; index++) {
    point += '0';
  }
  if (scale > 0) {
    return `${integer || 0}.${point || 0}`;
  }
  return `${integer || 0}`;
};

/**
 *
 * @param length 数组长度 5
 * @returns {array} [0,1,2,3,4,5]
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createArray = (length: number) => [...new Array(length).keys()];

/**
 *
 * @param length 数组长度 5
 * @param start 开始 2
 * @returns {array} [2,3,4,5,6]
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createArrayByStep = (length: number, start = 0) =>
  Array.from({ length }, (_, index) => index + start); // [1,2,3,4,5,6,7...100]

/**
 *
 * @param start 开始
 * @param end 结束
 * @param step 步长
 * @param scale 保留小数位数
 * @returns {Array} []
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const range = (start = 0, end: number, step = 1, scale = 2) => {
  let index = -1;
  let length = Math.max(Math.ceil((end - start) / (step || 1)), 0);

  const result = new Array(length);

  while (length--) {
    result[++index] = start;
    // eslint-disable-next-line no-param-reassign
    start = transLateNumber(start + step, scale);
  }
  return result;
};

export default {
  isInteger,
  type,
  parseJson,
  formatValue,
  isNumerical,
  cameLiza,
  getBitValue,
  isEmptyObj,
  transLateNumber,
  formatNumber2String,
  createArray,
  createArrayByStep,
  range,
};
