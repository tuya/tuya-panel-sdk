import { ReactNode } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
export interface CountdownProps {
  navigation: any;
  route: { params: ParamsType };
}
export interface ParamsType {
  /**
   * 当前剩余倒计时
   */
  countdown: number;
  /**
   * 渲染topBar方法
   */
  renderHeader: () => ReactNode | undefined;
  /**
   * 开灯倒计时文本
   */
  onCountdownText: string;
  /**
   * 关灯倒计时文本
   */
  offCountdownText: string;
  /**
   * 保存函数
   */
  onSave: (time: number) => void;
  /**
   * 页面背景颜色
   */
  background: string;
  /**
   * hour文本
   */
  hourLabel: string;
  /**
   * minute文本
   */
  minuteLabel: string;
  /**
   * second文本
   */
  secondLabel: string;
  /**
   * 确认按钮样式
   */
  confirmButtonStyle: StyleProp<ViewStyle>;
  /**
   * 确认文本
   */
  confirmText: string;
  /**
   * 确认文本样式
   */
  confirmTextStyle: StyleProp<TextStyle>;
  /**
   * 取消按钮样式
   */
  cancelButtonStyle: StyleProp<ViewStyle>;
  /**
   * 取消文本
   */
  cancelText: string;
  /**
   * 取消文本样式
   */
  cancelTextStyle: StyleProp<TextStyle>; // 取消文本样式
  /**
   * clock
   */
  clock: ClockProps;
  /**
   * picker
   */
  picker: PickerProps;
}
export interface PickerProps {
  /**
   * 小时
   */
  hourLabel: string;
  /**
   * 分钟
   */
  minuteLabel: string;
  /**
   * 秒
   */
  secondLabel: string;
  /**
   * 时间文本颜色
   */
  timeTextColor: string;
  /**
   * 时间文本字体大小
   */
  timeTextSize: number;
  /**
   * 时间单位文本字体大小
   */
  unitTextStyle?: StyleProp<TextStyle>;
  /**
   * 时间
   */
  time: number;
  /**
   * 是否显示秒
   */
  isShowSecond: boolean;
  /**
   * 时间选择器改变回调
   */
  onChange?: (value: number) => void;
}
export interface ClockProps {
  /**
   * 小时
   */
  hourLabel: string;
  /**
   * 分钟
   */
  minuteLabel: string;
  /**
   * 秒
   */
  secondLabel: string;
  /**
   * 当前剩余倒计时
   */
  countdown: number;
  /**
   * 总倒计时
   */
  totalCountDown: number;
  /**
   * 重置倒计时回调事件
   */
  onReset: () => void;
  /**
   * 取消倒计时回调事件
   */
  onCancel: () => void;
  /**
   * clock圈内背景色
   */
  innerBackgroundColor: string;
  /**
   * 当倒计时小于一小时，clock中是否显示小时数
   */
  isShowHour: boolean;
  /**
   * 时间文本样式
   */
  timeTextStyle: any;
  /**
   * 时分秒文本样式
   */
  unitTextStyle?: StyleProp<TextStyle>;
  /**
   * 已消耗指针的颜色
   */
  lineColor: string;
  /**
   * 剩余指针的颜色
   */
  activeColor: string;
  /**
   * clock外圈指针高度
   */
  lineHeight: number;
  /**
   * clock外圈指针宽度
   */
  lineWidth: number;
  /**
   * clock大小
   */
  size: number;
  /**
   * clock外圈指针书数量
   */
  lineNum: number;
  /**
   * 重置文本
   */
  resetText: string;
  /**
   * 重置样式
   */
  resetStyle: StyleProp<ViewStyle>;
  /**
   * 重置文本样式
   */
  resetTextStyle: StyleProp<TextStyle>;
}
