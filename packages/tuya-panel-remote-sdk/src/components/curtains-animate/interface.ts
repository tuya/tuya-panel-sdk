import { StyleProp, ViewStyle, ImageStyle } from 'react-native';

type AnimateType = 'close' | 'open' | 'pause';

export type PositionType = 'left' | 'right';

interface CurtainsPosition {
  top: number;
  left: number;
}

export interface MainProps {
  /**
   * 组件样式
   */
  style: StyleProp<ViewStyle>;
  /**
   * 窗帘宽度
   */
  width: number;
  /**
   * 窗帘高度
   */
  height: number;
  /**
   * 初始开合百分比，值0~1
   */
  initPercent: number;
  /**
   * 滑动按钮宽度
   */
  buttonWidth: number;
  /**
   * 动画总时间，以秒为单位
   */
  animateTime: number;
  /**
   * 动画状态，共三种：'close'，'open'，'pause'
   */
  type: AnimateType | null;
  /**
   * 窗帘位置
   */
  curtainsPosition: CurtainsPosition;
  /**
   * 手势滑动释放执行回调
   */
  onChange: (type: AnimateType, percent: number) => void;
  /**
   * 手势滑动执行回调
   */
  onMove: (percent: number) => void;
  /**
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
   * 滑动按钮位置误差
   */
  buttonPositionErrorValue: number;
  /**
   * 窗帘左帘图片
   */
  curtainsLeftImage: number;
  /**
   * 窗帘右帘图片
   */
  curtainsRightImage: number;
  /**
   * 窗帘View样式
   */
  curtainsStyle: StyleProp<ViewStyle>;
  /**
   * 窗帘Image样式
   */
  curtainsImageStyle: StyleProp<ImageStyle>;
}

export interface MainState {
  percent: number;
  curtainsWidth: any;
  buttonPosition: any;
}
