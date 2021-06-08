/* eslint-disable react-native/no-raw-text */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { View, ScrollView, Image } from 'react-native';
import { Utils } from 'tuya-panel-kit';
import { DoubleKey, PressKey } from '@tuya/tuya-panel-remote-sdk';
import { SectionTitle, SectionMain } from './styled';

const { convertX: cx } = Utils.RatioUtils;
const add = require('./res/add.png');
const minus = require('./res/minus.png');
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
          <SectionTitle>{`${getLang('defaultStyle')} 1`}</SectionTitle>
          <SectionMain>
            <DoubleKey status={true} tip={getLang('volume')} img={[add, minus]} />
            <DoubleKey status={false} tip={getLang('volume')} img={[add, minus]} />
            <View style={{ height: cx(150), justifyContent: 'space-between' }}>
              <DoubleKey
                status={true}
                tip={getLang('volume')}
                img={[add, minus]}
                type="horizontal"
              />
              <DoubleKey
                status={false}
                tip={getLang('volume')}
                img={[add, minus]}
                type="horizontal"
              />
            </View>
          </SectionMain>
          <SectionTitle>{`${getLang('defaultStyle')} 2`}</SectionTitle>
          <SectionMain>
            <DoubleKey status={[true, false]} tip={getLang('volume')} img={[add, minus]} />
            <DoubleKey status={[false, true]} tip={getLang('volume')} img={[add, minus]} />
            <View style={{ height: cx(150), justifyContent: 'space-between' }}>
              <DoubleKey
                status={[true, false]}
                tip={getLang('volume')}
                img={[add, minus]}
                type="horizontal"
              />
              <DoubleKey
                status={[false, true]}
                tip={getLang('volume')}
                img={[add, minus]}
                type="horizontal"
              />
            </View>
          </SectionMain>
          <SectionTitle>{`${getLang('customizeStyle')} 1`}</SectionTitle>
          <SectionMain style={{ marginBottom: cx(10) }}>
            <DoubleKey
              status={true}
              tip={getLang('volume')}
              img={[add, minus]}
              bgColor={['rgba(207,92,78,1)', 'rgba(249,206,94,1)']}
              activeBgColor={['rgba(207,92,78,0.5)', 'rgba(249,206,94,0.5)']}
              outBgColor="rgba(207,92,78,0.2)"
              contentColor="white"
              tipStyle={{ color: 'white' }}
            />
            <DoubleKey
              status={false}
              tip={getLang('volume')}
              img={[add, minus]}
              bgColor={['rgba(207,92,78,1)', 'rgba(249,206,94,1)']}
              disabledBgColor={['rgba(207,92,78,0.5)', 'rgba(249,206,94,0.5)']}
              outBgColor="rgba(207,92,78,0.1)"
              disabledContentColor="white"
              tipStyle={{ color: 'white' }}
            />
            <View style={{ height: cx(150), justifyContent: 'space-between' }}>
              <DoubleKey
                status={true}
                text={[getLang('add'), getLang('minus')]}
                type="horizontal"
                contentColor={['white', 'white']}
                bgColor={['rgba(87,140,238,1)', 'rgba(75,158,101,1)']}
                activeBgColor={['rgba(87,140,238,0.5)', 'rgba(75,158,101,0.5)']}
                outBgColor="rgba(rgba(87,140,238,0.2))"
              />
              <DoubleKey
                status={false}
                text={[getLang('add'), getLang('minus')]}
                type="horizontal"
                disabledContentColor={['white', 'white']}
                bgColor={['rgba(87,140,238,1)', 'rgba(75,158,101,1)']}
                disabledBgColor={['rgba(87,140,238,0.5)', 'rgba(75,158,101,0.5)']}
                outBgColor="rgba(rgba(87,140,238,0.1))"
              />
            </View>
          </SectionMain>
          <SectionMain>
            <DoubleKey
              padding={0}
              status={true}
              tip={getLang('volume')}
              img={[add, minus]}
              bgColor={['rgba(207,92,78,1)', 'rgba(249,206,94,1)']}
              activeBgColor={['rgba(207,92,78,0.5)', 'rgba(249,206,94,0.5)']}
              contentColor="white"
              tipStyle={{ color: 'white' }}
            />
            <DoubleKey
              padding={0}
              status={false}
              tip={getLang('volume')}
              img={[add, minus]}
              bgColor={['rgba(207,92,78,1)', 'rgba(249,206,94,1)']}
              disabledBgColor={['rgba(207,92,78,0.5)', 'rgba(249,206,94,0.5)']}
              disabledContentColor="white"
              tipStyle={{ color: 'white' }}
            />
            <View style={{ height: cx(150), justifyContent: 'space-between' }}>
              <DoubleKey
                padding={0}
                status={true}
                text={[getLang('add'), getLang('minus')]}
                type="horizontal"
                contentColor="white"
                bgColor={['rgba(87,140,238,1)', 'rgba(75,158,101,1)']}
                activeBgColor={['rgba(87,140,238,0.5)', 'rgba(75,158,101,0.5)']}
              />
              <DoubleKey
                padding={0}
                status={false}
                text={[getLang('add'), getLang('minus')]}
                type="horizontal"
                disabledContentColor="white"
                bgColor={['rgba(87,140,238,1)', 'rgba(75,158,101,1)']}
                disabledBgColor={['rgba(87,140,238,0.5)', 'rgba(75,158,101,0.5)']}
              />
            </View>
          </SectionMain>
          <SectionTitle>{`${getLang('customizeStyle')} 2`}</SectionTitle>
          <SectionMain style={{ marginBottom: cx(10) }}>
            <DoubleKey
              status={true}
              tip={getLang('volume')}
              img={[add, minus]}
              bgColor={['rgba(207,92,78,1)', 'rgba(249,206,94,1)']}
              activeBgColor={['rgba(207,92,78,0.5)', 'rgba(249,206,94,0.5)']}
              outBgColor="rgba(207,92,78,0.2)"
              contentColor="white"
              tipStyle={{ color: 'white' }}
              radius={0}
              width={cx(80)}
              height={cx(160)}
            />
            <DoubleKey
              status={false}
              tip={getLang('volume')}
              img={[add, minus]}
              bgColor={['rgba(207,92,78,1)', 'rgba(249,206,94,1)']}
              disabledBgColor={['rgba(207,92,78,0.5)', 'rgba(249,206,94,0.5)']}
              outBgColor="rgba(207,92,78,0.2)"
              disabledContentColor="white"
              tipStyle={{ color: 'white' }}
              radius={0}
              width={cx(80)}
              height={cx(160)}
            />
            <View style={{ height: cx(170), justifyContent: 'space-between' }}>
              <DoubleKey
                status={true}
                text={[getLang('add'), getLang('minus')]}
                type="horizontal"
                contentColor="white"
                tipStyle={{ color: 'white' }}
                bgColor={['rgba(87,140,238,1)', 'rgba(75,158,101,1)']}
                activeBgColor={['rgba(87,140,238,0.5)', 'rgba(75,158,101,0.5)']}
                outBgColor="rgba(rgba(87,140,238,0.2))"
                radius={cx(20)}
                height={cx(80)}
                width={cx(160)}
              />
              <DoubleKey
                status={false}
                text={[getLang('add'), getLang('minus')]}
                type="horizontal"
                disabledContentColor="white"
                bgColor={['rgba(87,140,238,1)', 'rgba(75,158,101,1)']}
                disabledBgColor={['rgba(87,140,238,0.5)', 'rgba(75,158,101,0.5)']}
                outBgColor="rgba(rgba(87,140,238,0.2))"
                radius={cx(20)}
                height={cx(80)}
                width={cx(160)}
              />
            </View>
          </SectionMain>
          <SectionTitle>Loading</SectionTitle>
          <SectionMain>
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
            <DoubleKey
              status={true}
              tip={getLang('volume')}
              text={[getLang('add'), getLang('minus')]}
              loading={[loading && isFirst, loading && !isFirst]}
              bgColor="rgba(195,117,241,1)"
              activeBgColor="rgba(195,117,241,0.5)"
              contentColor="white"
              outBgColor="rgba(195,117,241,0.3)"
              tipStyle={{ color: 'white' }}
            />
            <DoubleKey
              status={true}
              tip={getLang('volume')}
              img={[add, minus]}
              loading={[loading && isFirst, loading && !isFirst]}
              loadingContent={<Image source={loadingImg} />}
            />
          </SectionMain>
        </View>
      </ScrollView>
    );
  }
}
