import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { TemperatureBrightPicker } from '@tuya/tuya-panel-lamp-sdk';

export default class TemperatureBrightPickerScene extends PureComponent {
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
        <TemperatureBrightPicker
          value={{
            brightness: 500,
            temperature: 1000,
          }}
        />
      </View>
    );
  }
}
