import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Utils, TYText } from 'tuya-panel-kit';
import { DaySwitch, WeekSwitch, MonthSwitch } from '@tuya/tuya-panel-health-sdk';
import Section from '../Section';

const { convertX: cx } = Utils.RatioUtils;

const lang = {
  en: {
    dsc_default: 'Default',
    dsc_custom: 'Custom backgroundColor size',
    dsc_custom2: 'Customize the middle area',
  },
  zh: {
    dsc_default: '默认效果',
    dsc_custom: '自定义颜色，大小',
    dsc_custom2: '自定义中间区域',
  },
};
const getLang = key => {
  return lang.en[key];
};

const ProgessExample = () => {
  return (
    <View style={{ flex: 1, padding: cx(20) }}>
      <Section title={getLang('dsc_default')}>
        <DaySwitch />
        <WeekSwitch />
        <MonthSwitch />
      </Section>
    </View>
  );
};

export default ProgessExample;

const styles = StyleSheet.create({});
