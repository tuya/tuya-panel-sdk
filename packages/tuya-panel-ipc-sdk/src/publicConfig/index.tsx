import { Dimensions, Platform } from 'react-native';
import { Utils } from 'tuya-panel-kit';

const { convertX: cx, convertY: cy, convert, isIphoneX, topBarHeight } = Utils.RatioUtils;
const { width: winWidth, height: winHeight } = Dimensions.get('screen');

const isIOS = Platform.OS === 'ios';

export default {
  cx,
  cy,
  convert,
  isIphoneX,
  winWidth,
  winHeight,
  topBarHeight,
  isIOS,
};
