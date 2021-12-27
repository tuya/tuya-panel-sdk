import { ReactNode } from 'react';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';

export interface buttonProps {
  label: string | number;
  style: StyleProp<ViewStyle>;
  isActive: boolean;
  textStyle: StyleProp<TextStyle>;
  activeTextStyle: StyleProp<TextStyle>;
  horizontal: boolean;
  onItemPress: () => void;
  icon?: ReactNode;
}

export interface RadioBUttonProps {
  /**
   * 是否水平显示，默认水平显示
   */
  horizontal?: boolean;
  /**
   * 数据源
   */
  dataSource: { label: string; value: string | number; unSelectedIcon?: ReactNode }[];
  /**
   * 每一项的样式，默认为{}
   */
  itemStyle?: StyleProp<ViewStyle>;
  /**
   * 值(受控)，默认为undefined
   */
  value?: string | number;
  /**
   *  默认值(非受控)，默认值为undefined
   */
  defaultValue?: string | number;
  /**
   * 禁用，默认为false
   */
  disabled?: boolean;
  /**
   * 禁用时的透明度，默认为0.6
   */
  disabledOpacity?: number;
  /**
   * 分割线，默认为true
   */
  divider?: boolean;
  /**
   * 分割线样式，默认为{}
   */
  dividerStyle?: StyleProp<ViewStyle>;
  /**
   * 容器样式，默认为{}
   */
  style?: StyleProp<ViewStyle>;
  /**
   * 选中项样式，默认为{}
   */
  activeItemStyle?: StyleProp<ViewStyle>;
  /**
   * 文字样式，默认为{}
   */
  textStyle?: StyleProp<TextStyle>;
  /**
   * 选中项的文字样式，默认为{}
   */
  activeTextStyle?: StyleProp<TextStyle>;
  /**
   * 切换时回调，默认为()=>{}
   */
  onChange: (value: string | number) => void;
}
