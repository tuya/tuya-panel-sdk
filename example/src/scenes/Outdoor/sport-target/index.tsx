import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { Utils, Progress } from 'tuya-panel-kit';
import { SportTargetContent, SportTarget } from '@tuya/tuya-panel-outdoor-sdk';
import icons from './res/icons';
import Res from './res';

const { convertX: cx } = Utils.RatioUtils;

const Component = () => {
  const themeColor = '#0376FF';

  return (
    <View style={{ flex: 1, backgroundColor: '#FFF', paddingTop: 10 }}>
      <SportTarget
        curStep={100}
        targetSteps={200}
        themeColor={themeColor}
        centerView={{
          bgImage: Res.sport_clock,
          children: (
            <SportTargetContent
              step={100}
              targetIcon={icons.target}
              targetIconColor={themeColor}
              stepColor={themeColor}
              stepOpacity={0.5}
            />
          ),
        }}
      ></SportTarget>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Component;
