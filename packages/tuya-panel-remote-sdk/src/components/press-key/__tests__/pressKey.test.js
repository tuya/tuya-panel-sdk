import React from 'react';
import { shallow } from 'enzyme';
import PressKey from '../index';

describe('PressKey components', () => {
  it('basic render', () => {
    const wrapper = shallow(<PressKey />);
    expect(wrapper).toMatchSnapshot();
  });
});
