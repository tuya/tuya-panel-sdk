import { ReactNode } from 'react';
import { StyleProp, ViewStyle, ImageSourcePropType, ImageStyle } from 'react-native';

export interface BottomBarProps {
  // 外层容器样式
  contentStyle?: StyleProp<ViewStyle>;
  // item样式
  itemStyle?: StyleProp<ViewStyle>;
  // item点击容器样式
  touchStyle?: StyleProp<ViewStyle>;
  // icon样式
  imageStyle?: StyleProp<ImageStyle>;
  // 渲染列表数据源
  data?: DataType[];
  // 激活item项
  activeMode: string;
  // 激活item颜色
  activeColor?: string;
  // 未激活item颜色
  color?: string;
  // item点击事件
  handlePress: (item: DataType) => void;
}

export interface DataType {
  key: string;
  title?: string;
  isSupport: boolean;
  source: ImageSourcePropType;
  renderContent?: ReactNode;
}
