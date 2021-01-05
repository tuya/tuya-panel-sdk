import React, { PureComponent } from 'react';
import { ViewStyle } from 'react-native';

interface IParticleProps {
  width: number,
  height: number,
  duration?: number,
  active?: boolean,
  radius?: number,
  tolerance?: number,
  type?: 'diffuse' | 'absorb'
  color?: () => string | string | string[],
  dotRadius?: () => number| number | number[],
  amount?: number, 
  style?: ViewStyle,
}

export default class PercentBar extends PureComponent<IParticleProps> {}
