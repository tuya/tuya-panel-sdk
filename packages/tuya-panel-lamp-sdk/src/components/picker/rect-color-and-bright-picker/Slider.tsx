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
  Easing,
  StyleProp,
  TextStyle,
} from 'react-native';
import { IconFont, TYText } from 'tuya-panel-kit';
import icons from './icons';

interface IPercentProps {
  percent: number;
  colorOver?: string;
  colorInner?: string;
  width?: number | string;
  height?: number | string;
  brightWidth: number;
  /**
   * 图标尺寸
   */
  iconSize?: number;
  /**
   * 百分比文字样式
   */
  percentStyle?: StyleProp<TextStyle>;
}

export class Percent extends React.Component<IPercentProps, IPercentProps> {
  constructor(props: IPercentProps) {
    super(props);
    this.state = { ...this.props };
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(nextProps: IPercentProps) {
    this.setState({ ...nextProps });
  }

  setNativeProps(nextProps: IPercentProps) {
    this.setState({ ...nextProps });
  }

  render() {
    const {
      percent,
      height,
      width,
      brightWidth,
      colorOver,
      colorInner,
      iconSize,
      percentStyle,
    } = this.state;
    let icon = icons.brightLevel1;
    if (percent > 20 && percent <= 60) {
      icon = icons.brightLevel2;
    } else if (percent > 60) {
      icon = icons.brightLevel3;
    }
    const percentText = `${percent}%`;
    return (
      <View style={[styles.percent, { height, width }]}>
        <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row' }}>
          <IconFont d={icon} size={iconSize || 32} color={colorOver} style={styles.percentIcon} />
          <TYText style={[styles.percentText, percentStyle, { color: colorOver }]}>
            {percentText}
          </TYText>
        </View>
        <View
          style={{
            position: 'absolute',
            overflow: 'hidden',
            opacity: 1,
            height: '100%',
            width: brightWidth,
            alignItems: 'center',
            flexDirection: 'row',
            backgroundColor: colorOver,
          }}
        >
          <IconFont style={styles.percentIcon} d={icon} size={iconSize || 32} color={colorInner} />
          <TYText style={[styles.percentText, percentStyle, { color: colorInner }]}>
            {percentText}
          </TYText>
        </View>
      </View>
    );
  }
}
const defaultProps = {
  value: 0,
  min: 10,
  max: 1000,
  minPercent: 1,
  disabled: false,
  fontColor: '#000',
  trackColor: '#313131',
  activeColor: '#fff',
  // formatPercent: null,
  invalidSwipeDistance: 7,
  clickEnabled: false, // 是否可以点击选择
  onGrant(v: number) {},
  onMove(v: number) {},
  onRelease(v: number) {},
  onPress(v: number) {},
  showAnimation: true, // 使用动画显示
  /**
   * 背景透明度动画值
   */
  opacityAnimationValue: 1,
  /**
   * 背景透明度动画时间
   */
  opacityAnimationDuration: 150,
};

export interface IBrightOption {
  /**
   * 最小值
   */
  min?: number;
  /**
   * 最大值
   */
  max?: number;
  /**
   * 最小百分比
   */
  minPercent?: number;
  /**
   * 字体颜色
   */
  fontColor?: string;
  /**
   * 轨道背景色
   */
  trackColor?: string;
  /**
   * 激活区颜色
   */
  activeColor?: string;
  /**
   * 滑动生效的开始距离
   * 默认为 7 个像素距离
   */
  invalidSwipeDistance?: number;
  formatPercent?: (value: number) => number;
  style?: StyleProp<ViewStyle>;
  /**
   * 图标大小
   */
  iconSize?: number;
  /**
   * 百分比样式
   */
  percentStyle?: StyleProp<TextStyle>;
}

type DefaultProps = Readonly<typeof defaultProps>;

type IProps = {
  style?: ViewStyle | ViewStyle[];
  formatPercent?: (value: number) => number;
  iconSize?: number;
  percentStyle?: StyleProp<TextStyle>;
} & DefaultProps;

interface IState {
  value: number;
}

export default class Slider extends React.Component<IProps, IState> {
  static defaultProps: DefaultProps = defaultProps;

  constructor(props: IProps) {
    super(props);
    this.bgOpacityAnim = new Animated.Value(this.props.opacityAnimationValue);
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

    this.state = { value: this.props.value };
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(nextProps: IProps) {
    if (!this.locked) {
      this.brightWidth = this.valueToWidth(nextProps.value);
      if (nextProps.value !== this.props.value) {
        this.setAnimationValue(this.brightWidth);
        this.setState({ value: nextProps.value });
      }
    }
    if (this.props.opacityAnimationValue !== nextProps.opacityAnimationValue) {
      Animated.timing(this.bgOpacityAnim, {
        toValue: nextProps.opacityAnimationValue,
        duration: nextProps.opacityAnimationDuration,
        useNativeDriver: true,
      }).start();
    }
  }

  shouldComponentUpdate() {
    return !this.locked;
  }

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
    this.handleMove(gesture, this.props.onMove, false);
  };

