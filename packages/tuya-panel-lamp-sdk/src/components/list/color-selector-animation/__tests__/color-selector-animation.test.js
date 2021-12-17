import React from 'react';
import { shallow } from 'enzyme';
import ColorSelectorAnimation from '../index';

describe('ColorSelectorAnimation components', () => {
  it('basic render', () => {
    const props = {
      data: [
        {
          isColour: true,
          hue: 360,
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
      ],
      showAdd: true,
      noWrap: true,
      showDel: false,
      scrollEnabled: true,
      selectIndex: -1,
      scaleValue: 0.65,
      addIconColor: '#000000',
      delIconColor: '#000000',
    };
    const wrapper = shallow(<ColorSelectorAnimation {...props} />);
    expect(wrapper).toMatchSnapshot();
    wrapper.setProps({
      data: [
        {
          isColour: true,
          hue: 190,
          saturation: 600,
          value: 1000,
        },
      ],
      showAdd: false,
      noWrap: false,
      scrollEnabled: false,
      selectIndex: 0,
      scaleValue: 0.7,
      addIconColor: '#333',
      delIconColor: '#333',
    });
  });
});
