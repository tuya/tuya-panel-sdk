import React, { Component } from 'react';
import { View } from 'react-native';
import { RandomPassword } from '@tuya/tuya-panel-lock-sdk';

export default class RandomPasswordView extends Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#f8f8f8' }}>
        <RandomPassword
          wrapperStyle={{ marginVertical: 8 }}
          savePassword={psw => console.log(`psw`, psw)}
        />
      </View>
    );
  }
}
