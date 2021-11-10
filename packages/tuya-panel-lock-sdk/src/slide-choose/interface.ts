import { ReactElement } from 'react';
import { ImageProps, ViewStyle } from 'react-native';

export type LinearGradientColorType =
  | string
  | {
      linearGradient?: { x1: string; x2: string; y1: string; y2: string };
      linearStops: { [ket: string]: string };
    };

export interface SlideChooseProps {
  /**
   * @language zh-CN
   * @description 按钮文案颜色
   * @defaultValue #fff
   */
  /**
   * @language en-US
   * @description the color of button text
   * @defaultValue #fff
   */
  btnTextColor?: string;
  /**
   * @language zh-CN
   * @description 按钮区域宽度
   * @defaultValue #fff
   */
  /**
   * @language en-US
   * @description slider's width
   * @defaultValue #fff
   */
  sliderWidth?: number;
  /**
   * @language zh-CN
   * @description 距离边界多少距离触发回调
   * @defaultValue 20
   */
  /**
   * @language en-US
   * @description the distance of trigger onChooseLeft or onChooseRight
   * @defaultValue 20
   */
  triggerDistance?: number;
  /**
   * @language zh-CN
   * @description 左边按钮颜色
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description left button color
   * @defaultValue { '0%': '#FF4040', '100%': 'rgba(254,72,71,0.5)' }
   */
  leftColor?: LinearGradientColorType;
  /**
   * @language zh-CN
   * @description 右边按钮颜色
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description right button color
   * @defaultValue { '0%': '#239C8E', '100%': 'rgba(35,156,142,0.5)'}
   */
  rightColor?: LinearGradientColorType;
  /**
   * @language zh-CN
   * @description 左边按钮文案
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description left button text
   * @defaultValue left
   */
  leftText?: string | ReactElement;
  /**
   * @language zh-CN
   * @description 右边按钮文案
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description right button text
   * @defaultValue right
   */
  rightText?: string | ReactElement;
  /**
   * @language zh-CN
   * @description 拖动手柄图标
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description the icon of the handle
   * @defaultValue undefined
   */
  handleIcon?: ImageProps['source'];
  /**
   * @language zh-CN
   * @description 手柄样式
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description circle bgcolor
   * @defaultValue undefined
   */
  handleStyle?: ViewStyle;
  /**
   * @language zh-CN
   * @description 是否显示箭头波浪
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description circle bgcolor
   * @defaultValue undefined
   */
  showArrowWave?: boolean | number;
  /**
   * @language zh-CN
   * @description 箭头波浪容器样式
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description arrow wave container's style
   * @defaultValue undefined
   */
  waveContainerStyle?: ViewStyle;
  /**
   * @language zh-CN
   * @description 波浪颜色
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description arrow wave color
   * @defaultValue undefined
   */
  waveColor?: string;
  /**
   * @language zh-CN
   * @description 波浪动画
   * @defaultValue true
   */
  /**
   * @language en-US
   * @description whether open wave's animation
   * @defaultValue true
   */
  openWaveAnimation?: boolean;
  /**
   * @language zh-CN
   * @description 中间圆形半径
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description circle radius
   * @defaultValue undefined
   */
  circleRadius?: number;
  /**
   * @language zh-CN
   * @description 中间圆形背景色
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description circle bgcolor
   * @defaultValue undefined
   */
  circleBgColor?: LinearGradientColorType;
  /**
   * @language zh-CN
   * @description loading 文案
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description loading text
   * @defaultValue undefined
   */
  loadingText?: string;
  /**
   * @language zh-CN
   * @description 是否开启异步
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description async mode
   * @defaultValue undefined
   */
  async?: boolean;
  /**
   * @language zh-CN
   * @description loading 指示器颜色
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description indicator color
   * @defaultValue undefined
   */
  indicatorColor?: string;
  /**
   * @language zh-CN
   * @description loading 文案颜色
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description loading text color
   * @defaultValue undefined
   */
  loadingTextColor?: string;
  /**
   * @language zh-CN
   * @description 是否单边
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description single side
   * @defaultValue undefined
   */
  singleSide?: boolean | 'left' | 'right';
  /**
   * @language zh-CN
   * @description 滑动选择触发回调事件，滑倒左边或者右边都会触发
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description the event triggered by choose end
   * @defaultValue undefined
   */
  onChooseEnd?: (done?: () => void) => void;
  /**
   * @language zh-CN
   * @description 滑动左边回调时间
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description choose left callback
   * @defaultValue undefined
   */
  onChooseLeft?: (done?: () => void) => void;
  /**
   * @language zh-CN
   * @description 滑动右边回调事件
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description choose right callback
   * @defaultValue undefined
   */
  onChooseRight?: (done?: () => void) => void;
  /**
   * @language zh-CN
   * @description 触摸开始回调事件
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description touchStart event
   * @defaultValue undefined
   */
  onTouchStart?: () => void;
}

export interface ArrowWaveRefType {
  start: () => void;
  stop: () => void;
}
