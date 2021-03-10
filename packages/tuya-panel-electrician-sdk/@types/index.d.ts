import * as React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
declare module '@tuya/tuya-panel-electrician-sdk' {
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

  export class CountdownView extends React.Component<CountdownProps> {}

  type TimeUnitType = 's' | 'min' | 'hour';
  type CountdownType = 'm' | 'hm';
  export interface CountdownListProps {
    /**
     * @language zh-CN
     * @description dp标识符集
     * @defaultValue []
     */
    /**
     * @language en-US
     * @description Set of DP identifiers
     * @defaultValue []
     */
    dpCodes: string[];
    /**
     * @language zh-CN
     * @description 时间单位
     * @defaultValue hour
     */
    /**
     * @language en-US
     * @description Unit of time
     * @defaultValue hour
     */
    timeUnit: Omit<TimeUnitType, 'hour'>;
    /**
     * @language zh-CN
     * @description 倒计时数据最小单位
     * @defaultValue m
     */
    /**
     * @language en-US
     * @description Minimal unit of countdown data
     * @defaultValue m
     */
    countdownType: CountdownType;
  }

  export class CountdownList extends React.Component<CountdownListProps> {}

  export interface SocketViewProps {
    /**
     * @language zh-CN
     * @description 插座按钮样式
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description Socket button style
     * @defaultValue null
     */
    socketWrapperStyle: StyleProp<ViewStyle>;
    /**
     * @language zh-CN
     * @description 插座按钮图标
     * @defaultValue 'http://images.tuyacn.com/smart/panelos/common/imgs/1588928982565_dc-bg@3x.png'
     */
    /**
     * @language en-US
     * @description Socket button icon
     * @defaultValue 'http://images.tuyacn.com/smart/panelos/common/imgs/1588928982565_dc-bg@3x.png'
     */
    socketBackgroundImage:
      | string
      | number = 'http://images.tuyacn.com/smart/panelos/common/imgs/1588928982565_dc-bg@3x.png';
    /**
     * @language zh-CN
     * @description 插座按钮图标大小
     * @defaultValue { width: 240, height: 240 }
     */
    /**
     * @language en-US
     * @description Socket button icon size
     * @defaultValue { width: 240, height: 240 }
     */
    socketBackgroundImageSize: { [key: string]: number } = { width: 240, height: 240 };
    /**
     * @language zh-CN
     * @description 插座图标
     * @defaultValue 'http://images.tuyacn.com/smart/panelos/common/imgs/1588929002104_dc-ck-1@3x.png'
     */
    /**
     * @language en-US
     * @description Socket button icon
     * @defaultValue 'http://images.tuyacn.com/smart/panelos/common/imgs/1588929002104_dc-ck-1@3x.png'
     */
    socketImage:
      | string
      | number = 'http://images.tuyacn.com/smart/panelos/common/imgs/1588929002104_dc-ck-1@3x.png';
    /**
     * @language zh-CN
     * @description 插座图标大小
     * @defaultValue { width: 140, height: 140 }
     */
    /**
     * @language en-US
     * @description Socket icon size
     * @defaultValue { width: 140, height: 140 }
     */
    socketImageSize: { [key: string]: number } = { width: 140, height: 140 };
    /**
     * @language zh-CN
     * @description 插座图标颜色
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description Color of socket icon
     * @defaultValue null
     */
    socketImageTintColor: string;
    /**
     * @language zh-CN
     * @description 按钮回调
     * @defaultValue () => {}
     */
    /**
     * @language en-US
     * @description Button callback
     * @defaultValue () => {}
     */
    onPress: () => void;
  }

  export class SocketView extends React.Component<SocketViewProps> {}
}
