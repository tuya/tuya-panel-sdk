import { FullDate } from './interface';
/**
 * @title 返回某个月有多少天
 * @param year
 * @param month 输入范围【0-11]
 * @returns 28~31
 */
export function getMonthDays(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

/**
 * @title 返回年月日是星期几
 * @param year
 * @param month 输入范围【0-11]
 * @param day
 * @returns 0~6，表示星期日-星期六
 */
export function getWeekday(year: number, month: number, day: number): number {
  return new Date(year, month, day).getDay();
}

/**
 * @title 格式化年月日为字符串
 * @param year eg 2021
 * @param month eg 9
 * @param day eg 1
 * @returns eg 2021/09/01
 */
export function getDateStr(year: number, month: number, day: number): string {
  let res = `${year}/`;
  res += `${month < 10 ? '0' : ''}${month}/`;
  res += `${day < 10 ? '0' : ''}${day}`;
  return res;
}

/**
 * @title 计算 dateStr 距离 targetStr 月的偏移，比如 2021/09/01 2021/08/01 就是 1
 * @param dateStr
 * @param targetStr
 */
export function calculateOffset(dateStr: string, targetStr: string): number {
  const date1 = new Date(dateStr);
  const year1 = date1.getFullYear();
  const month1 = date1.getMonth();
  const date2 = new Date(targetStr);
  const year2 = date2.getFullYear();
  const month2 = date2.getMonth();
  const r = (year1 - year2) * 12 + month1 - month2;
  return r;
}

/**
 * @title 获取某个年月偏移某几个月之后的日期
 * @param year
 * @param month 0 ~ 11
 * @param diff 负数表示前边几个月，正数表示后边几个月
 * @returns eg[2021, 9]
 */
export function getYM(_year: number, _month: number, diff = 0): Array<number> {
  let year = _year;
  let month = _month;
  if (diff === 0) {
    return [year, month];
  }
  const months = month + diff;
  const m = months % 12;
  const y = (months - m) / 12;
  year += y;
  if (diff > 0) {
    month = m;
    return [year, month];
  }
  if (diff < 0) {
    if (m < 0) {
      year--;
      month = 12 + m;
    }
    if (m >= 0) {
      month = m;
    }
  }
  return [year, month];
}

/**
 * @title 输入年月和偏移，返回这个月的日历
 * @param y 2021
 * @param m
 * @param diff 正数表示后边的月，负数表示前边的月
 * @returns [FullDate]
 */
export function getMonthDaysArray(y: number, m: number, diff = 0): Array<FullDate> {
  const [year, month] = getYM(y, m, diff);
  // 一整个月的日期（包括前个月和下个月的日期）
  const dayArrays: Array<FullDate> = [];
  const days = getMonthDays(year, month);
  const preDays = getMonthDays(year, month - 1);

  // 这个月第一天是星期几
  const firstWeekDay = getWeekday(year, month, 1);
  // 这个月最后一天是星期几
  const lastWeekDay = getWeekday(year, month, days);

  // 上月在当月日历面板中的排列
  for (let i = 0; i < firstWeekDay; i++) {
    const day = preDays - firstWeekDay + i + 1;
    dayArrays.push({
      day,
      weekday: i,
      year,
      month: month - 1,
      dateStr: getDateStr(year, month, day),
      thisMonth: false,
    } as FullDate);
  }

  // 当月日历面板中的排列
  for (let i = 1; i <= days; i++) {
    const weekday = (firstWeekDay + i - 1) % 7;
    dayArrays.push({
      day: i,
      weekday,
      year,
      month,
      dateStr: getDateStr(year, month + 1, i),
      thisMonth: true,
    } as FullDate);
  }

  // 下月在当月日历面板中的排列
  for (let i = 1; i <= 6 - lastWeekDay; i++) {
    const weekday = (firstWeekDay + days + i - 1) % 7;
    dayArrays.push({
      day: i,
      weekday,
      year,
      month: month + 1,
      dateStr: getDateStr(year, month + 2, i),
      thisMonth: false,
    } as FullDate);
  }
  return dayArrays;
}
