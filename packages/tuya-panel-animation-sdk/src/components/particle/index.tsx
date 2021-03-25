import React, { Component } from 'react';
import _ from 'lodash';
import { Utils } from 'tuya-panel-kit';
import { StyleProp, ViewStyle, View } from 'react-native';
import SingleParticle from './single-particle';

const DEFAULT_DOT_RADIUS = 2;

const { viewWidth } = Utils.RatioUtils;

export const defaultType = {
  width: viewWidth,
  height: 300,
  amount: 50,
  duration: 3000,
  active: true,
  radius: 50,
  color: '#fff',
  type: 'diffuse' as 'diffuse' | 'absorb',
  dotRadius: DEFAULT_DOT_RADIUS,
};

export type ISingleParticleProps = {
  color?: string | string[];
  dotRadius?: () => number | number | number[];
  amount?: number;
  style?: StyleProp<ViewStyle>;
} & Partial<typeof defaultType>;

export default class Particle extends Component<ISingleParticleProps, any> {
  static defaultProps = defaultType;

  render() {
    const { width, height, amount, style, color, ...rest } = this.props;
    return (
      <View
        style={[
          {
            backgroundColor: '#000',
            overflow: 'hidden',
          },
          style,
          { width, height },
        ]}
      >
        {_.times(amount, i => {
          const singleColor = Array.isArray(color)
            ? color[Math.floor(color.length * Math.random())]
            : color;
          return (
            <SingleParticle key={i} color={singleColor} width={width} height={height} {...rest} />
          );
        })}
      </View>
    );
  }
}
