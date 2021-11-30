import React from 'react';
import _ from 'lodash';
import Svg, { G, LinearGradient, Path, Defs, Stop } from 'react-native-svg';
import { interpolateHcl as interpolateGradient } from 'd3-interpolate';
import { Coordinate, ColorItem } from './interface';

const fullDeg = Math.PI * 2;

interface Props {
  outerRadius: number;
  innerRadius: number;
  segmentAngle: number;
  offsetAngle: number; // 偏移角度
  colors: ColorItem[];
}

export default class RingBackground extends React.Component<Props> {
  static defaultProps = {
    outerRadius: 120,
    innerRadius: 80,
    offsetAngle: 0,
    colors: [],
    segmentAngle: fullDeg / 360, // 每隔多少度切一个颜色
  };

  constructor(props: Props) {
    super(props);

    const { outerRadius, innerRadius, colors, segmentAngle, offsetAngle } = this.props;
    this.handleSize(outerRadius, innerRadius, offsetAngle);
    this.handleColors(colors, segmentAngle);
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(nextProps: Props) {
    if (!_.isEqual(nextProps, this.props)) {
      this.setNativeProps(nextProps);
    }
  }

  setNativeProps(props: Props) {
    const {
      outerRadius: oldOuterRadius,
      innerRadius: oldInnerRadius,
      colors: oldColors,
      segmentAngle: oldSegmentAngle,
      offsetAngle: oldOffsetAngle,
    } = this.props;

    const {
      outerRadius = oldOuterRadius,
      innerRadius = oldInnerRadius,
      colors = oldColors,
      segmentAngle = oldSegmentAngle,
      offsetAngle = oldOffsetAngle,
    } = props;

    this.handleSize(outerRadius, innerRadius, offsetAngle);
    this.handleColors(colors, segmentAngle);

    this.forceUpdate();
  }

  getPoint(angle: number, radius: number) {
    const { offsetAngle, outerRadius } = this;
    // 精度过高，有些安卓手机会出现有角的现象，这里降低下精度
    const deg = Math.round(10000 * (angle + offsetAngle)) / 10000;
    return {
      x: radius * Math.cos(deg) + outerRadius,
      y: radius * Math.sin(deg) + outerRadius,
    };
  }

  getPath(start: Coordinate, end: Coordinate) {
    const { radius } = this;
    const { x: x1, y: y1 } = start;
    const { x: x2, y: y2 } = end;
    return `M${x1} ${y1} A${radius} ${radius} 0 0 1 ${x2} ${y2}`;
  }

  private offsetAngle = 0;

  private size = 0;

  private radius = 0;

  private innerRadius = 0;

  private outerRadius = 0;

  private colors: ColorItem[] = [];

  handleColors(colors: ColorItem[], segmentAngle: number) {
    let prev = colors[colors.length - 1];
    // 按分隔的角度，插入数据
    const list: ColorItem[] = [];
    colors.forEach((item: ColorItem) => {
      const { angle: start, color: startColor } = prev;
      // eslint-disable-next-line
      let { angle: end, color: endColor } = item;
      if (end <= start) {
        end += fullDeg;
      }
      const steps = Math.floor((end - start) / segmentAngle);
      const interpolate = interpolateGradient(startColor, endColor);
      const startDeg = Math.ceil(start / segmentAngle) * segmentAngle;
      for (let i = 0; i < steps; i++) {
        const deg = startDeg + segmentAngle * i;
        const percent = (deg - start) / (end - start);
        const stepColor = interpolate(percent);
        list.push({
          angle: deg > fullDeg ? deg % fullDeg : deg,
          color: stepColor,
        });
      }
      prev = item;
      list.push({
        angle: item.angle,
        color: interpolate(1),
      });
    });

    prev = list[list.length - 1];
    this.colors = list.map(current => {
      // 计算渐变方向
      const { angle: startAngle, color: startColor } = prev;
      const { angle: endAngle, color: endColor } = current;
      const point1 = this.getPoint(startAngle, this.radius);
      // 加 0.005 使用每条线段有重叠，保证圆圆滑
      const point2 = this.getPoint(endAngle + 0.005, this.radius);
      prev = current;
      return {
        path: this.getPath(point1, point2),
        from: point1,
        to: point2,
        startColor,
        endColor,
      };
    });
  }

  handleSize(outerRadius: number, innerRadius: number, offsetAngle: number) {
    this.size = outerRadius * 2;
    this.radius = (outerRadius + innerRadius) / 2;
    this.outerRadius = outerRadius;
    this.innerRadius = innerRadius;
    this.offsetAngle = offsetAngle;
  }

  render() {
    const { size, outerRadius, innerRadius } = this;
    return (
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Defs>
          {this.colors.map(({ from, to, startColor, endColor }, index) => (
            <LinearGradient
              // eslint-disable-next-line
              key={index}
              id={`linear${index}`}
              x1={from.x.toFixed(2)}
              y1={from.y.toFixed(2)}
              x2={to.x.toFixed(2)}
              y2={to.y.toFixed(2)}
            >
              <Stop offset="0" stopColor={startColor} />
              <Stop offset="1" stopColor={endColor} />
            </LinearGradient>
          ))}
        </Defs>
        <G>
          {this.colors.map(({ path }: ColorItem, index) => {
            return (
              <Path
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                d={path}
                fill="transparent"
                stroke={`url(#linear${index})`}
                strokeWidth={`${outerRadius - innerRadius}`}
              />
            );
          })}
        </G>
      </Svg>
    );
  }
}
