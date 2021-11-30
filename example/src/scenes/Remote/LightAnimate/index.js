/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Utils } from 'tuya-panel-kit';
import { PressKey, LightAnimate } from '@tuya/tuya-panel-remote-sdk';

import { SectionTitle, SectionMain } from './styled';
import Res from './res';

const { light } = Res;

const { convertX: cx } = Utils.RatioUtils;

const config = {
  red: 'red',
  yellow: 'yellow',
  blue: 'blue',
  green: 'green',
};

export default class Index extends Component {
  state = {
    type: null,
    customType: null,
  };

  changeType = type => {
    this.setState({ type });
  };

  changeCustomType = customType => {
    this.setState({ customType });
  };

  render() {
    const { type, customType } = this.state;
    return (
      <ScrollView>
        <View style={{ flex: 1, backgroundColor: '#FFF', paddingBottom: cx(20) }}>
          <SectionTitle>默认值</SectionTitle>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <PressKey text="冷" status onPress={() => this.changeType('lightTempMinus')} />
            <PressKey text="暖" status onPress={() => this.changeType('lightTempAdd')} />
            <PressKey text="暗" status onPress={() => this.changeType('lightBrightMinus')} />
            <PressKey text="亮" status onPress={() => this.changeType('lightBrightAdd')} />
          </View>
          <SectionMain>
            <LightAnimate
              type={type}
              lightImg={light}
              onRelease={() => this.setState({ type: '' })}
            />
          </SectionMain>
          <SectionTitle>自定义</SectionTitle>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <PressKey text="红" status onPress={() => this.changeCustomType('red')} />
            <PressKey text="黄" status onPress={() => this.changeCustomType('yellow')} />
            <PressKey text="蓝" status onPress={() => this.changeCustomType('blue')} />
            <PressKey text="绿" status onPress={() => this.changeCustomType('green')} />
          </View>
          <SectionMain>
            <LightAnimate
              type={customType}
              lightImg={light}
              config={config}
              onRelease={() => this.setState({ customType: '' })}
            />
          </SectionMain>
        </View>
      </ScrollView>
    );
  }
}
