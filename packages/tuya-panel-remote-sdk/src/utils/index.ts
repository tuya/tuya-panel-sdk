import { Utils } from 'tuya-panel-kit';
import getAirKeyData from './getAirKeyData';
const { JsonUtils } = Utils;

/**
 * @language zh-CN
 * @description 字符串转对象
 * @param {string} obj 需要装对象的字符串
 * @return {any} 对象
 */
/**
 * @language en-US
 * @description String to Object
 * @param {string} obj The string to be loaded with the object
 * @return {any} Object
 */
export const parseJSON = (obj: string): any => {
  const data =
    typeof obj === 'string'
      ? typeof JsonUtils.parseJSON(obj) === 'object'
        ? JSON.parse(obj)
        : {}
      : {};

  return data;
};
/**
 * @language zh-CN
 * @description 设置颜色透明度,仅支持16进制的颜色
 * @param {string} color 颜色
 * @param {number} opacity 透明度，值为0-1
 * @return {string} 设置过透明度的颜色值
 * @return {string} 非16进制的颜色返回原值
 */
/**
 * @language en-US
 * @description Set the color transparency, only supports hexadecimal colors
 * @param {string} color color
 * @param {number} opacity opacity，value:0-1
 * @return {string} Color value with transparency set
 * @return {string} Colors other than hexadecimal return the original value
 */
export const hexToRgb = (color: string, opacity: number): string => {
  let sColor = color.toLowerCase();
  // 十六进制颜色值的正则表达式
  const reg = /^#([0-9a-f]{3}|[0-9a-f]{6})$/;
  // 如果是16进制颜色
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      let sColorNew = '#';
      for (let i = 1; i < 4; i++) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    // 处理六位的颜色值
    const sColorChange = [];
    for (let i = 1; i < 7; i += 2) {
      sColorChange.push(parseInt(`0x${sColor.slice(i, i + 2)}`, 16));
    }
    return `rgba(${sColorChange.join(',')},${opacity})`;
  }
  return sColor;
};

export default {
  hexToRgb,
  parseJSON,
  getAirKeyData,
};
