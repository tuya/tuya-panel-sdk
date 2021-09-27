import React from 'react';
import { shallow } from 'enzyme';
import RandomPassword from '../index';

const props = {
  digitalBase: 10,
  isHideZero: false,
  keyBoardVisible: true,
  confirmText: 'dd',
  themeColor: '#239C8E',
  savePassword: jest.fn(),
};

const wrap = () => {
  return shallow(<RandomPassword {...props} />);
};

describe('random password components', () => {
  it('basic render', () => {
    const wrapper = wrap();
    wrapper.find('TouchableOpacity').at(0).simulate('press');
    wrapper.find('ThemedButton').at(0).simulate('press');
    expect(wrapper).toMatchSnapshot();
  });

  it('customKeyboard render', () => {
    const wrapper = wrap();
    const customKeyboard = wrapper.find({ testID: 'customKeyboard' });
    customKeyboard.prop('onMaskPress')();
    customKeyboard.prop('onConfirm')();
    customKeyboard.prop('onValueChange')(-1);
    customKeyboard.prop('onValueChange')(5);
    expect(customKeyboard.prop('confirmText')).toEqual('dd');
  });
});
