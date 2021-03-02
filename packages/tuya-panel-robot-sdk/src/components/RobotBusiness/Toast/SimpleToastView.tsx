import React from 'react';
import {
  Animated,
  Text,
  View,
  Image,
  StyleSheet,
  Easing,
  StyleProp,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from 'react-native';

import { Utils } from 'tuya-panel-kit';

const { convertY: cy, width } = Utils.RatioUtils;

interface IProps {
  style: any;
  contentStyle: StyleProp<ViewStyle>;
  textStyle: StyleProp<TextStyle>;
  imageStyle: StyleProp<ImageStyle>;
  text: string;
  showPosition: string;
  image: number;
  children: any;
  onHide: () => void;
}
interface IState {
  fadeValue: any;
}

export default class ToastView extends React.Component<IProps, IState> {
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

  private _timerId: number;

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
    alignItems: 'center',
    bottom: 0,
    flex: 1,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    width,
  },

  image: {
    marginBottom: cy(6),
  },

  text: {
    color: '#FFFFFF',
    fontSize: cy(12),
  },

  textBg: {
    alignItems: 'center',
    backgroundColor: `rgba(0, 0, 0, 0.6)`,
    borderRadius: cy(20),
    bottom: cy(130),
    justifyContent: 'center',
    paddingBottom: cy(10),
    paddingLeft: cy(10),
    paddingRight: cy(10),
    paddingTop: cy(10),
  },
});
