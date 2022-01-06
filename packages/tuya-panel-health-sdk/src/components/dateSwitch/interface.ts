import { StyleProp, ViewStyle } from 'react-native';
import { Dayjs } from 'dayjs';
export type CalendarValue = number | string | Date | Dayjs;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export interface BaseDateSwitchProps {
  /**
   * 内容样式
   */
  style?: StyleProp<ViewStyle>;
  /**
   * @zh 日历组件值发生改变时的回调
   * @en Callback when the selected value changes
   */
  onChange?: (dateString: string, date: Dayjs) => void;
  /**
   * @zh 展示日期的格式，参考day.js
   * @en Date format, refer to day.js
   * @defaultValue YYYY-MM-DD
   */
  format?: string | ((value: Dayjs) => string);
  /**
   * @zh 默认日期
   * @en To set default date
   */
  defaultValue?: CalendarValue;
  /**
   * @zh 受控的值
   * @en To set date
   */
  value?: CalendarValue;
  children?: React.ReactNode;
}

// 周，月
export interface BaseRangeSwitchProps {
  /**
   * @zh 值发生改变时的回调
   * @en Callback when the selected value changes
   */
  onChange?: (dateString: string[], date: Dayjs[]) => void;
}

export type WeekSwitchProps = Omit<BaseDateSwitchProps, 'onChange'> & BaseRangeSwitchProps;

export type MonthSwitchProps = Omit<BaseDateSwitchProps, 'onChange'> & BaseRangeSwitchProps;
