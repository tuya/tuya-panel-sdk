import React from 'react';
import { View } from 'react-native';
import { NameEditor } from '@tuya/tuya-panel-electrician-sdk';

const Scene = () => (
  <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'grey' }}>
    <NameEditor dpCode="switch_1" />
  </View>
);

export default Scene;