  onRelease = (e: GestureResponderEvent, gesture: PanResponderGestureState) => {
    this.isTouchStart = false;
    if (this.moving) {
      this.moving = false;
      this.locked = false;
      this.handleMove(gesture, this.props.onRelease, true);
    } else if (this.props.clickEnabled) {
      const now = +new Date();
      if (Math.abs(gesture.dx) < 4 && Math.abs(gesture.dy) < 4 && now - this.grantTime < 300) {
        const { locationX } = e.nativeEvent;
        this.handleMove(
          { dx: locationX - this.brightWidth } as PanResponderGestureState,
          this.props.onPress,
          true
        );
      }
    }
  };

  setAnimationValue(value: number, isSliding = false) {
    if (!isSliding && this.props.showAnimation) {
      if (value !== this.brightWidth) {
        this.brightAnimate.stopAnimation();
        const duration = isSliding
          ? 32
          : Math.round((300 * Math.abs(value - this.brightWidth)) / this.sliderWidth);
        Animated.timing(this.brightAnimate, {
          toValue: value,
          duration,
          easing: Easing.linear,
        }).start();
      }
    } else {
      this.brightAnimate.setValue(value);
    }
  }

  private _panResponder: PanResponderInstance;
  private percentRef: Percent;
  private locked = false;
  private sliderWidth = 0;
  private brightWidth = 0;
  private brightAnimate: Animated.Value = new Animated.Value(0);
  private showPercent = false;
  private moving = false;
  private grantTime = 0;
  private isTouchStart = false;
  private bgOpacityAnim: Animated.Value = new Animated.Value(1);

  handleStartPanResponder = () => {
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

  handleMove(gesture: PanResponderGestureState, callback: (value: number) => void, isEnd = false) {
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
    this.setAnimationValue(width, !isEnd);

    this.percentRef &&
      this.percentRef.setNativeProps({ percent: this.formatPercent(value), brightWidth: width });

    if (isEnd) {
      this.brightWidth = width;
      this.setState({ value });
    }
    callback(value);
  }

  handleTerminate = () => {
    // 响应器已经从该视图抽离
    this.moving = false;
    this.locked = false;
    this.isTouchStart = false;
  };

  handleLayout = (e: LayoutChangeEvent) => {
    const { width } = e.nativeEvent.layout;
    this.sliderWidth = width;
    this.brightWidth = this.valueToWidth(this.state.value);
    this.brightAnimate.setValue(this.brightWidth);
    this.showPercent = true;
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
    const percent = (value - min) / (max - min);
    return percent * this.sliderWidth;
  }

  coorToValue(x: number) {
    const { min, max } = this.props;
    return Math.round((x / this.sliderWidth) * (max - min) + min);
  }

  render() {
    const { trackColor, activeColor, fontColor, style, iconSize, percentStyle } = this.props;
    const containerStyle = [styles.container, style];
    const { height = 44 } = StyleSheet.flatten(containerStyle);
    return (
      <View
        style={containerStyle}
        accessibilityLabel="ReactColorPicker_Slider"
        onLayout={this.handleLayout}
        pointerEvents="box-only"
        {...this._panResponder.panHandlers}
      >
        <Animated.View
          style={{
            height: '100%',
            width: '100%',
            opacity: this.bgOpacityAnim,
          }}
        >
          <View
            style={[
              styles.track,
              {
                backgroundColor: trackColor,
              },
            ]}
          />
          <Animated.View
            style={[
              styles.mark,
              {
                backgroundColor: activeColor,
                width: this.brightAnimate,
              },
            ]}
          />
          {this.showPercent && (
            <Percent
              ref={(ref: Percent) => {
                this.percentRef = ref;
              }}
              percent={this.formatPercent(this.state.value)}
              colorOver={activeColor}
              colorInner={fontColor}
              width={this.sliderWidth}
              height={height}
              brightWidth={this.brightWidth}
              iconSize={iconSize}
              percentStyle={percentStyle}
            />
          )}
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 44,
    justifyContent: 'center',
    marginTop: 2,
    width: '100%',
  },
  mark: {
    backgroundColor: '#fff',
    height: '100%',
    left: 0,
    position: 'absolute',
  },
  percent: {
    alignItems: 'center',
    flexDirection: 'row',
    height: '100%',
    justifyContent: 'flex-start',
    left: 0,
    position: 'absolute',
  },
  percentIcon: {
    marginLeft: 16,
  },
  percentText: {
    marginLeft: 9,
    width: 50,
  },
  track: {
    backgroundColor: '#313131',
    height: '100%',
    width: '100%',
  },
});
