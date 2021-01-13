import React from 'react';
import { View } from 'react-native';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Diffusion from '../index';

describe('Diffusion components', () => {
  it('basic render', () => {
    const wrapper = shallow(
      <Diffusion
        renderContent={() => {
          return (
            <View style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: '#fff' }} />
          );
        }}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
