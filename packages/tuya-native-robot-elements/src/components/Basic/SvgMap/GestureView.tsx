import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  PanResponder,
  Animated,
  PanResponderInstance,
  PanResponderGestureState,
  GestureResponderEvent,
} from 'react-native';

import _debounce from 'lodash/debounce';
import _memoize from 'lodash/memoize';

interface IProps {
  maximumZoomScale: number;
  minimumZoomScale: number;
}

interface IState {
  // panResponder: PanResponderInstance;
  // position: Animated.ValueXY;
  // scale: Animated.Value;
}

class GestureView extends Component<IProps, IState> {
  offsetX = 0;
  offsetY = 0;

  isScaleGesture = false;
  originScale = 1;
  grantDoubleDistance = 0;
  doubleDistance = 0;
  doubleDistanceMovingOffset = 0;

  viewWidth = 0;
  viewHeight = 0;

  grantId = 0;

  panResponder: PanResponderInstance;

  positionAnimate: Animated.ValueXY;
  scaleAnimate: Animated.Value;

  static defaultProps = {
    maximumZoomScale: 2,
    minimumZoomScale: 1,
  };

  constructor(props: IProps) {
    super(props);
    const position = new Animated.ValueXY();
    const scale = new Animated.Value(this.originScale);

    // this.state = { position, scale };
    this.positionAnimate = position;
    this.scaleAnimate = scale;
    this.createResponder();
  }

  createResponder() {
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: (event, gesture) => {
        this.grantId++;
      },
      onPanResponderMove: (event, gesture) => {
        if (this.isDoubleTouch(gesture)) {
          this.isScaleGesture = true;

          this.grantDoubleDistance = this.onceDoubleInitial(this.grantId, event);
          const doubleDistance = this.getDoubleTouchDistance(event);
          const curDistance = doubleDistance - this.grantDoubleDistance;

          const nextScale = this.doubleDistanceToScale(curDistance + this.doubleDistance);
          if (nextScale > this.props.minimumZoomScale && nextScale < this.props.maximumZoomScale) {
            // 倍数在大于0时，才记录数据
            this.doubleDistanceMovingOffset = curDistance;
            this.originScale = nextScale;
            this.scaleAnimate.setValue(this.originScale);
          }

          // return;
        }

        const dx = this.offsetX + gesture.dx;
        const dy = this.offsetY + gesture.dy;
        const nextPosition = { x: dx, y: dy };
        const maxDx = this.viewWidth / 2;
        const maxDy = this.viewHeight / 2;

        // 处理平移时越界
        if (Math.abs(dx) > maxDx) {
          dx > 0 && (nextPosition.x = maxDx);
          dx < 0 && (nextPosition.x = -maxDx);
        }
        if (Math.abs(dy) > maxDy) {
          dy > 0 && (nextPosition.y = maxDy);
          dy < 0 && (nextPosition.y = -maxDy);
        }

        (nextPosition.x || nextPosition.y) && this.positionAnimate.setValue(nextPosition);
      },
      onPanResponderRelease: (event, gesture) => {
        this.offsetX += gesture.dx;
        this.offsetY += gesture.dy;

        // 缩放后处理
        if (this.isScaleGesture) {
          // 如果缩放超过界限
          if (this.originScale < this.props.minimumZoomScale) {
            this.originScale = this.props.minimumZoomScale;
            this.scaleAnimate.setValue(this.originScale);
            // return;
          }
          if (this.originScale > this.props.maximumZoomScale) {
            this.originScale = this.props.maximumZoomScale;
            this.scaleAnimate.setValue(this.originScale);
            // return;
          }
          this.doubleDistance += this.doubleDistanceMovingOffset;
          this.isScaleGesture = false;
        }
      },
    });

    this.panResponder = panResponder;
  }

  isDoubleTouch(gestureState: PanResponderGestureState) {
    return gestureState.numberActiveTouches === 2;
  }

  doubleDistanceToScale(distance: number) {
    return distance / this.viewWidth + 1;
  }

  getDoubleTouchDistance(e: GestureResponderEvent) {
    const distance = Math.sqrt(
      Math.pow(e.nativeEvent.touches[0].pageX - e.nativeEvent.touches[1].pageX, 2) +
        Math.pow(e.nativeEvent.touches[0].pageY - e.nativeEvent.touches[1].pageY, 2)
    );
    return distance;
  }

  onLayout = (e: any) => {
    if (this.viewHeight <= 0 && e) {
      this.viewHeight = e.nativeEvent.layout.height;
      this.viewWidth = e.nativeEvent.layout.width;
    }
  };

  onceDoubleInitial = _memoize(
    (id, e) => {
      return this.getDoubleTouchDistance(e);
    },
    id => id
  );

  render() {
    const { children } = this.props;
    // const { position, scale } = this.state;

    const handles = this.panResponder ? this.panResponder.panHandlers : {};
    return (
      <View style={style.root}>
        <Animated.View
          style={[this.positionAnimate.getLayout(), { transform: [{ scale: this.scaleAnimate }] }]}
        >
          {children}
        </Animated.View>
        <View style={style.fullView} onLayout={this.onLayout} {...handles} />
      </View>
    );
  }
}
export default GestureView;

const style = StyleSheet.create({
  root: {
    flex: 1,
  },
  fullView: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
