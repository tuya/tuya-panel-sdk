/* eslint-disable no-shadow */
/*
 * 使用须知！！
 * 目前是以正北方向为基准，后续有时间再扩展任意角度基准
 * 父元素必须是RN面板最根视图，后续有时间再扩展
 */
import PropTypes from 'prop-types';
import React, { FC, useEffect, useState, MutableRefObject, useRef } from 'react';
import { View, Image, StyleProp, ViewStyle, Animated, ViewPropTypes } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { Utils } from 'tuya-panel-kit';
import res from './res';

const { convertX: cx } = Utils.RatioUtils;
interface IOnlieProp {
  /*
   * 旋转正北方向角度rotate
   * 旋转相对方向direction
   * 当前X坐标xNow
   * 当前Y坐标yNow
   */
  changeRotate?: (rotate: number, direction: string, xNow: number, yNow: number) => void;
  /*
   * PanGestureHandler的Ref
   */
  driveRef?: MutableRefObject<null>;
  /*
   * 旋转最外层样式
   */
  wheelStyle?: StyleProp<ViewStyle>;
  /*
   * 插入PanGestureHandler的旋转内部元素
   */
  childrenProps?: React.ReactNode;
  /*
   * 父元素相对于屏幕左边的偏移量 !!!因为PanGestureHandler输出的是相对于屏幕的位置，所以必须要传调用组件父元素相对于屏幕的位置
   */
  leftPart?: number;
  /*
   * 父元素相对于屏幕顶部的偏移量
   */
  topPart?: number;
}

const Wheel: FC<IOnlieProp> = ({
  wheelStyle,
  changeRotate,
  driveRef,
  childrenProps,
  leftPart,
  topPart,
}) => {
  const wheelLeftRef = useRef(null);
  // 转动的角度
  const [ang, setAng] = useState<number>(0);
  // dp=>左1右2正方向0
  const [rotate, setRotate] = useState<string>('on');

  // 开始按下转动的初始角度
  const [angStart, setAngStart] = useState<number>(0);

  const [ctrl, setCtrl] = useState<boolean>(false);
  // 手势状态
  const [state, setState] = useState<string>('');
  // 中心点
  const [center, setCenter] = useState<any>({});
  const [centerX, setCenterX] = useState<any>({});
  const [centerY, setCenterY] = useState<any>({});

  const [positionX, setPositionX] = useState<number>(0);
  const [positionY, setPositionY] = useState<number>(0);

  const beforeref = useRef(0);

  const popFirst = useRef(false);

  const onHandlerStateChange = ({ nativeEvent }) => {
    switch (nativeEvent.state) {
      case State.UNDETERMINED:
        setState('pedding');
        break;
      case State.BEGAN:
        down(nativeEvent.absoluteX, nativeEvent.absoluteY);
        setState('start');
        // 将单步数据记录
        // 清空单步数据
        break;
      case State.CANCELLED:
        stop();
        setState('cancel');
        break;
      case State.ACTIVE:
        setState('active');
        break;
      case State.END:
        stop();
        setState('end');
        break;
      case State.FAILED:
        stop();
        setState('fail');
        break;
      default:
        setState('other');
        break;
    }
  };

  const _onPanGestureEvent = ({ nativeEvent }) => {
    const { width, height } = center;
    const { x, y } = nativeEvent;
    const cnx = width / 2;
    const cy = height / 2;
    const a = Math.abs(cnx - x);
    const b = Math.abs(cy - y);
    const re = Math.sqrt(a * a + b * b);

    // 超出画板范围禁止绘制
    if (re > cnx + 10 || re < cnx / 2 + 5) {
      return;
    }
    if (state === 'active') {
      move(nativeEvent.absoluteX, nativeEvent.absoluteY);
    }
  };

  const getAngle = (xNow: number, yNow: number) => {
    // 圆周上任意2点之间的弧度公式：θ=arctan[(y2-y0)/(x2-x0)]-arctan[(y1-y0)/(x1-x0)]
    const radian1 = Math.atan2(yNow - centerY, xNow - centerX); // 指定坐标点弧度
    const radian0 = 0; // 默认为正北方向弧度

    const angle = (radian1 - radian0) / (Math.PI / 180); // 弧度转角度
    return Number(angle.toFixed(2));
  };

  const roate = (x: number, y: number) => {
    // 旋转角度，即当前坐标点与鼠标按下左键时的抓点的夹角
    const angle = getAngle(x, y);
    return angle - angStart;
  };

  const down = (xNow: number, yNow: number) => {
    let angle0 = 0;
    angle0 = getAngle(xNow, yNow);
    // 指定坐标点与正北方向的夹角
    setAngStart(angle0);
    // beforeref.current = angle0;
    setCtrl(true);
  };

  const move = (xNow: number, yNow: number) => {
    setPositionX(xNow);
    setPositionY(yNow);
    if (ctrl) {
      const angs = roate(xNow, yNow);
      if (!popFirst.current) {
        // 去掉down的第一个点
        beforeref.current = angs;
        popFirst.current = true;
        return;
      }
      if (beforeref.current === angs) {
        // 过滤掉没有变化的
        setAng(angs);
        return;
      }
      if (beforeref.current === 0) {
        // 正负值突变
        setRotate(angs > 0 ? 'right' : 'left');
        beforeref.current = angs;
        setAng(angs);
        return;
      }

      if (beforeref.current * angs > 0) {
        // 角度变大
        setRotate(beforeref.current > angs ? 'left' : 'right');
        beforeref.current = angs;
        setAng(angs);
      } else {
        // 角度变小
        beforeref.current = angs;
        setAng(angs);
      }
    }
  };

  const stop = () => {
    if (ctrl) {
      setAng(0);
      beforeref.current = 0;
      setRotate('on');
      setPositionX(0);
      setPositionY(0);
      setCtrl(false);
    }
  };

  const _onLayout = (e: {
    nativeEvent: { layout: { x: any; y: any; width: any; height: any } };
  }) => {
    // 指定坐标点与正北方向的夹角
    const { x, y, width, height } = e.nativeEvent.layout;

    // 中心点
    const centerx = x + width / 2 + leftPart;
    const cy = y + height / 2 + topPart;
    setCenterX(centerx);
    setCenterY(cy);
    setCenter(e.nativeEvent.layout);
  };

  useEffect(() => {
    changeRotate && changeRotate(ang, rotate, positionX, positionY);
  }, [ang]);

  return (
    <View style={wheelStyle} onLayout={e => _onLayout(e)}>
      <PanGestureHandler
        ref={driveRef}
        simultaneousHandlers={wheelLeftRef}
        onHandlerStateChange={e => onHandlerStateChange(e)}
        onGestureEvent={e => _onPanGestureEvent(e)}
      >
        <Animated.View
          style={{
            transform: [{ rotate: `${ang}deg` }],
          }}
        >
          {!childrenProps && (
            <Image source={res.driver_wheel} style={{ width: cx(167), height: cx(167) }} />
          )}
          {childrenProps}
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

Wheel.propTypes = {
  wheelStyle: ViewPropTypes.style,
  changeRotate: PropTypes.func,
  driveRef: PropTypes.any,
  childrenProps: PropTypes.node,
  leftPart: PropTypes.number,
  topPart: PropTypes.number,
};

Wheel.defaultProps = {
  wheelStyle: { width: cx(167), height: cx(167) },
  changeRotate: () => {},
  driveRef: null,
  childrenProps: undefined,
  leftPart: 0,
  topPart: 0,
};

export default Wheel;
