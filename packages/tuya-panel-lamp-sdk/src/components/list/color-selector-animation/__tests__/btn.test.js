import React from 'react';
import { shallow } from 'enzyme';
import Btn from '../Btn';

describe('Btn components', () => {
  it('basic render', () => {
    const wrapper = shallow(<Btn iconColor="#333" />);
    expect(wrapper).toMatchSnapshot();
  });
});
