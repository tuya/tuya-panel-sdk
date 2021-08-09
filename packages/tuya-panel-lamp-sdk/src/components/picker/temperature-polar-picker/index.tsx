import React, { Component } from 'react';
import {
  View,
  Image,
  PanResponder,
  PanResponderInstance,
  GestureResponderEvent,
  PanResponderGestureState,
} from 'react-native';

import { Utils } from 'tuya-panel-kit';
import { Svg, RadialGradient, Stop, Defs, Path } from 'react-native-svg';
import ColorUtils from '../../../utils/color';
import StorageUtils from '../../../utils/storage';

const { convertX } = Utils.RatioUtils;
const fullDeg = Math.PI * 2;
const defaultProps = {
  /**
   * 测试标
   */
  accessibilityLabel: 'hueSaturationPicker',
  /**
   * 是否禁用
   */
  disabled: false,
  /**
   * 是否隐藏滑块
   * 与disabled 一起使用，在不同状态下显示和隐藏滑块
   */
  hideThumb: false,
  /**
   * 禁用时组件时，滑块的透明度
   */
  disalbedThumbOpacity: 0.4,
  /**
   * 轨道外圈半径
   */
  radius: convertX(135),
  /**
   * 轨道内圈半径
   */
  innerRadius: convertX(66),
  /**
   * 滑块的半径
   */
  thumbRadius: convertX(16),
  /**
   * 色盘样子
   */
  bgColors: ['#FFEAC0', '#fff', '#C5EDF8'],
  /**
   * thumb 可点击范围
   */
  touchThumbRadius: 0, //
  /**
   * 可击点范围偏移，用于加大可点击范围
   */
  touchOffset: 0,
  /**
   * 当前值
   */
  value: 1000,

  /**
   * 最小色温值
   */
  min: 0,
  /**
   * 最大色温值
   */
  max: 1000,
  /**
   * 步长
   */
  step: 1,

  /**
   * 本地保存滑块位置的key
   */
  storageKey: 'temperature_polar_picker',

  /**
   * 值变化事件，仅值有变化时触发
   * @param value
   */
  onChange(value: number) {},
  /**
   * 滑动开始事件
   * @param value
   */
  onGrant(value: number) {},
  /**
   * 滑动过程事件
   * @param value
   */
  onMove(value: number) {},
  /**
   * 滑动结束事件
   * @param value
   */
  onRelease(value: number) {},
  /**
   * 点击轨道事件
   * @param value
   */
  onPress(value: number) {},
};

type DefaultProps = Readonly<typeof defaultProps>;
type IProps = {
  /**
   * 轨道的图
   * 当设置后，gradientBg 属性将不起作用
   */
  bgImg?: any;
  /**
   * 组件样式
   */
  style?: any;
  /**
   * 滑块样式
   */
  thumbStyle?: any;
} & DefaultProps;

interface IState {
  hideThumb: boolean;
  showThumbEnabled: boolean;
}

interface Position {
  x: number;
  y: number;
}

