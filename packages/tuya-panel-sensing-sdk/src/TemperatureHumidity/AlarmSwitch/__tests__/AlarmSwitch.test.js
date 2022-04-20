/**
 * @jest-environment jsdom
 */
import React from 'react';
import { shallow, mount } from 'enzyme';
import AlarmSwitch from '../index';

global.document = document;
global.window = window;

describe('MultiSlider', () => {
  it('basic demo', () => {
    const wrapper = shallow(<AlarmSwitch />);
    expect(wrapper).toMatchSnapshot();
  });

  it('basic demo1', () => {
    const wrapper = mount(<AlarmSwitch min={0} max={100} />);
    expect(wrapper).toMatchSnapshot();
  });
});
