import React, { PureComponent } from 'react';
import { Modal, IconFont, GlobalToast } from 'tuya-panel-kit';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { StyledConfirmButton, StyledCancelButton } from './component';
import DatePicker from './datePicker';

const DATETIME = 'datetime';
const DATE = 'date';
const DATEHOUR = 'datehour';
export default class DatePickerView extends PureComponent<
  DatePickerViewProps,
  DatePickerViewState
> {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      dateRange: [this.props.startDate, this.props.endDate],
      // defautlStartDate: new Date(), // 默认开始时间
      placeholder: this.props.placeholder || '请选择时间',
      currentOperationIndex: 0,
      startDate: this.props.startDate || '',
      endDate: this.props.endDate || '',
    };
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(nextProps: NextProps) {
    this.setState({
      startDate: nextProps.startDate,
      endDate: nextProps.endDate,
      dateRange: [nextProps.startDate, nextProps.endDate],
    });
  }

  setDate(date) {
    const { currentOperationIndex, dateRange } = this.state;

    const dateRangeValue = dateRange;

    dateRangeValue[currentOperationIndex] = date;
    this.setState({
      dateRange: dateRangeValue,
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
    let m: dateString = dateValue.getMonth() + 1;
    m = m < 10 ? `0${m}` : `${m}`;
    let d: dateString = dateValue.getDate();
    d = d < 10 ? `0${d}` : `${d}`;
    let h: dateString = dateValue.getHours();
    h = h < 10 ? `0${h}` : h;
    let mm: dateString = dateValue.getMinutes();
    mm = mm < 10 ? `0${mm}` : mm;
    if (this.props.mode === DATE) {
      return `${y}-${m}-${d}`;
    }
    if (this.props.mode === DATEHOUR) {
      return `${y}-${m}-${d} ${h}:00`;
    }
    return `${y}-${m}-${d} ${h}:${mm}`;
  }

  openModal(index: number) {
    this.setState({
      visible: true,
      currentOperationIndex: index,
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
          <Text>{item.label}</Text>
          <TouchableOpacity onPress={() => this.openModal(index)}>
            <View style={styles.value}>
              <Text
                style={{ marginRight: 5, color: item.value === placeholder ? '#d6d9dc' : '#333' }}
              >
                {this.formatDate(item.value)}
              </Text>
              <IconFont name="arrow" />
            </View>
          </TouchableOpacity>
        </View>
      );
    });
  }

  render() {
    const { visible, startDate, currentOperationIndex, endDate } = this.state;
    const { cancelText, confirmText } = this.props;
    const _startDate = startDate ? new Date(startDate) : new Date();
    const _endDate = endDate ? new Date(endDate) : new Date();
    const viewDate = !currentOperationIndex ? _startDate : _endDate;
    const minDate = !currentOperationIndex ? new Date() : new Date(_startDate);
    const maxDate = new Date(new Date().setFullYear(new Date().getFullYear() + 9));
    return (
      <View>
        {this.renderItem()}
        <Modal visible={visible} onMaskPress={() => this.closeModal()}>
          <DatePicker
            mode={this.props.mode || DATETIME}
            date={viewDate}
            onDateChange={date => this.setDate(date)}
            minDate={minDate}
            maxDate={maxDate}
            // isEndDate={!!currentOperationIndex}
          />
          <View style={styles.footer}>
            <StyledCancelButton onPress={() => this.closeModal()}>
              <Text>{cancelText || '取消'}</Text>
            </StyledCancelButton>
            <StyledConfirmButton onPress={() => this.confirmModal()}>
              <Text>{confirmText || '确定'}</Text>
            </StyledConfirmButton>
          </View>
        </Modal>
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  value: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
