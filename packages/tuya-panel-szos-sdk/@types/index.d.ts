import React, { ReactNode } from 'react';
import { ViewStyle } from 'react-native';

declare module '@tuya/tuya-panel-szos-sdk' {
  export interface SoundWaveProps {
    /**
     * @language zh-CN
     * @description 区域宽度
     * @defaultValue 310
     */
    /**
     * @language en-US
     * @description Scope width
     * @defaultValue 310
     */
    width?: number;
    /**
     * @language zh-CN
     * @description 区域高度
     * @defaultValue 212
     */
    /**
     * @language en-US
     * @description Scope height
     * @defaultValue 212
     */
    height?: number;
    /**
     * @language zh-CN
     * @description 柱子总数
     * @defaultValue 62
     */
    /**
     * @language en-US
     * @description Bar count
     * @defaultValue 62
     */
    barCount?: number;
    /**
     * @language zh-CN
     * @description 区域样式
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description Scope style
     * @defaultValue null
     */
    style?: ViewStyle;
    /**
     * @language zh-CN
     * @description 柱子初始高度
     * @defaultValue 16
     */
    /**
     * @language en-US
     * @description Bar initial height
     * @defaultValue 16
     */
    barInitHeight?: number;
    /**
     * @language zh-CN
     * @description 柱子宽度
     * @defaultValue 2
     */
    /**
     * @language en-US
     * @description Bar width
     * @defaultValue 2
     */
    barWidth?: number;

    /**
     * @language zh-CN
     * @description 柱子颜色
     * @defaultValue '#534B72'
     */
    /**
     * @language en-US
     * @description Bar color
     * @defaultValue '#534B72'
     */
    barColor?: string;

    /**
     * @language zh-CN
     * @description 动画变化一个周期时间
     * @defaultValue 150
     */
    /**
     * @language en-US
     * @description Animation change duration
     * @defaultValue 150
     */
    duration?: number;

    /**
     * @language zh-CN
     * @description 控制动画是否启动
     * @defaultValue true
     */
    /**
     * @language en-US
     * @description Control whether the animation starts
     * @defaultValue true
     */
    start?: boolean;

    /**
     * @language zh-CN
     * @description 数据控制动画变化，数据区间为0～1
     * @defaultValue []
     */
    /**
     * @language en-US
     * @description The data controls the animation change, and the data range is 0 ~ 1
     * @defaultValue []
     */
    data?: number[];
  }
  export interface StreeringWheelProps {
    /**
     * @language zh-CN
     * @description 旋转角度事件
     * @defaultValue (rotate, direction) => {}
     */
    /**
     * @language en-US
     * @description Rotate Function
     * @defaultValue (rotate, direction) => {}
     */
    changeRotate: (rotate: number, direction: string) => void;
    /**
     * @language zh-CN
     * @description PanGestureHandler的Ref
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description PanGestureHandler' Ref
     * @defaultValue null
     */
    driveRef: MutableRefObject<null>;
    /**
     * @language zh-CN
     * @description 最外层样式
     * @defaultValue {width: cx(167), height: cx(167)}
     */
    /**
     * @language en-US
     * @description base style
     * @defaultValue {width: cx(167), height: cx(167)}
     */
    wheelStyle?: StyleProp<ViewStyle>;
    /**
     * @language zh-CN
     * @description 插入PanGestureHandler的旋转内部元素
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description rotate view inner node
     * @defaultValue null
     */
    childrenProps?: React.ReactNode;
    /**
     * @language zh-CN
     * @description 父元素相对于屏幕左边的偏移量
     * @defaultValue 0
     */
    /**
     * @language en-US
     * @description The offset of the parent element from the left side of the screen
     * @defaultValue null
     */
    leftPart?: number;
    /**
     * @language zh-CN
     * @description 父元素相对于屏幕顶部的偏移量
     * @defaultValue 0
     */
    /**
     * @language en-US
     * @description The offset of the parent element from the top of the screen
     * @defaultValue null
     */
    topPart?: number;
  }
  export const SoundWave: React.ComponentClass<SoundWaveProps>;
  export const StreeringWheel: React.ComponentClass<StreeringWheelProps>;
}
