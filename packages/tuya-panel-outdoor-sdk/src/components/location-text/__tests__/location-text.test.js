import React from 'react';
import { shallow } from 'enzyme';
import LocationText from '../index';

describe('LocationText components', () => {
  it('basic render', () => {
    const wrapper = shallow(
      <LocationText lonlat={{ longitude: 118.18396600000001, latitude: 28.19469100000005 }} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
