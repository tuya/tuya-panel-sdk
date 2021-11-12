/* eslint-disable dot-notation */
/**
 * @title 滑动日历组件
 */
import React, { PureComponent } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { getMonthDaysArray, getDateStr, calculateOffset } from './utils';
import I18N from './i18n';
import { FullDate, CalendarListProps } from './interface';

// 最大月数
const MAX_MONTH = 40;

// 缓存每个月的偏移
const MONTH_INDEX: Array<number> = [];

// 记录每个月有多少行数据
const MONTH_LINES: Array<number> = [];

let instance: CalendarList = null;

class CalendarList extends PureComponent<CalendarListProps, null> {
  constructor(props: CalendarListProps) {
    super(props);
    this.initData();
  }

  componentDidMount() {
    instance = this;
    const { current } = this.props;
    // 原因未知，直接滚动不行
    setTimeout(() => {
      this.scrollTo(current);
    }, 500);
  }

  static getDerivedStateFromProps(nextProps) {
    instance?.scrollTo(nextProps.current);
    return null;
  }

  // 返回具体语言的国际化数据
  get Lang() {
    const { lang, i18nData } = this.props;
    const la = lang || 'en';
    let useri18n = {};
    if (i18nData && i18nData[la]) {
      useri18n = i18nData[la];
    }
    return { ...useri18n, ...I18N[la] };
  }

  // 解析 prev
  get prev(): number {
    const pre = this.props.prev ?? 4;
    return pre > MAX_MONTH ? MAX_MONTH : pre;
  }

  // 解析 next
  get next(): number {
    const nex = this.props.next ?? 4;
    return nex > MAX_MONTH ? MAX_MONTH : nex;
  }

  // 根据传入的props生成待渲染的月份的索引值
  get month(): Array<number> {
    const months: Array<number> = [];
    for (let i = -this.prev; i <= this.next; i++) {
      months.push(i);
    }
    return months;
  }

  // 今天的日期对象
  today: FullDate;

  // 指向包裹日历的ScrollView的引用
  calendar: {
    current: ScrollView | null;
  };

