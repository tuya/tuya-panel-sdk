import React, { Component } from 'react';
import { processColor, View } from 'react-native';
import _ from 'lodash';
import Normal from './Normal';
import IOSConicalGradent from './Ios';
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
    return [...colors].sort((a, b) => {
      return a.angle > b.angle ? 1 : -1;
    });
  }

  setColors(colors: StopItem[]) {
    this.setState({ colors: this.getColors(colors) });
  }

  getIosProps() {
    const { outerRadius, innerRadius, offsetAngle } = this.props;
    const { colors } = this.state;
    const lastAngle = colors[colors.length - 1].angle;
    const list: StopItem[] = colors
      .map(item => ({ angle: lastAngle - item.angle, color: item.color }))
      .reverse();
    list.push({ angle: fullDeg, color: list[0].color });
    const size = outerRadius * 2;
    return {
      innerRadius: innerRadius / outerRadius,
      fromDegree: ((offsetAngle - fullDeg + lastAngle) * 180) / Math.PI,
      colors: list.map(item => processColor(item.color)),
      stops: list.map(item => item.angle / fullDeg),
      style: { width: size, height: size },
    };
  }

  render() {
    const { colors } = this.state;
    if (isLargeAppRnVersion([5, 19])) {
      const { outerRadius } = this.props;
      const size = outerRadius * 2;
      return (
        <View style={{ width: size, height: size, borderRadius: outerRadius, overflow: 'hidden' }}>
          <IOSConicalGradent {...this.getIosProps()} />
        </View>
      );
    }
    return <Normal {...this.props} colors={colors} />;
  }
}
