import { StyleProp, ViewStyle, TextStyle, ImageStyle, ImageSourcePropType } from 'react-native';

export interface MainProps {
  /**
   * 组件圆角
   */
  radius?: number;
  /**
   * 组件内边距
   */
  padding?: number;
  /**
   * 组件高度
   */
  height?: number;
  /**
   * 组件宽度
   */
  width?: number;
  /**
   * 按键激活时的背景色
   */
  bgColor?: string[] | string;
  /**
   * 按键按下后的背景色
   */
  activeBgColor?: string[] | string;
  /**
   * 按键未激活时的背景色
   */
  disabledBgColor?: string[] | string;
  /**
   * 按键激活时的内容颜色
   */
  contentColor?: string[] | string;
  /**
   * 按键未激活时的内容颜色
   */
  disabledContentColor?: string[] | string;
  /**
   * 按键短按事件
   */
  onPress?: Array<() => any> | null[] | null;
  /**
   * 按键长按事件
   */
  onLongPress?: Array<() => any> | null[] | null;
  /**
   * 组件外圈样式
   */
  outStyle?: StyleProp<ViewStyle>;
  /**
   * 外边框背景色
   */
  outBgColor?: string;
  /**
   * tip文字样式
   */
  tipStyle?: StyleProp<TextStyle>;
  /**
   * tip文字
   */
  tip?: string;
  /**
   * 按键激活状态
   */
  status?: boolean[] | boolean;
  /**
   * 按键长按时，是否连续重复触发
   */
  repeat?: boolean[] | boolean;
  /**
   * 连续重复触发时间间隔
   */
  repeatIntervalTime?: number;
  /**
   * IconFont组件属性d值
   */
  icon?: string[] | null[];
  /**
   * 本地图片引用
   */
  img?: ImageSourcePropType[] | null[];
  /**
   * 图片样式
   */
  imgStyle?: StyleProp<ImageStyle>;
  /**
   * icon尺寸大小
   */
  iconSize?: number;
  /**
   * 组件显示方式：水平和垂直
   */
  type?: 'horizontal' | 'vertical';
  /**
   * 显示文字
   */
  text?: string[];
  /**
   * 显示文字样式
   */
  textStyle?: StyleProp<TextStyle>;
  /**
   * IconFont组件useART属性
   */
  useART?: boolean[] | boolean;
  /**
   * 是否展示loading效果
   */
  loading?: boolean[];
  /**
   * 自定义loading内容
   */
  loadingContent?: JSX.Element | Element;
}
