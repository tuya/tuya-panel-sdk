import { StyleProp, ViewStyle, ImageStyle } from 'react-native';

export interface MainProps {
  /**
   * 组件样式
   */
  style?: StyleProp<ViewStyle>;
  /**
   * 搜索框样式
   */
  inputStyle?: StyleProp<ViewStyle>;
  /**
   * 搜索框搜索事件
   */
  onChange: (value: string) => void;
  /**
   * 是否显示重置按钮，默认不显示
   */
  allowClear?: boolean;
  /**
   * 搜索框placeholder
   */
  placeholder?: string;
  /**
   * 搜索框placeholder字体颜色
   */
  placeholderTextColor?: string;
  /**
   * 重置事件
   */
  onCancel?: (() => void) | null;
  /**
   * 是否显示搜索图标
   */
  showSearchIcon?: boolean;
  /**
   * 搜索图标样式
   */
  searchImageStyle?: ImageStyle;
  /**
   * 自定义图标
   */
  searchIcon?: string;
  /**
   * 搜索框默认值
   */
  defaultValue?: string;
  /**
   * 重置文案自定义，不超过12个字符
   */
  resetValue?: string;
  /**
   * 重置字体样式
   */
  resetTextStyle?: StyleProp<ViewStyle>;
  /**
   * 重置按钮样式
   */
  resetTouchableStyle?: StyleProp<ViewStyle>;
}
