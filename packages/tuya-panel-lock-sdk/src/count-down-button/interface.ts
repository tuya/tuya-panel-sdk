import { ViewStyle, TextStyle } from 'react-native';

export interface CountDownBtnProps {
  /**
   * @language zh-CN
   * @description 按压事件
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description onPress function
   * @defaultValue undefined
   */
  onPress?: () => void;
  /**
   * @language zh-CN
   * @description 倒计时结束触发闲置事件
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description it will be triggered when countdown end
   * @defaultValue undefined
   */
  onIdleEndCallBack?: () => void;
  /**
   * @language zh-CN
   * @description 样式
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description style
   * @defaultValue undefined
   */
  style?: ViewStyle;
  /**
   * @language zh-CN
   * @description 文字样式
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description text style
   * @defaultValue undefined
   */
  textStyle?: TextStyle;
  /**
   * @language zh-CN
   * @description 按钮文案
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description button's text
   * @defaultValue undefined
   */
  btnText?: string;
  /**
   * @language zh-CN
   * @description 自定义倒计时文案
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description custom text of countdown
   * @defaultValue undefined
   */
  customCountDownText?: (n: number) => string;
  /**
   * @language zh-CN
   * @description 倒计时数
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description the number of countdown
   * @defaultValue undefined
   */
  countDownNumber?: number;
  /**
   * @language zh-CN
   * @description 倒计时变化事件
   * @defaultValue undefined
   */
  /**
   * @language en-US
   * @description contdown change
   * @defaultValue undefined
   */
  onCountChange?: (c: number, timer: Timer) => void;
}

export type Timer = {
  reStart: () => void;
  stop: () => void;
  refresh: () => void;
  isEnd: () => boolean;
};
export type CountDownTimerReturn = [number, Timer];
export type CountDownTimerType = (num: number) => CountDownTimerReturn;
