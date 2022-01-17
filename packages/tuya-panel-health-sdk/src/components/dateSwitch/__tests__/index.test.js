import React from 'react';
import { View } from 'react-native';
import { shallow } from 'enzyme';
import { DaySwitch, WeekSwitch, MonthSwitch } from '../index';
import Header from '../Header';

describe('DaySwitch components', () => {
  it('basic DaySwitch render', () => {
    const wrapper = shallow(<DaySwitch value={Date.now()} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('basic Header render', () => {
    const wrapper = shallow(<Header value="2022" onPrev={() => {}} onNext={() => {}} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('basic DaySwitch render controlled', () => {
    const wrapper = shallow(<DaySwitch />);
    expect(wrapper).toMatchSnapshot();
  });

  it('basic WeekSwitch render', () => {
    const wrapper = shallow(
      <WeekSwitch
        value={[Date.now(), Date.now()]}
        onChange={dateString => {
          console.log(dateString);
        }}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('basic MonthSwitch render', () => {
    const wrapper = shallow(
      <MonthSwitch
        value={[Date.now(), Date.now()]}
        onChange={(dateString, date) => {
          console.log(dateString);
        }}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
