import React, { PureComponent, ReactChildren } from 'react';
import {
  View,
  StyleProp,
  ViewStyle,
  StyleSheet,
  PanResponder,
  Image,
  I18nManager,
  ImageStyle,
  ImageSourcePropType,
  NativeModules,
} from 'react-native';
import { Utils } from '@tuya-rn/tuya-native-components';

const { convert } = Utils.RatioUtils;

const isRtl = I18nManager.isRTL;

interface CircleSize {
  radius?: number;
}

interface RectSize extends CircleSize {
  width: number;
  height: number;
}

interface ThumbOffset {
  dx: number;
  dy: number;
}

// const thumbImg = require('../res/thumbCenter.png');
// const backImage = require('../res/hue.png');

function centerStyle({ width: ox, height: oy }: RectSize, { width: cx, height: cy }: RectSize) {
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

function angleToRadian(angle: number) {
  return (angle * Math.PI) / 180;
}

function radianToAngle(radian: number) {
  return (radian * 180) / Math.PI;
}

function inRadiusRange(radius: number, circle: Cartesian, point: Cartesian) {
  const { x: cx, y: cy } = circle;
  const { x: px, y: py } = point;
  return (px - cx) ** 2 + (py - cy) ** 2 <= radius ** 2;
}

interface CircleProps {
  style?: StyleProp<ViewStyle>;
  radius: number;
  responsiveRadius?: number;
  disabled: boolean;
  thumbSize: RectSize;
  thumbImage: ImageSourcePropType;
  backgroundImage: ImageSourcePropType;
  backgroundSize: RectSize;
  centralAngle: number;
  children: any;

  renderThumb(): ReactChildren;
  renderBackground(): ReactChildren;
  thumbOffset(d: RectSize): ThumbOffset;
  onChange(angle: number): void;
  onMove(angle: number): void;
  onRelease(angle: number): void;
  onGrant(): void;
}

export default class Circle extends PureComponent<CircleProps> {
  [x: string]: any;

  static defaultProps = {
    style: null,
    radius: convert(80),
    responsiveRadius: undefined,
    centralAngle: 0,
    disabled: false,
    thumbSize: {
      width: convert(45),
      height: convert(45),
    },
    thumbOffset({ width, height }: RectSize) {
      return { dx: width / 2, dy: height / 2 };
    },
    thumbImage: null,
    backgroundSize: {
      width: convert(180),
      height: convert(180),
    },
    backgroundImage: null,
    children: null,
    onChange() {},
    onMove() {},
    onRelease() {},
    onGrant() {},
  };

  state = {};

  constructor(props: CircleProps) {
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

  setInstanceThumb = () => this.setInstance('thumb');

  getInstanceThumb = () => this.getInstance('thumb');

  initRootParam() {
    const { width, height, radius } = this.generateRootSize();
    this.rootSize = { width, height };
    this.rootRadius = radius;
  }

  getResponsiveRadius() {
    return this.props.responsiveRadius || this.rootRadius;
  }

  // 制造一个弧形范围的响应热区
  isEnabled = ({ nativeEvent: { pageX, pageY } }) => {
    const rootCenter = { x: this.rootRadius, y: this.rootRadius };
    const cur = this.getRelativeRootByPage(pageX, pageY);
    const inRange = inRadiusRange(this.getResponsiveRadius(), rootCenter, cur);
    return !this.props.disabled && inRange;
  };

  createResponder() {
    this.panResponder = PanResponder.create({
      // 要求成为响应者：
      onStartShouldSetPanResponder: this.isEnabled,
      onStartShouldSetPanResponderCapture: () => false,
      onMoveShouldSetPanResponder: this.isEnabled,
      onMoveShouldSetPanResponderCapture: () => false,
      onPanResponderTerminationRequest: () => false,
      onPanResponderGrant: this.handleGrant,
      onPanResponderMove: this.handleMove,
      onPanResponderRelease: this.handleRelease,
    });
  }

  setRootPageXY(pageX: number, pageY: number) {
    this.rootPageX = pageX;
    this.rootPageY = pageY;
  }

  onLayout = ({ target }) => {
    NativeModules.UIManager.measure(
      target,
      (x: any, y: any, width: any, height: any, pageX: number, pageY: number) => {
        this.setRootPageXY(pageX, pageY);
      }
    );
  };

  getRelativeRootByPage(pageX: number, pageY: number) {
    return {
      x: pageX - this.rootPageX,
      y: pageY - this.rootPageY,
    };
  }

  handleGrant = ({ nativeEvent: { pageX, pageY } }) => {
    const point = this.getRelativeRootByPage(pageX, pageY);
    this.setThumbStyleByLocation(point);
    this.props.onGrant();
  };

  handleMove = ({ nativeEvent: { pageX, pageY } }) => {
    const point = this.getRelativeRootByPage(pageX, pageY);

    const centralAngle = this.setThumbStyleByLocation(point);
    this.props.onMove(centralAngle);
    this.props.onChange(centralAngle);
  };

  handleRelease = ({ nativeEvent: { pageX, pageY } }) => {
    const point = this.getRelativeRootByPage(pageX, pageY);

    const centralAngle = this.setThumbStyleByLocation(point);
    this.props.onRelease(centralAngle);
    this.props.onChange(centralAngle);
  };

  setThumbStyleByLocation(point: Cartesian) {
    const radian = cartesianToPolar(this.rootRadius, point);
    const thumbStyle = this.createThumbStyleByRadian(radian);

    this.getInstanceThumb().setNativeProps({ style: thumbStyle });
    return radianToAngle(radian);
  }

  getThumbOffset() {
    const { thumbSize, thumbOffset } = this.props;
    return thumbOffset(thumbSize);
  }

  generateRootSize() {
    const {
      backgroundSize: { width: backW, height: backH },
      radius,
    } = this.props;
    const { dx, dy } = this.getThumbOffset();
    const dMax = Math.max(dx, dy);
    const thumbRadius = radius + dMax;
    const backRadius = Math.max(backW, backH) / 2;
    const radiusMax = Math.max(thumbRadius, backRadius);
    return {
      width: radiusMax * 2,
      height: radiusMax * 2,
      radius: radiusMax,
    };
  }

  centerSelfStyle(size: RectSize) {
    return centerStyle(this.rootSize, size);
  }

  getCurrentPositionByRadian = (radian: number) => {
    const { radius } = this.props;
    const { dx, dy } = this.getThumbOffset();
    const { x, y } = cartesianToPosition(polarToCartesian(radius, radian), this.rootRadius);
    return {
      x: x - dx,
      y: y - dy,
    };
  };

  createThumbStyleByRadian(radian: number) {
    if (Object.is(NaN, radian)) {
      radian = 0;
    }
    const centralAngle = radianToAngle(radian);
    const { x, y } = this.getCurrentPositionByRadian(radian);
    return {
      position: 'absolute',
      top: 0,
      left: 0,
      transform: [{ translate: [x, y] }, { rotateZ: `${centralAngle}deg` }],
    };
  }

  render() {
    const {
      backgroundImage,
      thumbImage,
      thumbSize,
      centralAngle,
      backgroundSize,
      style,
    } = this.props;

    const thumbStyle = this.createThumbStyleByRadian(angleToRadian(centralAngle));
    return (
      <View
        style={[styles.root, style, this.rootSize]}
        onLayout={this.onLayout}
        {...this.panResponder.panHandlers}
      >
        {/* backgroundImage */}
        <Image
          source={backgroundImage}
          style={[this.centerSelfStyle(backgroundSize)] as ImageStyle}
        />
        
        {/* thumbImage */}
        <Image
          ref={this.setInstanceThumb()}
          source={thumbImage}
          style={[thumbSize, thumbStyle] as ImageStyle}
        />
        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    // borderWidth: 1,
    // borderColor: "red"
  },
});
