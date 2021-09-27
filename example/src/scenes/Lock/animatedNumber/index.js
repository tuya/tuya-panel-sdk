import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { AnimateNumber } from '@tuya/tuya-panel-lock-sdk';
import { BrickButton } from 'tuya-panel-kit';

const AnimatedNumberTest = () => {
  const [dynamicPwd, setDynamicPwd] = useState('');

  const showDynamicPwd = () => {
    const content = [];
    const fontSize = dynamicPwd.length > 10 ? 46 : 50;
    for (let i = 0; i < dynamicPwd.length; i++) {
      const endNum = dynamicPwd.slice(i, i + 1);
      const tt = (
        <AnimateNumber
          style={[styles.dynamicPwdText, { color: '#F00', fontSize }]}
          key={i}
          values={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
          duration={1000 + i * 200}
          speed={100}
          end={+endNum}
        />
      );
      content.push(tt);
    }
    return content;
  };

  const sleep = (time = 300) => {
    return new Promise(resolve => setTimeout(resolve, time));
  };

  const getRandomPwd = async () => {
    setDynamicPwd('');
    await sleep(500);
    let pwd = '';
    for (let i = 0; i < 7; i++) {
      pwd += ~~(Math.random() * 10);
    }
    setDynamicPwd(pwd);
  };
  return (
    <View>
      <BrickButton text="获取动态密码" onPress={() => getRandomPwd()} />
      <View style={styles.dynamicPwdWarp}>{dynamicPwd === '' ? null : showDynamicPwd()}</View>
    </View>
  );
};

export default AnimatedNumberTest;

const styles = StyleSheet.create({
  dynamicPwdText: {
    backgroundColor: 'transparent',
    fontSize: 50,
    // width: 29,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dynamicPwdWarp: {
    flexDirection: 'row',
  },
});
