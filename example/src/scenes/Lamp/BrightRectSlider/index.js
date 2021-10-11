import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { BrightRectSlider } from '@tuya/tuya-panel-lamp-sdk';

export default class BrightRectSliderScene extends PureComponent {
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#999',
          paddingHorizontal: 24,
        }}
      >
        <BrightRectSlider value={300} />
      </View>
    );
  }
}
