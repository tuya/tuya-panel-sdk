import React from 'react';
import { shallow } from 'enzyme';
import TopBarWithArc from '../index';

describe('TopBarWithArc components', () => {
  it('basic render', () => {
    const wrapper = shallow(<TopBarWithArc />);
    expect(wrapper).toMatchSnapshot();
  });
});
