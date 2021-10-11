/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  PanResponder,
  PanResponderInstance,
  GestureResponderEvent,
  PanResponderGestureState,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { Utils } from 'tuya-panel-kit';
import Bright from './Bright';
import Hue from './Hue';

const { convertX: cx } = Utils.RatioUtils;

interface Colour {
  hue: number;
  saturation: number;
  value: number;
}

interface Position {
  x: number;
  y: number;
  dx?: number;
  dy?: number;
}

const defaultProps = {
  /**
   * 值
   */
  value: { hue: 0, saturation: 1000, value: 1000 } as Colour,
  /**
   * 最小亮度
   */
  minBright: 10,
  /**
   * 最大亮度
   */
  maxBright: 1000,
  /**
   * 亮度步长
   */
  stepBright: 1,
  /**
   * 组件尺寸
   */
  size: cx(344),
  /**
   * 轨道宽度
   */
  trackWidth: cx(27),
  /**
   * 亮度label
   */
  brightLabel: 'Brightness',
  /**
   * 彩光label
   */
  hueLabel: 'Hue',
  /**
   * 是否禁用
   */
  disabled: false,
  /**
   * 滑动开始事件
   * @param v 颜色值
   */
  onGrant(v: Colour) {},
  /**
   * 滑动过程事件
   * @param v 颜色值
   */
  onMove(v: Colour) {},
  /**
   * 滑动结束事件
   * @param v 颜色值
   */
  onRelease(v: Colour) {},
  /**
   * 值改变事件
   * @param v 颜色值
   */
  onChange(v: Colour) {},
};

type Props = {
  /**
   * 组件样式
   */
  style?: StyleProp<ViewStyle>;
  /**
   * 组件文字样式
   */
  textStyle?: StyleProp<TextStyle>;
  /**
   * 格式化百分比
   */
  formatPercent?: (v: number) => number;
} & Readonly<typeof defaultProps>;

export default class HueBrightCrossSlider extends Component<Props> {
  static defaultProps = defaultProps;

  constructor(props: Props) {
    super(props);
    this.tempValue = this.props.value;
    this.position.x = this.brightToCoor(this.tempValue.value);
    this.position.y = this.brightToCoor(this.tempValue.hue);
    this.panResponder = PanResponder.create({
      // 要求成为响应者：
      onStartShouldSetPanResponder: this.handleStartPanResponder,
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
  componentWillReceiveProps(nextProps: Props) {
    if (!this.locked) {
      const {
        value: { hue, value },
      } = nextProps;
      this.position.x = this.brightToCoor(value);
      this.position.y = this.hueToCoor(hue);
    }
  }

  shouldComponentUpdate(nextProps: Props) {
    return !this.locked;
  }

  onGrant = (e: GestureResponderEvent) => {
    this.props.onGrant(this.props.value);
    this.moving = true;
    this.locked = true;
  };

  onMove = (e: GestureResponderEvent, gesture: PanResponderGestureState) => {
    if (this.moving) {
      const { dx, dy } = gesture;
      if (this.direction !== 0) {
        const { locationX, locationY } = e.nativeEvent;
        this.handleMove({ x: locationX, y: locationY, dx, dy }, this.props.onMove, false);
      } else if (Math.abs(dx) > 10) {
        this.direction = 1;
      } else if (Math.abs(dy) > 10) {
        this.direction = -1;
      }
    }
  };

  onRelease = (e: GestureResponderEvent, gesture: PanResponderGestureState) => {
    if (this.moving && this.direction !== 0) {
      const { locationX, locationY } = e.nativeEvent;
      const { dx, dy } = gesture;
      this.handleMove({ x: locationX, y: locationY, dx, dy }, this.props.onRelease, true);
    }
    this.direction = 0;
    this.moving = false;
    this.locked = false;
  };

  private panResponder: PanResponderInstance;
  private moving = false;
  private locked = false;
  private direction: 1 | -1 | 0 = 0; // 1为水平，0为未定，-1为竖直
  private tempValue: Colour;
  private brightRef: Bright;
  private hueRef: Hue;
  private position: Position = { x: 0, y: 0 };

  handleTerminate = () => {
    // 响应器已经从该视图抽离
    this.moving = false;
    this.locked = false;
  };

  handleStartPanResponder = (e: GestureResponderEvent) => {
    if (this.props.disabled) {
      return false;
    }
    return true;
  };

  handleMove(pos: Position, callback: (value: Colour) => void, isEnd = false) {
    const { direction } = this;
    const { onChange, value, size } = this.props;
    const isHorizontal = direction === 1;
    const { dx, dy } = pos;
    const temp = { ...value };
    if (isHorizontal) {
      // @ts-ignore
      const x = Math.min(size, Math.max(this.position.x + dx, 0));
      const bright = this.coorToBright(x);
      this.brightRef.update(bright);
      temp.value = bright;
      if (isEnd) {
        this.position.x = this.brightToCoor(bright);
      }
    } else {
      // @ts-ignore
      const y = Math.min(size, Math.max(this.position.y + dy, 0));
      const hue = this.coorToHue(y);
      this.hueRef.update(hue);
      temp.hue = hue;
      if (isEnd) {
        this.position.y = this.hueToCoor(hue);
      }
    }

    if (this.notEqualColour(temp, this.tempValue)) {
      this.tempValue = temp;
      onChange(temp);
    }
    callback(temp);
  }

  notEqualColour(c1: Colour, c2: Colour) {
    return c1.hue !== c2.hue || c1.value !== c2.value;
  }

  coorToBright(x: number) {
    const { minBright, maxBright, stepBright, size } = this.props;
    const bright = (x * (maxBright - minBright)) / size;

    return Math.min(maxBright, Math.round(bright / stepBright) * stepBright + minBright);
  }

  brightToCoor(bright: number) {
    const { minBright, maxBright, size } = this.props;
    return ((bright - minBright) * size) / (maxBright - minBright);
  }

  coorToHue(y: number) {
    const { size } = this.props;
    const hue = Math.round((y * 360) / size);
    return hue;
  }

  hueToCoor(hue: number) {
    const { size } = this.props;
    return (hue / 360) * size;
  }

  render() {
    const {
      size,
      textStyle,
      brightLabel,
      hueLabel,
      formatPercent,
      trackWidth,
      value,
      minBright,
      maxBright,
    } = this.props;
    return (
      <View
        style={[styles.container, { width: size + 16, height: size + 16 }]}
        pointerEvents="box-only"
        {...this.panResponder.panHandlers}
      >
        <Bright
          ref={(ref: Bright) => {
            this.brightRef = ref;
          }}
          label={brightLabel}
          textStyle={textStyle}
          trackWidth={trackWidth}
          size={size}
          bright={value.value}
          minBright={minBright}
          maxBright={maxBright}
          formatPercent={formatPercent}
        />
        <View style={{ position: 'absolute', height: size + 16, justifyContent: 'center' }}>
          <Hue
            ref={(ref: Hue) => {
              this.hueRef = ref;
            }}
            label={hueLabel}
            textStyle={textStyle}
            trackWidth={trackWidth}
            size={size}
            hue={value.hue}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
