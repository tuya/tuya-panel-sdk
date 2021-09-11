import { ViewStyle, StyleProp } from 'react-native';

export interface TYIpcLoadingProps {
  // 是否展示
  show: boolean;
  // 是否完成
  showComplete: boolean;
  // 加载点的个数
  itemNum: number;
  // 动画速度
  loadSpeed: number;
  // 加载完成
  onComplete: () => void;
  // 顺序颜色
  sequenceColor: string;
  // 完成颜色
  completeColor: string;
  // 加载点大小
  dotSize: number;
  // 容器样式
  containerStyle: StyleProp<ViewStyle>;
}
