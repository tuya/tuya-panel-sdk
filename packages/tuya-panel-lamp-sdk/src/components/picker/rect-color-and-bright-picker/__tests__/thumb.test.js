/**
 * @jest-environment jsdom
 */
import React from 'react';
import { shallow, mount } from 'enzyme';
import Thumb from '../Thumb';

describe('Thumb', () => {
  const origConsole = console.error;
  beforeEach(() => {
    console.error = () => {};
  });
  afterEach(() => {
    console.error = origConsole;
  });

  it('base render', () => {
    const wrapper = shallow(<Thumb x={10} y={0} />);

    wrapper.instance().setNativeProps({ x: 30, y: 20 });

    wrapper.setProps({ x: 10, y: 10 });

    expect(wrapper).toMatchSnapshot();

    wrapper.unmount();
  });

  it('basic mount', () => {
    const wrapper = mount(<Thumb x={10} y={0} />);
    expect(wrapper).toMatchSnapshot();

    wrapper.instance().setNativeProps({ color: '#fff' });

    wrapper.unmount();
  });
});
