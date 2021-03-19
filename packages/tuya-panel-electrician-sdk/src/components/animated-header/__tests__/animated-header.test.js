/* eslint-disable jest/expect-expect */
import React from 'react';
import { shallow, mount } from 'enzyme';
import { View } from 'react-native';
import AnimatedHeader from '../index';
import Header from '../component/header';
import TopAnimation from '../component/topAnimation';
import { TYSdk } from 'tuya-panel-kit';

const TYEvent = TYSdk.event;

function setup(props = {}) {
  const wrapper = shallow(<AnimatedHeader {...props} />);
  const instance = wrapper.instance();
  return { wrapper, instance };
}

describe('AnimsatedHeader components', () => {
  it('unmount AnimsatedHeader', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });

  it('state AnimsatedHeader', () => {
    const { wrapper } = setup();
    wrapper.setState({
      isScreening: true,
    });
  });

  it('AnimatedHeader render', () => {
    const wrapper = shallow(
      <AnimatedHeader
        title="title"
        animateTitle="screening"
        maxHeight={200}
        tintColor="#272929"
        rightDisable={false}
        speed={200}
        content={() => <View />}
        iconPath={null}
        headerTextColor="#333333"
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('Header render', () => {
    const wrapper = shallow(
      <Header
        title="title"
        opacity={1}
        rightDisable={true}
        tintColor="#272929"
        iconPath={null}
        headerTextColor="#333333"
        setChange={jest.fn()}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('TopAnimation render', () => {
    const wrapper = shallow(
      <TopAnimation
        height={300}
        opacity={1}
        content={() => <View />}
        setChange={value => handleToSet(value)}
      />
    );
    const handleToSet = val => {
      const showMask = val === 0;
      showMask &&
        wrapper.setState({
          isScreening: showMask,
        });
    };
    expect(wrapper).toMatchSnapshot();
  });
  it('TopAnimation no content render', () => {
    const wrapper = shallow(
      <TopAnimation height={300} opacity={1} setChange={value => handleToSet(value)} />
    );
    const handleToSet = val => {
      const showMask = val === 0;
      showMask &&
        wrapper.setState({
          isScreening: showMask,
        });
    };
    expect(wrapper).toMatchSnapshot();
  });
});
