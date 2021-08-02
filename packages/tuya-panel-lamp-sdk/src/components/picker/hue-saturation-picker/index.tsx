/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { Component } from 'react';
import {
  View,
  Image,
  PanResponder,
  PanResponderInstance,
  GestureResponderEvent,
  PanResponderGestureState,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { Utils } from 'tuya-panel-kit';
import ColorUtils from '../../../utils/color';
import Res from '../../../res';

interface HsvColor {
  hue: number;
  saturation: number;
  value: number;
}

const { convertX } = Utils.RatioUtils;

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
   * 轨道的图
   */
  // eslint-disable-next-line import/no-unresolved
  bgImg: Res.colorPicker,
  /**
   * 轨道外圈半径
   */
  radius: convertX(135),
  /**
   * 轨道内圈半径
   */
  innerRadius: 0,
  /**
   * 滑块的半径
   */
  thumbRadius: convertX(16),
  /**
   * 沿逆时针方向偏移角度度数
   */
  offsetAngle: 0,
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
  value: { hue: 0, saturation: 1000, value: 1000 } as HsvColor,

  /**
   * 最小饱合度
   */
  minSaturation: 0,
  /**
   * 最大饱合度
   */
  maxSaturation: 1000,
  /**
   * 色温步长
   */
  stepSaturation: 1,

  /**
   * hue 步长
   */
  stepHue: 1,

  /**
   * 值变化事件，仅值有变化时触发
   * @param color
   */
  onChange(color: HsvColor) {},
  /**
   * 滑动开始事件
   * @param color
   */
  onGrant(color: HsvColor) {},
  /**
   * 滑动过程事件
   * @param color
   */
  onMove(color: HsvColor) {},
  /**
   * 滑动结束事件
   * @param color
   */
  onRelease(color: HsvColor) {},
  /**
   * 点击轨道事件
   * @param color
   */
  onPress(color: HsvColor) {},
};

type DefaultProps = Readonly<typeof defaultProps>;
type IProps = {
  /**
   * 组件样式
   */
  style?: StyleProp<ViewStyle>;
  /**
   * 滑块样式
   */
  thumbStyle?: StyleProp<ViewStyle>;
} & DefaultProps;

interface IState {
  hideThumb: boolean;
}

export default class HuePicker extends Component<IProps, IState> {
  static defaultProps: DefaultProps = defaultProps;
  constructor(props: IProps) {
    super(props);
    this.state = { hideThumb: this.props.hideThumb };
    this.tempColor = this.props.value;
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
      this.initData(nextProps);
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

  private locked = false;
  private _panResponder: PanResponderInstance;
  private color: HsvColor;
  private coor: { x: number; y: number } = { x: 0, y: 0 };
  private thumbRef: React.ReactNode;
  private tempColor: HsvColor;
  private maxSize = 100;

  initData(props: IProps) {
    const { radius, thumbRadius, value } = props;
    this.maxSize = radius * 2 + thumbRadius * 2;
    this.color = value;
    this.coor = this.valueToCoor(value);
  }

  valueToCoor(color: HsvColor) {
    // 角度
    const angle = (((color.hue + this.props.offsetAngle) % 360) * Math.PI) / 180;
    // 半径位置
    const { radius, innerRadius, minSaturation, maxSaturation } = this.props;
    const currentRadius =
      ((radius - innerRadius) * (color.saturation - minSaturation)) /
        (maxSaturation - minSaturation) +
      innerRadius;
    const x = Math.cos(angle) * currentRadius;
    const y = -Math.sin(angle) * currentRadius;

    return { x, y };
  }

  coorToValue(x: number, y: number) {
    const {
      radius,
      innerRadius,
      offsetAngle,
      minSaturation,
      maxSaturation,
      value,
      stepSaturation,
      stepHue,
    } = this.props;
    const length = Math.sqrt(x ** 2 + y ** 2);
    let angle = (Math.acos(x / length) * 180) / Math.PI;
    if (y > 0) {
      angle = 360 - angle;
    }
    angle = (angle - offsetAngle + 360) % 360;
    angle = Math.min(Math.round(angle / stepHue) * stepHue, 360);

    const currentRadius = Math.max(innerRadius, Math.min(length, radius));
    const saturation =
      Math.round(
        ((currentRadius - innerRadius) * (maxSaturation - minSaturation)) /
          (radius - innerRadius) /
          stepSaturation
      ) *
        stepSaturation +
      minSaturation;
    const data = { ...value, hue: angle, saturation: Math.min(saturation, maxSaturation) };
    return data;
  }

  valueToColor(color: HsvColor) {
    return ColorUtils.hsv2rgba(color.hue, color.saturation, 1000);
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
    this.locked && this.props.onGrant(this.color);
  };

  handleMoveThumb(dx: number, dy: number, listener: (params: any) => void) {
    const { coor } = this;
    let { x, y } = coor;
    x += dx;
    y += dy;
    const data = this.coorToValue(x, y);
    // 使用角度算出位置，避免精度丢失问题
    const { x: thumbX, y: thumbY } = this.valueToCoor(data);
    this.color = data;
    this.showThumb();
    this.thumbRef &&
      // @ts-ignore
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
    if (data.hue !== this.tempColor.hue || data.saturation !== this.tempColor.saturation) {
      this.tempColor = data;
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
    this.locked = false;
  };

  render() {
    const {
      accessibilityLabel,
      bgImg,
      radius,
      thumbRadius,
      style,
      disabled,
      thumbStyle,
      ...rest
    } = this.props;
    const { hideThumb } = this.state;
    const size = radius * 2;
    const thumbSize = thumbRadius * 2;
    const coor = this.valueToCoor(this.color);
    const { maxSize } = this;

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
          <Image
            source={bgImg}
            style={{
              width: size,
              height: size,
            }}
          />
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
          <View
            ref={ref => {
              this.thumbRef = ref;
            }}
            style={[
              {
                width: thumbSize,
                height: thumbSize,
                borderRadius: thumbRadius,
                borderWidth: convertX(4),
                borderColor: '#fff',
                backgroundColor: this.valueToColor(this.color),
                transform: [{ translateX: coor.x }, { translateY: coor.y }],
                opacity: disabled || hideThumb ? 0 : 1,
              },
              thumbStyle,
            ]}
          />
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
