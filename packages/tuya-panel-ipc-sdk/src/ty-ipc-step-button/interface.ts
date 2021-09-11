import { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

interface stepButtonProps {
  // 边界最小值
  min: number;
  // 边界最大值
  max: number;
  // 每次增减数值
  step: number;
  // 初始值
  initialValue: number;
  // 减按钮
  reduceButton: ReactNode;
  // 加按钮
  addButton: ReactNode;
  // 计数单位
  unit: string;
  // 副单位
  subUnit: string;
  // 长按增减速度，单位：s
  speed: number;
  // 数值变化
  onValueChange: (value: number) => void;
  // 容器样式
  containerStyle: StyleProp<ViewStyle>;
  // 数值样式
  numStyle: StyleProp<ViewStyle>;
  // 单位样式
  unitStyle: StyleProp<ViewStyle>;
  // 副单位样式
  subUnitStyle: StyleProp<ViewStyle>;
}

// step bar

export default stepButtonProps;
