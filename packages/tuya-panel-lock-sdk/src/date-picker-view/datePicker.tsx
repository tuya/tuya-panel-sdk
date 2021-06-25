/* eslint-disable react/require-default-props */
import React from 'react';
import { View, ViewPropTypes, StyleSheet } from 'react-native';
import PropTypes, { any } from 'prop-types';
import { Picker, Utils } from 'tuya-panel-kit';

const { convertX: cx } = Utils.RatioUtils;

const DATETIME = 'datetime';
const DATE = 'date';
const TIME = 'time';
const DATEHOUR = 'datehour';
const ONEDAY = 24 * 60 * 60 * 1000;

function plusZero(n) {
  return n < 10 ? `0${n}` : `${n}`;
}

const capitalized = str => str.charAt(0).toUpperCase() + str.slice(1); // 首字母大写

const sortColumnsAndValue = (dateSortKeys, cols, value) => {
  if (!dateSortKeys || !Array.isArray(dateSortKeys) || dateSortKeys.length !== 3) {
    dateSortKeys &&
      console.warn(
        `dateSortKeys: ${JSON.stringify(
          dateSortKeys
        )} 不合法，必须为长度为3的数组，且值必须为'year' || 'month' || 'day`
      );
    return { cols, value };
  }
  const sortedCols = [];
  const sortedValue = [];
  dateSortKeys.forEach(k => {
    const colIndex = cols.findIndex(col => col.key === k);
    colIndex !== -1 && sortedCols.push(cols[colIndex]);
    colIndex !== -1 && sortedValue.push(value[colIndex]);
  });
  return { cols: sortedCols, value: sortedValue };
};

const formatColArray = (arrLength, min, labelLocal, isPlusZero) => {
  return Array.from(Array(arrLength), (v, k) => {
    const finalLabelLocal = `${labelLocal || ''}`;
    const finalLabelMain = isPlusZero ? `${plusZero(k + min)}` : `${k + min}`;
    const label = `${finalLabelMain}${finalLabelLocal}`;
    return { value: `${k + min}`, label };
  });
};
// get how many days
const getDaysInMonth = date => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

const setMonth = (date, month) => {
  const days = getDaysInMonth(new Date(date.getFullYear(), month));
  date.setDate(Math.min(date.getDate(), days));
  date.setMonth(month);
};
interface DatePickerprops {
  accessibilityLabel?: string;
  mode: any;
  loop?: boolean;
  use12Hours?: boolean;
  isPlusZero?: boolean;
  isAmpmFirst?: boolean;
  isTimeFirst?: boolean;
  minDate?: any;
  maxDate?: any;
  onDateChange: any;
  onValueChange: any;
  pickerFontColor?: string;
  dateSortKeys?: null;
  style?: any;
  defaultDate?: any;
  date?: any;
  PickerProps?: any;
}
class DatePicker extends React.Component<DatePickerprops, any> {
  static propTypes = {
    /**
     * 测试标志
     */
    accessibilityLabel: PropTypes.string,
    /**
     * 选择器的选择类型
     */
    mode: PropTypes.string,
    /**
     * 选择picker是否可循环
     */
    loop: PropTypes.bool,
    /**
     * 是否为12小时制
     */
    use12Hours: PropTypes.bool,
    /**
     * 月、日、时、分，是否补0显示
     */
    isPlusZero: PropTypes.bool,
    /**
     * 设置最小可选择的值
     */
    minDate: PropTypes.object,
    /**
     * 设置最大可选择的值
     */
    maxDate: PropTypes.object,
    /**
     * 某一项被选中时执行此回调
     */
    onDateChange: PropTypes.func,
    /**
     * 某一项被选中时执行此回调
     */
    onValueChange: PropTypes.func,
    /**
     * `AM / PM` Picker项是否位于 `小时`及`分钟` 之前
     */
    isAmpmFirst: PropTypes.bool,
    /**
     * `小时`及`分钟` Picker项是否位于 `年` `月` `日` 之前
     */
    isTimeFirst: PropTypes.bool,
    /**
     * 当前选中的值，设置了该属性即为受控组件
     */
    date: PropTypes.object,
    /**
     * 默认选中的值
     */
    defaultDate: PropTypes.object,
    /**
     * 容器样式
     */
    style: ViewPropTypes.style,
    /**
     * picker里字体颜色
     */
    pickerFontColor: PropTypes.string,
    /**
     * `年` `月` `日` 排序规则，若不提供则默认为年月日
     */
    dateSortKeys: PropTypes.array,
  };

