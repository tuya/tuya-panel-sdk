import React from 'react';
import { shallow } from 'enzyme';
import DefendTime from '../index';

describe('defendTime components', () => {
  it('basic render', () => {
    const wrapper = shallow(<DefendTime textColor="#000" tipColor="pink"></DefendTime>);
    expect(wrapper).toMatchSnapshot();
  });
});
