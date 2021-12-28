import React from 'react';
import { shallow } from 'enzyme';
import CustomTopBar from '../components/CustomTopBar';

describe('CustomTopBar components', () => {
  it('basic render', () => {
    const props = {
      themeColor: '#fff',
      title: '',
      onSave() {},
      onBack() {},
    };
    const wrapper = shallow(<CustomTopBar {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
