import React, { Component } from 'react';
import { View, StyleSheet, Image, Animated, Easing, Dimensions } from 'react-native';
import { Utils, RadialGradient } from 'tuya-panel-kit';
import { MainProps, MainState } from './interface';

const { convertX: cx, convertY: cy } = Utils.RatioUtils;
const { width: screenWidth } = Dimensions.get('window');

/**
 * 默认配置
 */
const defaultConfig = {
  lightTempMinus: '#9BCCFF',
  lightTempAdd: '#F3E7A6',
  lightBrightMinus: '#999999',
  lightBrightAdd: '#FFFFFF',
};

class Index extends Component<MainProps, MainState> {
  static defaultProps = {
    type: '',
    style: null,
    lightImg: null,
    lightImgStyle: null,
    gradientHeight: cx(240),
    gradientWidth: screenWidth,
    duration: 1200,
    config: {},
    onRelease: null,
  };

  constructor(props: MainProps) {
    super(props);
    this.state = {
      iconOpacity: new Animated.Value(0),
    };
  }

  componentDidUpdate() {
    const { type, onRelease, duration } = this.props;
    const { iconOpacity } = this.state;
    if (Object.keys(this.colorConfig).includes(type)) {
      iconOpacity.stopAnimation();
      clearTimeout(this.timerStart);
      clearTimeout(this.timerStop);
      this.timerStart = null;
      this.timerStop = null;
      this.showIconStart().start();
      this.timerStart = setTimeout(() => {
        this.hideIconStart().start();
        this.timerStop = setTimeout(() => onRelease && onRelease(), duration);
      }, duration);
    }
  }

  componentWillUnmount() {
    if (this.timerStart) {
      clearTimeout(this.timerStart);
    }
    if (this.timerStop) {
      clearTimeout(this.timerStop);
    }
  }

  /**
   * 颜色｜动作 映射
   */
  colorConfig = Object.assign(defaultConfig, this.props.config);

  timerStart: number | null;

  timerStop: number | null;

  /**
   * 渐变背景宽高
   */
  gradient = {
    height: this.props.gradientHeight,
    width: this.props.gradientWidth,
  };

  /**
   * 动画开始
   */
  showIconStart = () =>
    Animated.timing(this.state.iconOpacity, {
      toValue: 1,
      duration: this.props.duration,
      easing: Easing.linear,
      useNativeDriver: false,
    });

  /**
   * 动画结束
   */
  hideIconStart = () =>
    Animated.timing(this.state.iconOpacity, {
      toValue: 0,
      duration: this.props.duration,
      easing: Easing.linear,
      useNativeDriver: false,
    });

  render() {
    const { style, lightImg, lightImgStyle, type } = this.props;
    const { iconOpacity } = this.state;
    return (
      <View style={[styles.main, style]}>
        <Animated.View style={{ opacity: iconOpacity, ...this.gradient }}>
          <RadialGradient
            gradientId="Gradient"
            style={this.gradient}
            stops={[
              {
                offset: '0%',
                stopColor: this.colorConfig[type] || '#FFFFFF',
                stopOpacity: '1',
              },
              {
                offset: '100%',
                stopColor: this.colorConfig[type] || '#FFFFFF',
                stopOpacity: '0',
              },
            ]}
            rx="50%"
            ry="50%"
            fx="50%"
            fy="50%"
            cx="50%"
            cy="50%"
          />
        </Animated.View>
        <Image source={lightImg} style={[styles.light, lightImgStyle]} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  light: {
    position: 'absolute',
    top: cy(30),
  },
  main: {
    alignItems: 'center',
    flex: 1,
    width: '100%',
  },
});

export default Index;
