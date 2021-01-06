import _ from 'lodash';
import React, { Component } from 'react';
import P from 'prop-types';
import { ViewPropTypes as VP, Easing, View, Animated } from 'react-native';
import { createAnimation } from '../../utils';

const DIFFUSION_DEFAULT_ANIMATION_CONFIG = {
  easing: Easing.bezier(0, 0, 0.25, 1),
  duration: 2000,
  delay: 0,
  isInteraction: true,
  useNativeDriver: false,
};
const DiffusionPropTypes = {
  /**
   *  波纹颜色
   */
  color: P.string,
  /**
   *  最内圈波纹半径大小
   */
  radius: P.number,
  /**
   *  扩散后最大值波纹半径大小
   */
  maxRadius: P.number,
  /**
   *  波纹宽度大小
   */
  width: P.number,
  /**
   *  波纹循环一次条数
   */
  number: P.number,
  /**
   *  波纹间隔多久出现
   */
  mainDelay: P.number,
  /**
   *  间隔多久进行循环，为0代表持续循环
   */
  intervalTime: P.number,
  /**
   *  是否开始动画标志
   */
  startAnimated: P.bool,
  /**
   *  容器样式
   */
  style: VP.style,
  /**
   *  圆圈样式
   */
  circleStyle: VP.style,
  /**
   * 渲染自定义内容
   */
  renderContent: P.func,
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
const DiffusionDefaultProps = {
  radius: 50,
  maxRadius: 100,
  color: 'rgba(255,255,255,0.5)',
  width: 5,
  number: 2,
  intervalTime: 0,
  startAnimated: true,
  mainDelay: 1000,
  animationConfig: DIFFUSION_DEFAULT_ANIMATION_CONFIG,
  style: {},
  circleStyle: {},
  renderContent: () => {},
};

export default class Diffusion extends Component {
  static propTypes = DiffusionPropTypes;
  static defaultProps = DiffusionDefaultProps;
  constructor(props) {
    super(props);
    const obj = {};
    for (let i = 0; i < this.props.number; i++) {
      obj[`stateRadius${i}`] = new Animated.Value(props.radius);
      obj[`stateOpacity${i}`] = new Animated.Value(0);
    }
    this.state = obj;
  }

  componentDidMount = () => {
    this.props.startAnimated && this.startAnimated();
  };

  componentDidUpdate = preProps => {
    if (preProps.startAnimated !== this.props.startAnimated) {
      if (this.props.startAnimated) {
        this.startAnimated();
      } else {
        this.stopAnimated();
      }
    }
  };

  componentWillUnmount = () => {
    this.stopAnimated();
  };

  timeHandle = [];
  timeHandle1 = [];
  stopAnimated = () => {
    const obj = {};
    for (let i = 0; i < this.props.number; i++) {
      this.state[`stateRadius${i}`].stopAnimation();
      this.state[`stateOpacity${i}`].stopAnimation();
      obj[`stateOpacity${i}`] = new Animated.Value(0);
      obj[`stateRadius${i}`] = new Animated.Value(this.props.radius);
    }
    this.setState(obj);
    this.timeHandle.map(time => clearTimeout(time));
    this.timeHandle = [];
    this.timeHandle1.map(time => clearTimeout(time));
    this.timeHandle1 = [];
  };

  startAnimated = () => {
    for (let i = 0; i < this.props.number; i++) {
      this.childTask(i, true);
    }
  };

  childTask = (i, isInit = false) => {
    const animationConfig = {
      ...DIFFUSION_DEFAULT_ANIMATION_CONFIG,
      ...this.props.animationConfig,
    };
    const { duration, delay, easing, useNativeDriver, isInteraction } = animationConfig;
    this.timeHandle.push(
      setTimeout(
        () => {
          this.setState(
            {
              [`stateOpacity${i}`]: new Animated.Value(1),
              [`stateRadius${i}`]: new Animated.Value(this.props.radius),
            },
            () => {
              Animated.parallel([
                createAnimation({
                  value: this.state[`stateRadius${i}`],
                  toValue: this.props.maxRadius,
                  duration,
                  delay,
                  easing,
                  useNativeDriver,
                  isInteraction,
                }),
                createAnimation({
                  value: this.state[`stateOpacity${i}`],
                  toValue: 0,
                  duration,
                  delay,
                  easing,
                  useNativeDriver,
                  isInteraction,
                }),
              ]).start(() => {
                this.timeHandle1.push(
                  setTimeout(() => {
                    this.childTask(i);
                  }, this.props.intervalTime)
                );
              });
            }
          );
        },
        isInit ? i * this.props.mainDelay : 0
      )
    );
  };

  render() {
    const {
      width,
      color,
      radius,
      maxRadius,
      style,
      number,
      circleStyle,
      renderContent,
    } = this.props;
    return (
      <View style={[{ justifyContent: 'center', alignItems: 'center' }, style]}>
        {new Array(number)
          .fill(0)
          .map((__, i) => i)
          .map((item, index) => {
            const innerRadius = this.state[`stateRadius${index}`].interpolate({
              inputRange: [radius, maxRadius],
              outputRange: [radius, maxRadius],
            });
            const innerWidth = this.state[`stateRadius${index}`].interpolate({
              inputRange: [radius, maxRadius],
              outputRange: [2 * radius, 2 * maxRadius],
            });
            return (
              <Animated.View
                key={item}
                style={[
                  { position: 'absolute', borderWidth: width, borderColor: color },
                  circleStyle,
                  {
                    width: innerWidth,
                    height: innerWidth,
                    borderRadius: innerRadius,
                    opacity: this.state[`stateOpacity${index}`],
                  },
                ]}
              />
            );
          })}
        <View style={{ position: 'absolute' }}>{renderContent()}</View>
      </View>
    );
  }
}
