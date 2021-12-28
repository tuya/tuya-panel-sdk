import React from 'react';
import { View, Text } from 'react-native';
import { shallow } from 'enzyme';
import BubbleTip from '../index';

const configList = [
  {
    text: 1,
    key: 1,
    type: 'safe',
    wrapStyle: {
      backgroundColor: 'skyblue',
    },
    textStyle: {
      color: 'red',
    },
  },
  {
    text: 2,
    key: 2,
  },
];

describe('BubbleTip components', () => {
  it('BubbleTip config render', () => {
    const wrapper = shallow(<BubbleTip configList={configList} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('BubbleTip define render', () => {
    const wrapper = shallow(
      <BubbleTip>
        {configList.map(item => {
          return (
            <View key={item.key}>
              <Text>{item.text}</Text>
            </View>
          );
        })}
      </BubbleTip>
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('BubbleTip.Base config render', () => {
    const wrapper = shallow(
      <BubbleTip.Base
        runInTime={500}
        waitingTime={800}
        leavingTime={1000}
        configList={configList}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
