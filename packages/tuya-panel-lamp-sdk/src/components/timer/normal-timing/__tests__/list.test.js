import React from 'react';
import { shallow } from 'enzyme';
import { Text } from 'react-native';
import List from '../timer/list';

const props = {
  onGetCloudTimerList() {},
  onEditItem() {},
  is24Hour: true,
  category: 'timer_1',
  noTimerTintColor: '#fff',
  themeColor: '#fff',
  fontColor: '#fff',
  timeStyle: {},
  listHeaderComponent: () => <Text>fff</Text>,
  renderSwipeDelElement: () => <Text>fff</Text>,
  switchOptionStyle: {
    style: {},
    size: 12,
    tintColor: '#fff',
    thumbTintColor: '#fff',
    thumbStyle: {},
    onThumbBorderColor: '#fff',
    offThumbBorderColor: '#fff',
  },
};

const list = [
  {
    timerId: 'timer1',
    status: false,
    hour: 1,
    minute: 60,
    weeks: [1, 1, 1, 1, 1, 1, 1, 0],
    key: `timer_1`,
    type: 'timer',
    index: 0,
    dpPowerValue: false,
    workMode: 'white',
    hue: 0,
    saturation: 0,
    value: 0,
    temperature: 0,
    brightness: 0,
  },
];

describe('List components', () => {
  it('basic render', () => {
    const wrapper = shallow(<List {...props} />);
    expect(wrapper).toMatchSnapshot();
    wrapper.setProps({
      timerList: [
        {
          timerId: 'timer1',
          status: false,
          hour: 1,
          minute: 60,
          weeks: [1, 1, 1, 1, 1, 1, 1, 0],
          key: `timer_1`,
          type: 'timer',
          index: 0,
          dpPowerValue: false,
          workMode: 'white',
          hue: 0,
          saturation: 0,
          value: 0,
          temperature: 0,
          brightness: 0,
        },
      ],
    });
  });

  it('base renderItem', () => {
    const wrapper = shallow(<List {...props} />);
    const targetNode = wrapper.findWhere(
      node => node.name() === 'FlatList' && !!node.prop('renderItem') === true
    );
    targetNode.at(0).simulate('press', list);
    expect(wrapper).toMatchSnapshot();
  });
});
