import * as React from 'react';
import {
  StyleProp,
  Animated,
  PanResponderGestureState,
  GestureResponderEvent,
  ViewStyle,
  ColorPropType,
  ImageStyle,
} from 'react-native';
declare module '@tuya-smart/tuya-panel-electrician-sdk' {
  export interface CountdownProps {
    /**
     * @language zh-CN
     * @description dp点标识符
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description DP dot identifier
     * @defaultValue null
     */
    dpCode: string;
    /**
     * @language zh-CN
     * @description 倒计时当前值
     * @defaultValue 0
     */
    /**
     * @language en-US
     * @description Countdown Current Value
     * @defaultValue 0
     */
    value: number;
    /**
     * @language zh-CN
     * @description 是否模拟时钟
     * @defaultValue false
     */
    /**
     * @language en-US
     * @description Analog clock or not
     * @defaultValue false
     */
    counting: boolean;
    /**
     * @language zh-CN
     * @description 倒计时可支持到最大单位
     * @defaultValue ''
     */
    /**
     * @language en-US
     * @description Countdown supports up to maximum units
     * @defaultValue ''
     */
    timeUnit: string;
    /**
     * @language zh-CN
     * @description 计数展示格式
     * @defaultValue 0
     */
    /**
     * @language en-US
     * @description Counting display format
     * @defaultValue 0
     */
    formatString: string = `{0}:{1}:{2}`;
    /**
     * @language zh-CN
     * @description 倒计时文案样式
     * @defaultValue 0
     */
    /**
     * @language en-US
     * @description Countdown copy style
     * @defaultValue 0
     */
    countdownTextStyle: any;
  }

  export class CountdownView extends React.Component<DrawerProps> {}
}
