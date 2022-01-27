/**
 * @jest-environment jsdom
 */
import React from 'react';
import { View, TouchableOpacity, Modal } from 'react-native';
import { mount, shallow } from 'enzyme';
import { TYSdk, Utils } from 'tuya-panel-kit';
import Main from '../index';

const { convertX: cx, topBarHeight } = Utils.RatioUtils;

// mount需要jsdom，但尝试安装jsdom装不上，之后切换地址试试
describe('render components', () => {
  // 单测组件涉及原生方法时，没有设备dp及数据。可以参考我这个
  beforeEach(() => {
    const param = {
      appKey: 'nfdmss3jjw4jtydrnmhn',
      codeIds: { finddev: '8', sos_state: '1', alarm_light_switch: '9' },
      devId: 'vdevo164134816821205',
      productId: 'amb9zpds',
      dpCodes: { finddev: false, sos_state: true, alarm_light_switch: false },
      dps: { 8: false, 1: true, 9: false },
      idCodes: { 8: 'finddev', 1: 'sos_state', 9: 'alarm_light_switch' },
      uiId: '0000017co6',
      state: { finddev: false, sos_state: true, alarm_light_switch: false },
      schema: {
        finddev: {
          code: 'finddev',
          extContent: '{"route":1}',
          id: '8',
          mode: 'rw',
          name: '响铃寻找',
          type: 'bool',
          dptype: 'obj',
        },
        sos_state: {
          code: 'sos_state',
          dptype: 'obj',
          extContent: '{"route":1}',
          id: '1',
          mode: 'rw',
          name: '一键定位',
          type: 'bool',
        },
        alarm_light_switch: {
          code: 'alarm_light_switch',
          dptype: 'obj',
          extContent: '{"route":1}',
          id: '9',
          mode: 'rw',
          name: '闪灯寻找',
          type: 'bool',
        },
      },
    };
    TYSdk.device.setDeviceInfo(param);
  });

  it('no modal render', async () => {
    const onSearchResult = result => {
      //
    };
    const onRingLampResult = result => {
      //
    };

    const wrapper = mount(
      <Main
        themeColor="red"
        deviceOnline
        bleState={false}
        iconProp={{
          color: '#333',
          size: cx(24),
          iconStyle: {
            width: cx(50),
            height: cx(50),
            borderRadius: cx(50),
            alignItems: 'center',
            justifyContent: 'center',
          },
        }}
        onSearchResult={onSearchResult}
        onRingLampResult={onRingLampResult}
        searchIcon=""
        ringIcon=""
        lampIcon=""
        successIcon=""
        modalStartPoint={cx(300) - topBarHeight}
      />
    );
    const instance = wrapper.instance();
    expect(wrapper).toMatchSnapshot();

    //
    console.log('res===1', instance);
    console.log('res===2', wrapper.props());
    // 执行里面的方法
    wrapper.find(View).at(0).find(TouchableOpacity).at(0).props().onPress();
    // 测试期望结果，原生api方法需要app容器，所以这里报错
    // expect
    // 同时点击按钮检测clickedAction方法
    wrapper.find(View).at(0).find(TouchableOpacity).at(1).props().onPress();
    wrapper.find(View).at(0).find(TouchableOpacity).at(2).props().onPress();
    // expect();
    TYSdk.event.emit('deviceDataChange', {
      type: 'dpData',
      payload: {
        ble_location: 1,
      },
    });
    TYSdk.event.emit('deviceDataChange', {
      type: 'dpData',
      payload: {
        alarm_light_switch: true,
      },
    });
    TYSdk.event.emit('deviceDataChange', {
      type: 'dpData',
      payload: {
        alarm_light_switch: false,
      },
    });
    TYSdk.event.emit('deviceDataChange', {
      type: 'dpData',
      payload: {
        finddev: true,
      },
    });
    TYSdk.event.emit('deviceDataChange', {
      type: 'dpData',
      payload: {
        finddev: false,
      },
    });
    // 注意：取不到函数组件的state，用更改的属性或者赋值去替代检测
    // wrapper.state('search')只能用于class组件;
    // const children0 = wrapper.find(View).at(0).children();

    wrapper.unmount();
  });

  it('modal render', async () => {
    const onSearchResult = result => {
      //
    };
    const onRingLampResult = result => {
      //
    };
    const contentTarget = {
      position: 'absolute',
      right: cx(10),
    };
    const wrapper = mount(
      <Main
        themeColor="red"
        deviceOnline
        bleState={false}
        iconProp={{
          color: '#333',
          size: cx(24),
          iconStyle: {
            width: cx(50),
            height: cx(50),
            borderRadius: cx(50),
            alignItems: 'center',
            justifyContent: 'center',
          },
        }}
        onSearchResult={onSearchResult}
        onRingLampResult={onRingLampResult}
        searchIcon=""
        ringIcon=""
        lampIcon=""
        successIcon=""
        modalStartPoint={cx(300) - topBarHeight}
        searchModalProp={{
          title: 'title',
          subTitle: 'subTitle',
          done: 'done',
          bgImage: 0,
          iconBoxStyle: contentTarget,
          bgStyle: { width: cx(280), height: cx(170), justifyContent: 'center' },
          bgChildStyle: {
            width: cx(280),
            height: cx(150),
            marginTop: cx(40),
          },
        }}
        ringModalProp={{
          title: 'title',
          subTitle: 'subTitle',
          done: 'done',
          bgImage: 0,
          iconBoxStyle: contentTarget,
          bgStyle: { width: cx(280), height: cx(170), justifyContent: 'center' },
        }}
        lampModalProp={{
          title: 'title',
          subTitle: 'subTitle',
          done: 'done',
          iconBoxStyle: contentTarget,
          bgImage: 0,
          bgStyle: { width: cx(280), height: cx(170), justifyContent: 'center' },
        }}
      />
    );
    const instance = wrapper.instance();
    expect(wrapper).toMatchSnapshot();
    // console.log('res===2 2', wrapper.find(View).at(0).children().childAt(3).props());
    wrapper.find(View).at(0).find(TouchableOpacity).at(0).props().onPress();
    // 测试期望结果，原生api方法需要app容器，所以这里报错
    // expect
    // 同时点击按钮检测clickedAction方法
    wrapper.find(View).at(0).find(TouchableOpacity).at(1).props().onPress();
    wrapper.find(View).at(0).find(TouchableOpacity).at(2).props().onPress();
    // childer() 下面不能用at(),用childAt()
    wrapper.find(View).at(0).children().childAt(3).props().onMaskPress();
    wrapper.find(View).at(0).children().childAt(4).props().onMaskPress();
    wrapper.find(View).at(0).children().childAt(5).props().onMaskPress();

    wrapper.unmount();
  });
});
