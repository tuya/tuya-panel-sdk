import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SteeringWheel } from '@tuya/tuya-panel-szos-sdk';
import { TYText } from 'tuya-panel-kit';

const Streel: React.FC = () => {
  const [ang, setAng] = useState<number>(0);
  const [left, setLeft] = useState<number>(0);
  const [top, setTop] = useState<number>(0);
  const [direct, setDirect] = useState<string>('on');
  const [xNow, setX] = useState<number>(0);
  const [yNow, setY] = useState<number>(0);
  const changeRotate = (rotate: number, direction: string, x: number, y: number) => {
    setDirect(direction);
    setAng(rotate);
    setX(x);
    setY(y);
  };
  const _onLayout = (e: { nativeEvent: { layout: { x: any; y: any } } }) => {
    const { x, y } = e.nativeEvent.layout;
    setLeft(x);
    setTop(y);
  };

  return (
    <View style={styles.wrap} onLayout={e => _onLayout(e)}>
      <View style={{ flexDirection: 'row' }}>
        <TYText style={styles.text} text={`旋转角度:${ang}`} />
        <TYText style={styles.text} text={`旋转方向:${direct}`} />
      </View>
      <View style={{ flexDirection: 'row' }}>
        <TYText style={styles.text} text={`当前坐标X:${xNow}`} />
        <TYText style={styles.text} text={`当前坐标Y:${yNow}`} />
      </View>
      <SteeringWheel
        changeRotate={changeRotate}
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
    left: 100,
    position: 'absolute',
    top: 150,
  },
  wrap: {
    height: '100%',
    width: '100%',
  },
});

export default Streel;
