import React, { useState, useRef, useEffect } from 'react';
import { Animated, Easing } from 'react-native';
import { IBubbleTipBase } from './interface';
import { DEFAULT_CURRENTINDEX, DEFAULT_DISTANCE, DEFAULT_FADE } from './constant';
import { isLengthMoreOne } from './utils';

const BubbleTipBase: React.FC<IBubbleTipBase> = ({
  distance = 60,
  runInTime = 500,
  waitingTime = 3000,
  leavingTime = 2000,
  children,
}) => {
  const fadeAnim = useRef<Animated.Value>(new Animated.Value(DEFAULT_FADE)).current; // 透明度
  const distanceAnim = useRef<Animated.Value>(new Animated.Value(DEFAULT_DISTANCE)).current; // 距离
  const [currenIndex, setCurrendIndex] = useState<number>(DEFAULT_CURRENTINDEX); // 当前index执行的动画
  const childListLengthRef = useRef<number>(DEFAULT_CURRENTINDEX); // 孩子最新的长度

  const animateActions = () => {
    Animated.sequence([
      Animated.timing(distanceAnim, {
        toValue: DEFAULT_DISTANCE,
        duration: 0,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: DEFAULT_FADE,
        duration: runInTime,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: DEFAULT_FADE,
        duration: waitingTime,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: leavingTime,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(distanceAnim, {
          toValue: -distance,
          duration: leavingTime,
          easing: Easing.cubic,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      if (currenIndex >= childListLengthRef.current - 1) {
        setCurrendIndex(DEFAULT_CURRENTINDEX);
      } else {
        setCurrendIndex(currenIndex + 1);
      }
    });
  };

  /**
   * @desc 监听currenIndex的变化执行动画
   */
  useEffect(() => {
    // animatedOperation();
    animateActions();
  }, [currenIndex, childListLengthRef.current]);

  /**
   * @desc 因为动画是异步的，所以获取到的children存在延迟性，需要用ref进行最新的值的判断
   */
  useEffect(() => {
    childListLengthRef.current = children.length;
  }, [children]);
  /**
   * @returns 是否需要展示的动画效果
   */
  const justifyStyle = () => {
    return (
      isLengthMoreOne(children) && {
        opacity: fadeAnim,
        transform: [{ translateY: distanceAnim }],
      }
    );
  };

  return (
    <Animated.View style={justifyStyle()}>
      {Array.isArray(children) ? children[currenIndex] : children}
    </Animated.View>
  );
};

export default BubbleTipBase;
