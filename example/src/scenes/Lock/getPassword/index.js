import React, { Component } from 'react';
import { View } from 'react-native';
import { GetPassword } from '@tuya/tuya-panel-lock-sdk';

export default class Password extends Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#f8f8f8' }}>
        <GetPassword
          passwordColor={'pink'}
          onValueChange={value => {
            console.log(value, '===value');
          }}
        ></GetPassword>
      </View>
    );
  }
}
