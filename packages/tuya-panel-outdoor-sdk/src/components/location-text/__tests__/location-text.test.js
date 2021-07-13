import React from 'react';
import { shallow } from 'enzyme';
import LocationText from '../index';

describe('LocationText components', () => {
  it('basic render', () => {
    const lonlat = {
      longitude: 118.18396600000001,
      latitude: 28.19469100000005,
    };
    const wrapper = shallow(<LocationText lonlat={lonlat} />);
    expect(wrapper).toMatchSnapshot();
  });
});
