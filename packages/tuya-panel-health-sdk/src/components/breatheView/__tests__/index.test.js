import React from 'react';
import { View } from 'react-native';
import { shallow } from 'enzyme';
import BreatheView from '../index';

describe('BreatheView components', () => {
  it('basic render', () => {
    const wrapper = shallow(
      <BreatheView active>
        <View style={{ width: 200, height: 200 }} />
      </BreatheView>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
