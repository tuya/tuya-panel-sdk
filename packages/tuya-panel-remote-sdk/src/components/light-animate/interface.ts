import { Animated, ImageStyle, StyleProp, ViewProps } from 'react-native';

export interface LooseObj {
  [key: string]: string;
}

export interface MainProps {
  /**
   * 灯光类型
   */
  type: string;
  /**
   * 灯图片
   */
  lightImg: number;
  /**
   * 渐变背景高度
   */
  gradientHeight: number;
  /**
   * 渐变背景宽度
   */
  gradientWidth: number;
  /**
   * 组件样式
   */
  style: ViewProps;
  /**
   * 灯图片样式
   */
  lightImgStyle: StyleProp<ImageStyle>;
  /**
   * 灯动画持续时间
   */
  duration: number;
  /**
   * 灯颜色配置
   */
  config: LooseObj;
  /**
   * 灯动画结束回调
   */
  onRelease: () => any;
}

export interface MainState {
  iconOpacity: Animated.Value;
}
