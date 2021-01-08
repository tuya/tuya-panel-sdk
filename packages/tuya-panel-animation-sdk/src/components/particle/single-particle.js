import React, { Component } from 'react';
import { Animated } from 'react-native';
import PropTypes from 'prop-types';

const DEFAULT_DOT_RADIUS = 2;

export default class SingleParticle extends Component {
  static propTypes = {
    /**
     * 容器宽度
     */
    width: PropTypes.number.isRequired,
    /**
     * 容器高度
     */
    height: PropTypes.number.isRequired,
    /**
     * 动画执行一次的持续时间
     */
    duration: PropTypes.number,
    /**
     * 动画是否执行
     */
    active: PropTypes.bool,
    /**
     * 中间空白的部分的半径
     */
    radius: PropTypes.number,
    /**
     * radius属性的容差值, 使得radius在[radius-tolerance, radius+tolerance]的范围中随机取值
     */
    tolerance: PropTypes.number,
    /**
     * 粒子的颜色
     */
    color: PropTypes.string,
    /**
     * 粒子的运动形式 diffuse-从中间向外扩散, absorb-从外向中间吸引
     */
    type: PropTypes.oneOf(['diffuse', 'absorb']),
    /**
     * 粒子的半径
     */
    dotRadius: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.func,
      PropTypes.arrayOf(PropTypes.number),
    ]),
  };

  static defaultProps = {
    duration: 2000,
    active: true,
    radius: 100,
    tolerance: 0,
    color: '#fff',
    type: 'diffuse',
    dotRadius: DEFAULT_DOT_RADIUS,
  };

  constructor(props) {
    super(props);
    const rx = props.width / 2;
    const ry = props.height / 2;
    const { dotRadius: dr } = props;
    const _dotRadius =
      typeof dr === 'function'
        ? dr() || DEFAULT_DOT_RADIUS
        : Array.isArray(dr)
        ? dr[Math.floor(dr.length * Math.random())]
        : dr;
    this.dotRadius = typeof _dotRadius === 'number' ? _dotRadius : DEFAULT_DOT_RADIUS;
    this.state = {
      rx,
      ry,
      maxRadius: Math.sqrt(rx ** 2 + ry ** 2),

      x: new Animated.Value(0),
      y: new Animated.Value(0),
      opacity: new Animated.Value(1),

      startX: 0,
      startY: 0,
      endX: 0,
      endY: 0,
    };
  }

  componentDidMount() {
    const { active } = this.props;
    active && this.startAnimation();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.active !== this.props.active) {
      // eslint-disable-next-line no-unused-expressions
      nextProps.active ? this.startAnimation() : this.stopAnimation();
    }
  }

  componentWillUnmount() {
    this.stopAnimation();
  }

  generateCoordinates = () => {
    const { rx, ry, maxRadius } = this.state;
    const { radius, tolerance, type } = this.props;

    const radian = 2 * Math.PI * Math.random(); // 生成随机弧度
    const realRadius = radius + (Math.random() * 2 - 1) * tolerance; // radius +/- tolerance 圆点计算时的随机偏移量, 用于在一个范围内随机生成点
    const isDiffuse = type === 'diffuse'; // 判断是吸收还是扩散形式

    const startX = rx + realRadius * Math.cos(radian) - this.dotRadius;
    const startY = ry + realRadius * Math.sin(radian) - this.dotRadius;
    const endX = rx + maxRadius * Math.cos(radian) - this.dotRadius;
    const endY = ry + maxRadius * Math.sin(radian) - this.dotRadius;

    return {
      startX: isDiffuse ? startX : endX,
      startY: isDiffuse ? startY : endY,
      endX: isDiffuse ? endX : startX,
      endY: isDiffuse ? endY : startY,
    };
  };

  startAnimation = () => {
    const { duration } = this.props;
    this.state.x.setValue(0);
    this.state.y.setValue(0);
    this.state.opacity.setValue(1);
    const coordinatesData = this.generateCoordinates();

    this.setState({ ...coordinatesData }, () => {
      Animated.parallel([
        Animated.timing(this.state.x, { toValue: 1, duration }),
        Animated.timing(this.state.y, { toValue: 1, duration }),
        Animated.timing(this.state.opacity, { toValue: 0, duration }),
      ]).start(({ finished }) => finished && this.startAnimation());
    });
  };

  stopAnimation = () => {
    this.state.x.stopAnimation();
    this.state.y.stopAnimation();
    this.state.opacity.stopAnimation();
  };

  render() {
    const { startX, startY, endX, endY } = this.state;
    const { color } = this.props;

    return (
      <Animated.View
        style={{
          position: 'absolute',
          left: this.state.x.interpolate({
            inputRange: [0, 1],
            outputRange: [startX, endX],
          }),
          top: this.state.y.interpolate({
            inputRange: [0, 1],
            outputRange: [startY, endY],
          }),
          width: this.dotRadius * 2,
          height: this.dotRadius * 2,
          borderRadius: this.dotRadius,
          backgroundColor: color,
          opacity: this.state.opacity.interpolate({
            inputRange: [0, 0.3, 1],
            outputRange: [0.4, 0.7, 1],
          }),
        }}
      />
    );
  }
}
