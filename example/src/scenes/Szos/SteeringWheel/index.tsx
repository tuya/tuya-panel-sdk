import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SteeringWheel } from '@tuya/tuya-panel-szos-sdk';
import { TYText } from 'tuya-panel-kit';

const SoundWave: React.FC = () => {
  const [rotate, setRotate] = useState<number>(0);
  const chanegRotate = (val: number) => {
    setRotate(val);
  };
  return (
    <View>
      <TYText style={styles.text} text={`旋转角度:${rotate}`} />
      <SteeringWheel chanegRotate={chanegRotate} />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    alignSelf: 'flex-start',
    padding: 10,
  },
});

export default SoundWave;
