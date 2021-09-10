import React from 'react';
import { shallow } from 'enzyme';
import { View, Text } from 'react-native';
import TYIpcGridList from '../index';

const data = [
  { name: 'Button1' },
  { name: 'Button2' },
  { name: 'Button3' },
  { name: 'Button4' },
  { name: 'Button5' },
];

const renderItem = itemObj => {
  const { item } = itemObj;
  return (
    <View>
      <Text>{item.name}</Text>
    </View>
  );
};

const handlePress = item => {
  console.log(item);
};

describe('TYIpcGridList components', () => {
  it('default', () => {
    const wrapper = shallow(<TYIpcGridList data={data} renderItem={renderItem} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('press', () => {
    const wrapper = shallow(
      <TYIpcGridList data={data} renderItem={renderItem} onPress={handlePress} />
    );

    const targetNode = wrapper.findWhere(node => node.name() === 'TouchableOpacity');
    targetNode.at(0).simulate('press');
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });

  it('other param', () => {
    const wrapper = shallow(
      <TYIpcGridList
        data={data}
        renderItem={renderItem}
        isCover
        keyExtractor={item => item.name}
        rowNumber={2}
        containerHorizontalWidth={15}
        containerVerticalWidth={15}
        marginHorizontalWidth={10}
        marginVerticalWidth={10}
      />
    );

    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });
});
