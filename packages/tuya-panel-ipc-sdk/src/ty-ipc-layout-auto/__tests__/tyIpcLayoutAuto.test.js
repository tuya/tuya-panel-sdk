import React from 'react';
import { Text } from 'react-native';
import { shallow } from 'enzyme';
import TYIpcLayoutAuto from '../index';

describe('IpcLayoutAuto components', () => {
  it('basic render', () => {
    const wrapper = shallow(
      <TYIpcLayoutAuto containerHeight={450}>
        <Text>Hello Ipc</Text>
      </TYIpcLayoutAuto>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('basic render containerHeight less than scrollHeight', () => {
    const wrapper = shallow(
      <TYIpcLayoutAuto containerHeight={5}>
        <Text>Hello Ipc</Text>
      </TYIpcLayoutAuto>
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('scrollEnabled is true', () => {
    const wrapper = shallow(
      <TYIpcLayoutAuto containerHeight={5} scrollEnabled={true}>
        <Text>Hello Ipc</Text>
      </TYIpcLayoutAuto>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
