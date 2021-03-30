import React from 'react';
import { View } from 'react-native';
import { shallow } from 'enzyme';
import Layout from '../index';

describe('Nameditor components', () => {
  it('basic render', () => {
    const fn = jest.fn();
    const wrapper = shallow(
      <Layout
        renderScene={() => <View />}
        renderModalScene={() => <View />}
        showModal={true}
        onChange={fn}
        touchEnableArea={100}
        duration={1000}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
