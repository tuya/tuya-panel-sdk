import { StyleProp, ViewStyle, ImageStyle } from 'react-native';

type AnimateType = 'close' | 'open' | 'pause';
interface RollerSize {
  width: number;
  height: number;
}
interface RollerPosition {
  top: number;
  left: number;
}

export interface MainProps {
  /**
   * 组件样式
   */
  style: StyleProp<ViewStyle>;
  /**
   * 卷帘宽度
   */
  width: number;
  /**
   * 卷帘高度
   */
  height: number;
  /**
   * 初始位置百分比，值0~1
   */
  initPercent: number;
  /**
   * 滑动按钮宽度
   */
  buttonWidth: number;
  /**
   * 动画状态，共三种：'close'，'open'，'pause'
   */
  type: AnimateType;
  /**
   * 卷帘宽高
   */
  rollerSize: RollerSize;
  /**
   * 卷帘位置
   */
  rollerPosition: RollerPosition;
  /**
   * 动画总时间
   */
  animateTime: number;
  /**
   * 背景图片
   */
  bgImage: number;
  /**
   * 背景图片样式
   */
  bgImageStyle: StyleProp<ImageStyle>;
  /**
   * 窗帘卷轴图片
   */
  rollerImage: number;
  /**
   * 窗帘卷轴View样式
   */
  rollerStyle: StyleProp<ViewStyle>;
  /**
   * 窗帘卷轴Image样式
   */
  rollerImageStyle: StyleProp<ImageStyle>;
  /**
   * 滑动按钮图片
   */
  buttonImage: number;
  /**
   * 滑动按钮View样式
   */
  buttonStyle: StyleProp<ViewStyle>;
  /**
   * 滑动按钮Image样式
   */
  buttonImageStyle: StyleProp<ImageStyle>;
  /**
   * 动画状态执行回调
   */
  onChange: (type: AnimateType) => void;
}

export interface MainState {
  percent: number;
  rollerTop: any;
  buttonPosition: any;
}

export interface Size {
  width: number;
  height: number;
}
