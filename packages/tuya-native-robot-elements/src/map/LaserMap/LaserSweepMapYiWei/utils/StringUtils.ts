import { Utils, TYSdk } from '@tuya-rn/tuya-native-components';

const {
  JsonUtils: { parseJSON },
} = Utils;

const stringToAtHex = (str: string) => {
  let val = '';
  for (let i = 0; i < str.length; i++) {
    if (val === '') {
      val = str.charCodeAt(i).toString(16);
    } else {
      val += `${str.charCodeAt(i).toString(16)}`;
    }
  }
  return val;
};

const atHexToString = (str: { trim: () => void }) => {
  if (!str) return '';
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
};

function ASCIIToJson(str: string) {
  return parseJSON(atHexToString(str));
}

export default {
  stringToAtHex,
  atHexToString,
  ASCIIToJson,
};
