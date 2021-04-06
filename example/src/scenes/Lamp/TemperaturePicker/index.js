import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { TemperaturePicker } from '@tuya/tuya-panel-lamp-sdk';

export default class TemperaturePickerScene extends PureComponent {
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#eee',
        }}
      >
        <TemperaturePicker value={800} />
        <TemperaturePicker value={500} innerRadius={0} />
      </View>
    );
  }
}
