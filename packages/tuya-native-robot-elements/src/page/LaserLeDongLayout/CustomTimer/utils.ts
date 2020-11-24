import { Utils } from '@tuya-rn/tuya-native-components';
// @ts-ignore
import Strings from './i18n';

export const parseJSON = (str: string) => {
  let rst;
  if (str && {}.toString.call(str) === '[object String]') {
    // 当JSON字符串解析
    try {
      rst = JSON.parse(str);
    } catch (e) {
      // 出错，用eval继续解析JSON字符串
      try {
        // eslint-disable-next-line
        rst = eval(`(${str})`);
      } catch (e2) {
        // 当成普通字符串
        rst = str;
      }
    }
  } else {
    rst = typeof str === 'undefined' ? {} : str;
  }

  return rst;
};

export const parseHour12 = (time: number) => {
  const t = Utils.TimeUtils.parseHour12(time);
  return t
    .split(' ')
    .reverse()
    .join(' ');
};

export const GetRepeatStr = (source: string) => {
  if (!source) return '';
  const days: any[] = [];
  let repeat = '';
  source.split('').map((item, index) => {
    if (item === '1') {
      days.push(Strings.getLang(`day${index}`));
    }
  });
  if (days.length === 0) {
    repeat = Strings.getLang('dayOnce');
  } else if (days.length === 7) {
    repeat = Strings.getLang('dayEvery');
  } else if (days.length === 5 && source.substring(1, 6) === '11111') {
    repeat = Strings.getLang('weekDays');
  } else if (days.length === 2 && source.startsWith('1') && source.endsWith('1')) {
    repeat = Strings.getLang('weekend');
  } else {
    repeat = days.join(' ');
  }
  return repeat;
};

export const TransformRepeat = (source: string) => {
  let repeatLoop = parseInt(source, 16).toString(2);
  if (repeatLoop.length < 7) {
    const zeroPlus = '0'.repeat(7 - repeatLoop.length);
    repeatLoop = `${zeroPlus}${repeatLoop}`;
  }
  return repeatLoop;
};
