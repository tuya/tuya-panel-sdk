import React from 'react';
import { View } from 'react-native';
import { shallow } from 'enzyme';
import Nameditor from '../index';

describe('Nameditor components', () => {
  it('basic render', () => {
    const wrapper = shallow(
      <Nameditor
        dpCode="switch_1"
        eventType="Press"
        disabled={false}
        stopPropagation={false}
        wrapperStyle={{ backgroundColor: '#981231' }}
        textStyle={{ fontSize: 12 }}
        icon="M512 0a365.714286 365.714286 0 0 1 365.714286 365.714286c0 134.582857-121.929143 354.011429-365.714286 658.285714-243.785143-304.274286-365.714286-523.702857-365.714286-658.285714a365.714286 365.714286 0 0 1 365.714286-365.714286z m0 219.428571a146.285714 146.285714 0 1 0 0 292.571429 146.285714 146.285714 0 0 0 0-292.571429z"
        iconSize={12}
        iconColor="#812345"
        defaultName="name"
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
