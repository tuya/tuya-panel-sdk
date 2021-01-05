import _ from 'lodash';
import React, { Component } from 'react';
import P from 'prop-types';
import { Svg, Path } from 'react-native-svg';
import {
  View,
  Animated,
  TouchableOpacity,
  StyleSheet,
  ViewPropTypes as VP,
  ColorPropType as CP,
  Easing,
} from 'react-native';
import { TYText, UnitText, Utils } from 'tuya-panel-kit';
import { createAnimation } from '../../utils';

const { convertX: cx } = Utils.RatioUtils;
const CountDownD =
  'M841.142857 1024h-658.285714a36.571429 36.571429 0 0 1-35.986286-29.988571L146.285714 987.428571V877.714286a366.153143 366.153143 0 0 1 365.714286-365.714286 366.226286 366.226286 0 0 1-365.714286-365.714286V36.571429a36.571429 36.571429 0 0 1 36.571429-36.571429h658.285714a36.571429 36.571429 0 0 1 36.571429 36.571429V146.285714a366.153143 366.153143 0 0 1-365.714286 365.714286 365.714286 365.714286 0 0 1 365.714286 349.842286V987.428571a36.571429 36.571429 0 0 1-29.988572 35.986286zM512 585.142857a292.132571 292.132571 0 0 0-292.571429 277.942857V950.857143h585.142858v-73.142857a292.571429 292.571429 0 0 0-292.571429-292.571429zM219.428571 73.142857v73.142857a292.571429 292.571429 0 1 0 585.142858 0V73.142857z m117.028572 789.942857a36.571429 36.571429 0 0 1-35.108572-46.811428 218.770286 218.770286 0 0 1 124.781715-140.507429 36.571429 36.571429 0 1 1 28.672 67.291429 146.285714 146.285714 0 0 0-83.309715 93.842285 36.571429 36.571429 0 0 1-35.035428 26.185143z';
