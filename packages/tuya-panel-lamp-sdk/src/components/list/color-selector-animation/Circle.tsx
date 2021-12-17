import React, { useRef, useEffect } from 'react';
import { StyleSheet, Animated } from 'react-native';
import { Utils } from 'tuya-panel-kit';
import { ICircle } from './interface';

const { convertX: cx } = Utils.RatioUtils;

const Circle: React.FC<ICircle> = ({ scaleValue, backgroundColor }) => {
  const fadeAnim = useRef(new Animated.Value(scaleValue)).current;
  useEffect(() => {
    Animated.spring(fadeAnim, {
      toValue: scaleValue,
    }).start();
  }, [scaleValue]);

  return (
    <Animated.View
      style={[
        styles.colorBtn,
        {
          backgroundColor,
          transform: [{ scale: fadeAnim }],
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  colorBtn: {
    borderRadius: cx(14),
    height: cx(28),
    width: cx(28),
  },
});

export default Circle;
