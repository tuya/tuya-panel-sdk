import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { Utils, TYText } from 'tuya-panel-kit';
import { TimePickerRange } from '@tuya/tuya-panel-lock-sdk';

const { convertX } = Utils.RatioUtils;
const { width } = Dimensions.get('window');

export default class timePickerRange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beginTime: 400.23,
      endTime: 1000,
    };
  }

  componentDidMount() {}
  onDateChange(params) {
    console.log('params', params);
    this.setState({
      beginTime: params.beginTime,
      endTime: params.endTime,
    });
  }

  render() {
    const { beginTime, endTime } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: '#f8f8f8' }}>
        <View style={styles.title}>
          <Text>时分秒</Text>
        </View>
        <TimePickerRange
          beginTime={beginTime}
          endTime={endTime}
          hourLabel="小时"
          minutesLabel="分钟"
          secondLabel="秒"
          onTimeChange={params => this.onDateChange(params)}
          itemTextColor="#0000dd"
          textSize={22}
        />
        <View style={styles.title}>
          <Text>时分</Text>
        </View>
        <TimePickerRange
          beginTime={beginTime}
          endTime={endTime}
          isShowSecond={false}
          onTimeChange={params => this.onDateChange(params)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    alignItems: 'center',
    backgroundColor: '#f3f3f3',
    height: 50,
    justifyContent: 'center',
    width: '100%',
  },
});