  // 初始化数据
  initData() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const day = now.getDate();
    const weekday = now.getDay();
    this.today = {
      year,
      month,
      day,
      weekday,
      dateStr: getDateStr(year, month + 1, day),
      thisMonth: true,
    };
    this.calendar = React.createRef();
  }

  // 滑动到某个日期，让用户选择的日期可见
  scrollTo = (dateStr: string) => {
    const { prev, next } = this;
    // 计算第一个月，和传入日期的偏移
    let offset = calculateOffset(dateStr, this.today.dateStr);
    // 如果日期超了，就显示今天
    if (offset < -prev || offset > next) {
      offset = 0;
    }
    // 前边有几个月
    const boforeMonth = MONTH_INDEX.indexOf(offset);
    const titleHeight = 65;
    const gridHeight = 50;
    let scrollHeight = 0;
    for (let a = 0; a < MONTH_LINES.length; a++) {
      if (a < boforeMonth) {
        // 这个月的高度
        const monthHeight = titleHeight + MONTH_LINES[a] * gridHeight;
        scrollHeight += monthHeight;
      }
    }
    scrollHeight += titleHeight;

    const line = Math.ceil(new Date(dateStr).getDate() / 7) - 1;
    scrollHeight += line * gridHeight;
    this.calendar.current?.scrollTo({ x: 0, y: scrollHeight });
  };

  // 点击某一天
  pressDay = (e: FullDate) => {
    this.props?.onChange(e);
  };

  // 渲染某一天
  renderDay = (e: FullDate) => {
    const { pressDay, current } = this.props;
    const { year, month, day, dateStr } = this.today;
    const sameYear = e.year === year;
    const sameMonth = e.month === month;
    const isFuture =
      e.year > year || (sameYear && e.month > month) || (sameYear && sameMonth && e.day > day);
    const isToday = e.dateStr === dateStr;
    const pressHandler = pressDay ? () => pressDay(e) : () => this.pressDay(e);
    const isCurrent = current === e.dateStr;
    return e.thisMonth ? (
      <TouchableOpacity key={e.dateStr} style={styles.day} onPress={pressHandler}>
        <View style={[styles.dayDot, isToday ? styles.dayDot1 : isCurrent ? styles.dayDot2 : {}]}>
          <Text
            style={[
              styles.dayText,
              isCurrent
                ? styles.currentText
                : isFuture
                ? this.props.futureTextStyle || styles.futureText
                : {},
            ]}
          >
            {e.day}
          </Text>
        </View>
      </TouchableOpacity>
    ) : (
      <View style={styles.day} key={e.dateStr} />
    );
  };

  // 渲染月
  renderMonth = (diff = 0) => {
    const { today } = this;
    const { renderDay } = this.props;
    const { year, month } = today;
    const data: Array<FullDate> = getMonthDaysArray(year, month, diff);

    // 每个月有几行数据
    const LINES = [0, 1, 2, 3, 4, 5, 6, 7];
    const lines = data.length / 7;
    MONTH_INDEX.push(diff);
    MONTH_LINES.push(lines);
    const monthLine = LINES.slice(0, lines);

    // 计算显示几月
    let monthName = month + diff + 1;
    if (monthName > 12) {
      monthName = monthName % 12 || 12;
    }
    if (monthName < 0) {
      monthName %= 12;
      monthName += 12;
    }
    if (monthName === 0) {
      monthName = 12;
    }
    return (
      <View style={styles.month} key={diff}>
        <View style={styles.monthTitle}>
          <Text style={styles.monthText}>{`${this.Lang['TYOutdoor_month'][monthName]}`}</Text>
        </View>
        {monthLine.map(lineNum => (
          <View style={styles.weekInMonth} key={lineNum}>
            {data.slice(lineNum * 7, lineNum * 7 + 7).map(renderDay || this.renderDay)}
          </View>
        ))}
      </View>
    );
  };

  render() {
    const { renderTitle } = this.props;
    return (
      <View style={styles.container}>
        {renderTitle ? (
          renderTitle()
        ) : (
          <View style={styles.header}>
            <Text style={styles.headerText}>{this.Lang['TYOutdoor_title']}</Text>
          </View>
        )}
        <View style={styles.weekWrapper}>
          {this.Lang['TYOutdoor_week'].map((weekDay: string) => (
            <View key={weekDay} style={styles.weekTitle}>
              <Text style={styles.weekTitleText}>{weekDay}</Text>
            </View>
          ))}
        </View>
        <ScrollView ref={this.calendar}>{this.month.map(e => this.renderMonth(e))}</ScrollView>
      </View>
    );
  }
}

export default CalendarList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: 500,
    paddingHorizontal: 16,
  },
  currentText: {
    color: '#fff',
  },
  day: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    height: 50,
    justifyContent: 'center',
  },
  dayDot: {
    alignItems: 'center',
    borderRadius: 18,
    display: 'flex',
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  dayDot1: {
    backgroundColor: 'rgba(0,0,0,.1)',
  },
  dayDot2: {
    backgroundColor: '#3160ff',
  },
  dayText: {
    color: '#000',
    height: 50,
    lineHeight: 50,
    textAlign: 'center',
  },
  futureText: {
    color: 'rgba(0,0,0,.3)',
  },
  header: {
    paddingBottom: 18,
    paddingLeft: 10,
    paddingTop: 25,
  },
  headerText: {
    fontSize: 18,
  },
  month: {
    backgroundColor: '#fff',
  },
  monthText: {
    fontSize: 16,
    height: 20,
    lineHeight: 20,
  },
  monthTitle: {
    marginBottom: 20,
    paddingLeft: 12,
    paddingTop: 25,
  },
  weekInMonth: {
    display: 'flex',
    flexDirection: 'row',
    height: 50,
  },
  weekTitle: {
    flex: 1,
    paddingTop: 8,
  },
  weekTitleText: {
    color: 'rgba(0,0,0,.5)',
    fontSize: 12,
    textAlign: 'center',
  },
  weekWrapper: {
    display: 'flex',
    flexDirection: 'row',
    height: 30,
  },
});
