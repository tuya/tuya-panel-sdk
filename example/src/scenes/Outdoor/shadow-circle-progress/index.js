import React from 'react';
import { View } from 'react-native';
import { ShadowCircleProgress } from '@tuya/tuya-panel-outdoor-sdk';
import Res from './res';

const CircleProgress = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#FFF', paddingTop: 10 }}>
      <ShadowCircleProgress
        themeColor="#FB7319"
        unit="steps"
        title={1000}
        disabled={false}
        progressValue={Math.random() * 100}
        progressY={Res.progressY}
        progressYY={Res.progressYY}
      />
    </View>
  );
};
export default CircleProgress;
