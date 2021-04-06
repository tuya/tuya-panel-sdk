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
import { Svg, LinearGradient, Stop, Defs, Path } from 'react-native-svg';
import ColorUtils from '../../../utils/color';
import storageUtils from '../../../utils/storage';

interface LinearStop {
  offset: number | string;
  stopColor: string;
  stopOpacity: number;
}

const { convertX } = Utils.RatioUtils;
const fullDeg = Math.PI * 2;
const defaultProps = {
  /**
   * 测试标
   */
  accessibilityLabel: 'TemperaturePicker',
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
   * 沿逆时针方向偏移角度度数
   */
  offsetAngle: 180,
  /**
   * 色盘样子
   */
  gradientBg: [
    { offset: '0%', stopColor: '#FFCA5C', stopOpacity: 1 },
    { offset: '50%', stopColor: '#fff', stopOpacity: 1 },
    { offset: '100%', stopColor: '#CDECFE', stopOpacity: 1 },
  ] as LinearStop[],
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
   * 最小饱合度
   */
  min: 0,
  /**
   * 最大饱合度
   */
  max: 1000,

  /**
   * 步长
   */
  step: 1,

  /**
   * 边界的偏移量
   * 用于增加可调节到边界值难易度
   */
  sideOffset: 10,

  /**
   * 本地保存滑块位置的key
   */
  storageKey: 'temperature_picker',

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

  /**
   * 渲染thumb
   */
  renderThumb?: () => React.ReactNode;
} & DefaultProps;

interface Position {
  x: number;
  y: number;
}

interface IState {
  hideThumb: boolean;
  showThumbEnabled: boolean; // 是否可以显示滑块，用于获取原滑块位置后显示
}

export default class TemperaturePicker extends Component<IProps, IState> {
  static defaultProps: DefaultProps = defaultProps;

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

  getPercent(current: number, total: number) {
    return `${Math.round((current * 1000) / total) / 10}%`;
  }

  getDirection() {
    const { radius, offsetAngle } = this.props;
    const deg = (offsetAngle * Math.PI) / 180;
    const x1 = Math.cos(deg) * radius;
    const y1 = -Math.sin(deg) * radius;

    const x2 = Math.cos(deg + Math.PI) * radius;
    const y2 = -Math.sin(deg + Math.PI) * radius;

    return { x1, y1, x2, y2 };
  }

  getPercentDirection() {
    const { radius } = this.props;
    const size = radius * 2;
    const { x1, y1, x2, y2 } = this.getDirection();
    return {
      x1: this.getPercent(x1 + radius, size),
      y1: this.getPercent(y1 + radius, size),
      x2: this.getPercent(x2 + radius, size),
      y2: this.getPercent(y2 + radius, size),
    };
  }

  getBaseVector() {
    const { sideOffset } = this.props;
    // 获取基准向量
    const { x1, y1, x2, y2 } = this.getDirection();
    const origin = { x: x1, y: y1 };
    let baseVector = { x: x2 - x1, y: y2 - y1 };
    let total = Math.sqrt(baseVector.x ** 2 + baseVector.y ** 2);
    const normal = { x: baseVector.x / total, y: baseVector.y / total };
    if (sideOffset) {
      const offsetVector = { x: normal.x * sideOffset, y: normal.y * sideOffset };
      origin.x += offsetVector.x;
      origin.y += offsetVector.y;
      total -= sideOffset * 2;
      baseVector = { x: normal.x * total, y: normal.y * total };
    }

    return {
      ...baseVector,
      normalX: normal.x,
      normalY: normal.y,
      originX: origin.x,
      originY: origin.y,
      length: total,
    };
  }

  private locked = false;
  private _panResponder: PanResponderInstance;
  private temperature: number;
  private coor: Position = { x: 0, y: 0 };
  private thumbRef: View;
  private tempValue: number;
  private maxSize = 100;

