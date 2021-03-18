/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import React from 'react';
import { View } from 'react-native';
import { CurtainControl } from '@tuya/tuya-panel-electrician-sdk';

const Scene = () => (
  <View
    style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#595959',
    }}
  >
    <CurtainControl
      data={[
        {
          controlCode: 'control',
          percentCode: 'percent_control',
          name: '窗帘',
        },
      ]}
    />
  </View>
);

export default Scene;