const COUNTDOWN_DEFAULT_ANIMATION_CONFIG = {
  easing: Easing.linear,
  duration: 400,
  delay: 0,
  isInteraction: true,
  useNativeDriver: true,
};
const CountDownPropTypes = {
  /**
   *  倒计时时间
   */
  countdownLeft: P.number.isRequired,
  /**
   *  是否显示倒计时
   */
  countDownShow: P.bool.isRequired,
  /**
   *  倒计时开始时触发
   */
  startCountdown: P.func,
  /**
   *  倒计时结束时触发
   */
  endCountdown: P.func,
  /**
   *  外层块样式
   */
  style: VP.style,
  /**
   *  显示倒计时时背景颜色
   */
  activeBgColor: P.string,
  /**
   *  显示图标时背景颜色
   */
  inactiveBgColor: P.string,
  /**
   *  为倒计时时文字
   */
  clickEndText: P.string,
  /**
   *  为图标时文字
   */
  countdownText: P.string,
  /**
   *  是否禁用
   */
  disabled: P.bool,
  /**
   *  图标颜色
   */
  color: CP,
  /**
   *  图标尺寸
   */
  size: P.object,
  /**
   *  倒计时icon,p路径
   */
  countDownIcon: P.string,
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

const CountDownDefaultProps = {
  endCountdown: () => {},
  startCountdown: () => {},
  style: {},
  activeBgColor: 'rgba(0,0,0,0.6)',
  inactiveBgColor: 'rgba(0,0,0,0.5)',
  clickEndText: '点击结束',
  countdownText: '倒计时',
  disabled: false,
  color: '#fff',
  size: { width: cx(24), height: cx(24) },
  countDownIcon: CountDownD,
  animationConfig: COUNTDOWN_DEFAULT_ANIMATION_CONFIG,
};
export default class CountDown extends Component {
  static propTypes = CountDownPropTypes;
  static defaultProps = CountDownDefaultProps;
  state = {};
  componentDidMount = () => {
    this.setState({
      countdownTextTop: new Animated.Value(this.props.countDownShow ? 0 : cx(68)),
      countdownImage: new Animated.Value(this.props.countDownShow ? cx(-30) : 0),
      countdownTextOpacity: new Animated.Value(this.props.countDownShow ? 1 : 0),
      countdownImageOpacity: new Animated.Value(this.props.countDownShow ? 0 : 1),
      clickDisabled: false,
    });
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.countDownShow !== this.props.countDownShow) {
      nextProps.countDownShow && this._countdownShow(true);
      !nextProps.countDownShow && this._countdownShow(false);
    }
  };

  _countdownShow = ifShow => {
    const {
      countdownTextTop,
      countdownImage,
      countdownTextOpacity,
      countdownImageOpacity,
    } = this.state;
    const animationConfig = {
      ...COUNTDOWN_DEFAULT_ANIMATION_CONFIG,
      ...this.props.animationConfig,
    };
    const { duration, delay, easing, useNativeDriver, isInteraction } = animationConfig;
    Animated.parallel([
      createAnimation({
        value: countdownTextTop,
        tpValue: ifShow ? 0 : cx(68),
        duration,
        delay,
        easing,
        useNativeDriver,
        isInteraction,
      }),
      createAnimation({
        value: countdownImage,
        toValue: ifShow ? cx(-30) : 0,
        duration,
        delay,
        easing,
        useNativeDriver,
        isInteraction,
      }),
      createAnimation({
        value: countdownTextOpacity,
        toValue: ifShow ? 1 : 0,
        duration,
        delay,
        easing,
        useNativeDriver,
        isInteraction,
      }),
      createAnimation({
        value: countdownImageOpacity,
        toValue: ifShow ? 0 : 1,
        duration,
        delay,
        easing,
        useNativeDriver,
        isInteraction,
      }),
    ]).start(() => {
      this.setState({ clickDisabled: false });
    });
  };

  _renderCenterBox = () => {
    const { countdownLeft, color, size, countDownIcon } = this.props;
    const {
      countdownImage,
      countdownTextOpacity,
      countdownTextTop,
      countdownImageOpacity,
    } = this.state;
    return (
      <View style={[styles.countDownTextBox, { height: size.height }]}>
        <Animated.View
          style={[
            styles.countDownBox,
            {
              transform: [{ translateY: countdownImage }],
              opacity: countdownImageOpacity,
            },
          ]}
        >
          <Svg viewBox="0 0 1024 1024" width={size.width || cx(24)} height={size.height || cx(24)}>
            <Path d={countDownIcon} fill={color} />
          </Svg>
        </Animated.View>
        <Animated.View
          style={[
            styles.countDownText,
            {
              position: 'absolute',
              transform: [{ translateY: countdownTextTop }],
              opacity: countdownTextOpacity,
            },
          ]}
        >
          <UnitText
            value={`${parseInt(`${countdownLeft / 60}`, 10)}`.padStart(2, '0')}
            size={(size.width * 3) / 5 || cx(17)}
            style={{ width: (size.width * 4) / 5 || cx(17) }}
            valueColor={color}
          />
          <TYText style={[styles.textInCenter, { color }]} text=":" />
          <UnitText
            value={`${countdownLeft % 60}`.padStart(2, '0')}
            size={(size.width * 3) / 5 || cx(17)}
            style={{ width: (size.width * 4) / 5 || cx(17) }}
            valueColor={color}
          />
        </Animated.View>
      </View>
    );
  };

  render() {
    if (!Object.keys(this.state).includes('countdownImage')) return null;
    const {
      countdownLeft,
      endCountdown,
      startCountdown,
      style,
      activeBgColor,
      inactiveBgColor,
      clickEndText,
      countdownText,
      disabled,
      color,
    } = this.props;
    return (
      <TouchableOpacity
        disabled={disabled || this.state.clickDisabled}
        onPress={() => {
          this.setState({ clickDisabled: true }, () => {
            if (countdownLeft === 0) {
              startCountdown();
            } else {
              endCountdown();
            }
          });
        }}
      >
        <View
          style={[
            styles.contentBox,
            style,
            {
              backgroundColor: countdownLeft !== 0 ? activeBgColor : inactiveBgColor,
            },
            disabled && { opacity: 0.5 },
          ]}
        >
          {this._renderCenterBox()}
          <TYText style={[styles.whiteText, { color }]}>
            {countdownLeft !== 0 ? clickEndText : countdownText}
          </TYText>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  contentBox: {
    alignItems: 'center',
    borderRadius: cx(12),
    height: cx(91),
    justifyContent: 'space-between',
    marginBottom: cx(12),
    overflow: 'hidden',
    paddingBottom: cx(16),
    paddingTop: cx(22),
    width: cx(92),
  },
  countDownBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  countDownText: {
    alignItems: 'center',
    flexDirection: 'row',
    height: cx(24),
  },
  countDownTextBox: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    justifyContent: 'flex-start',
    overflow: 'hidden',
    width: '100%',
  },
  textInCenter: {
    fontWeight: '600',
  },
  whiteText: {
    alignItems: 'center',
    fontSize: cx(14),
    justifyContent: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
