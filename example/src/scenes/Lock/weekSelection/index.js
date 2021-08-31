import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { WeekSelection } from '@tuya/tuya-panel-lock-sdk';

export default class cyclePeriod extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weekDay: '1111111',
    };
  }

  componentDidMount() {}
  onWeekChange(params) {
    this.setState({
      weekDay: params.weekDay,
    });
  }

  render() {
    const { weekDay } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: '#f8f8f8' }}>
        <View style={styles.item}>
          <Text>default</Text>
          <WeekSelection
            weekDay={weekDay}
            onWeekChange={params => this.onWeekChange(params)}
          ></WeekSelection>
        </View>
        <View style={styles.item}>
          <Text>themeColor:#4d88</Text>
          <WeekSelection
            weekDay={weekDay}
            themeColor={'#4d88'}
            onWeekChange={params => this.onWeekChange(params)}
          ></WeekSelection>
        </View>
        <View style={styles.item}>
          <Text>disable</Text>
          <WeekSelection
            defaultColor={'#8811'}
            weekDay={weekDay}
            disable={true}
            onWeekChange={params => this.onWeekChange(params)}
          ></WeekSelection>
        </View>
        <View style={styles.item}>
          <Text>FirstDay</Text>
          <WeekSelection
            weekDay={weekDay}
            defaultFirstDay={2}
            onWeekChange={params => this.onWeekChange(params)}
          ></WeekSelection>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    fontSize: 16,
    marginBottom: 10,
    marginTop: 20,
  },
});
