/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import {
  View,
  PanResponder,
  GestureResponderEvent,
  LayoutChangeEvent,
  PanResponderGestureState,
  PanResponderInstance,
} from 'react-native';
import _ from 'lodash';
import { Svg, Rect, Defs, LinearGradient, Stop } from 'react-native-svg';
import Thumb from './Thumb';
import Res from '../../../res';

export interface Point {
  x: number;
  y: number;
}

/**
 * thumb 的有效区域
 */
export interface ValidBound {
  width: number;
  height: number;
  x: number;
  y: number;
}

export interface ILinearColors {
  offset: string;
  stopColor: string;
  stopOpacity: number;
}

export interface ILinear {
  x1?: string | number;
  x2?: string | number;
  y1?: string | number;
  y2?: string | number;
  colors: ILinearColors[];
}

export const defaultProps = {
  bgs: [] as ILinear[],
  thumbComponent: Thumb,
  disabled: false,
  thumbSize: 38,
  touchThumbSize: 60,
  showThumbWhenDisabled: true,
  clickEnabled: true, // 是否可以点击选择
  lossShow: false, // 数据未在设备生效处理，若为true，则loassColor 启效，并thumb及亮度调节会变成指定颜色
  lossColor: 'rgba(0,0,0,0.2)',
  // eslint-disable-next-line import/no-unresolved
  thumbImg: Res.thumbMask,
  onGrant(v: any) {},
  onMove(v: any) {},
  onRelease(v: any) {},
  onPress(v: any) {},
};

type DefaultProps = Readonly<typeof defaultProps>;

interface IProps extends DefaultProps {
  value: any;
  style?: any;
  coorToValue: (coor: Point, validBound: ValidBound) => any;
  valueToCoor: (value: any, originCoor?: Point, validBound?: ValidBound) => Point;
  valueToColor: (value: any) => string;
  initData: (validBound?: ValidBound) => void;
}

interface IState {
  value: any;
}

let idIndex = 0;

export default class RectPicker extends Component<IProps, IState> {
  static defaultProps = defaultProps;

