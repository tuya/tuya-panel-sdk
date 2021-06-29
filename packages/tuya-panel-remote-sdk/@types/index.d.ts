import * as React from 'react';
import { StyleProp, ViewStyle, ImageStyle } from 'react-native';

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
  pointColor?: string;
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
