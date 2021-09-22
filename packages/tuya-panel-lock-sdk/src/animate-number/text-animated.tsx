import React, { Component } from 'react';
import { Animated } from 'react-native';
import { TYText } from 'tuya-panel-kit';
import { TextInputIProp } from './interface';

export class TextInputForAnimated extends Component<TextInputIProp> {
  render() {
    const { index, displayValues, ...others } = this.props;
    return <TYText {...others}>{displayValues[~~index]}</TYText>;
  }
}

const AnimatedText = Animated.createAnimatedComponent(TextInputForAnimated);

export default AnimatedText;
