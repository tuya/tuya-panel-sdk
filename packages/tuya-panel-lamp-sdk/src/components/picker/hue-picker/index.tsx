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

const { convertX } = Utils.RatioUtils;

const defaultProps = {
  /**
   * 测试标
   */
  accessibilityLabel: 'huePicker',
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
  bgImg: Res.colorBg,
  /**
   * 轨道外圈半径
   */
  radius: convertX(135),
  /**
   * 轨道内圈半径
   */
  innerRadius: convertX(75),
  /**
   * 滑块的半径
   */
  thumbRadius: convertX(28),
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
  value: 0,
  /**
   * 值变化事件，仅值有变化时触发
   * @param hue
   */
  onChange(hue: number) {},
  /**
   * 滑动开始事件
   * @param hue
   */
  onGrant(hue: number) {},
  /**
   * 滑动过程事件
   * @param hue
   */
  onMove(hue: number) {},
  /**
   * 滑动结束事件
   * @param hue
   */
  onRelease(hue: number) {},
  /**
   * 点击轨道事件
   * @param hue
   */
  onPress(hue: number) {},
};

type DefaultProps = Readonly<typeof defaultProps>;
type HuePickerProps = {
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

export default class HuePicker extends Component<HuePickerProps, IState> {
  static defaultProps: DefaultProps = defaultProps;

  constructor(props: HuePickerProps) {
    super(props);
    this.state = { hideThumb: this.props.hideThumb };
    this.tempHue = this.props.value;
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
  componentWillReceiveProps(nextProps: HuePickerProps) {
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
    const { radius, innerRadius, thumbRadius } = this.props;
    const maxRadius = (radius + innerRadius) / 2 + thumbRadius;
    const { locationX, locationY } = e.nativeEvent;

    return { locationX: locationX - maxRadius, locationY: locationY - maxRadius };
  }

  private locked = false;
  private _panResponder: PanResponderInstance;
  private middleRadius = 0;
  private hue = 0;
  private coor: { x: number; y: number } = { x: 0, y: 0 };
  private thumbRef: React.ReactNode;
  private tempHue = 0;

  initData(props: HuePickerProps) {
    const { radius, innerRadius, value } = props;
    this.middleRadius = (radius + innerRadius) / 2;
    this.hue = value;

    this.coor = this.hueToCoor(value);
  }

  hueToCoor(hue: number) {
    const angle = (((hue + this.props.offsetAngle) % 360) * Math.PI) / 180;
    const x = Math.cos(angle) * this.middleRadius;
    const y = -Math.sin(angle) * this.middleRadius;

    return { x, y };
  }

  hueToColor(hue: number) {
    return ColorUtils.hsb2hex(hue, 1000, 1000);
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
    this.locked && this.props.onGrant(this.hue);
  };

  handleMoveThumb(dx: number, dy: number, listener: (params: any) => void) {
    const { coor } = this;
    let { x, y } = coor;
    x += dx;
    y += dy;
    const length = Math.sqrt(x ** 2 + y ** 2);
    let angle = Math.round((Math.acos(x / length) * 180) / Math.PI);
    if (y > 0) {
      angle = 360 - angle;
    }
    angle = (angle - this.props.offsetAngle + 360) % 360;
    // 使用角度算出位置，避免精度丢失问题
    const { x: thumbX, y: thumbY } = this.hueToCoor(angle);

    this.hue = angle;
    this.showThumb();

    this.thumbRef &&
      // @ts-ignore
      this.thumbRef.setNativeProps({
        style: {
          backgroundColor: this.hueToColor(angle),
          transform: [
            {
              translate: [thumbX, thumbY],
            },
          ],
          opacity: 1,
        },
      });
    if (angle !== this.tempHue) {
      this.tempHue = angle;
      this.props.onChange(angle);
    }
    listener(angle);
    return { x: thumbX, y: thumbY };
  }

  handleMove = (e: GestureResponderEvent, { dx, dy }: PanResponderGestureState) => {
    this.locked && this.handleMoveThumb(dx, dy, this.props.onMove);
  };

  handleRelease = (e: GestureResponderEvent, { dx, dy }: PanResponderGestureState) => {
    const { locationX, locationY } = this.getLocation(e);
    if (this.locked) {
      this.coor = this.handleMoveThumb(dx, dy, this.props.onRelease);
    } else if (Math.abs(dx) < 3 && Math.abs(dy) < 3) {
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
      innerRadius,
      thumbRadius,
      style,
      disabled,
      thumbStyle,
      ...rest
    } = this.props;
    const { hideThumb } = this.state;
    const size = radius * 2;
    const thumbSize = thumbRadius * 2;
    const coor = this.hueToCoor(this.hue);
    const maxSize = Math.max(radius * 2, ((radius + innerRadius) / 2 + thumbRadius) * 2);
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
                backgroundColor: this.hueToColor(this.hue),
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
