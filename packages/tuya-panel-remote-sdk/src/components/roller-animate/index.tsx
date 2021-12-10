/* eslint-disable react/sort-comp */
import * as React from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Image,
  PanResponder,
  Easing,
  PanResponderInstance,
  PanResponderGestureState,
} from 'react-native';
import { Utils } from 'tuya-panel-kit';
import { MainProps, MainState, Size } from './interface';

const { convertX: cx } = Utils.RatioUtils;
/* eslint-disable react/prefer-stateless-function */
class RollerAnimate extends React.Component<MainProps, MainState> {
  static defaultProps = {
    width: cx(250),
    height: cx(280),
    initPercent: 0.5,
    buttonWidth: cx(40),
    type: null,
    style: null,
    rollerSize: {
      width: 0,
      height: 0,
    },
    rollerPosition: {
      top: cx(26),
      left: cx(20),
    },
    bgImageStyle: null,
    bgImage: null,
    rollerStyle: null,
    rollerImageStyle: null,
    rollerImage: null,
    buttonStyle: null,
    buttonImageStyle: null,
    buttonImage: null,
    onChange: null,
    onMove: null,
    animateTime: 8,
  };

  _panResponder: PanResponderInstance | null;
  // 第一次触摸x坐标
  firstX: number;
  // 第一次触摸y坐标
  firstY: number;
  halfButtonWidth: number;
  rollerSize: Size;
  panSize: Size;
  maxRollerPosition: number;
  rollerAnimateStart: (width: number, diff: number) => any;
  buttonAnimateStart: (width: number, diff: number) => any;

  constructor(props: MainProps) {
    super(props);
    this.state = {
      percent: props.initPercent,
      rollerTop: new Animated.Value(0),
      buttonPosition: new Animated.Value(0),
    };
    this._panResponder = { panHandlers: {} };
    this.halfButtonWidth = props.buttonWidth / 2;
    // 卷帘的宽度（减去左右定位），高度为背景高度减去top定位再减去按钮高度一半
    this.rollerSize = {
      width: props.rollerSize.width || props.width - props.rollerPosition.left * 2,
      height:
        props.rollerSize.height || props.height - props.rollerPosition.top - props.buttonWidth / 2,
    };
    // 滑块手势的高度
    this.panSize = {
      width: this.rollerSize.width,
      height: props.height - props.rollerPosition.top,
    };
    this.maxRollerPosition = this.rollerSize.height - this.halfButtonWidth;
    this.rollerAnimateStart = (top, diff) =>
      Animated.timing(this.state.rollerTop, {
        toValue: top,
        duration: props.animateTime * 1000 * diff,
        easing: Easing.linear,
        useNativeDriver: false,
      });
    this.buttonAnimateStart = (top, diff) =>
      Animated.timing(this.state.buttonPosition, {
        toValue: top,
        duration: props.animateTime * 1000 * diff,
        easing: Easing.linear,
        useNativeDriver: false,
      });
  }

