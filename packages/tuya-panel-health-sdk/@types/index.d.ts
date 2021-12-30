import * as React from 'react';
import { StyleProp, ViewStyle, ColorValue } from 'react-native';

// progess
export interface ProgessProps {
  /**
   * @language zh-CN
   * @description 进度环大小
   * @defaultValue 100
   */
  /**
   * @language en-US
   * @description Progress ring size
   * @defaultValue 100
   */
  size?: number;
  /**
   * @language zh-CN
   * @description 所占百分比
   * @defaultValue 0
   */
  /**
   * @language en-US
   * @description Percentage
   * @defaultValue 0
   */
  percent?: number;
  /**
   * @language zh-CN
   * @description 进度环的颜色
   * @defaultValue #56C0FF
   */
  /**
   * @language en-US
   * @description The color of the progress ring
   * @defaultValue #56C0FF
   */
  color?: ColorValue;
  /**
   * @language zh-CN
   * @description 底层环的背景色
   * @defaultValue #EEF8FF
   */
  /**
   * @language en-US
   * @description The background color of the bottom ring
   * @defaultValue #EEF8FF
   */
  backgroundColor?: ColorValue;
  /**
   * @language zh-CN
   * @description 自定义中间区域文本渲染函数
   * @defaultValue (percent: number) => <TYText style={styles.progressCircleText}>{percent}%</TYText>
   */
  /**
   * @language en-US
   * @description Number of ripples at a time
   * @defaultValue (percent: number) => <TYText style={styles.progressCircleText}>{percent}%</TYText>
   */
  textRender?: (percent: number) => ReactNode;
}

export class Progess extends React.Component<ProgessProps> {}

// BarPercentProps

export interface Data {
  /**
   * @language zh-CN
   * @description 当前项所占的值， 比如在睡眠中深睡时长
   * @defaultValue 0
   */
  /**
   * @language en-US
   * @description The value of the current item, such as the length of deep sleep during sleep
   * @defaultValue 0
   */
  value: number;
  /**
   * @language zh-CN
   * @description 当前项的描述，比如深睡
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description The description of the current item, such as deep sleep
   * @defaultValue null
   */
  label: string;
  /**
   * @language zh-CN
   * @description 当前项的key， 比如Deep深睡
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description The description of the current item, such as deep sleep
   * @defaultValue null
   */
  key?: string;
  /**
   * @language zh-CN
   * @description 当前项的颜色，比如分配比等
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description The color of the current item, such as distribution ratio, etc.
   * @defaultValue null
   */
  color?: string;
}

export interface BarPercentProps {
  /**
   * @language zh-CN
   * @description 百分比bar数据源
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Percentage bar data source
   * @defaultValue null
   */
  data?: Data[];
  /**
   * @language zh-CN
   * @description 按钮样式
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Button style
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @defaultValue null
   */
  style?: StyleProp<ViewStyle>;
}

export class BarPercent extends React.Component<BarPercentProps> {}

// ScaleSlider 滚动刻度尺
export interface SliderRulerProps {
  /**
   * @language zh-CN
   * @description 刻度最小值
   * @defaultValue 0
   */
  /**
   * @language en-US
   * @description Scale minimum
   * @defaultValue 0
   */
  min?: number;
  /**
   * @language zh-CN
   * @description 刻度最小值
   * @defaultValue 100
   */
  /**
   * @language en-US
   * @description Scale max
   * @defaultValue 100
   */
  max?: number;
  /**
   * @language zh-CN
   * @description 当前刻度值
   * @defaultValue 0
   */
  /**
   * @language en-US
   * @description Current scale value
   * @defaultValue 0
   */
  value?: number;
  /**
   * @language zh-CN
   * @description 默认值
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description defaultValue
   * @defaultValue null
   */
  defaultValue?: string;
  /**
   * @language zh-CN
   * @description 刻度以及point颜色
   * @defaultValue () => {}
   */
  /**
   * @language en-US
   * @description Scale and point color
   * @defaultValue () => {}
   */
  color?: ColorValue;
  /**
   * @language zh-CN
   * @description 滑动完成后的回调
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Callback for completion of sliding
   * @defaultValue null
   */
  onChange?: (v: number) => void;
  /**
   * @language zh-CN
   * @description 滑动完成的回调
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Slide completed
   * @defaultValue null
   */
  onRelease?: (v: number) => void;
  /**
   * @language zh-CN
   * @description 刻度的宽
   * @defaultValue 375
   */
  /**
   * @language en-US
   * @description The width of the scale
   * @defaultValue 375
   */
  width?: number;
}

