import React from 'react';
import { shallow } from 'enzyme';
import LampPreview from '../index';

describe('LampPreview components', () => {
  it('basic render', () => {
    const wrapper = shallow(<LampPreview workMode="white" bright={800} temperature={0} />);
    expect(wrapper).toMatchSnapshot();

    wrapper.setProps({
      workMode: 'colour',
      colour: {
        hue: 180,
        saturation: 800,
        value: 1000,
      },
    });

    wrapper.setProps({
      workMode: 'scene',
      sceneColors: [
        {
          hue: 180,
          saturation: 800,
          value: 1000,
        },
      ],
    });
    wrapper.setProps({
      workMode: 'scene',
      sceneColors: [
        {
          bright: 1000,
          temperature: 200,
        },
      ],
    });
  });
});
