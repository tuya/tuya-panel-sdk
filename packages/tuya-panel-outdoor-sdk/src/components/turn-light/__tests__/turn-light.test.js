import React from 'react';
import { shallow } from 'enzyme';
import TurnLight from '../index';

describe('ShadowCircleProgress components', () => {
  it('basic render', () => {
    const wrapper = shallow(<TurnLight direction="left" switchLight />);
    expect(wrapper).toMatchSnapshot();
  });
  it('basic render right', () => {
    const wrapper = shallow(<TurnLight direction="right" switchLight />);
    expect(wrapper).toMatchSnapshot();
  });
  it('basic render straight', () => {
    const wrapper = shallow(<TurnLight direction="straight" switchLight />);
    expect(wrapper).toMatchSnapshot();
  });
  it('basic render stop', () => {
    const wrapper = shallow(<TurnLight direction="stop" switchLight />);
    expect(wrapper).toMatchSnapshot();
  });
});
