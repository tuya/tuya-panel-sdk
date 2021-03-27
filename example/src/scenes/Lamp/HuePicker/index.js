import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { HuePicker } from '@tuya/tuya-panel-lamp-sdk';

export default class HuePickerScene extends PureComponent {
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
        <HuePicker value={300} />
      </View>
    );
  }
}
