import React from 'react';
import { View } from 'react-native';
import { TurnLight } from '@tuya/tuya-panel-outdoor-sdk';

const TurnLightExample = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#FFF', paddingTop: 10 }}>
      <TurnLight switchLight direction="straight" />
      <TurnLight switchLight direction="left" />
    </View>
  );
};
export default TurnLightExample;
