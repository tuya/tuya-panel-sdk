/**
 * @jest-environment jsdom
 */
import React, { useRef } from 'react';
// import { View } from 'react-native';
import { shallow, mount } from 'enzyme';
import { Utils, SwitchButton } from 'tuya-panel-kit';
import Hijack from '../index';

jest.mock('tuya-panel-kit', () => {
  const realComponents = jest.requireActual('tuya-panel-kit');
  return {
    ...realComponents,
    SwitchButton: ({ children }) => <>{children}</>,
  };
});

describe('Hijack component', () => {
  let useEffect;
  const mockUseEffect = () => {
    useEffect.mockImplementationOnce(f => f());
  };
  useEffect = jest.spyOn(React, 'useEffect');
  mockUseEffect(); // 2 times
  mockUseEffect(); //
  it('base render', () => {
    const component = shallow(
      <Hijack
        hasDivider
        themeColor="#239C8E"
        hijackTitle="特殊指纹"
        hijackSubTitle="开启后，可在遇到劫持危险时设置提醒告知亲友"
        unlockAttr
        onValueChange={value => {}}
        appMessageTitle="设置提醒方式"
        phoneMessageTitle="app通知"
        messageTypeTitle="短信通知"
        pleaseInputCodeTitle=""
        pleaseInputPhoneTitle=""
        sendCodeTitle="验证码"
        countryCodeTitle="城市"
        changeHijack={() => {}}
        customGetPhoneCode={() => Promise.resolve('')}
        sendCodeApi="tuya.m.device.user.verifycode.send"
      />
    );
    const targetNode = component.findWhere(r => r.prop('testID') === 'TouchableOpacity');
    targetNode.at(0).props().onPress();
    targetNode.at(1).props().onPress();
    const target = component.findWhere(node => node.name() === 'TextInput');
    target.at(0).props().onChangeText('18651554452');
    target.at(1).props().onChangeText('1234');
    const phoneNode = component.findWhere(r => r.prop('testID') === 'getPhoneCode');
    phoneNode.at(0).props().onPress();
    expect(component).toMatchSnapshot();
    // const promise = Promise.reject('');
    // return promise.catch(() => {
    //   // expect(wrapper.text()).to.contain('data is ready');
    // });
    // component.unmount();
  });
  it('test', () => {
    const setup = (props = {}) => {
      return shallow(
        <Hijack
          hasDivider
          themeColor="#239C8E"
          hijackTitle="特殊指纹"
          hijackSubTitle="开启后，可在遇到劫持危险时设置提醒告知亲友"
          unlockAttr
          onValueChange={value => {}}
          appMessageTitle="设置提醒方式"
          phoneMessageTitle="app通知"
          messageTypeTitle="短信通知"
          pleaseInputCodeTitle=""
          pleaseInputPhoneTitle=""
          sendCodeTitle="验证码"
          countryCodeTitle="城市"
          changeHijack={() => {}}
          customGetPhoneCode={() => Promise.reject(new Error('fail'))}
          sendCodeApi="tuya.m.device.user.verifycode.send"
        />
      );
    };
    // expect(wrapper).toMatchSnapshot();

    const wrapper = setup();
    const targetNode = wrapper.findWhere(r => r.prop('testID') === 'TouchableOpacity');
    targetNode.at(0).props().onPress();
    targetNode.at(1).props().onPress();
    const target = wrapper.findWhere(node => node.name() === 'TextInput');
    target.at(0).props().onChangeText('18651554452');
    target.at(1).props().onChangeText('1234');
    const phoneNode = wrapper.findWhere(r => r.prop('testID') === 'getPhoneCode');
    phoneNode.at(0).props().onPress();
    expect(wrapper).toMatchSnapshot();
    const promise = Promise.resolve('');

    expect(wrapper).toMatchSnapshot();
    return promise.then(() => {
      // expect(wrapper.text()).to.contain('data is ready');
    });
  });
  it('promise reject', () => {
    const setup = (props = {}) => {
      return shallow(
        <Hijack
          hasDivider
          themeColor="#239C8E"
          hijackTitle="特殊指纹"
          hijackSubTitle="开启后，可在遇到劫持危险时设置提醒告知亲友"
          unlockAttr
          onValueChange={value => {}}
          appMessageTitle="设置提醒方式"
          phoneMessageTitle="app通知"
          messageTypeTitle="短信通知"
          pleaseInputCodeTitle=""
          pleaseInputPhoneTitle=""
          sendCodeTitle="验证码"
          countryCodeTitle="城市"
          changeHijack={() => {}}
          sendCodeApi="tuya.m.device.user.verifycode.send"
        />
      );
    };
    // expect(wrapper).toMatchSnapshot();

    const wrapper = setup();
    const targetNode = wrapper.findWhere(r => r.prop('testID') === 'TouchableOpacity');
    targetNode.at(0).props().onPress();
    targetNode.at(1).props().onPress();
    const target = wrapper.findWhere(node => node.name() === 'TextInput');
    target.at(0).props().onChangeText('18651554452');
    target.at(1).props().onChangeText('1234');
    const phoneNode = wrapper.findWhere(r => r.prop('testID') === 'getPhoneCode');
    phoneNode.at(0).props().onPress();
    expect(wrapper).toMatchSnapshot();
    const promise = Promise.reject(new Error('fail'));
    return promise.catch(() => {
      // expect(wrapper.text()).to.contain('data is ready');
    });
  });
});
