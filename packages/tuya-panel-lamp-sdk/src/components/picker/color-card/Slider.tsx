/* eslint-disable prettier/prettier */
/* eslint-disable react/no-deprecated */
/* eslint-disable no-return-assign */
/* eslint-disable max-classes-per-file */
import React from 'react';
import {
  View,
  StyleSheet,
  PanResponder,
  PanResponderInstance,
  LayoutChangeEvent,
  Animated,
  GestureResponderEvent,
  PanResponderGestureState,
  ViewStyle,
} from 'react-native';
import { Utils, IconFont, TYText } from 'tuya-panel-kit';
import icons from '../../../res/iconfont';

const { convertX: cx } = Utils.RatioUtils;

const defaultProps = {
  opacityAnimationValue: 1,
  value: 0,
  min: 10,
  max: 1000,
  minPercent: 1,
  disabled: false,
  showPercent: true,
  fontColor: '#000',
  trackColor: 'rgba(255,255,255,0.1)',
  activeColor: '#fff',
  // formatPercent: null,
  invalidSwipeDistance: 7,
  clickEnabled: false, // 是否可以点击选择
  onlySlider: false, // 是否只有一个slider
  tempValue: 0,
  onGrant(v: number) { },
  onMove(v: number) { },
  onRelease(v: number) { },
  onPress(v: number) { },
};

export interface IBrightOption {
  min?: number;
  max?: number;
  minPercent?: number;
  fontColor?: string;
  trackColor?: string;
  activeColor?: string;
  invalidSwipeDistance?: number;
  formatPercent?: (value: number) => number;
  style?: ViewStyle | ViewStyle[];
  onlySlider?: false;
}


type DefaultProps = Readonly<typeof defaultProps>;

type IProps = {
  style?: ViewStyle | ViewStyle[];
  formatPercent?: (value: number) => number;
  borderColor?: string;
  borderWidth?: number;
  radius?: number;
} & DefaultProps;

interface IState {
  value: number;
  opacityAnimationValue: any;
}

class Percent extends React.Component<IPercentProps, IPercentProps> {
  constructor(props: IPercentProps) {
    super(props);
    this.state = { ...this.props };
  }

  componentWillReceiveProps(nextProps: IPercentProps) {
    this.setState({ ...nextProps });
  }

  setNativeProps(nextProps: IPercentProps) {
    this.setState({ ...nextProps });
  }

  render() {
    const { percent, height, width, brightWidth, colorOver, colorInner } = this.state;
    let icon = icons.brightLevel1;
    if (percent > 20 && percent <= 60) {
      icon = icons.brightLevel2;
    } else if (percent > 60) {
      icon = icons.brightLevel3;
    }
    return (
      <View style={[styles.percent, { height, width }]}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            flexDirection: 'row',
          }}
        >
          <IconFont
            d={icon}
            size={32}
            color={colorOver}
            style={styles.percentIcon}
          />
          <TYText
            style={{
              color: colorOver,
              fontSize: cx(16),
              fontWeight: 'bold',
            }}
          >
            {' '}
            {percent}%
          </TYText>
        </View>
        <Animated.View
          style={{
            position: 'absolute',
            opacity: 1,
            height: '100%',
            width: brightWidth,
            alignItems: 'center',
            flexDirection: 'row',
            backgroundColor: colorOver,
            overflow: 'hidden',
          }}
        >
          <IconFont style={styles.percentIcon} d={icon} size={32} color={colorInner} />
          <TYText style={[styles.percentText, { color: colorInner }]}>
            {percent}%</TYText>
        </Animated.View>
      </View>
    );
  }
}

class Slider extends React.Component<IProps, IState> {
  static defaultProps: DefaultProps = defaultProps;

  _panResponder: PanResponderInstance;

  percentRef: any;

  locked = false;

  sliderWidth = 0;

  brightWidth = 0;

  brightAnimate: Animated.Value = new Animated.Value(0);

  opacityAnimationValue: number;

  showPercent = false;

  moving = false;

  grantTime = 0;

  isTouchStart = false;

  tempValue = 0; // 数据临时值

