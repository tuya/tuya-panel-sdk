import React, { PureComponent } from 'react';
import { IconFont, GlobalToast, TYText, Popup } from 'tuya-panel-kit';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import _isEqual from 'lodash/isEqual';
import _padStart from 'lodash/padStart';
import DatePicker from './datePicker';
import Strings from './i18n';
import { DatePickerViewProps, DatePickerViewState, NextProps, dateString } from './interface';

const DATETIME = 'datetime';
const DATE = 'date';
const HOUR = 'hour';
export default class DatePickerRange extends PureComponent<
  DatePickerViewProps,
  DatePickerViewState
> {
  constructor(props) {
    super(props);
    this.state = {
      dateRange: [this.props.startDate, this.props.endDate],
      placeholder: this.props.placeholder || Strings.getLang('placeholderTip'),
      currentOperationIndex: 0,
      startDate: this.props.startDate || '',
      endDate: this.props.endDate || '',
      maxDate: new Date(new Date().setFullYear(new Date().getFullYear() + 9)),
    };
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(nextProps: NextProps) {
    const { startDate, endDate } = this.props;
    if (!_isEqual(startDate, nextProps.startDate) || !_isEqual(endDate, nextProps.endDate))
      this.setState({
        startDate: nextProps.startDate,
        endDate: nextProps.endDate,
        dateRange: [nextProps.startDate, nextProps.endDate],
      });
  }

  setDate(date) {
    const { currentOperationIndex, dateRange } = this.state;
    dateRange[currentOperationIndex] = date;
    this.setState({
      dateRange,
    });
  }

  // getDefaultValue() {
  //   return this.formatDate(new Date());
  // }

  formatDate(date) {
    if (!date) return '';
    if (typeof date === 'string') return date;
    const dateValue = new Date(date);
    const y = dateValue.getFullYear();
    let m: dateString = `${dateValue.getMonth() + 1}`;
    m = _padStart(m, 2, '0');
    let d: dateString = `${dateValue.getDate()}`;
    d = _padStart(d, 2, '0');
    let h: dateString = `${dateValue.getHours()}`;
    h = _padStart(h, 2, '0');
    let mm: dateString = `${dateValue.getMinutes()}`;
    mm = _padStart(mm, 2, '0');
    if (this.props.mode === DATE) {
      return `${y}-${m}-${d}`;
    }
    if (this.props.mode === HOUR) {
      return `${y}-${m}-${d} ${h}:00`;
    }
    return `${y}-${m}-${d} ${h}:${mm}`;
  }

  openModal(index) {
    const {
      mode,
      cancelText,
      confirmText,
      title,
      wrapperStyle,
      titleTextStyle,
      titleWrapperStyle,
      cancelTextStyle,
      confirmTextStyle,
      // footer,
      footerWrapperStyle,
      footerType,
      motionType,
      motionConfig,
      isAlign,
    } = this.props;
    const { startDate, endDate, maxDate } = this.state;
    const _startDate = startDate ? new Date(startDate) : new Date();
    const _endDate = endDate ? new Date(endDate) : new Date();
    const currentDate = !index ? _startDate : _endDate;
    const currentMinDate = !index ? new Date() : new Date(_startDate);

    this.setState({
      currentOperationIndex: index,
    });

    Popup.custom({
      content: (
        <DatePicker
          mode={mode || DATETIME}
          date={currentDate}
          onDateChange={date => this.setDate(date)}
          minDate={currentMinDate}
          maxDate={maxDate}
          style={{ paddingHorizontal: 20 }}
        />
      ),
      wrapperStyle,
      titleTextStyle,
      titleWrapperStyle,
      cancelTextStyle,
      confirmTextStyle,
      // footer,
      footerWrapperStyle,
      footerType,
      motionType,
      motionConfig,
      isAlign,
      title: title || Strings.getLang('titleTip'),
      cancelText: cancelText || Strings.getLang('cancelText'),
      confirmText: confirmText || Strings.getLang('confirmText'),
      onMaskPress: ({ close }) => close(),
      onCancel: () => {
        Popup.close();
        this.props.onCancel && this.props.onCancel();
      },
      onConfirm: (data, { close }) => {
        this.confirmModal();
        close();
        this.props.onConfirm && this.props.onConfirm();
      },
    });
  }

  compareTwoDate(startDate, endDate) {
    return new Date(endDate) > new Date(startDate);
  }

  confirmModal() {
    const { startDate, endDate } = this.state;
    const { currentOperationIndex, dateRange } = this.state;
    // confirm first datepicker
    if (!currentOperationIndex) {
      if (endDate && !this.compareTwoDate(dateRange[0], endDate)) {
        GlobalToast.show({
          text: this.props.dateLimitTip || Strings.getLang('dateLimitTip'),
          showIcon: false,
        });
        return;
      }
      if (!dateRange[0]) {
        this.props.onDateChange({
          startDate: new Date().getTime(),
          endDate: endDate || '',
        });
        return;
      }
      this.props.onDateChange({
        startDate: new Date(dateRange[0]).getTime(),
        endDate: endDate || '',
      });
    } else {
      // confirm second datepicker
      if (!startDate) {
        GlobalToast.show({
          text: this.props.startDateTip || Strings.getLang('startDateTip'),
          showIcon: false,
        });
        return;
      }
      const endDateView = dateRange[1]
        ? new Date(dateRange[1]).getTime()
        : new Date(startDate).getTime();

      if (!this.compareTwoDate(startDate, endDateView)) {
        GlobalToast.show({
          text: this.props.dateLimitTip || Strings.getLang('dateLimitTip'),
          showIcon: false,
        });
        return;
      }
      this.props.onDateChange({
        startDate,
        endDate: endDateView,
      });
    }
  }

  render() {
    const { startLabel, endLabel, style } = this.props;
    const { placeholder, startDate, endDate } = this.state;
    const data = [
      {
        label: startLabel || Strings.getLang('startLabel'),
        value: startDate === '' ? placeholder : startDate,
      },
      {
        label: endLabel || Strings.getLang('endLabel'),
        value: endDate === '' ? placeholder : endDate,
      },
    ];
    //
    return (
      <View style={style}>
        {data.map((item, index) => {
          return (
            <TouchableOpacity
              style={styles.container}
              key={item.label}
              onPress={() => this.openModal(index)}
            >
              <TYText>{item.label}</TYText>
              <View style={styles.pickerItem}>
                <TYText
                  style={{ marginRight: 5, color: item.value === placeholder ? '#d6d9dc' : '#333' }}
                >
                  {this.formatDate(item.value)}
                </TYText>
                <IconFont name="arrow" />
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flexDirection: 'row',
    height: 58,
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  pickerItem: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
