import { TextStyle, ViewStyle } from 'react-native';

export interface TYIpcTimeIntervalProps {
  // 开始计时时间(单位s)
  startValue: number,
  // 容器样式
  containerStyle: ViewStyle;
  // 时间容器样式
  timerContainStyle: ViewStyle;
  // 圆点样式
  dotStyle: ViewStyle;
  // 时间文本样式
  textStyle: TextStyle;
}
