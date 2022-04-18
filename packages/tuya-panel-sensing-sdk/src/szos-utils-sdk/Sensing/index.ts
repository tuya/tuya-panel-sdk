import { DpSchema } from 'tuya-panel-kit';
import { transLateNumber } from '../Normal';

/**
 * @description 法氏度转华氏度
 * @param {number} f 法氏度
 * @param {number} point 保留小数点
 * @returns string 华氏度
 */

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const fToc = (f: number, scale = 2) => {
  if (!f && f !== 0) return f;
  const value = (f - 32) / 1.8;
  return transLateNumber(value, scale);
};

/**
 * @description 华氏度转法氏度
 * @param {number} t 华氏度
 * @param {number} point 保留小数位数
 * @returns {string} 法氏度
 */

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const cTof = (c: number, scale = 2) => {
  if (!c && c !== 0) return c;
  const value = 1.8 * c + 32;
  return transLateNumber(value, scale);
};

/**
 *
 * @param c 摄氏度灵敏度转法氏度
 * @param scale 保留小数位数
 * @returns 法氏度
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const cTemperatureSensitivityTof = (c: number, scale = 2) => {
  if (!c && c !== 0) return c;
  const value = 1.8 * c;
  return transLateNumber(value, scale);
};

/**
 *
 * @param f 法氏度灵敏度摄氏度
 * @param scale 保留小数位数
 * @returns 法氏度
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const fTemperatureSensitivityToc = (f: number, scale = 2) => {
  if (!f && f !== 0) return f;
  const value = f / 1.8;
  return transLateNumber(value, scale);
};

/**
 * @description 判断dp是否存在
 * @param {string} code dpCode
 * @returns {boolean} 是否存在
 */

const isSupportDp = <T extends string | number>(code: T): boolean => code !== undefined;

/**
 * @description 十六进制转rgba
 * @param h HEX值
 * @param opacity 透明度
 * @returns RGBA
 */

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const hexToRgb = (h: string, opacity: number) => {
  const rgb: any[] = [];
  let hex = h.replace(/#/, '');
  // 处理 "#abc" 成 "#aabbcc"
  if (hex.length === 3) hex = hex.replace(/(.)/g, '$1$1');

  hex.replace(/../g, color => {
    rgb.push(parseInt(color, 0x10)); // 按16进制将字符串转换为数字
    return color;
  });
  return `rgba(${rgb.join(',')},${opacity})`;
};

/**
 * @description 补0
 * @param value 原数据
 * @returns string 补0后的数据
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const addZero = (value: number | string) => {
  if (value < 10 && value > 0) return `0${value}`;
  return `${value}`;
};

/**
 * @description 验证邮箱合法性
 * @param email 邮箱
 * @returns boolean
 */

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const validateEmail = (email: string) =>
  /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(email);

/**
 *
 * @param {string} str 1000001
 * @param {string[]} mapWeek ['星期一','星期二',星期三',星期四',星期五',星期六',星期天']
 * @returns {string[]} ['星期一',星期天']
 */

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const strToWeek = (str: string, mapWeek: string[]) => {
  if (str.length > 8) return [];

  const source = str.split('');
  if (str.length === 8) {
    source.shift();
  }
  const t = source.map(d => +d);
  const result = mapWeek
    .map((d, index) => {
      if (t[index] === 0) return null;
      return d;
    })
    .filter(d => d);

  return result;
};

interface ICustomSchema {
  bool: DpSchema[];
  value: DpSchema[];
  enum: DpSchema[];
}

/**
 * @description 获取自定义DP
 * @returns {ICustomSchema[]}
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const customDp = (schema: Record<string, any>) => {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return Object.values(schema as Record<string, any>)
    .filter(d => +d.id > 100)
    .reduce((memo, item) => {
      // eslint-disable-next-line no-param-reassign
      memo = {
        ...memo,
        [item.type]: [...(memo[item.type as keyof ICustomSchema] || []), item],
      };
      return memo;
    }, {} as ICustomSchema);
};

export default {
  fToc,
  cTof,
  strToWeek,
  validateEmail,
  addZero,
  hexToRgb,
  isSupportDp,
  customDp,
  fTemperatureSensitivityToc,
  cTemperatureSensitivityTof,
};
