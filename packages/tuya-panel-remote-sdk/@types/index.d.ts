import * as React from 'react';
import { StyleProp, ViewStyle, ImageStyle } from 'react-native';

export interface LooseObj {
  [key: string]: string;
}
export interface PressKeyProps {
  /**
   * @language zh-CN
   * @description 圆角
   * @defaultValue 34
   */
  /**
   * @language en-US
   * @description radius
   * @defaultValue 34
   */
  radius?: number;
  /**
   * @language zh-CN
   * @description 按键内边距
   * @defaultValue 4
   */
  /**
   * @language en-US
   * @description Key padding
   * @defaultValue 4
   */
  padding?: number;
  /**
   * @language zh-CN
   * @description 高
   * @defaultValue 68
   */
  /**
   * @language en-US
   * @description height
   * @defaultValue 68
   */
  height?: number;
  /**
   * @language zh-CN
   * @description 宽
   * @defaultValue 68
   */
  /**
   * @language en-US
   * @description width
   * @defaultValue 68
   */
  width?: number;
  /**
   * @language zh-CN
   * @description 按键激活时的背景色
   * @defaultValue 'rgb(255,255,255)'
   */
  /**
   * @language en-US
   * @description The background color when the key is active
   * @defaultValue 'rgb(255,255,255)'
   */
  bgColor?: string;
  /**
   * @language zh-CN
   * @description 按键按下后的背景色
   * @defaultValue 'rgb(250,250,250)'
   */
  /**
   * @language en-US
   * @description The background color after the key is pressed
   * @defaultValue 'rgb(250,250,250)'
   */
  activeBgColor?: string;
  /**
   * @language zh-CN
   * @description 按键未激活时的背景色
   * @defaultValue 'rgb(250,250,250)'
   */
  /**
   * @language en-US
   * @description The background color when the key is not active
   * @defaultValue 'rgb(250,250,250)'
   */
  disabledBgColor?: string;
  /**
   * @language zh-CN
   * @description 按键激活时的内容颜色
   * @defaultValue 'rgba(122,123,136,1)'
   */
  /**
   * @language en-US
   * @description The color of the content when the key is active
   * @defaultValue 'rgba(122,123,136,1)'
   */
  contentColor?: string;
  /**
   * @language zh-CN
   * @description 按键未激活时的内容颜色
   * @defaultValue 'rgba(122,123,136,0.5)'
   */
  /**
   * @language en-US
   * @description The content color when the key is not active
   * @defaultValue 'rgba(122,123,136,0.5)'
   */
  disabledContentColor?: string;
  /**
   * @language zh-CN
   * @description 按键自定义内容
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Custom content of the key
   * @defaultValue null
   */
  content?: JSX.Element | Element;
  /**
   * @language zh-CN
   * @description 按键内容样式
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description The content style of the key
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @defaultValue null
   */
  contentStyle?: StyleProp<ViewStyle>;
  /**
   * @language zh-CN
   * @description 按键短按触发事件
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Key short press trigger event
   * @defaultValue null
   */
  onPress?: (() => any) | null;
  /**
   * @language zh-CN
   * @description 按键长按触发事件
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Key long press trigger event
   * @defaultValue null
   */
  onLongPress?: (() => any) | null;
  /**
   * @language zh-CN
   * @description 按键内部样式
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description The inner style of the key
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @defaultValue null
   */
  style?: StyleProp<ViewStyle>;
  /**
   * @language zh-CN
   * @description 按键外部样式
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description The outer style of the key
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @defaultValue null
   */
  outStyle?: StyleProp<ViewStyle>;
  /**
   * @language zh-CN
   * @description 外边框背景色
   * @defaultValue 'rgb(246, 246, 246)'
   */
  /**
   * @language en-US
   * @description Outer border background color
   * @defaultValue 'rgb(246, 246, 246)'
   */
  outBgColor?: string;
  /**
   * @language zh-CN
   * @description 提示文字
   * @defaultValue ''
   */
  /**
   * @language en-US
   * @description Tip words
   * @defaultValue ''
   */
  tip?: string | null;
  /**
   * @language zh-CN
   * @description 提示文字样式
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<TextStyle></a>
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description The style of the tip
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<TextStyle></a>
   * @defaultValue null
   */
  tipStyle?: StyleProp<TextStyle>;
  /**
   * @language zh-CN
   * @description 按键激活状态
   * @defaultValue false
   */
  /**
   * @language en-US
   * @description Key activation state
   * @defaultValue false
   */
  status?: boolean;
  /**
   * @language zh-CN
   * @description 按键长按时，是否连续重复触发
   * @defaultValue false
   */
  /**
   * @language en-US
   * @description When the key is pressed for a long time, whether it is triggered continuously and repeatedly
   * @defaultValue false
   */
  repeat?: boolean;
  /**
   * @language zh-CN
   * @description 连续重复触发时间间隔
   * @defaultValue 300
   */
  /**
   * @language en-US
   * @description Repeated trigger intervals
   * @defaultValue 300
   */
  repeatIntervalTime?: number;
  /**
   * @language zh-CN
   * @description Icon path
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Icon path
   * @defaultValue null
   */
  icon?: string | null;
  /**
   * @language zh-CN
   * @description 按键图片
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Key image
   * @defaultValue null
   */
  img?: ImageSourcePropType;
  /**
   * @language zh-CN
   * @description 图片样式
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ImageStyle></a>
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Image style
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ImageStyle></a>
   * @defaultValue null
   */
  imgStyle?: StyleProp<ImageStyle>;
  /**
   * @language zh-CN
   * @description icon尺寸大小
   * @defaultValue 20
   */
  /**
   * @language en-US
   * @description Icon size
   * @defaultValue 20
   */
  iconSize?: number;
  /**
   * @language zh-CN
   * @description 按键显示文字
   * @defaultValue ''
   */
  /**
   * @language en-US
   * @description Key text
   * @defaultValue '
   */
  text?: string | null;
  /**
   * @language zh-CN
   * @description 按键显示文字样式
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<TextStyle></a>
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Text style
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<TextStyle></a>
   * @defaultValue null
   */
  textStyle?: StyleProp<TextStyle>;
  /**
   * @language zh-CN
   * @description 基础组件IconFont的useART属性
   * @defaultValue false
   */
  /**
   * @language en-US
   * @description The useART property of the based component IconFont
   * @defaultValue false
   */
  useART?: boolean;
  /**
   * @language zh-CN
   * @description 按键处于未激活状态时，短按事件仍可点击触发
   * @defaultValue false
   */
  /**
   * @language en-US
   * @description When the button is not active, the short press event can still be clicked to trigger
   * @defaultValue false
   */
  alwaysPress?: boolean;
  /**
   * @language zh-CN
   * @description 是否展示loading效果
   * @defaultValue false
   */
  /**
   * @language en-US
   * @description Loading
   * @defaultValue false
   */
  loading?: boolean;
  /**
   * @language zh-CN
   * @description 自定义loading内容
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description The content of the customized loading
   * @defaultValue null
   */
  loadingContent?: JSX.Element | Element;
}
export const PressKey: React.ComponentClass<PressKeyProps>;

