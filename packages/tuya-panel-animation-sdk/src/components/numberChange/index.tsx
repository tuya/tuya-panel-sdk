import _ from 'lodash';
import React, { Component } from 'react';
import { Easing, View, Animated, ViewStyle, StyleProp } from 'react-native';
import { UnitText, TYText } from 'tuya-panel-kit';
import { createAnimation } from '../../utils';

const NUMBERCHANGE_DEFAULT_ANIMATION_CONFIG = {
  easing: Easing.bezier(0, 0, 0.25, 1),
  duration: 800,
  delay: 0,
  isInteraction: true,
  useNativeDriver: true,
};

interface NumberChangePropTypes {
  value?: number;
  useUnitText?: boolean;
  color?: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
  useInitAnimated?: boolean;
  initDelay?: number;
  disabled?: boolean;
  animationConfig?: {
    easing?: (...args: any[]) => any;
    duration?: number;
    delay?: number;
    isInteraction?: boolean;
    useNativeDriver?: boolean;
  };
}

interface NumberChangeStateTypes {
  value: Animated.Value;
  displayValue: string;
}

export default class NumberChange extends Component<NumberChangePropTypes, NumberChangeStateTypes> {
  static defaultProps: NumberChangePropTypes = {
    value: 0,
    useUnitText: false,
    color: '#000',
    size: 16,
    disabled: false,
    useInitAnimated: true,
    style: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    initDelay: 400,
    animationConfig: NUMBERCHANGE_DEFAULT_ANIMATION_CONFIG,
  };

  constructor(props) {
    super(props);
    const value = new Animated.Value(props.useInitAnimated ? 0 : props.value);
    this.state = {
      value,
      displayValue: props.useInitAnimated ? 0 : props.value.toString(),
    };
    this.fixedNumber = this.getFixedNumber(props.value);
    value.addListener(({ value: innerValue }) => {
      this.setState({ displayValue: innerValue.toFixed(this.fixedNumber) });
    });
  }

  componentDidMount = () => {
    const { initDelay, value, useInitAnimated } = this.props;
    if (useInitAnimated) {
      const animationConfig = {
        ...NUMBERCHANGE_DEFAULT_ANIMATION_CONFIG,
        ...this.props.animationConfig,
      };
      const { duration, easing, useNativeDriver, isInteraction } = animationConfig;
      createAnimation({
        value: this.state.value,
        toValue: value,
        duration,
        delay: initDelay,
        easing,
        useNativeDriver,
        isInteraction,
      }).start();
    }
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.value !== this.props.value) {
      this.fixedNumber = this.getFixedNumber(nextProps.value);
      const { value } = nextProps;
      const animationConfig = {
        ...NUMBERCHANGE_DEFAULT_ANIMATION_CONFIG,
        ...nextProps.animationConfig,
      };
      const { duration, delay, easing, useNativeDriver, isInteraction } = animationConfig;
      createAnimation({
        value: this.state.value,
        toValue: value,
        duration,
        delay,
        easing,
        useNativeDriver,
        isInteraction,
      }).start();
    }
  };

  getFixedNumber = value => {
    return `${value}`.indexOf('.') !== -1 ? `${value}`.split('.')[1].length : 0;
  };

  fixedNumber: number;

  render() {
    const { style, useUnitText, color, size, disabled } = this.props;
    return (
      <View style={[style, disabled && { opacity: 0.5 }]}>
        {useUnitText ? (
          <UnitText value={this.state.displayValue} valueColor={color} valueSize={size} />
        ) : (
          <TYText color={color} size={size} text={this.state.displayValue} />
        )}
      </View>
    );
  }
}
