/**
 * @jest-environment jsdom
 */
import React from 'react';
import { shallow, mount } from 'enzyme';
import AlarmCloud from '../index';

global.document = document;
global.window = window;

describe('MultiSlider', () => {
  it('basic demo', () => {
    const wrapper = shallow(<AlarmCloud />);
    expect(wrapper).toMatchSnapshot();
  });

  it('basic demo1', () => {
    const wrapper = shallow(<AlarmCloud min={0} max={100} />);
    expect(wrapper).toMatchSnapshot();
  });
});
