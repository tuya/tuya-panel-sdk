import React from 'react';
import { View } from 'react-native';
import { Battery } from '@tuya/tuya-panel-outdoor-sdk';

const BatteryView = () => {
  return (
    <View>
      <Battery themeColor="#72E19A" total={80} chargeState deviceOnline />
      <Battery themeColor="#72E19A" total={100} chargeState={false} deviceOnline />
    </View>
  );
};
export default BatteryView;