type PositionName = 'top' | 'right' | 'bottom' | 'left';
type AnimateType = 'close' | 'open' | 'pause';
interface Position {
  top?: any;
  right?: any;
  bottom?: any;
  left?: any;
  center?: any;
}
interface PositionItem {
  key: PositionName;
  [keyName: string]: any;
}
interface PositionInfo {
  /**
   * @language zh-CN
   * @description 圆角
   * @defaultValue 100
   */
  /**
   * @language en-US
   * @description radius
   * @defaultValue 100
   */
  radius?: number;
  /**
   * @language zh-CN
   * @description 按键激活时的背景色
   * @defaultValue
   * {
      top: '#FFFFFF',
      bottom: '#FFFFFF',
      left: '#FFFFFF',
      right: '#FFFFFF',
      center: '#FFFFFF',
   * }
   */
  /**
   * @language en-US
   * @description The background color when the key is active
   * @defaultValue
   * {
      top: '#FFFFFF',
      bottom: '#FFFFFF',
      left: '#FFFFFF',
      right: '#FFFFFF',
      center: '#FFFFFF',
   * }
   */
  bgColor?: Position;
  /**
   * @language zh-CN
   * @description 按键按下后的背景色
   * @defaultValue
   * {
      top: '#FAFAFA',
      bottom: '#FAFAFA',
      left: '#FAFAFA',
      right: '#FAFAFA',
      center: '#FAFAFA',
   * }
   */
  /**
   * @language en-US
   * @description The background color after the key is pressed
   * @defaultValue
   * {
      top: '#FAFAFA',
      bottom: '#FAFAFA',
      left: '#FAFAFA',
      right: '#FAFAFA',
      center: '#FAFAFA',
   * }
   */
  activeBgColor?: Position;
  /**
   * @language zh-CN
   * @description 按键未激活时的背景色
   * @defaultValue
   * {
      top: '#FAFAFA',
      bottom: '#FAFAFA',
      left: '#FAFAFA',
      right: '#FAFAFA',
      center: '#FAFAFA',
   * }
   */
  /**
   * @language en-US
   * @description The background color when the key is not active
   * @defaultValue
   * {
      top: '#FAFAFA',
      bottom: '#FAFAFA',
      left: '#FAFAFA',
      right: '#FAFAFA',
      center: '#FAFAFA',
   * }
   */
  disabledBgColor?: Position;
  /**
   * @language zh-CN
   * @description 按键内边距
   * @defaultValue 4
   */
  /**
   * @language en-US
   * @description Key padding
   * @defaultValue 4
   */
  padding?: number;
  /**
   * @language zh-CN
   * @description 按键自定义内容
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Custom content of the key
   * @defaultValue null
   */
  keyContent?: Position | null;
  /**
   * @language zh-CN
   * @description 上下左右方位按键内容与组件边框的距离
   * @defaultValue 18
   */
  /**
   * @language en-US
   * @description Distance between the content of each key and the border of the key
   * @defaultValue 18
   */
  offset?: number;
  /**
   * @language zh-CN
   * @description 默认按键内容中圆点的半径
   * @defaultValue 2
   */
  /**
   * @language en-US
   * @description The radius of the default dot in the key
   * @defaultValue 2
   */
  pointRadius?: number;
  /**
   * @language zh-CN
   * @description 自定义内容高度
   * @defaultValue 20
   */
  /**
   * @language en-US
   * @description Customize content height
   * @defaultValue 20
   */
  contentHeight?: number;
  /**
   * @language zh-CN
   * @description 自定义内容宽度
   * @defaultValue 50
   */
  /**
   * @language en-US
   * @description Customize content width
   * @defaultValue 50
   */
  contentWidth?: number;
}
export interface CircleHandleProps extends PositionInfo {
  /**
   * @language zh-CN
   * @description 外边框背景色
   * @defaultValue 'rgb(246, 246, 246)'
   */
  /**
   * @language en-US
   * @description Outer border background color
   * @defaultValue 'rgb(246, 246, 246)'
   */
  outBgColor?: string;
  /**
   * @language zh-CN
   * @description 按键内部样式
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description The inner style of the key
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @defaultValue null
   */
  style?: StyleProp<ViewStyle>;
  /**
   * @language zh-CN
   * @description 中心按键container样式
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Center key style
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @defaultValue null
   */
  centerStyle?: StyleProp<ViewStyle>;
  /**
   * @language zh-CN
   * @description 中心按键半径
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @defaultValue 40
   */
  /**
   * @language en-US
   * @description Center key radius
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @defaultValue 40
   */
  centerRadius?: number;
  /**
   * @language zh-CN
   * @description 中心按键文字
   * @defaultValue 'OK'
   */
  /**
   * @language en-US
   * @description Center text
   * @defaultValue 'OK'
   */
  centerText?: string;
  /**
   * @language zh-CN
   * @description 中心按键文字样式
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<TextStyle></a>
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Center text style
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<TextStyle></a>
   * @defaultValue null
   */
  centerTextStyle?: StyleProp<TextStyle>;
  /**
   * @language zh-CN
   * @description 按键激活状态
   * @defaultValue
   * {
      top: false,
      bottom: false,
      left: false,
      right: false,
      center: false,
   * }
   */
  /**
   * @language en-US
   * @description Key activation state
   * @defaultValue
   * {
      top: false,
      bottom: false,
      left: false,
      right: false,
      center: false,
   * }
   */
  status?: Position;
  /**
   * @language zh-CN
   * @description 按键长按时，是否连续重复触发
   * @defaultValue
   * {
      top: false,
      bottom: false,
      left: false,
      right: false,
      center: false,
   * }
   */
  /**
   * @language en-US
   * @description When the key is pressed for a long time, whether it is triggered continuously and repeatedly
   * @defaultValue
   * {
      top: false,
      bottom: false,
      left: false,
      right: false,
      center: false,
   * }
   */
  repeat?: Position;
  /**
   * @language zh-CN
   * @description 连续重复触发时间间隔
   * @defaultValue 300
   */
  /**
   * @language en-US
   * @description Repeated trigger intervals
   * @defaultValue 300
   */
  repeatIntervalTime?: number;
  /**
   * @language zh-CN
   * @description 提示文字
   * @defaultValue
   * {
      top: '',
      bottom: '',
      left: '',
      right: '',
      center: '',
   * }
   */
  /**
   * @language en-US
   * @description Tip words
   * @defaultValue
   * {
      top: '',
      bottom: '',
      left: '',
      right: '',
      center: '',
   * }
   */
  tip?: Position | null;
  /**
   * @language zh-CN
   * @description 提示文字样式
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<TextStyle></a>
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description The style of the tip
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<TextStyle></a>
   * @defaultValue null
   */
  tipStyle?: StyleProp<TextStyle>;
  /**
   * @language zh-CN
   * @description 按键短按触发事件
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Key short press trigger event
   * @defaultValue null
   */
  onPress?: Position | null;
  /**
   * @language zh-CN
   * @description 按键长按触发事件
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Key long press trigger event
   * @defaultValue null
   */
  onLongPress?: Position | null;
  /**
   * @language zh-CN
   * @description 默认按键内容中圆点的颜色
   * @defaultValue 2
   */
  /**
   * @language en-US
   * @description The color of the default dot in the key
   * @defaultValue 2
   */
  pointColor?: Position | string;
  /**
   * @language zh-CN
   * @description 是否展示loading效果
   * @defaultValue false
   */
  /**
   * @language en-US
   * @description Loading
   * @defaultValue false
   */
  loading?: Position;
  /**
   * @language zh-CN
   * @description 自定义loading内容
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description The content of the customized loading
   * @defaultValue null
   */
  loadingContent?: JSX.Element | Element;
}
export const CircleHandle: React.ComponentClass<CircleHandleProps>;