  initData(props: IProps, needUpdate = true) {
    const { radius, thumbRadius, value, storageKey } = props;
    this.maxSize = radius * 2 + thumbRadius * 2;
    let newNeedUpdate = needUpdate;
    if (!newNeedUpdate) {
      newNeedUpdate = this.props.value !== value;
    }
    if (newNeedUpdate) {
      this.temperature = value;
      storageUtils.getDevItem(storageKey).then(data => {
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
    const { min, max, radius, innerRadius, offsetAngle } = this.props;
    // 获取基准向量
    const baseVector = this.getBaseVector();

    // 值对应的长度
    const length = ((value - min) * baseVector.length) / (max - min);
    // 值对的向量
    const valueVector = { x: length * baseVector.normalX, y: length * baseVector.normalY };
    // 值的坐标到圆心的距离
    const lengthByCenter = Math.sqrt(
      (baseVector.originX + valueVector.x) ** 2 + (baseVector.originY + valueVector.y) ** 2
    );
    let thumbPoisionRadius = (radius + innerRadius) / 2;
    let deg = 0;
    // 边界条件
    if (innerRadius === 0) {
      thumbPoisionRadius = lengthByCenter;
    } else {
      const degree = Math.acos(lengthByCenter / Math.max(lengthByCenter, thumbPoisionRadius));
      if (degree === 0) {
        thumbPoisionRadius = lengthByCenter;
      }
    }
    if (length > baseVector.length / 2) {
      deg = Math.PI - deg;
    }
    deg += (offsetAngle * Math.PI) / 180;

    if (touchPoint) {
      const l = Math.sqrt(touchPoint.x ** 2 + touchPoint.y ** 2);
      let angle = Math.acos(touchPoint.x / l);
      if (touchPoint.y > 0) {
        angle = fullDeg - angle;
      }
      deg = angle;
      thumbPoisionRadius = Math.min(radius, Math.max(innerRadius, l));
    }
    const x = Math.cos(deg) * thumbPoisionRadius;
    const y = -Math.sin(deg) * thumbPoisionRadius;
    return { x, y };
  }

  coorToValue(x: number, y: number) {
    const { min, max, step, radius } = this.props;
    // 获取基准向量
    const baseVector = this.getBaseVector();
    const length = Math.sqrt(x ** 2 + y ** 2);
    let newX = x;
    let newY = y;
    if (length > radius) {
      let angle = Math.acos(x / length);
      if (y > 0) {
        angle = fullDeg - angle;
      }

      newX = Math.cos(angle) * radius;
      newY = -Math.sin(angle) * radius;
    }

    const vector1 = { x: newX - baseVector.originX, y: newY - baseVector.originY };
    const diff = (vector1.x * baseVector.x + vector1.y * baseVector.y) / baseVector.length;
    let temperature = (diff / baseVector.length) * (max - min) + min;
    temperature = Math.min(max, Math.max(min, temperature));
    if (step) {
      temperature = Math.round((temperature - min) / step) * step + min;
    }
    return temperature;
  }

  valueToColor(value: number) {
    const { min, max } = this.props;
    const temp = ((value - min) * 1000) / (max - min);
    return ColorUtils.brightKelvin2rgba(1000, temp);
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

  handleMoveThumb(dx: number, dy: number, listener: (param: number) => void) {
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
    storageUtils.setDevItem(this.props.storageKey, { temperature: this.temperature, ...this.coor });
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
      gradientBg,
      thumbStyle,
      renderThumb,
      ...rest
    } = this.props;
    const { hideThumb, showThumbEnabled } = this.state;
    const size = radius * 2;
    const ringWidth = radius - innerRadius;
    const thumbSize = thumbRadius * 2;
    const { coor } = this;
    const { maxSize } = this;

    const path = `M0 ${radius}A${radius} ${radius} 0 1 0 ${size} ${radius}A${radius} ${radius} 0 1 0 0 ${radius}Z
    M${ringWidth} ${radius}A${innerRadius} ${innerRadius} 0 1 1 ${
      size - ringWidth
    } ${radius}A${innerRadius} ${innerRadius} 0 1 1 ${ringWidth} ${radius}Z`;
    // studio 中 RadialGradien 更新无效，这里使用动态id做兼容
    const gradientId = `temperaturePicker_${size}${ringWidth}`;

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
            <View
              style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}
            >
              <Svg width={size} height={size}>
                <Defs>
                  <LinearGradient id={gradientId} {...this.getPercentDirection()}>
                    {gradientBg.map((item, index) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <Stop key={index} {...item} />
                    ))}
                  </LinearGradient>
                </Defs>
                <Path d={path} fill={`url(#${gradientId})`} />
              </Svg>
            </View>
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
            >
              {!!renderThumb && renderThumb()}
            </View>
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
