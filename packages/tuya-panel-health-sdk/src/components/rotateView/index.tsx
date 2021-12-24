import React, { FC, useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { RotateViewProps } from './interface';
import useMergeProps from '../utils/hooks/useMergeProps';

const defaultProps: RotateViewProps = {
  duration: 5000,
  useNativeDriver: true,
  isInteraction: true,
  active: false,
  children: '',
};

const RotateView: FC<RotateViewProps> = baseProps => {
  const props = useMergeProps<RotateViewProps>(baseProps, defaultProps);
  const { active, duration, useNativeDriver, isInteraction, style, children } = props;
  const animation = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (active) {
      start();
    }
    return () => {
      stop();
    };
  }, [active]);

  const start = () => {
    Animated.loop(
      Animated.timing(animation, {
        toValue: 1,
        duration,
        easing: Easing.linear,
        useNativeDriver,
        isInteraction,
      })
    ).start();
  };

  const stop = () => {
    animation.setValue(0);
    animation.stopAnimation();
  };

  return (
    <Animated.View
      style={[
        // styles.container,
        style,
        {
          transform: [
            {
              rotate: animation.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg'],
              }),
            },
          ],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
};

export default RotateView;
