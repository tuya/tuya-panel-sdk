import { TextProps } from 'react-native';

export interface DateTextProps extends TextProps {
  // 日期对象、数字（时间戳）、字符串如 2021-09-01 或者2021/09/01
  date?: Date | number | string;

  // 日期基点，不传就是今天
  from?: Date | number | string;

  // 传入一段时间，单位秒，格式化时间
  time?: number;

  // 日时分秒 d h m s
  // 传入字符串 max1 就是取非空最高1位， max2就是非空最高两位
  // 默认值 max2 非空最高后两位
  format?: string;

  // 语言
  lang?: 'en' | 'zh';

  // 是否显示 时间前后
  tail?: boolean;

  // 是否有空格
  space?: boolean;
}

export interface IDate {
  day: number;
  hour: number;
  minute: number;
  second: number;
  status: 'before' | 'after' | 'now';
}
