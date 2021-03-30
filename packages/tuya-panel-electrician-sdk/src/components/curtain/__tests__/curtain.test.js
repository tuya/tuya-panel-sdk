import React from 'react';
import { shallow } from 'enzyme';
import Curatin from '../index';

describe('Countdown components', () => {
  it('basic render', () => {
    const wrapper = shallow(<Curatin codes={{}} min={0} max={100} />);
    expect(wrapper).toMatchSnapshot();
  });
});
