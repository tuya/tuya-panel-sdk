/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Utils } from 'tuya-panel-kit';
import _ from 'lodash';
export { default as ColorUtils } from './color';
export { default as StorageUtils } from './storage';
export { default as SupportUtils } from './support';
import Strings from '../components/timer/normal-timing/i18n';

const {
  CoreUtils,
  ColorUtils: { color },
} = Utils;

export function handleError(error: Error): void {
  // eslint-disable-next-line no-console
  console.warn(error.message || error);
}

type WinSize = {
  width: number;
  height: number;
};

export const winSize = {
  width: Utils.RatioUtils.width,
  height: Utils.RatioUtils.height,
};

export const setWinSize = (size: { width?: number; height?: number }): void => {
  Object.assign(winSize, size);
};

export const getWinSize = (): WinSize => {
  return winSize;
};

interface PercentOption {
  min?: number;
  max?: number;
  minPercent?: number;
}

/**
 * 标准百分比计算公式
 * @param value 值
 * @param option 百分比计算配置
 */
export const formatPercent = (
  value: number,
  { min = 0, max = 1000, minPercent = 0 }: PercentOption = {}
): number => {
  return Math.round(((100 - minPercent) * (value - min)) / (max - min) + minPercent);
};

export const to16 = (value: number, length = 2): string => {
  let result = Number(value).toString(16);
  if (result.length < length) {
    result = _.padStart(result, length, '0');
  }
  return result;
};

/**
 * 随机获取一个 hsv 颜色
 * @param isValueRandom 亮度是否也随机
 */
export const randomHsv = (isValueRandom = false): IColour => {
  return {
    hue: _.random(360, false),
    saturation: _.random(1000, false),
    value: isValueRandom ? _.random(10, 1000, false) : 1000,
  };
};

/**
 * 随机获取一个场景颜色
 * @param isGetColour 是否获取的彩光
 */
export const randomSceneColor = (isGetColour = true): SceneColor => {
  if (isGetColour) {
    return { isColour: true, ...randomHsv(), brightness: 10, temperature: 0 };
  }
  return {
    isColour: false,
    temperature: _.random(1000, false),
    brightness: _.random(10, 1000, false),
    hue: 0,
    saturation: 0,
    value: 10, // 确保数据亮度为最小亮度
  };
};

export const getStrLengthByByte = (value: string): number => {
  if (!value) {
    return 0;
  }
  // eslint-disable-next-line no-control-regex
  return value.replace(/[^\u0000-\u00ff]/g, '**').length;
};

export function formatTime(value: number): string {
  return _.padStart(String(value), 2, '0');
}

/**
 * Calculate the coordinates of a point on the circle
 * @param center center coordinates
 * @param radius radius
 * @param angle deflection angle
 */
export function getCirclePointCoordinate(
  center: number[],
  radius: number,
  angle: number
): number[] {
  const [x, y] = center;
  return [x + radius * Math.sin(angle), y - radius * Math.cos(angle)];
}

/**
 * transform
 */
export function* transform(value: string): Generator<number> {
  let start = 0;
  let result = 0;
  let length: any;
  for (; true; ) {
    length = yield result;
    result = parseInt(value.substr(start, length), 16) || 0;
    if (start + length >= value.length) {
      break;
    }
    start += length;
  }
  return result;
}

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
  return t.split(' ').reverse().join(' ');
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const repeatArrStr = (source: number[]) => {
  if (!source) return '';
  const days: string[] = [];
  let repeat = '';
  let workDay = true;
  let weekend = true;
  source.forEach((item, index: 0 | 1 | 2 | 3 | 4 | 5 | 6) => {
    if (index > 0 && index < 6) {
      if (item === 0) {
        workDay = false;
      }
    }
    if (index === 0 || index === 6) {
      if (item === 0) {
        weekend = false;
      }
    }
    if (item === 1) {
      // @ts-ignore
      days.push(Strings.getLang(`TYLamp_day${index}`));
    }
  });
  if (workDay && weekend) {
    repeat = Strings.getLang('TYLamp_dayEvery');
  } else if (days.length === 0) {
    repeat = Strings.getLang('TYLamp_dayOnce');
  } else {
    repeat = days.join('、');
  }
  return repeat;
};

export const parseHour12Data = (second: number) => {
  const t = second % 86400;
  const originHour = parseInt(`${t / 3600}`, 10);
  const m = parseInt(`${t / 60 - originHour * 60}`, 10);
  let h = originHour % 12;
  if (h === 0) {
    h = 12;
  }
  return {
    timeStr: `${CoreUtils.toFixed(h, 2)}:${CoreUtils.toFixed(m, 2)}`,
    isPM: originHour >= 12,
  };
};

// eslint-disable-next-line no-shadow
export enum weeksStr {
  dayOnce = '0',
  dayEvery = '1',
  custom = '2',
}

export const weeksArr = [weeksStr.dayOnce];
export const dataSource = [
  {
    key: weeksStr.dayOnce,
    title: Strings.getLang('TYLamp_dayOnce'),
    value: weeksStr.dayOnce,
  },
  {
    key: weeksStr.dayEvery,
    title: Strings.getLang('TYLamp_dayEvery'),
    value: weeksStr.dayEvery,
  },
  {
    key: weeksStr.custom,
    title: Strings.getLang('TYLamp_custom'),
    value: weeksStr.custom,
  },
];

export const colourFormat = (data: IColour) => {
  const { hue, saturation, value } = data;
  return `${to16(hue, 4)}${to16(saturation, 4)}${to16(value, 4)}`;
};

export const colourParse = (str: string) => {
  if (str.length === 12) {
    return {
      hue: parseInt(str.slice(0, 4), 16),
      saturation: parseInt(str.slice(4, 8), 16),
      value: parseInt(str.slice(8, 12), 16),
    };
  }
  return {
    hue: 0,
    saturation: 1000,
    value: 1000,
  };
};

export const actionTypeStr = (power: boolean, workMode: string) => {
  let str = 'TYLamp_off';
  if (power) {
    if (workMode === 'white') {
      str = 'TYLamp_white';
    } else {
      str = 'TYLamp_colour';
    }
  }
  return Strings.getLang(str as any);
};

// eslint-disable-next-line no-shadow
export enum WORK_MODE {
  WHITE = 'white',
  COLOUR = 'colour',
  SCENE = 'scene',
  MUSIC = 'music',
}
export function objectShallowEqual(obj1: any, obj2: any, keys?: string[]): boolean {
  if (obj1 === obj2) return true;
  const keys1 = Object.keys(obj1).filter(key => (keys ? keys.includes(key) : true));
  const keys2 = Object.keys(obj2).filter(key => (keys ? keys.includes(key) : true));
  return keys1.length === keys2.length && keys1.every(key => obj1[key] === obj2[key]);
}
/** hsv 转 hex */
export function hsv2hex(hue = 0, saturation = 0, value = 1000): string {
  return color.hsb2hex(hue, saturation / 10, value / 10);
}