export interface DoubleKeyProps {
  /**
   * @language zh-CN
   * @description 圆角
   * @defaultValue 34
   */
  /**
   * @language en-US
   * @description radius
   * @defaultValue 34
   */
  radius?: number;
  /**
   * @language zh-CN
   * @description 按键内边距
   * @defaultValue 4
   */
  /**
   * @language en-US
   * @description Key padding
   * @defaultValue 4
   */
  padding?: number;
  /**
   * @language zh-CN
   * @description 高
   * @defaultValue 150
   */
  /**
   * @language en-US
   * @description height
   * @defaultValue 150
   */
  height?: number;
  /**
   * @language zh-CN
   * @description 宽
   * @defaultValue 68
   */
  /**
   * @language en-US
   * @description width
   * @defaultValue 68
   */
  width?: number;
  /**
   * @language zh-CN
   * @description 按键激活时的背景色
   * @defaultValue 'rgb(255,255,255)'
   */
  /**
   * @language en-US
   * @description The background color when the key is active
   * @defaultValue 'rgb(255,255,255)'
   */
  bgColor?: string[] | string;
  /**
   * @language zh-CN
   * @description 按键按下后的背景色
   * @defaultValue 'rgb(250,250,250)'
   */
  /**
   * @language en-US
   * @description The background color after the key is pressed
   * @defaultValue 'rgb(250,250,250)'
   */
  activeBgColor?: string[] | string;
  /**
   * @language zh-CN
   * @description 按键未激活时的背景色
   * @defaultValue 'rgb(250,250,250)'
   */
  /**
   * @language en-US
   * @description The background color when the key is not active
   * @defaultValue 'rgb(250,250,250)'
   */
  disabledBgColor?: string[] | string;
  /**
   * @language zh-CN
   * @description 按键激活时的内容颜色
   * @defaultValue 'rgba(122,123,136,1)'
   */
  /**
   * @language en-US
   * @description The color of the content when the key is active
   * @defaultValue 'rgba(122,123,136,1)'
   */
  contentColor?: string[] | string;
  /**
   * @language zh-CN
   * @description 按键未激活时的内容颜色
   * @defaultValue 'rgba(122,123,136,0.5)'
   */
  /**
   * @language en-US
   * @description The content color when the key is not active
   * @defaultValue 'rgba(122,123,136,0.5)'
   */
  disabledContentColor?: string[] | string;
  /**
   * @language zh-CN
   * @description 按键短按触发事件
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Key short press trigger event
   * @defaultValue null
   */
  onPress?: Array<() => any> | null[] | null;
  /**
   * @language zh-CN
   * @description 按键长按触发事件
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Key long press trigger event
   * @defaultValue null
   */
  onLongPress?: Array<() => any> | null[] | null;
  /**
   * @language zh-CN
   * @description 按键外部样式
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description The outer style of the key
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @defaultValue null
   */
  outStyle?: StyleProp<ViewStyle>;
  /**
   * @language zh-CN
   * @description 外边框背景色
   * @defaultValue 'rgb(246, 246, 246)'
   */
  /**
   * @language en-US
   * @description Outer border background color
   * @defaultValue 'rgb(246, 246, 246)'
   */
  outBgColor?: string;
  /**
   * @language zh-CN
   * @description 提示文字样式
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<TextStyle></a>
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description The style of the tip
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<TextStyle></a>
   * @defaultValue null
   */
  tipStyle?: StyleProp<TextStyle>;
  /**
   * @language zh-CN
   * @description 提示文字
   * @defaultValue ''
   */
  /**
   * @language en-US
   * @description Tip words
   * @defaultValue ''
   */
  tip?: string;
  /**
   * @language zh-CN
   * @description 按键激活状态
   * @defaultValue false
   */
  /**
   * @language en-US
   * @description Key activation state
   * @defaultValue false
   */
  status?: boolean[] | boolean;
  /**
   * @language zh-CN
   * @description 按键长按时，是否连续重复触发
   * @defaultValue false
   */
  /**
   * @language en-US
   * @description When the key is pressed for a long time, whether it is triggered continuously and repeatedly
   * @defaultValue false
   */
  repeat?: boolean[] | boolean;
  /**
   * @language zh-CN
   * @description 连续重复触发时间间隔
   * @defaultValue 300
   */
  /**
   * @language en-US
   * @description Repeated trigger intervals
   * @defaultValue 300
   */
  repeatIntervalTime?: number;
  /**
   * @language zh-CN
   * @description Icon path
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Icon path
   * @defaultValue null
   */
  icon?: string[] | null[];
  /**
   * @language zh-CN
   * @description 图片样式
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ImageStyle></a>
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Image style
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ImageStyle></a>
   * @defaultValue null
   */
  img?: ImageSourcePropType[] | null[];
  /**
   * @language zh-CN
   * @description 图片样式
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ImageStyle></a>
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Image style
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ImageStyle></a>
   * @defaultValue null
   */
  imgStyle?: StyleProp<ImageStyle>;
  /**
   * @language zh-CN
   * @description icon尺寸大小
   * @defaultValue 20
   */
  /**
   * @language en-US
   * @description Icon size
   * @defaultValue 20
   */
  iconSize?: number;
  /**
   * 组件显示方式：水平和垂直
   */
  /**
   * @language zh-CN
   * @description 组件显示方式：水平和垂直
   * @defaultValue 'vertical'
   */
  /**
   * @language en-US
   * @description Component display mode: horizontal and vertical
   * @defaultValue 'vertical'
   */
  type?: 'horizontal' | 'vertical';
  /**
   * @language zh-CN
   * @description 按键显示文字
   * @defaultValue ''
   */
  /**
   * @language en-US
   * @description Key text
   * @defaultValue '
   */
  text?: string[];
  /**
   * @language zh-CN
   * @description 按键显示文字样式
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<TextStyle></a>
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Text style
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<TextStyle></a>
   * @defaultValue null
   */
  textStyle?: StyleProp<TextStyle>;
  /**
   * @language zh-CN
   * @description 基础组件IconFont的useART属性
   * @defaultValue false
   */
  /**
   * @language en-US
   * @description The useART property of the based component IconFont
   * @defaultValue false
   */
  useART?: boolean[] | boolean;
  /**
   * @language zh-CN
   * @description 是否展示loading效果
   * @defaultValue false
   */
  /**
   * @language en-US
   * @description Loading
   * @defaultValue false
   */
  loading?: boolean[];
  /**
   * @language zh-CN
   * @description 自定义loading内容
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description The content of the customized loading
   * @defaultValue null
   */
  loadingContent?: JSX.Element | Element;
}
export const DoubleKey: React.ComponentClass<DoubleKeyProps>;

