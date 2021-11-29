import React, { ReactNode } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

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
  export interface MultiSliderProps {
    /**
     * @language zh-CN
     * @description 滑块的数值
     * @defaultValue [0]
     */
    /**
     * @language en-US
     * @description Prefixed values of the slide
     * @defaultValue [0]
     */
    values?: number[];
    /**
     * @language zh-CN
     * @description 数值变化触发
     * @defaultValue (values) => {}
     */
    /**
     * @language en-US
     * @description Callback when the value changes
     * @defaultValue (values) => {}
     */
    onValuesChange?: (values: number[]) => void;
    /**
     * @language zh-CN
     * @description 开始滑动时触发
     * @defaultValue () => {}
     */
    /**
     * @language en-US
     * @description Callback when the value starts changing
     * @defaultValue () => {}
     */
    onValuesChangeStart?: () => void;
    /**
     * @language zh-CN
     * @description 滑动结束时触发
     * @defaultValue (values) => {}
     */
    /**
     * @language en-US
     * @description Prefixed values of the slide
     * @defaultValue (values) => {}
     */
    onValuesChangeFinish?: (values: number[]) => void;
    /**
     * @language zh-CN
     * @description 滑块长度
     * @defaultValue 280
     */
    /**
     * @language en-US
     * @description Length of the slider
     * @defaultValue 280
     */
    sliderLength?: number;
    /**
     * @language zh-CN
     * @description 滑块样式
     * @defaultValue {height: 50,width: 50,borderRadius: 15,slipDisplacement: 200}
     */
    /**
     * @language en-US
     * @description touchDimensions
     * @defaultValue {height: 50,width: 50,borderRadius: 15,slipDisplacement: 200}
     */
    touchDimensions?: {
      height: number;
      width: number;
      borderRadius: number;
      slipDisplacement: number;
    };
    /**
     * @language zh-CN
     * @description 自定义marker
     * @defaultValue undefined
     */
    /**
     * @language en-US
     * @description Component used for the cursor.
     * @defaultValue undefined
     */
    customMarker?: React.ComponentType<MarkerProps>;
    /**
     * @language zh-CN
     * @description 自定义左Marker
     * @defaultValue undefined
     */
    /**
     * @language en-US
     * @description Component used for the left cursor.
     * @defaultValue undefined
     */
    customMarkerLeft?: React.ComponentType<MarkerProps>;
    /**
     * @language zh-CN
     * @description 自定义右Marker
     * @defaultValue undefined
     */
    /**
     * @language en-US
     * @description Prefixed values of the slide
     * @defaultValue undefined
     */
    customMarkerRight?: React.ComponentType<MarkerProps>;
    /**
     * @language zh-CN
     * @description 自定义label
     * @defaultValue undefined
     */
    /**
     * @language en-US
     * @description Component used for rendering a label above the cursors.
     * @defaultValue undefined
     */
    customLabel?: React.ComponentType<LabelProps>;
    /**
     * @language zh-CN
     * @description 滑块分开
     * @defaultValue undefined
     */
    /**
     * @language en-US
     * @description isMarkersSeparated
     * @defaultValue undefined
     */
    isMarkersSeparated?: boolean;
    /**
     * @language zh-CN
     * @description 最小值
     * @defaultValue 0
     */
    /**
     * @language en-US
     * @description 最小值
     * @defaultValue []
     */
    min?: number;
    /**
     * @language zh-CN
     * @description 最大值
     * @defaultValue 10
     */
    /**
     * @language en-US
     * @description 最大值
     * @defaultValue 10
     */
    max?: number;
    /**
     * @language zh-CN
     * @description 步长
     * @defaultValue 1
     */
    /**
     * @language en-US
     * @description Step value of the slider.
     * @defaultValue 1
     */
    step?: number;
    /**
     * @language zh-CN
     * @description optionsArray
     * @defaultValue undefined
     */
    /**
     * @language en-US
     * @description Possible values of the slider. Ignores min and max.
     * @defaultValue undefined
     */
    optionsArray?: number[];
    /**
     * @language zh-CN
     * @description 容器样式
     * @defaultValue undefined
     */
    /**
     * @language en-US
     * @description containerStyle
     * @defaultValue undefined
     */
    containerStyle?: ViewStyle;
    /**
     * @language zh-CN
     * @description 滑块样式
     * @defaultValue undefined
     */
    /**
     * @language en-US
     * @description trackStyle
     * @defaultValue undefined
     */
    trackStyle?: ViewStyle;
    /**
     * @language zh-CN
     * @description 选中滑条样式
     * @defaultValue []
     */
    /**
     * @language en-US
     * @description selectedStyle
     * @defaultValue undefined
     */
    selectedStyle?: ViewStyle;
    /**
     * @language zh-CN
     * @description 未选中滑条样式
     * @defaultValue undefined
     */
    /**
     * @language en-US
     * @description unselectedStyle
     * @defaultValue undefined
     */
    unselectedStyle?: ViewStyle;
    /**
     * @language zh-CN
     * @description markerContainerStyle
     * @defaultValue undefined
     */
    /**
     * @language en-US
     * @description markerContainerStyle
     * @defaultValue undefined
     */
    markerContainerStyle?: ViewStyle;
    /**
     * @language zh-CN
     * @description markerStyle
     * @defaultValue undefined
     */
    /**
     * @language en-US
     * @description markerStyle
     * @defaultValue undefined
     */
    markerStyle?: ViewStyle;
    /**
     * @language zh-CN
     * @description pressedMarkerStyle
     * @defaultValue undefined
     */
    /**
     * @language en-US
     * @description pressedMarkerStyle
     * @defaultValue undefined
     */
    pressedMarkerStyle?: ViewStyle;
    /**
     * @language zh-CN
     * @description 数值前缀
     * @defaultValue undefined
     */
    /**
     * @language en-US
     * @description Prefix added to the value.
     * @defaultValue undefined
     */
    valuePrefix?: string;
    /**
     * @language zh-CN
     * @description 数值后缀
     * @defaultValue undefined
     */
    /**
     * @language en-US
     * @description Suffix added to the value.
     * @defaultValue undefined
     */
    valueSuffix?: string;
    /**
     * @language zh-CN
     * @description 禁用第一个
     * @defaultValue []
     */
    /**
     * @language en-US
     * @description Enables the first cursor
     * @defaultValue undefined
     */
    enabledOne?: boolean;
    /**
     * @language zh-CN
     * @description 禁用第二个
     * @defaultValue undefined
     */
    /**
     * @language en-US
     * @description Enables the second cursor
     * @defaultValue undefined
     */
    enabledTwo?: boolean;
    /**
     * @language zh-CN
     * @description 监听都一个变化
     * @defaultValue undefined
     */
    /**
     * @language en-US
     * @description Listener when first cursor toggles.
     * @defaultValue undefined
     */
    onToggleOne?: () => void;
    /**
     * @language zh-CN
     * @description 监听都二个变化
     * @defaultValue undefined
     */
    /**
     * @language en-US
     * @description Listener when second cursor toggles.
     * @defaultValue undefined
     */
    onToggleTwo?: () => void;
    /**
     * @language zh-CN
     * @description 覆盖
     * @defaultValue undefined
     */
    /**
     * @language en-US
     * @description Allow the overlap within the cursors.
     * @defaultValue undefined
     */
    allowOverlap?: boolean;
    /**
     * @language zh-CN
     * @description Use this when you want a fixed position for your markers, this will split the slider in N specific positions
     * @defaultValue undefined
     */
    /**
     * @language en-US
     * @description Use this when you want a fixed position for your markers, this will split the slider in N specific positions
     * @defaultValue undefined
     */
    snapped?: boolean;
    /**
     * @language zh-CN
     * @description 偏移量X
     * @defaultValue undefined
     */
    /**
     * @language en-US
     * @description Offset the cursor(s) on the X axis
     * @defaultValue undefined
     */
    markerOffsetX?: number;
    /**
     * @language zh-CN
     * @description 偏移量Y
     * @defaultValue undefined
     */
    /**
     * @language en-US
     * @description Offset the cursor(s) on the Y axis
     * @defaultValue undefined
     */
    markerOffsetY?: number;
    /**
     * @language zh-CN
     * @description if this is > 0 and allowOverlap is false, this value will determine the closest two markers can come to each other (in pixels, not steps). This can be used for cases where you have two markers large cursors and you don't want them to overlap. Note that markers will still overlap at the start if starting values are too near. CANNOT be combined with minMarkerOverlapDistance
     * @defaultValue undefined
     */
    /**
     * @language en-US
     * @description if this is > 0 and allowOverlap is false, this value will determine the closest two markers can come to each other (in pixels, not steps). This can be used for cases where you have two markers large cursors and you don't want them to overlap. Note that markers will still overlap at the start if starting values are too near. CANNOT be combined with minMarkerOverlapDistance
     * @defaultValue undefined
     */
    minMarkerOverlapDistance?: number;
    /**
     * @language zh-CN
     * @description 背景图片
     * @defaultValue undefined
     */
    /**
     * @language en-US
     * @description Specifies the source as required by ImageBackground
     * @defaultValue undefined
     */
    imageBackgroundSource?: string;
    /**
     * @language zh-CN
     * @description 禁用label
     * @defaultValue undefined
     */
    /**
     * @language en-US
     * @description Enable the label rendering
     * @defaultValue undefined
     */
    enableLabel?: boolean;
    /**
     * @language zh-CN
     * @description 方向
     * @defaultValue undefined
     */
    /**
     * @language en-US
     * @description Use vertical orientation instead of horizontal.
     * @defaultValue undefined
     */
    vertical?: boolean;
    /**
     * @language zh-CN
     * @description label单位
     * @defaultValue undefined
     */
    /**
     * @language en-US
     * @description label of unit
     * @defaultValue undefined
     */
    unit?: string;
    /**
     * @language zh-CN
     * @description 位置信息
     * @defaultValue undefined
     */
    /**
     * @language en-US
     * @description onMarkersPosition
     * @defaultValue undefined
     */
    onMarkersPosition?: (position: [number, number]) => void;
    /**
     * @language zh-CN
     * @description 滑块大小
     * @defaultValue undefined
     */
    /**
     * @language en-US
     * @description Marker Size
     * @defaultValue undefined
     */
    size?: number;
    /**
     * @language zh-CN
     * @description disabledMarkerStyle
     * @defaultValue undefined
     */
    /**
     * @language en-US
     * @description disabledMarkerStyle
     * @defaultValue undefined
     */
    disabledMarkerStyle?: StyleProp<ViewStyle>;
    /**
     * @language zh-CN
     * @description sliderLabelStyle
     * @defaultValue undefined
     */
    /**
     * @language en-US
     * @description sliderLabelStyle
     * @defaultValue undefined
     */
    sliderLabelStyle?: StyleProp<TextStyle>;
  }
  export interface MarkerProps {
    pressed: boolean;
    pressedMarkerStyle: ViewStyle;
    markerStyle: ViewStyle;
    enabled: boolean;
    currentValue: number;
    valuePrefix: string;
    valueSuffix: string;
    disabledMarkerStyle?: StyleProp<ViewStyle>;
    size: number;
  }
  export interface LabelProps {
    oneMarkerValue: string | number;
    twoMarkerValue: string | number;
    oneMarkerLeftPosition: number;
    twoMarkerLeftPosition: number;
    oneMarkerPressed: boolean;
    twoMarkerPressed: boolean;
    unit: string;
  }

  export interface IImageAnimateProps {
    /**
     * @language zh-CN
     * @description 图片源
     * @defaultValue reload
     */
    /**
     * @language en-US
     * @description source
     * @defaultValue 4
     */
    source?: any;
    /**
     * @language zh-CN
     * @description 自定义样式
     * @defaultValue {}
     */
    /**
     * @language en-US
     * @description style
     * @defaultValue {}
     */
    style?: StyleProp<ViewStyle>;
  }

  export interface BoxShadowSetting {
    /**
     * @language zh-CN
     * @description 宽度
     * @defaultValue 4
     */
    /**
     * @language en-US
     * @description width
     * @defaultValue 4
     */
    width: number;
    /**
     * @language zh-CN
     * @description 高度
     * @defaultValue 4
     */
    /**
     * @language en-US
     * @description height
     * @defaultValue 4
     */
    height: number;
    /**
     * @language zh-CN
     * @description 背景色
     * @defaultValue 4
     */
    /**
     * @language en-US
     * @description color
     * @defaultValue 4
     */
    color?: string;
    /**
     * @language zh-CN
     * @description 阴影的宽度
     * @defaultValue 4
     */
    /**
     * @language en-US
     * @description border
     * @defaultValue 4
     */
    border?: number;
    /**
     * @language zh-CN
     * @description 圆角。必须和子组件的borderRadius的值一样
     * @defaultValue 4
     */
    /**
     * @language en-US
     * @description radius
     * @defaultValue 4
     */
    radius?: number;
    /**
     * @language zh-CN
     * @description 背景透明度
     * @defaultValue 4
     */
    /**
     * @language en-US
     * @description opacity
     * @defaultValue 4
     */
    opacity?: number;
    /**
     * @language zh-CN
     * @description 阴影的横坐标方向偏移量
     * @defaultValue 4
     */
    /**
     * @language en-US
     * @description x
     * @defaultValue 4
     */
    x?: number;
    /**
     * @language zh-CN
     * @description 阴影的纵坐标方向偏移量
     * @defaultValue 4
     */
    /**
     * @language en-US
     * @description y
     * @defaultValue 4
     */
    y?: number;
    /**
     * @language zh-CN
     * @description 自定义样式
     * @defaultValue 4
     */
    /**
     * @language en-US
     * @description style
     * @defaultValue 4
     */
    style?: StyleProp<ViewStyle>;
  }
  export interface BoxShadowProps {
    /**
     * @language zh-CN
     * @description 设置项
     * @defaultValue {}
     */
    /**
     * @language en-US
     * @description setting
     * @defaultValue {}
     */
    setting: BoxShadowSetting;
  }

  export interface WhiteSpaceProps {
    /**
     * @language zh-CN
     * @description 高度
     * @defaultValue 4
     */
    /**
     * @language en-US
     * @description height
     * @defaultValue 4
     */
    height?: string | number;
    /**
     * @language zh-CN
     * @description 背景色
     * @defaultValue undefined
     */
    /**
     * @language en-US
     * @description backgroundColor
     * @defaultValue undefined
     */
    backgroundColor?: ColorValue;
  }

  export const SoundWave: React.ComponentClass<SoundWaveProps>;
  export const StreeringWheel: React.ComponentClass<StreeringWheelProps>;
  export const MultiSlider: React.ComponentClass<MultiSliderProps>;
  export const ImageAnimate: React.ComponentClass<IImageAnimateProps>;
  export const BoxShadow: React.ComponentClass<BoxShadowProps>;
  export const WhiteSpace: React.ComponentClass<WhiteSpaceProps>;
}
