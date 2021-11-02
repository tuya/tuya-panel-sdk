import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SteeringWheel } from '@tuya/tuya-panel-szos-sdk';
import { TYText } from 'tuya-panel-kit';

const SoundWave: React.FC = () => {
  const [rotate, setRotate] = useState<number>(0);
  const [left, setLeft] = useState<number>(0);
  const [top, setTop] = useState<number>(0);
  const chanegRotate = (val: number) => {
    setRotate(val);
  };
  const _onLayout = (e: { nativeEvent: { layout: { x: any; y: any } } }) => {
    const { x, y } = e.nativeEvent.layout;
    setLeft(x);
    setTop(y);
  };
  return (
    <View style={styles.wrap} onLayout={e => _onLayout(e)}>
      <TYText style={styles.text} text={`旋转角度:${rotate}`} />
      <SteeringWheel
        changeRotate={chanegRotate}
        wheelStyle={styles.wheel}
        leftPart={left}
        topPart={top}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    alignSelf: 'flex-start',
    padding: 10,
  },
  wheel: {
    left: 50,
    position: 'absolute',
    top: 50,
  },
  wrap: {
    height: '100%',
    width: '100%',
  },
});

export default SoundWave;
