import React from 'react';
import { View, ImageBackground, StyleSheet, Image } from 'react-native';
import { Utils } from 'tuya-panel-kit';
import { PushAnimate } from '@tuya/tuya-panel-electrician-sdk';

const Res = {
  scenes: require('./res/scenes.png'),
  bg: require('./res/bg.png'),
  slider: require('./res/slider.png'),
};
const { convertX: cx } = Utils.RatioUtils;
const RAIL_WIDTH = cx(338);
const RAIL_HEIGHT = cx(248);

const Scene = () => {
  const value = 50;
  return (
    <View
      style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingTop: cx(100) }}
    >
      <ImageBackground source={Res.bg} style={styles.window}>
        <Image source={Res.scenes} style={styles.scenes} />
        <PushAnimate range={[0, 100]} value={value}>
          <Image source={Res.slider} style={styles.slideItem} />
        </PushAnimate>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  scenes: {
    alignSelf: 'center',
    height: RAIL_HEIGHT - cx(57),
    position: 'absolute',
    width: RAIL_WIDTH - cx(57),
  },
  slideItem: {
    alignItems: 'center',
    height: RAIL_HEIGHT - cx(40),
    justifyContent: 'center',
    width: RAIL_WIDTH - cx(40),
  },
  window: {
    alignItems: 'center',
    height: RAIL_HEIGHT,
    justifyContent: 'center',
    paddingBottom: cx(2),
    paddingLeft: cx(2.5),
    width: RAIL_WIDTH,
  },
});

export default Scene;
