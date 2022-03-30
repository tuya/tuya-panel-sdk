import React from 'react';
import { shallow } from 'enzyme';
import SceneAnimationList from '../index';

describe('SceneAnimationList components', () => {
  it('basic render', () => {
    const props = {
      scenesList: [{ key: 0 }, { key: 1 }, { key: 2 }, { key: '3' }],
    };
    const wrapper = shallow(<SceneAnimationList {...props} />);
    const targetNode = wrapper.findWhere(node => {
      return node.name() === 'TouchableOpacity' && !!node.prop('onPress') === true;
    });
    targetNode.at(0).props().onPress();

    expect(wrapper).toMatchSnapshot();
  });
});
