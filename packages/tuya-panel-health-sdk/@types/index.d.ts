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

// SliderRuler 滚动刻度尺
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
   * @description 标题
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description title
   * @defaultValue null
   */
  title?: string;
  /**
   * @language zh-CN
   * @description 短刻度的高度
   * @defaultValue 32
   */
  /**
   * @language en-US
   * @description Height of short scale
   * @defaultValue 32
   */
  scaleShortHeight?: number;
  /**
   * @language zh-CN
   * @description 中等刻度的高度
   * @defaultValue 37
   */
  /**
   * @language en-US
   * @description Height of middle scale
   * @defaultValue 37
   */
  scaleMiddleHeight?: number;
  /**
   * @language zh-CN
   * @description 长刻度的高度
   * @defaultValue 46
   */
  /**
   * @language en-US
   * @description Height of short scale
   * @defaultValue 100
   */
  scaleLongHeight?: number;
  /**
   * @language zh-CN
   * @description 刻度的颜色
   * @defaultValue () => {}
   */
  /**
   * @language en-US
   * @description scal color
   * @defaultValue () => {}
   */
  scaleColor?: ColorValue;
  /**
   * @language zh-CN
   * @description 标题样式
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Title style
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @defaultValue null
   */
  titleStyle?: StyleProp<ViewStyle>;
  /**
   * @language zh-CN
   * @description value样式
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description value style
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @defaultValue null
   */
  valueStyle?: StyleProp<ViewStyle>;
  /**
   * @language zh-CN
   * @description 刻度点样式
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description pointer style
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @defaultValue null
   */
  pointerStyle?: StyleProp<ViewStyle>;
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
  onChange?: (v: number | string) => void;
  /**
   * @language zh-CN
   * @description 格式化当前值
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description format value
   * @defaultValue null
   */
  formatValue?: (v: number) => number | string;
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
