/**
 * @jest-environment jsdom
 */
import React from 'react';
import { shallow, mount } from 'enzyme';
import TemperatureScaleSwitching from '../index';

global.document = document;
global.window = window;

describe('MultiSlider', () => {
  it('basic demo', () => {
    const wrapper = shallow(<TemperatureScaleSwitching type="checkBox" title="jioji" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('basic demo1', () => {
    const wrapper = shallow(<TemperatureScaleSwitching type="list" title="jioji" />);
    expect(wrapper).toMatchSnapshot();
  });
  it('basic demo2', () => {
    const wrapper = shallow(
      <TemperatureScaleSwitching type="picker" title="jioji" putDp={jest.fn} schema={{}} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('basic demo3', () => {
    const wrapper = mount(<TemperatureScaleSwitching />);
    expect(wrapper).toMatchSnapshot();
  });
});
