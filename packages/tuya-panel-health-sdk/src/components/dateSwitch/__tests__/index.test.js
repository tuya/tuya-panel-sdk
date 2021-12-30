import React from 'react';
import { View } from 'react-native';
import { shallow } from 'enzyme';
import { DaySwitch, WeekSwitch, MonthSwitch } from '../index';

describe('DaySwitch components', () => {
  it('basic DaySwitch render', () => {
    const wrapper = shallow(<DaySwitch value={Date.now()} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('basic DaySwitch render controlled', () => {
    const wrapper = shallow(<DaySwitch />);
    expect(wrapper).toMatchSnapshot();
  });

  it('basic WeekSwitch render', () => {
    const wrapper = shallow(<WeekSwitch />);
    expect(wrapper).toMatchSnapshot();
  });

  it('basic MonthSwitch render', () => {
    const wrapper = shallow(<MonthSwitch />);
    expect(wrapper).toMatchSnapshot();
  });
});
