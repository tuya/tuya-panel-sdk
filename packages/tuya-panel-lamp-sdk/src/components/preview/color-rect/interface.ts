import { StyleProp, ViewStyle } from 'react-native';

export interface ColorDataType {
  color: string;
  percent: number;
}
export interface ColorData {
  color: string;
  startY: number;
  itemHeight: number;
}

export type ColorsType = Array<string | ColorDataType>;

export interface ColorProps {
  style?: StyleProp<ViewStyle>;
  /** 颜色(数组或没有percent按等分处理) */
  colors: ColorsType;
  activeOpacity?: number;
  onPress?: () => void;
}
