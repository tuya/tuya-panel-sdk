/* eslint-disable react/prop-types */
import React, { useRef, useCallback, FC } from 'react';
import { View, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import AnimatedCircleProgess from './AnimatedCircleProgess';

export interface Props {
  /**
   * 长按的时长
   */
  delayLongPress?: number;
  /**
   * 按钮的大小
   */
  size?: number;
  /**
   * 长按结束后的回调
   */
  onEnd: () => void;
  /**
   * 按钮的颜色
   */
  backgroundColor?: string;
  /**
   * 进度环的颜色
   */
  color?: string;
  /**
   * 进度环size
   */
  progressRingSize?: number;
  /**
   * 按钮样式
   */
  style?: ViewStyle;
}

const UnLockButton: FC<Props> = ({
  delayLongPress = 1500,
  onEnd,
  size = 90,
  progressRingSize,
  backgroundColor,
  color,
  children,
  style,
}) => {
  const acpRef = useRef(null);
  const start = useCallback(() => {
    acpRef.current.start();
  }, []);

  const rest = useCallback(() => {
    acpRef.current.rest();
  }, []);

  const end = useCallback(() => {
    onEnd && onEnd();
  }, []);

  const circleProgessSize = progressRingSize || size - 20;

  return (
    <View style={styles.box}>
      <TouchableOpacity
        style={[
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor,
            justifyContent: 'center',
            alignItems: 'center',
          },
          style,
        ]}
        onPressIn={start}
        onPressOut={rest}
        activeOpacity={0.9}
        onLongPress={end}
        delayLongPress={delayLongPress}
      >
        {/* 直接渲染children */}
        {children}
        <AnimatedCircleProgess
          ref={acpRef}
          size={circleProgessSize}
          color={color}
          duration={delayLongPress}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    position: 'relative',
  },
});

export default UnLockButton;