  constructor(props: IProps) {
    super(props);
    this.state = { value: this.props.value };

    // rn的坑，需要在此赋值才有效果
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this.handleSetResponder,
      onPanResponderTerminationRequest: () => !this.locked,
      onPanResponderGrant: this.handleGrant,
      onPanResponderMove: this.handleMove,
      onPanResponderRelease: this.handleRelease,
    });
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(nextProps: IProps) {
    if (!_.isEqual(nextProps.value, this.props.value)) {
      this.setState({ value: nextProps.value });
      const position = this.valueToCoor(nextProps.value);
      const color = this.valueToColor(nextProps.value);
      this.updateThumbPosition(position, color, true);
    }
    if (nextProps.lossShow !== this.props.lossShow) {
      const color = this.valueToColor(nextProps.value);
      this.updateThumbPosition(
        this.thumbPosition,
        nextProps.lossShow ? nextProps.lossColor : color,
        true
      );
    }
    if (nextProps.thumbSize !== this.props.thumbSize) {
      this.handleViewBoxChange(nextProps.thumbSize);
    }
  }

  shouldComponentUpdate() {
    return !this.locked;
  }

  private _panResponder: PanResponderInstance;
  private thumbPosition: Point = { x: 0, y: 0 };
  private color = 'red';
  private showPicker = false;
  private pickerWidth = 200;
  private pickerHeight = 200;
  private validBound: ValidBound = { x: 0, y: 0, width: 0, height: 0 };
  private locked = false; // 是否锁定组件，锁定后，组件接受react正常更新
  private thumbRef: Thumb;
  private isThumbFocus = false;
  private grantTime = 0;
  private linearGradientId = `rectPicker_${idIndex++}`;

  coorToValue(point: Point) {
    const { coorToValue } = this.props;
    if (typeof coorToValue === 'function') {
      return coorToValue(point, this.validBound);
    }
    return point;
  }

  valueToCoor(value: any, originCoor?: Point): Point {
    const { valueToCoor } = this.props;

    // 是否有显示区, 无显示区直接返回原点坐标
    const { width, height } = this.validBound;
    if (width === 0 || height === 0) {
      return { x: 0, y: 0 };
    }
    if (typeof valueToCoor === 'function') {
      return valueToCoor(value, originCoor, this.validBound);
    }
    return originCoor || { x: 0, y: 0 };
  }

  valueToColor(value: any): string {
    const { valueToColor } = this.props;
    if (typeof valueToColor === 'function') {
      return valueToColor(value);
    }
    return 'transparent';
  }

  firPropsEvent(cb: (params?: any) => void, ...args: any[]) {
    cb && cb(...args);
  }

  handleSetResponder = (e: GestureResponderEvent) => {
    if (this.props.disabled) {
      return false;
    }
    // 是否点中标记
    const { locationX, locationY } = e.nativeEvent;
    const { thumbSize, touchThumbSize, clickEnabled } = this.props;
    let validRadius = thumbSize / 2;
    if (touchThumbSize) {
      validRadius = touchThumbSize / 2;
    }
    const { x, y } = this.thumbPosition;
    const length = Math.sqrt((locationX - x) ** 2 + (locationY - y) ** 2);
    if (length <= validRadius) {
      this.isThumbFocus = true;
      return true;
    }
    this.isThumbFocus = false;
    this.grantTime = +new Date();
    return clickEnabled;
  };

  handleGrant = () => {
    if (this.isThumbFocus) {
      this.locked = true;
      this.firPropsEvent(this.props.onGrant, this.state.value);
    }
  };

  handleMove = (e: GestureResponderEvent, gesture: PanResponderGestureState) => {
    if (this.isThumbFocus) {
      const value = this.handleGestureMove(gesture);
      this.firPropsEvent(this.props.onMove, value);
    }
  };

  handleRelease = (e: GestureResponderEvent, gesture: PanResponderGestureState) => {
    if (this.isThumbFocus) {
      this.locked = false;
      const value = this.handleGestureMove(gesture, true);
      this.setState({ value });
      this.firPropsEvent(this.props.onRelease, value);
    } else if (this.props.clickEnabled) {
      // 点击选择颜色
      const now = +new Date();
      if (Math.abs(gesture.dx) < 4 && Math.abs(gesture.dy) < 4 && now - this.grantTime < 300) {
        // 点击位置
        const { locationX, locationY } = e.nativeEvent;
        const { x: newX, y: newY } = this.formatCoor(locationX, locationY);
        const value = this.coorToValue({ x: newX, y: newY });
        const coor = this.valueToCoor(value, { x: newX, y: newY });
        const color = this.valueToColor(value);
        this.updateThumbPosition(coor, color, true);

        this.firPropsEvent(this.props.onPress, value);
      }
    }
  };

  handleGestureMove(e: PanResponderGestureState, isEnd = false) {
    const { dx, dy } = e;
    const { x, y } = this.thumbPosition;
    // 边界处理
    const { x: newX, y: newY } = this.formatCoor(x + dx, y + dy);

    // 转为实际值，再转回成坐标
    const value = this.coorToValue({ x: newX, y: newY });
    const coor = this.valueToCoor(value, { x: newX, y: newY });
    const color = this.valueToColor(value);
    this.updateThumbPosition(coor, color, isEnd);
    return value;
  }

  formatCoor(x: number, y: number) {
    const {
      width: validWidth,
      height: validHeight,
      x: validStartX,
      y: validStartY,
    } = this.validBound;
    let newX = x;
    let newY = y;
    // 边界处理
    if (newX < validStartX) {
      newX = validStartX;
    } else if (newX > validWidth + validStartX) {
      newX = validWidth + validStartX;
    }
    if (newY < validStartY) {
      newY = validStartY;
    } else if (newY > validHeight + validStartY) {
      newY = validHeight + validStartY;
    }

    return { x: newX, y: newY };
  }

  updateThumbPosition(coor: Point, color: string, isEnd: boolean) {
    this.thumbRef && this.thumbRef.setNativeProps({ color, ...coor });
    if (isEnd) {
      this.color = color;
      this.thumbPosition = coor;
    }
  }

  handleViewBoxChange = async (thumbSize: number) => {
    this.validBound = {
      width: this.pickerWidth - thumbSize,
      height: this.pickerHeight - thumbSize,
      x: thumbSize / 2,
      y: thumbSize / 2,
    };
    await this.props.initData(this.validBound);
    this.thumbPosition = this.valueToCoor(this.props.value);
    this.forceUpdate();
  };

  handlePickerLayout = async (e: LayoutChangeEvent) => {
    const { thumbSize, lossColor, lossShow } = this.props;
    const { width, height } = e.nativeEvent.layout;
    if (width !== this.pickerWidth || height !== this.pickerHeight) {
      this.pickerWidth = width || 10; // svg 尺寸不能为0，此处确保值大于0
      this.pickerHeight = height || 10; // svg 尺寸不能为0，此处确保值大于0
      if (!this.showPicker) {
        this.showPicker = true;
        this.color = lossShow ? lossColor : this.valueToColor(this.props.value);
      }
      await this.handleViewBoxChange(thumbSize);
    }
  };

  render() {
    const { style, bgs, thumbComponent: ThumbView, disabled, thumbSize, thumbImg } = this.props;
    const { showPicker, pickerHeight, pickerWidth, thumbPosition } = this;
    return (
      <View
        style={[{ flex: 1 }, style]}
        {...this._panResponder.panHandlers}
        pointerEvents="box-only"
        onLayout={this.handlePickerLayout}
      >
        {showPicker && (
          <Svg
            height={pickerHeight}
            width={pickerWidth}
            viewBox={`0 0 ${pickerWidth} ${pickerHeight}`}
          >
            <Defs>
              {bgs.map(({ x1 = '0%', x2 = '100%', y1 = '0%', y2 = '0%', colors }, index) => (
                <LinearGradient
                  key={index}
                  id={`${this.linearGradientId}_${index}`}
                  x1={x1}
                  x2={x2}
                  y1={y1}
                  y2={y2}
                >
                  {colors.map((color, i) => (
                    <Stop key={i} {...color} />
                  ))}
                </LinearGradient>
              ))}
            </Defs>
            {bgs.map((bg, index) => (
              <Rect
                key={index}
                fill={`url(#${this.linearGradientId}_${index})`}
                x="0"
                y="0"
                width={pickerWidth}
                height={pickerHeight}
              />
            ))}
          </Svg>
        )}
        {/* render thumb */}
        {showPicker && (
          <ThumbView
            ref={(ref: Thumb) => {
              this.thumbRef = ref;
            }}
            {...thumbPosition}
            img={thumbImg}
            size={thumbSize}
            color={this.color}
            disabled={disabled}
          />
        )}
      </View>
    );
  }
}
