import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Utils, TYText } from 'tuya-panel-kit';
import { CircleProgress, LineProgress, StepsProgress } from '@tuya/tuya-panel-health-sdk';
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
        <CircleProgress percent={12} />
        <View style={{ height: 20 }}>
          <LineProgress percent={12} />
        </View>
        <View style={{ height: 60 }}>
          <StepsProgress percent={35} steps={4} />
        </View>
        <View style={{ height: 60 }}>
          <TYText>睡眠记录</TYText>
          <StepsProgress percent={60} steps={4} color="#E5C7F2" strokeWidth={20} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TYText>差</TYText>
            <TYText>好</TYText>
          </View>
        </View>
      </Section>
      <Section title={getLang('dsc_custom')}>
        <CircleProgress percent={18} size={160} color="#FFC204" backgroundColor="#4E4532" />
      </Section>
      <Section title={getLang('dsc_custom2')}>
        <CircleProgress
          percent={18}
          textRender={percent => (
            <View>
              <TYText>{percent}</TYText>
              <TYText>步数</TYText>
            </View>
          )}
        />
      </Section>
    </View>
  );
};

export default ProgessExample;

const styles = StyleSheet.create({});
