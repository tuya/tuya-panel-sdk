import _ from 'lodash';
import React, { Component } from 'react';
import { ViewPropTypes as VP, Easing, Image, View, Animated } from 'react-native';
import P from 'prop-types';
import { Utils } from 'tuya-panel-kit';
import { createAnimation, getImageUrl } from '../../utils';

const { convertX: cx } = Utils.RatioUtils;
const MovePropTypes = {
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
   *  动画切换时向上移动的距离
   */
  moveTop: P.number,
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
const MoveDefaultProps = {
  imgStyle: { width: cx(80), height: cx(80), resizeMode: 'stretch', tintColor: '#fff' },
  disabled: false,
  style: {
    justifyContent: 'center',
    alignItems: 'center',
    width: cx(160),
    height: cx(160),
  },
  moveTop: cx(20),
  useInitAnimated: true,
  initDelay: 400,
  onStartAnimted: () => {},
  onEndAnimted: () => {},
  animationConfig: MOVE_DEFAULT_ANIMATION_CONFIG,
};
const MOVE_DEFAULT_ANIMATION_CONFIG = {
  easing: Easing.bezier(0, 0, 0.25, 1),
  duration: 400,
  delay: 0,
  isInteraction: true,
  useNativeDriver: true,
};

export default class Move extends Component {
  static propTypes = MovePropTypes;
  static defaultProps = MoveDefaultProps;
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
          initDelay,
          easing,
          useNativeDriver,
          isInteraction,
        }),
        createAnimation({
          value: this.state.moveTop,
          toValue: 0,
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
        ...MOVE_DEFAULT_ANIMATION_CONFIG,
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
          value: this.state.moveTop,
          toValue: -this.props.moveTop,
          duration: duration / 2,
          delay,
          easing,
          useNativeDriver,
          isInteraction,
        }),
      ]).start(() => {
        this.setState(
          {
            imgUrl: getImageUrl(this.props.imgUrl),
            moveTop: new Animated.Value(this.props.moveTop),
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
              this.props.onEndAnimted && this.props.onEndAnimted();
            });
          }
        );
      });
    }
  };

  imgUrl;
  render() {
    const { style, disabled, imgStyle } = this.props;
    const { opacity, moveTop } = this.state;
    return (
      <View style={[style, disabled && { opacity: 0.5 }]}>
        <Animated.Image
          source={this.state.imgUrl}
          style={[imgStyle, { opacity }, { transform: [{ translateY: moveTop }] }]}
        />
      </View>
    );
  }
}
