import React, { Component } from 'react';
import { View } from 'react-native';
import { RandomPassword } from '@tuya/tuya-panel-lock-sdk';

export default class RandomPasswordView extends Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#f8f8f8' }}>
        <RandomPassword
          wrapperStyle={{ marginVertical: 24 }}
          savePassword={psw => console.log(`psw`, psw)}
        />
        <RandomPassword
          wrapperStyle={{ marginVertical: 24 }}
          locale="cn"
          randomText="随机"
          digitalBase={6}
          themeColor="#FF4800"
          savePassword={psw => console.log(`psw`, psw)}
        />
      </View>
    );
  }
}
