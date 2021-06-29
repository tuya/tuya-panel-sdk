import React from 'react';
import { Image, View } from 'react-native';
import { shallow } from 'enzyme';
import { Utils } from 'tuya-panel-kit';
import svgs from 'tuya-panel-kit/lib/components/iconfont/svg/defaultSvg';
import PressKey from '../index';

const { convertX: cx } = Utils.RatioUtils;
const img = require('./res/add.png');
const loading = require('./res/loading.png');

function customizeLoading(props = {}) {
  const wrapper = shallow(<PressKey loadingContent={<Image source={loading} />} {...props} />);
  const instance = wrapper.instance();
  return { wrapper, instance };
}

function iconLoading(props = {}) {
  const wrapper = shallow(<PressKey icon={svgs.pen} iconSize={cx(16)} {...props} />);
  const instance = wrapper.instance();
  return { wrapper, instance };
}

describe('PressKey components', () => {
  it('icon render', () => {
    const wrapper = shallow(<PressKey icon={svgs.pen} iconSize={cx(16)} status={true} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('image render', () => {
    const wrapper = shallow(<PressKey img={img} status={true} imgStyle={{ width: cx(20) }} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('tip render', () => {
    const wrapper = shallow(
      <PressKey text="Tip" tipStyle={{ color: 'red', fontSize: 16 }} status={false} />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('content render', () => {
    const wrapper = shallow(
      <PressKey content={<View />} contentStyle={{ height: cx(20) }} status={true} />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('customize render', () => {
    const wrapper = shallow(
      <PressKey
        padding={cx(2)}
        width={cx(100)}
        height={cx(50)}
        contentColor="white"
        status={true}
        bgColor="rgb(249,206,94)"
        activeBgColor="rgba(249,206,94,0.5)"
        outBgColor="rgba(249,206,94,0.2)"
        disabledBgColor="rgba(249,206,94,0.5)"
        disabledContentColor="#F0F0F0"
        style={{ borderWidth: 1 }}
        outStyle={{ marginTop: cx(20) }}
        useART={false}
        alwaysPress={true}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('onPress render', () => {
    const wrapper = shallow(
      <PressKey
        text="onPress"
        status={true}
        repeat={true}
        repeatIntervalTime={1000}
        alwaysPress={true}
        onPress={() => console.log('onPress')}
        onLongPress={() => console.log('onLongPress')}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('componentWillReceiveProps0', () => {
    const { wrapper } = customizeLoading({
      loading: false,
    });
    wrapper.setProps({ loading: true });
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });
  it('componentWillReceiveProps1', () => {
    const { wrapper } = iconLoading({
      loading: false,
    });
    wrapper.setProps({ loading: true });
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });
});
