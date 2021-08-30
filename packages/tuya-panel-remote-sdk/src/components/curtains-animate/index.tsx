/* eslint-disable react/sort-comp */
/* eslint-disable import/no-unresolved */
import * as React from 'react';
import {
  View,
  StyleSheet,
  PanResponder,
  Image,
  Animated,
  Easing,
  PanResponderInstance,
  PanResponderGestureState,
} from 'react-native';
import { Utils } from 'tuya-panel-kit';

import { MainProps, MainState, PositionType } from './interface';

const { convertX: cx } = Utils.RatioUtils;

/* eslint-disable react/prefer-stateless-function */
class Index extends React.Component<MainProps, MainState> {
  static defaultProps = {
    style: null,
    width: cx(280),
    height: cx(280),
    initPercent: 0.3,
    buttonWidth: cx(40),
    type: null,
    onChange: null,
    animateTime: 8,
    rollerImage: null,
    rollerStyle: null,
    rollerImageStyle: null,
    buttonImage: null,
    buttonStyle: null,
    buttonImageStyle: null,
    buttonPositionErrorValue: 0,
    curtainsLeftImage: null,
    curtainsRightImage: null,
    curtainsStyle: null,
    curtainsImageStyle: null,
    curtainsPosition: {
      top: cx(15),
      left: cx(8),
    },
  };

  _leftPanResponder: PanResponderInstance | null;
  _rightPanResponder: PanResponderInstance | null;
  // 第一次触摸x坐标
  firstLeftX: number;
  // 第一次触摸y坐标
  firstLeftY: number;
  // 第一次触摸x坐标
  firstRightX: number;
  // 第一次触摸y坐标
  firstRightY: number;
  halfWidth: number;
  halfButtonWidth: number;
  // 计算按钮移动过程中的最小比列，即窗帘全开状态
  minLeftPercent: number;
  // 计算按钮移动过程中的最大比列，即窗帘全关状态
  maxLeftPercent: number;
  curtainsAnimateStart: (width: number, diff: number) => any;
  buttonAnimateStart: (width: number, diff: number) => any;

