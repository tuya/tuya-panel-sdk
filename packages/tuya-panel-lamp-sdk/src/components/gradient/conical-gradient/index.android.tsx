import React, { Component } from 'react';
import { View } from 'react-native';
import _ from 'lodash';
import { Svg, Circle, Defs, Stop, G } from 'react-native-svg';
import { interpolateHcl as interpolateGradient } from 'd3-interpolate';
import Normal from './Normal';
import AndroidConicalGradent from './Android';
import { isLargeAppRnVersion } from './utils';
import { StopItem } from './interface';

const fullDeg = Math.PI * 2;

interface Props {
  /**
   * 外圈半径
   */
  outerRadius: number;
  /**
   * 内圈半径
   */
  innerRadius: number;
  /**
   * 切分角度
   */
  segmentAngle: number;
  /**
   * 偏移角度
   */
  offsetAngle: number;
  /**
   * 渐变颜色配置
   */
  colors: StopItem[];
}

interface State {
  colors: StopItem[];
}

export default class ConicalGradent extends Component<Props, State> {
  static defaultProps = {
    outerRadius: 120,
    innerRadius: 80,
    offsetAngle: 0,
    colors: [
      { angle: 0, color: 'red' },
      { angle: fullDeg, color: 'green' },
    ],
    segmentAngle: fullDeg / 360, // 每隔多少度切一个颜色
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      colors: this.getColors(this.props.colors),
    };
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(nextProps: Props) {
    if (!_.isEqual(nextProps.colors, this.props.colors)) {
      this.setState({ colors: [...nextProps.colors] });
    }
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    const { outerRadius, innerRadius, segmentAngle, offsetAngle, colors } = nextProps;
    const {
      outerRadius: oldOuterRadius,
      innerRadius: oldinnerRadius,
      segmentAngle: oldSegmentAngle,
      offsetAngle: oldOffsetAngle,
      colors: oldColors,
    } = nextProps;
    return (
      !_.isEqual(outerRadius, oldOuterRadius) ||
      !_.isEqual(innerRadius, oldinnerRadius) ||
      !_.isEqual(segmentAngle, oldSegmentAngle) ||
      !_.isEqual(offsetAngle, oldOffsetAngle) ||
      !_.isEqual(colors, oldColors) ||
      !_.isEqual(this.state.colors, nextState.colors)
    );
  }

  getColors(colors: StopItem[]) {
    return [...colors].sort((a: StopItem, b: StopItem) => {
      return a.angle > b.angle ? 1 : -1;
    });
  }

  setColors(colors: StopItem[]) {
    this.setState({ colors: this.getColors(colors) });
  }

  renderStops() {
    const { offsetAngle } = this.props;
    const { colors } = this.state;
    // 转换角度
    const list: StopItem[] = colors
      .map(item => ({
        angle: (item.angle + offsetAngle) % fullDeg,
        color: item.color,
      }))
      .sort((item1, item2) => (item1.angle > item2.angle ? 1 : -1));

    // 第一个是否为0
    if (list[0].angle !== 0) {
      // 加入 0 角度的颜色
      // 上一个颜色
      const { color: startColor, angle: startAngle } = list[list.length - 1];
      const { color: endColor, angle: endAngle } = list[0];
      // 补帧
      const interpolate = interpolateGradient(startColor, endColor);
      // 0 角度的位置百分比
      const percent = (fullDeg - startAngle) / (endAngle + fullDeg - startAngle);
      // 0 角度的颜色
      const zeroColor = interpolate(percent);
      list.splice(0, 0, { angle: 0, color: zeroColor });
    }
    // 最后是否有颜色
    list.push({ angle: fullDeg, color: list[0].color });
    return list.map((item: StopItem, index: number) => {
      const offset = `${Math.round((item.angle * 100) / fullDeg)}%`;
      // eslint-disable-next-line react/no-array-index-key
      return <Stop offset={offset} stopColor={item.color} key={index} />;
    });
  }

  render() {
    const { colors } = this.state;
    if (isLargeAppRnVersion([5, 20])) {
      const { outerRadius, innerRadius } = this.props;
      const size = outerRadius * 2;
      const radius = (outerRadius + innerRadius) / 2;
      return (
        <View
          style={{
            width: size,
            height: size,
            borderRadius: outerRadius,
            overflow: 'hidden',
          }}
        >
          <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            <Defs>
              <AndroidConicalGradent id="gradent">{this.renderStops()}</AndroidConicalGradent>
            </Defs>
            <G origin={`${outerRadius},${outerRadius}`}>
              <Circle
                cx={outerRadius}
                cy={outerRadius}
                r={radius}
                fill="transparent"
                strokeWidth={outerRadius - innerRadius}
                stroke="url(#gradent)"
              />
            </G>
          </Svg>
        </View>
      );
    }
    return <Normal {...this.props} colors={colors} />;
  }
}
