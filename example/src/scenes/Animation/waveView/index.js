import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { WaveView } from '@tuya/tuya-panel-animation-sdk';

export default class WaveViewAnimatedScene extends PureComponent {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <WaveView
          style={{ width: 120, height: 120 }}
          H={60}
          waveParams={[
            { A: 25, T: 140, fill: '#64c3d6' },
            { A: 20, T: 100, fill: '#0092ba' },
          ]}
          animated={true}
        />
        <WaveView
          style={{ width: 120, height: 120, borderRadius: 60 }}
          H={60}
          waveParams={[
            { A: 15, T: 120, fill: '#bde1dd' },
            { A: 10, T: 100, fill: '#239c8e' },
          ]}
          animated={true}
        />
      </View>
    );
  }
}
