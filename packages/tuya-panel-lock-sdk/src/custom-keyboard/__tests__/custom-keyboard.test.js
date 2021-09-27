import React from 'react';
import { shallow } from 'enzyme';
import CustomKeyboard from '../index';

describe('custom keyboard components', () => {
  it('basic render', () => {
    const props = {
      visible: true,
      maxNum: 9,
      themeColor: '#239C8E',
      confirmText: 'Confirm',
      onConfirm: jest.fn(),
      onMaskPress: jest.fn(),
      onValueChange: () => {},
    };
    const wrapper = shallow(<CustomKeyboard {...props} />);
    wrapper.find('TouchableOpacity').at(0).simulate('press');
    wrapper.find('ThemedButton').at(0).simulate('press');
    expect(wrapper).toMatchSnapshot();
  });
});
