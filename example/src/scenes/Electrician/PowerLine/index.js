import React from 'react';
import { View } from 'react-native';
import { PowerLine } from '@tuya/tuya-panel-electrician-sdk';

const Scene = () => (
  <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#fff', paddingTop: 100 }}>
    <PowerLine />
  </View>
);

export default Scene;
