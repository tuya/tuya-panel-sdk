import React from 'react';
import P from 'prop-types';
import { View, Animated, Easing, ViewPropTypes as VP } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { createAnimation } from '../../utils';

const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const defaultStyle = {
  width: 100,
  height: 100,
  overflow: 'hidden',
  backgroundColor: 'transparent',
};

const WAVEVIEW_DEFAULT_ANIMATION_CONFIG = {
  easing: Easing.linear,
  duration: 5000,
  delay: 2000,
  isInteraction: true,
  useNativeDriver: true,
};

/**
 * ---------+------------------------+
 * <-- P -->|<--    T    -->|        |______
 *          |   /\          |   /\   |  ^
 *          |  /  \         |  /  \  |  A
 *          | /    \        | /    \ |  |
 *          |/      \       |/      \|__V___
 *          |        \      /        |  ^
 *          |         \    /         |  |
 *          |          \  /          |  |
 *          |           \/           |  H
 *          |                        |  |
 *          |                        |  |
 * ---------+------------------------+__V___
 */

const WaveViewPropTypes = {
  /**
   * @desc 水波高度（百分比）
   */
  H: P.number,
  /**
   * @desc 水波数组:{ A: 25, T: 140, fill: '#64c3d6' },
   *  A: 波峰高度  T: 单组波峰+波谷长度  fill: 填充色
   */
  waveParams: P.array,
  /**
   * @desc 外层块样式
   */
  style: VP.style,
  /**
   * @desc 是否挂载后立刻运动
   */
  animated: P.bool,
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

const WaveViewDefaultProps = {
  H: 50,
  waveParams: [],
  style: defaultStyle,
  animated: true,
  animationConfig: WAVEVIEW_DEFAULT_ANIMATION_CONFIG,
};

/**
 * @class Wave
 *
 * @prop {Number} H water level
 * @prop {Array} waveParams list of params: {A, T, fill}
 * @prop {bool} animated
 */
class Wave extends React.PureComponent {
  static propTypes = WaveViewPropTypes;
  static defaultProps = WaveViewDefaultProps;

  constructor(props) {
    super(props);

    const { H, waveParams, animated, style } = this.props;
    const wrapStyle = Object.assign({ ...defaultStyle }, style);

    this.state = {
      H: (wrapStyle.height * H) / 100,
      style: wrapStyle,
      waveParams,
    };

    this._animValues = [];
    this._animations = [];
    this._animated = animated || false;

    for (let i = 0; i < this.state.waveParams.length; i++) {
      this._animValues.push(new Animated.Value(0));
    }
  }

  componentDidMount() {
    this._animated && this.startAnim();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.animated !== nextProps.animated) {
      this._animated = nextProps.animated;
      this._animated && this.startAnim();
      !this._animated && this.stopAnim();
    }
  }

  componentWillUnmount() {
    this.stopAnim();
    this._animValues = null;
    this._animations = null;
  }

  startAnim() {
    this.stopAnim();
    const animationConfig = {
      ...WAVEVIEW_DEFAULT_ANIMATION_CONFIG,
      ...this.props.animationConfig,
    };

    const { duration, delay, easing, useNativeDriver, isInteraction } = animationConfig;

    for (let i = 0; i < this._animValues.length; i++) {
      const anim = Animated.loop(
        createAnimation({
          value: this._animValues[i],
          toValue: 1,
          duration: duration + delay * i,
          delay: 0,
          easing,
          useNativeDriver,
          isInteraction,
        })
      );
      this._animations.push(anim);
      anim.start();
    }
    this._animated = true;
  }

  stopAnim() {
    for (let i = 0; i < this._animations.length; i++) {
      this._animations[i].stop();
      this._animations[i] = null;
    }
    this._animations = [];
    this._animated = false;
  }

  render() {
    const { H, waveParams, style } = this.state;
    const waves = [];

    for (let i = 0; i < waveParams.length; i++) {
      const { A, T, fill } = waveParams[i];
      const translateX = this._animValues[i].interpolate({
        inputRange: [0, 1],
        outputRange: [0, -2 * T],
      });
      // 保证水波足够长
      const scale = style.width >= T ? Math.ceil(style.width / T) : 1;
      let d = `M 0 ${A} Q ${T / 4} ${2 * A} `;
      for (let j = 1; j < 6 * scale + 1; j++) {
        d += `${(T * j) / 2} ${A} ${j === 6 * scale ? 'V' : 'T'} `;
      }
      d += ` ${A + H} H 0 Z`;
      const wave = (
        <AnimatedSvg
          key={i}
          style={{
            width: 3 * scale * T,
            height: A + H,
            position: 'absolute',
            left: 0,
            bottom: 0,
            transform: [{ translateX }],
          }}
          preserveAspectRatio="xMinYMin meet"
          viewBox={`0 0 ${3 * scale * T} ${A + H}`}
        >
          <Path d={d} fill={fill} />
        </AnimatedSvg>
      );
      waves.push(wave);
    }

    return <View style={style}>{waves}</View>;
  }
}

export default Wave;
