import React from 'react';
import { shallow } from 'enzyme';
import AddBtn from '../AddBtn';

describe('AddBtn components', () => {
  it('basic render', () => {
    const wrapper = shallow(<AddBtn btnColor={'#333'} />);
    expect(wrapper).toMatchSnapshot();
  });
});
