import { StyleProp, ViewStyle, ImageStyle } from 'react-native';

export interface MainProps {
  /**
   * 组件样式
   */
  style: StyleProp<ViewStyle>;
  /**
   * 推窗器边框宽度
   */
  width: number;
  /**
   * 推窗器边框高度
   */
  height: number;
  /**
   * 窗户宽度
   */
  windowWidth: number;
  /**
   * 窗户高度
   */
  windowHeight: number;
  /**
   * 支撑杆与窗户底部高度差
   */
  studdleOffset: number;
  /**
   * 支撑杆主杆图片
   */
  rodBottom: number;
  /**
   * 支撑杆顶部图片
   */
  rodTop: number;
  /**
   * 窗户打开的最大最小角度,范围:0-90
   */
  range: number[];
  /**
   *  动画状态，共三种：'close'，'open'，'pause'
   */
  type: 'close' | 'open' | 'pause' | null;
  /**
   * 窗户边框图片
   */
  borderImage: number;
  /**
   * 窗户边框图片样式
   */
  borderImageStyle: StyleProp<ImageStyle>;
  /**
   * 窗户图片
   */
  windowImage: number;
  /**
   * 窗户图片样式
   */
  windowImageStyle: StyleProp<ImageStyle>;
}

export interface MainState {
  matrix: any;
  degree: any;
}

export interface Size {
  width: number;
  height: number;
}
