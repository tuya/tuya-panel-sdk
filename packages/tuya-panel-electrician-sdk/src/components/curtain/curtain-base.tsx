/* eslint-disable no-return-assign */
import React, { Component } from 'react';
import _get from 'lodash/get';
import { View, Animated, StyleSheet, Image, Easing, StyleProp } from 'react-native';
import {
  getOptionsByType,
  getCurtainGestureByType,
  createCurtainPanResponder,
  parseImageSource,
} from './utils';
import { IGesture, IProps, IState, ControlType } from './index.type';
import StatusDisplay from './status-display';
import ArrowGroup from './arrow-group';

export default class CurtainGesture extends Component<IProps, IState> {
  static defaultProps = {
    curtainType: 'trietex',
    styleType: 'zoosemy',
    min: 0,
    max: 100,
    value: 0,
  };

  constructor(props) {
    super(props);
    const { value } = props;
    this.state = {
      curtainCeilAnimate: new Animated.Value(value),
      circleAnimate: new Animated.Value(value),
    };
    this.moveVal = value;
    this.newValue = value;
    this.statusDisplayRef = null;
    this._curDeltaX = this.calcDeltaX(props.value, this._curDeltaX);
    this._cirDeltaX = this.calcDeltaX(props.value, this._cirDeltaX);
  }

  componentDidMount() {
    this.state.curtainCeilAnimate.addListener(({ value }) => {
      this.statusDisplayRef && this.statusDisplayRef.setAccVal(value);
    });
  }

  onValueChangeFromProps = value => {
    this.startAnimation(value);
    this.startCircleAnimation(value);
    this.statusDisplayRef && this.statusDisplayRef.setAccVal(value);
  };

  onMovingToTargetValue = value => {
    this._curDeltaX = this.calcDeltaX(value, this._curDeltaX);
    this._cirDeltaX = this.calcDeltaX(value, this._cirDeltaX);
    this.moveVal = value;
    this.startAnimation(value);
    this.startCircleAnimation(value);
  };

  onControlTypeChange = (control: ControlType) => {
    const { min, max } = this.props;
    switch (control) {
      case 'open':
      case 'close':
        this.startAnimation(control === 'close' ? max : min);
        this.startCircleAnimation(control === 'close' ? max : min);
        this.statusDisplayRef && this.statusDisplayRef.setGestureStatus(false);
        break;
      default:
        this.state.curtainCeilAnimate.stopAnimation();
        this.state.circleAnimate.stopAnimation();
        this.statusDisplayRef && this.statusDisplayRef.setMovingStatus('stop');
        break;
    }
  };

  get Gesture(): IGesture {
    const { curtainType } = this.props;
    const [curtainCeil, circle] = getCurtainGestureByType(curtainType);
    const Gesture = {};
    curtainCeil.forEach((curtainGesture, index) => {
      const isLeft = index === 0;
      Gesture[curtainGesture] = createCurtainPanResponder({
        grant: () => {},
        move: (e, gesture) => this.handleResponderMove(e, gesture, 'ceil', isLeft),
        release: (e, gesture) => this.handleResponderRelease(e, gesture, 'ceil', isLeft),
      });
    });
    circle.forEach((circleGesture, index) => {
      const isLeft = index === 0;
      Gesture[circleGesture] = createCurtainPanResponder({
        grant: () => {},
        move: (e, gesture) => this.handleResponderMove(e, gesture, 'circle', isLeft),
        release: (e, gesture) => this.handleResponderRelease(e, gesture, 'circle', isLeft),
      });
    });
    return Gesture;
  }

  get options() {
    const { curtainType, styleType, min, max } = this.props;
    return getOptionsByType(curtainType, styleType, { min, max });
  }

  getValueDiffToAbsPercent = (val, diff): number => Math.abs(val - diff) / 100;

  getDurationPercent = (v, next) => {
    const { totalTime, min, max } = this.props;
    const durationTime = totalTime || 5000;
    const percent = Math.abs(v - next) / (max - min);
    if (percent === 0) return durationTime;
    return percent * durationTime;
  };

  moveVal: number;
  _curDeltaX?: number;
  _cirDeltaX?: number;
  newValue: number;
  statusDisplayRef: any;

  calcDeltaX = (value: number, defaultValue: number) => {
    const { min, max } = this.props;
    if (value < min || value > max) {
      return defaultValue;
    }
    const deltaX = (value / (max - min)) * (this.options.curtainWidth / 2);
    return deltaX;
  };

