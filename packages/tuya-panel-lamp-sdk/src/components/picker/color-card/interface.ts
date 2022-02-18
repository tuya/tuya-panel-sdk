import { StyleProp, ViewStyle } from 'react-native';
export interface ColourData {
  /**
   * 色调
   */
  hue: number;
  /**
   * 饱和度
   */
  saturation: number;
  /**
   * 明度
   */
  value: number;
  /**
   * 亮度
   */
  brightness: number;
  /**
   * 色温
   */
  temperature: number;
}
export interface brightOptionProps {
  /**
   * 滑块颜色
   */
  trackColor?: string;
  /**
   * 激活颜色
   */
  activeColor?: string;
  /**
   * 字体颜色
   */
  fontColor?: string;
}
export interface ColorCardsProps {
  /**
   * 总宽
   */
  width?: number;
  /**
   * 总高
   */
  height?: number;
  /**
   * 是否是彩光
   */
  isColour?: boolean;
  /**
   * 总样式
   */
  style?: StyleProp<ViewStyle>;
  /**
   * 整体透明度
   */
  opacityAnimationValue?: number;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 亮度条参数
   */
  brightOption?: brightOptionProps;
  /**
   * 列数
   */
  xNum?: number;
  /**
   * 行数
   */
  yNum?: number;
  /**
   * 值
   */
  value?: ColourData;
  /**
   * 开始滑动的事件
   * @param ColourData
   */
  onGrant?: (data: ColourData) => void;
  /**
   * 滑动中的事件
   * @param ColourData
   */
  onMove?: (data: ColourData) => void;
  /*
   * 滑动释放的事件
   * @param ColourData
   */
  onRelease?: (data: ColourData) => void;
  /**
   * 是否有边框
   */
  hasBorder?: boolean;
  /**
   * 边框颜色
   */
  borderColor?: string;
  /**
   * 边框宽度
   */
  borderWidth?: number;
  /**
   * 是否隐藏亮度条
   */
  hideBright?: boolean;
  /**
   * 颜色配置项
   */
  colors?: Array<ColourData>;
  /**
   * 选中区间的边框
   */
  innerBorder?: number;
  /**
   * 选中区间的圆角
   */
  innerRadius?: number;
  /**
   * 选中区间的样式
   */
  innerStyle?: StyleProp<ViewStyle>;
  /**
   * 整体的圆角
   */
  outerRadius?: number;
}
