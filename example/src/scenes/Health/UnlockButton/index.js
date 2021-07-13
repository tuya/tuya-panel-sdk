import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Utils } from 'tuya-panel-kit';
import { UnLockButton } from '@tuya/tuya-panel-health-sdk';
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

  handleStop = () => {};

  render() {
    return (
      <View style={{ flex: 1, padding: cx(20) }}>
        <Section title={getLang('dsc_default')}>
          <UnLockButton onEnd={this.handleStop} backgroundColor="#DF2E2E">
            <View style={styles.stop} />
          </UnLockButton>
        </Section>
        <Section title={getLang('dsc_custom')}>
          <View style={{ backgroundColor: '#333', padding: 30 }}>
            <UnLockButton
              onEnd={this.handleStop}
              backgroundColor="#fff"
              delayLongPress={1000}
              size={90}
              progressRingSize={100}
              color="#fff"
            >
              <View style={[styles.stop, { backgroundColor: '#333' }]} />
            </UnLockButton>
          </View>
        </Section>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  stop: {
    backgroundColor: '#fff',
    borderRadius: 4,
    height: cx(22),
    position: 'absolute',
    width: cx(22),
  },
});
