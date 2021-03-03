import { Utils } from 'tuya-panel-kit';
import _ from 'lodash';

const {
  JsonUtils: { parseJSON },
} = Utils;

export function stringToAtHex(str: string): string {
  let val = '';
  for (let i = 0; i < str.length; i++) {
    if (val === '') {
      val = str.charCodeAt(i).toString(16);
    } else {
      val += `${str.charCodeAt(i).toString(16)}`;
    }
  }
  return val;
}

export function atHexToString(str: string): string {
  const trimedStr = str.trim();
  const rawStr = trimedStr.substr(0, 2).toLowerCase() === '0x' ? trimedStr.substr(2) : trimedStr;
  const len = rawStr.length;
  if (len % 2 !== 0) {
    return '';
  }
  let curCharCode;
  const resultStr = [];
  for (let i = 0; i < len; i += 2) {
    curCharCode = parseInt(rawStr.substr(i, 2), 16); // ASCII Code Value
    resultStr.push(String.fromCharCode(curCharCode));
  }
  return resultStr.join('');
}

export function ASCIIToJson(str: string) {
  return parseJSON(atHexToString(str));
}

export function toJsonSafe(str: string) {
  return Utils.JsonUtils.parseJSON(str.replace(/(\{.*\}).*/, '$1'));
}

/**
 * 十进制转十六进制小写
 * @param dec 十进制数字
 * @param padNum 向前补几位
 * @param lower 是否小写
 */
export function DECToHex(dec: number, padNum = 2, lower = true): string {
  if (dec === undefined || dec === null) return '';
  if (lower) {
    return _.toLower(_.padStart(Number(dec).toString(16), padNum, '0'));
  }
  if (!lower) {
    return _.toUpper(_.padStart(Number(dec).toString(16), padNum, '0'));
  }
}