  constructor(props: IProps) {
    super(props);

    this._panResponder = PanResponder.create({
      // 要求成为响应者：
      onStartShouldSetPanResponder: this.handleStartPanResponder,
      onMoveShouldSetPanResponder: this.handleSetPanResponder,
      onPanResponderTerminationRequest: () => !this.moving,
      onPanResponderMove: this.onMove,
      onPanResponderRelease: this.onRelease,
      // 当前有其他的东西成为响应器并且没有释放它。
      onPanResponderReject: this.handleTerminate,
      onPanResponderTerminate: this.handleTerminate,
    });

    this.state = {
      value: this.props.value,
      opacityAnimationValue: new Animated.Value(props.opacityAnimationValue),
    };
    this.tempValue = this.props.value;
  }

  componentWillReceiveProps(nextProps: IProps) {
    if (!this.locked) {
      this.brightWidth = this.valueToWidth(nextProps.value);
      // this.brightAnimate.setValue(this.brightWidth);
      Animated.timing(this.brightAnimate, {
        toValue: this.brightWidth,
        duration: 100,
      }).start();
      if (nextProps.value !== this.props.value) {
        this.setState({ value: nextProps.value });
        this.tempValue = nextProps.value;
      }
    }
    // 开关切换改变透明度
    if (nextProps.opacityAnimationValue !== this.props.opacityAnimationValue) {
      this.fadeAnimation(nextProps.opacityAnimationValue);
    }
  }

  shouldComponentUpdate() {
    return !this.locked;
  }

  fadeAnimation = (value: number) => {
    Animated.timing(this.state.opacityAnimationValue, {
      toValue: value,
      duration: 300,
    }).start();
  };

  handleStartPanResponder = (e: GestureResponderEvent) => {
    if (this.props.disabled) {
      return false;
    }
    this.grantTime = +new Date();
    return this.props.clickEnabled;
  };

  handleSetPanResponder = (e: GestureResponderEvent, gesture: PanResponderGestureState) => {
    if (this.props.disabled) {
      return false;
    }
    // 滑动一定象素后，将不允许其他手势抢权
    if (Math.abs(gesture.dx) >= this.props.invalidSwipeDistance) {
      // 小于一定象素不做滑动
      if (!this.moving) {
        this.props.onGrant(this.state.value);
        this.moving = true;
        this.locked = true;
      }
      return true;
    }
    if (this.moving) {
      return true;
    }
    return false;
  };

  handleTerminate = () => {
    // 响应器已经从该视图抽离
    this.moving = false;
    this.locked = false;
    this.isTouchStart = false;
  };

  onMove = (e: GestureResponderEvent, gesture: PanResponderGestureState) => {
    if (!this.moving) {
      // 滑动一定象素后，将不允许其他手势抢权
      if (Math.abs(gesture.dx) < this.props.invalidSwipeDistance) {
        // 小于一定象素不做滑动
        return;
      }
      // 开始手势
      this.props.onGrant(this.state.value);
      this.moving = true;
      this.locked = true;
    }
    this.handleMove(gesture, this.props.onMove, false, false);
  };

  onRelease = (e: GestureResponderEvent, gesture: PanResponderGestureState) => {
    this.isTouchStart = false;
    if (this.moving) {
      this.moving = false;
      this.locked = false;
      this.handleMove(gesture, this.props.onRelease, true, true);
    } else if (this.props.clickEnabled) {
      const now = +new Date();
      if (Math.abs(gesture.dx) < 4 && Math.abs(gesture.dy) < 4 && now - this.grantTime < 300) {
        const { locationX } = e.nativeEvent;
        this.handleMove(
          { dx: locationX - this.brightWidth } as PanResponderGestureState,
          this.props.onPress,
          true,
          true
        );
      }
    }
  };

