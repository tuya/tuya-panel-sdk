import React, { PureComponent } from 'react';
import { Modal, IconFont, GlobalToast, TYText } from 'tuya-panel-kit';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import _isEqual from 'lodash/isEqual';
import _padStart from 'lodash/padStart';
import DatePicker from './datePicker';
import { DatePickerViewProps, DatePickerViewState, NextProps, dateString } from './interfance';

const DATETIME = 'datetime';
const DATE = 'date';
const HOUR = 'hour';
export default class DatePickerView extends PureComponent<
  DatePickerViewProps,
  DatePickerViewState
> {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      dateRange: [this.props.startDate, this.props.endDate],
      placeholder: this.props.placeholder || '请选择时间',
      currentOperationIndex: 0,
      startDate: this.props.startDate || '',
      endDate: this.props.endDate || '',
      maxDate: new Date(new Date().setFullYear(new Date().getFullYear() + 9)),
      minDate: new Date(),
      currentDate: new Date(),
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

  getDefaultValue() {
    return this.formatDate(new Date());
  }

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
    const { startDate, endDate } = this.state;
    const _startDate = startDate ? new Date(startDate) : new Date();
    const _endDate = endDate ? new Date(endDate) : new Date();

    const currentDate = !index ? _startDate : _endDate;

    this.setState({
      visible: true,
      currentOperationIndex: index,
      currentDate,
      minDate: !index ? new Date() : new Date(_startDate),
    });
  }

  closeModal() {
    this.setState({
      visible: false,
    });
  }

  compareTwoDate(startDate, endDate) {
    return new Date(endDate) > new Date(startDate);
  }

  confirmModal() {
    const { startDate, endDate } = this.state;
    this.setState({
      visible: false,
    });
    const { currentOperationIndex, dateRange } = this.state;
    // confirm first datepicker
    if (!currentOperationIndex) {
      if (endDate && !this.compareTwoDate(dateRange[0], endDate)) {
        GlobalToast.show({
          text: this.props.dateLimitTip || '生效时间必须早于失效时间',
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
          text: this.props.startDateTip || '先选择生效时间',
          showIcon: false,
        });
        return;
      }
      const endDateView = dateRange[1]
        ? new Date(dateRange[1]).getTime()
        : new Date(startDate).getTime();

      if (!this.compareTwoDate(startDate, endDateView)) {
        GlobalToast.show({
          text: this.props.dateLimitTip || '生效时间必须早于失效时间',
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

  renderItem() {
    const { placeholder, startDate, endDate } = this.state;
    const { startLabel, endLabel } = this.props;
    const data = [
      { label: startLabel || '生效时间', value: startDate === '' ? placeholder : startDate },
      { label: endLabel || '失效时间', value: endDate === '' ? placeholder : endDate },
    ];
    return data.map((item, index) => {
      return (
        <View style={styles.container} key={item.label}>
          <TYText>{item.label}</TYText>
          <TouchableOpacity style={styles.pickerItem} onPress={() => this.openModal(index)}>
            <TYText
              style={{ marginRight: 5, color: item.value === placeholder ? '#d6d9dc' : '#333' }}
            >
              {this.formatDate(item.value)}
            </TYText>
            <IconFont name="arrow" />
          </TouchableOpacity>
        </View>
      );
    });
  }

  render() {
    const {
      mode,
      cancelText,
      confirmText,
      animationType,
      alignContainer,
      style,
      modalChildStyle,
      mask,
      maskStyle,
    } = this.props;
    const { visible, currentDate, maxDate, minDate } = this.state;

    return (
      <View style={style}>
        {this.renderItem()}
        <Modal
          visible={visible}
          onMaskPress={() => this.closeModal()}
          animationType={animationType}
          alignContainer={alignContainer}
          modalChildStyle={modalChildStyle}
          mask={mask}
          maskStyle={maskStyle}
        >
          <DatePicker
            mode={mode || DATETIME}
            date={currentDate}
            onDateChange={date => this.setDate(date)}
            minDate={minDate}
            maxDate={maxDate}
          />
          <View style={styles.footer}>
            <TouchableOpacity style={styles.button} onPress={() => this.closeModal()}>
              <TYText>{cancelText || '取消'}</TYText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => this.confirmModal()}>
              <TYText>{confirmText || '确定'}</TYText>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRightColor: '#f8f8f1',
    borderRightWidth: StyleSheet.hairlineWidth,
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 12,
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flexDirection: 'row',
    height: 58,
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  pickerItem: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
