import { ViewStyle, TextStyle, StyleProp } from 'react-native';

export interface SingleTimePickerProps {
  is24Hour?: boolean; // 是否为24小时制
  hour: number; // 小时
  minute: number; // 分钟
  onChange?: (hour, minute) => void; // 改变值时执行此回调 ({ hour, minute }) => void
  itemTextColor?: string; // Picker选项的文字颜色
  selectedItemTextColor?: string; // Picker选项选中的文字颜色
  dividerColor?: string; // Picker选项分割线颜色
  visibleItemCount?: number; // Picker可视区域项目个数
  itemAlign?: 'center' | 'flex-start' | 'flex-end' | 'stretch' | 'baseline'; // Picker项目对齐方式
  textSize?: number; // Picker项目文字大小
  loop?: boolean; // 是否循环滚动
  containerStyle?: StyleProp<ViewStyle>; // 容器样式
  itemStyle?: StyleProp<TextStyle>; // Picker文字样式
  pickerStyle?: StyleProp<ViewStyle>; // Picker样式
  hourPickerStyle?: StyleProp<ViewStyle>; // 小时列Picker样式
  minutePickerStyle?: StyleProp<ViewStyle>; // 分钟列Picker样式
  amPmPickerStyle?: StyleProp<ViewStyle>; // 前缀列Picker样式
  amText?: string; // 前缀字符上午
  pmText?: string; // 前缀字符下午
  prefixPosition?: 'left' | 'right'; // 前缀位置
}
