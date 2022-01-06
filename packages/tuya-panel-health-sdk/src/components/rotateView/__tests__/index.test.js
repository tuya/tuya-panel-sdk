import React from 'react';
import { View } from 'react-native';
import { shallow } from 'enzyme';
import RotateView from '../index';

describe('RotateView components', () => {
  it('basic render', () => {
    const wrapper = shallow(
      <RotateView active>
        <View style={{ width: 200, height: 200 }} />
      </RotateView>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
