import React from 'react';
import { shallow } from 'enzyme';
import TYIpcGpsSignal from '../index';

describe('TYIpcGpsSignal components', () => {
  it('basic render', () => {
    const wrapper = shallow(
      <TYIpcGpsSignal containerStyle={{ marginLeft: 50 }} gpsSignal={0} lteSignal={50} />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('gps render', () => {
    const wrapper = shallow(<TYIpcGpsSignal containerStyle={{ marginLeft: 50 }} gpsSignal={0} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('lte render', () => {
    const wrapper = shallow(<TYIpcGpsSignal containerStyle={{ marginLeft: 50 }} lteSignal={50} />);
    expect(wrapper).toMatchSnapshot();
  });
});
