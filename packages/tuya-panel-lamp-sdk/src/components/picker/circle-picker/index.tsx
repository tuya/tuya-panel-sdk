/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import { Svg, Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import {
  View,
  PanResponderInstance,
  GestureResponderEvent,
  PanResponderGestureState,
  StyleSheet,
  PanResponder,
  StyleProp,
  ViewStyle,
  Animated,
} from 'react-native';
import { Utils } from 'tuya-panel-kit';

const { convertX: cx } = Utils.RatioUtils;

/**
 * 色温选择器
 */

const defaultProps = {
  /**
   * 当前值
   */
  value: 0,
  /**
   * 最小色温值
   */
  min: 0,
  /**
   * 最大色温值
   */
  max: 1000,
  /**
   * 值可取范围的最小值， 需要大于等于min，不设值以min为准
   */
  minRangeValue: 0,
  /**
   * 值可取范围的最大值， 需要小于等于max，不设值以max为准
   */
  maxRangeValue: 1000,
  /**
   * 滑块大小
   */
  thumbSize: cx(28),
  /**
   * 滑块点击区大小
   */
  touchThumbSize: cx(40),
  /**
   * 缺少的角度， 以Y轴正方向为零度
   */
  offsetAngle: 45,
  /**
   * 内半径
   */
  innerRadius: cx(88),
  /**
   * 外半径
   */
  outerRadius: cx(120),
  /**
   * 色盘样子
   */
  stopColors: [
    {
      offset: '0%',
      stopColor: '#FEECAB',
      stopOpacity: 1,
    },
    {
      offset: '100%',
      stopColor: '#C0E8FF',
      stopOpacity: 1,
    },
  ],
  /**
   * 是否禁用
   */
  disabled: false,
  /**
   * 是否展示滑块
   */
  showThumb: true,
  /**
   * 滑动开始事件
   */
  onGrant(value: number) {},
  /**
   * 滑动过程事件
   */
  onMove(value: number) {},
  /**
   * 滑动结束事件
   */
  onRelease(value: number) {},
  /**
   * 组件wrapper 样式
   */
  wrapperStyle: null,
  /**
   * 滑块样式
   */
  thumbStyle: null,
  /**
   * 自定义滑块
   */
  renderThumb: null,
  /**
   * 自定义轨道
   */
  renderTrack: null,
  /**
   * 背景透明度动画值
   */
  opacityAnimationValue: 1,
  /**
   * 背景透明度动画时间
   */
  opacityAnimationDuration: 150,
};

type DefaultProps = Readonly<typeof defaultProps>;

type IProps = {
  /**
   * 组件样式
   */
  wrapperStyle?: StyleProp<ViewStyle>;
  /**
   * 滑块样式
   */
  thumbStyle?: StyleProp<ViewStyle>;
  /**
   * 渲染thumb
   */
  renderThumb?: () => React.ReactNode;
  /**
   * 渲染自定义轨道
   */
  renderTrack?: () => React.ReactNode;
} & DefaultProps;

export default class CirclePicker extends React.Component<IProps> {
  static defaultProps: DefaultProps = defaultProps;

  constructor(props: IProps) {
    super(props);
    this.dragEnable = false;
    this.initData(this.props);
    this.initRangeValue(this.props);
    this.handleValue(this.getRightValue(this.props));
    this.bgOpacityAnim = new Animated.Value(this.props.opacityAnimationValue);
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this.handleSetPanResponder,
      onMoveShouldSetPanResponder: () => !this.props.disabled && this.dragEnable,
      onPanResponderGrant: this.onGrant,
      onPanResponderMove: this.onMove,
      onPanResponderRelease: this.onRelease,
    });
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(nextProps: IProps) {
    const {
      offsetAngle: newOffsetAngle,
      innerRadius: newInnerRadius,
      outerRadius: newOuterRadius,
      min: newMin,
      max: newMax,
      minRangeValue: newMinRangeValue,
      maxRangeValue: newMaxRangeValue,
      thumbSize: newThumbSize,
    } = nextProps;
    const {
      offsetAngle,
      innerRadius,
      outerRadius,
      min,
      max,
      minRangeValue,
      maxRangeValue,
      thumbSize,
      opacityAnimationValue,
    } = this.props;

    if (
      offsetAngle !== newOffsetAngle ||
      innerRadius !== newInnerRadius ||
      outerRadius !== newOuterRadius ||
      newThumbSize !== thumbSize
    ) {
      this.initData(nextProps);
    }
    if (
      min !== newMin ||
      max !== newMax ||
      minRangeValue !== newMinRangeValue ||
      maxRangeValue !== newMaxRangeValue
    ) {
      this.initRangeValue(nextProps);
    }

    this.handleValue(this.getRightValue(nextProps));

    if (opacityAnimationValue !== nextProps.opacityAnimationValue) {
      Animated.timing(this.bgOpacityAnim, {
        toValue: nextProps.opacityAnimationValue,
        duration: nextProps.opacityAnimationDuration,
        useNativeDriver: true,
      }).start();
    }
  }

  shouldComponentUpdate() {
    return !this.dragEnable;
  }

  onGrant = () => {
    this.props.onGrant(this.getRightValue(this.props));
  };

  onMove = (e: GestureResponderEvent, gesture: PanResponderGestureState) => {
    this.handleValueChange(gesture, this.props.onMove);
  };

  onRelease = (e: GestureResponderEvent, gesture: PanResponderGestureState) => {
    this.dragEnable = false;
    const { x, y } = this.handleValueChange(gesture, this.props.onRelease);
    this.thumbX = x;
    this.thumbY = y;
  };

  getPoint(deg: number, radius: number) {
    return {
      x: -radius * Math.sin(deg) + this.centerX,
      y: radius * Math.cos(deg) + this.centerY,
    };
  }

  getPath(start: number, end: number) {
    const { innerRadius, outerRadius } = this.props;
    const pathRadius = (outerRadius - innerRadius) / 2;

    const { x: x1, y: y1 } = this.getPoint(start, innerRadius);
    const { x: x2, y: y2 } = this.getPoint(start, outerRadius);
    const { x: x3, y: y3 } = this.getPoint(end, outerRadius);
    const { x: x4, y: y4 } = this.getPoint(end, innerRadius);

    let isLargeCircle = 0;
    if (end - start > Math.PI) {
      isLargeCircle = 1;
    }
    return `M${x1} ${y1} A${pathRadius} ${pathRadius} 0 0 1 ${x2} ${y2} A${outerRadius} ${outerRadius} 0 ${isLargeCircle} 1 ${x3} ${y3} A${pathRadius} ${pathRadius} 0 0 1 ${x4} ${y4} A${innerRadius} ${innerRadius} 0 ${isLargeCircle} 0 ${x1} ${y1} Z`;
  }

  getRightValue(props: IProps) {
    const { value, min, max, minRangeValue, maxRangeValue } = props;
    let newValue = value;
    if (maxRangeValue !== -1) {
      newValue = Math.min(value, max, maxRangeValue);
    } else {
      newValue = Math.min(value, max);
    }
    return Math.max(newValue, min, minRangeValue);
  }

  private dragEnable: boolean;
  private _panResponder: PanResponderInstance;
  private thumbX: number;
  private thumbY: number;
  private centerX: number;
  private centerY: number;
  private minRangeDeg: number;
  private maxRangeDeg: number;
  private offsetAngle: number;
  private startDeg: number;
  private endDeg: number;
  private ringWidth: number;
  private thumbDistance: number;
  private width: number;
  private height: number;
  private thumbRef: View;
  private bgOpacityAnim: Animated.Value = new Animated.Value(1);

  handleSetPanResponder = (e: GestureResponderEvent) => {
    if (this.props.disabled) {
      return false;
    }
    const { locationX, locationY } = e.nativeEvent;
    // 是否在可点击范围内
    const { touchThumbSize, innerRadius, outerRadius } = this.props;
    const { thumbX, thumbY, centerX, centerY, minRangeDeg, maxRangeDeg } = this;
    // 点是否在thumb内
    const length = Math.sqrt((locationX - thumbX) ** 2 + (locationY - thumbY) ** 2);
    if (length * 2 < touchThumbSize) {
      this.dragEnable = true;
      return true;
    }
    const len = Math.sqrt((locationX - centerX) ** 2 + (locationY - centerY) ** 2);
    if (len >= innerRadius && len <= outerRadius) {
      this.thumbX = (locationX - centerX) / 2;
      let angle = this.coorToAngle(locationX, locationY);
      // 是否点击在环里
      if (angle <= minRangeDeg - this.offsetAngle || angle >= maxRangeDeg + this.offsetAngle) {
        return false;
      }
      if (angle < minRangeDeg) {
        angle = minRangeDeg;
      } else if (angle > maxRangeDeg) {
        angle = maxRangeDeg;
      }
      const newValue = this.degToValue(angle);
      const { x, y } = this.updateThumbPosition(newValue);
      this.thumbX = x;
      this.thumbY = y;
      this.dragEnable = true;
      return true;
    }
    return false;
  };

  coorToAngle(x: number, y: number) {
    const { centerX, centerY } = this;

    const length = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);

    let angle = Math.acos((y - centerY) / length);
    if (x > centerX) {
      angle = Math.PI * 2 - angle;
    }
    return angle;
  }

  handleValueChange = ({ dx, dy }: PanResponderGestureState, cb: (value: number) => void) => {
    const { thumbX, thumbY, minRangeDeg, maxRangeDeg } = this;
    const x = thumbX + dx;
    const y = thumbY + dy;
    let angle = this.coorToAngle(x, y);
    if (angle < minRangeDeg) {
      angle = minRangeDeg;
    } else if (angle > maxRangeDeg) {
      angle = maxRangeDeg;
    }
    const newValue = this.degToValue(angle);
    const thumbCoor = this.updateThumbPosition(newValue);
    cb && cb(newValue);
    return thumbCoor;
  };

  initData(props: IProps) {
    if (this.dragEnable) {
      return;
    }
    const { offsetAngle, innerRadius, outerRadius, thumbSize } = props;
    this.startDeg = this.toDeg(offsetAngle);
    this.endDeg = this.toDeg(360 - offsetAngle);
    this.ringWidth = outerRadius - innerRadius;
    let height = outerRadius + outerRadius * Math.cos(this.startDeg);
    if (offsetAngle <= 90) {
      this.width = outerRadius * 2;
      height += this.ringWidth / 2;
    } else {
      const halfWidth = outerRadius * Math.sin(this.startDeg) + this.ringWidth / 2;
      this.width = halfWidth * 2;
      height += this.ringWidth;
    }
    this.height = height;
    this.centerX = this.width / 2;
    this.centerY = outerRadius;
    if (this.ringWidth < thumbSize) {
      const diff = thumbSize - this.ringWidth;
      this.width += diff;
      this.height += diff;
      this.centerX += diff / 2;
      this.centerY += diff / 2;
    }
    this.thumbDistance = (innerRadius + outerRadius) / 2;
    this.offsetAngle = Math.atan(this.ringWidth / 2 / this.thumbDistance);
  }

  initRangeValue(props: IProps) {
    if (this.dragEnable) {
      return;
    }
    const { min, max, minRangeValue, maxRangeValue, offsetAngle } = props;
    const angleLength = 360 - offsetAngle * 2;
    const minRange = Math.max(min, minRangeValue);
    const maxRange = maxRangeValue !== -1 ? Math.min(max, maxRangeValue) : max;
    this.minRangeDeg = this.startDeg + this.toDeg((angleLength * (minRange - min)) / (max - min));
    this.maxRangeDeg = this.startDeg + this.toDeg((angleLength * (maxRange - min)) / (max - min));
  }

  handleValue(value: number) {
    if (this.dragEnable) {
      return;
    }
    const deg = this.valueToDeg(value);
    const { x, y } = this.getPoint(deg, this.thumbDistance);

    this.thumbX = x;
    this.thumbY = y;
  }

  toDeg(rad: number) {
    return (rad * Math.PI) / 180;
  }

  valueToDeg(value: number) {
    const { startDeg, endDeg } = this;
    const { min, max } = this.props;

    return startDeg + ((endDeg - startDeg) * (value - min)) / (max - min);
  }

  degToValue(deg: number) {
    const { startDeg, endDeg } = this;
    const { min, max } = this.props;

    return Math.round(min + ((deg - startDeg) * (max - min)) / (endDeg - startDeg));
  }

  updateThumbPosition(value: number) {
    const deg = this.valueToDeg(value);
    const { x, y } = this.getPoint(deg, this.thumbDistance);
    this.thumbRef &&
      this.thumbRef.setNativeProps({
        style: {
          transform: [{ translateX: x }, { translateY: y }],
        },
      });

    return { x, y };
  }

  render() {
    const {
      wrapperStyle,
      thumbSize,
      thumbStyle,
      stopColors,
      disabled,
      showThumb,
      renderThumb,
      renderTrack,
    } = this.props;
    const { startDeg, endDeg, width, height, thumbX, thumbY } = this;
    return (
      <View style={[styles.box, wrapperStyle]}>
        <Animated.View
          style={{
            opacity: this.bgOpacityAnim,
          }}
        >
          {typeof renderTrack === 'function' ? (
            renderTrack()
          ) : (
            <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
              <Defs>
                <LinearGradient id="linear" x1="0%" x2="100%" y1="0%" y2="0%">
                  {stopColors.map((item, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <Stop key={index} {...item} />
                  ))}
                </LinearGradient>
              </Defs>
              <Path d={this.getPath(startDeg, endDeg)} fill="url(#linear)" />
            </Svg>
          )}
        </Animated.View>

        {showThumb && (
          <View
            ref={ref => {
              this.thumbRef = ref;
            }}
            style={[
              styles.thumb,
              {
                left: -thumbSize / 2,
                top: -thumbSize / 2,
                width: thumbSize,
                height: thumbSize,
                borderRadius: thumbSize / 2,
                opacity: disabled ? 0.2 : 1,
              },
              thumbStyle,
              {
                transform: [{ translateX: thumbX }, { translateY: thumbY }],
              },
            ]}
          >
            {renderThumb && renderThumb()}
          </View>
        )}
        <View {...this._panResponder.panHandlers} style={[styles.eventPanel, { width, height }]} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    alignSelf: 'center',
  },
  eventPanel: {
    left: 0,
    position: 'absolute',
    top: 0,
    zIndex: 1,
  },
  thumb: {
    backgroundColor: '#fff',
    position: 'absolute',
  },
});
