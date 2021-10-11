/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
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
import Temperature from './Temp';

const { convertX: cx } = Utils.RatioUtils;

interface White {
  temperature: number;
  brightness: number;
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
  value: { temperature: 0, brightness: 1000 } as White,
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
   * 最小色温
   */
  minTemperaure: 0,
  /**
   * 最大色温
   */
  maxTemperaure: 1000,
  /**
   * 色温步长
   */
  stepTemperaure: 1,
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
  temperatureLabel: 'Temperature',
  /**
   * 是否禁用
   */
  disabled: false,
  /**
   * 滑动开始事件
   * @param v 颜色值
   */
  onGrant(v: White) {},
  /**
   * 滑动过程事件
   * @param v 颜色值
   */
  onMove(v: White) {},
  /**
   * 滑动结束事件
   * @param v 颜色值
   */
  onRelease(v: White) {},
  /**
   * 值改变事件
   * @param v 颜色值
   */
  onChange(v: White) {},
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

export default class HueBrightSlider extends Component<Props> {
  static defaultProps = defaultProps;
  constructor(props: Props) {
    super(props);
    this.tempValue = this.props.value;
    this.position.x = this.brightToCoor(this.tempValue.brightness);
    this.position.y = this.brightToCoor(this.tempValue.temperature);
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
        value: { temperature, brightness },
      } = nextProps;
      this.position.x = this.brightToCoor(brightness);
      this.position.y = this.temperatureToCoor(temperature);
    }
  }

  shouldComponentUpdate() {
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
  private tempValue: White;
  private brightRef: Bright;
  private temperatureRef: Temperature;
  private position: Position = { x: 0, y: 0 };

  handleStartPanResponder = (e: GestureResponderEvent) => {
    if (this.props.disabled) {
      return false;
    }

    return true;
  };

  handleTerminate = () => {
    // 响应器已经从该视图抽离
    this.moving = false;
    this.locked = false;
  };

  handleMove(pos: Position, callback: (value: White) => void, isEnd = false) {
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
      temp.brightness = bright;
      if (isEnd) {
        this.position.x = this.brightToCoor(bright);
      }
    } else {
      // @ts-ignore
      const y = Math.min(size, Math.max(this.position.y + dy, 0));
      const hue = this.coorToTemperature(y);
      this.temperatureRef.update(hue);
      temp.temperature = hue;
      if (isEnd) {
        this.position.y = this.temperatureToCoor(hue);
      }
    }

    if (this.notEqualColour(temp, this.tempValue)) {
      this.tempValue = temp;
      onChange(temp);
    }
    callback(temp);
  }

  notEqualColour(c1: White, c2: White) {
    return c1.brightness !== c2.brightness || c1.temperature !== c2.temperature;
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

  coorToTemperature(y: number) {
    const { size, minTemperaure, maxTemperaure, stepTemperaure } = this.props;
    const bright = (1 - y / size) * (maxTemperaure - minTemperaure);
    return Math.min(
      maxTemperaure,
      Math.round(bright / stepTemperaure) * stepTemperaure + minTemperaure
    );
  }

  temperatureToCoor(temp: number) {
    const { size, minTemperaure, maxTemperaure } = this.props;
    return (1 - (temp - minTemperaure) / (maxTemperaure - minTemperaure)) * size;
  }

  render() {
    const {
      size,
      textStyle,
      brightLabel,
      temperatureLabel,
      formatPercent,
      trackWidth,
      value,
      minBright,
      maxBright,
      minTemperaure,
      maxTemperaure,
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
          bright={value.brightness}
          min={minBright}
          max={maxBright}
          formatPercent={formatPercent}
        />
        <View style={{ position: 'absolute', height: size + 16, justifyContent: 'center' }}>
          <Temperature
            ref={(ref: Temperature) => {
              this.temperatureRef = ref;
            }}
            label={temperatureLabel}
            textStyle={textStyle}
            trackWidth={trackWidth}
            size={size}
            temp={value.temperature}
            min={minTemperaure}
            max={maxTemperaure}
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
