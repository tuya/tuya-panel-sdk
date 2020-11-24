import React, { PureComponent } from 'react';
import {
  View,
  StyleProp,
  ViewStyle,
  StyleSheet,
  PanResponder,
  I18nManager,
  PanResponderInstance,
  GestureResponderEvent,
  PanResponderGestureState,
  findNodeHandle,
  UIManager,
} from 'react-native';
import { TYSdk } from '@tuya-rn/tuya-native-components';

const isRtl = I18nManager.isRTL;

interface CircleSize {
  radius?: number;
}
interface RectSize extends CircleSize {
  width: number;
  height: number;
}

export function centerStyle(
  { width: ox, height: oy }: RectSize,
  { width: cx, height: cy }: RectSize
) {
  return {
    position: 'absolute',
    top: oy / 2,
    [isRtl ? 'right' : 'left']: ox / 2,
    width: cx,
    height: cy,
    transform: [
      {
        translateX: -cx / 2,
      },
      {
        translateY: -cy / 2,
      },
    ],
  };
}

/**
 * 极坐标转笛卡尔坐标
 * @param {number} radian - 弧度表示的极角
 */
function polarToCartesian(radius: number, radian: number) {
  const x = radius * Math.sin(radian);
  const y = radius * Math.cos(radian);
  return { x, y };
}

interface Cartesian {
  x: number;
  y: number;
}

/**
 *
 * 笛卡尔坐标转Dom坐标
 * @param {Cartesian} { x, y }
 * @param {number} offset
 * @returns
 */
function cartesianToPosition({ x, y }: Cartesian, offset: number) {
  // x = x - dx; y = -y + dy;
  return {
    x: x + offset,
    y: -y + offset,
  };
}

export interface CircleGestureCustomEvent {
  x: number;
  y: number;
  radian: number;
  degree: number;
  distance: number;
  radius: number;
}

/**
 *
 * 笛卡尔坐标转极坐标
 * @param {number} radius
 * @param {Cartesian} { x, y }
 * @returns
 */
function cartesianToPolar(radius: number, { x, y }: Cartesian) {
  const distance = radius; // 圆心距离坐标轴的距离
  let radian; //
  if (x === distance) {
    radian = y > distance ? 0 : Math.PI / 2;
  } else {
    const a = Math.atan((y - distance) / (x - distance)); // 计算点与圆心连线和 x 轴的夹角
    radian = (x < distance ? (Math.PI * 3) / 2 : Math.PI / 2) - a;
  }
  // return radian;
  return (Math.PI * 3 - radian) % (Math.PI * 2);

  // const distance = radius; // 圆心距离坐标轴的距离
  // if (x === distance) {
  //   return y > distance ? 0 : Math.PI / 2;
  // }
  // const a = Math.atan((y - distance) / (x - distance)); // 计算点与圆心连线和 x 轴的夹角
  // return (x < distance ? (Math.PI * 3) / 2 : Math.PI / 2) - a;
}

export function degreeToRadian(angle: number) {
  return (angle * Math.PI) / 180;
}

export function radianToDegree(radian: number) {
  return (radian * 180) / Math.PI;
}

function getDistanceFromCenter(x: number, y: number, r: number) {
  return Math.sqrt((x - r) ** 2 + (y - r) ** 2);
}

export function degreeDistance(pre: number, cur: number) {
  const a = (pre - cur + 360) % 360;
  const b = (cur - pre + 360) % 360;
  return Math.min(a, b);
}

function inRadiusRange(radius: number, circle: Cartesian, point: Cartesian) {
  const { x: cx, y: cy } = circle;
  const { x: px, y: py } = point;
  return (px - cx) ** 2 + (py - cy) ** 2 <= radius ** 2;
}

export interface CircleGestureProps {
  style?: StyleProp<ViewStyle>;
  radius: number;
  responsiveRadius?: number;
  disabled: boolean;
}

export default class CircleGesture<T = {}, S = {}> extends PureComponent<T, S> {
  static defaultProps = {
    style: null,
    radius: 80,
    responsiveRadius: undefined,
    disabled: false,
  };

  rootRadius: number;
  panResponder: PanResponderInstance;
  rootPageX: number;
  rootPageY: number;

  constructor(props: T) {
    super(props);

    this.initRootParam();
    this.createResponder();
  }

  setInstance = (name: string) => (ref: any) => {
    this[`__ref__${name}`] = ref;
  };

  getInstance = (name: string) => {
    return this[`__ref__${name}`];
  };

  initRootParam() {
    this.rootRadius = this.props.radius;
  }

  getResponsiveRadius() {
    return this.props.responsiveRadius || this.rootRadius;
  }

  // 制造一个弧形范围的响应热区
  handleSetPanResponder = (e: GestureResponderEvent, gestureState: PanResponderGestureState) => {
    const customEvent = this.getCustomEvent(e);
    return this.onShouldSetPanResponder(e, gestureState, customEvent);
  };

  handleSetPanResponderCapture = (
    e: GestureResponderEvent,
    gestureState: PanResponderGestureState
  ) => {
    const customEvent = this.getCustomEvent(e);
    return this.onShouldSetPanResponderCapture(e, gestureState, customEvent);
  };

  handleTerminationRequest = (e: GestureResponderEvent, gestureState: PanResponderGestureState) => {
    const customEvent = this.getCustomEvent(e);

    return this.onTerminationRequest(e, gestureState, customEvent);
  };

