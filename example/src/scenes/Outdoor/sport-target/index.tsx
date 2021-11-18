import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { Utils, Progress } from 'tuya-panel-kit';
import { SportTargetContent, SportTarget } from '@tuya/tuya-panel-outdoor-sdk';
import icons from './res/icons';
import Res from './res';

const { convertX: cx } = Utils.RatioUtils;

const Component = () => {
  const themeColor = '#0376FF';
  const step = 100;
  const target = 200;

  return (
    <View style={{ flex: 1, backgroundColor: '#FFF', paddingTop: 10 }}>
      <SportTarget
        curStep={step}
        targetSteps={target}
        targetText={`Today's goal ｜ ${step}step`}
        percentText="You have achieved your goal"
        themeColor={themeColor}
        centerView={{
          bgImage: Res.sport_clock,
          children: (
            <SportTargetContent
              step={step}
              targetIcon={icons.target}
              targetIconColor={themeColor}
              stepColor={themeColor}
              stepValue="step"
              stepOpacity={0.5}
            />
          ),
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Component;
