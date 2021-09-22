import React from 'react';
import { shallow } from 'enzyme';
import PusherAnimate from '../index';

describe('PressKey components', () => {
  it('basic render', () => {
    const wrapper = shallow(<PusherAnimate type={null} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('open render', () => {
    let type = null;
    const wrapper = shallow(<PusherAnimate type={type} />);
    type = 'open';
    wrapper.setProps({ type });
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });
  it('close render', () => {
    let type = null;
    const wrapper = shallow(<PusherAnimate type={type} />);
    type = 'close';
    wrapper.setProps({ type });
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });

  it('pause render', () => {
    let type = 'open';
    const wrapper = shallow(<PusherAnimate type={type} />);
    type = 'pause';
    wrapper.setProps({ type });
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });
});