  static defaultProps = {
    accessibilityLabel: 'DatePicker',
    mode: DATE,
    loop: false,
    use12Hours: false,
    isPlusZero: true,
    isAmpmFirst: false,
    isTimeFirst: false,
    minDate: new Date(2000, 0, 1, 0, 0, 0),
    maxDate: new Date(2030, 11, 31, 23, 59, 59),
    onDateChange: () => {},
    onValueChange: () => {},
    pickerFontColor: '#333',
    dateSortKeys: null,
    // disabled: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      date: props.date || props.defaultDate,
      indexAndCols: {
        cols: [],
        value: [],
      },
      newDate: props.date,
    };
  }

  componentDidMount() {
    this.setState({
      indexAndCols: this.getIndexAndCols(this.props.date),
    });
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(nextProps) {
    if ('date' in nextProps) {
      this.setState({ date: nextProps.date || nextProps.defaultDate });
    }
  }

  onValueChange = (currentValue, index, key) => {
    const newValue = this.getNewDate(currentValue, index, key);
    // console.log('currentValue, index, key', currentValue, index, key, newValue);

    if (!('date' in this.props)) {
      this.setState({ date: newValue });
    }
    this.setState({
      newDate: newValue,
    });
    if (this.props.onDateChange) {
      this.props.onDateChange(newValue);
    }
    if (this.props.onValueChange) {
      this.props.onValueChange(currentValue, index);
    }
    const indexAndCols = this.changeIndexAndCols(newValue);
    this.setState({
      indexAndCols,
    });
  };

  // get now date
  getDate() {
    return this.getRealDate(this.state.date || this.props.minDate);
  }

  getRealHour(hour) {
    if (this.props.use12Hours) {
      let resultHours = hour;
      if (hour === 0) {
        resultHours = 12;
      }
      if (hour > 12) {
        resultHours -= 12;
      }
      return resultHours;
    }
    return hour;
  }

  setHours(date, hour) {
    if (this.props.use12Hours) {
      const dh = date.getHours();
      let nhour = hour;
      nhour = dh >= 12 ? hour + 12 : hour;
      nhour = nhour >= 24 ? 0 : nhour;
      date.setHours(nhour);
    } else {
      date.setHours(hour);
    }
  }

  setAmPm(date, index) {
    if (index === 0) {
      date.setTime(+date - ONEDAY / 2);
    } else {
      date.setTime(+date + ONEDAY / 2);
    }
  }

  getNewDate = (values, index, key) => {
    const value = parseInt(values, 10);
    const { mode } = this.props;
    const newValue = new Date(this.state.newDate);
    if (mode === DATETIME || mode === DATE) {
      switch (key) {
        case 'year':
          newValue.setFullYear(value);
          break;
        case 'month':
          setMonth(newValue, value - 1);
          break;
        case 'day':
          newValue.setDate(value);
          break;
        case 'hour':
          this.setHours(newValue, value);
          break;
        case 'minute':
          newValue.setMinutes(value);
          break;
        case 'ampm':
          this.setAmPm(newValue, value);
          break;
        default:
          break;
      }
    } else if (mode === DATEHOUR) {
      switch (key) {
        case 'day':
          newValue.setDate(value);
          break;
        case 'hour':
          this.setHours(newValue, value);
          break;
        default:
          break;
      }
    }
    return this.getRealDate(newValue);
  };

  // get time data
  getTimeColsData = date => {
    let minMinute = 0;
    let maxMinute = 59;
    let minHour = 0;
    let maxHour = 23;
    const { mode, use12Hours, isPlusZero, isAmpmFirst, minDate, maxDate } = this.props;
    const minDateMinute = minDate.getMinutes();
    const maxDateMinute = maxDate.getMinutes();
    const minDateHour = minDate.getHours();
    const maxDateHour = maxDate.getHours();
    const nowHour = date.getHours();
    if (mode === DATETIME) {
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();
      const minDateYear = minDate.getFullYear();
      const maxDateYear = maxDate.getFullYear();
      const minDateMonth = minDate.getMonth();
      const maxDateMonth = maxDate.getMonth();
      const minDateDay = minDate.getDate();
      const maxDateDay = maxDate.getDate();

      if (minDateYear === year && minDateMonth === month && minDateDay === day) {
        minHour = minDateHour;
        if (minDateHour === nowHour) {
          minMinute = minDateMinute;
        }
      }
      if (maxDateYear === year && maxDateMonth === month && maxDateDay === day) {
        maxHour = maxDateHour;
        if (maxDateHour === nowHour) {
          maxMinute = maxDateMinute;
        }
      }
    } else if (mode === DATEHOUR) {
      minHour = minDateHour;
    } else {
      minHour = minDateHour;
      if (minDateHour === nowHour) {
        minMinute = minDateMinute;
      }
      maxHour = maxDateHour;
      if (maxDateHour === nowHour) {
        maxMinute = maxDateMinute;
      }
    }
    let ampmCols = [];
    // todo: minDate and maxDate
    if (use12Hours) {
      //   let ampm = [];
      //   if (minHour > 12 && maxHour > 12) {
      //     ampm.push({ value: '1', label: locale.pm })
      //   } else if (minHour <= 12 && maxHour <= 12) {
      //     ampm.push({ value: '0', label: locale.am })
      //   } else {
      //     ampm = [{ value: '0', label: locale.am }, { value: '1', label: locale.pm }];
      //   }
      const ampm = [
        { value: '0', label: 'am' },
        { value: '1', label: 'pm' },
      ];
      ampmCols = [{ key: 'ampm', values: ampm }];
    }
    let hour = [];
    if ((minHour === 0 && maxHour === 0) || (minHour !== 0 && maxHour !== 0)) {
      minHour = this.getRealHour(minHour);
    } else if (minHour === 0 && use12Hours) {
      minHour = 1;
      hour.push({ value: '0', label: 'hour' ? `12${hour}` : '12' });
    }
    maxHour = this.getRealHour(maxHour);
    const hours = formatColArray(maxHour - minHour + 1, minHour, '', isPlusZero);

    hour = hour.concat(hours);
    const hourCols = { key: 'hour', values: hour };
    const nowMinute = date.getMinutes();
    const minute = formatColArray(maxMinute - minMinute + 1, minMinute, '', isPlusZero);
    const minuteCols = { key: 'minute', values: minute };

    const cols = !isAmpmFirst
      ? [hourCols, minuteCols].concat(ampmCols)
      : ampmCols.concat([hourCols, minuteCols]);

    return { cols, nowMinute, nowHour };
  };

  // get the correct date for pciker
  getRealDate = date => {
    const { mode, minDate, maxDate } = this.props;
    switch (mode) {
      case DATETIME:
        if (date < minDate) {
          return new Date(+minDate);
        }
        if (date > maxDate) {
          return new Date(+maxDate);
        }
        break;
      case TIME:
        {
          const maxHour = maxDate.getHours();
          const maxMinutes = maxDate.getMinutes();
          const minHour = minDate.getHours();
          const minMinutes = minDate.getMinutes();
          const hour = date.getHours();
          const minutes = date.getMinutes();
          if (hour < minHour || (hour === minHour && minutes < minMinutes)) {
            return new Date(+minDate);
          }
          if (hour > maxHour || (hour === maxHour && minMinutes > maxMinutes)) {
            return new Date(+maxDate);
          }
        }
        break;
      default:
        if (date >= +maxDate + ONEDAY) {
          return new Date(+maxDate);
        }
        if (+date + ONEDAY <= minDate) {
          return new Date(+minDate);
        }
        break;
    }
    return date;
  };

  changeDateColsData = () => {};

  // get col data
  getDateColsData = () => {
    const { mode, maxDate, minDate, isPlusZero } = this.props;
    const date = this.getDate();
    const nowYear = date.getFullYear();
    const nowMonth = date.getMonth();
    const maxDateYear = maxDate.getFullYear();
    const minDateYear = minDate.getFullYear();
    const minDateMonth = minDate.getMonth();
    const maxDateMonth = maxDate.getMonth();
    const minDateDay = minDate.getDate();
    const maxDateDay = maxDate.getDate();
    const year = formatColArray(maxDateYear - minDateYear + 1, minDateYear, '', isPlusZero);
    const yearCol = { key: 'year', values: year };

    let minMonth = 0;
    let maxMonth = 11;
    if (minDateYear === nowYear) {
      minMonth = minDateMonth;
    }
    if (maxDateYear === nowYear) {
      maxMonth = maxDateMonth;
    }
    const month = formatColArray(maxMonth - minMonth + 1, minMonth + 1, '', isPlusZero);
    const monthCol = { key: 'month', values: month };

    let minDay = 1;
    let maxDay = getDaysInMonth(date);
    if (minDateYear === nowYear && minDateMonth === nowMonth) {
      minDay = minDateDay;
    }
    if (maxDateYear === nowYear && maxDateMonth === nowMonth) {
      maxDay = maxDateDay;
    }
    const day = formatColArray(maxDay - minDay + 1, minDay, '', isPlusZero);
    const dayCol = { key: 'day', values: day };

    return [yearCol, monthCol, dayCol];
  };

  changeIndexAndCols = newDate => {
    const date = this.getDate();

    let minMinute = 0;
    const maxMinute = 59;
    let minHour = 0;
    let maxHour = 23;
    const {
      mode,
      use12Hours,
      isPlusZero,
      dateSortKeys,
      isAmpmFirst,
      minDate,
      maxDate,
      isTimeFirst,
    } = this.props;
    const minDateMinute = minDate.getMinutes();
    const maxDateMinute = maxDate.getMinutes();
    const minDateHour = minDate.getHours();
    const maxDateHour = maxDate.getHours();
    const changeMode = this.compareDate(this.getDate(), newDate);
    console.log('changeMode', changeMode);

    let hour = [];
    if ((minHour === 0 && maxHour === 0) || (minHour !== 0 && maxHour !== 0)) {
      minHour = this.getRealHour(minHour);
    } else if (minHour === 0 && use12Hours) {
      minHour = 1;
      hour.push({ value: '0', label: 'hour' ? `12${hour}` : '12' });
    }
    if (changeMode === 'DAY') {
      minHour = 0;
      minMinute = 0;
    }
    if (changeMode === 'HOUR') {
      minHour = this.getDate().getHours();
      minMinute = 0;
    }
    if (changeMode === 'MINUTE') {
      minHour = date.getHours();
      minMinute = date.getMinutes();
    }
    if (changeMode === 'SAME') {
      minHour = date.getHours();
      minMinute = date.getMinutes();
    }
    maxHour = this.getRealHour(maxHour);
    const hours = formatColArray(maxHour - minHour + 1, minHour, '', isPlusZero);

    hour = hour.concat(hours);
    const hourCols = { key: 'hour', values: hour };
    const nowMinute = date.getMinutes();
    const minute = formatColArray(maxMinute - minMinute + 1, minMinute, '', isPlusZero);
    const minuteCols = { key: 'minute', values: minute };

    const cols = [hourCols, minuteCols];
    const nowHour = date.getHours();

    const realhour = nowHour;
    const timeValue = [`${realhour}`, `${nowMinute}`];
    const unSortDateCols = this.getDateColsData();
    const unSortDateValue = [
      `${date.getFullYear()}`,
      `${date.getMonth() + 1}`,
      `${date.getDate()}`,
    ];
    const { cols: sortDateCols, value: sortDateValue } = sortColumnsAndValue(
      dateSortKeys,
      unSortDateCols,
      unSortDateValue
    );
    if (mode === DATETIME) {
      return {
        cols: isTimeFirst ? [...cols, ...sortDateCols] : [...sortDateCols, ...cols],
        value: isTimeFirst ? [...timeValue, ...sortDateValue] : [...sortDateValue, ...timeValue],
      };
    }
    if (mode === DATE) {
      return sortColumnsAndValue(dateSortKeys, unSortDateCols, unSortDateValue);
    }

    return {
      cols: [...sortDateCols, ...[hourCols]],
      value: [...sortDateValue, ...[`${realhour}`]],
    };
  };

  // get picker selectItems and currentValue
  getIndexAndCols = newDate => {
    const { mode, use12Hours, isAmpmFirst, isTimeFirst, dateSortKeys } = this.props;
    const date = this.getDate();
    const cols = [];
    const value = [];

    if (mode === DATE) {
      const unSortDateCols = this.getDateColsData();
      const unSortDateValue = [
        `${date.getFullYear()}`,
        `${date.getMonth() + 1}`,
        `${date.getDate()}`,
      ];
      return sortColumnsAndValue(dateSortKeys, unSortDateCols, unSortDateValue);
    }
    if (mode === DATEHOUR) {
      const unSortDateCols = this.getDateColsData();
      const unSortDateValue = [
        `${date.getFullYear()}`,
        `${date.getMonth() + 1}`,
        `${date.getDate()}`,
      ];
      const { cols: sortDateCols, value: sortDateValue } = sortColumnsAndValue(
        dateSortKeys,
        unSortDateCols,
        unSortDateValue
      );
      const time = this.getTimeColsData(date);
      const realhour = time.nowHour;
      const timeValue = [`${realhour}`];
      return {
        cols: isTimeFirst
          ? [...time.cols.splice(0, 1), ...sortDateCols]
          : [...sortDateCols, ...time.cols.splice(0, 1)],
        value: isTimeFirst ? [...timeValue, ...sortDateValue] : [...sortDateValue, ...timeValue],
      };
    }
    const time = this.getTimeColsData(date);
    let realhour = time.nowHour;
    const timeValue = [`${realhour}`, `${time.nowMinute}`];
    if (use12Hours) {
      realhour = time.nowHour === 0 ? 12 : time.nowHour > 12 ? time.nowHour - 12 : time.nowHour;
      timeValue[0] = `${realhour}`;
      const ampmStr = `${time.nowHour >= 12 ? 1 : 0}`;
      if (isAmpmFirst) {
        timeValue.splice(0, 0, ampmStr);
      } else {
        timeValue.push(ampmStr);
      }
    }
    if (mode === DATETIME) {
      const unSortDateCols = this.getDateColsData();
      const unSortDateValue = [
        `${date.getFullYear()}`,
        `${date.getMonth() + 1}`,
        `${date.getDate()}`,
      ];
      const { cols: sortDateCols, value: sortDateValue } = sortColumnsAndValue(
        dateSortKeys,
        unSortDateCols,
        unSortDateValue
      );
      return {
        cols: isTimeFirst ? [...time.cols, ...sortDateCols] : [...sortDateCols, ...time.cols],
        value: isTimeFirst ? [...timeValue, ...sortDateValue] : [...sortDateValue, ...timeValue],
      };
    }
    return {
      cols,
      value,
    };
  };

  compareDate(date, newDate) {
    const { mode, minDate, maxDate } = this.props;
    const minDateYear = minDate.getFullYear();
    const minDateMonth = minDate.getMonth();
    const minDateDay = minDate.getDate();
    const minDateHour = minDate.getHours();
    const minDateMinute = minDate.getMinutes();
    console.log(minDateYear, minDateMonth, minDateDay, minDateHour, minDateMinute);

    const newDateYear = newDate.getFullYear();
    const newDateMonth = newDate.getMonth();
    const newDateDay = newDate.getDate();
    const newDateHour = newDate.getHours();
    const newDateMinute = newDate.getMinutes();
    console.log(newDateYear, newDateMonth, newDateDay, newDateHour, newDateMinute);
    if (newDateYear > minDateYear) return 'YEAR';
    if (newDateMonth > minDateMonth) return 'MONTH';
    if (newDateDay > minDateDay) return 'DAY';
    if (newDateHour > minDateHour) return 'HOUR';
    if (newDateMinute > minDateMinute) return 'MINUTE';
    return 'SAME';
  }

  render() {
    // const { value, cols } = this.getIndexAndCols();
    const { value, cols } = this.state.indexAndCols;
    let pickerFontSize = cx(30);
    if (cols.length < 3) {
      pickerFontSize = cx(30);
    } else if (cols.length === 3) {
      pickerFontSize = cx(27);
    } else {
      pickerFontSize = cx(24);
    }
    const {
      mode,
      use12Hours,
      minDate,
      maxDate,
      onDateChange,
      onValueChange,
      isAmpmFirst,
      date,
      defaultDate,
      style,
      loop,
      pickerFontColor,
      accessibilityLabel,
      ...PickerProps
    } = this.props;
    const multiStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 5,
      paddingRight: 5,
      backgroundColor: '#fff',
      height: 216,
    };
    console.log('col', cols);

    return (
      <View style={[multiStyle, style]}>
        {cols.map((pItem, pindex) => (
          <Picker
            theme={{ fontColor: pickerFontColor, fontSize: pickerFontSize }}
            {...PickerProps}
            style={{ flex: 1 }}
            key={pItem.key}
            accessibilityLabel={`${accessibilityLabel}_${capitalized(pItem.key)}`}
            // disabled={disabled}
            loop={pItem.key !== 'ampm' && loop}
            selectedItemTextColor={pickerFontColor}
            itemStyle={StyleSheet.flatten([{ color: pickerFontColor }])}
            selectedValue={value[pindex]}
            onValueChange={dateValue => this.onValueChange(dateValue, pindex, pItem.key)}
          >
            {pItem.values.map(item => (
              <Picker.Item
                key={`${pItem.key}_${item.value}`}
                value={item.value}
                label={item.label}
              />
            ))}
          </Picker>
        ))}
      </View>
    );
  }
}

export default DatePicker;
