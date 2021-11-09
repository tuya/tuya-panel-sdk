/* eslint-disable no-console */
import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { SlideChoose } from '@tuya/tuya-panel-lock-sdk';

const SlideChooseDemo = () => {
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.title}>default</Text>
        <View style={[styles.group, { height: 100 }]}>
          <SlideChoose
            onChooseLeft={() => console.log('left')}
            onChooseRight={() => console.log('right')}
          />
        </View>

        <Text style={styles.title}>custom btn text </Text>
        <View style={[styles.group, { height: 100 }]}>
          <SlideChoose leftText="reject" rightText="agree" />
        </View>

        <Text style={styles.title}>custom btn colors </Text>
        <View style={[styles.group, { height: 100 }]}>
          <SlideChoose
            leftColors={{ '0%': 'skyblue', '100%': 'blue' }}
            rightColors={{ '0%': 'yellow', '100%': 'orange' }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
  },
  group: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 200,
    justifyContent: 'space-around',
    width: '100%',
  },
  title: {
    color: 'black',
    fontSize: 16,
  },
});

export default SlideChooseDemo;
