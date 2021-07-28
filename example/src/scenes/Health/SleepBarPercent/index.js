import React, { Component } from 'react';
import { View, ScrollView, Image } from 'react-native';
import { Utils } from 'tuya-panel-kit';
import { BarPercent } from '@tuya/tuya-panel-health-sdk';
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

export const WAKE_COLOR = '#FFCF3A';
export const LIGHT_COLOR = '#E5C7F2';
export const DEEP_COLOR = '#BF73DE';
export const REM_COLOR = '#F8F1FB';

const getLang = key => {
  return lang.en[key];
};
const sleepDuration = [
  {
    key: 'Wake',
    value: 60,
  },
  {
    key: 'Light',
    value: 200,
  },
  {
    key: 'Deep',
    value: 400,
  },
  {
    key: 'REM',
    value: 100,
  },
];

const sleepDuration2 = [
  {
    label: '醒来',
    key: 'Wake',
    value: 200,
    color: 'pink',
  },
  {
    label: '浅睡',
    key: 'Light',
    value: 200,
    color: '#BF73DE',
  },
  {
    label: '深睡',
    key: 'Deep',
    value: 600,
    color: '#C00AFF',
  },
];

export default class Index extends Component {
  state = {};

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Section title={getLang('dsc_default')}>
          <BarPercent data={sleepDuration} />
        </Section>
        <Section title={getLang('dsc_custom')}>
          <BarPercent data={sleepDuration2} />
        </Section>
        <Section title={getLang('dsc_custom_style')}>
          <View>
            <BarPercent
              data={sleepDuration}
              style={{
                height: 18,
                borderRadius: 12,
                overflow: 'hidden',
              }}
            />
          </View>
        </Section>
      </View>
    );
  }
}
