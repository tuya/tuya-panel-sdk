/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { TYText, Utils } from 'tuya-panel-kit';
import { PressKey, CurtainsAnimate } from '@tuya/tuya-panel-remote-sdk';
import { SectionTitle, SectionMain } from './styled';
import Res from './res';

const { roller, button, left, right } = Res;

const { convertX: cx } = Utils.RatioUtils;

export default class Index extends Component {
  state = {
    type: null,
    percent: 0,
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
            <CurtainsAnimate type={type} />
          </SectionMain>
          <SectionTitle>有图片效果</SectionTitle>
          <SectionMain>
            <CurtainsAnimate
              rollerImage={roller}
              buttonImage={button}
              curtainsLeftImage={left}
              curtainsRightImage={right}
              buttonPositionErrorValue={cx(4)}
              onMove={percent => this.setState({ percent })}
              type={type}
            />
          </SectionMain>
          <SectionTitle>onMove事件</SectionTitle>
          <SectionMain>
            <TYText text={`百分比:${this.state.percent}`} />
          </SectionMain>
        </View>
      </ScrollView>
    );
  }
}
