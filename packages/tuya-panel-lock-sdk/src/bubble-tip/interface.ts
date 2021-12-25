import React from 'react';
import { StyleProp, ViewStyle, Image, ImageStyle } from 'react-native';

/**
 * configList 中 configItem 的类型
 */
// eslint-disable-next-line no-shadow
export enum EBubbleTipeConfigType {
  safe = 'safe',
  info = 'info',
  danger = 'danger',
}

/**
 * @configList 配置项
 * @showIcon 是否展示icon
 * @children 默认会有的，解决ts问题
 */
export interface IComposeHOC {
  configList?: Array<IBubbleTipItemConfig>;
  children?: React.ReactNode;
  showIcon?: boolean;
}

/**
 * @description 每条消息的配置信息，可根据type 绑定内部定义好的样式 也可自定义传入
 * @type EBubbleTipeConfigType类型
 * @key 唯一标识
 * @text 文字
 * @icon 自定义图标
 * @wrapStyle 包裹的容器样式
 * @iconStyle 自定义图标样式
 * @textStyle 文本样式
 */
export interface IBubbleTipItemConfig {
  type?: EBubbleTipeConfigType;
  key: any;
  text: string;
  icon?: StyleProp<Image>;
  wrapStyle?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<ImageStyle>;
  textStyle?: StyleProp<ViewStyle>;
}

/**
 * @animatedList 自定义的动画数组[Promise]
 * @distance 移动的距离
 * @waitingTime 等待时间
 * @runInTime 淡入时间
 * @leavingTime 淡出时间
 */
export interface IBubbleTipBase {
  children: Array<React.ReactNode>;
  distance: number;
  waitingTime?: number;
  runInTime?: number;
  leavingTime?: number;
}
