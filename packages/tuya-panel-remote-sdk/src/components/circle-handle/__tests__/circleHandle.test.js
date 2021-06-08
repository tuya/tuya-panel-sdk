import React from 'react';
import { shallow } from 'enzyme';
import CircleHandle from '../index';

describe('PressKey components', () => {
  it('basic render', () => {
    const wrapper = shallow(<CircleHandle />);
    expect(wrapper).toMatchSnapshot();
  });
});
