import { ViewStyle, TextStyle, ImageStyle } from 'react-native';

interface GridObj {
  key: string;
  imgSource?: number;
  imgTitle?: string;
  disabled?: boolean;
  hidden?: boolean;
  active?: boolean;
  [propName: string]: any;
}

export interface TYIpcGridProps {
  // 容器样式
  containerStyle: ViewStyle;
  // grid 数据
  data: Array<GridObj>;
  // 每行展示的数据
  rowNumber: number;
  // 菜单的边框宽度
  borderWidth: number;
  // 边框颜色
  borderColor: string;
  // 图标hover背景色
  hoverBgcColor: string;
  // 激活颜色
  activeColor: string;
  // onPress 事件
  onPress: (key: string, itemData?: any) => void;
  // onPressIn 事件
  onPressIn: (key: string, itemData?: any) => void;
  // onPressOut 事件
  onPressOut: (key: string, itemData?: any) => void;
  // ScrollView组件属性继承
  scrollProps: { [propName: string]: any };
  // 是否禁止滑动
  scrollEnabled: boolean;
  // grid图标垂直方向边距
  gridPaddingVertical: number;
  // gridMenuItemStyle 样式
  gridMenuItemStyle: ViewStyle;
  // 文本容器样式
  gridTextBoxStyle: ViewStyle;
  // 文本样式
  gridTextStyle: TextStyle;
  // 图标样式
  gridImgStyle: ImageStyle;
}
