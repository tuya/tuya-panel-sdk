/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { View, StyleProp, ViewStyle, StyleSheet } from 'react-native';
import { Rect } from 'react-native-svg';
import { LinearGradient, Utils } from 'tuya-panel-kit';

const { convertX: cx } = Utils.RatioUtils;

interface BarProps {
  style?: StyleProp<ViewStyle>;
  width?: number;
  height?: number;
  colors?: string[];
}

// Animated.createAnimatedComponent() Must be passed in a class Component
class Bar extends React.Component<BarProps> {
  render() {
    const {
      style,
      width,
      height,
      colors: [color1, color2],
    } = this.props;

    return (
      <View style={[styles.container, { width, height }, style]}>
        <LinearGradient
          gradientId="Gradient1"
          style={{ width, height: cx(93) }}
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
          stops={{ '0%': color1, '100%': color2 }}
        >
          <Rect width={width} height={cx(93)} />
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
});

export default Bar;
