/* eslint-disable react-native/no-raw-text */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';

import { Utils, TYText, IconFont } from 'tuya-panel-kit';

import { CircleHandle, PressKey } from '@tuya/tuya-panel-remote-sdk';

import { SectionTitle } from './styled';

import icon from './res/iconfont.json';

const { convertX: cx } = Utils.RatioUtils;
const img = require('./res/add.png');
const loadingImg = require('./res/loading.png');

const lang = {
  en: {
    disabled: 'Disabled',
    tip: 'Tip',
    defaultStyle: 'Default',
    customizeStyle: 'Customize',
    start: 'Start',
    end: 'End',
    volume: 'Volume',
    minus: 'Minus',
    add: 'Add',
    customzieContent: 'Customize Content',
  },
  zh: {
    disabled: '不可点击效果',
    tip: '按键描述',
    defaultStyle: '默认样式',
    customizeStyle: '自定义样式',
    start: '开始',
    end: '结束',
    volume: '音量',
    minus: '减',
    add: '加',
    customzieContent: '自定义内容',
  },
};
const getLang = key => {
  return lang.en[key];
};

export default class Index extends Component {
  state = {
    loading: false,
    isFirst: true,
  };

  render() {
    const { loading, isFirst } = this.state;
    return (
      <ScrollView>
        <View style={{ flex: 1, backgroundColor: '#FFF', paddingBottom: cx(20) }}>
          <SectionTitle>{`${getLang('defaultStyle')} (${getLang('disabled')})`}</SectionTitle>
          <CircleHandle />
          <SectionTitle>{`${getLang('defaultStyle')}`}</SectionTitle>
          <CircleHandle
            status={{
              top: true,
              bottom: true,
              left: true,
              right: true,
              center: true,
            }}
          />
          <SectionTitle>{`${getLang('customizeStyle')}`}</SectionTitle>
          <CircleHandle
            padding={cx(10)}
            outBgColor="rgba(246,206,95,0.3)"
            radius={cx(90)}
            centerRadius={cx(30)}
            offset={cx(20)}
            pointColor={{
              top: 'rgba(87,140,238,1)',
              right: 'rgba(85,158,101,1)',
              bottom: 'rgba(246,206,95,1)',
              left: 'rgba(206,89,75,1)',
            }}
            pointRadius={cx(4)}
            centerTextStyle={{ fontSize: cx(16), color: 'white' }}
            bgColor={{
              top: 'rgba(206,89,75,1)',
              right: 'rgba(246,206,95,1)',
              bottom: 'rgba(85,158,101,1)',
              left: 'rgba(87,140,238,1)',
              center: 'rgba(194,117,241,1)',
            }}
            activeBgColor={{
              top: 'rgba(206,89,75,0.5)',
              right: 'rgba(246,206,95,0.5)',
              bottom: 'rgba(85,158,101,0.5)',
              left: 'rgba(87,140,238,0.5)',
              center: 'rgba(194,117,241,0.7)',
            }}
            disabledColor={{
              center: 'red',
            }}
            status={{
              top: true,
              bottom: true,
              left: true,
              right: true,
              center: true,
            }}
          />
          <CircleHandle
            padding={0}
            centerTextStyle={{ fontSize: cx(16), color: 'white' }}
            outBgColor="rgba(246,206,95,0.3)"
            radius={cx(90)}
            centerRadius={cx(30)}
            offset={cx(20)}
            pointColor="#FFF"
            pointRadius={cx(4)}
            bgColor={{
              top: 'rgba(206,89,75,1)',
              right: 'rgba(246,206,95,1)',
              bottom: 'rgba(85,158,101,1)',
              left: 'rgba(87,140,238,1)',
              center: 'rgba(194,117,241,1)',
            }}
            activeBgColor={{
              top: 'rgba(206,89,75,0.5)',
              right: 'rgba(246,206,95,0.5)',
              bottom: 'rgba(85,158,101,0.5)',
              left: 'rgba(87,140,238,0.5)',
              center: 'rgba(194,117,241,0.7)',
            }}
            status={{
              top: true,
              bottom: true,
              left: true,
              right: true,
              center: true,
            }}
          />
          <SectionTitle>{`${getLang('customizeStyle')} (${getLang('disabled')})`}</SectionTitle>
          <CircleHandle
            padding={cx(10)}
            outBgColor="rgba(246,206,95,0.3)"
            radius={cx(90)}
            centerRadius={cx(30)}
            offset={cx(20)}
            pointColor="#FFF"
            pointRadius={cx(4)}
            centerTextStyle={{ fontSize: cx(20), color: '#FFF' }}
            status={{
              top: false,
              bottom: false,
              left: false,
              right: false,
              center: false,
            }}
            centerStatus={false}
            disabledBgColor={{
              top: 'rgba(206,89,75,0.5)',
              right: 'rgba(246,206,95,0.5)',
              bottom: 'rgba(85,158,101,0.5)',
              left: 'rgba(87,140,238,0.5)',
              center: 'rgba(194,117,241,0.7)',
            }}
            tipStyle={[styles.centerText, { fontSize: cx(15) }]}
          />
          <SectionTitle>{getLang('customzieContent')}</SectionTitle>
          <CircleHandle
            centerTextStyle={{ fontSize: cx(16), color: 'red' }}
            keyContent={{
              top: <TYText style={{ color: 'rgba(206,89,75,1)' }}>top</TYText>,
              right: <IconFont d={icon.minus} size={cx(18)} />,
              bottom: <TYText style={{ color: 'rgba(85,158,101,1)' }}>bottom</TYText>,
              left: <Image source={img} style={{ tintColor: '#CCC' }} />,
            }}
            tip={{
              top: 'top',
              right: 'right',
              bottom: 'bottom',
              left: 'left',
            }}
            tipStyle={{ color: 'rgba(194,117,241,1)' }}
            status={{
              top: true,
              bottom: true,
              left: true,
              right: true,
              center: true,
            }}
          />
          <SectionTitle style={{ marginVertical: cx(15) }}>Loading</SectionTitle>
          <PressKey
            width={cx(100)}
            height={cx(50)}
            onPress={() =>
              this.setState({
                loading: !this.state.loading,
                isFirst: loading ? !isFirst : isFirst,
              })
            }
            text={loading ? getLang('end') : getLang('start')}
            status={true}
          />
          <CircleHandle
            loading={{ top: loading && isFirst, center: loading && !isFirst }}
            keyContent={{
              top: <TYText style={{ color: 'rgba(206,89,75,1)' }}>top</TYText>,
              right: <IconFont d={icon.minus} size={cx(18)} />,
              bottom: <TYText style={{ color: 'rgba(85,158,101,1)' }}>bottom</TYText>,
              left: <Image source={img} style={{ tintColor: '#CCC' }} />,
            }}
            status={{
              top: true,
              bottom: true,
              left: true,
              right: true,
              center: true,
            }}
          />
          <CircleHandle
            loading={{ top: loading && isFirst, center: loading && !isFirst }}
            loadingContent={<Image source={loadingImg} />}
            status={{
              top: true,
              bottom: true,
              left: true,
              right: true,
              center: true,
            }}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  centerText: {
    color: '#CCC',
  },
});