export interface CurtainsAnimateProps {
  /**
   * @language zh-CN
   * @description 组件样式
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Component style?
   * @defaultValue null
   */
  style?: StyleProp<ViewStyle>;
  /**
   * @language zh-CN
   * @description 窗帘宽度
   * @defaultValue 280
   */
  /**
   * @language en-US
   * @description Curtains width?
   * @defaultValue 280
   */
  width?: number;
  /**
   * @language zh-CN
   * @description 窗帘高度
   * @defaultValue 280
   */
  /**
   * @language en-US
   * @description Curtains height?
   * @defaultValue 280
   */
  height?: number;
  /**
   * @language zh-CN
   * @description 初始开合百分比，值0~1
   * @defaultValue 0.3
   */
  /**
   * @language en-US
   * @description Initial opening and closing percentage, value 0 ~ 1
   * @defaultValue 0.3
   */
  initPercent?: number;
  /**
   * @language zh-CN
   * @description 滑动按钮宽度
   * @defaultValue 40
   */
  /**
   * @language en-US
   * @description Slide button width
   * @defaultValue 40
   */
  buttonWidth?: number;
  /**
   * @language zh-CN
   * @description 动画总时间，以秒为单位
   * @defaultValue 8
   */
  /**
   * @language en-US
   * @description Total animation time in seconds
   * @defaultValue 8
   */
  animateTime?: number;
  /**
   * @language zh-CN
   * @description 动画状态，共三种：'close'，'open'，'pause'
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description There are three animation states: 'close', 'open', 'pause'
   * @defaultValue null
   */
  type?: AnimateType | null;
  /**
   * @language zh-CN
   * @description 窗帘位置
   * @defaultValue {
      top: cx(15),
      left: cx(8),
    },
   */
  /**
   * @language en-US
   * @description Curtain position
   * @defaultValue {
      top: cx(15),
      left: cx(8),
    },
   */
  curtainsPosition?: CurtainsPosition;
  /**
   * @language zh-CN
   * @description 手势滑动释放执行回调
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Gesture sliding release execution callback
   * @defaultValue null
   */
  onChange?: (type: AnimateType, percent: number) => void;
  /**
   * @language zh-CN
   * @description 手势滑动执行回调
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Gesture sliding execution callback
   * @defaultValue null
   */
  onMove?: (percent: number) => void;
  /**
   * @language zh-CN
   * @description 窗帘卷轴图片
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Curtain scroll picture
   * @defaultValue null
   */
  rollerImage?: number;
  /**
   * @language zh-CN
   * @description 窗帘卷轴View样式
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Curtain scroll style
   * @defaultValue null
   */
  rollerStyle?: StyleProp<ViewStyle>;
  /**
   * @language zh-CN
   * @description 窗帘卷轴Image样式
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Curtain scroll image style
   * @defaultValue null
   */
  rollerImageStyle?: StyleProp<ImageStyle>;
  /**
   * @language zh-CN
   * @description 滑动按钮图片
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Slide button picture
   * @defaultValue null
   */
  buttonImage?: number;
  /**
   * @language zh-CN
   * @description 滑动按钮View样式
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Slide button style
   * @defaultValue null
   */
  buttonStyle?: StyleProp<ViewStyle>;
  /**
   * @language zh-CN
   * @description 滑动按钮Image样式
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Slide button image style
   * @defaultValue null
   */
  buttonImageStyle?: StyleProp<ImageStyle>;
  /**
   * @language zh-CN
   * @description 滑动按钮位置误差
   * @defaultValue 0
   */
  /**
   * @language en-US
   * @description Position error of sliding button
   * @defaultValue 0
   */
  buttonPositionErrorValue?: number;
  /**
   * @language zh-CN
   * @description 窗帘左帘图片
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Curtain left curtain picture
   * @defaultValue null
   */
  curtainsLeftImage?: number;
  /**
   * @language zh-CN
   * @description 窗帘右帘图片
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Curtain right curtain picture
   * @defaultValue null
   */
  curtainsRightImage?: number;
  /**
   * @language zh-CN
   * @description 窗帘View样式
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Curtain view style
   * @defaultValue null
   */
  curtainsStyle?: StyleProp<ViewStyle>;
  /**
   * @language zh-CN
   * @description 窗帘Image样式
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Curtain image style
   * @defaultValue null
   */
  curtainsImageStyle?: StyleProp<ImageStyle>;
}
export const CurtainsAnimate: React.ComponentClass<CurtainsAnimateProps>;
export interface RollerAnimate {
  /**
   * @language zh-CN
   * @description 组件样式
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Component style
   * @defaultValue null
   */
  style: StyleProp<ViewStyle>;
  /**
   * @language zh-CN
   * @description 卷帘宽度
   * @defaultValue 250
   */
  /**
   * @language en-US
   * @description Roller blind width
   * @defaultValue 250
   */
  width: number;
  /**
   * @language zh-CN
   * @description 卷帘高度
   * @defaultValue 280
   */
  /**
   * @language en-US
   * @description Roller blind height
   * @defaultValue 280
   */
  height: number;
  /**
   * @language zh-CN
   * @description 初始位置百分比，值0~1
   * @defaultValue 0.5
   */
  /**
   * @language en-US
   * @description Percentage of initial position, value 0~1
   * @defaultValue 0.5
   */
  initPercent: number;
  /**
   * @language zh-CN
   * @description 滑动按钮宽度
   * @defaultValue 40
   */
  /**
   * @language en-US
   * @description Slide button width
   * @defaultValue 40
   */
  buttonWidth: number;
  /**
   * @language zh-CN
   * @description 动画状态，共三种：'close'，'open'，'pause'
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description There are three animation states: 'close', 'open', 'pause'
   * @defaultValue null
   */
  type: AnimateType;
  /**
   * @language zh-CN
   * @description 卷帘位置
   * @defaultValue {top: cx(26),left: cx(20)}
   */
  /**
   * @language en-US
   * @description Roller blind position
   * @defaultValue {top: cx(26),left: cx(20)}
   */
  rollerPosition: RollerPosition;
  /**
   * @language zh-CN
   * @description 动画总时间，以秒为单位
   * @defaultValue 8
   */
  /**
   * @language en-US
   * @description Total animation time in seconds
   * @defaultValue 8
   */
  animateTime: number;
  /**
   * @language zh-CN
   * @description 卷帘背景图片
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Shutter background image
   * @defaultValue null
   */
  bgImage: number;
  /**
   * @language zh-CN
   * @description 卷帘背景图片样式
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Shutter background picture style
   * @defaultValue null
   */
  bgImageStyle: StyleProp<ImageStyle>;
  /**
   * @language zh-CN
   * @description 窗帘卷轴图片
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Curtain reel pictures
   * @defaultValue null
   */
  rollerImage: number;
  /**
   * @language zh-CN
   * @description 窗帘卷轴View样式
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Curtain reel view style
   * @defaultValue null
   */
  rollerStyle: StyleProp<ViewStyle>;
  /**
   * @language zh-CN
   * @description 窗帘卷轴Image样式
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Curtain reel Image style
   * @defaultValue null
   */
  rollerImageStyle: StyleProp<ImageStyle>;
  /**
   * @language zh-CN
   * @description 滑动按钮图片
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Slide button image
   * @defaultValue null
   */
  buttonImage: number;
  /**
   * @language zh-CN
   * @description 滑动按钮View样式
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Slide button view style
   * @defaultValue null
   */
  buttonStyle: StyleProp<ViewStyle>;
  /**
   * @language zh-CN
   * @description 滑动按钮Image样式
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Slide button Image style
   * @defaultValue null
   */
  buttonImageStyle: StyleProp<ImageStyle>;
  /**
   * @language zh-CN
   * @description 动画状态执行回调
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Animation state execution callback
   * @defaultValue null
   */
  onChange: (type: AnimateType) => void;
}
export const Roller: React.ComponentClass<RollerAnimate>;
export interface PusherAnimate {
  /**
   * @language zh-CN
   * @description 组件样式
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Component style
   * @defaultValue null
   */
  style: StyleProp<ViewStyle>;
  /**
   * @language zh-CN
   * @description 推窗器边框宽度
   * @defaultValue 250
   */
  /**
   * @language en-US
   * @description Push window frame width
   * @defaultValue 250
   */
  width: number;
  /**
   * @language zh-CN
   * @description 推窗器边框高度
   * @defaultValue 280
   */
  /**
   * @language en-US
   * @description Push window frame heigt
   * @defaultValue 280
   */
  height: number;
  /**
   * @language zh-CN
   * @description 窗户宽度
   * @defaultValue 230
   */
  /**
   * @language en-US
   * @description Window width
   * @defaultValue 230
   */
  windowWidth: number;
  /**
   * @language zh-CN
   * @description 窗户高度
   * @defaultValue 257
   */
  /**
   * @language en-US
   * @description Window height
   * @defaultValue 257
   */
  windowHeight: number;
  /**
   * @language zh-CN
   * @description 支撑杆与窗户底部高度差
   * @defaultValue 0
   */
  /**
   * @language en-US
   * @description The height difference between the support rod and the bottom of the window
   * @defaultValue 0
   */
  studdleOffset: number;
  /**
   * @language zh-CN
   * @description 支撑杆主杆图片
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Support pole main pole picture
   * @defaultValue null
   */
  rodBottom: number;
  /**
   * @language zh-CN
   * @description 支撑杆顶部图片
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Picture of the top of the support rod
   * @defaultValue null
   */
  rodTop: number;
  /**
   * @language zh-CN
   * @description 窗户打开的最大最小角度,范围:0-90
   * @defaultValue [0,30]
   */
  /**
   * @language en-US
   * @description The maximum and minimum angle of window opening, range: 0-90
   * @defaultValue [0,30]
   */
  range: number[];
  /**
   * @language zh-CN
   * @description 动画状态，共三种：'close'，'open'，'pause'
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description There are three animation states: 'close', 'open', 'pause'
   * @defaultValue null
   */
  type: AnimateType;
  /**
   * @language zh-CN
   * @description 窗户边框图片
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Window frame picture
   * @defaultValue null
   */
  borderImage: number;
  /**
   * @language zh-CN
   * @description 窗户边框图片样式
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Window border picture style
   * @defaultValue null
   */
  borderImageStyle: StyleProp<ImageStyle>;
  /**
   * @language zh-CN
   * @description 窗户图片
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Window picture
   * @defaultValue null
   */
  windowImage: number;
  /**
   * @language zh-CN
   * @description 窗户图片样式
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Window picture style
   * @defaultValue null
   */
  windowImageStyle: StyleProp<ImageStyle>;
}
export const Pusher: React.ComponentClass<PusherAnimate>;

