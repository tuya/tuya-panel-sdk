import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { CirclePicker } from '@tuya/tuya-panel-lamp-sdk';

export default class CirclePickerScene extends PureComponent {
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#333',
        }}
      >
        <CirclePicker value={300} />
      </View>
    );
  }
}
