/* eslint-disable react-native/no-raw-text */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { View, ScrollView, Image } from 'react-native';
import { Utils } from 'tuya-panel-kit';
import svgs from 'tuya-panel-kit/lib/components/iconfont/svg/defaultSvg';
import { PressKey } from '@tuya/tuya-panel-remote-sdk';
import { SectionTitle, SectionMain } from './styled';

const { convertX: cx } = Utils.RatioUtils;
const img = require('./res/add.png');
const loading = require('./res/loading.png');
const lang = {
  en: {
    default: 'Default',
    disabled: 'Disabled',
    tip: 'Tip',
    defaultStyle: 'Default',
    customizeStyle: 'Customize',
    start: 'Start',
    end: 'End',
  },
  zh: {
    default: '默认效果',
    disabled: '不可点击效果',
    tip: '按键描述',
    defaultStyle: '默认样式',
    customizeStyle: '自定义样式',
    start: '开始',
    end: '结束',
  },
};
const getLang = key => {
  return lang.en[key];
};

export default class Index extends Component {
  state = {
    loading1: false,
    loading2: false,
  };

  render() {
    const { loading1, loading2 } = this.state;
    return (
      <ScrollView>
        <View style={{ flex: 1, backgroundColor: '#FFF', paddingBottom: cx(20) }}>
          <SectionTitle>{getLang('default')}</SectionTitle>
          <SectionMain>
            <PressKey text="Active" status={true} />
            <PressKey icon={svgs.pen} iconSize={cx(16)} status={true} />
            <PressKey img={img} status={true} imgStyle={{ width: cx(20) }} />
          </SectionMain>
          <SectionTitle>{getLang('disabled')}</SectionTitle>
          <SectionMain>
            <PressKey text="Disabled" />
            <PressKey icon={svgs.pen} iconSize={cx(16)} status={false} />
            <PressKey img={img} status={false} />
          </SectionMain>
          <SectionTitle>{getLang('tip')}</SectionTitle>
          <SectionMain>
            <PressKey text="Tip" status={true} tip={getLang('defaultStyle')} />
            <PressKey
              text="Tip"
              status={true}
              tip={getLang('customizeStyle')}
              tipStyle={{ color: 'red', fontSize: cx(16) }}
            />
          </SectionMain>
          <SectionTitle>{`${getLang('customizeStyle')} 1`}</SectionTitle>
          <SectionMain>
            <PressKey
              text="Text"
              contentColor="white"
              status={true}
              bgColor="rgb(61,147,239)"
              activeBgColor="rgba(61,147,239,0.5)"
              outBgColor="rgba(61,147,239,0.2)"
            />
            <PressKey
              padding={0}
              text="Text"
              contentColor="white"
              status={true}
              bgColor="rgb(206,89,75)"
              activeBgColor="rgba(206,89,75,0.5)"
            />
            <PressKey
              icon={svgs.pen}
              contentColor="white"
              status={true}
              bgColor="rgb(249,206,94)"
              activeBgColor="rgba(249,206,94,0.5)"
              outBgColor="rgba(249,206,94,0.2)"
            />
            <PressKey
              img={img}
              contentColor="white"
              status={true}
              bgColor="rgb(76,159,102)"
              activeBgColor="rgba(76,159,102,0.5)"
              outBgColor="rgba(76,159,102,0.2)"
            />
          </SectionMain>
          <SectionTitle>{`${getLang('customizeStyle')} 1 (${getLang('disabled')})`}</SectionTitle>
          <SectionMain>
            <PressKey
              text="Text"
              bgColor="rgb(61,147,239)"
              disabledBgColor="rgba(61,147,239,0.5)"
              outBgColor="rgba(61,147,239,0.2)"
              disabledContentColor="#F0F0F0"
            />
            <PressKey
              padding={0}
              text="Text"
              bgColor="rgb(206,89,75)"
              disabledBgColor="rgba(206,89,75,0.5)"
              disabledContentColor="#F0F0F0"
            />
            <PressKey
              icon={svgs.pen}
              contentColor="white"
              bgColor="rgb(249,206,94)"
              disabledBgColor="rgba(249,206,94,0.5)"
              outBgColor="rgba(249,206,94,0.2)"
              disabledContentColor="#F0F0F0"
            />
            <PressKey
              img={img}
              contentColor="white"
              bgColor="rgb(76,159,102)"
              activeBgColor="rgba(76,159,102,0.5)"
              disabledBgColor="rgba(76,159,102,0.2)"
              disabledContentColor="#F0F0F0"
            />
          </SectionMain>
          <SectionTitle>{`${getLang('customizeStyle')} 2`}</SectionTitle>
          <SectionMain>
            <PressKey
              text="Text"
              textStyle={{ color: 'white' }}
              status={true}
              bgColor="rgb(61,147,239)"
              activeBgColor="rgba(61,147,239,0.5)"
              outBgColor="rgba(61,147,239,0.2)"
            />
            <PressKey
              width={cx(100)}
              height={cx(50)}
              icon={svgs.pen}
              contentColor="white"
              status={true}
              bgColor="rgb(249,206,94)"
              activeBgColor="rgba(249,206,94,0.5)"
              outBgColor="rgba(249,206,94,0.2)"
            />
            <PressKey
              radius={cx(20)}
              img={img}
              contentColor="white"
              status={true}
              bgColor="rgb(76,159,102)"
              activeBgColor="rgba(76,159,102,0.5)"
              outBgColor="rgba(76,159,102,0.2)"
            />
          </SectionMain>
          <SectionTitle>{`${getLang('customizeStyle')} 2 (${getLang('disabled')})`}</SectionTitle>
          <SectionMain>
            <PressKey
              text="Text"
              bgColor="rgb(61,147,239)"
              disabledBgColor="rgba(61,147,239,0.5)"
              outBgColor="rgba(61,147,239,0.2)"
              disabledContentColor="#F0F0F0"
            />
            <PressKey
              width={cx(100)}
              height={cx(50)}
              icon={svgs.pen}
              contentColor="white"
              bgColor="rgb(249,206,94)"
              disabledBgColor="rgba(249,206,94,0.5)"
              outBgColor="rgba(249,206,94,0.2)"
              disabledContentColor="#F0F0F0"
            />
            <PressKey
              radius={cx(20)}
              img={img}
              contentColor="white"
              bgColor="rgb(76,159,102)"
              disabledBgColor="rgba(76,159,102,0.5)"
              outBgColor="rgba(76,159,102,0.2)"
              disabledContentColor="#F0F0F0"
            />
          </SectionMain>
          <SectionTitle>{`Loading (${getLang('defaultStyle')})`}</SectionTitle>
          <SectionMain>
            <PressKey
              width={cx(100)}
              height={cx(50)}
              onPress={() => this.setState({ loading1: !this.state.loading1 })}
              text={loading1 ? getLang('end') : getLang('start')}
              status={true}
            />
            <PressKey text="Active" status={true} loading={loading1} />
            <PressKey icon={svgs.pen} iconSize={cx(16)} status={true} loading={loading1} />
            <PressKey img={img} status={true} imgStyle={{ width: cx(20) }} loading={loading1} />
          </SectionMain>
          <SectionTitle>{`Loading (${getLang('customizeStyle')})`}</SectionTitle>
          <SectionMain>
            <PressKey
              width={cx(100)}
              height={cx(50)}
              onPress={() => this.setState({ loading2: !this.state.loading2 })}
              text={loading2 ? getLang('end') : getLang('start')}
              status={true}
            />
            <PressKey
              text="Active"
              status={true}
              loading={loading2}
              loadingContent={<Image source={loading} />}
            />
            <PressKey
              icon={svgs.pen}
              iconSize={cx(16)}
              status={true}
              loading={loading2}
              loadingContent={<Image source={loading} />}
            />
            <PressKey
              img={img}
              status={true}
              imgStyle={{ width: cx(20) }}
              loading={loading2}
              loadingContent={<Image source={loading} />}
            />
          </SectionMain>
        </View>
      </ScrollView>
    );
  }
}