export const LightAnimate: React.ComponentClass<LightAnimateProps>;

export interface LightAnimateProps {
  /**
   * @language zh-CN
   * @description 灯光类型
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description light type
   * @defaultValue null
   */
  type?: string;
  /**
   * @language zh-CN
   * @description 灯图片
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description light picture
   * @defaultValue null
   */
  lightImg?: number;
  /**
   * @language zh-CN
   * @description 渐变背景高度
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description gradient height
   * @defaultValue null
   */
  gradientHeight?: number;
  /**
   * @language zh-CN
   * @description 渐变背景宽度
   * @defaultValue cx(240)
   */
  /**
   * @language en-US
   * @description gradient width
   * @defaultValue cx(240)
   */
  gradientWidth?: number;
  /**
   * @language zh-CN
   * @description 组件样式
   * @defaultValue screenWidth
   */
  /**
   * @language en-US
   * @description Component style
   * @defaultValue screenWidth
   */
  style?: ViewProps;
  /**
   * @language zh-CN
   * @description 灯图片样式
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Light picture style
   * @defaultValue null
   */
  lightImgStyle?: StyleProp<ImageStyle>;
  /**
   * @language zh-CN
   * @description 动画持续时间
   * @defaultValue 1200
   */
  /**
   * @language en-US
   * @description animate duration
   * @defaultValue 1200
   */
  duration?: number;
  /**
   * @language zh-CN
   * @description 颜色配置
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description color config
   * @defaultValue null
   */
  config?: LooseObj;
  /**
   * @language zh-CN
   * @description 动画结束回掉
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description animate ending callback
   * @defaultValue null
   */
  onRelease?: () => any;
}
