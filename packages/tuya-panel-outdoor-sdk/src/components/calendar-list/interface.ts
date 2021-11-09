import { StyleProp, TextStyle } from 'react-native';
export interface FullDate {
  year: number;
  month: number;
  day: number;
  weekday: number;
  dateStr: string;
  thisMonth: boolean;
}

export type I18nData = {
  en?: Record<string, string | Array<string>>;
  zh?: Record<string, string | Array<string>>;
};

export interface CalendarListProps {
  // 前边显示多少个月，默认显示4个月，最多40个月
  prev?: number;
  // 后边显示多少个月，默认显示4个月，最多40个月
  next?: number;
  // 语言，默认 en
  lang?: string;
  // 用户选择的当前日期
  current: string;
  // 渲染某一天的方法
  renderDay?: (d: FullDate) => React.ReactNode;
  // 渲染头部
  renderTitle?: () => React.ReactNode;
  // 点击某一天
  pressDay?: (d: FullDate) => void;
  // 点击某一天的回调
  onChange?: (d: FullDate) => void;
  // 自定义的国际化数据,如果有则优先使用
  i18nData?: I18nData;
  // 未来的日期样式
  futureTextStyle?: StyleProp<TextStyle>;
}
