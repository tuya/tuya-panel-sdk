import React from 'react';
import { shallow } from 'enzyme';
import DefaultLabel from '../DefaultLabel';

describe('default label', () => {
  it('default render', () => {
    const props = {
      oneMarkerValue: 0,
      twoMarkerValue: 100,
      oneMarkerLeftPosition: 10,
      twoMarkerLeftPosition: 100,
      oneMarkerPressed: false,
      twoMarkerPressed: true,
      unit: '%',
      sliderLabelStyle: {},
    };
    const wrapper = shallow(<DefaultLabel {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
