import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Utils, TYText } from 'tuya-panel-kit';
import { hooks } from '@tuya/tuya-panel-health-sdk';
import Section from '../Section';

const { useCountDown } = hooks;

const { convertX: cx } = Utils.RatioUtils;

const lang = {
  en: {
    dsc_default: 'Default',
    dsc_custom: 'Custom start',
  },
  zh: {
    dsc_default: '默认效果',
    dsc_custom: '自定义开始',
  },
};
const getLang = key => {
  return lang.en[key];
};

const CountDown = () => {
  const onEnd = () => {
    console.log('countdown end');
  };

  const [countdown] = useCountDown({
    targetCount: 3000,
    onEnd: onEnd,
  });

  return (
    <View style={{ flex: 1, padding: cx(20) }}>
      <Section title={getLang('dsc_default')}>
        <TYText>{countdown}</TYText>
      </Section>
    </View>
  );
};
export default CountDown;

const styles = StyleSheet.create({});