  handleResponderMove = (__, gestureState, type = 'circle', isLeft) => {
    const { disabled, curtainType } = this.props;
    const { dx, dy } = gestureState;
    const val = curtainType === 'roller' ? dy : dx;
    if (disabled || val === 0) {
      return;
    }
    if (type === 'ceil') {
      this._moveTo(val, isLeft ? 0 : 1);
    } else {
      this._circleMoveTo(val, isLeft ? 0 : 1, 'move');
    }
  };

  handleResponderRelease = (__, gestureState, type, isLeft) => {
    const { disabled, curtainType } = this.props;
    const { dx, dy } = gestureState;
    const val = curtainType === 'roller' ? dy : dx;
    if (disabled || val === 0) {
      return;
    }
    if (type === 'ceil') {
      this._moveTo(val, isLeft ? 0 : 1, 'release');
    } else {
      this._circleMoveTo(val, isLeft ? 0 : 1, 'release');
    }
    this._cirDeltaX = this.calcDeltaX(this.newValue, this._cirDeltaX);
  };

  _moveTo = (dx, type, action?) => {
    const { min, max, onSlideTo } = this.props;
    const RAIL_WIDTH = this.options.curtainWidth;
    let value = type
      ? ((this._curDeltaX - dx) / (RAIL_WIDTH / 2)) * (max - min)
      : ((this._curDeltaX + dx) / (RAIL_WIDTH / 2)) * (max - min);
    if (value < min) {
      value = min;
    } else if (value > max) {
      value = max;
    }

    this.moveVal = Math.round(value);
    this.newValue = value;
    this.startAnimation(value);
    this.startCircleAnimation(value);
    action === 'release' && onSlideTo && onSlideTo(value);
  };

  _circleMoveTo(dx, type, action) {
    const { min, max, onSlideTo } = this.props;
    const RAIL_WIDTH = this.options.curtainWidth;
    let value = type
      ? ((this._cirDeltaX - dx) / (RAIL_WIDTH / 2)) * (max - min)
      : ((this._cirDeltaX + dx) / (RAIL_WIDTH / 2)) * (max - min);

    if (value < min) {
      value = min;
    } else if (value > max) {
      value = max;
    }
    this.moveVal = Math.round(value);
    this.newValue = value;
    if (value) {
      this.state.circleAnimate.setValue(value);
    }
    switch (action) {
      case 'move':
        this.statusDisplayRef && this.statusDisplayRef.setGestureTargetVal(value);
        break;
      case 'release':
        this.startAnimation(value);
        onSlideTo && onSlideTo(value);
        break;
      default:
        break;
    }
  }

  startAnimation = v => {
    const accAnimateVal = _get(this.state.curtainCeilAnimate, '_value');
    const curtainDuration = this.getDurationPercent(v, accAnimateVal);
    this.statusDisplayRef &&
      this.statusDisplayRef.setMovingStatus(v > accAnimateVal ? 'closing' : 'opening');
    Animated.timing(this.state.curtainCeilAnimate, {
      toValue: v,
      duration: curtainDuration,
      easing: Easing.inOut(Easing.ease),
    }).start(({ finished }) => {
      finished && this.statusDisplayRef && this.statusDisplayRef.setMovingStatus('stop');
    });
  };

  startCircleAnimation = v => {
    const circleDuration = this.getDurationPercent(v, _get(this.state.circleAnimate, '_value'));
    Animated.timing(this.state.circleAnimate, {
      toValue: v,
      duration: circleDuration,
      easing: Easing.inOut(Easing.ease),
    }).start(() => {
      this.moveVal = Math.round(_get(this.state.circleAnimate, '_value'));
    });
  };

