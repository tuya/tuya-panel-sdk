import React, { FC, useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { Utils } from 'tuya-panel-kit';

import { BreatheViewProps } from './interface';
import useMergeProps from '../../hooks/useMergeProps';

const { convertX: cx } = Utils.RatioUtils;

const defaultProps: BreatheViewProps = {
  duration: 1500,
  useNativeDriver: false,
};

const BreatheView: FC<BreatheViewProps> = baseProps => {
  const props = useMergeProps<BreatheViewProps>(baseProps, defaultProps);
  const { active, duration, useNativeDriver, style, children } = props;

  const animation = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    if (active) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animation, {
            toValue: 0.2,
            duration,
            useNativeDriver,
          }),
          Animated.timing(animation, {
            toValue: 1,
            duration,
            useNativeDriver,
          }),
        ])
      ).start();
    } else {
      animation.stopAnimation();
      animation.setValue(1);
    }
  }, [active, animation]);

  return (
    <Animated.View
      style={[
        style,
        {
          opacity: animation,
        },
      ]}
    >
      {children}
    </Animated.View>
  );
};

export default BreatheView;
