import React from 'react';
import { shallow } from 'enzyme';
import TempHumWithBlur from '../index';

describe('TempHumWithBlur components', () => {
  it('basic render', () => {
    const wrapper = shallow(<TempHumWithBlur />);
    expect(wrapper).toMatchSnapshot();
  });
});
