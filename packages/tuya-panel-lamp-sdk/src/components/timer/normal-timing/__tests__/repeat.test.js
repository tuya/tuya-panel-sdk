import React from 'react';
import { shallow } from 'enzyme';
import Repeat from '../repeat';

const route = {
  params: {
    weeks: [0, 0, 0, 0, 0, 0, 0, 0],
    themeColor: '#fff',
    onChange() {},
    backgroundColor: '#fff',
    weekOptionStyle: {
      centerBgc: '#fff',
      borderBottomColor: '#fff',
      borderColor: '#fff',
    },
    useNavigation: true,
  },
};
const navigation = {
  goBack() {},
};

describe('Repeat components', () => {
  it('basic render', () => {
    const wrapper = shallow(<Repeat navigation={navigation} route={route} />);
    expect(wrapper).toMatchSnapshot();
    wrapper.setProps({
      params: {
        weeks: [1, 0, 1, 1, 1, 1, 1, 0],
      },
    });
  });

  it('render onPress', () => {
    const wrapper = shallow(<Repeat navigation={navigation} route={route} />);
    const targetNode = wrapper.findWhere(
      node => node.name() === 'TouchableOpacity' && !!node.prop('onPress') === true
    );
    targetNode.at(0).simulate('press');
    expect(wrapper).toMatchSnapshot();
  });
});
