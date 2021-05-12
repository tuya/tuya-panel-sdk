import React from 'react';
import { render, shallow, mount } from 'enzyme';
import TYIpcBattery from '../index';

describe('IpcBattery components', () => {
  it('basic render', () => {
    const wrapper = shallow(<TYIpcBattery />);
    expect(wrapper).toMatchSnapshot();
  });

  it('render not dpMode', () => {
    const wrapper = shallow(<TYIpcBattery standardDpMode={false} value={80} isCharging />);
    expect(wrapper).toMatchSnapshot();
  });

  it('render middle ele value', () => {
    const wrapper = shallow(<TYIpcBattery standardDpMode={false} value={19} isCharging />);
    expect(wrapper).toMatchSnapshot();
  });
});
