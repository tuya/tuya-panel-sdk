import React from 'react';
import { View } from 'react-native';
import { shallow } from 'enzyme';
import Progess from '../index';

describe('Progess components', () => {
  it('basic render', () => {
    const wrapper = shallow(<Progess percent={12} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('componentWillReceiveProps render', () => {
    let size = 40;
    const wrapper = shallow(<Progess percent={12} />);
    size = 60;
    wrapper.setProps({ size });
    expect(wrapper).toMatchSnapshot();
    const color = '#FFC204';
    wrapper.setProps({ color });
    wrapper.unmount();
  });
});
