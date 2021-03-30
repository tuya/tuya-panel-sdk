/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import React from 'react';
import { View } from 'react-native';
import { ScheduleList } from '@tuya/tuya-panel-electrician-sdk';

const Scene = () => (
  <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'grey' }}>
    <ScheduleList dpCodes={['auto', 'anion']} />
  </View>
);

export default Scene;
