import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Utils, Button, TYText } from 'tuya-panel-kit';
import { BreatheView } from '@tuya/tuya-panel-health-sdk';
import Section from '../Section';

const { convertX: cx } = Utils.RatioUtils;

const lang = {
  en: {
    dsc_default: 'Default',
  },
  zh: {
    dsc_default: '默认效果',
  },
};
const getLang = key => {
  return lang.en[key];
};

const RotateViewExample = () => {
  const [active, setActive] = useState(false);
  return (
    <View style={{ flex: 1, padding: cx(20), backgroundColor: '#271F39' }}>
      <Section title={getLang('dsc_default')}>
        <View style={{ marginBottom: 60 }}>
          <Button text="开始" onPress={() => setActive(true)} />
          <Button text="结束" onPress={() => setActive(false)} />
        </View>

        <BreatheView active={active}>
          <View style={{ width: 200, height: 200 }}>
            <TYText color="#fff">卡路里</TYText>
            <TYText color="#fff">时长</TYText>
            <TYText color="#fff">间距</TYText>
          </View>
        </BreatheView>
      </Section>
    </View>
  );
};

export default RotateViewExample;

const styles = StyleSheet.create({});
