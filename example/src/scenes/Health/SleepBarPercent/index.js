import React, { Component } from 'react';
import { View, ScrollView, Image } from 'react-native';
import { Utils } from 'tuya-panel-kit';
import { SleepBarPercent } from '@tuya/tuya-panel-health-sdk';
import Section from '../Section';

const { convertX: cx } = Utils.RatioUtils;

const lang = {
  en: {
    dsc_default: 'Default',
    dsc_custom: 'Custom color',
    dsc_custom_style: 'Custom style',
  },
  zh: {
    dsc_default: '默认效果',
    dsc_custom: '自定义颜色',
    dsc_custom_style: '自定义样式',
  },
};
const getLang = key => {
  return lang.en[key];
};
const sleepDuration = [
  {
    type: 'Wake',
    value: 60,
  },
  {
    type: 'Light',
    value: 200,
  },
  {
    type: 'Deep',
    value: 400,
  },
  {
    type: 'REM',
    value: 100,
  },
];

const sleepDuration2 = [
  {
    type: 'Wake',
    value: 60,
    color: 'pink',
  },
  {
    type: 'Light',
    value: 200,
    color: '#BF73DE',
  },
  {
    type: 'Deep',
    value: 600,
    color: '#C00AFF',
  },
];

export default class Index extends Component {
  state = {};

  render() {
    return (
      <View style={{ flex: 1}}>
        <Section title={getLang('dsc_default')}>
          <SleepBarPercent dataSource={sleepDuration} />
        </Section>
        <Section title={getLang('dsc_custom')}>
          <SleepBarPercent dataSource={sleepDuration2} />
        </Section>
        <Section title={getLang('dsc_custom_style')}>
          <SleepBarPercent
            dataSource={sleepDuration}
            style={{
              height: 18,
              borderRadius: 12,
              overflow: 'hidden',
            }}
          />
        </Section>
      </View>
    );
  }
}
