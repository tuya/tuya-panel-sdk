import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Utils, TopBar } from 'tuya-panel-kit';
import { MainProps } from './interface';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableWithoutFeedback);

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const { convertX: cx } = Utils.RatioUtils;

const MaskView: React.FC<MainProps> = ({
  visible = false,
  height = cx(300),
  width = cx(260),
  children = null,
  maskBgColor = '#FFF',
  maskOpacity = 0.7,
  direction = 'left',
  style = null,
  duration = 300,
  offsetX = 0,
  offsetY = 0,
  onClose = () => null,
}) => {
  const [maskVisible, setMaskVisible] = useState(false);

  const opacity = useRef(new Animated.Value(0));

  const left = useRef(new Animated.Value(-screenWidth));

  const right = useRef(new Animated.Value(screenWidth));

  const bottom = useRef(new Animated.Value(screenHeight));

  const top = useRef(new Animated.Value(-height));

  useEffect(() => {
    if (visible) {
      setMaskVisible(true);
      start[direction]();
    } else {
      stop[direction]();
    }
  }, [visible]);

  const getAnimate = (type: Animated.Value, value: number) =>
    Animated.timing(type, {
      toValue: value,
      duration,
      useNativeDriver: false,
    });

  const bgStart = getAnimate(opacity.current, maskOpacity);

  const bgEnd = getAnimate(opacity.current, 0);

  const leftStart = getAnimate(left.current, (screenWidth - width) / 2);

  const leftEnd = getAnimate(left.current, -screenWidth);

  const rightStart = getAnimate(right.current, (screenWidth - width) / 2);

  const rightEnd = getAnimate(right.current, screenWidth);

  const bottomStart = getAnimate(bottom.current, screenHeight - height - TopBar.height - offsetY);

  const bottomEnd = getAnimate(bottom.current, screenHeight);

  const topStart = getAnimate(top.current, offsetY);

  const topEnd = getAnimate(top.current, -height);

  const start = {
    left: () => Animated.parallel([leftStart, bgStart]).start(),
    right: () => Animated.parallel([rightStart, bgStart]).start(),
    top: () => Animated.parallel([topStart, bgStart]).start(),
    bottom: () => Animated.parallel([bottomStart, bgStart]).start(),
  };

  const stop = {
    left: () => Animated.parallel([leftEnd, bgEnd]).start(() => setMaskVisible(false)),
    right: () => Animated.parallel([rightEnd, bgEnd]).start(() => setMaskVisible(false)),
    top: () => Animated.parallel([topEnd, bgEnd]).start(() => setMaskVisible(false)),
    bottom: () => Animated.parallel([bottomEnd, bgEnd]).start(() => setMaskVisible(false)),
  };

  const contentStyle = {
    left: { left: left.current, top: (screenHeight - TopBar.height - height) / 2 },
    right: { top: (screenHeight - TopBar.height - height) / 2, left: right.current },
    top: { top: top.current, left: offsetX },
    bottom: { top: bottom.current, left: offsetX },
  };

  return (
    <View
      style={{
        display: maskVisible ? 'flex' : 'none',
        position: maskVisible ? 'absolute' : 'relative',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
      }}
    >
      {maskVisible && (
        <AnimatedTouchable onPress={onClose}>
          <Animated.View
            style={[styles.mask, { opacity: opacity.current, backgroundColor: maskBgColor }]}
          />
        </AnimatedTouchable>
      )}
      <Animated.View style={[styles.children, contentStyle[direction], { height, width }, style]}>
        {children}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  children: {
    position: 'absolute',
    width: '100%',
  },
  mask: {
    alignItems: 'center',
    height: screenHeight,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    top: 0,
    width: screenWidth,
  },
});

export default MaskView;
