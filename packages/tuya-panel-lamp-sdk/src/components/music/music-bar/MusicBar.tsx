/* eslint-disable react/no-array-index-key */
import React from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { Utils } from 'tuya-panel-kit';
import { useUnmountedRef, useCreation } from 'ahooks';
import _ from 'lodash';
import useEffectOnce from '../../../hooks/useEffectOnce';
import Bar from './Bar';
import { MusicBarProps } from './interface';

const { convertX: cx } = Utils.RatioUtils;
const AnimatedRectangle = Animated.createAnimatedComponent(Bar);
const durationMap = [510, 470, 430, 390, 350, 310, 270, 230, 190, 150];

const MusicBar: React.FC<MusicBarProps> = ({ style, musicIndex, colors, size, barNum = 22 }) => {
  const bars = useCreation(() => _.times(barNum, () => new Animated.Value(1)), [barNum]);
  const unmountRef = useUnmountedRef();

  const animate = (index: number) => {
    const duration = durationMap[musicIndex];
    Animated.sequence([
      Animated.timing(bars[index], {
        toValue: size * 2 * Math.random(), // Control the height of the random value of the animation bar upward
        duration,
      }),
      Animated.timing(bars[index], {
        toValue: (size / 10) * Math.random(), // Control the height of the animation bar downward random value
        duration,
      }),
    ]).start(() => {
      if (!unmountRef.current) animate(index);
    });
  };

  useEffectOnce(() => {
    const timers = bars.map((__, index) => setTimeout(() => animate(index), index * 50));
    return () => timers.forEach(t => clearTimeout(t));
  });

  return (
    <View style={[styles.container, style]}>
      {bars.map((item, index) => (
        <AnimatedRectangle key={index} colors={colors} width={cx(11)} height={item} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    height: cx(94),
    justifyContent: 'space-between',
    overflow: 'hidden',
    width: '100%',
  },
});

export default MusicBar;
