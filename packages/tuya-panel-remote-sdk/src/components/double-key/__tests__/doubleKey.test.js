import React from 'react';
import { shallow } from 'enzyme';
import { Utils } from 'tuya-panel-kit';
import { Image } from 'react-native';
import DoubleKey from '../index';
import svgs from 'tuya-panel-kit/lib/components/iconfont/svg/defaultSvg';

const { convertX: cx } = Utils.RatioUtils;
const add = require('./res/add.png');
const minus = require('./res/minus.png');
const loading = require('./res/loading.png');

function customizeLoading(props = {}) {
  const wrapper = shallow(<DoubleKey loadingContent={<Image source={loading} />} {...props} />);
  const instance = wrapper.instance();
  return { wrapper, instance };
}

function iconLoading(props = {}) {
  const wrapper = shallow(
    <DoubleKey icon={[svgs.minus, svgs.plus]} iconSize={cx(16)} {...props} />
  );
  const instance = wrapper.instance();
  return { wrapper, instance };
}

describe('PressKey components', () => {
  it('icon render', () => {
    const wrapper = shallow(
      <DoubleKey
        icon={[svgs.minus, svgs.plus]}
        tip="volume"
        iconSize={cx(16)}
        status={[true, false]}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('image render', () => {
    const wrapper = shallow(
      <DoubleKey
        img={[add, minus]}
        status={true}
        tip=""
        imgStyle={{ width: cx(20) }}
        type="horizontal"
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('text render', () => {
    const wrapper = shallow(
      <DoubleKey text={['add', 'minus']} textStyle={{ fontSize: cx(12) }} status={true} />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('customize render', () => {
    const wrapper = shallow(
      <DoubleKey
        radius={cx(34)}
        padding={cx(2)}
        width={cx(68)}
        height={cx(150)}
        contentColor="white"
        status={[true, false]}
        bgColor="rgb(249,206,94)"
        activeBgColor="rgba(249,206,94,0.5)"
        outBgColor="rgba(249,206,94,0.2)"
        disabledBgColor="rgba(249,206,94,0.5)"
        disabledContentColor="#F0F0F0"
        outStyle={{ marginTop: cx(20) }}
        useART={false}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('onPress render', () => {
    const wrapper = shallow(
      <DoubleKey
        tip="channel"
        status={true}
        repeat={true}
        repeatIntervalTime={1000}
        onPress={() => console.log('onPress')}
        onLongPress={() => console.log('onLongPress')}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('componentWillReceiveProps0', () => {
    const { wrapper } = customizeLoading({
      loading: [false, true],
    });
    wrapper.setProps({ loading: [true, false] });
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });
  it('componentWillReceiveProps1', () => {
    const { wrapper } = iconLoading({
      loading: [true, false],
    });
    wrapper.setProps({ loading: [false, true] });
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });
});
