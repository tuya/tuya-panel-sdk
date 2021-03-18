/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import colors from 'color';
import Strings from '../i18n';

export const icons = {
  up:
    'M105.545143 621.860571a54.857143 54.857143 0 0 1-1.609143-71.68l5.632-5.851428 365.714286-329.142857a54.857143 54.857143 0 0 1 66.852571-5.046857l6.582857 5.12 365.714286 329.142857a54.857143 54.857143 0 0 1-66.998857 86.528l-6.436572-5.046857L512 329.874286 183.003429 625.883429a54.857143 54.857143 0 0 1-71.68 1.609142l-5.851429-5.632z',
  down:
    'M918.454857 402.139429a54.857143 54.857143 0 0 1 1.609143 71.68l-5.632 5.851428-365.714286 329.142857a54.857143 54.857143 0 0 1-66.852571 5.046857l-6.582857-5.12-365.714286-329.142857a54.857143 54.857143 0 0 1 66.998857-86.528l6.436572 5.046857L512 694.125714l328.996571-296.082285a54.857143 54.857143 0 0 1 71.68-1.609143l5.851429 5.632z',
  stop:
    'M292.571429 73.142857a73.142857 73.142857 0 0 1 73.142857 73.142857v731.428572a73.142857 73.142857 0 0 1-146.285715 0V146.285714a73.142857 73.142857 0 0 1 73.142858-73.142857z m438.857142 0a73.142857 73.142857 0 0 1 73.142858 73.142857v731.428572a73.142857 73.142857 0 0 1-146.285715 0V146.285714a73.142857 73.142857 0 0 1 73.142857-73.142857z',
};

// 返回圆圈样式设置
export const renderStyle = (radius: number, circleBg: string, borderColor: string) => {
  const diameter = radius * 2;
  return {
    width: diameter,
    height: diameter,
    borderRadius: radius,
    backgroundColor: circleBg,
    borderWidth: 1,
    borderColor,
  };
};

// 按钮图标
export const ICON: any = {
  open: icons.up,
  stop: icons.stop,
  close: icons.down,
};

// 参数默认值
export const DEFAULTPROPS = {
  radius: 150,
  data: [],
  bigCircleBg: colors('#FFFFFF').alpha(0.042).rgbString(),
  bigBorderColor: colors('#DBDBDB').alpha(0.2).rgbString(),
  smallCircleBg: '#383838',
  smallBorderColor: '#303030',
  isHorizontal: false,
  open: {
    text: Strings.getLang('open'),
    color: '#FFFFFF',
    animateColor: '#1E9BC0',
  },
  close: {
    text: Strings.getLang('close'),
    color: '#FFFFFF',
    animateColor: '#1E9BC0',
  },
  stop: {
    color: '#FFFFFF',
  },
};

export const getTextColor = (
  val: string,
  open: { text: string; color: string },
  close: { text: string; color: string },
  stop: { color: string }
) => {
  let txt = '';
  let colorValue = '#333333';
  switch (val) {
    case 'open':
      txt = open.text;
      colorValue = open.color;
      break;
    case 'stop':
      txt = '';
      colorValue = stop.color;
      break;
    case 'close':
      txt = close.text;
      colorValue = close.color;
      break;
    default:
      break;
  }
  return {
    txt,
    color: colorValue,
  };
};

export const getDisable = (rangeState: string, percent: number, isStopState: boolean) => {
  let disabled = false;
  switch (rangeState) {
    case 'open':
      disabled = isStopState && percent === 100;
      break;
    case 'stop':
      disabled = false;
      break;
    case 'close':
      disabled = isStopState && percent === 0;
      break;
    default:
      break;
  }
  return disabled;
};

export const DELAY = [200, 400, 600];
export const DURTION = [900, 700, 500];
export const DELAY2 = [600, 400, 200];
export const DURTION2 = [500, 700, 900];
export const ACTIVEOPACITY = 0.9;
