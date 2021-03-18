import React from 'react';
import { View } from 'react-native';
import { SocketListItem } from '@tuya/tuya-panel-electrician-sdk';

const Scene = () => (
  <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'grey' }}>
    <SocketListItem socketCode="auto" countdownCode="auto" value={100} />
  </View>
);

export default Scene;
