import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { TemperaturePolarPicker } from '@tuya/tuya-panel-lamp-sdk';

export default class TemperaturePolarPickerScene extends PureComponent {
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
        <TemperaturePolarPicker value={800} />
        <TemperaturePolarPicker value={800} innerRadius={0} />
      </View>
    );
  }
}
