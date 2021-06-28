import { TextStyle, ViewStyle, ImageStyle } from 'react-native';

export interface TYIpcProgressBarProps {
  // 滑动值变更回调
  onValueChange?: (value: number, key: string) => void;
  // 滑动结束回调
  onSlidingComplete?: (value: number, key: string) => void;
  // 滑动条数据
  barData: BarDataProps;
  // 容器样式
  containerStyle: ViewStyle;
  // 滑动条容器样式
  barContainStyle: ViewStyle;
  // 滑动标题容器样式
  iconTitleBoxStyle: ViewStyle;
  // 滑动标题文本样式
  iconTitleTextStyle: TextStyle;
  // 滑动标题图片样式
  iconImageStyle: ImageStyle;
  // 百分比或自定义容器样式
  percentUnitBoxStyle: ViewStyle;
  // 百分比或自定义文本样式
  unitTextStyle: TextStyle;
  // 自定义单位图片容器样式
  customUnitImageBoxStyle: ViewStyle;
  // 自定义单位图片样式
  customUnitImageStyle: ImageStyle;
  // 默认数值文本容器样式
  noPrecentBoxStyle: ViewStyle;
  // 默认数值文本样式
  noPrecentTextStyle: TextStyle;
  // 滑动条样式
  sliderStyle: ViewStyle;
  // 继承基础组件Slider属性
  sliderProperty: SliderProps;
};


interface BarDataProps {
  // 自定义key值
  key: string;
  // 当前显示值
  value: number;
  // 最小值
  min: number;
  // 最大值
  max: number;
  // 是否禁用
  disabled?: boolean;
  // 大于当前值颜色
  maxColor?: string;
  // 小于当前值颜色
  minColor?: string;
  // 单位百分比
  showPercentUnit?: boolean;
  // 自定义单位
  customUnitText?: string;
  // 自定义单位图标
  customUnitImage?: number;
  // 标题文本
  iconTitle?: string;
  // 标题图片
  iconImage?: number;
  // 无标题
  noTitle?: boolean | undefined;
  // 无单位
  noUnit?: boolean | undefined;
}

interface SliderProps {
  [propName: string]: any;
}

