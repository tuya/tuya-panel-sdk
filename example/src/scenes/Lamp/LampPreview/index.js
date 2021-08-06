import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { LampPreview } from '@tuya/tuya-panel-lamp-sdk';

export default class LampPreviewScene extends PureComponent {
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
        <LampPreview workMode="white" bright={800} temperature={0} />
        <LampPreview
          workMode="colour"
          colour={{
            hue: 180,
            saturation: 800,
            value: 1000,
          }}
        />
      </View>
    );
  }
}
