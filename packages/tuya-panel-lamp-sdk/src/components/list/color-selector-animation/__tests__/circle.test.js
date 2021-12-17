import React from 'react';
import { shallow } from 'enzyme';
import Circle from '../Circle';

describe('Circle components', () => {
  it('basic render', () => {
    const wrapper = shallow(<Circle scaleValue="#333" backgroundColor="#fff" />);
    expect(wrapper).toMatchSnapshot();
  });
});