  handleMove(
    gesture: PanResponderGestureState,
    callback: (value: number) => void,
    showAnimated = false,
    isEnd = false
  ) {
    const { borderWidth } = this.props;
    const { dx } = gesture;
    let width: number = this.brightWidth + dx;
    // 边界处理
    if (width < 0) {
      width = 0;
    } else if (width > this.sliderWidth) {
      width = this.sliderWidth;
    }

    const value = this.coorToValue(width);
    width = this.valueToWidth(value);
    if (showAnimated) {
      Animated.timing(this.brightAnimate, {
        toValue: width,
        duration: 100,
      }).start();
    } else {
      this.brightAnimate.setValue(width);
    }


    this.tempValue = value; // 记录临时值

    this.percentRef.setNativeProps({ percent: this.formatPercent(value), brightWidth: width });

    if (isEnd) {
      this.brightWidth = width;
      this.setState({ value });
    }
    callback(value);
  }

  handleLayout = (e: LayoutChangeEvent) => {
    const { width } = e.nativeEvent.layout;
    this.sliderWidth = width;
    this.brightWidth = this.valueToWidth(this.state.value);
    this.brightAnimate.setValue(this.brightWidth);
    this.showPercent = this.props.showPercent;
    this.forceUpdate();
  };

  formatPercent(value: number) {
    const { min, max, formatPercent, minPercent } = this.props;
    if (formatPercent) {
      return formatPercent(value);
    }
    return Math.round(((value - min) * (100 - minPercent)) / (max - min) + minPercent);
  }

  valueToWidth(value: number) {
    const { min, max } = this.props;
    const percent = Math.max(0, value - min) / (max - min);
    return percent * this.sliderWidth;
  }

  coorToValue(x: number) {
    const { min, max } = this.props;
    return Math.round((x / this.sliderWidth) * (max - min) + min);
  }

  render() {
    const {
      trackColor,
      activeColor,
      fontColor,
      onlySlider,
      borderColor,
      borderWidth,
      radius,
    } = this.props;
    const { opacityAnimationValue } = this.state;
    const containerStyle: ViewStyle[] = [
      styles.container,
      {
        opacity: opacityAnimationValue,
        borderBottomLeftRadius: radius || 12,
        borderBottomRightRadius: radius || 12,
        overflow: 'hidden',
      },
    ];
    const { height = cx(40) } = StyleSheet.flatten(containerStyle);
    return (
      <View
        style={{
          borderColor,
          borderWidth,
          borderBottomLeftRadius: radius || 12,
          borderBottomRightRadius: radius || 12,
          marginTop: onlySlider ? 0 : 2,
          borderTopLeftRadius: onlySlider ? radius || 12 : 0,
          borderTopRightRadius: onlySlider ? radius || 12 : 0,
          overflow: 'hidden',
        }}
      >
        <Animated.View
          style={containerStyle}
          accessibilityLabel="ReactColorPicker_Slider"
          onLayout={this.handleLayout}
          pointerEvents="box-only"
          {...this._panResponder.panHandlers}
        >
          <View
            style={[
              styles.track,
              {
                backgroundColor: trackColor,
              },
            ]}
          />

          {this.showPercent && (
            <Percent
              ref={(ref) => (this.percentRef = ref)}
              percent={this.formatPercent(this.state.value)}
              colorOver={activeColor}
              colorInner={fontColor}
              width={this.sliderWidth}
              height={height}
              brightWidth={this.brightAnimate}
            />
          )}
        </Animated.View>
      </View>
    );
  }
}

interface IPercentProps {
  percent: number;
  colorOver: string;
  colorInner: string;
  width: number | string;
  height: number | string;
  brightWidth: any;
  borderWidth?: number;
  borderColor?: string;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    flexDirection: 'row',
    height: cx(40),
    justifyContent: 'center',
    overflow: 'hidden',
    width: '100%',
  },
  percent: {
    alignItems: 'center',
    flexDirection: 'row',
    height: '100%',
    justifyContent: 'flex-start',
    left: 0,
    overflow: 'hidden',
    position: 'absolute',
  },
  percentIcon: {
    marginLeft: 16,
  },
  percentText: {
    fontSize: cx(16),
    fontWeight: 'bold',
    marginLeft: 4,
  },
  track: {
    backgroundColor: '#313131',
    height: '100%',
    width: '100%',
  },
});

export default Slider;
