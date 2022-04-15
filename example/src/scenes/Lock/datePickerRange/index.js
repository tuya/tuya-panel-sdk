import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { DatePickerRange } from '@tuya/tuya-panel-lock-sdk';
import { TYText } from 'tuya-panel-kit';

export default class Password extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: '',
      endDate: '',
      startDateTime: '',
      endDateTime: '',
      startDateHour: '',
      endDateHour: '',
    };
  }

  componentDidMount() {}
  onDateChange(params) {
    this.setState({
      startDate: params.startDate,
      endDate: params.endDate,
    });
  }

  onDateTimeChange(params) {
    this.setState({
      startDateTime: params.startDate,
      endDateTime: params.endDate,
    });
  }

  onDateHourChange(params) {
    this.setState({
      startDateHour: params.startDate,
      endDateHour: params.endDate,
    });
  }

  render() {
    const {
      startDate,
      endDate,
      endDateTime,
      startDateTime,
      startDateHour,
      endDateHour,
    } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: '#f8f8f8' }}>
        <View style={{ paddingVertical: 10 }}>
          <View style={styles.title}>
            <TYText text="年月日时分" size={20} />
          </View>
          <DatePickerRange
            style={{ backgroundColor: '#adad' }}
            mode="datetime"
            startDate={startDateTime}
            endDate={endDateTime}
            onDateChange={params => {
              this.onDateTimeChange(params);
            }}
            valueStyle={{ color: '#fff' }}
            iconColor="#fff"
            labelStyle={{ color: '#fff' }}
            onConfirm={() => {}}
            onCancel={() => {}}
          />
        </View>
        <View style={{ paddingVertical: 10 }}>
          <View style={styles.title}>
            <TYText text="年月日时" size={20} />
          </View>
          <DatePickerRange
            mode="hour"
            startDate={startDateHour}
            endDate={endDateHour}
            onDateChange={params => {
              this.onDateHourChange(params);
            }}
          />
        </View>
        <View style={{ paddingVertical: 10 }}>
          <View style={styles.title}>
            <TYText text="年月日" size={20} />
          </View>
          <DatePickerRange
            mode="date"
            startDate={startDate}
            endDate={endDate}
            onDateChange={params => {
              this.onDateChange(params);
            }}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  title: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderTopEndRadius: 5,
    borderTopStartRadius: 5,
    justifyContent: 'center',
    paddingVertical: 10,
  },
});
