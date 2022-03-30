/**
 * @jest-environment jsdom
 */
import React from 'react';
import { shallow, mount } from 'enzyme';
import Slider, { Percent } from '../Slider';

describe('Slider', () => {
  const origConsole = console.error;
  beforeEach(() => {
    console.error = () => {};
  });
  afterEach(() => {
    console.error = origConsole;
  });

  it('basic render', () => {
    const wrapper = shallow(<Slider value={100} />);

    expect(wrapper).toMatchSnapshot();

    wrapper.unmount();
  });

  it('basic mount', () => {
    const wrapper = mount(<Slider value={100} />);
    expect(wrapper).toMatchSnapshot();

    wrapper.unmount();
  });
});
