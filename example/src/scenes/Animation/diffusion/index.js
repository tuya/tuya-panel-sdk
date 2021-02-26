import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { Diffusion } from '@tuya/tuya-panel-animation-sdk';

export default class DiffusionAnimatedScene extends PureComponent {
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#338BFF',
        }}
      >
        <Diffusion
          renderContent={
            <View style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: '#fff' }} />
          }
        />
      </View>
    );
  }
}
