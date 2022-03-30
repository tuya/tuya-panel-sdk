import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Utils } from 'tuya-panel-kit';

const {
  ColorUtils: { color: Color },
} = Utils;

class CircleRipple extends PureComponent {
  static propTypes = {
    renderRipple: PropTypes.func,
  };

  static defaultProps = {
    renderRipple(props) {
      return <View {...props} />;
    },
  };

  render() {
    const { radius, color, alpha = 1, renderRipple } = this.props;
    const rgba = Color.hex2RgbString(color, alpha);
    const style = {
      position: 'absolute',
      width: radius,
      height: radius,
      borderRadius: radius / 2,
      backgroundColor: rgba,
    };

    const rippleNode = renderRipple({ ...this.props, style });
    let node = <View style={style} />;
    if (renderRipple) {
      React.isValidElement(rippleNode) && (node = rippleNode);
    }
    return node;
  }
}

export default CircleRipple;
