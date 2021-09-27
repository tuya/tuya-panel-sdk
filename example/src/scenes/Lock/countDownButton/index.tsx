/* eslint-disable no-console */
import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { CountDownButton } from '@tuya/tuya-panel-lock-sdk';

const CountDownButtonDemo = () => {
  const [text, setText] = useState<string>('');
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.title}>default</Text>
        <View style={[styles.group, { height: 50 }]}>
          <CountDownButton onCountChange={(t: number) => console.log(t)} />
        </View>

        <Text style={styles.title}>custom btn text </Text>
        <View style={[styles.group, { height: 50 }]}>
          <CountDownButton customCountDownText={(t: number) => `倒计时(${t} s)`} />
          <CountDownButton customCountDownText={(t: number) => `倒计时 -> ${t} s`} />
          <CountDownButton customCountDownText={(t: number) => `${t} s 后结束倒计时`} />
        </View>

        <Text style={styles.title}>
          onIdleEndCallBack will be triggered when countdown is ended
        </Text>
        <View style={[styles.group, { height: 100 }]}>
          <CountDownButton
            customCountDownText={(t: number) => `(${t} s)后说你好`}
            onIdleEndCallBack={() => setText('你好')}
          />
          <Text>{text}</Text>
        </View>
        <Text style={styles.title}>custom button style</Text>
        <View style={[styles.group, { height: 100 }]}>
          <CountDownButton style={styles.btnStyle} />
          <CountDownButton style={styles.circleButton} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  btnStyle: {
    alignItems: 'center',
    backgroundColor: '#ddd',
    borderRadius: 10,
    height: 40,
    justifyContent: 'center',
    width: 56,
  },
  circleButton: {
    alignItems: 'center',
    backgroundColor: '#ddd',
    borderRadius: 50,
    height: 50,
    justifyContent: 'center',
    width: 50,
  },
  container: {
    flexDirection: 'column',
    flex: 1,
  },
  group: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 200,
    justifyContent: 'space-around',
    width: '100%',
  },
  title: {
    color: 'black',
    fontSize: 16,
  },
});

export default CountDownButtonDemo;
