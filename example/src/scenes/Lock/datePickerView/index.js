import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Utils } from 'tuya-panel-kit';
import { DatePickerView } from '@tuya/tuya-panel-lock-sdk';

const { convertX } = Utils.RatioUtils;
const { width } = Dimensions.get('window');

export default class Password extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
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
          <DatePickerView
            mode="datetime"
            startDate={startDateTime}
            endDate={endDateTime}
            onDateChange={params => {
              this.onDateTimeChange(params);
            }}
          />
        </View>
        <View style={{ paddingVertical: 10 }}>
          <DatePickerView
            mode="datehour"
            startDate={startDateHour}
            endDate={endDateHour}
            onDateChange={params => {
              this.onDateHourChange(params);
            }}
          />
        </View>
        <View style={{ paddingVertical: 10 }}>
          <DatePickerView
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
