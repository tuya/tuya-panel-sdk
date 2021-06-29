import React from 'react';
import { shallow } from 'enzyme';
import { SetPassword, SetPasswordModal } from '../index';

describe('SetPassword components', () => {
  it('basic render', () => {
    const wrapper = shallow(<SetPassword />);
    expect(wrapper).toMatchSnapshot();
  });
});
