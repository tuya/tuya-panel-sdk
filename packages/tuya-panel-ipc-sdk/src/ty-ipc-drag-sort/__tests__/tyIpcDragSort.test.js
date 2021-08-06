import React from 'react';
import { shallow } from 'enzyme';
import { View, Text } from 'react-native';
import TYIpcDragSort from '../index';

describe('IpcDragSort component', () => {
  it('basic render', () => {
    const arr = [];
    for (let i = 1; i < 20; i++) {
      arr.push({
        id: i,
        name: `lock${i}`,
      });
    }

    const renderItem = item => {
      return (
        <View style={{ flex: 1 }}>
          <Text style={{ color: '#000' }}>{item.name}</Text>
        </View>
      );
    };

    const props = {
      itemHeight: 60,
      onOrder: () => {},
      data: arr,
      renderItem: renderItem,
      orderWidth: 60,
      icon: (
        <View>
          <Text>准</Text>
        </View>
      ),
    };

    const wrapper = shallow(<TYIpcDragSort {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
