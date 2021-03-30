import React from 'react';
import { View } from 'react-native';
import { shallow } from 'enzyme';
import SliderLayout from '../index';

describe('SocketView components', () => {
  it('basic render', () => {
    const fn = jest.fn();
    const wrapper = shallow(
      <SliderLayout
        baseLayout={fn}
        children={<View />}
        style={{ backgroundColor: '#124122' }}
        contentStyle={{ backgroundColor: '#924122' }}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
