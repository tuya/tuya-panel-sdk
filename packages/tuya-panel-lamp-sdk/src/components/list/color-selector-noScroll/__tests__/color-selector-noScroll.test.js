import React from 'react';
import { shallow } from 'enzyme';
import ColorSelectorNoScroll from '../index';

describe('ColorSelectorNoScroll components', () => {
  it('basic render', () => {
    let data = [
      {
        isColour: true,
        hue: 20,
        saturation: 800,
        value: 1000,
      },
      {
        isColour: false,
        brightness: 1000,
        temperature: 0,
      },
      {
        isColour: true,
        hue: 220,
        saturation: 1000,
        value: 1000,
      },
    ];
    const wrapper = shallow(<ColorSelectorNoScroll data={data} />);
    expect(wrapper).toMatchSnapshot();

    data = [
      {
        isColour: true,
        hue: 220,
        saturation: 1000,
        value: 1000,
      },
    ];
    wrapper.setProps({ data });
  });
});
