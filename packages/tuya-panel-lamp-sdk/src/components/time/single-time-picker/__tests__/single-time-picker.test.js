import React from 'react';
import { shallow } from 'enzyme';
import SingleTimePicker from '../index';

describe('SingleTimePicker components', () => {
  it('basic render', () => {
    const props = {
      is24Hour: false,
      hour: 0,
      minute: 0,
      loop: true,
    };
    const wrapper = shallow(<SingleTimePicker {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('change time', () => {
    const wrapper = shallow(<SingleTimePicker hour={12} minute={12} />);
    expect(wrapper).toMatchSnapshot();
  });
});
