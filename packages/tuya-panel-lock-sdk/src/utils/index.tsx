import _padEnd from 'lodash/padEnd';
import _padStart from 'lodash/padStart';

/**
 * @language zh-CN
 * @description 获取密码最大长度
 * @param {number} hex 数字范围为4-10
 * @return {number} 返回密码最大长度
 */
/**
 * @language en-US
 * @description Get the maximum password length
 * @param {number} hex The number range is 4-10
 * @return {number} Return the maximum length of the password
 */
export const getPswMaxLen = (hex: number) => {
  const hexMap = { 4: 12, 5: 12, 6: 12, 7: 11, 8: 11, 9: 10, 10: 10 };
  return hexMap[hex] || 10;
};

/**
 * @language zh-CN
 * @description 获取默认随机密码长度
 * @param {number} hex 数字范围为4-10
 * @return {number} 返回密码长度
 */
/**
 * @language en-US
 * @description Get the default random password length
 * @param {number} hex The number range is 4-10
 * @return {number} Return the length of the password
 */
export const getDefaultRandomLen = (hex: number) => {
  const hexMap = { 4: 8, 5: 8, 6: 8, 7: 8, 8: 7, 9: 7, 10: 6 };
  return hexMap[hex] || 6;
};

/**
 * @language zh-CN
 * @description 获取随机密码
 * @param {number} len 长度
 * @param {number} maxNum 最大数字
 * @param {boolean} isHideZero 是否隐藏0
 * @return {string} 返回密码长度
 */
/**
 * @language en-US
 * @description Get random password
 * @param {number} len length
 * @param {number} maxNum maximum number
 * @param {boolean} isHideZero whether to hide 0
 * @return {string} Return the length of the password
 */
export const getRandomPassword = (len: number, maxNum: number, isHideZero: boolean): string => {
  let result = '';
  const arr = new Array(len).fill(0);
  arr.forEach(() => {
    const _item = Math.round(Math.random() * maxNum);
    const item = isHideZero && _item === 0 ? _item + 1 : _item;
    result += item.toString();
  });
  return result;
};

/**
 * @language zh-CN
 * @description 包装密码
 * @param {string} psd
 * @return {string} 被包装密码
 */
/**
 * @language en-US
 * @description Package password
 * @param {string} psd
 * @return {string} Packed password
 */
export const wrapPsd = (psd: string) => {
  return psd.indexOf('******') !== -1 ? psd.replace('******', '') : psd;
};

export const getWeekDayNumber = (weekValue: string) => {
  return parseInt(_padEnd(weekValue, 8, '0'), 2);
};

export const getWeekDayString = (weekValue: number) => {
  return _padStart(weekValue.toString(2), 8, '0').slice(0, 7);
};

export default {
  getPswMaxLen,
  getDefaultRandomLen,
  getRandomPassword,
  wrapPsd,
  getWeekDayNumber,
  getWeekDayString,
};
