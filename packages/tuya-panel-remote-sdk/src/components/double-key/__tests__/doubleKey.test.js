import React from 'react';
import { shallow } from 'enzyme';
import DoubleKey from '../index';

describe('PressKey components', () => {
  it('basic render', () => {
    const wrapper = shallow(<DoubleKey />);
    expect(wrapper).toMatchSnapshot();
  });
});
