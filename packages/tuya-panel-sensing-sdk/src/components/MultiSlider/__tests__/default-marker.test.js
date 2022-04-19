import React from 'react';
import { shallow } from 'enzyme';
import DefaultMarker from '../DefaultMarker';

describe('default label', () => {
  it('default render', () => {
    const props = {
      enabled: false,
      pressed: true,
      pressedMarkerStyle: {},
      markerStyle: {},
      disabledMarkerStyle: {},
      size: 24,
    };
    const wrapper = shallow(<DefaultMarker {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
