import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Utils } from 'tuya-panel-kit';
import { ScrollRuler } from '@tuya/tuya-panel-health-sdk';
import Section from '../Section';

const { convertX: cx } = Utils.RatioUtils;

const lang = {
  en: {
    dsc_default: 'Default',
    dsc_custom: 'Custom Dark background',
  },
  zh: {
    dsc_default: '默认效果',
    dsc_custom: '自定义展示',
  },
};
const getLang = key => {
  return lang.en[key];
};

export default class Index extends Component {
  state = {};

  handleChange = (v: number) => {
    console.log('changev', v);
  };

  render() {
    const themeColor = 'pink';
    const themeColor2 = '#34C495';
    return (
      <View style={{ flex: 1, padding: cx(20) }}>
        <Section title={getLang('dsc_default')}>
          <ScrollRuler
            min={0}
            max={60}
            scaleColor={themeColor}
            valueStyle={{ color: themeColor }}
            titleStyle={{ color: themeColor }}
            pointerStyle={{ borderBottomColor: themeColor }}
            title="体重"
            onChange={this.handleChange}
          />
        </Section>
        <Section title={getLang('dsc_default')}>
          <ScrollRuler
            min={10}
            max={20}
            scaleColor={themeColor2}
            valueStyle={{ color: themeColor2 }}
            titleStyle={{ color: themeColor2 }}
            pointerStyle={{ borderBottomColor: themeColor2 }}
            title="身高"
            value={17}
            formatValue={v => `${v * 10}cm`}
            onChange={this.handleChange}
          />
        </Section>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