  renderCurtainView = () => {
    const {
      curtainType,
      styleType,
      curtainBgColor,
      curtainCeilImage,
      curtainHeight,
      curtainWidth,
    } = this.props;
    const {
      curtainImg,
      curtain,
      curtainInterpolate,
      getCurtainInterpolate,
      curtainWrap,
    } = this.options;
    const curtainSizeType = curtainType === 'roller' ? 'height' : 'width';
    const CurtainElement = styleType === 'flat' ? Animated.View : Animated.Image;
    const curtainCeilOption =
      styleType === 'flat'
        ? {}
        : {
            source: parseImageSource(curtainCeilImage || curtainImg),
          };
    const size = {
      height: curtainHeight,
      width: curtainWidth,
    };
    const usePropsSize = curtainHeight && curtainWidth;
    return (
      <View style={curtainWrap}>
        <CurtainElement
          {...curtainCeilOption}
          style={[
            curtain,
            usePropsSize && size,
            styleType === 'flat' && curtainBgColor && { backgroundColor: curtainBgColor },
            curtainType !== 'roller' && { left: 0 },
            styleType === 'flat'
              ? getCurtainInterpolate(this.state.curtainCeilAnimate)
              : {
                  [curtainSizeType]: this.state.curtainCeilAnimate.interpolate(curtainInterpolate),
                },
          ]}
          {...this.Gesture.leftCurtain.panHandlers}
        />
        {curtainType === 'trietex' && (
          <CurtainElement
            {...this.Gesture.rightCurtain.panHandlers}
            {...curtainCeilOption}
            style={[
              curtain,
              usePropsSize && size,
              styleType === 'flat' && curtainBgColor && { backgroundColor: curtainBgColor },
              {
                transform: [
                  {
                    rotateY: '180deg',
                  },
                ],
                right: 0,
              },
              styleType === 'flat'
                ? getCurtainInterpolate(this.state.curtainCeilAnimate)
                : {
                    width: this.state.curtainCeilAnimate.interpolate(curtainInterpolate),
                  },
            ]}
          />
        )}
      </View>
    );
  };

  renderCircleView = () => {
    const { curtainType, buttonColor } = this.props;
    const {
      circle,
      curtainWidth,
      circleLeftInterpolate,
      circleRightInterpolate,
      circleType,
      shouldCircleFlip,
    } = this.options;
    return (
      <View
        style={{
          width: curtainWidth,
          height: 24,
          position: 'absolute',
          top: 0,
          alignItems: 'center',
        }}
      >
        <Animated.View
          {...this.Gesture.leftCircle.panHandlers}
          style={[
            circle,
            curtainType !== 'roller' && { left: 0 },
            circleType !== 'arrow' && buttonColor && { backgroundColor: buttonColor },
            {
              transform: [
                curtainType === 'roller'
                  ? {
                      translateY: this.state.circleAnimate.interpolate(circleLeftInterpolate),
                    }
                  : {
                      translateX: this.state.circleAnimate.interpolate(circleLeftInterpolate),
                    },
              ],
            },
          ]}
        >
          {circleType === 'arrow' && <ArrowGroup color={buttonColor} flip={shouldCircleFlip} />}
        </Animated.View>
        {curtainType === 'trietex' && circleRightInterpolate && (
          <Animated.View
            {...this.Gesture.rightCircle.panHandlers}
            style={[
              circle,
              circleType !== 'arrow' && buttonColor && { backgroundColor: buttonColor },
              {
                right: 0,
                transform: [
                  {
                    translateX: this.state.circleAnimate.interpolate(circleRightInterpolate),
                  },
                ],
              },
            ]}
          >
            {circleType === 'arrow' && <ArrowGroup />}
          </Animated.View>
        )}
      </View>
    );
  };

  render() {
    const {
      min,
      max,
      styleType,
      style,
      curtainBgColor,
      curtainBgImage,
      curtainBgHeight,
      curtainBgWidth,
      textColor,
      openingText,
      closingText,
    } = this.props;
    const { container, bgImg, bg, topContainerStyle } = this.options;
    return (
      <View style={style}>
        <StatusDisplay
          ref={ref => (this.statusDisplayRef = ref)}
          min={min}
          max={max}
          value={this.props.value}
          textColor={textColor}
          openingText={openingText}
          closingText={closingText}
        />
        {styleType === 'flat' && (
          <View
            style={[topContainerStyle, curtainBgColor && { backgroundColor: curtainBgColor }]}
          />
        )}
        <View style={[styles.container, container]}>
          {styleType !== 'flat' && (
            <Image
              source={parseImageSource(curtainBgImage || bgImg)}
              style={[
                bg,
                curtainBgHeight &&
                  curtainBgWidth && {
                    height: curtainBgHeight,
                    width: curtainBgWidth,
                  },
              ]}
            />
          )}
          {this.renderCurtainView()}
          {this.renderCircleView()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create<StyleProp<any>>({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
