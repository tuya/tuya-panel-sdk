import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { HueBrightCrossSlider } from '@tuya/tuya-panel-lamp-sdk';

export default class HueBrightCrossSliderScene extends PureComponent {
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
        <HueBrightCrossSlider value={{ hue: 0, saturation: 1000, value: 1000 }} />
      </View>
    );
  }
}
