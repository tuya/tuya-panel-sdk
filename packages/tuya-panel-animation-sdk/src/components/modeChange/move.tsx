import _ from 'lodash';
import React, { Component } from 'react';
import {
  Easing,
  View,
  Animated,
  ImageStyle,
  StyleProp,
  ViewStyle,
  ImageSourcePropType,
} from 'react-native';
import { createAnimation, getImageUrl } from '../../utils';

interface ModeChangeProps {
  imgUrl: number | string;
  imgStyle?: StyleProp<ImageStyle>;
  style?: StyleProp<ViewStyle>;
  useInitAnimated?: boolean;
  initDelay?: number;
  disabled?: boolean;
  moveTop?: number;
  onStartAnimted?: () => void;
  onEndAnimted?: () => void;
  renderContent?: React.ReactNode;
  animationConfig?: {
    easing?: (...args: any[]) => any;
    duration?: number;
    delay?: number;
    isInteraction?: boolean;
    useNativeDriver?: boolean;
  };
}

const MOVE_DEFAULT_ANIMATION_CONFIG = {
  easing: Easing.bezier(0, 0, 0.25, 1),
  duration: 400,
  delay: 0,
  isInteraction: true,
  useNativeDriver: true,
};

interface ModeChangeState {
  opacity: Animated.Value;
  moveTop: Animated.Value;
  imgUrl: ImageSourcePropType;
}

export default class Move extends Component<ModeChangeProps, ModeChangeState> {
  static defaultProps = {
    imgStyle: null,
    disabled: false,
    style: null,
    renderContent: null,
    moveTop: 20,
    useInitAnimated: true,
    initDelay: 400,
    onStartAnimted: () => {},
    onEndAnimted: () => {},
    animationConfig: MOVE_DEFAULT_ANIMATION_CONFIG,
  };

  constructor(props) {
    super(props);
    this.state = {
      opacity: new Animated.Value(+!props.useInitAnimated),
      moveTop: new Animated.Value(!props.useInitAnimated ? 0 : props.moveTop),
      imgUrl: getImageUrl(props.imgUrl),
    };
  }

  componentDidMount = () => {
    const { useInitAnimated, initDelay } = this.props;
    if (useInitAnimated) {
      const animationConfig = {
        ...MOVE_DEFAULT_ANIMATION_CONFIG,
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
          value: this.state.moveTop,
          toValue: 0,
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
        ...MOVE_DEFAULT_ANIMATION_CONFIG,
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
          value: this.state.moveTop,
          toValue: -nextProps.moveTop,
          duration: duration / 2,
          delay,
          easing,
          useNativeDriver,
          isInteraction,
        }),
      ]).start(() => {
        this.setState(
          {
            imgUrl: getImageUrl(nextProps.imgUrl),
            moveTop: new Animated.Value(nextProps.moveTop),
          },
          () => {
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
                value: this.state.moveTop,
                toValue: 0,
                duration: duration / 2,
                delay,
                easing,
                useNativeDriver,
                isInteraction,
              }),
            ]).start(() => {
              nextProps.onEndAnimted && nextProps.onEndAnimted();
            });
          }
        );
      });
    }
  };

  render() {
    const { style, disabled, imgStyle, renderContent } = this.props;
    const { opacity, moveTop } = this.state;
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
              { width: 80, height: 80, resizeMode: 'stretch', tintColor: '#fff' },
              imgStyle,
              { opacity },
              { transform: [{ translateY: moveTop }] },
            ]}
          />
        )}
      </View>
    );
  }
}
