import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { ScaleSlider } from '@tuya/tuya-panel-lamp-sdk';

export default class ScaleSliderScene extends PureComponent {
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#aaa',
          paddingHorizontal: 24,
        }}
      >
        <ScaleSlider value={300} thumbStyle={{ backgroundColor: '#000' }} />
      </View>
    );
  }
}
