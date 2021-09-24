import { Utils } from 'tuya-panel-kit';
import _ from 'lodash';
export { default as ColorUtils } from './color';
export { default as StorageUtils } from './storage';

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
