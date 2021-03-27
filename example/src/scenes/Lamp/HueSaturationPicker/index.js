import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { HueSaturationPicker } from '@tuya/tuya-panel-lamp-sdk';

export default class HueSaturationPickerScene extends PureComponent {
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
        <HueSaturationPicker value={{ hue: 300, saturation: 800 }} />
      </View>
    );
  }
}
