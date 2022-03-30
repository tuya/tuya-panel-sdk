import React from 'react';
import { shallow } from 'enzyme';
import TimingRepeatList from '../index';

describe('TimingRepeatList components', () => {
  it('basic render', () => {
    const wrapper = shallow(<TimingRepeatList />);
    expect(wrapper).toMatchSnapshot();
  });
});
