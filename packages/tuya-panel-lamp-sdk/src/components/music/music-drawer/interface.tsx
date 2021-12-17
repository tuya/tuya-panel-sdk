import { ReactNode } from 'react';
import { ImageSourcePropType, StyleProp, ViewStyle, ImageStyle, TextStyle } from 'react-native';

export interface RightIconSource {
  startIcon?: ImageSourcePropType;
  stopIcon?: ImageSourcePropType;
  normalIcon?: ImageSourcePropType;
}
export interface DrawerData {
  id: string;
  leftIconSource?: ImageSourcePropType;
  rightIconSource?: RightIconSource;
  title: string;
  subTitle?: string;
  //  默认高度 不传就是自适应
  // defaultHeight?: number;
}
export interface StylesData {
  // 容器样式
  containerStyle?: StyleProp<ViewStyle>;
  // 内容样式
  contentStyle?: StyleProp<ViewStyle>;
  // 标题样式
  titleStyle?: StyleProp<TextStyle>;
  // 副标题样式
  subTitleStyle?: StyleProp<TextStyle>;
  // 左侧icon样式
  leftIconStyle?: StyleProp<ImageStyle>;
  // 右侧icon样式
  rightIconStyle?: StyleProp<ImageStyle>;
  // 左侧icon容器样式
  leftIconBoxStyle?: StyleProp<ViewStyle>;
  // 右侧icon容器样式
  rightIconBoxStyle?: StyleProp<ViewStyle>;
}
export interface DrawerProps {
  // 默认高度
  height: number;
  // 总样式
  styles: StylesData;
  // 点击事件对应返回的key
  value: DrawerData[];
  // 默认第几个进行展开
  activeIndex: number;
  // 点击事件
  onPress?: (data: DrawerData, index: number) => void;
  // 展开后的内容
  renderActiveContent: (val: string | number) => ReactNode;
  // 监听index改变事件
  onChangeIndex: (index: number) => void;
  // 动画过渡时间
  animateDuration?: number;
  // 动画过渡方式
  animateEasing?: 'linear' | 'bounce' | 'ease' | 'quad';
}
