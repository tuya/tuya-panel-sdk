import React from 'react';
import { View } from 'react-native';
import { ShuffingList } from '@tuya/tuya-panel-electrician-sdk';

const Scene = () => (
  <View
    style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF' }}
  >
    <ShuffingList
      data={[
        { key: 'switch1', title: 'switch1', code: 'switch_1' },
        { key: 'switch2', title: 'switch2', code: 'switch_2' },
        { key: 'switch3', title: 'switch3', code: 'switch_3' },
        { key: 'switch4', title: 'switch4', code: 'switch_4' },
      ]}
      themeColor="#341234"
      contentWidth={290}
      itemWidth={85}
      marginRight={10}
      numberOfLines={1}
      onIndexChange={() => {}}
    />
  </View>
);

export default Scene;
