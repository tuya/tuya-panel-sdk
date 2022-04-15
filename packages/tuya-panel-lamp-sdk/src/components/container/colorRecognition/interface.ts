import {
  StyleProp,
  ViewStyle,
  ImageSourcePropType,
  ImageStyle,
  TextStyle,
  ScrollViewProps,
} from 'react-native';

export interface ColorRecognitionProps {
  // 最外层容器样式
  mainStyle?: StyleProp<ViewStyle>;
  // 头部容器样式
  headerStyle?: StyleProp<ViewStyle>;
  // 头部图片地址
  source?: ImageSourcePropType;
  // 头部图片样式
  imageStyle?: StyleProp<ImageStyle>;
  // 头部列表数据源
  colorsData?: ColorsDataType[];
  // 颜色数组最外层容器样式
  colorStyle?: StyleProp<ViewStyle>;
  // 颜色数组item样式
  colorItemStyle?: StyleProp<ViewStyle>;
  // 文字
  text?: string;
  // 文字样式
  textStyle?: StyleProp<TextStyle>;
  // 变化方式数据源
  changeTypeDatas?: ChangeType[];
  // 激活的变化方式
  activeKey: number;
  flatListProps?: ScrollViewProps;
  activeItemStyle?: StyleProp<ViewStyle>;
  handlePress: (value: number) => void;
}

export interface ColorsDataType {
  color: string;
  pos: { left?: number; bottom?: number; right?: number; top?: number };
}

export interface ChangeType {
  key: number;
  index: number;
  value: string;
  title: string;
}
