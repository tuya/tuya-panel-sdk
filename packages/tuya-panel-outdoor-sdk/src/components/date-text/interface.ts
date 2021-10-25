import { TextProps } from 'react-native';

export type I18nData = {
  en?: Record<string, string>;
  zh?: Record<string, string>;
};
export interface DateTextProps extends TextProps {
  // 日期对象、数字（时间戳）、字符串如 2021-09-01 或者2021/09/01
  date?: Date | number | string;

  // 日期基点，不传就是今天
  from?: Date | number | string;

  // 传入一段时间，单位秒，格式化时间
  time?: number;

  // 日时分秒 d h m s
  // 字符串 max1 非空最高1位、max2非空最高两位、hasValue有值的所有位
  // [default] max2
  format?: string;

  // 如果是0秒怎么处理，默认true处理就是现在，否则是不处理，显示0秒
  parseNow?: boolean;

  // 语言
  lang?: 'en' | 'zh';

  // 是否显示 时间前后
  tail?: boolean;

  // 是否有空格
  space?: boolean;

  // 自定义的国际化数据,如果有则优先使用
  i18nData?: I18nData;
}

export interface IDate {
  day: number;
  hour: number;
  minute: number;
  second: number;
  status: 'before' | 'after' | 'now';
}
