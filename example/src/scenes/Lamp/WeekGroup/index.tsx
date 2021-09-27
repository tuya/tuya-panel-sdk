import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WeekGroup } from '@tuya/tuya-panel-lamp-sdk';
import _ from 'lodash';

const WeekGroups: React.FC = () => {
  return (
    <View style={styles.container}>
      <WeekGroup
        style={{ width: '100%' }}
        background="#323131"
        activeColor="#1082FE"
        theme={{ fontColor: '#fff' }}
        defaultValue={_.times(7, () => _.random(0, 1))}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
});

export default WeekGroups;
