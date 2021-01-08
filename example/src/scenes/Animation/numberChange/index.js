import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { NumberChange } from '@tuya-smart/tuya-panel-animation-sdk';

export default class NumberChangeAnimatedScene extends PureComponent {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <NumberChange value={60} />
      </View>
    );
  }
}
