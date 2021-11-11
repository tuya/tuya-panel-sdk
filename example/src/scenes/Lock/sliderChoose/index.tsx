/* eslint-disable no-console */
import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, ScrollView } from 'react-native';
import { SlideChoose } from '@tuya/tuya-panel-lock-sdk';

const lockIcon = require('./res/lock.png');
const unlockIcon = require('./res/unlock.png');

const SlideChooseDemo = () => {
  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.title}>default</Text>
      <View style={[styles.group, { height: 100 }]}>
        <SlideChoose
          sliderWidth={180}
          openWaveAnimation={false}
          btnTextColor="black"
          onChooseLeft={() => console.log('left')}
          onChooseRight={() => console.log('right')}
        />
      </View>

      <Text style={styles.title}>custom btn text or Icon</Text>
      <View style={[styles.group, { height: 200, flexDirection: 'column' }]}>
        <SlideChoose btnTextColor="black" leftText="reject" rightText="agree" />
        <SlideChoose
          leftColor={{ linearStops: { '100%': '#3DC0B1', '0%': '#239C8E' } }}
          rightColor={{ linearStops: { '0%': '#3DC0B1', '100%': '#239C8E' } }}
          handleIcon={lockIcon}
          indicatorColor="#fff"
          circleBgColor={{ linearStops: { '0%': '#1D9486', '100%': '#3EC1B2' } }}
          leftText={<Image source={lockIcon} />}
          rightText={<Image source={unlockIcon} />}
          handleStyle={{
            shadowColor: '#000000',
            shadowOffset: { width: 4, height: 4 },
            shadowOpacity: 0.8,
            shadowRadius: 6,
          }}
        />
      </View>

      <Text style={styles.title}>single side</Text>
      <View style={[styles.group, { height: 200, flexDirection: 'column' }]}>
        <SlideChoose
          singleSide
          async
          loadingText='loading...'
          triggerDistance={100}
          leftColor={{ linearStops: { '100%': '#3DC0B1', '0%': '#239C8E' } }}
          rightColor={{ linearStops: { '0%': '#3DC0B1', '100%': '#239C8E' } }}
          handleIcon={lockIcon}
          indicatorColor="#fff"
          circleBgColor={{ linearStops: { '0%': '#1D9486', '100%': '#3EC1B2' } }}
          leftText={<Image source={lockIcon} />}
          rightText={<Image source={unlockIcon} />}
          handleStyle={{
            shadowColor: '#000000',
            shadowOffset: { width: 4, height: 4 },
            shadowOpacity: 0.8,
            shadowRadius: 6,
            elevation: 20,
          }}
          onChooseEnd={done => {
            const delay = setTimeout(() => {
              clearTimeout(delay);
              done && done();
            }, 2000);
          }}
        />
        <SlideChoose
          singleSide="right"
          triggerDistance={100}
          loadingText="loading..."
          loadingTextColor="#fff"
          leftColor={{ linearStops: { '100%': '#3DC0B1', '0%': '#239C8E' } }}
          rightColor={{ linearStops: { '0%': '#3DC0B1', '100%': '#239C8E' } }}
          handleIcon={lockIcon}
          indicatorColor="#fff"
          circleBgColor={{ linearStops: { '0%': '#1D9486', '100%': '#3EC1B2' } }}
          leftText={<Image source={lockIcon} />}
          rightText={<Image source={unlockIcon} />}
          handleStyle={{
            shadowColor: '#000000',
            shadowOffset: { width: 4, height: 4 },
            shadowOpacity: 0.8,
            shadowRadius: 6,
            elevation: 20,
          }}
        />
      </View>

      <Text style={styles.title}>async function</Text>
      <View style={[styles.group, { height: 100 }]}>
        <SlideChoose
          async
          loadingText="loading..."
          loadingTextColor="black"
          onChooseLeft={done => {
            const delay = setTimeout(() => {
              clearTimeout(delay);
              done && done();
            }, 2000);
          }}
          onChooseRight={done => {
            const delay = setTimeout(() => {
              clearTimeout(delay);
              done && done();
            }, 2000);
          }}
          btnTextColor="black"
        />
      </View>

      <Text style={styles.title}>handle background image</Text>
      <View style={[styles.group, { height: 100 }]}>
        <SlideChoose
          async
          loadingText="loading...."
          leftColor={{ linearStops: { '100%': '#3DC0B1', '0%': '#239C8E' } }}
          rightColor={{ linearStops: { '0%': '#3DC0B1', '100%': '#239C8E' } }}
          handleIcon={lockIcon}
          indicatorColor="#fff"
          handleBgImage={require('./res/btnBg.png')}
          handleBgImageStyle={{ top: 13, width: 125, height: 125 }}
          leftText={<Image source={lockIcon} />}
          rightText={<Image source={unlockIcon} />}
          onChooseEnd={done => {
            const delay = setTimeout(() => {
              clearTimeout(delay);
              done && done();
            }, 2000);
          }}
        />
      </View>

      <Text style={styles.title}>custom btn colors </Text>
      <View style={[styles.group, { height: 100 }]}>
        <SlideChoose
          triggerDistance={50}
          waveColor="#fff"
          indicatorColor="black"
          leftColor={{
            linearStops: {
              '0%': '#FF4040',
              '100%': 'rgba(254,72,71,0.5)',
            },
          }}
          rightColor={{
            linearStops: {
              '0%': 'rgba(35,156,142,0.5)',
              '100%': '#239C8E',
            },
          }}
        />
      </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#fff',
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
