import React from 'react';
import { shallow } from 'enzyme';
import GetPassword from '../index';

describe('getPassword components', () => {
  it('basic render', () => {
    const wrapper = shallow(<GetPassword onValueChange={jest.fn()}></GetPassword>);
    expect(wrapper).toMatchSnapshot();
  });
  it('passwordColor render', () => {
    const wrapper = shallow(
      <GetPassword passwordColor={'pink'} onValueChange={jest.fn()}></GetPassword>
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('passwordNumber render', () => {
    const wrapper = shallow(
      <GetPassword
        randomText="随机生成"
        passwordNumber={6}
        inputItemText="请输入"
        randomTextColor="#0076FF"
        passwordColor="#0076FF"
        onValueChange={jest.fn()}
      ></GetPassword>
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('should TouchableOpacity event', () => {
    const setupThree = (props = {}) => {
      const wrapper = shallow(
        <GetPassword
          randomText="随机生成"
          passwordNumber={6}
          inputItemText="请输入"
          randomTextColor="#0076FF"
          passwordColor="#0076FF"
          onValueChange={jest.fn()}
        ></GetPassword>
      );
      const instance = wrapper.instance();
      return { wrapper, instance };
    };
    const { wrapper } = setupThree();
    const targetNode = wrapper.findWhere(
      node => node.name() === 'TouchableOpacity' && !!node.prop('onPress') === true
    );
    targetNode.at(0).simulate('press');
    expect(wrapper).toMatchSnapshot();
  });
});
