import React from 'react';
import { shallow } from 'enzyme';
import TYIpcTimerInterval from '../index';

describe('TYIpcTimerInterval components', () => {

  it('basic render', () => {
    const wrapper = shallow(<TYIpcTimerInterval />);
    expect(wrapper).toMatchSnapshot();
  });
  it('start value hour less than 10 and more than the 0', () => {
    const wrapper = shallow(<TYIpcTimerInterval startValue={7200} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('start value hour more than 10', () => {
    const wrapper = shallow(<TYIpcTimerInterval startValue={72000} />);
    expect(wrapper).toMatchSnapshot();
  });
});
