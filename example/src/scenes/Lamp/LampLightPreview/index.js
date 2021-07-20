import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { LampLightPreview } from '@tuya/tuya-panel-lamp-sdk';

export default class LampLightPreviewScene extends PureComponent {
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
        <LampLightPreview workMode="white" bright={800} temperature={0} />
        <LampLightPreview
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
