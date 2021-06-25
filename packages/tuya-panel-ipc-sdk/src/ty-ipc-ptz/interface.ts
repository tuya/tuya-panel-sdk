import { ViewStyle } from 'react-native';

export interface TYIpcPtzProps {
  // 是否禁用
  disabled: boolean;
  // ptz宽度
  pieWidth: number;
  // ptz高度
  pieHeight: number;
  // 主题色
  themeType: 'light' | 'dark';
  // 容器样式
  containerStyle: ViewStyle;
  // 点击函数
  pressIn?: (index: number) => void;
  // 离开函数
  pressOut?: (index) => void;
  // 激活键颜色
  activeColor: string;
  // 是否有上方向点
  hasPtzUp: boolean;
  // 是否有下方向点
  hasPtzDown: boolean;
  // 是否有左方向点
  hasPtzLeft: boolean;
  // 是否有右方向点
  hasPtzRight: boolean;
}
