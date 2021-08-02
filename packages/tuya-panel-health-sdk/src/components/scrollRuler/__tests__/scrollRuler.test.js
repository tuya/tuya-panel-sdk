import React from 'react';
import { View } from 'react-native';
import { mount, shallow } from 'enzyme';
import ScrollRuler from '../index';

function setup(props = {}) {
  const wrapper = shallow(<ScrollRuler {...props} />);
  const instance = wrapper.instance();
  return { wrapper, instance };
}
const themeColor = 'pink';

describe('Progess components', () => {
  it('basic render', () => {
    const { wrapper, instance } = setup({
      min: 0,
      max: 10,
      value: 2,
      scaleColor: themeColor,
      valueStyle: { color: themeColor },
      titleStyle: { color: themeColor },
      pointerStyle: { borderBottomColor: themeColor },
      title: '体重',
      scaleShortHeight: 22,
      scaleMiddleHeight: 26,
      scaleLongHeight: 32,
      formatValue: jest.fn(),
      onChange: jest.fn(),
    });

    wrapper.setProps({ value: 6 });

    const renderItemWrapper = wrapper.find('FlatList').renderProp('renderItem')({
      item: { index: 1 },
    });
    expect(renderItemWrapper).toMatchSnapshot();
    expect(wrapper).toMatchSnapshot();
  });
});