  componentWillMount() {
    this.init();
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponderCapture: () => false,
      onStartShouldSetPanResponder: _event => {
        // 判断手势位置是否在滑块上
        const { halfButtonWidth, rollerSize } = this;
        const { locationY } = _event.nativeEvent;
        const { _value } = this.state.buttonPosition;
        const buttonTop = rollerSize.height - _value - halfButtonWidth * 2;
        if (locationY >= buttonTop && locationY <= buttonTop + halfButtonWidth * 2) {
          return true;
        }
        return false;
      },
      onPanResponderGrant: (_event, gestureState) => {
        const { locationX, locationY } = _event.nativeEvent;
        this.firstX = locationX;
        this.firstY = locationY;
        this.move(gestureState);
      },
      onPanResponderMove: (_event, gestureState) => {
        this.move(gestureState);
      },
      onPanResponderTerminationRequest: () => false,
      onPanResponderRelease: (_event, gestureState) => {
        const { onChange } = this.props;
        const percent = this.getPercent(gestureState);
        const animatePercent = this.getAnimatePercent();
        const percentDiff = Math.abs(percent - animatePercent);
        this.animate(percent, percentDiff);
        this.setState({ percent });
        if (percent > this.state.percent) {
          onChange && onChange('open', percent);
        } else if (percent < this.state.percent) {
          onChange && onChange('close', percent);
        }
      },
      onPanResponderTerminate: () => {},
    });
  }

  componentWillReceiveProps(nextProps: MainProps) {
    const { type } = nextProps;
    const { halfButtonWidth, rollerSize } = this;
    const percent = this.getAnimatePercent();
    if (type === 'open') {
      const diff = 1 - percent;
      const top = this.getPosition(1);
      this.rollerAnimateStart(-top, diff).start();
      this.buttonAnimateStart(top - halfButtonWidth, diff).start(() => {
        this.setState({
          percent: 1,
        });
      });
    }
    if (type === 'close') {
      // 卷帘top变为0 滑块bottom变为负的自身高度一半
      const top = this.getPosition(0);
      this.rollerAnimateStart(-top, percent).start();
      this.buttonAnimateStart(top - halfButtonWidth, percent).start(() => {
        this.setState({
          percent: 0,
        });
      });
    }
    if (type === 'pause') {
      this.state.buttonPosition.stopAnimation();
      this.state.rollerTop.stopAnimation();
      const { rollerTop, buttonPosition } = this.state;
      this.state.buttonPosition.setValue(buttonPosition._value);
      this.state.rollerTop.setValue(rollerTop._value);
      this.setState({
        percent: -rollerTop._value / rollerSize.height,
      });
    }
  }

  componentWillUnmount() {
    this.state.buttonPosition.stopAnimation();
    this.state.rollerTop.stopAnimation();
  }

  init = () => {
    const { percent } = this.state;
    const position = this.getPosition(percent);
    this.state.rollerTop.setValue(-position);
    this.setButtonPosition(percent);
  };

  // 卷帘的top定位计算 最大值限制
  getPosition = (percent: number) => {
    const { rollerSize, maxRollerPosition } = this;
    const position = Math.min(maxRollerPosition, percent * rollerSize.height);
    return position;
  };

  // 滑块的botto定位计算
  setButtonPosition = (percent: number) => {
    const position = this.getPosition(percent);
    this.state.buttonPosition.setValue(position - this.halfButtonWidth);
  };

  animate = (percent: number, diff: number) => {
    const top = this.getPosition(percent);
    this.rollerAnimateStart(-top, diff).start();
  };

  getAnimatePercent = () => {
    const { _value } = this.state.rollerTop;
    return -_value / this.rollerSize.height;
  };

  // 滑块移动过程计算百分比
  getPercent = (gestureState: PanResponderGestureState) => {
    const { dy } = gestureState;
    const { rollerSize, firstY } = this;
    const currentPercent = (firstY + dy) / rollerSize.height;
    const percent = 1 - Math.min(currentPercent, 1);
    return Math.min(percent, 1);
  };

  move = (gestureState: PanResponderGestureState) => {
    const { onMove } = this.props;
    const percent = this.getPercent(gestureState);
    this.setButtonPosition(percent);
    onMove && onMove(percent);
  };

  _renderBg = () => {
    const { bgImageStyle, bgImage } = this.props;
    return <Image source={bgImage} style={[styles.background, bgImageStyle]} />;
  };

  _renderRoller = () => {
    const { rollerStyle, rollerImageStyle, rollerImage } = this.props;
    const { rollerSize } = this;
    const { rollerTop } = this.state;
    return (
      <Animated.View
        style={[
          rollerSize,
          { position: 'absolute', top: rollerTop },
          rollerStyle,
          !rollerImage ? { borderWidth: 1 } : null,
        ]}
      >
        <Image source={rollerImage} style={[styles.roller, rollerImageStyle]} />
      </Animated.View>
    );
  };

  _renderButton = () => {
    const { buttonWidth, buttonStyle, buttonImageStyle, buttonImage } = this.props;
    const { buttonPosition } = this.state;
    return (
      <Animated.View
        style={[
          {
            width: buttonWidth,
            height: buttonWidth,
            bottom: buttonPosition,
            position: 'absolute',
            borderRadius: buttonWidth / 2,
          },
          !buttonImage ? { borderWidth: 1 } : null,
          buttonStyle,
        ]}
      >
        <Image source={buttonImage} style={[styles.button, buttonImageStyle]} />
      </Animated.View>
    );
  };

  render() {
    const { width, height, buttonWidth, rollerPosition, style, bgImage } = this.props;
    const { rollerSize, panSize } = this;
    const { top } = rollerPosition;
    return (
      <View style={[styles.main, style, { width, height }, !bgImage ? { borderWidth: 1 } : null]}>
        {!!bgImage && this._renderBg()}
        <View style={[panSize, { top }, styles.rollerMain]}>
          {this._renderRoller()}
          <View style={[rollerSize, { alignItems: 'center' }]}>{this._renderButton()}</View>
        </View>
        <View
          style={[styles.panResponder, panSize, { top, width: buttonWidth }]}
          {...(this._panResponder && this._panResponder.panHandlers
            ? this._panResponder.panHandlers
            : {})}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  background: {
    height: '100%',
    resizeMode: 'stretch',
    width: '100%',
  },
  button: {
    height: '100%',
    resizeMode: 'contain',
    width: '100%',
  },
  main: {
    alignItems: 'center',
  },
  panResponder: {
    borderColor: 'transparent',
    position: 'absolute',
  },
  roller: {
    height: '100%',
    resizeMode: 'stretch',
    width: '100%',
  },
  rollerMain: {
    alignItems: 'center',
    borderColor: 'transparent',
    overflow: 'hidden',
    position: 'absolute',
  },
});
export default RollerAnimate;
