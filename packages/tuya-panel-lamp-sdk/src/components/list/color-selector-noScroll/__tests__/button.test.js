import React from 'react';
import { shallow } from 'enzyme';
import Button from '../Button';

describe('Button components', () => {
  it('basic render', () => {
    const wrapper = shallow(<Button color={'#333'} />);
    expect(wrapper).toMatchSnapshot();
  });
});