export class UnLockButton extends React.Component<UnLockButtonProps> {}

// UnLockButton
export interface UnLockButtonProps {
  /**
   * @language zh-CN
   * @description 长按的时长，单位秒
   * @defaultValue 1500
   */
  /**
   * @language en-US
   * @description Long press time, in seconds
   * @defaultValue 1500
   */
  delayLongPress?: boolean;
  /**
   * @language zh-CN
   * @description 按钮的大小
   * @defaultValue 90
   */
  /**
   * @language en-US
   * @description Button size
   * @defaultValue 90
   */
  size?: number;
  /**
   * @language zh-CN
   * @description 按钮背景颜色
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description backgroundColor
   * @defaultValue null
   */
  backgroundColor?: ColorValue;
  /**
   * @language zh-CN
   * @description 进度环的颜色
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description The color of the progress ring
   * @defaultValue null
   */
  color?: ColorValue;
  /**
   * @language zh-CN
   * @description 进度环大小
   * @defaultValue 100
   */
  /**
   * @language en-US
   * @description The size of the progress ring
   * @defaultValue 100
   */
  progressRingSize?: number;
  /**
   * @language zh-CN
   * @description 长按结束后的回调
   * @defaultValue () => {}
   */
  /**
   * @language en-US
   * @description Callback after long press
   * @defaultValue () => {}
   */
  onEnd?: () => void;
  /**
   * @language zh-CN
   * @description 按钮样式
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Button style
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @defaultValue null
   */
  style?: StyleProp<ViewStyle>;
}

export class UnLockButton extends React.Component<UnLockButtonProps> {}

// breatheView

export interface BreatheViewProps {
  /**
   * @language zh-CN
   * @description 是否开启旋转动画
   * @defaultValue false
   */
  /**
   * @language en-US
   * @description Whether to turn on the rotation animation
   * @defaultValue false
   */
  active?: boolean;
  /**
   * @language zh-CN
   * @description 呼吸一轮的时间, 单位是ms
   * @defaultValue 1500
   */
  /**
   * @language en-US
   * @description The time of one breath, the unit is ms
   * @defaultValue 1500
   */
  duration?: number;
  /**
   * @language zh-CN
   * @description 是否使用原生动画驱动, 一般在安卓低端机上会比较有用
   * @defaultValue true
   */
  /**
   * @language en-US
   * @description Whether to use native animation driver, generally it will be more useful on Android low-end machines
   * @defaultValue true
   */
  useNativeDriver?: boolean;
  /**
   * @language zh-CN
   * @description 是否使用原生动画驱动, 一般在安卓低端机上会比较有用
   * @defaultValue false
   */
  /**
   * @language en-US
   * @description The background color of the bottom ring
   * @defaultValue false
   */
  isInteraction?: boolean;
  /**
   * @language zh-CN
   * @description 按钮样式
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Button style
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @defaultValue null
   */
  style?: StyleProp<ViewStyle>;
}

export class BreatheView extends React.Component<BreatheViewProps> {}

// rotateView
export interface RotateViewProps {
  /**
   * @language zh-CN
   * @description 是否开启旋转动画
   * @defaultValue false
   */
  /**
   * @language en-US
   * @description Whether to turn on the rotation animation
   * @defaultValue false
   */
  active?: boolean;
  /**
   * @language zh-CN
   * @description 旋转一轮的时间, 单位是ms
   * @defaultValue 4500
   */
  /**
   * @language en-US
   * @description The time of one breath, the unit is ms
   * @defaultValue 4500
   */
  duration?: number;
  /**
   * @language zh-CN
   * @description 是否使用原生动画驱动, 一般在安卓低端机上会比较有用
   * @defaultValue true
   */
  /**
   * @language en-US
   * @description Whether to use native animation driver, generally it will be more useful on Android low-end machines
   * @defaultValue true
   */
  useNativeDriver?: boolean;
  /**
   * @language zh-CN
   * @description 是否使用原生动画驱动, 一般在安卓低端机上会比较有用
   * @defaultValue false
   */
  /**
   * @language en-US
   * @description The background color of the bottom ring
   * @defaultValue false
   */
  isInteraction?: boolean;
  /**
   * @language zh-CN
   * @description 按钮样式
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Button style
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @defaultValue null
   */
  style?: StyleProp<ViewStyle>;
}

export class RotateView extends React.Component<RotateViewProps> {}

