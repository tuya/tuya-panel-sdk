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
  export const SoundWave: React.ComponentClass<SoundWaveProps>;
}
