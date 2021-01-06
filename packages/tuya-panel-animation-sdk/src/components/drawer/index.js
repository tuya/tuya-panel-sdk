import _ from 'lodash';
import React, { Component } from 'react';
import P from 'prop-types';
import { ViewPropTypes as VP, Easing, View, Animated, PanResponder } from 'react-native';
import { Utils } from 'tuya-panel-kit';
import { createAnimation } from '../../utils';

const { winWidth, winHeight } = Utils.RatioUtils;
const DRAWER_DEFAULT_ANIMATION_CONFIG = {
  easing: Easing.linear,
  duration: 400,
  delay: 0,
  isInteraction: true,
};
const DrawerPropTypes = {
  /**
   *  是否可见
   */
  visible: P.bool.isRequired,
  /**
   *  自定义内容
   */
  renderContent: P.func,
  /**
   *  遮罩层样式
   */
  maskStyle: VP.style,
  /**
   *  弹出层样式
   */
  drawerStyle: VP.style,
  /**
   *  设置 Drawer 最外层容器的样式
   */
  style: VP.style,
  /**
   *  抽屉方向 【'left','right','top','bottom'】
   */
  placement: P.oneOf(['left', 'right', 'top', 'bottom']),
  /**
   *  点击抽屉关闭回调
   */
  onClose: P.func,
  /**
   *  点击抽屉开启或者关闭后的回调
   */
  onStateChange: P.func,
  /**
   *  Drawer宽度
   */
  width: P.number,
  /**
   *  Drawer高度，一般在 placement 为 top 或 bottom 时使用
   */
  height: P.number,
  /**
   *  点击蒙层是否允许关闭
   */
  maskClosable: P.bool,
  /**
   *  遮罩是否可见
   */
  maskVisible: P.bool,
  /**
   *  动画配置项
   */
  animationConfig: P.shape({
    easing: P.func,
    duration: P.number,
    delay: P.number,
    isInteraction: P.bool,
  }),
};
const DrawerDefaultProps = {
  maskStyle: {
    width: winWidth,
    height: winHeight,
    backgroundColor: 'rgba(0,0,0,0.6)',
    position: 'absolute',
  },
  drawerStyle: {
    backgroundColor: '#F8F8F8',
  },
  style: {},
  placement: 'left',
  maskVisible: true,
  maskClosable: true,
  renderContent: () => (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'red',
      }}
    />
  ),
  onClose: () => {},
  onStateChange: () => {},
  width: winWidth / 2,
  height: winHeight,
  animationConfig: DRAWER_DEFAULT_ANIMATION_CONFIG,
};

export default class Drawer extends Component {
  static propTypes = DrawerPropTypes;
  static defaultProps = DrawerDefaultProps;
  constructor(props) {
    super(props);
    this.direction = ['left', 'right'].includes(props.placement) ? 'row' : 'column';
    this.range = ['left', 'right'].includes(props.placement) ? winWidth : winHeight;
    this.state = {
      boxLeft: new Animated.Value(props.visible ? 0 : -this.range),
      maskOpacity: new Animated.Value(+props.visible),
      maskState: props.visible,
    };
  }

  componentDidUpdate = preProps => {
    if (preProps.placement !== this.props.placement) {
      this.direction = ['left', 'right'].includes(this.props.placement) ? 'row' : 'column';
      this.range = ['left', 'right'].includes(this.props.placement) ? winWidth : winHeight;
    }
    if (preProps.visible !== this.props.visible) {
      const animationConfig = {
        ...DRAWER_DEFAULT_ANIMATION_CONFIG,
        ...this.props.animationConfig,
      };
      const { duration, delay, easing, isInteraction } = animationConfig;
      this.setState({ maskState: true }, () => {
        Animated.parallel([
          createAnimation({
            value: this.state.boxLeft,
            toValue: this.props.visible ? 0 : -this.range,
            duration,
            delay,
            easing,
            useNativeDriver: false,
            isInteraction,
          }),
          createAnimation({
            value: this.state.maskOpacity,
            toValue: +this.props.visible,
            duration,
            delay,
            easing,
            useNativeDriver: false,
            isInteraction,
          }),
        ]).start(() => {
          if (!this.props.visible) {
            this.setState({ maskState: false });
            this.endOnce = true;
          }
          this.props.onStateChange(this.props.visible);
        });
      });
      if (!this.props.visible) {
        this.boxLeft = 0;
      }
    }
  };

