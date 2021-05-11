import { TextStyle, ViewStyle } from 'react-native';

export interface TYIpcVideoBitProps {
  // 容器样式
  containerStyle: ViewStyle;
  // 文字背景样式
  bitTxtBoxStyle: ViewStyle;
  // 速率单位样式
  unitStyle: TextStyle;
  // 速率样式
  valueStyle: TextStyle;
  // 速率(自定义)
  bitValue: string | undefined;
  // 速率单位
  unit: string;
}
