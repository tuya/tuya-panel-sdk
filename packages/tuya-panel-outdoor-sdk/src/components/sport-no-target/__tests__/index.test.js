import React from 'react';
import { Text } from 'react-native';
import { shallow, mount } from 'enzyme';
import SportNoTarget from '../index';

describe('sport-no-target components', () => {
  it('basic render', () => {
    const wrapper = shallow(
      <SportNoTarget
        style={{ backgroundColor: '#0376FF' }}
        bgImage={0}
        centerImage={0}
        spotImage={0}
        centerView={<Text>123</Text>}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
