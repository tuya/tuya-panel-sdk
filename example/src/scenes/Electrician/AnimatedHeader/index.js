/* eslint-disable import/extensions */
import React from 'react';
import _times from 'lodash/times';
import { View, Text, TouchableOpacity } from 'react-native';
import { AnimatedHeader } from '@tuya/tuya-panel-electrician-sdk';

const Scene = () => (
  <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'grey' }}>
    <AnimatedHeader
      rightDisable={false}
      content={() =>
        _times(10, d => (
          <TouchableOpacity
            key={d}
            style={{
              backgroundColor: '#304567',
              marginBottom: 1,
            }}
            onPress={() => AnimatedHeader.close()}
          >
            <Text style={{ color: '#FFFFFF', textAlign: 'center' }}>This is the {d} item</Text>
          </TouchableOpacity>
        ))
      }
    />
  </View>
);

export default Scene;