  constructor(props: MainProps) {
    super(props);
    this.state = {
      percent: 1 - props.initPercent,
      curtainsWidth: new Animated.Value(0),
      buttonPosition: new Animated.Value(0),
    };
    this._leftPanResponder = { panHandlers: {} };
    this._rightPanResponder = { panHandlers: {} };
    this.halfWidth = props.width / 2;
    this.halfButtonWidth = props.buttonWidth / 2;

    this.minLeftPercent = this.halfButtonWidth / this.halfWidth;
    this.maxLeftPercent =
      (this.halfWidth + props.buttonPositionErrorValue - this.halfButtonWidth) / this.halfWidth;

    this.curtainsAnimateStart = (width, diff) =>
      Animated.timing(this.state.curtainsWidth, {
        toValue: width,
        duration: props.animateTime * 1000 * diff,
        easing: Easing.linear,
        useNativeDriver: false,
      });

    this.buttonAnimateStart = (width, diff) =>
      Animated.timing(this.state.buttonPosition, {
        toValue: width,
        duration: props.animateTime * 1000 * diff,
        easing: Easing.linear,
        useNativeDriver: false,
      });
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillMount() {
    this.init();
    this._leftPanResponder = PanResponder.create({
      // 成为响应者
      onStartShouldSetPanResponderCapture: _event => {
        const { buttonWidth } = this.props;
        const { locationX } = _event.nativeEvent;
        const { _value } = this.state.buttonPosition;
        // 判断手势开始触摸的位置是否在按钮上
        if (locationX >= _value && locationX <= _value + buttonWidth) {
          return true;
        }
        return false;
      },
      // 用户触摸到屏幕,开始手势操作
      onPanResponderGrant: (_event, gestureState) => {
        const { locationX, locationY } = _event.nativeEvent;
        this.firstLeftX = locationX;
        this.firstLeftY = locationY;
        this.move(gestureState, 'left');
      },
      // 触摸点移动
      onPanResponderMove: (_event, gestureState) => {
        this.move(gestureState, 'left');
      },
      // 用户放开了所有的触摸点，且此时视图已经成为了响应者
      onPanResponderTerminationRequest: () => false,
      onPanResponderRelease: (_event, gestureState) => {
        const { onChange } = this.props;
        const percent = this.getPercent(gestureState, 'left');
        const animatePercent = this.getAnimatePercent();
        const percentDiff = Math.abs(percent - animatePercent);
        this.animate(percent, percentDiff);
        this.setState({
          percent,
        });
        if (percent > this.state.percent) {
          onChange && onChange('close');
        } else if (percent < this.state.percent) {
          onChange && onChange('open');
        }
      },
      // 另一个组件已经成为了新的响应者，所以当前手势将被取消
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onPanResponderTerminate: () => {},
    });
    this._rightPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: _event => {
        const { halfWidth } = this;
        const { buttonWidth } = this.props;
        const { locationX } = _event.nativeEvent;
        const { _value } = this.state.buttonPosition;
        const buttonPosition = halfWidth - _value - buttonWidth;
        if (locationX >= buttonPosition && locationX <= buttonPosition + buttonWidth) {
          return true;
        }
        return false;
      },
      onPanResponderGrant: (_event, gestureState) => {
        const { locationX, locationY } = _event.nativeEvent;
        this.firstRightX = locationX;
        this.firstRightY = locationY;
        this.move(gestureState, 'right');
      },
      onPanResponderMove: (_event, gestureState) => {
        this.move(gestureState, 'right');
      },
      onPanResponderTerminationRequest: () => true,
      onPanResponderRelease: (_event, gestureState) => {
        const { onChange } = this.props;
        const percent = this.getPercent(gestureState, 'right');
        const animatePercent = this.getAnimatePercent();
        const percentDiff = Math.abs(percent - animatePercent);
        this.animate(percent, percentDiff);
        this.setState({
          percent,
        });
        if (percent > this.state.percent) {
          onChange && onChange('close');
        } else if (percent < this.state.percent) {
          onChange && onChange('open');
        }
      },
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onPanResponderTerminate: () => {},
    });
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(nextProps: MainProps) {
    const { halfWidth, halfButtonWidth, minLeftPercent, maxLeftPercent } = this;
    const { type, curtainsPosition } = nextProps;
    const percent = this.getAnimatePercent();
    if (type === 'open') {
      // 执行打开操作，窗帘宽度逐渐缩小为按钮宽度的一半,按钮left/right变为0
      this.curtainsAnimateStart(halfButtonWidth, percent).start();
      const buttonPosition = this.getButtonPosition(minLeftPercent);
      this.buttonAnimateStart(buttonPosition, percent).start(() => {
        this.setState({
          percent: minLeftPercent,
        });
      });
    }
    if (type === 'close') {
      const diff = 1 - percent;
      this.curtainsAnimateStart(halfWidth - curtainsPosition.left, diff).start();
      const buttonPosition = this.getButtonPosition(maxLeftPercent);
      this.buttonAnimateStart(buttonPosition, diff).start(() => {
        this.setState({
          percent: maxLeftPercent,
        });
      });
    }
    if (type === 'pause') {
      this.state.curtainsWidth.stopAnimation();
      this.state.buttonPosition.stopAnimation();
      const { curtainsWidth, buttonPosition } = this.state;
      this.state.curtainsWidth.setValue(curtainsWidth._value);
      this.state.buttonPosition.setValue(buttonPosition._value);
      this.setState({
        percent: curtainsWidth._value / halfWidth,
      });
    }
  }

  componentWillUnmount() {
    this.state.curtainsWidth.stopAnimation();
    this.state.buttonPosition.stopAnimation();
  }

  init = () => {
    // 根据初始开合百分比percent设置窗帘的宽度以及按钮的位置
    const width = this.getCurtainsWidth(this.state.percent);
    this.state.curtainsWidth.setValue(width);
    this.setButtonPosition(this.state.percent);
  };

  getButtonPosition = (percent: number) => {
    const { halfWidth, halfButtonWidth, minLeftPercent, maxLeftPercent } = this;
    const currentPercent = Math.max(minLeftPercent, Math.min(maxLeftPercent, percent));
    return currentPercent * halfWidth - halfButtonWidth;
  };

  // 根据比例计算窗帘最后需要变化的宽度
  getCurtainsWidth = (percent: number) => {
    const { halfWidth, halfButtonWidth } = this;
    const maxWidth = halfWidth - this.props.curtainsPosition.left;
    const minWidth = halfButtonWidth;
    const currentWidth = halfWidth * percent;
    return Math.max(Math.min(maxWidth, currentWidth), minWidth);
  };

  setButtonPosition = (percent: number) => {
    const buttonPosition = this.getButtonPosition(percent);
    this.state.buttonPosition.setValue(buttonPosition);
  };

