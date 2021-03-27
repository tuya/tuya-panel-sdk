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
import { IconFont, TYText } from 'tuya-panel-kit';
import icons from './icons';

interface IPercentProps {
  percent: number;
  colorOver?: string;
  colorInner?: string;
  width?: number | string;
  height?: number | string;
  brightWidth: number;
}

export class Percent extends React.Component<IPercentProps, IPercentProps> {
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
    const percentText = `${percent}%`;
    return (
      <View style={[styles.percent, { height, width }]}>
        <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row' }}>
          <IconFont d={icon} size={32} color={colorOver} style={styles.percentIcon} />
          <TYText style={[styles.percentText, { color: colorOver }]}>{percentText}</TYText>
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
          <IconFont style={styles.percentIcon} d={icon} size={32} color={colorInner} />
          <TYText style={[styles.percentText, { color: colorInner }]}>{percentText}</TYText>
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
}

type DefaultProps = Readonly<typeof defaultProps>;

type IProps = {
  style?: ViewStyle | ViewStyle[];
  formatPercent?: (value: number) => number;
} & DefaultProps;

interface IState {
  value: number;
}

export default class Slider extends React.Component<IProps, IState> {
  static defaultProps: DefaultProps = defaultProps;

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

    this.state = { value: this.props.value };
  }

  componentWillReceiveProps(nextProps: IProps) {
    if (!this.locked) {
      this.brightWidth = this.valueToWidth(nextProps.value);
      this.brightAnimate.setValue(this.brightWidth);
      this.setState({ value: nextProps.value });
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
    this.brightAnimate.setValue(width);

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
    const { trackColor, activeColor, fontColor, style } = this.props;
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
        <View style={[styles.track, { backgroundColor: trackColor }]} />
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
          />
        )}
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
