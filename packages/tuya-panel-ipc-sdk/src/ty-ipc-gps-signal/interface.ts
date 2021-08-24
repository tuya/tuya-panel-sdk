import { ViewStyle, ImageStyle, StyleProp } from 'react-native';

export interface TYIpcGpsSignalProps {
  // 容器样式
  containerStyle: StyleProp<ViewStyle>;
  // Icon 图片样式
  imageStyle: StyleProp<ImageStyle>;
  // gps信号
  gpsSignal: number;
  // lte信号
  lteSignal: number;
}
