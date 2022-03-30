import React from 'react';
import { shallow } from 'enzyme';
import RangeTime from '../rangeTime';
import SingleTime from '../singleTime';

describe('RangeTime components', () => {
  it('basic render', () => {
    const wrapper = shallow(<RangeTime isEllipsis is24Hour />);
    expect(wrapper).toMatchSnapshot();
    wrapper.setProps({
      isEllipsis: false,
      is24Hour: false,
    });
    wrapper.setProps({
      isEllipsis: true,
      is24Hour: false,
    });
    wrapper.setProps({
      isEllipsis: false,
      is24Hour: true,
    });
  });
});

describe('SingleTime components', () => {
  it('basic render', () => {
    const wrapper = shallow(<SingleTime is24Hour={false} />);
    expect(wrapper).toMatchSnapshot();
    wrapper.setProps({
      is24Hour: true,
    });
  });
});
