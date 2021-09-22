/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Utils } from 'tuya-panel-kit';
import { PressKey, RollerAnimate } from '@tuya/tuya-panel-remote-sdk';
import { SectionTitle, SectionMain } from './styled';
import Res from './res';

const { roller, button, background } = Res;

const { convertX: cx } = Utils.RatioUtils;

export default class Index extends Component {
  state = {
    type: null,
  };

  changeType = type => {
    this.setState({ type });
  };

  render() {
    const { type } = this.state;
    return (
      <ScrollView>
        <View style={{ flex: 1, backgroundColor: '#FFF', paddingBottom: cx(20) }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <PressKey text="打开" status onPress={() => this.changeType('open')} />
            <PressKey text="关闭" status onPress={() => this.changeType('close')} />
            <PressKey text="暂停" status onPress={() => this.changeType('pause')} />
          </View>
          <SectionTitle>无图片效果</SectionTitle>
          <SectionMain>
            <RollerAnimate type={type} />
          </SectionMain>
          <SectionTitle>有图片效果</SectionTitle>
          <SectionMain>
            <RollerAnimate
              rollerImage={roller}
              buttonImage={button}
              bgImage={background}
              type={type}
            />
          </SectionMain>
        </View>
      </ScrollView>
    );
  }
}
