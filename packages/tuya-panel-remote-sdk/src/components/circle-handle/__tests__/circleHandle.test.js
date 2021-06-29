import React from 'react';
import { shallow } from 'enzyme';
import { Utils, IconFont } from 'tuya-panel-kit';
import { Image, Text } from 'react-native';
import CircleHandle from '../index';
import icon from './res/iconfont.json';

const { convertX: cx } = Utils.RatioUtils;
const add = require('./res/add.png');
const loading = require('./res/loading.png');

function customizeLoading(props = {}) {
  const wrapper = shallow(<CircleHandle loadingContent={<Image source={loading} />} {...props} />);
  const instance = wrapper.instance();
  return { wrapper, instance };
}

function iconLoading(props = {}) {
  const wrapper = shallow(
    <CircleHandle
      keyContent={{
        top: <Text style={{ color: 'rgba(206,89,75,1)' }}>{'top'}</Text>,
        right: <IconFont d={icon.minus} size={cx(18)} />,
        bottom: <Text style={{ color: 'rgba(85,158,101,1)' }}>{'bottom'}</Text>,
        left: <Image source={add} style={{ tintColor: '#CCC' }} />,
      }}
      {...props}
    />
  );
  const instance = wrapper.instance();
  return { wrapper, instance };
}

describe('PressKey components', () => {
  it('content render', () => {
    const wrapper = shallow(
      <CircleHandle
        centerTextStyle={{ fontSize: cx(16), color: 'red' }}
        keyContent={{
          top: <Text style={{ color: 'rgba(206,89,75,1)' }}>{'top'}</Text>,
          right: <IconFont d={icon.minus} size={cx(18)} />,
          bottom: <Text style={{ color: 'rgba(85,158,101,1)' }}>{'bottom'}</Text>,
          left: <Image source={add} style={{ tintColor: '#CCC' }} />,
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
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('customize render', () => {
    const wrapper = shallow(
      <CircleHandle
        padding={cx(10)}
        outBgColor="rgba(246,206,95,0.3)"
        radius={cx(90)}
        centerRadius={cx(30)}
        offset={cx(20)}
        pointColor="#FFF"
        centerText="OK"
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
        disabledBgColor={{
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
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('onPress render', () => {
    const wrapper = shallow(
      <CircleHandle
        tip="channel"
        repeat={true}
        repeatIntervalTime={1000}
        onPress={{
          top: console.log('onPress top'),
          bottom: console.log('onPress bottom'),
          left: console.log('onPress left'),
          right: console.log('onPress right'),
          center: console.log('onPress center'),
        }}
        onLongPress={{
          top: console.log('onLongPress top'),
          bottom: console.log('onLongPress bottom'),
          left: console.log('onLongPress left'),
          right: console.log('onLongPress right'),
          center: console.log('onLongPress center'),
        }}
        status={{
          top: true,
          bottom: false,
          left: true,
          right: true,
          center: false,
        }}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('componentWillReceiveProps0', () => {
    const { wrapper } = customizeLoading({
      loading: { top: false },
    });
    wrapper.setProps({ loading: { top: true } });
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });
  it('componentWillReceiveProps1', () => {
    const { wrapper } = iconLoading({
      loading: { center: false },
    });
    wrapper.setProps({ loading: { center: true } });
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });
});
