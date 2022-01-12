import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Utils, Button, TYText } from 'tuya-panel-kit';
import { RangeBar } from '@tuya/tuya-panel-health-sdk';
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

const RangeBarExample = () => {
  const [active, setActive] = useState(false);
  return (
    <View style={{ flex: 1, padding: cx(20) }}>
      <Section title={getLang('dsc_default')}>
        <RangeBar
          dataSource={[
            { color: '#30A6E2', title: '偏轻', range: [0, 52.8] },
            { color: '#80E677', title: '正常', range: [52.8, 68.5] },
            { color: '#F8D45A', title: '偏重', range: [68.5, Infinity] },
          ]}
          width={320}
          space={1}
          value={220}
          formatScaleText={value => `${value}kg`}
        />
      </Section>
    </View>
  );
};

export default RangeBarExample;

const styles = StyleSheet.create({});
