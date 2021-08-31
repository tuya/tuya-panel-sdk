import { Animated, PanResponderGestureState, GestureResponderEvent, StyleProp } from 'react-native';

export type CurtainType = 'oneSide' | 'roller' | 'trietex';
export type ControlType = 'open' | 'close' | 'stop';
export type StyleType = 'flat' | 'zoosemy';
export type ImageType = string | number;

export const CurtainGestureTag = {
  leftCurtain: 'leftCurtain',
  rightCurtain: 'rightCurtain',
  leftCircle: 'leftCircle',
  rightCircle: 'rightCircle',
};

export interface CommonResponder {
  (e: GestureResponderEvent, gestureState: PanResponderGestureState): any;
}

export interface PanResponderHandler {
  grant: CommonResponder;
  move: CommonResponder;
  release: CommonResponder;
}

export interface IGesture {
  leftCurtain?: any;
  rightCurtain?: any;
  leftCircle?: any;
  rightCircle?: any;
}

export interface IProps {
  style: StyleProp<any>;
  // 窗帘类型   '单侧帘'   | '卷帘'    | '开合帘电机'
  curtainType: CurtainType;
  // 窗帘风格 '扁平' | '拟物'
  styleType: StyleType;
  // 窗帘当前位置
  value: number;
  // 窗帘运动范围 [0, 100]
  range: number[];
  // 是否禁用
  disabled: boolean;
  // 当前控制状态  '开启' | '关闭' | '暂停'
  control: ControlType;
  // 运行全程时间 单位ms
  totalTime: number;
  // 窗帘页图片
  curtainCeilImage: ImageType;
  // 窗帘背景图片
  curtainBgImage: ImageType;
  // 窗帘页颜色
  curtainCeilColor: ControlType;
  // 窗帘背景色
  curtainBgColor: ControlType;
  // 按钮色
  buttonColor: ControlType;
  // 窗帘背景宽
  curtainBgWidth: number;
  // 窗帘背景宽
  curtainBgHeight: number;
  // 窗帘宽
  curtainWidth: number;
  // 窗帘宽
  curtainHeight: number;
  // 最小值
  min: number;
  // 最大值
  max: number;
  // dpCodes
  codes: {
    [key: string]: string;
  };
  // 窗帘移动回调
  onSlideTo: (value: number) => any;
  // 状态栏文字颜色
  textColor: string;
  openingText?: string;
  closingText?: string;
  // 静态资源host
  staticPrefix: string;
}

export interface IState {
  curtainCeilAnimate: Animated.AnimatedValue;
  circleAnimate: Animated.AnimatedValue;
}
