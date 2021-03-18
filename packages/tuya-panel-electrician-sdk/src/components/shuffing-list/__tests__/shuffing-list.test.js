import React from 'react';
import { View } from 'react-native';
import { shallow } from 'enzyme';
import ShuffingList from '../index';

describe('SocketView components', () => {
  it('basic render', () => {
    const wrapper = shallow(
      <ShuffingList
        data={[]}
        themeColor="#718341"
        itemStyle={{ backgroundColor: '#124122' }}
        contentWidth={290}
        itemWidth={90}
        marginRight={10}
        numberOfLines={1}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
