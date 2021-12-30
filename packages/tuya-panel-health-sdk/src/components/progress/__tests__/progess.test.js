import React from 'react';
import { View } from 'react-native';
import { shallow } from 'enzyme';
import { CircleProgress, LineProgress, StepsProgress } from '../index';

describe('Progess components', () => {
  it('basic render', () => {
    const wrapper = shallow(<CircleProgress percent={12} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('basic LineProgress render', () => {
    const wrapper = shallow(<LineProgress percent={12} color="pink" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('basic StepsProgress render', () => {
    const wrapper = shallow(<StepsProgress percent={12} color="pink" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('componentWillReceiveProps render', () => {
    let size = 40;
    const wrapper = shallow(<CircleProgress percent={12} />);
    size = 60;
    wrapper.setProps({ size });
    expect(wrapper).toMatchSnapshot();
    const color = '#FFC204';
    wrapper.setProps({ color });
    wrapper.unmount();
  });
});
