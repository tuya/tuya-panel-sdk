import React, { PureComponent } from 'react';
import { Animated, Easing, TouchableOpacity, ViewStyle, StyleProp } from 'react-native';
import { IconFont } from 'tuya-panel-kit';

const defaultPath =
  'M512 922.24c44.16 0 79.36-35.2 79.36-80H432.64c0 45.44 35.2 80 79.36 80z m260.48-260.48V453.76C772.48 328.96 684.8 224 569.6 197.12v-26.24c0-29.44-16-55.04-43.52-61.44C486.4 99.84 454.4 129.92 454.4 169.6v27.52C339.2 224 251.52 328.96 251.52 453.76v208L172.8 743.04v40.32h678.4v-40.32l-78.72-81.28z';

interface JitterAlertProps extends IconFont {
  active?: boolean;
  degree?: number;
  interval?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
  path?: string;
  onPress?: () => void;
  size?: { width: number; height: number };
  renderContent?: React.ReactNode;
  animationConfig?: {
    easing?: (...args: any[]) => any;
    duration?: number;
    delay?: number;
    isInteraction?: boolean;
    useNativeDriver: boolean;
  };
}

class JitterAlert extends PureComponent<JitterAlertProps> {
  static defaultProps = {
    active: true,
    degree: 15,
    interval: 200,
    color: '#000',
    style: {},
    path: defaultPath,
    onPress: () => {},
    size: {
      width: 24,
      height: 24,
    },
    renderContent: null,
    animationConfig: {
      easing: Easing.linear,
      duration: 500,
      delay: 0,
      isInteraction: true,
      useNativeDriver: true,
    },
  };

  constructor(props) {
    super(props);
    this.animatedValue = new Animated.Value(0.5);
    this.animatedValueArr = [1, 0, 0.5];
  }

  componentDidMount() {
    this.checkShouldStartAnimated();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.active !== this.props.active) {
      this.checkShouldStartAnimated();
    }
  }

  componentWillUnmount() {
    this.stopAnimated();
  }

  animatedValueArr: number[];
  animatedValue: Animated.Value;

  startAnimated() {
    const { animationConfig, interval, active } = this.props;

    Animated.sequence([
      ...this.animatedValueArr.map(v =>
        Animated.timing(this.animatedValue, {
          toValue: v,
          ...animationConfig,
          ...{ duration: animationConfig.duration / 3 },
        })
      ),
      Animated.delay(interval),
    ]).start(({ finished }) => {
      finished && active && this.startAnimated();
    });
  }

  stopAnimated() {
    this.animatedValue.setValue(0.5);
    this.animatedValue.stopAnimation();
  }

  checkShouldStartAnimated = () => {
    if (this.props.active) {
      this.startAnimated();
    } else {
      this.stopAnimated();
    }
  };

  render() {
    const { degree, style, path, onPress, size, renderContent, ...restIconFontProps } = this.props;
    const imgRotate = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [`-${degree}deg`, `${degree}deg`],
    });
    return (
      <Animated.View style={[{ ...size }, style, { transform: [{ rotate: imgRotate }] }]}>
        <TouchableOpacity onPress={onPress}>
          {React.isValidElement(renderContent) ? (
            renderContent
          ) : (
            <IconFont d={path} {...size} {...restIconFontProps} />
          )}
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

export default JitterAlert;
