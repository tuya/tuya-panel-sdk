/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useRef, useCallback, RefForwardingComponent, useImperativeHandle } from 'react';
import { View, StyleSheet, Animated, ViewStyle } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const VIEWBOX_WIDTH = 100;
const HALF_VIEWBOX_WIDTH = VIEWBOX_WIDTH / 2;
const DEFAULT_STROKE_WIDTH = 2;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const viewBox = `0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_WIDTH}`;

export interface AnimatedCircleProgessProps {
  /**
   * 进度圈的大小
   */
  size?: number;
  /**
   * 进度执行的时长，毫秒为单位
   */
  duration?: number;
  /**
   * 进度环颜色
   */
  color?: string;

  style?: ViewStyle;
}

// 定义进度环动画组件对外暴露的接口 start、rest
export interface AnimatedCircleProgessHandles {
  start(): void;
  rest(): void;
}

const AnimatedCircleProgess: RefForwardingComponent<
  AnimatedCircleProgessHandles,
  AnimatedCircleProgessProps
> = ({ size = 100, duration = 2000, color = 'pink', style }, ref) => {
  const progAnim = useRef(new Animated.Value(0)).current;
  const radius = HALF_VIEWBOX_WIDTH - DEFAULT_STROKE_WIDTH / 2;

  const start = () => {
    Animated.timing(progAnim, {
      toValue: 1,
      duration,
      useNativeDriver: false,
    }).start(finished => {});
  };

  /** 放手重置 */
  const rest = () => {
    Animated.timing(progAnim, {
      toValue: 0,
      duration,
      useNativeDriver: false,
    }).start(finished => {});
  };

  /**
   * 直接结束
   */
  const stop = () => {
    Animated.timing(progAnim, {
      toValue: 0,
      duration,
      useNativeDriver: false,
    }).stop();
  };

  useImperativeHandle(ref, () => {
    return {
      start,
      rest,
      stop,
    };
  });

  const computeStrokeDashOffset = useCallback(() => {
    return Animated.multiply(
      progAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [2 * Math.PI, 0],
      }),
      radius
    );
  }, []);

  return (
    <View style={{ width: size, height: size }}>
      <Svg
        viewBox={viewBox}
        style={[
          styles.svgBox,
          {
            transform: [{ rotate: '-90deg' }],
          },
          style,
        ]}
      >
        <AnimatedCircle
          stroke={color}
          fill="none"
          cx={HALF_VIEWBOX_WIDTH}
          cy={HALF_VIEWBOX_WIDTH}
          r={radius}
          strokeWidth={DEFAULT_STROKE_WIDTH}
          strokeDasharray={[Math.PI * 2 * radius, Math.PI * 2 * radius]}
          strokeDashoffset={computeStrokeDashOffset()}
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  svgBox: {
    height: '100%',
    position: 'relative',
    width: '100%',
  },
});

export default React.forwardRef(AnimatedCircleProgess);
