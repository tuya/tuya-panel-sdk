import React, { ReactElement, useEffect, useRef, useState } from 'react';
import {
  Animated,
  ViewStyle,
  PanResponder,
  PanResponderInstance,
  TextStyle,
  View,
} from 'react-native';
import { LinearGradient, Utils, TYText } from 'tuya-panel-kit';
import { Rect } from 'react-native-svg';
import { getLinearGradientParams } from './utils';
import { SlideChooseProps } from './interface';

const { convertX: cx } = Utils.RatioUtils;

interface useArrowsStyleReturn {
  styleArray: ViewStyle[];
  beginAnimation: () => void;
  stopAnimation: () => void;
}

export const useArrowsAnimator = (
  count: number,
  wrapperStyle: ViewStyle,
  openWaveAnimation = true
): useArrowsStyleReturn => {
  const arr = Array.from({ length: count });
  const waveAnimateRef = useRef<Animated.Value[]>(arr.map(() => new Animated.Value(0)));
  const initial = (op = 0.3) => {
    waveAnimateRef.current.forEach(item => item.setValue(op));
  };
  const beginAnimation = () => {
    initial();
    const animations = arr.map((_, index) =>
      Animated.timing(waveAnimateRef.current[index], {
        duration: 600,
        toValue: 1,
      })
    );

    Animated.stagger(500, animations).start(({ finished }) => {
      finished && beginAnimation();
    });
  };
  const stopAnimation = () => {
    waveAnimateRef.current.forEach(item => {
      item.stopAnimation();
    });
  };

  useEffect(() => {
    if (openWaveAnimation) {
      beginAnimation();
    } else {
      initial(1);
    }

    return () => {
      stopAnimation();
    };
  }, []);

  return {
    styleArray: waveAnimateRef.current.map(item => {
      return {
        ...wrapperStyle,
        opacity: (item as unknown) as number,
      };
    }),
    beginAnimation,
    stopAnimation,
  };
};

export const useLinearGradient = (
  leftColor: SlideChooseProps['leftColor'],
  rightColor: SlideChooseProps['rightColor'],
  width: number,
  height: number
) => {
  const dimension = { width, height };
  const { linearProps: leftLinearProps, stops: leftStops } = getLinearGradientParams(leftColor);
  const { linearProps: rightLinearProps, stops: rightStops } = getLinearGradientParams(rightColor);

  const leftElement = (
    <LinearGradient
      gradientId="GradientLeft"
      style={{ height: cx(52) }}
      {...leftLinearProps}
      stops={leftStops}
    >
      <Rect {...dimension} />
    </LinearGradient>
  );

  const rightElement = (
    <LinearGradient
      gradientId="GradientRight"
      style={{ height: cx(52) }}
      {...rightLinearProps}
      stops={rightStops}
    >
      <Rect {...dimension} />
    </LinearGradient>
  );

  return [leftElement, rightElement];
};

export const useHandleResponder = ({
  triggerDistance,
  onMoveEnd,
  onMove,
  barWidth,
  async,
  onTouchStart,
  circleRadius,
}: {
  triggerDistance: number;
  barWidth: number;
  async: boolean;
  circleRadius: number;
  onMoveEnd?: (toEnd: boolean | 'left' | 'right' | 'done', done?: () => void) => void;
  onMove?: (pos: number) => void;
  onTouchStart?: () => void;
}): {
  panResponder: PanResponderInstance;
  centerPos: Animated.Value;
  waiting: boolean;
} => {
  const limitDis = barWidth - circleRadius;
  const originPos = 0;
  const centerPoint = useRef<Animated.Value>(new Animated.Value(originPos)).current;
  const [waiting, setWaiting] = useState<boolean>(false);

  const onPanResponderGrant = () => {
    onTouchStart && onTouchStart();
  };

  const onPanResponderMove = (e: any, gestureState: { moveX: number; dx: number }) => {
    const prefix = gestureState.dx > 0 ? 1 : -1;
    const rangeDx = Math.abs(gestureState.dx) > limitDis ? prefix * limitDis : gestureState.dx;
    Animated.event([null, { dx: centerPoint }])(e, {
      ...gestureState,
      dx: rangeDx,
    });
    onMove && onMove(rangeDx);
  };

  const goBackCenter = () => {
    Animated.spring(centerPoint, { toValue: originPos }).start();
  };

  const onPanResponderEnd = (e: any, gestureState: { dx: number }) => {
    const isEnd = Math.abs(gestureState.dx) >= limitDis - triggerDistance;
    const isLeft = gestureState.dx < 0;

    if (isEnd) {
      setWaiting(true);

      if (async) {
        onMoveEnd &&
          onMoveEnd(isLeft ? 'left' : 'right', () => {
            setWaiting(false);
            goBackCenter();
            onMoveEnd('done');
          });
      } else {
        setWaiting(false);
        goBackCenter();
        onMoveEnd && onMoveEnd(isLeft ? 'left' : 'right');
      }
    } else {
      goBackCenter();
      onMoveEnd && onMoveEnd(false);
    }
  };

  const onStartShouldSetPanResponder = () => true;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder, // 建立监视器
      onPanResponderMove, // 移动
      onPanResponderEnd, // 结束
      onPanResponderGrant,
    })
  ).current;

  /** waiting 禁止拖动 */
  panResponder.panHandlers.onStartShouldSetResponder = () => !waiting;

  return {
    panResponder,
    centerPos: centerPoint,
    waiting,
  };
};

export const useBtnText = (text: string | ReactElement, style?: TextStyle) => {
  if (typeof text === 'string') {
    return (
      <TYText
        testID="btn-text"
        style={{
          fontSize: 14,
          fontWeight: 'bold',
          ...style,
        }}
      >
        {text}
      </TYText>
    );
  }
  return (
    <View style={{ ...style, width: cx(28), height: cx(28), overflow: 'hidden' }}>{text}</View>
  );
};
