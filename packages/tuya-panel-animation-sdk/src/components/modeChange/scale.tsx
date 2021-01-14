import _ from 'lodash';
import React, { Component } from 'react';
import {
  Easing,
  ImageSourcePropType,
  View,
  Animated,
  StyleProp,
  ImageStyle,
  ViewStyle,
} from 'react-native';
import { createAnimation, getImageUrl } from '../../utils';

interface ModeChangeScaleProps {
  imgUrl: number | string;
  imgStyle?: StyleProp<ImageStyle>;
  style?: StyleProp<ViewStyle>;
  useInitAnimated?: boolean;
  initDelay?: number;
  disabled?: boolean;
  moveTop?: number;
  renderContent?: React.ReactNode;
  onStartAnimted?: () => void;
  onEndAnimted?: () => void;
  animationConfig?: {
    easing?: (...args: any[]) => any;
    duration?: number;
    delay?: number;
    isInteraction?: boolean;
    useNativeDriver?: boolean;
  };
}

const SCALE_DEFAULT_ANIMATION_CONFIG = {
  easing: Easing.bezier(0, 0, 0.25, 1),
  duration: 500,
  delay: 0,
  isInteraction: true,
  useNativeDriver: true,
};

interface ModeChangeScaleState {
  opacity: Animated.Value;
  moveTop?: Animated.Value;
  scale: Animated.Value;
  imgUrl: ImageSourcePropType;
}

export default class Scale extends Component<ModeChangeScaleProps, ModeChangeScaleState> {
  static defaultProps = {
    imgStyle: null,
    disabled: false,
    style: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 46,
      height: 46,
      backgroundColor: 'rgba(0,0,0,0.8)',
      borderRadius: 23,
    },
    renderContent: null,
    useInitAnimated: true,
    initDelay: 400,
    onStartAnimted: () => {},
    onEndAnimted: () => {},
    animationConfig: SCALE_DEFAULT_ANIMATION_CONFIG,
  };

  constructor(props) {
    super(props);
    this.state = {
      opacity: new Animated.Value(+!props.useInitAnimated),
      scale: new Animated.Value(+!props.useInitAnimated),
      imgUrl: getImageUrl(props.imgUrl),
    };
  }

  componentDidMount = () => {
    const { useInitAnimated, initDelay } = this.props;
    if (useInitAnimated) {
      const animationConfig = {
        ...SCALE_DEFAULT_ANIMATION_CONFIG,
        ...this.props.animationConfig,
      };
      const { duration, easing, useNativeDriver, isInteraction } = animationConfig;
      this.props.onStartAnimted && this.props.onStartAnimted();
      Animated.parallel([
        createAnimation({
          value: this.state.opacity,
          toValue: 1,
          duration: duration / 2,
          delay: initDelay,
          easing,
          useNativeDriver,
          isInteraction,
        }),
        createAnimation({
          value: this.state.scale,
          toValue: 1,
          duration: duration / 2,
          delay: initDelay,
          easing,
          useNativeDriver,
          isInteraction,
        }),
      ]).start(() => {
        this.props.onEndAnimted && this.props.onEndAnimted();
      });
    }
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.imgUrl !== this.props.imgUrl) {
      const animationConfig = {
        ...SCALE_DEFAULT_ANIMATION_CONFIG,
        ...nextProps.animationConfig,
      };
      const { duration, delay, easing, useNativeDriver, isInteraction } = animationConfig;
      nextProps.onStartAnimted && nextProps.onStartAnimted();
      Animated.parallel([
        createAnimation({
          value: this.state.opacity,
          toValue: 0,
          duration: duration / 2,
          delay,
          easing,
          useNativeDriver,
          isInteraction,
        }),
        createAnimation({
          value: this.state.scale,
          toValue: 0,
          duration: duration / 2,
          delay,
          easing,
          useNativeDriver,
          isInteraction,
        }),
      ]).start(() => {
        this.setState({ imgUrl: getImageUrl(nextProps.imgUrl) });
        Animated.parallel([
          createAnimation({
            value: this.state.opacity,
            toValue: 1,
            duration: duration / 2,
            delay,
            easing,
            useNativeDriver,
            isInteraction,
          }),
          createAnimation({
            value: this.state.scale,
            toValue: 1,
            duration: duration / 2,
            delay,
            easing,
            useNativeDriver,
            isInteraction,
          }),
        ]).start(() => {
          nextProps.onEndAnimted && nextProps.onEndAnimted();
        });
      });
    }
  };

  render() {
    const { style, disabled, imgStyle, renderContent } = this.props;
    const { opacity, scale } = this.state;
    return (
      <View
        style={[
          {
            justifyContent: 'center',
            alignItems: 'center',
            width: 160,
            height: 160,
          },
          style,
          disabled && { opacity: 0.5 },
        ]}
      >
        {React.isValidElement(renderContent) ? (
          renderContent
        ) : (
          <Animated.Image
            source={this.state.imgUrl}
            style={[
              { width: 24, height: 24, resizeMode: 'stretch', tintColor: '#fff' },
              imgStyle,
              { opacity },
              { transform: [{ scale }] },
            ]}
          />
        )}
      </View>
    );
  }
}
