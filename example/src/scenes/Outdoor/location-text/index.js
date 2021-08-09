import React from 'react';
import { View } from 'react-native';
import { LocationText } from '@tuya/tuya-panel-outdoor-sdk';

const LocationTextView = () => {
  const lonlat = {
    longitude: 118.18396600000001,
    latitude: 28.19469100000005,
  };
  return (
    <View>
      <LocationText lonlat={lonlat} defaultText="未知地点" />
    </View>
  );
};
export default LocationTextView;
