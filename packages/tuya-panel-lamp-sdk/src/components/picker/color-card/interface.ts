import { StyleProp, ViewStyle } from 'react-native';
export interface ColourData {
  hue: number;
  saturation: number;
  value: number;
}
export interface WhiteData {
  brightness: number;
  temperature: number;
}
export interface brightOptionProps {
  trackColor?: string;
  activeColor?: string;
  fontColor?: string;
}
export interface ColorCardsProps {
  /** 总宽 */
  width?: number;
  /** 总高 */
  height?: number;
  /** 总样式 */
  style?: StyleProp<ViewStyle>;
  /** 整体透明度 */
  opacityAnimationValue?: number;
  /** 是否禁用 */
  disabled?: boolean;
  /** 亮度条参数 */
  brightOption?: brightOptionProps;
  /** 列数 */
  xNum?: number;
  /** 行数 */
  yNum?: number;
  /* 值  */
  value?: ColourData | WhiteData;
  /* 开始滑动的事件  */
  onGrant?: (data: ColourData | WhiteData) => void;
  /* 滑动中的事件  */
  onMove?: (data: ColourData | WhiteData) => void;
  /* 滑动释放的事件  */
  onRelease?: (data: ColourData | WhiteData) => void;
  /* 是否有边框  */
  hasBorder?: boolean;
  /* 边框颜色  */
  borderColor?: string;
  /* 边框宽度  */
  borderWidth?: number;
  /* 是否隐藏亮度条  */
  hideBright?: boolean;
  /* 颜色配置项  */
  colors?: Array<ColourData>;
  /* 选中区间的边框  */
  innerBorder?: number;
  /* 选中区间的圆角  */
  innerRadius?: number;
  /* 选中区间的边框颜色  */
  innerBorderColor?: string;
  /* 选中区间的样式  */
  innerStyle?: StyleProp<ViewStyle>;
  /* 整体的圆角  */
  outerRadius?: number;
}