  createResponder() {
    this.panResponder = PanResponder.create({
      // 要求成为响应者：
      onStartShouldSetPanResponder: this.handleSetPanResponder,
      onStartShouldSetPanResponderCapture: this.handleSetPanResponderCapture,
      onMoveShouldSetPanResponder: this.handleSetPanResponder,
      onMoveShouldSetPanResponderCapture: this.handleSetPanResponderCapture,
      onPanResponderTerminationRequest: this.handleTerminationRequest,
      onPanResponderGrant: this.handleGrant,
      onPanResponderMove: this.handleMove,
      onPanResponderRelease: this.handleRelease,
    });
  }

  getPanHandlers = () => {
    return this.panResponder.panHandlers;
  };

  setRootPageXY(pageX: number, pageY: number) {
    this.rootPageX = pageX;
    this.rootPageY = pageY;
  }

  // super.
  componentDidMount() {
    TYSdk.event.once('NAVIGATOR_ON_DID_FOCUS', this.handlePageXY);
  }

  // super
  componentWillMount() {
    TYSdk.event.off('NAVIGATOR_ON_DID_FOCUS', this.handlePageXY);
  }

  handlePageXY = () => {
    try {
      UIManager.measure(
        findNodeHandle(this),
        (_x: any, _y: any, _width: any, _height: any, pageX: number, pageY: number) => {
          this.setRootPageXY(pageX, pageY);
        }
      );
    } catch (error) {
      console.warn(error);
    }
  };

  onLayout = () => {
    this.handlePageXY();
  };

  getRelativeRootByPage(e: GestureResponderEvent) {
    const {
      nativeEvent: { pageX, pageY },
    } = e;
    return {
      x: pageX - this.rootPageX,
      y: pageY - this.rootPageY,
    };
  }

  handleGrant = (e: GestureResponderEvent, gestureState: PanResponderGestureState) => {
    const customEvent = this.getCustomEvent(e);
    this.onGrant(e, gestureState, customEvent);
  };

  handleMove = (e: GestureResponderEvent, gestureState: PanResponderGestureState) => {
    const customEvent = this.getCustomEvent(e);
    this.onMove(e, gestureState, customEvent);
    this.onChange(e, gestureState, customEvent);
  };

  handleRelease = (e: GestureResponderEvent, gestureState: PanResponderGestureState) => {
    const customEvent = this.getCustomEvent(e);
    this.onRelease(e, gestureState, customEvent);
    this.onChange(e, gestureState, customEvent);
  };

  onShouldSetPanResponder(
    e: GestureResponderEvent,
    _gestureState: PanResponderGestureState,
    _customEvent: CircleGestureCustomEvent
  ) {
    const rootCenter = { x: this.rootRadius, y: this.rootRadius };
    const cur = this.getRelativeRootByPage(e);
    const inRange = inRadiusRange(this.getResponsiveRadius(), rootCenter, cur);
    const should = !this.props.disabled && inRange;
    return should;
  }

  onShouldSetPanResponderCapture(
    _e: GestureResponderEvent,
    _gestureState: PanResponderGestureState,
    _customEvent: CircleGestureCustomEvent
  ) {
    return false;
  }

  onTerminationRequest(
    _e: GestureResponderEvent,
    _gestureState: PanResponderGestureState,
    _customEvent: CircleGestureCustomEvent
  ) {
    return false;
  }

  onGrant(
    _e: GestureResponderEvent,
    _gestureState: PanResponderGestureState,
    _customEvent: CircleGestureCustomEvent
  ) {}

  onMove(
    _e: GestureResponderEvent,
    _gestureState: PanResponderGestureState,
    _customEvent: CircleGestureCustomEvent
  ) {}

  onRelease(
    _e: GestureResponderEvent,
    _gestureState: PanResponderGestureState,
    _customEvent: CircleGestureCustomEvent
  ) {}

  onChange(
    _e: GestureResponderEvent,
    _gestureState: PanResponderGestureState,
    _customEvent: CircleGestureCustomEvent
  ) {}

  getCustomEvent(e: GestureResponderEvent) {
    const point = this.getRelativeRootByPage(e);
    const radius = this.rootRadius;
    const radian = cartesianToPolar(radius, point);

    return {
      ...point,
      radius,
      radian,
      degree: radianToDegree(radian),
      get distance() {
        return getDistanceFromCenter(point.x, point.y, radius);
      },
    };
  }

  /**
   * 根据弧度和半径计算当前dom 坐标系的点
   * @param radian 弧度
   * @param radius 半径
   * @memberof CircleGesture
   */
  getCurrentPositionByRadian = (radian: number, radius: number) => {
    const { x, y } = cartesianToPosition(polarToCartesian(radius, radian), this.rootRadius);
    return {
      x,
      y,
    };
  };

  getGradientByPoint(x: number, y: number, r: number) {
    return Math.atan((r - y) / (r - x));
  }

  /**
   * 计算元素的旋转后的style
   *
   * @param {number} radian 弧度 [0,  Math.PI * 2]
   * @param {number} radius 当前点的半径
   * @param {number} elementRadius 当前定位元素的半径，简单的认为是一个正方形或圆，等价替换。
   * @returns
   * @memberof CircleGesture
   */
  getElementStyleByRadian(radian: number, radius: number, elementRadius: number): ViewStyle {
    if (Object.is(NaN, radian)) {
      radian = 0;
    }
    const centralAngle = radianToDegree(radian);
    const { x, y } = this.getCurrentPositionByRadian(radian, radius);
    return {
      position: 'absolute',
      top: 0,
      left: 0,
      transform: [
        { translate: [x - elementRadius, y - elementRadius] },
        { rotateZ: `${centralAngle}deg` },
      ],
    };
  }

  render() {
    const { style } = this.props;

    return (
      <View
        style={[style, this.rootSize]}
        onLayout={this.onLayout}
        {...this.panResponder.panHandlers}
      >
        {this.props.children}
      </View>
    );
  }
}
