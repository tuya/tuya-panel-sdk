/* eslint-disable react/prop-types */
/*
 * 使用须知！！
 * 目前是以正北方向为基准，后续有时间再扩展任意角度基准
 * 父元素必须是RN面板最根视图，后续有时间再扩展
 */
import React, { FC, useEffect, useState, MutableRefObject, useRef } from 'react';
import { View, Image, StyleProp, ViewStyle, Animated, Platform } from 'react-native';
// import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { Utils } from 'tuya-panel-kit';
import res from './res';

const { convertX: cx } = Utils.RatioUtils;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IOnlieProp {
  /*
   * 旋转角度
   */
  changeRotate?: (rotate: number) => void;
  /*
   * PanGestureHandler的Ref
   */
  driveRef?: MutableRefObject<null>;
  /*
   * 旋转最外层样式
   */
  wheelStyle?: StyleProp<ViewStyle>;
  /*
   * 左转最大角度
   */
  maxLeftAng?: number;
  /*
   * 右转最大角度
   */
  maxRightAng?: number;
  /*
   * 插入PanGestureHandler的旋转内部元素
   */
  childrenProps?: React.ReactNode;
}

const Wheel: FC<IOnlieProp> = props => {
  const {
    wheelStyle = { width: cx(167), height: cx(167) },
    changeRotate,
    driveRef,
    childrenProps,
    maxLeftAng = 90,
    maxRightAng = 90,
  } = props;

  const maxLeft = Math.abs(maxLeftAng);
  const maxRight = Math.abs(maxRightAng);
  const wheelLeftRef = useRef(null);
  // 转动的角度
  const [ang, setAng] = useState<number>(0);

  // 开始按下转动的初始角度
  const [angStart, setAngStart] = useState<number>(0);

  const [ctrl, setCtrl] = useState<boolean>(false);
  // 手势状态
  const [state, setState] = useState<string>('');
  // 中心点
  const [center, setCenter] = useState<any>({});

  // const onHandlerStateChange = ({ nativeEvent }) => {
  //   switch (nativeEvent.state) {
  //     case State.UNDETERMINED:
  //       setState('pedding');
  //       break;
  //     case State.BEGAN:
  //       down(nativeEvent.absoluteX, nativeEvent.absoluteY);
  //       setState('start');
  //       // 将单步数据记录
  //       // 清空单步数据
  //       break;
  //     case State.CANCELLED:
  //       stop();
  //       setState('cancel');
  //       break;
  //     case State.ACTIVE:
  //       setState('active');
  //       break;
  //     case State.END:
  //       stop();
  //       setState('end');
  //       break;
  //     case State.FAILED:
  //       stop();
  //       setState('fail');
  //       break;
  //     default:
  //       setState('other');
  //       break;
  //   }
  // };

  const _onPanGestureEvent = ({ nativeEvent }) => {
    const { width, height } = center;
    const { x, y } = nativeEvent;
    const centerx = width / 2;
    const centery = height / 2;
    const a = Math.abs(centerx - x);
    const b = Math.abs(centery - y);
    const re = Math.sqrt(a * a + b * b);
    // 安卓的re > cx || re < cx / 2会为ture，所以去掉
    // 超出画板范围禁止绘制
    if (Platform.OS !== 'android' && (re > centerx || re < centerx / 2)) {
      return;
    }
    if (state === 'active') {
      move(nativeEvent.absoluteX, nativeEvent.absoluteY);
    }
  };

  const getAngle = (xNow: number, yNow: number) => {
    // 指定坐标点与正北方向的夹角
    const { x, y, width, height } = center;

    // 相对于手机视图的实际中心点位置
    const cClientx = x + width / 2;
    const cClienty = y + height / 2;

    // 圆周上任意2点之间的弧度公式：θ=arctan[(y2-y0)/(x2-x0)]-arctan[(y1-y0)/(x1-x0)]
    const radian1 = Math.atan((yNow - cClienty) / (xNow - cClientx)); // 指定坐标点弧度
    const radian0 = 0; // 正北方向弧度
    let angle = ((radian1 - radian0) * 180) / Math.PI; // 弧度转角度

    if (xNow < cClientx) {
      // 指定坐标点落在第2、3象限，
      angle += 180;
    }
    return angle;
  };

  const roate = (x: number, y: number) => {
    // 旋转角度，即当前坐标点与鼠标按下左键时的抓点的夹角
    const angle = getAngle(x, y);
    return angle - angStart;
  };

  const down = (x: number, y: number) => {
    const angle0 = getAngle(x, y);
    setAngStart(angle0);
    setCtrl(true);
  };

  const move = (x: number, y: number) => {
    if (ctrl) {
      const angs = roate(x, y);
      if (Math.abs(angs) > 180) {
        setAng(angs > 0 ? maxRight : -maxLeft);
      } else if (angs >= maxRight) {
        setAng(maxRight);
      } else if (angs <= -maxLeft) {
        setAng(-maxLeft);
      } else {
        setAng(angs);
      }
    }
  };

  const stop = () => {
    if (ctrl) {
      setCtrl(false);
      setAng(0);
    }
  };

  // 基于手机视图
  const _onLayout = (e: {
    nativeEvent: { layout: { x: any; y: any; width: any; height: any } };
  }) => {
    setCenter(e.nativeEvent.layout);
  };

  useEffect(() => {
    changeRotate && changeRotate(ang);
  }, [ang]);

  return (
    <View style={wheelStyle} onLayout={e => _onLayout(e)}>
      {/* <PanGestureHandler
        minDist={5}
        ref={driveRef}
        simultaneousHandlers={wheelLeftRef}
        onHandlerStateChange={e => onHandlerStateChange(e)}
        onGestureEvent={e => _onPanGestureEvent(e)}
      >
      </PanGestureHandler> */}
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
    </View>
  );
};

export default Wheel;
