import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Finger } from '@tuya/tuya-panel-lock-sdk';

export default class FingerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentNumber: 0,
      isSuccess: false,
      totalNumber: 0,
      total: '',
    };
  }
  componentDidMount() {}
  click = () => {
    this.setState({
      currentNumber: Number(this.state.currentNumber) + 1,
      totalNumber: 10,
      isSuccess: !this.state.isSuccess,
    });
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#f8f8f8', alignItems: 'center' }}>
        <Finger
          currentNumber={this.state.currentNumber}
          totalNumber={this.state.totalNumber}
          isSuccess={this.state.isSuccess}
          isNeedPageTip={true}
          commonTip="commonTip"
          tipPageTip="tipPageTip"
        ></Finger>

        <TouchableOpacity style={styles.button} onPress={this.click}>
          <Text style={{}}>模仿</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 30,
    backgroundColor: 'pink',
    borderRadius: 15,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
