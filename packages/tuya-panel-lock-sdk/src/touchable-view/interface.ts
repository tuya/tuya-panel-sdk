import {
  StyleProp,
  ViewStyle,
  GestureResponderEvent,
  PanResponderGestureState,
} from 'react-native';

export type ICoordinate = {
  x: number;
  y: number;
};

export const IDefaultProps = {
  // 长按判定时间 (ms)
  longPressTestTime: 500,
  // 滑动判定距离
  moveTestDistance: 5,
  // 滑动方向判定距离
  moveTestDirectionDistance: 10,
  // 滑动响应节流时间 (ms)
  moveThrottleTime: 10,
  // 是否在未得到有效滑动方向(X、Y)时一直判定
  isTillDirection: false,
  // 是否捕获事件 (捕获后子事件View将不可响应)
  isCapture: false,
  // 是否在非捕获事件下可被其他手势终止事件 (一般在事件View叠加或交叉时会触发)
  isTermination: false,
  // 被其他手势终止事件后是否提交响应结果
  isReleaseTerminated: true,
  // 按下是否判定滑动
  isPressTestMove: false,
  // 是否禁用
  isDisable: false,
  // X轴滑动判定角度 (相对X轴线为0度)
  xTestAngle: 45,
  // Y轴滑动判定角度 (相对Y轴线为0度; 优先级高于X轴滑动判定角度)
  yTestAngle: 45,
};

export type ITouchableViewProps = {
  // view 样式
  style?: StyleProp<ViewStyle>;
  /**
   * 按下开始
   * @param evt
   * @param gestureState
   */
  onPressIn?: (evt: GestureResponderEvent, gestureState: PanResponderGestureState) => void;
  /**
   * 按下结束
   * @param evt
   * @param gestureState
   */
  onPressOut?: (evt: GestureResponderEvent, gestureState: PanResponderGestureState) => void;
  /**
   * 按下
   * @param evt
   * @param gestureState
   */
  onPress?: (evt: GestureResponderEvent, gestureState: PanResponderGestureState) => void;
  /**
   * 长按
   * @param evt
   * @param gestureState
   */
  onLongPress?: (evt: GestureResponderEvent, gestureState: PanResponderGestureState) => void;
  /**
   * 滑动开始
   * @param evt
   * @param gestureState
   */
  onMoveStart?: (evt: GestureResponderEvent, gestureState: PanResponderGestureState) => void;
  /**
   * 滑动
   * @param evt
   * @param gestureState
   */
  onMove?: (evt: GestureResponderEvent, gestureState: PanResponderGestureState) => void;
  /**
   * 长按滑动
   * @param evt
   * @param gestureState
   */
  onLongMove?: (evt: GestureResponderEvent, gestureState: PanResponderGestureState) => void;
  /**
   * X轴滑动开始
   * @param evt
   * @param gestureState
   */
  onMoveXStart?: (evt: GestureResponderEvent, gestureState: PanResponderGestureState) => void;
  /**
   * 向左滑动开始
   * @param evt
   * @param gestureState
   */
  onMoveLeftStart?: (evt: GestureResponderEvent, gestureState: PanResponderGestureState) => void;
  /**
   * 向右滑动开始
   * @param evt
   * @param gestureState
   */
  onMoveRightStart?: (evt: GestureResponderEvent, gestureState: PanResponderGestureState) => void;
  /**
   * X轴滑动
   * @param evt
   * @param gestureState
   */
  onMoveX?: (evt: GestureResponderEvent, gestureState: PanResponderGestureState) => void;
  /**
   * 长按X轴滑动
   * @param evt
   * @param gestureState
   */
  onLongMoveX?: (evt: GestureResponderEvent, gestureState: PanResponderGestureState) => void;
  /**
   * Y轴滑动开始
   * @param evt
   * @param gestureState
   */
  onMoveYStart?: (evt: GestureResponderEvent, gestureState: PanResponderGestureState) => void;
  /**
   * 向上滑动开始
   * @param evt
   * @param gestureState
   */
  onMoveUpStart?: (evt: GestureResponderEvent, gestureState: PanResponderGestureState) => void;
  /**
   * 向下滑动开始
   * @param evt
   * @param gestureState
   */
  onMoveDownStart?: (evt: GestureResponderEvent, gestureState: PanResponderGestureState) => void;
  /**
   * Y轴滑动
   * @param evt
   * @param gestureState
   */
  onMoveY?: (evt: GestureResponderEvent, gestureState: PanResponderGestureState) => void;
  /**
   * 长按Y轴滑动
   * @param evt
   * @param gestureState
   */
  onLongMoveY?: (evt: GestureResponderEvent, gestureState: PanResponderGestureState) => void;
} & Partial<typeof IDefaultProps>;
