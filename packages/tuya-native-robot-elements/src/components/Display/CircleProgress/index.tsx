import React from 'react';
import { ViewStyle, StyleProp } from 'react-native';
import { Svg, Circle, Path } from 'react-native-svg';

import SvgBrush from '../../../utils/SvgBrush';
import CircleGesture from '../../Basic/CircleGesture';

interface CircleProgressProps {
  style?: StyleProp<ViewStyle>;
  radius: number;
  strokeColor: string;
  fillColor: string;
  strokeLinecap: 'butt' | 'round';
  value: number;
  strokeWidth: number;
  min: number;
  max: number;
  disabled: boolean;
}

export default class CircleProgress extends CircleGesture<CircleProgressProps, any> {
  static defaultProps = {
    ...CircleGesture.defaultProps,
    radius: 92,
    strokeColor: 'rgba(255,255,255, 0.2)',
    fillColor: '#E9FFD3',
    strokeWidth: 16,
    value: 360,
    min: 0,
    max: 360,
    disabled: false,
    strokeLinecap: 'round',
  };

  renderProgress = () => {
    const { radius, value, max, fillColor, strokeWidth, strokeLinecap } = this.props;
    if (value === max) {
      return (
        <Circle
          cx={radius}
          cy={radius}
          r={radius - strokeWidth / 2}
          fill="transparent"
          stroke={fillColor}
          strokeWidth={strokeWidth}
        />
      );
    }
    const r = radius - strokeWidth / 2;

    const p1 = this.getCurrentPositionByRadian(0, r);
    const curRadian = this.valueToRadian(value);
    const p2 = this.getCurrentPositionByRadian(curRadian, r);

    const largeArcFlag = curRadian > Math.PI ? 1 : 0;

    const path = `
    ${SvgBrush.MoveTo(p1.x, p1.y)}
    ${SvgBrush.ArcTo(r, r, 0, largeArcFlag, 1, p2.x, p2.y)}
    `;
    return (
      <Path
        d={path}
        strokeLinecap={strokeLinecap}
        stroke={fillColor}
        strokeWidth={strokeWidth}
        fill="transparent"
      />
    );
  };

  valueToRadian(value: number) {
    const { min, max } = this.props;
    return ((value - min) / (max - min)) * Math.PI * 2;
  }

  render() {
    const { style, radius, strokeColor, strokeWidth } = this.props;
    return (
      <Svg
        style={[style, { width: radius * 2, height: radius * 2 }]}
        onLayout={this.onLayout}
        {...this.panResponder.panHandlers}
      >
        <Circle
          cx={radius}
          cy={radius}
          r={radius - strokeWidth / 2}
          fill="transparent"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        {this.renderProgress()}
      </Svg>
    );
  }
}
