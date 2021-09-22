import React, { useRef, useEffect } from 'react';
import { Animated, Easing } from 'react-native';
import { AnimatedNumberProps } from './interface';
import AnimatedText from './text-animated';

const calculateValues = (end: number, values: number[], duration: number, speed: number) => {
  const num = ~~(duration / speed);
  const len = values.length;
  const index = values.findIndex(x => x === end);
  return Array(num)
    .fill(1)
    .map((_, idx) => {
      const i = (index + num * len - idx) % len;
      return values[i];
    })
    .reverse();
};

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  loop = false,
  end = 9,
  duration = 1000,
  speed = 100,
  values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  onStart = () => {},
  onEnd = () => {},
  onLoop = () => {},
  ...other
}) => {
  let _canAnimation = useRef<boolean>(true).current;
  const displayIndex = useRef(new Animated.Value(0)).current;
  const displayValues = useRef(calculateValues(end, values, duration, speed)).current;

  const stopAnimation = fn => {
    _canAnimation = false;
    fn && fn();
    displayIndex.stopAnimation();
  };

  const startAnimation = fn => {
    if (!_canAnimation) return;
    fn && fn();
    displayIndex.setValue(0);
    const len = displayValues.length;
    Animated.timing(displayIndex, {
      toValue: len - 1,
      duration,
      easing: Easing.linear,
    }).start(() => {
      onLoop();
      if (loop) {
        startAnimation('');
      }
    });
  };

  React.useEffect(() => {
    _canAnimation = true;
    startAnimation(onStart);
    return () => {
      stopAnimation(onEnd);
    };
  }, []);

  return <AnimatedText style={other.style} index={displayIndex} displayValues={displayValues} />;
};
export default AnimatedNumber;
