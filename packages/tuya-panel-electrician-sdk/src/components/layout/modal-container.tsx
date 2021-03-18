/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-return-assign */
import React, { Component } from 'react';
import { Animated, StyleSheet, PanResponder, View, Dimensions } from 'react-native';

const { height: sHeight } = Dimensions.get('screen');

interface AnimateContainerProps {
  style?: any;
  name?: string;
  children?: any;
  onRequestClose?: () => void;
  addAnimateListener?: (a: any) => void;
  onSlideAnimateEnd?: any;
  onSlideAnimateStart: any;
  onClose?: () => void;
  touchEnableArea?: number;
  duration?: number;
}

interface AnimateContainerState {
  fadeAnim: any;
  isShow: boolean;
  childHeight: number;
}

export default class AnimateContainerView extends Component<
  AnimateContainerProps,
  AnimateContainerState
> {
  static defaultProps = {
    style: null,
    name: '',
    children: null,
    onRequestClose: null,
    addAnimateListener: () => {},
    onSlideAnimateEnd: () => {},
    onClose: () => {},
    touchEnableArea: 100,
    duration: 380,
  };

  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0),
      isShow: false,
      childHeight: 0,
    };

    this._modal = null;
    this.grantPointY = null;
    this.offset = 0;
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => false,
      // @ts-ignore
      onMoveShouldSetResponderCapture: () => false,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderRelease: () => this.onSlide(false),
      onResponderTerminationRequest: () => true,
    });
    this._childPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => false,
      // @ts-ignore
      onMoveShouldSetResponderCapture: () => false,
      onMoveShouldSetPanResponder: () => false,
      onResponderTerminationRequest: () => true,
      onPanResponderGrant: (e, gestureState) => this.onResponderGrant(e, gestureState),
      onPanResponderMove: (e, gestureState) => this.onResponderMove(e, gestureState),
      onPanResponderRelease: () => this.onPanResponderRelease(),
    });
  }

  componentDidMount() {
    const { addAnimateListener } = this.props;
    addAnimateListener && addAnimateListener(this.state.fadeAnim);
  }

  onResponderGrant = (e, gestureState) => {
    const { y0 } = gestureState;
    this.grantPointY = y0 >= this.state.childHeight ? this.state.childHeight : y0;
  };

  onResponderMove = (__, gestureState) => {
    const { moveY } = gestureState;
    const { touchEnableArea } = this.props;
    const { childHeight } = this.state;
    if (typeof this.grantPointY === 'undefined') {
      this.grantPointY = moveY;
    }
    if (
      this.grantPointY > sHeight - childHeight + touchEnableArea ||
      childHeight === 0 ||
      typeof childHeight === 'undefined' ||
      moveY < this.grantPointY
    )
      return;
    if (moveY >= sHeight - childHeight) {
      this.offset = this.grantPointY - moveY;
      this.state.fadeAnim.setValue(1 - Math.abs(this.offset) / childHeight);
    } else {
      this.offset = 0;
      this.state.fadeAnim.setValue(1);
    }
  };

  onPanResponderRelease = () => {
    const { touchEnableArea } = this.props;
    if (Math.abs(this.offset) < touchEnableArea && this.offset !== 0 && this.offset < 0) {
      this.onSlide(true);
    } else this.offset && this.onSlide(false);
  };

  onLayout = ({
    nativeEvent: {
      layout: { height },
    },
  }) => {
    this.setState({ childHeight: height });
  };

  onSlideAnimateStart = () => {
    const { onSlideAnimateEnd } = this.props;
    onSlideAnimateEnd && onSlideAnimateEnd();
  };

  onSlideAnimateEnd = () => {
    const { onSlideAnimateEnd } = this.props;
    onSlideAnimateEnd && onSlideAnimateEnd();
  };

  onSlide = (show = false) => {
    const { onClose, duration } = this.props;
    show && this.setState({ isShow: true });
    this.onSlideAnimateStart();
    Animated.timing(this.state.fadeAnim, {
      toValue: show ? 1 : 0,
      duration,
    }).start(({ finished }) => {
      if (finished) {
        this.onSlideAnimateEnd();
        !show && onClose && finished && onClose();
        !show && this.setState({ isShow: false });
      }
      finished && this.onSlideAnimateEnd();
    });
  };

  setNativeProps = (...args) => {
    this._modal && this._modal.setNativeProps(...args);
  };

  _modal: any;
  grantPointY: any;
  offset: number;
  _panResponder: any;
  _childPanResponder: any;

  render() {
    const { fadeAnim, childHeight } = this.state;
    if (!this.state.isShow) return <View />;

    return (
      <Animated.View
        style={[
          styles.mask,
          this.props.style,
          {
            zIndex: this.state.isShow ? 999 : -1,
          },
        ]}
      >
        <Animated.View
          {...this._panResponder.panHandlers}
          ref={ref => (this._modal = ref)}
          style={[
            styles.mask,
            this.props.style,
            {
              zIndex: this.state.isShow ? 1 : -1,
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              opacity: fadeAnim,
            },
          ]}
        />
        <Animated.View
          {...this._childPanResponder.panHandlers}
          style={[
            this.props.style,
            styles.content,
            {
              transform: [
                {
                  translateY: this.state.fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [childHeight, 0],
                  }),
                },
              ],
            },
          ]}
          onLayout={this.onLayout}
        >
          {this.props.children}
        </Animated.View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    alignSelf: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 10,
  },

  mask: {
    backgroundColor: `rgba(0, 0, 0, 0.6)`,
    overflow: 'hidden',
    ...StyleSheet.absoluteFillObject,
  },
});
