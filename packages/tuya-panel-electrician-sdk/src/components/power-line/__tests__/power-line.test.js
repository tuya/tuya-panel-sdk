import React from 'react';
import { shallow } from 'enzyme';
import PoweLine from '../index';

describe('PushAnimate components', () => {
  it('basic render', () => {
    const wrapper = shallow(<PoweLine pathColor="#981241" animateTime={1000} />);
    expect(wrapper).toMatchSnapshot();
  });
});
