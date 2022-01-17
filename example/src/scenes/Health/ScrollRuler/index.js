import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Utils } from 'tuya-panel-kit';
import { ScaleSlider } from '@tuya/tuya-panel-health-sdk';
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

const ScrollRulerExample = () => {
  const handleChange = v => {
    console.log('changev', v);
  };

  const themeColor = 'pink';

  return (
    <View style={{ flex: 1, padding: cx(20) }}>
      <Section title={getLang('dsc_default')}>
        <ScaleSlider min={0} max={60} defaultValue={20} onChange={handleChange} />
      </Section>
      <Section title={getLang('dsc_default')}>
        <ScaleSlider
          color={themeColor}
          min={0}
          max={100}
          defaultValue={20}
          onChange={handleChange}
        />
      </Section>
    </View>
  );
};

export default ScrollRulerExample;

const styles = StyleSheet.create({});
