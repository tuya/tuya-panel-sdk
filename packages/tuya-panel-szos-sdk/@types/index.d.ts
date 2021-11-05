import React from 'react';
import { ImageSourcePropType, StyleProp, ViewStyle } from 'react-native';

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
     * @defaultValue (rotate) => {}
     */
    /**
     * @language en-US
     * @description Rotate Function
     * @defaultValue (rotate) => {}
     */
    changeRotate: (rotate: number) => void;
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
     * @description 左转最大角度
     * @defaultValue 90
     */
    /**
     * @language en-US
     * @description left max angle
     * @defaultValue 90
     */
    maxLeftAng?: number;
    /**
     * @language zh-CN
     * @description 右转最大角度
     * @defaultValue 90
     */
    /**
     * @language en-US
     * @description left max angle
     * @defaultValue 90
     */
    maxRightAng?: number;
    /**
     * @language zh-CN
     * @description 插入PanGestureHandler的旋转内部元素
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description inner node
     * @defaultValue null
     */
    childrenProps?: React.ReactNode;
  }

  export interface SimpleVerticalSliderProps {
    /**
     * @language zh-CN
     * @description 样式
     * @defaultValue null
     */
    /**
     * @language en-US
     * @description  style
     * @defaultValue null
     */
    style?: ViewStyle;
    /**
     * @language zh-CN
     * @description 值
     * @defaultValue 0
     */
    /**
     * @language en-US
     * @description value
     * @defaultValue 0
     */
    value: number;
    /**
     * @language zh-CN
     * @description 最小值
     * @defaultValue 0
     */
    /**
     * @language en-US
     * @description min value
     * @defaultValue 0
     */
    min: number;
    /**
     * @language zh-CN
     * @description 最大值
     * @defaultValue 100
     */
    /**
     * @language en-US
     * @description max value
     * @defaultValue 100
     */
    max: 100;
    /**
     * @language zh-CN
     * @description 是否禁止使用
     * @defaultValue false
     */
    /**
     * @language en-US
     * @description Whether to disable
     * @defaultValue false
     */
    disabled: boolean;
    /**
     * @language zh-CN
     * @description 轨道颜色
     * @defaultValue rgba(206,206,206,0.12)
     */
    /**
     * @language en-US
     * @description Track color
     * @defaultValue rgba(206,206,206,0.12)
     */
    trackColor: string;
    /**
     * @language zh-CN
     * @description 轨道激活颜色
     * @defaultValue #000
     */
    /**
     * @language en-US
     * @description Track active color
     * @defaultValue #000
     */
    activeColor: string;
    /**
     * @language zh-CN
     * @description 滑动生效的距离
     * @defaultValue 7
     */
    /**
     * @language en-US
     * @description invalid Swipe Distance
     * @defaultValue 7
     */
    invalidSwipeDistance: number;
    /**
     * @language zh-CN
     * @description 是否可以点击
     * @defaultValue true
     */
    /**
     * @language en-US
     * @description Whether to click enabled
     * @defaultValue true
     */
    clickEnabled: boolean;
    /**
     * @language zh-CN
     * @description 滑动开始事件
     * @defaultValue (v: number) {}
     */
    /**
     * @language en-US
     * @description Slip start event
     * @defaultValue (v: number) {}
     */
    onGrant: (v: number) => void;
    /**
     * @language zh-CN
     * @description 滑动中事件
     * @defaultValue (v: number) {}
     */
    /**
     * @language en-US
     * @description Sliding  event
     * @defaultValue (v: number) {}
     */
    onMove: (v: number) => void;
    /**
     * @language zh-CN
     * @description 滑动结束事件
     * @defaultValue (v: number) {}
     */
    /**
     * @language en-US
     * @description Slid end event
     * @defaultValue (v: number) {}
     */
    onRelease: (v: number) => void;
    /**
     * @language zh-CN
     * @description 点击事件：当 clickEnabled = true时，有效
     * @defaultValue (v: number) {}
     */
    /**
     * @language en-US
     * @description Click event：clickEnabled = tru
     * @defaultValue (v: number) {}
     */
    onPress: (v: number) => void;
  }

  export interface TurnPlateProps {
    /**
     * @language zh-CN
     * @description 图片背景样式
     * @defaultValue {}
     */
    /**
     * @language en-US
     * @description Image Background Style
     * @defaultValue {}
     */
    imageStyle?: StyleProp<ViewStyle>;
    /**
     * @language zh-CN
     * @description 转盘样式
     * @defaultValue {}
     */
    /**
     * @language en-US
     * @description Turn Plate Style
     * @defaultValue {}
     */
    turnPlateStyle?: StyleProp<ViewStyle>;
    /**
     * @language zh-CN
     * @description 分布在周边的圆点样式
     * @defaultValue {}
     */
    /**
     * @language en-US
     * @description  Dot patterns distributed around the perimeter
     * @defaultValue {}
     */
    dotStyle?: StyleProp<ViewStyle>;
    /**
     * @language zh-CN
     * @description 转盘上圆点样式样式
     * @defaultValue {}
     */
    /**
     * @language en-US
     * @description  Dot style style on the turntable
     * @defaultValue {}
     */
    turnPlateDotStyle?: StyleProp<ViewStyle>;
    /**
     * @language zh-CN
     * @description 隐藏的Progress样式
     * @defaultValue {}
     */
    /**
     * @language en-US
     * @description Hidden Progress style
     * @defaultValue {}
     */
    progressStyle?: StyleProp<ViewStyle>;
    /**
     * @language zh-CN
     * @description 转盘事件
     * @defaultValue (v: number) => void
     */
    /**
     * @language en-US
     * @description Turntable event
     * @defaultValue (v: number) => void
     */
    handleChangeTurnPlate: (v: number) => void;
    /**
     * @language zh-CN
     * @description 转动的值
     * @defaultValue 0
     */
    /**
     * @language en-US
     * @description The value of the rotation
     * @defaultValue 0
     */
    value: number;
    /**
     * @language zh-CN
     * @description 步长
     * @defaultValue 5
     */
    /**
     * @language en-US
     * @description Step value
     * @defaultValue 5
     */
    stepValue?: number;
    /**
     * @language zh-CN
     * @description 激活颜色
     * @defaultValue #6161EF
     */
    /**
     * @language en-US
     * @description Active color
     * @defaultValue #6161EF
     */
    activeColor?: string;

    /**
     * @language zh-CN
     * @description 未激活颜色
     * @defaultValue #D9D9E0
     */
    /**
     * @language en-US
     * @description Inactive color
     * @defaultValue #D9D9E0
     */
    inactiveColor?: string;
    /**
     * @language zh-CN
     * @description 转盘背景图
     * @defaultValue res.driver
     */
    /**
     * @language en-US
     * @description Turntable background
     * @defaultValue res.driver
     */
    imageSource?: ImageSourcePropType;
  }

  export const SoundWave: React.ComponentClass<SoundWaveProps>;
  export const StreeringWheel: React.ComponentClass<StreeringWheelProps>;
  export const SimpleVerticalSlider: React.ComponentClass<SimpleVerticalSliderProps>;
  export const TurnPlate: React.ComponentClass<TurnPlateProps>;
}
