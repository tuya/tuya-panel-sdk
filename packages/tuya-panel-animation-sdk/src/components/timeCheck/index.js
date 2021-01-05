import _ from 'lodash';
import React, { Component } from 'react';
import P from 'prop-types';
import {
  View,
  Animated,
  TouchableOpacity,
  StyleSheet,
  ViewPropTypes as VP,
  ColorPropType as CP,
  Easing,
} from 'react-native';
import { TYText, Utils } from 'tuya-panel-kit';
import { Svg, Path } from 'react-native-svg';
import { createAnimation } from '../../utils';

const { convertX: cx } = Utils.RatioUtils;
const TimeCheckDA =
  'M512 292.571429a36.571429 36.571429 0 0 1 35.986286 29.988571l0.585143 6.582857v165.156572l125.074285 98.742857a36.571429 36.571429 0 0 1-39.789714 61.001143l-5.558857-3.657143-138.971429-109.714286a36.571429 36.571429 0 0 1-13.312-22.089143L475.428571 512V329.142857A36.571429 36.571429 0 0 1 512 292.571429z';
const TimeCheckDB =
  'M329.118408 0a36.568712 36.568712 0 0 1 36.568712 36.568712v219.412272a36.568712 36.568712 0 0 1-73.137424 0V132.671287l-20.478478 12.140813a565.791113 565.791113 0 0 0-9.215316 5.850994A441.311217 441.311217 0 0 0 137.498357 283.041831 438.824544 438.824544 0 1 0 511.961969 73.137424a36.568712 36.568712 0 0 1 0-73.137424 511.961969 511.961969 0 1 1-289.770475 89.885894c8.483941-5.485307 17.552982-11.043751 27.207122-16.74847H109.706136a36.568712 36.568712 0 0 1 0-73.137424h219.412272z';
const RightIconDA =
  'M387 817c-9.2 0-18.5-3.5-25.5-10.6-14-14.1-14-36.9 0.1-50.9l536.7-534.4c14.1-14 36.9-14 50.9 0.1s14 36.9-0.1 50.9L412.4 806.5c-7 7-16.2 10.5-25.4 10.5z';
const RightIconDB =
  'M386.6 817c-9.2 0-18.5-3.5-25.5-10.6L74.8 519c-14-14.1-14-36.9 0.1-50.9s36.9-14 50.9 0.1l286.3 287.5c14 14.1 14 36.9-0.1 50.9-7 6.9-16.2 10.4-25.4 10.4z';
const TIMECHECK_DEFAULT_ANIMATION_CONFIG = {
  easing: Easing.linear,
  duration: 400,
  delay: 0,
  isInteraction: true,
  useNativeDriver: true,
};
const timeCheckPropTypes = {
  /**
   *  开始校准标志
   */
  showTimeCheck: P.object.isRequired,
  /**
   *  校准开始时触发
   */
  startTimeCheck: P.func,
  /**
   *  校准结束时触发
   */
  endTimeCheck: P.func,
  /**
   *  外层块样式
   */
  style: VP.style,
  /**
   *  时间校准文字
   */
  timeText: P.string,
  /**
   *  校准中文字
   */
  calibrationText: P.string,
  /**
   *  校准完成文字
   */
  calCompleteText: P.string,
  /**
   *  是否禁用
   */
  disabled: P.bool,
  /**
   *  图标大小
   */
  color: CP,
  /**
   *  图标尺寸
   */
  size: P.object,
  /**
   *  时间图标,外层圈,p路径
   */
  timeIconA: P.string,
  /**
   *  时间图标,内层时针,p路径
   */
  timeIconB: P.string,
  /**
   *  勾图标,左边,p路径
   */
  rightIconA: P.string,
  /**
   *  勾图标,右边,p路径
   */
  rightIconB: P.string,
  /**
   *  动画配置项
   */
  animationConfig: P.shape({
    easing: P.func,
    duration: P.number,
    delay: P.number,
    isInteraction: P.bool,
    useNativeDriver: P.bool,
  }),
};
const timeCheckDefaultProps = {
  startTimeCheck: () => {},
  endTimeCheck: () => {},
  style: {},
  timeText: '时间校准',
  calibrationText: '校准中...',
  calCompleteText: '校准完成',
  disabled: false,
  color: '#fff',
  size: { width: cx(24), height: cx(24) },
  timeIconA: TimeCheckDA,
  timeIconB: TimeCheckDB,
  rightIconA: RightIconDA,
  rightIconB: RightIconDB,
  animationConfig: TIMECHECK_DEFAULT_ANIMATION_CONFIG,
};

