import React, { Component } from 'react';
import { Animated } from 'react-native';

const DEFAULT_DOT_RADIUS = 2;

export interface ISingleParticleProps {
  color?: string;
  dotRadius?: number | number[];
  width?: number;
  height?: number;
  duration?: number;
  active?: boolean;
  radius?: number;
  type?: 'diffuse' | 'absorb';
}

export default class SingleParticle extends Component<ISingleParticleProps, any> {
  constructor(props) {
    super(props);
    const rx = props.width / 2;
    const ry = props.height / 2;
    const { dotRadius: dr } = props;
    const _dotRadius = Array.isArray(dr) ? dr[Math.floor(dr.length * Math.random())] : dr;
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
      nextProps.active ? this.startAnimation() : this.stopAnimation();
    }
  }

  componentWillUnmount() {
    this.stopAnimation();
  }

  dotRadius: number;

  generateCoordinates = () => {
    const { rx, ry, maxRadius } = this.state;
    const { radius, type } = this.props;

    const point = 2 * Math.PI * Math.random(); // 生成随机角度 0 ～ 360
    const realRadius = Math.random() * (maxRadius - radius) + radius; // radius ～ maxRadius
    const isDiffuse = type === 'diffuse'; // 判断是吸收还是扩散形式

    const startX = rx + realRadius * Math.cos(point) - this.dotRadius;
    const startY = ry + realRadius * Math.sin(point) - this.dotRadius;
    const endX = rx + maxRadius * Math.cos(point) - this.dotRadius;
    const endY = ry + maxRadius * Math.sin(point) - this.dotRadius;

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
        Animated.timing(this.state.x, { toValue: 1, duration, useNativeDriver: false }),
        Animated.timing(this.state.y, { toValue: 1, duration, useNativeDriver: false }),
        Animated.timing(this.state.opacity, { toValue: 0, duration, useNativeDriver: false }),
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
            inputRange: [0, 1],
            outputRange: [Math.random() * 0.3, Math.random() * 0.4 + 0.6],
          }),
        }}
      />
    );
  }
}
