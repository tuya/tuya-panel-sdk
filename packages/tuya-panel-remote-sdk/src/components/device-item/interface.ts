import React from 'react';
import { ImageStyle, StyleProp, TextStyle, ViewStyle } from 'react-native';

export interface MainProps {
  /**
   * 容器高度
   */
  height?: number;
  /**
   * 容器宽度
   */
  width?: number;
  /**
   * 左侧的icon
   */
  icon?: number | string | React.ReactNode;
  /**
   * icon样式
   */
  iconStyle?: StyleProp<ImageStyle>;
  /**
   * 标题
   */
  title?: string;
  /**
   * 标题样式
   */
  titleStyle?: StyleProp<TextStyle>;
  /**
   * 副标题
   */
  subTitle?: string;
  /**
   * 副标题样式
   */
  subTitleStyle?: StyleProp<TextStyle>;
  /**
   * 列表右侧的自定义内容
   */
  extra?: React.ReactNode;
  /**
   * 左滑右侧内容
   */
  swipeContent?: any;
  /**
   * 侧滑之后出现按钮的宽度
   */
  swipeContentButtonWidth?: number;
  /**
   * 容器样式
   */
  style?: StyleProp<ViewStyle>;
  /**
   * 右侧icon样式
   */
  rightIconStyle?: StyleProp<ImageStyle>;
  /**
   * 自定义右侧内容
   */
  rightIcon?: number | string | React.ReactNode;
  /**
   * 是否启用侧滑
   */
  enableSwipe?: boolean;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 是否显示右侧箭头
   */
  showRightArrow?: boolean;
  /**
   * 是否显示阴影
   */
  showShadow?: boolean;
  /**
   * 滑动回调函数
   */
  onScroll?: (value?: boolean) => void;
  /**
   * 短按触发
   */
  onPress?: (...args: any) => void;
  /**
   * 长按触发
   */
  onLongPress?: (...args: any) => void;
  /**
   * 自定义内容
   */
  content?: React.ReactNode;
}
