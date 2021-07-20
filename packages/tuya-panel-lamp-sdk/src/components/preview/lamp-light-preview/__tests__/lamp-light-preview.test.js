import React from 'react';
import { View } from 'react-native';
import { shallow } from 'enzyme';
import LampLightPreview from '../index';

describe('LampLightPreview components', () => {
  const origConsole = console.error;
  beforeEach(() => {
    console.error = () => {};
  });
  afterEach(() => {
    console.error = origConsole;
  });

  it('basic render', () => {
    const wrapper = shallow(<LampLightPreview workMode="white" bright={800} temperature={0} />);
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
