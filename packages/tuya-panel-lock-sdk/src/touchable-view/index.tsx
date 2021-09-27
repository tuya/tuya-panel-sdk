import React, { FC, memo, useRef } from 'react';
import {
  View,
  PanResponder,
  PanResponderInstance,
  GestureResponderEvent,
  PanResponderGestureState,
} from 'react-native';
import { ITouchableViewProps, IDefaultProps, ICoordinate } from './interface';

const TouchableView: FC<ITouchableViewProps> = ({
  children,
  longPressTestTime,
  moveTestDistance,
  moveTestDirectionDistance,
  moveThrottleTime,
  isTillDirection,
  isCapture,
  isTermination,
  isReleaseTerminated,
  isPressTestMove,
  isDisable,
  xTestAngle,
  yTestAngle,
  style,
  onPressIn,
  onPressOut,
  onPress,
  onLongPress,
  onMoveStart,
  onMove,
  onLongMove,
  onMoveXStart,
  onMoveLeftStart,
  onMoveRightStart,
  onMoveX,
  onLongMoveX,
  onMoveYStart,
  onMoveUpStart,
  onMoveDownStart,
  onMoveY,
  onLongMoveY,
}) => {
  // 是否开始
  let isStart = useRef<boolean>(false).current;
  // 按下坐标
  let pressInCoordinate = useRef<ICoordinate>({ x: 0, y: 0 }).current;
  // 长按判定定时器
  let longPressTestTimer = useRef<number | null>(null).current;
  // 是否长按
  let isLongPress = useRef<boolean>(false).current;
  // 滑动方向 ['X', 'Y', false, true]
  let moveDirection = useRef<string | boolean>(false).current;
  // 滑动时间记录
  let moveTime = useRef<number>(0).current;
  // 是否滑动
  let isMove = useRef<boolean>(false).current;
  // 是否被其他手势终止事件
  let isTerminated = useRef<boolean>(false).current;

  const panResponder = useRef<PanResponderInstance>(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !isDisable,

      onMoveShouldSetPanResponder: () => !isDisable,

      onStartShouldSetPanResponderCapture: () => isCapture,

      onMoveShouldSetPanResponderCapture: () => isCapture,

      onPanResponderGrant: (evt: GestureResponderEvent, gestureState: PanResponderGestureState) => {
        isStart = true;
        isLongPress = false;
        moveDirection = false;
        isMove = false;
        isTerminated = false;
        pressInCoordinate = { x: evt.nativeEvent.pageX, y: evt.nativeEvent.pageY };

        const evtRecord = { ...evt };
        const gestureStateRecord = { ...gestureState };

        _clearLongPressTestTimer();
        /* istanbul ignore next */
        longPressTestTimer = setTimeout(() => {
          if (!isMove && (isReleaseTerminated || !isTerminated)) {
            // 长按
            onLongPress && onLongPress(evtRecord, gestureStateRecord);
            isLongPress = true;
          }
        }, longPressTestTime);
        // 按下开始
        onPressIn && onPressIn(evt, gestureState);
      },

      onPanResponderMove: (evt: GestureResponderEvent, gestureState: PanResponderGestureState) => {
        const currentMoveTime = moveTime;
        moveTime = new Date().getTime();
        if (moveTime - currentMoveTime <= moveThrottleTime) {
          return;
        }

        const coordinate = { x: evt.nativeEvent.pageX, y: evt.nativeEvent.pageY };
        if (!isMove) {
          isMove =
            (coordinate.y - pressInCoordinate.y) ** 2 + (coordinate.x - pressInCoordinate.x) ** 2 >=
            moveTestDistance ** 2;
          if (isMove) {
            // 滑动开始
            onMoveStart && onMoveStart(evt, gestureState);
          }
        }
        /* istanbul ignore next */
        switch (moveDirection) {
          // X轴滑动
          case 'X':
            onMoveX && onMoveX(evt, gestureState);
            if (isLongPress) {
              // 长按X轴滑动
              onLongMoveX && onLongMoveX(evt, gestureState);
            }
            break;
          // Y轴滑动
          case 'Y':
            onMoveY && onMoveY(evt, gestureState);
            if (isLongPress) {
              // 长按Y轴滑动
              onLongMoveY && onLongMoveY(evt, gestureState);
            }
            break;
          // 未判定滑动方向
          case false:
            if (
              isMove &&
              (coordinate.y - pressInCoordinate.y) ** 2 +
                (coordinate.x - pressInCoordinate.x) ** 2 >=
                moveTestDirectionDistance ** 2
            ) {
              // 斜率
              const slope =
                (coordinate.y - pressInCoordinate.y) / (coordinate.x - pressInCoordinate.x);
              // 角度
              const angle = Math.atan(Math.abs(slope)) * (180 / Math.PI);
              if (yTestAngle >= 90 - angle) {
                moveDirection = 'Y';
                if (gestureState.dy > 0) {
                  // 向下滑动开始
                  onMoveDownStart && onMoveDownStart(evt, gestureState);
                } else {
                  // 向上滑动开始
                  onMoveUpStart && onMoveUpStart(evt, gestureState);
                }
                // Y轴滑动开始
                onMoveYStart && onMoveYStart(evt, gestureState);
                // Y轴滑动
                onMoveY && onMoveY(evt, gestureState);
              } else if (angle <= xTestAngle) {
                moveDirection = 'X';
                if (gestureState.dx > 0) {
                  // 向右滑动开始
                  onMoveRightStart && onMoveRightStart(evt, gestureState);
                } else {
                  // 向左滑动开始
                  onMoveLeftStart && onMoveLeftStart(evt, gestureState);
                }
                // X轴滑动开始
                onMoveXStart && onMoveXStart(evt, gestureState);
                // X轴滑动
                onMoveX && onMoveX(evt, gestureState);
              } else if (!isTillDirection) {
                // 已判定滑动方向
                moveDirection = true;
              }
            }
            break;
          default:
            moveDirection = true;
        }

        if (isMove) {
          // 滑动
          /* istanbul ignore next */
          onMove && onMove(evt, gestureState);

          if (isLongPress) {
            // 长按滑动
            onLongMove && onLongMove(evt, gestureState);
          }
        }
      },

      onPanResponderRelease: (
        evt: GestureResponderEvent,
        gestureState: PanResponderGestureState
      ) => {
        _onPressOut(evt, gestureState);
        isStart = false;
      },

      onPanResponderTerminationRequest: () => (isTermination && !isCapture) || isDisable,

      onPanResponderTerminate: (
        evt: GestureResponderEvent,
        gestureState: PanResponderGestureState
      ) => {
        isTerminated = true;
        /* istanbul ignore next */
        if (isReleaseTerminated) {
          _onPressOut(evt, gestureState);
        }
        isStart = false;
      },
    })
  ).current;

  /**
   * 清除长按判定定时器
   */
  const _clearLongPressTestTimer = () => {
    if (longPressTestTimer) {
      clearTimeout(longPressTestTimer);
      longPressTestTimer = null;
    }
  };

  /**
   * 按下结束
   * @param evt
   * @param gestureState
   * @private
   */
  const _onPressOut = (evt: GestureResponderEvent, gestureState: PanResponderGestureState) => {
    _clearLongPressTestTimer();
    if (!isStart) return;

    if (!isPressTestMove || !isMove) {
      // 按下
      onPress && onPress(evt, gestureState);
    }
    // 按下结束
    onPressOut && onPressOut(evt, gestureState);
  };

  return (
    <View style={style} {...panResponder.panHandlers}>
      {children}
    </View>
  );
};

TouchableView.defaultProps = IDefaultProps;

export default memo(TouchableView);
