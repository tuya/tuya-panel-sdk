import React, { ReactNode } from 'react';
import { ImageSourcePropType, StyleProp, ViewStyle, TextStyle } from 'react-native';

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
  export interface BreakPointInputProps {
    /**
     * @language zh-CN
     * @description 必须有一个唯一的name字段
     * @defaultValue ''
     */
    /**
     * @language en-US
     * @description must have this unique key
     * @defaultValue ''
     */
    name: string;
    /**
     * @language zh-CN
     * @description 输入框最大长度,默认3
     * @defaultValue 3
     */
    /**
     * @language en-US
     * @description input max length
     * @defaultValue 3
     */
    maxLen?: number;
    /**
     * @language zh-CN
     * @description 输入框ref
     * @defaultValue 3
     */
    /**
     * @language en-US
     * @description input' ref
     * @defaultValue 3
     */
    ref?: any;
    /**
     * @language zh-CN
     * @description 输入框聚焦时触发
     * @defaultValue () => {}
     */
    /**
     * @language en-US
     * @description focus callback function
     * @defaultValue () => {}
     */
    focusFuc?: any;
    /**
     * @language zh-CN
     * @description placeholder
     * @defaultValue ''
     */
    /**
     * @language en-US
     * @description placeholder
     * @defaultValue ''
     */
    placeHolder?: string;
  }
  export interface NumberAreaInputProps {
    /**
     * @language zh-CN
     * @description 必须有一个唯一的name字段
     * @defaultValue ''
     */
    /**
     * @language en-US
     * @description must have this unique key
     * @defaultValue ''
     */
    name: string;
    /**
     * @language zh-CN
     * @description 输入框外层样式
     * @defaultValue ''
     */
    /**
     * @language en-US
     * @description view style
     * @defaultValue ''
     */
    viewStyle?: StyleProp<ViewStyle>;
    /**
     * @language zh-CN
     * @description 输入框样式
     * @defaultValue ''
     */
    /**
     * @language en-US
     * @description input style
     * @defaultValue ''
     */
    iptStyle?: StyleProp<TextStyle>;
    /**
     * @language zh-CN
     * @description 输入框聚焦时触发
     * @defaultValue () => {}
     */
    /**
     * @language en-US
     * @description focus callback function
     * @defaultValue () => {}
     */
    focusFuc?: any;
    /**
     * @language zh-CN
     * @description 输入框ref
     * @defaultValue 3
     */
    /**
     * @language en-US
     * @description input' ref
     * @defaultValue 3
     */
    ref?: any;
    /**
     * @language zh-CN
     * @description 输入框文本change事件
     * @defaultValue 3
     */
    /**
     * @language en-US
     * @description text change callback
     * @defaultValue 3
     */
    changeText?: any;
    /**
     * @language zh-CN
     * @description 限制输入框最小输入的值
     * @defaultValue 0
     */
    /**
     * @language en-US
     * @description min value
     * @defaultValue 0
     */
    minVal?: number;
    /**
     * @language zh-CN
     * @description 限制输入框最大输入的值
     * @defaultValue 255
     */
    /**
     * @language en-US
     * @description max value
     * @defaultValue 255
     */
    maxVal?: number;
  }
  export interface SimpleTopBarProps {
    /**
     * @language zh-CN
     * @description TopBar.Content的样式
     * @defaultValue { backgroundColor: '#fff' }
     */
    /**
     * @language en-US
     * @description TopBar.Content‘s style
     * @defaultValue { backgroundColor: '#fff' }
     */
    wrapStyle?: StyleProp<ViewStyle>;
    /**
     * @language zh-CN
     * @description TopBar.Content的标题
     * @defaultValue ''
     */
    /**
     * @language en-US
     * @description TopBar.Content's title
     * @defaultValue ''
     */
    title?: string;
    /**
     * @language zh-CN
     * @description title的样式
     * @defaultValue { fontSize: cx(17) }
     */
    /**
     * @language en-US
     * @description title‘s style
     * @defaultValue { fontSize: cx(17) }
     */
    titleStyle?: StyleProp<TextStyle>;
    /**
     * @language zh-CN
     * @description 左边的按钮位置元素
     * @defaultValue undefined
     */
    /**
     * @language en-US
     * @description left icon node
     * @defaultValue undefined
     */
    leftNode?: React.ReactNode;
    /**
     * @language zh-CN
     * @description 左边的按钮外层样式
     * @defaultValue { marginLeft: cx(25) }
     */
    /**
     * @language en-US
     * @description left icon content style
     * @defaultValue { marginLeft: cx(25) }
     */
    leftStyle?: StyleProp<ViewStyle>;
    /**
     * @language zh-CN
     * @description 左边的按钮点击功能
     * @defaultValue () => {}
     */
    /**
     * @language en-US
     * @description left icon press callback
     * @defaultValue () => {}
     */
    leftActionFunc?: any;
    /**
     * @language zh-CN
     * @description 右边的按钮位置元素
     * @defaultValue undefined
     */
    /**
     * @language en-US
     * @description right icon node
     * @defaultValue undefined
     */
    rightNode?: React.ReactNode;
    /**
     * @language zh-CN
     * @description 右边的按钮外层样式
     * @defaultValue { marginRight: cx(25) }
     */
    /**
     * @language en-US
     * @description right icon content style
     * @defaultValue { marginRight: cx(25) }
     */
    rightStyle?: StyleProp<ViewStyle>;
    /**
     * @language zh-CN
     * @description 右边的按钮点击功能
     * @defaultValue () => {}
     */
    /**
     * @language en-US
     * @description right icon press callback
     * @defaultValue () => {}
     */
    rightActionFunc?: any;
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

  export interface DpCacheTextProps {
    /**
     * @language zh-CN
     * @description 文字标题
     * @defaultValue ''
     */
    /**
     * @language en-US
     * @description title
     * @defaultValue ''
     */
    title: string;
    /**
     * @language zh-CN
     * @description 是否显示icon
     * @defaultValue false
     */
    /**
     * @language en-US
     * @description is show icon
     * @defaultValue false
     */
    showIcon: boolean;
    /**
     * @language zh-CN
     * @description 容器样式
     * @defaultValue false
     */
    /**
     * @language en-US
     * @description container style
     * @defaultValue false
     */
    style?: StyleProp<ViewStyle | TextStyle>;
    /**
     * @language zh-CN
     * @description 文本颜色
     * @defaultValue false
     */
    /**
     * @language en-US
     * @description text color
     * @defaultValue false
     */
    textColor: string;
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
    min?: number;
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
    max?: number;
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
    disabled?: boolean;
    /**
     * @language zh-CN
     * @description 轨道颜色
     * @defaultValue rgba(206,206,206,0.12)
     */
    /**
     * @language en-US
     * @description Track color
     * @defaultValue
     */
    trackColor?: string;
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
    activeColor?: string;
    /**
     * @language zh-CN
     * @description k     * @defaultValue 7
     */
    /**
     * @language en-US
     * @description invalid Swipe Distance
     * @defaultValue 7
     */
    invalidSwipeDistance?: number;
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
    clickEnabled?: boolean;
    /**
     * @language zh-CN
     * @description 背景类型，linearGradient:渐变
     * @defaultValue ''
     */
    /**
     * @language en-US
     * @description Type, linearGradient: linearGradient
     * @defaultValue ''
     */
    type?: string;
    /**
     * @language zh-CN
     * @description 渐变起始点的 x 轴坐标
     * @defaultValue "0%"
     */
    /**
     * @language en-US
     * @description The x-axis coordinate of the starting point of gradient.
     * @defaultValue "0%"
     */
    x1?: string | undefined;
    /**
     * @language zh-CN
     * @description 渐变终点的 x 轴坐标
     * @defaultValue "100%"
     */
    /**
     * @language en-US
     * @description The x-axis coordinate of the ending point of gradient.
     * @defaultValue "100%"
     */
    x2?: string | undefined;
    /**
     * @language zh-CN
     * @description 渐变起始点的 y 轴坐标
     * @defaultValue "0%"
     */
    /**
     * @language en-US
     * @description The y-axis coordinate of the starting point of gradient.
     * @defaultValue "0%"
     */
    y1?: string | undefined;
    /**
     * @language zh-CN
     * @description 渐变终点的 y 轴坐标
     * @defaultValue "100%"
     */
    /**
     * @language en-US
     * @description The y-axis coordinate of the ending point of gradient.
     * @defaultValue "100%"
     */
    y2?: string | undefined;
    /**
     * @language zh-CN
     * @description 渐变颜色范围
     * @defaultValue {'0%': '#3ff3e9','100%': '#7C46CD'}
     */
    /**
     * @language en-US
     * @description Gradient color range
     * @defaultValue {'0%': '#3ff3e9','100%': '#7C46CD'}
     */
    stops?: Record<string, string>;
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
    onGrant?: (v: number) => void;
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
    onMove?: (v: number) => void;
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
    onRelease?: (v: number) => void;
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
    onPress?: (v: number) => void;
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
     * @description 转盘上圆点样式
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
     * @description 每一个圆点的值步长
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
    onTurnPlateChange: (v: number) => void;
  }

  export interface GestureSliderProps {
    /**
     * @language zh-CN
     * @description 区域样式
     * @defaultValue {}
     */
    /**
     * @language en-US
     * @description Scope style
     * @defaultValue {}
     */
    style?: StyleProp<ViewStyle>;
    /**
     * @language zh-CN
     * @description 刻度变化回调
     * @defaultValue ()=>{}
     */
    /**
     * @language en-US
     * @description Scale change callback
     * @defaultValue ()=>{}
     */
    onChange?: (data: Date) => void;
    /**
     * @language zh-CN
     * @description 默认刻度值(不可控)
     * @defaultValue 0
     */
    /**
     * @language en-US
     * @description Default scale value (uncontrollable)
     * @defaultValue 0
     */
    defaultValue?: number;
    /**
     * @language zh-CN
     * @description 游标样式
     * @defaultValue {}
     */
    /**
     * @language en-US
     * @description Thumb style
     * @defaultValue {}
     */
    thumbStyle?: StyleProp<ImageStyle>;
    /**
     * @language zh-CN
     * @description 刻度条区域外部样式
     * @defaultValue {}
     */
    /**
     * @language en-US
     * @description Scale bar area external style
     * @defaultValue {}
     */
    outerTrackStyle?: StyleProp<ViewStyle>;
    /**
     * @language zh-CN
     * @description 刻度条区域内部样式
     * @defaultValue {}
     */
    /**
     * @language en-US
     * @description Scale bar area internal style
     * @defaultValue {}
     */
    innerTrackStyle?: StyleProp<ViewStyle>;
    /**
     * @language zh-CN
     * @description 宽度
     * @defaultValue convertX(303)
     */
    /**
     * @language en-US
     * @description Width
     * @defaultValue convertX(303)
     */
    width?: number;
    /**
     * @language zh-CN
     * @description 高度
     * @defaultValue convertY(60)
     */
    /**
     * @language en-US
     * @description Height
     * @defaultValue convertY(60)
     */
    height?: number;
    /**
     * @language zh-CN
     * @description 刻度条样式
     * @defaultValue {}
     */
    /**
     * @language en-US
     * @description Scale bar style
     * @defaultValue {}
     */
    stepPointStyle?: StyleProp<ViewStyle>;
    /**
     * @language zh-CN
     * @description 刻度值(可控)
     * @defaultValue undefined
     */
    /**
     * @language en-US
     * @description Scale value (controllable)
     * @defaultValue undefined
     */
    value?: number;
    /**
     * @language zh-CN
     * @description 刻度最小值
     * @defaultValue 0
     */
    /**
     * @language en-US
     * @description Scale min
     * @defaultValue 0
     */
    minValue?: number;
    /**
     * @language zh-CN
     * @description 刻度最大值
     * @defaultValue 12 * 60
     */
    /**
     * @language en-US
     * @description Scale maximum
     * @defaultValue 12 * 60
     */
    maxValue?: number;
    /**
     * @language zh-CN
     * @description 刻度间距
     * @defaultValue 8
     */
    /**
     * @language en-US
     * @description Scale spacing
     * @defaultValue 8
     */
    scaleSpace?: number;
    /**
     * @language zh-CN
     * @description 刻度底色
     * @defaultValue '#1B0A45'
     */
    /**
     * @language en-US
     * @description Scale background
     * @defaultValue '#1B0A45'
     */
    scaleColor?: string | string[];
    /**
     * @language zh-CN
     * @description 自定义游标
     * @defaultValue undefined
     */
    /**
     * @language en-US
     * @description Custom thumb
     * @defaultValue undefined
     */
    customThumb?: ViewComponent | TextComponent | ImageComponent;
    /**
     * @language zh-CN
     * @description 刻度高度
     * @defaultValue undefined
     */
    /**
     * @language en-US
     * @description Scale height
     * @defaultValue undefined
     */
    scaleHeight?: number | number[];
  }

  export const SoundWave: React.ComponentClass<SoundWaveProps>;
  export const StreeringWheel: React.ComponentClass<StreeringWheelProps>;
  export const BreakPointInput: React.ComponentClass<BreakPointInputProps>;
  export const NumberAreaInput: React.ComponentClass<NumberAreaInputProps>;
  export const SimpleTopBar: React.ComponentClass<SimpleTopBarProps>;
  export const SimpleVerticalSlider: React.ComponentClass<SimpleVerticalSliderProps>;
  export const TurnPlate: React.ComponentClass<TurnPlateProps>;
  export const MultiSlider: React.ComponentClass<MultiSliderProps>;
  export const ImageAnimate: React.ComponentClass<IImageAnimateProps>;
  export const BoxShadow: React.ComponentClass<BoxShadowProps>;
  export const WhiteSpace: React.ComponentClass<WhiteSpaceProps>;
  export const DpCacheText: React.ComponentClass<DpCacheTextProps>;
  export const GestureSlider: React.ComponentClass<GestureSliderProps>;
}
