import { StyleProp, ViewStyle } from 'react-native';

export interface ColorDataType {
  color: string;
  percent?: number;
}

export type ColorType = string | ColorDataType;

export interface ColorDiskProps {
  style?: StyleProp<ViewStyle>;
  radius: number;
  startAngle?: number;
  colors: ColorType[];
}
