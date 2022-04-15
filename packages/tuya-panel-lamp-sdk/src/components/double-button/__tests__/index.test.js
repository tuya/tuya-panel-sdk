import React from 'react';
import { shallow } from 'enzyme';
import DoubleButton from '../index';

describe('DoubleButton components', () => {
  it('basic render', () => {
    const props = {
      dataSource: {
        left: {
          title: 'test',
          text: 'test',
          activeTitle: 'test',
          activeText: 'test',
        },
        right: {
          title: 'test',
          text: 'test',
          activeTitle: 'test',
          activeText: 'test',
        },
      },
    };
    const wrapper = shallow(<DoubleButton {...props} />);
    const targetNode = wrapper.findWhere(node => {
      return (
        node.name() === 'TouchableOpacity' &&
        !!node.prop('onPress') === true &&
        !!node.prop('onLongPress') === true &&
        !!node.prop('onPressIn') === true &&
        !!node.prop('onPressOut') === true
      );
    });
    targetNode.at(0).props().onPress();
    targetNode.at(0).props().onLongPress();
    targetNode.at(0).props().onPressIn();
    targetNode.at(0).props().onPressOut();

    expect(wrapper).toMatchSnapshot();
  });
});
