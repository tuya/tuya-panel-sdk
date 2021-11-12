import React from 'react';
import { shallow } from 'enzyme';
import Battery from '../index';

describe('Battery components', () => {
  it('basic render', () => {
    const wrapper = shallow(
      <Battery
        batteryPercentageCode="battery_percentage"
        total={80}
        themeColor="#57BCFB"
        chargeState
        deviceOnline
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
