import React from 'react';
import { View } from 'react-native';
import { CountdownList } from '@tuya/tuya-panel-electrician-sdk';

const Scene = () => (
  <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'grey' }}>
    <CountdownList dpCodes={['humidity_set']} />
  </View>
);

export default Scene;
