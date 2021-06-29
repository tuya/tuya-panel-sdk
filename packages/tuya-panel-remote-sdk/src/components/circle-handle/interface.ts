import { StyleProp, ViewStyle, TextStyle } from 'react-native';

export type PositionName = 'top' | 'right' | 'bottom' | 'left' | 'center';

export interface Position {
  top?: any;
  right?: any;
  bottom?: any;
  left?: any;
  center?: any;
}

export interface PositionItem {
  key: PositionName;
  [keyName: string]: any;
}

export interface PositionInfo {
  /**
   * 组件半径
   */
  radius?: number;
  /**
   * 各方位按键激活时的背景色
   */
  bgColor?: Position;
  /**
   * 各方位按键按下后的背景色
   */
  activeBgColor?: Position;
  /**
   * 各方位按键未激活时的背景色
   */
  disabledBgColor?: Position;
  /**
   * 组件内边距
   */
  padding?: number;
  /**
   * 各方位按键自定义内容
   */
  keyContent?: Position | null;
  /**
   * 上下左右方位按键内容与组件边框的距离
   */
  offset?: number;
  /**
   * 默认按键内容中圆点的半径
   */
  pointRadius?: number;
  /**
   * 自定义内容高度
   */
  contentHeight?: number;
  /**
   * 自定义内容宽度
   */
  contentWidth?: number;
}

export interface MainProps extends PositionInfo {
  /**
   * 外边框背景色
   */
  outBgColor?: string;
  /**
   * 组件内container样式
   */
  style?: StyleProp<ViewStyle>;
  /**
   * 中心按键container样式
   */
  centerStyle?: StyleProp<ViewStyle>;
  /**
   * 中心按键半径
   */
  centerRadius?: number;
  /**
   * 中心按键文字
   */
  centerText?: string;
  /**
   * 中心按键文字样式
   */
  centerTextStyle?: StyleProp<TextStyle>;
  /**
   * 各方位按键激活状态
   */
  status?: Position;
  /**
   * 各按键长按时，是否连续重复触发
   */
  repeat?: Position;
  /**
   * 连续重复触发时间间隔
   */
  repeatIntervalTime?: number;
  /**
   * 上下左右方位按键tip文字
   */
  tip?: Position | null;
  /**
   * tip文字样式
   */
  tipStyle?: StyleProp<TextStyle>;
  /**
   * 各方位按键短按事件
   */
  onPress?: Position | null;
  /**
   * 各方位按键长按事件
   */
  onLongPress?: Position | null;
  /**
   * 默认按键内容中圆点的颜色
   */
  pointColor?: string;
  /**
   * 是否展示loading效果
   */
  loading?: Position;
  /**
   * 自定义loading内容
   */
  loadingContent?: JSX.Element | Element;
}

export interface MainState {
  keyPoint: any[];
  keyPosition: any[];
  content: any[];
  rotate: any;
  loadingWidth: number;
  loadingHeight: number;
}
