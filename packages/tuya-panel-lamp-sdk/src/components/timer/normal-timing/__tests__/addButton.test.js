import React from 'react';
import { shallow } from 'enzyme';
import AddButton from '../components/AddButton';

describe('AddButton components', () => {
  it('basic render', () => {
    const wrapper = shallow(<AddButton addBtnTintColor="red" />);
    expect(wrapper).toMatchSnapshot();
  });
});
