import React, { useImperativeHandle, useState } from 'react';
import { Animated, StyleSheet, View, ViewStyle } from 'react-native';
import { useArrowsAnimator } from './hooks';
// import { ArrowWaveRefType } from './interface';

interface ArrowWaveProps {
  arrowNum?: number;
  arrowStyle?: ViewStyle;
  arrowColor?: string;
  reverse?: boolean;
  containerStyle?: ViewStyle;
  openWaveAnimation?: boolean;
}

const ArrowWave = React.forwardRef<any, ArrowWaveProps>(
  (
    {
      arrowNum = 3,
      arrowStyle,
      arrowColor = '#ddd',
      reverse,
      containerStyle,
      openWaveAnimation = true,
    },
    forwardRef
  ) => {
    const [visible, setVisible] = useState<boolean>(true);
    const animator = useArrowsAnimator(arrowNum, arrowStyle, openWaveAnimation);
    const styleArray = reverse ? animator.styleArray.reverse() : animator.styleArray;

    useImperativeHandle(
      forwardRef,
      () => ({
        stop: () => {
          animator.stopAnimation();
        },
        start: () => {
          animator.beginAnimation();
        },
        hide: () => {
          setVisible(false);
        },
        show: () => {
          setVisible(true);

          if (openWaveAnimation) {
            animator.beginAnimation();
          }
        },
      }),
      []
    );

    if (!visible) return null;

    return (
      <View style={[styles.container, containerStyle]}>
        {styleArray.map((item, index) => {
          return (
            <Animated.View
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              style={[
                styles.arrow,
                { borderBottomColor: arrowColor, borderLeftColor: arrowColor, ...item },
              ]}
            />
          );
        })}
      </View>
    );
  }
);

ArrowWave.displayName = 'ArrowWave';

const styles = StyleSheet.create({
  arrow: {
    borderBottomColor: '#ddd',
    borderBottomWidth: 2,
    borderLeftColor: '#ddd',
    borderLeftWidth: 2,
    height: 10,
    width: 10,
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 16,
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
});

export default ArrowWave;
