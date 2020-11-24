import React from 'react';
import PropTypes from 'prop-types';
import { Animated, Text, View, Image, StyleSheet, Easing, ViewPropTypes } from 'react-native';

import { Utils } from '@tuya-rn/tuya-native-components';

const { convertY: cy, width } = Utils.RatioUtils;

export default class ToastView extends React.Component {
  static propTypes = {
    style: ViewPropTypes.style,
    contentStyle: ViewPropTypes.style,
    textStyle: Text.propTypes.style,
    imageStyle: Image.propTypes.style,
    text: PropTypes.string,
    showPosition: PropTypes.oneOf(['top', 'bottom', 'center']),
    image: PropTypes.number,
    children: PropTypes.any,
    onHide: PropTypes.func,
  };

  static defaultProps = {
    style: null,
    contentStyle: null,
    textStyle: null,
    imageStyle: null,
    text: '',
    showPosition: 'bottom',
    image: null,
    children: null,
    onHide: null,
  };

  constructor(props) {
    super(props);
    this._timerId = null;
    this.state = {
      fadeValue: new Animated.Value(0),
    };
  }

  componentWillUnmount() {
    this._timerId && clearTimeout(this._timerId);
  }

  onTimer = () => {
    clearTimeout(this._timerId);
    this._timerId = setTimeout(() => {
      this.startHideAnimation();
    }, 2000);
  };

  onHide() {
    const { onHide } = this.props;
    onHide && onHide();
  }

  startShowAnimation = () => {
    this.state.fadeValue.setValue(0);
    Animated.timing(this.state.fadeValue, {
      toValue: 1,
      duration: 100,
      easing: Easing.linear,
    }).start(() => this.onTimer());
  };

  startHideAnimation = () => {
    this.state.fadeValue.setValue(1);
    Animated.timing(this.state.fadeValue, {
      toValue: 0,
      duration: 500,
      easing: Easing.linear,
    }).start(() => this.onHide());
  };

  render() {
    this.startShowAnimation();

    const {
      style,
      contentStyle,
      textStyle,
      imageStyle,
      showPosition = 'bottom',
      image,
      children,
    } = this.props;
    let position = { justifyContent: 'flex-end' };
    if (showPosition === 'top') {
      position = { justifyContent: 'flex-start' };
    } else if (showPosition === 'center') {
      position = { justifyContent: 'center' };
    }
    return (
      <View style={[styles.container, style, position]} pointerEvents="none">
        <Animated.View
          style={[
            styles.textBg,
            contentStyle,
            {
              opacity: this.state.fadeValue,
            },
          ]}
        >
          {typeof image === 'number' && <Image style={[styles.image, imageStyle]} source={image} />}
          {children || <Text style={[styles.text, textStyle]}>{this.props.text}</Text>}
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    justifyContent: 'center',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    width,
    top: 0,
  },

  textBg: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: `rgba(0, 0, 0, 0.6)`,
    borderRadius: cy(20),
    paddingLeft: cy(10),
    paddingRight: cy(10),
    paddingTop: cy(10),
    paddingBottom: cy(10),
    bottom: cy(130),
  },

  image: {
    marginBottom: cy(6),
  },

  text: {
    fontSize: cy(12),
    color: '#FFFFFF',
  },
});