export default class TemperaturePolarPicker extends Component<IProps, IState> {
  static defaultProps: DefaultProps = defaultProps;
  private locked = false;
  private _panResponder: PanResponderInstance;
  private temperature: number;
  private coor: Position = { x: 0, y: 0 };
  private thumbRef: View;
  private tempValue: number;
  private maxSize = 100;
  constructor(props: IProps) {
    super(props);
    this.state = { hideThumb: this.props.hideThumb, showThumbEnabled: false };
    this.tempValue = this.props.value;
    this.initData(this.props);
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this.handleSetResponder,
      onMoveShouldSetPanResponder: () => this.locked,
      onPanResponderTerminationRequest: () => !this.locked,
      onPanResponderGrant: this.handleGrant,
      onPanResponderMove: this.handleMove,
      onPanResponderRelease: this.handleRelease,
    });
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(nextProps: IProps) {
    if (!this.locked) {
      if (nextProps.hideThumb !== this.props.hideThumb) {
        this.setState({ hideThumb: nextProps.hideThumb });
      }
      const { radius, innerRadius, thumbRadius } = nextProps;
      const {
        radius: oldRadius,
        innerRadius: oldInnerRadius,
        thumbRadius: oldThumbRadius,
      } = this.props;
      this.initData(
        nextProps,
        radius !== oldRadius || innerRadius !== oldInnerRadius || thumbRadius !== oldThumbRadius
      );
    }
  }

  shouldComponentUpdate() {
    return !this.locked;
  }

  getLocation(e: GestureResponderEvent) {
    const { maxSize } = this;
    const maxRadius = maxSize / 2;
    const { locationX, locationY } = e.nativeEvent;

    return { locationX: locationX - maxRadius, locationY: locationY - maxRadius };
  }

  initData(props: IProps, needUpdate = true) {
    const { radius, thumbRadius, value, storageKey } = props;
    this.maxSize = radius * 2 + thumbRadius * 2;
    let newNeedUpdate = needUpdate;
    if (!newNeedUpdate) {
      newNeedUpdate = value !== this.props.value;
    }
    if (newNeedUpdate) {
      this.temperature = value;
      StorageUtils.getDevItem(storageKey).then(data => {
        if (data && data.temperature === this.temperature) {
          this.coor = { x: data.x, y: data.y };
        } else {
          this.coor = this.valueToCoor(value);
        }
        this.setState({ showThumbEnabled: true });
      });
    }
  }

  valueToCoor(value: number, touchPoint?: Position) {
    const { radius, innerRadius, min, max } = this.props;
    const currentRadius = ((value - min) * (radius - innerRadius)) / (max - min) + innerRadius;
    let deg = 0;
    if (touchPoint) {
      const length = Math.sqrt(touchPoint.x ** 2 + touchPoint.y ** 2);
      deg = Math.acos(touchPoint.x / length);
      if (touchPoint.y > 0) {
        deg = fullDeg - deg;
      }
    }
    const x = Math.cos(deg) * currentRadius;
    const y = -Math.sin(deg) * currentRadius;

    return { x, y };
  }

  coorToValue(x: number, y: number) {
    const { radius, innerRadius, min, max } = this.props;
    const length = Math.sqrt(x ** 2 + y ** 2);
    const currentRadius = Math.max(innerRadius, Math.min(length, radius));
    const value = Math.round(
      ((currentRadius - innerRadius) * (max - min)) / (radius - innerRadius) + min
    );
    return value;
  }

  valueToColor(value: number) {
    const { min, max } = this.props;
    return ColorUtils.brightKelvin2rgba(1000, ((value - min) * 1000) / (max - min));
  }

  handleSetResponder = (e: GestureResponderEvent) => {
    if (this.props.disabled) {
      return false;
    }
    const { radius, innerRadius, thumbRadius, touchThumbRadius, touchOffset } = this.props;
    const { locationX, locationY } = this.getLocation(e);
    const length = Math.sqrt(locationX ** 2 + locationY ** 2);

    // 是否为按中滑块
    const { x, y } = this.coor;
    const distance = Math.sqrt((locationX - x) ** 2 + (locationY - y) ** 2);
    const thumbTouchRadius = touchThumbRadius || thumbRadius;
    if (distance <= thumbTouchRadius) {
      this.locked = true;
      return true;
    }
    return length >= innerRadius - touchOffset && length <= radius + touchOffset;
  };

  showThumb = () => {
    if (this.state.hideThumb) {
      this.setState({ hideThumb: false });
    }
  };

  handleGrant = () => {
    this.locked && this.props.onGrant(this.temperature);
  };

  handleMoveThumb(dx: number, dy: number, listener: (value: number) => void) {
    const { coor } = this;
    let { x, y } = coor;
    x += dx;
    y += dy;
    const data = this.coorToValue(x, y);
    // 使用角度算出位置，避免精度丢失问题
    const { x: thumbX, y: thumbY } = this.valueToCoor(data, { x, y });
    this.temperature = data;
    this.showThumb();
    this.thumbRef &&
      this.thumbRef.setNativeProps({
        style: {
          backgroundColor: this.valueToColor(data),
          transform: [
            {
              translate: [thumbX, thumbY],
            },
          ],
          opacity: 1,
        },
      });
    if (data !== this.tempValue) {
      this.tempValue = data;
      this.props.onChange(data);
    }
    listener(data);
    return { x: thumbX, y: thumbY };
  }

  handleMove = (e: GestureResponderEvent, { dx, dy }: PanResponderGestureState) => {
    this.locked && this.handleMoveThumb(dx, dy, this.props.onMove);
  };

  handleRelease = (e: GestureResponderEvent, { dx, dy }: PanResponderGestureState) => {
    const { locationX, locationY } = this.getLocation(e);
    if (this.locked) {
      this.coor = this.handleMoveThumb(dx, dy, this.props.onRelease);
    } else if (Math.abs(dx) < 4 && Math.abs(dy) < 4) {
      const { x, y } = this.coor;
      this.coor = this.handleMoveThumb(locationX - x, locationY - y, this.props.onPress);
    }
    StorageUtils.setDevItem(this.props.storageKey, { temperature: this.temperature, ...this.coor });
    this.locked = false;
  };

  render() {
    const {
      accessibilityLabel,
      bgImg,
      radius,
      innerRadius,
      thumbRadius,
      style,
      disabled,
      bgColors,
      thumbStyle,
      ...rest
    } = this.props;
    const { hideThumb, showThumbEnabled } = this.state;
    const size = radius * 2;
    const ringWidth = radius - innerRadius;
    const thumbSize = thumbRadius * 2;
    const { maxSize, coor } = this;
    const percent = Math.floor((innerRadius / radius) * 100);
    const leftOverPercent = 100 - percent;

    const path = `M0 ${radius}A${radius} ${radius} 0 1 0 ${size} ${radius}A${radius} ${radius} 0 1 0 0 ${radius}Z
    M${ringWidth} ${radius}A${innerRadius} ${innerRadius} 0 1 1 ${
      size - ringWidth
    } ${radius}A${innerRadius} ${innerRadius} 0 1 1 ${ringWidth} ${radius}Z`;
    // studio 中 RadialGradien 更新无效，这里使用动态id做兼容
    const gradientId = `temp_polar_${size}${ringWidth}`;

    return (
      <View
        {...rest}
        style={[
          {
            width: maxSize,
            height: maxSize,
            alignItems: 'center',
            justifyContent: 'center',
          },
          style,
        ]}
      >
        <View
          style={{
            width: size,
            height: size,
          }}
        >
          {bgImg ? (
            <Image
              source={bgImg}
              style={{
                width: size,
                height: size,
              }}
            />
          ) : (
            <Svg width={size} height={size}>
              <Defs>
                <RadialGradient
                  id={gradientId}
                  cx={radius}
                  cy={radius}
                  rx={radius}
                  ry={radius}
                  fx={radius}
                  fy={radius}
                  gradientUnits="userSpaceOnUse"
                >
                  {bgColors.map((color, index) => {
                    return (
                      <Stop
                        // eslint-disable-next-line react/no-array-index-key
                        key={index}
                        offset={`${percent + leftOverPercent * (index / (bgColors.length - 1))}%`}
                        stopColor={color}
                        stopOpacity="1"
                      />
                    );
                  })}
                </RadialGradient>
              </Defs>
              <Path d={path} fill={`url(#${gradientId})`} />
              <Path d={path} fill={`url(#${gradientId})`} />
            </Svg>
          )}
        </View>
        <View
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: maxSize,
            height: maxSize,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {showThumbEnabled && (
            <View
              ref={(ref: View) => {
                this.thumbRef = ref;
              }}
              style={[
                {
                  width: thumbSize,
                  height: thumbSize,
                  borderRadius: thumbRadius,
                  borderWidth: convertX(4),
                  borderColor: '#fff',
                  backgroundColor: this.valueToColor(this.temperature),
                  transform: [{ translateX: coor.x }, { translateY: coor.y }],
                  opacity: disabled || hideThumb ? 0 : 1,
                },
                thumbStyle,
              ]}
            />
          )}
        </View>
        <View
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: maxSize,
            height: maxSize,
          }}
          {...this._panResponder.panHandlers}
          pointerEvents="box-only"
          accessibilityLabel={accessibilityLabel}
        />
      </View>
    );
  }
}
