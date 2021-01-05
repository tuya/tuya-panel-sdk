import _ from 'lodash';
import React, { Component } from 'react';
import { ViewPropTypes as VP, Easing, Image, View, Animated } from 'react-native';
import P from 'prop-types';
import { Utils } from 'tuya-panel-kit';
import { createAnimation, getImageUrl } from '../../utils';

const { convertX: cx } = Utils.RatioUtils;
const ScalePropTypes = {
  /**
   *  当前图标
   */
  imgUrl: P.oneOfType([P.number, P.string]).isRequired,
  /**
   *  图片样式
   */
  imgStyle: Image.propTypes.style,
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
   *  动画开始时回调
   */
  onStartAnimted: P.func,
  /**
   *  动画结束时回调
   */
  onEndAnimted: P.func,
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
const ScaleDefaultProps = {
  imgStyle: { width: cx(24), height: cx(24), resizeMode: 'stretch', tintColor: '#fff' },
  disabled: false,
  style: {
    justifyContent: 'center',
    alignItems: 'center',
    width: cx(46),
    height: cx(46),
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: cx(23),
  },
  useInitAnimated: true,
  initDelay: 400,
  onStartAnimted: () => {},
  onEndAnimted: () => {},
  animationConfig: SCALE_DEFAULT_ANIMATION_CONFIG,
};
const SCALE_DEFAULT_ANIMATION_CONFIG = {
  easing: Easing.bezier(0, 0, 0.25, 1),
  duration: 500,
  delay: 0,
  isInteraction: true,
  useNativeDriver: true,
};

export default class Scale extends Component {
  static propTypes = ScalePropTypes;
  static defaultProps = ScaleDefaultProps;
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
          initDelay,
          easing,
          useNativeDriver,
          isInteraction,
        }),
        createAnimation({
          value: this.state.scale,
          toValue: 1,
          duration: duration / 2,
          initDelay,
          easing,
          useNativeDriver,
          isInteraction,
        }),
      ]).start(() => {
        this.props.onEndAnimted && this.props.onEndAnimted();
      });
    }
  };

  componentDidUpdate = preProps => {
    if (preProps.imgUrl !== this.props.imgUrl) {
      const animationConfig = {
        ...SCALE_DEFAULT_ANIMATION_CONFIG,
        ...this.props.animationConfig,
      };
      const { duration, delay, easing, useNativeDriver, isInteraction } = animationConfig;
      this.props.onStartAnimted && this.props.onStartAnimted();
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
        this.setState({ imgUrl: getImageUrl(this.props.imgUrl) });
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
          this.props.onEndAnimted && this.props.onEndAnimted();
        });
      });
    }
  };

  imgUrl;
  render() {
    const { style, disabled, imgStyle } = this.props;
    const { opacity, scale } = this.state;
    return (
      <View style={[style, disabled && { opacity: 0.5 }]}>
        <Animated.Image
          source={this.state.imgUrl}
          style={[imgStyle, { opacity }, { transform: [{ scale }] }]}
        />
      </View>
    );
  }
}
