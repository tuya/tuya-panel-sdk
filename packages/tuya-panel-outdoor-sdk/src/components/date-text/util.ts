import { IDate } from './interface';

export const FORMATS = 'dhms';

export const FORMATS_ARRAY = ['day', 'hour', 'minute', 'second'];

// 每天，每小时，每分 有多少秒
export const SECOND = 1;
export const MINUTE = 60;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;

/**
 * @title 创建IDate的工厂方法
 * @param day
 * @param hour
 * @param minute
 * @param second
 * @param status
 * @returns IDate
 */
export function IDataFactory(
  day: number,
  hour: number,
  minute: number,
  second: number,
  status: 'now' | 'after' | 'before'
): IDate {
  const data: IDate = {
    day,
    hour,
    minute,
    second,
    status,
  };
  return data;
}

/**
 * @title 解析输入为日期对象
 * @param dateObj
 * @returns 日期对象
 */
export function parseDate(dateObj: Date | number | string): Date {
  if (dateObj instanceof Date) {
    return dateObj;
  }
  if (typeof dateObj === 'number') {
    return new Date(dateObj);
  }
  // resolve the Invalid date
  const date = new Date(dateObj.replace(/-/g, '/'));
  return isNaN(date.getTime()) ? new Date() : date;
}

/**
 * @title 把秒解析成 IDate 对象
 * @param seconds
 */
export function parseSecondToDate(seconds: number): IDate {
  if (seconds === 0) {
    return IDataFactory(0, 0, 0, 0, 'now');
  }
  const status = seconds > 0 ? 'after' : 'before';
  let _time = Math.abs(seconds);
  let day = 0;
  let hour = 0;
  let minute = 0;
  const second = _time % MINUTE;
  if (_time >= DAY) {
    const rest = _time % DAY;
    day = (_time - rest) / DAY;
    _time = rest;
  }
  if (_time >= HOUR) {
    const rest = _time % HOUR;
    hour = (_time - rest) / HOUR;
    _time = rest;
  }
  if (_time >= MINUTE) {
    const rest = _time % MINUTE;
    minute = (_time - rest) / MINUTE;
    _time = rest;
  }
  return IDataFactory(day, hour, minute, second, status);
}
