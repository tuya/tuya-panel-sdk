import React from 'react';
import {
  StepperProps as StepperPropsPanel,
  TabBarProps as TabBarPropsPanel,
  DialogPromptProps,
} from 'tuya-panel-kit';

declare module '@tuya/tuya-panel-sensing-sdk' {
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
    /**
     * @language zh-CN
     * @description labelTextColor
     * @defaultValue undefined
     */
    /**
     * @language en-US
     * @description label颜色
     * @defaultValue undefined
     */
    labelTextColor?: string;
  }

  export interface StepperProps extends StepperPropsPanel {
    [props: string]: any;
  }

  export interface TabBarProps extends TabBarPropsPanel {
    /**
     * @language zh-CN
     * @description 容器样式
     * @defaultValue undefined
     */
    /**
     * @language en-US
     * @description wrapActiveViewStyle
     * @defaultValue undefined
     */
    wrapActiveViewStyle?: StyleProp<ViewStyle>;
    /**
     * @language zh-CN
     * @description 边框是否覆盖
     * @defaultValue undefined
     */
    /**
     * @language en-US
     * @description isOverlay
     * @defaultValue undefined
     */
    isOverlay?: boolean;
  }

  export interface DpCacheTextProps {
    /**
     * @language zh-CN
     * @description 标题
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
     * @description 是否展示图标
     * @defaultValue false
     */
    /**
     * @language en-US
     * @description showIcon
     * @defaultValue false
     */
    showIcon: boolean;
    /**
     * @language zh-CN
     * @description 容器样式
     * @defaultValue undefined
     */
    /**
     * @language en-US
     * @description style
     * @defaultValue undefined
     */
    style?: StyleProp<ViewStyle | TextStyle>;
  }

  export interface ImageAnimateProps {
    /**
     * @language zh-CN
     * @description 图片源
     * @defaultValue undefined
     */
    /**
     * @language en-US
     * @description source
     * @defaultValue undefined
     */
    source?: any;
    /**
     * @language zh-CN
     * @description 自定义样式
     * @defaultValue undefined
     */
    /**
     * @language en-US
     * @description style
     * @defaultValue undefined
     */
    style?: StyleProp<ViewStyle>;
  }

  export interface SendEmailProps extends DialogPromptProps {
    /**
     * @language zh-CN
     * @description 错误信息
     * @defaultValue undefined
     */
    /**
     * @language en-US
     * @description errInfo
     * @defaultValue undefined
     */
    errInfo?: {
      emptyText: string;
      illegalText: string;
    };
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
    containerStyle?: StyleProp<ViewStyle>;
    /**
     * @language zh-CN
     * @description 导出回调
     * @defaultValue undefined
     */
    /**
     * @language en-US
     * @description exportCallback
     * @defaultValue undefined
     */
    exportCallback?: (email: string) => void;
    /**
     * @language zh-CN
     * @description 导出前校验
     * @defaultValue undefined
     */
    /**
     * @language en-US
     * @description beforeExport
     * @defaultValue undefined
     */
    beforeExport?: () => void;
  }

  export interface WhiteSpaceProps {
    /**
     * @language zh-CN
     * @description 容器样式
     * @defaultValue undefined
     */
    /**
     * @language en-US
     * @description style
     * @defaultValue undefined
     */
    style?: StyleProp<ViewStyle>;
    /**
     * @language zh-CN
     * @description 间距大小
     * @defaultValue undefined
     */
    /**
     * @language en-US
     * @description size
     * @defaultValue undefined
     */
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  }

  export interface AlarmCloudProps {
    /**
     * @language zh-CN
     * @description 标题
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
     * @description 最小值文案
     * @defaultValue undefined
     */
    /**
     * @language en-US
     * @description minTitle
     * @defaultValue undefined
     */
    minTitle?: string;
    /**
     * @language zh-CN
     * @description 最大值文案
     * @defaultValue undefined
     */
    /**
     * @language en-US
     * @description maxTitle
     * @defaultValue undefined
     */
    maxTitle?: string;
    /**
     * @language zh-CN
     * @description 是否展示step组件
     * @defaultValue false
     */
    /**
     * @language en-US
     * @description showStepComp
     * @defaultValue false
     */
    showStepComp?: boolean;
    /**
     * @language zh-CN
     * @description step组件props
     * @defaultValue undefined
     */
    /**
     * @language en-US
     * @description stepMixProps
     * @defaultValue undefined
     */
    stepMixProps?: StepperProps;
    /**
     * @language zh-CN
     * @description step组件props
     * @defaultValue undefined
     */
    /**
     * @language en-US
     * @description stepMaxProps
     * @defaultValue undefined
     */
    stepMaxProps?: StepperProps;
    /**
     * @language zh-CN
     * @description title样式
     * @defaultValue undefined
     */
    /**
     * @language en-US
     * @description titleStyle
     * @defaultValue undefined
     */
    titleStyle?: StyleProp<TextStyle>;
    /**
     * @language zh-CN
     * @description switch props
     * @defaultValue undefined
     */
    /**
     * @language en-US
     * @description switchButtonProps
     * @defaultValue undefined
     */
    switchButtonProps?: SwitchButtonProps;
    /**
     * @language zh-CN
     * @description multiSliderProps
     * @defaultValue undefined
     */
    /**
     * @language en-US
     * @description multiSliderProps
     * @defaultValue undefined
     */
    multiSliderProps?: MultiSliderProps;
    /**
     * @language zh-CN
     * @description 头部样式
     * @defaultValue undefined
     */
    /**
     * @language en-US
     * @description multiSliderProps
     * @defaultValue undefined
     */
    topStyle?: StyleProp<ViewStyle>;
    /**
     * @language zh-CN
     * @description 底部样式
     * @defaultValue undefined
     */
    /**
     * @language en-US
     * @description bottomStyle
     * @defaultValue undefined
     */
    bottomStyle?: StyleProp<ViewStyle>;
    /**
     * @language zh-CN
     * @description 样式
     * @defaultValue false
     */
    /**
     * @language en-US
     * @description style
     * @defaultValue undefined
     */
    style?: StyleProp<ViewStyle>;
  }

  export interface AlarmSwitchProps {
    /**
     * @language zh-CN
     * @description 语言环境
     * @defaultValue ''
     */
    /**
     * @language en-US
     * @description language
     * @defaultValue ''
     */
    language: string;
    /**
     * @language zh-CN
     * @description 初始化数据
     * @defaultValue ''
     */
    /**
     * @language en-US
     * @description initList
     * @defaultValue ''
     */
    initList?: any[];
    /**
     * @language zh-CN
     * @description 每项样式
     * @defaultValue ''
     */
    /**
     * @language en-US
     * @description itemStyle
     * @defaultValue ''
     */
    itemStyle?: TYListItemProps;
    /**
     * @language zh-CN
     * @description style
     * @defaultValue ''
     */
    /**
     * @language en-US
     * @description itemStyle
     * @defaultValue ''
     */
    style?: StyleProp<ViewStyle>;
  }

  export interface TemperatureScaleSwitchingProps {
    /**
     * @language zh-CN
     * @description 类型
     * @defaultValue 'checkBox'
     */
    /**
     * @language en-US
     * @description type
     * @defaultValue ''
     */
    type: 'checkBox' | 'list' | 'picker';
    /**
     * @language zh-CN
     * @description 标题
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
     * @description 样式
     * @defaultValue undefined
     */
    /**
     * @language en-US
     * @description style
     * @defaultValue undefined
     */
    style?: StyleProp<ViewStyle>;
    /**
     * @language zh-CN
     * @description code
     * @defaultValue undefined
     */
    /**
     * @language en-US
     * @description dpCode
     * @defaultValue undefined
     */
    dpCode?: string;
    /**
     * @language zh-CN
     * @description 是否展示icon
     * @defaultValue undefined
     */
    /**
     * @language en-US
     * @description showIcon
     * @defaultValue undefined
     */
    showIcon?: boolean;
    /**
     * @language zh-CN
     * @description schema
     * @defaultValue undefined
     */
    /**
     * @language en-US
     * @description schema
     * @defaultValue undefined
     */
    schema?: DpSchema;
    /**
     * @language zh-CN
     * @description 值
     * @defaultValue undefined
     */
    /**
     * @language en-US
     * @description value
     * @defaultValue undefined
     */
    value?: string;
    /**
     * @language zh-CN
     * @description 温度单位
     * @defaultValue undefined
     */
    /**
     * @language en-US
     * @description tempUnit
     * @defaultValue undefined
     */
    tempUnit?: string;
    /**
     * @language zh-CN
     * @description 下发dp回调
     * @defaultValue undefined
     */
    /**
     * @language en-US
     * @description putDp
     * @defaultValue undefined
     */
    putDp?: (dpInfo: Record<string, any>) => void;
    /**
     * @language zh-CN
     * @description checkBoxProps
     * @defaultValue undefined
     */
    /**
     * @language en-US
     * @description checkBoxProps
     * @defaultValue undefined
     */
    checkBoxProps?: TabBarProps & NewTabProps;
    /**
     * @language zh-CN
     * @description PopUpListProps
     * @defaultValue undefined
     */
    /**
     * @language en-US
     * @description PopUpListProps
     * @defaultValue undefined
     */
    listProps?: PopUpListProps;
    /**
     * @language zh-CN
     * @description PopupPickerProps
     * @defaultValue undefined
     */
    /**
     * @language en-US
     * @description PopupPickerProps
     * @defaultValue undefined
     */
    pickerProps?: PopupPickerProps;
  }

  export const MultiSlider: React.ComponentClass<MultiSliderProps>;
  export const Stepper: React.ComponentClass<StepperProps>;
  export const TabBar: React.ComponentClass<TabBarProps>;
  export const DpCacheText: React.ComponentClass<DpCacheTextProps>;
  export const ImageAnimate: React.ComponentClass<ImageAnimateProps>;
  export const SendEmail: React.ComponentClass<SendEmailProps>;
  export const WhiteSpace: React.ComponentClass<WhiteSpaceProps>;
  export const AlarmCloud: React.ComponentClass<AlarmCloudProps>;
  export const AlarmSwitch: React.ComponentClass<AlarmSwitch>;
  export const TemperatureScaleSwitching: React.ComponentClass<TemperatureScaleSwitchingProps>;
}
