import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { CountdownView } from '@tuya/tuya-panel-electrician-sdk';

export default class Countdown extends PureComponent {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'grey' }}>
        <CountdownView value={55} counting formatString="开关在{0}:{1}:{2}后关闭" timeUnit="hour" />
      </View>
    );
  }
}
