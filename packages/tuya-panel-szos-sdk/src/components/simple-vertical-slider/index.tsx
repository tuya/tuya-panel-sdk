/* eslint-disable react/sort-comp */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {
  Animated,
  GestureResponderEvent,
  LayoutChangeEvent,
  PanResponder,
  PanResponderGestureState,
  PanResponderInstance,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { LinearGradient, Utils } from 'tuya-panel-kit';
import { Rect } from 'react-native-svg';

const { convertX: cx, convertY: cy } = Utils.RatioUtils;

const defaultProps = {
  /**
   * 值
   */
  value: 0,
  /**
   * 最小值
   */
  min: 0,
  /**
   * 最大值
   */
  max: 100,
  /**
   * 是否禁用
   */
  disabled: false,
  /**
   * 轨道颜色
   */
  trackColor: 'rgba(206,206,206,0.12)',
  /**
   * 轨道激活颜色
   */
  activeColor: '#000',
  /**
   * 滑动生效的开始距离
   */
  invalidSwipeDistance: 7,
  /**
   * 是否可以点击
   */
  clickEnabled: true,
  /**
   * 类型，linearGradient为渐变
   */
  type: '',
  /**
   * 渐变起始点的x轴坐标
   */
  x1: '0%',
  /**
   * 渐变终点的x轴坐标
   */
  x2: '100%',
  /**
   * 渐变起始点的y轴坐标
   */
  y1: '0%',
  /**
   * 渐变终点的y轴坐标
   */
  y2: '100%',
  /**
   * 渐变颜色范围
   */
  stops: {
    '0%': '#3ff3e9',
    '100%': '#7C46CD',
  },
  /**
   *
   * 滑动开始事件
   * @param {number} v 当前值
   */
  onGrant(v: number) {},
  /**
   *
   * 滑动中事件
   * @param {number} v 当前值
   */
  onMove(v: number) {},
  /**
   *
   * 滑动结束事件
   * @param {number} v 当前值
   */
  onRelease(v: number) {},
  /**
   *
   * 点击事件：当 clickEnabled = true时，有效
   * @param {number} v 当前值
   */
  onPress(v: number) {},
};

type DefaultProps = Readonly<typeof defaultProps>;

interface IProps extends DefaultProps {
  style?: ViewStyle;
}

interface IState {
  value: number;
}

export default class SimpleVerticalSlider extends React.Component<IProps, IState> {
  static defaultProps: DefaultProps = defaultProps;

  _panResponder: PanResponderInstance;

  locked = false;

  sliderHeight = 0;

  brightHeight = 0;

  brightAnimate: Animated.Value = new Animated.Value(0);

  showPercent = false;

  moving = false;

  grantTime = 0;

  isTouchStart = false;

  width = cx(80);

  height = cy(274);

  constructor(props: IProps) {
    super(props);
    this.state = { value: this.props.value };
    this._panResponder = PanResponder.create({
      // 要求成为响应者：
      onStartShouldSetPanResponder: this.handleStartPanResponder,
      onMoveShouldSetPanResponder: this.handleSetPanResponder,
      onPanResponderTerminationRequest: () => !this.moving,
      onPanResponderGrant: this.onGrant,
      onPanResponderMove: this.onMove,
      onPanResponderRelease: this.onRelease,
      // 当前有其他的东西成为响应器并且没有释放它。
      onPanResponderReject: this.handleTerminate,
      onPanResponderTerminate: this.handleTerminate,
    });
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(nextProps: IProps) {
    if (!this.locked) {
      this.setValue(nextProps.value);
    }
  }
  // componentDidUpdate(preProps, preState) {
  //   if (!this.locked && preState.value !== preProps.value) {
  //     this.setValue(preProps.value);
  //   }
  // }

  shouldComponentUpdate() {
    return !this.locked;
  }

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
    if (Math.abs(gesture.dy) >= this.props.invalidSwipeDistance) {
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
      if (Math.abs(gesture.dy) < this.props.invalidSwipeDistance) {
        // 小于一定象素不做滑动
        return;
      }
      this.props.onGrant(this.state.value);
      this.moving = true;
      this.locked = true;
    }
    this.handleMove(gesture, this.props.onMove, false);
  };

  onGrant = () => {
    this.locked = true;
    this.moving = false;
  };

  onRelease = (e: GestureResponderEvent, gesture: PanResponderGestureState) => {
    this.isTouchStart = false;
    if (this.moving) {
      this.moving = false;
      this.locked = false;
      this.handleMove(gesture, this.props.onRelease, true);
    } else if (this.props.clickEnabled) {
      this.locked = false;
      const now = +new Date();
      if (Math.abs(gesture.dx) < 4 && Math.abs(gesture.dy) < 4 && now - this.grantTime < 300) {
        const { locationY } = e.nativeEvent;
        this.handleMove(
          { dy: this.brightHeight - this.sliderHeight + locationY } as PanResponderGestureState,
          this.props.onPress,
          true
        );
      }
    }
  };

  handleMove(gesture: PanResponderGestureState, callback: (value: number) => void, isEnd = false) {
    const { dy } = gesture;
    let height: number = this.brightHeight - dy;
    // 边界处理
    if (height < 0) {
      height = 0;
    } else if (height > this.sliderHeight) {
      height = this.sliderHeight;
    }

    const value = this.coorToValue(height);
    height = this.valueToHeight(value);
    this.brightAnimate.setValue(height);

    if (isEnd) {
      this.brightHeight = height;
      this.setState({ value });
    }
    callback(value);
  }

  handleLayout = (e: LayoutChangeEvent) => {
    const { height } = e.nativeEvent.layout;
    this.sliderHeight = height;
    this.brightHeight = this.valueToHeight(this.state.value);
    this.brightAnimate.setValue(this.brightHeight);

    this.forceUpdate();
  };

  valueToHeight(value: number) {
    const { min, max } = this.props;
    const percent = (value - min) / (max - min);
    return this.sliderHeight * percent;
  }

  coorToValue(y: number) {
    const { min, max } = this.props;
    return Math.round((y / this.sliderHeight) * (max - min) + min);
  }

  setValue(brightness: number) {
    this.brightHeight = this.valueToHeight(brightness);
    this.brightAnimate.setValue(this.brightHeight);
    this.setState({ value: brightness });
  }

  renderLinearGradient() {
    const { stops, x1, x2, y1, y2 } = this.props;
    const w = this.props?.style?.width ?? this.width;
    const h = this.props?.style?.height ?? this.height;

    return (
      <LinearGradient
        gradientId="Gradient"
        style={{ width: w, height: h, position: 'absolute' }}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stops={stops}
      >
        <Rect width={w} height={h} />
      </LinearGradient>
    );
  }

  render() {
    const { trackColor, activeColor, style, type } = this.props;
    return (
      <View
        style={[styles.container, style]}
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
              height: this.brightAnimate,
              overflow: 'hidden',
            },
          ]}
        >
          {type === 'linearGradient' && this.renderLinearGradient()}
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: cx(16),
    flexDirection: 'row',
    height: '100%',
    justifyContent: 'center',
    overflow: 'hidden',
    width: cx(174),
  },
  mark: {
    backgroundColor: '#eaeaea',
    bottom: 0,
    left: 0,
    position: 'absolute',
    width: '100%',
  },
  track: { backgroundColor: 'rgba(206,206,206,0.12)', height: '100%', width: '100%' },
});
