import { StyleProp, ViewStyle, ColorPropType, ImageStyle } from 'react-native';
export interface DatePickerViewProps {
  /**
   * @language zh-CN
   * @description 开始时间标签
   * @defaultValue string
   */
  /**
   * @language en-US
   * @description startLabel label
   * @defaultValue string
   */
  startLabel?: string;
  /**
   * @language zh-CN
   * @description 结束时间标签
   * @defaultValue string
   */
  /**
   * @language en-US
   * @description endLabel label
   * @defaultValue string
   */
  endLabel?: string;
  /**
   * @language zh-CN
   * @description 开始时间
   * @defaultValue string
   */
  /**
   * @language en-US
   * @description startDate
   * @defaultValue string
   */
  startDate: string;
  /**
   * @language zh-CN
   * @description 结束时间
   * @defaultValue string
   */
  /**
   * @language en-US
   * @description endDate
   * @defaultValue string
   */
  endDate: string;
  /**
   * @language zh-CN
   * @description 模式
   * @defaultValue string
   */
  /**
   * @language en-US
   * @description mode
   * @defaultValue string
   */
  mode?: string;
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
   * @description 占位文案
   * @defaultValue "请选择"
   */
  /**
   * @language en-US
   * @description placeholder Text
   * @defaultValue "请选择"
   */
  placeholder?: string; //
  /**
   * @language zh-CN
   * @description 开始时间提示
   * @defaultValue string
   */
  /**
   * @language en-US
   * @description start date tip
   * @defaultValue string
   */
  startDateTip?: string;
  /**
   * @language zh-CN
   * @description 时间范围限度提示
   * @defaultValue string
   */
  /**
   * @language en-US
   * @description date limit tip
   * @defaultValue string
   */
  dateLimitTip?: string;
  /**
   * @language zh-CN
   * @description modal 弹出内容的样式
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Content style of modal pop-up
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @defaultValue null
   */
  modalChildStyle?: StyleProp<ViewStyle>;
  /**
   * @language zh-CN
   * @description 是否有遮罩层
   * @defaultValue true
   */
  /**
   * @language en-US
   * @description Whether there is a mask layer
   * @defaultValue true
   */
  mask?: boolean;
  /**
   * @language zh-CN
   * @description 遮罩层样式
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @defaultValue null
   */
  /**
   * @language en-US
   * @description Style of the mask layer
   * @types <a target='_blank' href='https://reactnative.dev/docs/view-style-props'>StyleProp<ViewStyle></a>
   * @defaultValue null
   */
  maskStyle?: StyleProp<ViewStyle>;
  /**
   * @language zh-CN
   * @description modal出现的动画效果
   * @defaultValue 'fade
   */
  /**
   * @language en-US
   * @description The animation effect of the mask
   * @defaultValue 'fade'
   */
  animationType?: 'fade' | 'none';
  /**
   * @language zh-CN
   * @description modal默认出现的位置
   * @defaultValue 'bottom'
   */
  /**
   * @language en-US
   * @description The default position of the mask
   * @defaultValue 'bottom'
   */
  alignContainer?: 'top' | 'center' | 'bottom';
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
   * @description 时间变化回调
   * @defaultValue () => {}
   */
  /**
   * @language en-US
   * @description Callback of date change
   * @defaultValue () => {}
   */
  onDateChange: ({ startDate, endDate }: { startDate: any; endDate: any }) => void;
}
export interface DatePickerViewState {
  /**
   * @language zh-CN
   * @description 是否显示内容
   * @defaultValue false
   */
  /**
   * @language en-US
   * @description Display content?
   * @defaultValue false
   */
  visible: boolean;
  /**
   * @language zh-CN
   * @description 占位文案
   * @defaultValue "请选择"
   */
  /**
   * @language en-US
   * @description placeholder Text
   * @defaultValue "请选择"
   */
  placeholder?: string; //
  /**
   * @language zh-CN
   * @description 占位文案
   * @defaultValue "请选择"
   */
  /**
   * @language en-US
   * @description placeholder Text
   * @defaultValue "请选择"
   */
  currentOperationIndex: number; //
  dateRange?: [Date | string, Date | string]; // 时间范围
  startDate?: Date | string; // 开始时间
  endDate?: Date | string; // 结束时间
  currentDate: Date;
  maxDate: Date;
  minDate: Date;
}
export interface NextProps {
  startDate?: Date | string;
  endDate?: Date | string;
}
export type dateString = string | number;
