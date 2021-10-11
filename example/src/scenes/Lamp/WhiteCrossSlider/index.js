import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { WhiteCrossSlider } from '@tuya/tuya-panel-lamp-sdk';

export default class WhiteCrossSliderScene extends PureComponent {
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#999',
        }}
      >
        <WhiteCrossSlider value={{ temperature: 0, brightness: 1000 }} />
      </View>
    );
  }
}
