import React from 'react';
import { View } from 'react-native';
import { SocketView } from '@tuya/tuya-panel-electrician-sdk';

const Scene = () => (
  <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'grey' }}>
    <SocketView />
  </View>
);

export default Scene;
