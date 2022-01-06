import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Utils, Button } from 'tuya-panel-kit';
import { RotateView } from '@tuya/tuya-panel-health-sdk';
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
    <View style={{ flex: 1, padding: cx(20) }}>
      <Section title={getLang('dsc_default')}>
        <View style={{ marginBottom: 60 }}>
          <Button text="开始" onPress={() => setActive(true)} />
          <Button text="结束" onPress={() => setActive(false)} />
        </View>

        <RotateView active={active}>
          <View style={{ width: 200, height: 200, backgroundColor: 'pink' }} />
        </RotateView>
      </Section>
    </View>
  );
};

export default RotateViewExample;

const styles = StyleSheet.create({});
