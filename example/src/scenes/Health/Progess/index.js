import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Utils, TYText } from 'tuya-panel-kit';
import { Progess } from '@tuya/tuya-panel-health-sdk';
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

export default class Index extends Component {
  state = {};

  handleStop = () => {};

  render() {
    return (
      <View style={{ flex: 1, padding: cx(20) }}>
        <Section title={getLang('dsc_default')}>
          <Progess percent={12} />
        </Section>
        <Section title={getLang('dsc_custom')}>
          <Progess percent={18} size={160} color="#FFC204" backgroundColor="#4E4532" />
        </Section>
        <Section title={getLang('dsc_custom2')}>
          <Progess
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
  }
}

const styles = StyleSheet.create({});