  boxLeft = 0;
  endOnce = true;
  direction = 'row';
  _panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => false,
    onPanResponderGrant: () => true,
    onPanResponderMove: (evt, { dx, dy }) => this._handleMove(evt, { dx, dy }),
    onPanResponderRelease: _.throttle(
      (evt, { dx, dy }) => this._handleRelease(evt, { dx, dy }),
      1000,
      {
        leading: true,
        trailing: false,
      }
    ),
  });

  checkIfDisabled = (placement, dx, dy) => {
    switch (placement) {
      case 'left':
        if (dx > 0) {
          return true;
        }
        return false;
      case 'right':
        if (dx < 0) {
          return true;
        }
        return false;
      case 'top':
        if (dy > 0) {
          return true;
        }
        return false;
      case 'bottom':
        if (dy < 0) {
          return true;
        }
        return false;
      default:
        return false;
    }
  };

  checkIfClick = (evt, dx, dy) => {
    switch (this.props.placement) {
      case 'left':
        if (Math.abs(dx) < 1 && evt.nativeEvent.pageX > this.props.width) {
          return true;
        }
        return false;
      case 'right':
        if (Math.abs(dx) < 1 && evt.nativeEvent.pageX < winWidth - this.props.width) {
          return true;
        }
        return false;
      case 'top':
        if (Math.abs(dy) < 1 && evt.nativeEvent.pageY > this.props.height) {
          return true;
        }
        return false;
      case 'bottom':
        if (Math.abs(dy) < 1 && evt.nativeEvent.pageY < winHeight - this.props.height) {
          return true;
        }
        return false;
      default:
        return false;
    }
  };

  _handleMove(__, { dx, dy }) {
    const { placement, width, height } = this.props;
    if (this.checkIfDisabled(placement, dx, dy) || !this.endOnce) {
      return;
    }
    const maskRange =
      this.direction === 'row'
        ? (winWidth - width - Math.abs(dx)) / (winWidth - width)
        : (winHeight - height - Math.abs(dy)) / (winHeight - height);
    if (this.state.boxLeft._value > -this.range) {
      this.setState(
        {
          boxLeft: new Animated.Value(
            +`${['right', 'bottom'].includes(placement) ? '-' : ''}${
              this.direction === 'row' ? dx : dy
            }`
          ),
          maskOpacity: new Animated.Value(Math.max(0, maskRange)),
        },
        () => {}
      );
      this.boxLeft = this.direction === 'row' ? dx : dy;
    }
  }

  _handleRelease = (evt, { dx, dy }) => {
    const { visible, width, height, placement, maskClosable } = this.props;
    this.endOnce = false;
    if (this.endOnce || !visible || !evt || !evt.nativeEvent) return;
    const animationConfig = {
      ...DRAWER_DEFAULT_ANIMATION_CONFIG,
      ...this.props.animationConfig,
    };
    const { duration, delay, easing, isInteraction } = animationConfig;
    if (
      Math.abs(this.boxLeft) > (['top', 'bottom'].includes(placement) ? height / 2 : width / 2) ||
      (this.checkIfClick(evt, dx, dy) && maskClosable)
    ) {
      this.props.onClose();
    } else {
      Animated.parallel([
        createAnimation({
          value: this.state.boxLeft,
          toValue: 0,
          duration,
          delay,
          easing,
          useNativeDriver: false,
          isInteraction,
        }),
        createAnimation({
          value: this.state.maskOpacity,
          toValue: 1,
          duration,
          delay,
          easing,
          useNativeDriver: false,
          isInteraction,
        }),
      ]).start(() => {
        this.endOnce = true;
      });
    }
  };

  render() {
    const {
      maskStyle,
      drawerStyle,
      width,
      height,
      renderContent,
      placement,
      maskVisible,
      style,
    } = this.props;
    return (
      <View
        style={[
          {
            position: 'absolute',
            [['left', 'right'].includes(placement) ? 'top' : 'left']: 0,
            [placement]: 0,
          },
          style,
        ]}
        {...this._panResponder.panHandlers}
      >
        {maskVisible && this.state.maskState && (
          <Animated.View
            style={[
              { [['left', 'right'].includes(placement) ? 'top' : 'left']: 0 },
              maskStyle,
              { [placement]: 0, opacity: this.state.maskOpacity },
            ]}
          />
        )}
        <Animated.View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            [['left', 'right'].includes(placement) ? 'top' : 'left']: 0,
            [placement]: this.state.boxLeft,
          }}
        >
          <View style={[drawerStyle, { width, height }]}>{renderContent()}</View>
        </Animated.View>
      </View>
    );
  }
}
