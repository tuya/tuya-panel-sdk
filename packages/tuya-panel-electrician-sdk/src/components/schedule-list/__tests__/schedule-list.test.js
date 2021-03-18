import React from 'react';
import { View } from 'react-native';
import { shallow } from 'enzyme';
import ScheduleList from '../index';

describe('ScheduleList components', () => {
  it('basic render', () => {
    const wrapper = shallow(<ScheduleList dpCodes={[]} />);
    expect(wrapper).toMatchSnapshot();
  });
});