export default class TimeCheck extends Component {
  static propTypes = timeCheckPropTypes;
  static defaultProps = timeCheckDefaultProps;
  state = {
    timeText: this.props.timeText,
    rightImageOpacity: new Animated.Value(0),
    timeImageOpacity: new Animated.Value(1),
    clickDisabled: false,
  };
  componentWillReceiveProps = nextProps => {
    if (nextProps.showTimeCheck !== this.props.showTimeCheck) {
      this.times = 0;
      this.spinValue.setValue(0);
      this._setTimeAnimated(0, 1);
    }
  };
  spinValue = new Animated.Value(0);
  times = 0;
  timeHandle;
  _setTimeAnimated = (setValue, endValue) => {
    const { rightImageOpacity, timeImageOpacity } = this.state;
    const animationConfig = {
      ...TIMECHECK_DEFAULT_ANIMATION_CONFIG,
      ...this.props.animationConfig,
    };
    const { duration, delay, easing, useNativeDriver, isInteraction } = animationConfig;
    if (this.times < 2) {
      this.times = this.times + 1;
      this.spinValue.setValue(setValue);
      Animated.parallel([
        createAnimation({
          value: this.spinValue,
          toValue: endValue,
          duration,
          delay,
          easing,
          useNativeDriver,
          isInteraction,
        }),
      ]).start(() => this._setTimeAnimated(1, 0.95));
      this.setState({ timeText: this.props.calibrationText });
    } else if (this.times === 2) {
      this.times = this.times + 1;
      Animated.parallel([
        createAnimation({
          value: rightImageOpacity,
          toValue: 1,
          duration,
          delay,
          easing,
          useNativeDriver,
          isInteraction,
        }),
        createAnimation({
          value: timeImageOpacity,
          toValue: 0,
          duration,
          delay,
          easing,
          useNativeDriver,
          isInteraction,
        }),
      ]).start(() => this._setTimeAnimated());
      this.setState({ timeText: this.props.calCompleteText });
    } else if (this.times === 3) {
      this.times = this.times + 1;
      Animated.parallel([
        createAnimation({
          value: rightImageOpacity,
          toValue: 0,
          duration,
          delay: 800,
          easing,
          useNativeDriver,
          isInteraction,
        }),
        createAnimation({
          value: timeImageOpacity,
          toValue: 1,
          duration,
          delay: 800,
          easing,
          useNativeDriver,
          isInteraction,
        }),
      ]).start(() => {
        this._setTimeAnimated();
      });
    } else if (this.times === 4) {
      this.setState({ timeText: this.props.timeText, clickDisabled: false });
      this.props.endTimeCheck();
    }
  };
  _renderRightIcon = () => {
    const { rightImageOpacity } = this.state;
    const { rightIconA, rightIconB, color, size, style } = this.props;
    return (
      <Animated.View
        style={[
          {
            position: 'absolute',
            top: style.paddingTop || StyleSheet.flatten(styles.contentBox).paddingTop,
            opacity: rightImageOpacity,
          },
        ]}
      >
        <Svg viewBox="0 0 1024 1024" width={size.width} height={size.height}>
          <Path d={rightIconA} fill={color} />
          <Path d={rightIconB} fill={color} />
        </Svg>
      </Animated.View>
    );
  };

  _renderTimeCheckIcon = () => {
    const { timeImageOpacity } = this.state;
    const { timeIconA, timeIconB, color, size } = this.props;
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });
    return (
      <View style={styles.center}>
        <Animated.View style={[{ position: 'absolute', opacity: timeImageOpacity }]}>
          <Svg viewBox="0 0 1024 1024" width={(size.width * 3) / 4} height={(size.width * 3) / 4}>
            <Path d={timeIconA} fill={color} />
          </Svg>
        </Animated.View>
        <Animated.View style={[{ opacity: timeImageOpacity }, { transform: [{ rotate: spin }] }]}>
          <Svg viewBox="0 0 1024 1024" width={size.width} height={size.height}>
            <Path d={timeIconB} fill={color} />
          </Svg>
        </Animated.View>
      </View>
    );
  };
  render() {
    const { timeText } = this.state;
    const { disabled, color } = this.props;
    return (
      <TouchableOpacity
        disabled={disabled || this.state.clickDisabled}
        onPress={() => {
          this.setState({ clickDisabled: true }, () => {
            this.props.startTimeCheck();
          });
        }}
      >
        <View
          style={[
            styles.contentBox,
            { backgroundColor: 'rgba(0,0,0,0.5)' },
            this.props.style,
            disabled && { opacity: 0.5 },
          ]}
        >
          {this._renderTimeCheckIcon()}
          {this._renderRightIcon()}
          <TYText style={[styles.whiteText, { color }]}>{timeText}</TYText>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  contentBox: {
    width: cx(92),
    height: cx(91),
    justifyContent: 'space-between',
    paddingTop: cx(22),
    paddingBottom: cx(16),
    alignItems: 'center',
    borderRadius: cx(12),
    marginBottom: cx(12),
    overflow: 'hidden',
  },
  whiteText: {
    fontSize: cx(14),
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  center: { justifyContent: 'center', alignItems: 'center' },
});
