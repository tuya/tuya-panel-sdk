import { Dimensions, Platform } from 'react-native';

import { Utils } from 'tuya-panel-kit';

const {
  convertX: cx,
  convertY: cy,
  convert,
  isIphoneX,
  statusBarHeight,
  topBarHeight,
} = Utils.RatioUtils;

const { width: winWidth, height: winHeight } = Dimensions.get('screen');

const smallScreen: boolean = winHeight < 667;

const middlleScreen: boolean = winHeight >= 667 && winHeight <= 736;

const isIOS: boolean = Platform.OS === 'ios';

// 普通播放器高度
const normalPlayerWidth: number = Math.ceil(winWidth);
const normalPlayerHeight: number = Math.ceil((winWidth * 9) / 16);

export default {
  cx,
  cy,
  convert,
  isIphoneX,
  winWidth,
  winHeight,
  topBarHeight,
  smallScreen,
  middlleScreen,
  statusBarHeight,
  normalPlayerWidth,
  normalPlayerHeight,
  isIOS,
};
