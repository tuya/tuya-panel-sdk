import _ from 'lodash';
import React, { Component } from 'react';
import P from 'prop-types';
import { ViewPropTypes as VP, Easing, View, Animated } from 'react-native';
import { UnitText, TYText, Utils } from 'tuya-panel-kit';
import { createAnimation } from '../../utils';

const { convertX: cx } = Utils.RatioUtils;
const NUMBERCHANGE_DEFAULT_ANIMATION_CONFIG = {
  easing: Easing.bezier(0, 0, 0.25, 1),
  duration: 800,
  delay: 0,
  isInteraction: true,
  useNativeDriver: true,
};
const NumberChangePropTypes = {
  /**
   *  当前value
   */
  value: P.number,
  /**
   *  是否使用unittext
   */
  useUnitText: P.bool,
  /**
   *  字体颜色
   */
  color: P.string,
  /**
   *  字体大小
   */
  size: P.number,
  /**
   *  外层view块样式
   */
  style: VP.style,
  /**
   *  初始化加载是否使用动画
   */
  useInitAnimated: P.bool,
  /**
   *  第一次加载延迟时间
   */
  initDelay: P.number,
  /**
   *  是否禁用
   */
  disabled: P.bool,
  /**
   *  动画配置项
   */
  animationConfig: P.shape({
    easing: P.func,
    duration: P.number,
    delay: P.number,
    isInteraction: P.bool,
    useNativeDriver: P.bool,
  }),
};
const NumberChangeDefaultProps = {
  value: 0,
  useUnitText: false,
  color: '#000',
  size: cx(16),
  disabled: false,
  useInitAnimated: true,
  style: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  initDelay: 400,
  animationConfig: NUMBERCHANGE_DEFAULT_ANIMATION_CONFIG,
};

export default class NumberChange extends Component {
  static propTypes = NumberChangePropTypes;
  static defaultProps = NumberChangeDefaultProps;
  constructor(props) {
    super(props);
    const value = new Animated.Value(props.useInitAnimated ? 0 : props.value);
    this.state = {
      value,
      displayValue: props.useInitAnimated ? 0 : props.value,
    };
    this.fixedNumber = this.getFixedNumber(props.value);
    this.TextComponent = props.useUnitText ? UnitText : TYText;
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
        initDelay,
        easing,
        useNativeDriver,
        isInteraction,
      }).start();
    }
  };

  componentDidUpdate = preProps => {
    if (preProps.value !== this.props.value) {
      this.fixedNumber = this.getFixedNumber(this.props.value);
      const { value } = this.props;
      const animationConfig = {
        ...NUMBERCHANGE_DEFAULT_ANIMATION_CONFIG,
        ...this.props.animationConfig,
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
  AnimatedText;
  fixedNumber;

  render() {
    const { style, useUnitText, color, size, disabled } = this.props;
    let propsType = {};
    if (useUnitText) {
      propsType = {
        value: this.state.displayValue,
        valueColor: color,
        valueSize: size,
      };
    } else {
      propsType = {
        text: this.state.displayValue,
        color,
        size,
      };
    }
    return (
      <View style={[style, disabled && { opacity: 0.5 }]}>
        <this.TextComponent {...propsType} />
      </View>
    );
  }
}
