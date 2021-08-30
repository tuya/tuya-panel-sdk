import { StyleProp, ViewStyle, TextStyle } from 'react-native';
export interface weekItem {
  key: number;
  text: string;
  choice: boolean;
  type?: string;
  style: StyleProp<ViewStyle>;
  textStyle: StyleProp<TextStyle>;
  onPress: () => void;
}
export interface WeekSelectionProps {
  /**
   * @language zh-CN
   * @description 主题颜色
   * @defaultValue '#338CE5'
   */
  /**
   * @language en-US
   * @description theme Color
   * @defaultValue '#338CE5',
   */
  themeColor?: string;
  /**
   * @language zh-CN
   * @description 默认颜色
   * @defaultValue '#DdDdD6'
   */
  /**
   * @language en-US
   * @description default Color
   * @defaultValue '#D6D6D6',
   */
  defaultColor?: string;
  /**
   * @language zh-CN
   * @description 点击回调
   * @defaultValue
   */
  /**
   * @language en-US
   * @description click callback
   * @defaultValue ,
   */
  onWeekChange: (params: string) => void;
  /**
   * @language zh-CN
   * @description 选中的周期
   * @defaultValue
   */
  /**
   * @language en-US
   * @description selected week
   * @defaultValue
   */
  weekDay: string;
  /**
   * @language zh-CN
   * @description 是否禁止选择
   * @defaultValue
   */
  /**
   * @language en-US
   * @description disabled selected week
   * @defaultValue
   */
  disable?: boolean;
  /**
   * @language zh-CN
   * @description 选中样式
   * @defaultValue 'null'
   */
  /**
   * @language en-US
   * @description selected styles
   * @defaultValue 'null'
   */
  selectedWeekStyle?: StyleProp<ViewStyle>;
  /**
   * @language zh-CN
   * @description 组件样式
   * @defaultValue 'null'
   */
  /**
   * @language en-US
   * @description component styles
   * @defaultValue 'null'
   */
  style?: StyleProp<ViewStyle>;
  /**
   * @language zh-CN
   * @description 周期样式
   * @defaultValue 'null'
   */
  /**
   * @language en-US
   * @description week styles
   * @defaultValue 'null'
   */
  weekStyle?: StyleProp<ViewStyle>;
  /**
   * @language zh-CN
   * @description 选中文字样式
   * @defaultValue 'null'
   */
  /**
   * @language en-US
   * @description selected text styles
   * @defaultValue 'null'
   */
  selectedWeekTextStyle?: StyleProp<TextStyle>;
  /**
   * @language zh-CN
   * @description 默认文字样式
   * @defaultValue 'null'
   */
  /**
   * @language en-US
   * @description default text styles
   * @defaultValue 'null'
   */
  weekTextStyle?: StyleProp<TextStyle>;
  /**
   * @language zh-CN
   * @description 周期排序
   * @defaultValue 0
   */
  /**
   * @language en-US
   * @description first week day
   * @defaultValue 'null'
   */
  defaultFirstDay?: number;
}
