import React, { PureComponent } from 'react';
import { processColor, requireNativeComponent, StyleProp, ViewStyle } from 'react-native';

interface Props {
  fromDegree: number;
  colors: number[];
  stops: number[];
  innerRadius: number;
  style: StyleProp<ViewStyle>;
}

const TYRCTConicGradientComp = requireNativeComponent('TYRCTConicGradientView');

export default class ConicalGradent extends PureComponent<Props> {
  static defaultProps = {
    fromDegree: 0,
    colors: [processColor('red'), processColor('green')],
    stops: [0, 1],
    innerRadius: 0,
    style: null,
  };

  render() {
    return <TYRCTConicGradientComp {...this.props} />;
  }
}
