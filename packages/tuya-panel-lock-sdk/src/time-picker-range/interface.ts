import { StyleProp, ViewStyle, TextStyle } from 'react-native';
export interface dateItem {
  beginTime?: number;
  endTime?: number;
}
export type timeItem = { hour: number; min: number; second: number };
export interface ruleProps {
  beginTime: (params: number) => void;
  endTime: (params: number) => void;
  [key: string]: (params: number) => void;
}
export interface TimePickerRangeProps {
  beginTime?: number;
  endTime?: number;
  beginTimeLabel?: string;
  endTimeLabel?: string;
  defaultBeginTime?: number;
  defaultEndTime?: number;
  isShowSecond?: boolean;
  hourLabel?: string;
  minutesLabel?: string;
  secondLabel?: string;
  disable?: boolean;
  placeholder?: string;
  toastText?: string;
  customOnClick?: (params: dateItem) => void;
  onTimeChange: (params: dateItem) => void;
  /**
   * @language zh-CN
   * @description 弹框标题
   * @defaultValue string
   */
  /**
   * @language en-US
   * @description modal title
   * @defaultValue string
   */
  title?: string;
  /**
   * @language zh-CN
   * @description 取消文案
   * @defaultValue "Cancel"
   */
  /**
   * @language en-US
   * @description Cancel Text
   * @defaultValue "Cancel"
   */
  cancelText?: string; // 取消文案
  /**
   * @language zh-CN
   * @description 确认文案
   * @defaultValue "Confirm"
   */
  /**
   * @language en-US
   * @description Confirm Text
   * @defaultValue "Confirm"
   */
  confirmText?: string; // 确定文案
  /**
   * @language zh-CN
   * @description Popup 头部标题样式
   * @types <a target="_blank" href="https://reactnative.dev/docs/text-style-props">StyleProp<TextStyle></a>
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Popup header title style
   * @types <a target="_blank" href="https://reactnative.dev/docs/text-style-props">StyleProp<TextStyle></a>
   * @defaultValue null
   */
  titleTextStyle?: StyleProp<TextStyle>;
  /**
   * @language zh-CN
   * @description Popup 头部样式
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Popup header style
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @defaultValue null
   */
  titleWrapperStyle?: StyleProp<ViewStyle>;
  timePickerStyle?: StyleProp<ViewStyle>;
  /**
   * @language zh-CN
   * @description 选项的文字颜色
   * @defaultValue '#cccccc'
   */
  /**
   * @language en-US
   * @description Text color for Item
   * @defaultValue '#cccccc'
   */
  itemTextColor?: string;
  /**
   * @language zh-CN
   * @description 选项选中的文字颜色
   * @defaultValue 'black'
   */
  /**
   * @language en-US
   * @description The color of the text selected
   * @defaultValue 'black'
   */
  pickerSelectedItemTextColor?: string;
  /**
   * @language zh-CN
   * @description 分割线颜色
   * @defaultValue '#cccccc'
   */
  /**
   * @language en-US
   * @description Divider color of the Picker option
   * @defaultValue '#cccccc'
   */
  dividerColor?: string;
  /**
   * @language zh-CN
   * @description 可视区域项目个数
   * @defaultValue 8
   */
  /**
   * @language en-US
   * @description The number of items in the visible area
   * @defaultValue 8
   */
  visibleItemCount?: number;
  /**
   * @language zh-CN
   * @description 项目文字大小
   * @defaultValue 20
   */
  /**
   * @language en-US
   * @description Text size of items
   * @defaultValue 20
   */
  textSize?: number;
  /**
   * @language zh-CN
   * @description 项目对齐方式
   * @defaultValue 'center'
   */
  /**
   * @language en-US
   * @description Alignment method of items
   * @defaultValue 'center'
   */
  itemAlign?: 'flex-end' | 'center' | 'flex-start' | 'baseline' | 'stretch';
  /**
   * @language zh-CN
   * @description 容器样式
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Container style
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @defaultValue null
   */
  style?: StyleProp<ViewStyle>;
}
export interface TimePickerProp {
  disabled?: boolean;
  prefixPositionEnd?: string;
  prefix?: string;
  loop?: boolean;
  isShowSecond?: boolean;
  hour: number;
  minutes: number;
  second?: number;
  hourLabel?: string;
  minutesLabel?: string;
  secondLabel?: string;
  onTimeChange: (params: timeItem) => void;
  /**
   * @language zh-CN
   * @description 选项的文字颜色
   * @defaultValue '#cccccc'
   */
  /**
   * @language en-US
   * @description Text color for Item
   * @defaultValue '#cccccc'
   */
  itemTextColor?: string;
  /**
   * @language zh-CN
   * @description 选项选中的文字颜色
   * @defaultValue 'black'
   */
  /**
   * @language en-US
   * @description The color of the text selected
   * @defaultValue 'black'
   */
  selectedItemTextColor?: string;
  /**
   * @language zh-CN
   * @description 分割线颜色
   * @defaultValue '#cccccc'
   */
  /**
   * @language en-US
   * @description Divider color of the Picker option
   * @defaultValue '#cccccc'
   */
  dividerColor?: string;
  /**
   * @language zh-CN
   * @description 可视区域项目个数
   * @defaultValue 8
   */
  /**
   * @language en-US
   * @description The number of items in the visible area
   * @defaultValue 8
   */
  visibleItemCount?: number;
  /**
   * @language zh-CN
   * @description 项目文字大小
   * @defaultValue 20
   */
  /**
   * @language en-US
   * @description Text size of items
   * @defaultValue 20
   */
  textSize?: number;
  /**
   * @language zh-CN
   * @description 项目对齐方式
   * @defaultValue 'center'
   */
  /**
   * @language en-US
   * @description Alignment method of items
   * @defaultValue 'center'
   */
  itemAlign?: 'flex-end' | 'center' | 'flex-start' | 'baseline' | 'stretch';
  /**
   * @language zh-CN
   * @description 容器样式
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Container style
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @defaultValue null
   */
  timePickerStyle?: StyleProp<ViewStyle>;
}