  getPercent = (gestureState: PanResponderGestureState, type: PositionType) => {
    const { halfWidth, firstLeftX, firstRightX } = this;
    const { dx } = gestureState;
    let percent = 0;
    if (type === 'left') {
      percent = (firstLeftX + dx) / halfWidth;
    } else {
      percent = 1 - (firstRightX + dx) / halfWidth;
    }
    return Math.min(percent, 1);
  };

  getAnimatePercent = () => {
    const { _value } = this.state.curtainsWidth;
    return _value / this.halfWidth;
  };

  move = (gestureState: PanResponderGestureState, type: PositionType) => {
    const percent = this.getPercent(gestureState, type);
    this.setButtonPosition(percent);
  };

  animate = (percent: number, diff: number) => {
    const width = this.getCurtainsWidth(percent);
    this.curtainsAnimateStart(width, diff).start();
  };

  _renderRoller = () => {
    const { rollerImage, rollerStyle, rollerImageStyle } = this.props;
    return (
      <View
        style={[
          styles.roller,
          !rollerImage ? { borderWidth: 1, height: cx(20) } : null,
          rollerStyle,
        ]}
      >
        {rollerImage && (
          <Image source={rollerImage} style={[styles.rollerImage, rollerImageStyle]} />
        )}
      </View>
    );
  };

  _renderButton = (type: PositionType) => {
    const { buttonWidth, buttonImage, buttonStyle, buttonImageStyle } = this.props;
    const { buttonPosition } = this.state;
    return (
      <Animated.View
        style={[
          styles.button,
          !buttonImage ? { borderWidth: 1 } : null,
          {
            width: buttonWidth,
            height: buttonWidth,
            borderRadius: buttonWidth / 2,
            [type]: buttonPosition,
          },
          buttonStyle,
        ]}
      >
        {buttonImage && (
          <Image source={buttonImage} style={[styles.buttonImage, buttonImageStyle]} />
        )}
      </Animated.View>
    );
  };

  _renderCurtains = (type: PositionType) => {
    const {
      height,
      curtainsLeftImage,
      curtainsRightImage,
      curtainsStyle,
      curtainsImageStyle,
      curtainsPosition,
    } = this.props;
    const { curtainsWidth } = this.state;
    const { top, left } = curtainsPosition;
    return (
      <Animated.View
        style={[
          styles.curtains,
          { width: curtainsWidth, [type]: left, height: height - top, top },
          type === 'left' && !curtainsLeftImage ? { borderWidth: 1 } : null,
          type === 'right' && !curtainsRightImage ? { borderWidth: 1 } : null,
          curtainsStyle,
        ]}
      >
        {type === 'left' && curtainsLeftImage && (
          <Image source={curtainsLeftImage} style={[styles.curtainsImage, curtainsImageStyle]} />
        )}
        {type === 'right' && curtainsRightImage && (
          <Image source={curtainsRightImage} style={[styles.curtainsImage, curtainsImageStyle]} />
        )}
      </Animated.View>
    );
  };

  render() {
    const { width, height, buttonWidth, style } = this.props;
    return (
      <View style={[{ width, height }, styles.main, style]}>
        {this._renderCurtains('left')}
        {this._renderCurtains('right')}
        {this._renderRoller()}
        {this._renderButton('left')}
        {this._renderButton('right')}
        <View
          style={{
            width,
            height: buttonWidth,
            flexDirection: 'row',
          }}
        >
          <View
            style={[styles.panResponder, { width: width / 2, height: buttonWidth }]}
            {...(this._leftPanResponder && this._leftPanResponder.panHandlers
              ? this._leftPanResponder.panHandlers
              : {})}
          />
          <View
            style={[styles.panResponder, { width: width / 2, height: buttonWidth }]}
            {...(this._rightPanResponder && this._rightPanResponder.panHandlers
              ? this._rightPanResponder.panHandlers
              : {})}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
  },
  buttonImage: {
    height: '100%',
    resizeMode: 'contain',
    width: '100%',
  },
  curtains: {
    position: 'absolute',
  },
  curtainsImage: {
    height: '100%',
    resizeMode: 'stretch',
    width: '100%',
  },
  main: {
    backgroundColor: '#fafafa',
  },
  panResponder: {
    borderColor: 'transparent',
    height: cx(20),
  },
  roller: {
    position: 'absolute',
    top: cx(8),
    width: '100%',
  },
  rollerImage: {
    resizeMode: 'contain',
    width: '100%',
  },
});

export default Index;
