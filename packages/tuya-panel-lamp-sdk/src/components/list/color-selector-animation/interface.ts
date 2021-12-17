import { StyleProp, ViewStyle } from 'react-native';
export interface IColorSelectorAnimationProp {
  /**
   * 是否展示添加按钮
   */
  showAdd?: boolean;
  /**
   * 是否展示删除按钮
   */
  showDel?: boolean;
  /**
   * 颜色列表
   */
  data?: IColor[];
  /**
   * 当前选中的颜色下标
   */
  selectIndex: number;
  /**
   * 最外层容器样式
   */
  style?: StyleProp<ViewStyle>;
  /**
   * 颜色按钮样式
   */
  btnStyle?: StyleProp<ViewStyle>;
  /**
   * 选中的颜色按钮样式
   */
  activeStyle?: StyleProp<ViewStyle>;
  /**
   * 新增按钮样式
   */
  addBtnStyle?: StyleProp<ViewStyle>;
  /**
   * 删除按钮样式
   */
  delBtnStyle?: StyleProp<ViewStyle>;
  /**
   * 新增按钮图标颜色
   */
  addIconColor?: string;
  /**
   * 删除按钮图标颜色
   */
  delIconColor?: string;
  /**
   * 点击缩放大小
   */
  scaleValue?: number;
  /**
   * 新增按钮点击事件
   */
  onAdd?: () => void;
  /**
   * 删除按钮点击事件
   */
  onDel?: (i: number) => void;
  /**
   * 颜色按钮点击事件
   */
  onSelect?: (index: number) => void;
  /**
   * 是否换行
   */
  noWrap?: boolean;
  /**
   * 内容是否可滚动
   */
  scrollEnabled?: boolean;
  /**
   * 列表滚动颜色过多时,为了使添加按钮保持原位，需要设置x的偏移值(颜色按钮宽度加margin值)
   */
  left?: number;
}

export interface IColor {
  // 是否彩光
  isColour: boolean;
  hue?: number;
  saturation?: number;
  value?: number;
  brightness?: number;
  temperature?: number;
}

export interface ICircle {
  scaleValue: number;
  backgroundColor: string;
}
