import React from 'react';
import { shallow } from 'enzyme';
import RCTGyroMap from '../index';

describe('RCTGyroMap components', () => {
  it('basic render', () => {
    const wrapper = shallow(<RCTGyroMap />);
    expect(wrapper).toMatchSnapshot();
  });
});
