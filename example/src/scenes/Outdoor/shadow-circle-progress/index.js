import React from 'react';
import { View } from 'react-native';
import { ShadowCircleProgress } from '@tuya/tuya-panel-outdoor-sdk';

const CircleProgress = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#FFF', paddingTop: 10 }}>
      <ShadowCircleProgress
        themeColor="#FB7319"
        unit="steps"
        title={1111}
        progressValue={Math.random() * 100}
      />
    </View>
  );
};
export default CircleProgress;
