import React from 'react';
import { View } from 'react-native';
import { shallow } from 'enzyme';
import DropDown from '../index';

describe('Nameditor components', () => {
  it('basic render', () => {
    const wrapper = shallow(
      <DropDown
        content={() => <View />}
        themeColor="#812345"
        tintColor="#ffffff"
        title="title"
        iconPath="M512 0a365.714286 365.714286 0 0 1 365.714286 365.714286c0 134.582857-121.929143 354.011429-365.714286 658.285714-243.785143-304.274286-365.714286-523.702857-365.714286-658.285714a365.714286 365.714286 0 0 1 365.714286-365.714286z m0 219.428571a146.285714 146.285714 0 1 0 0 292.571429 146.285714 146.285714 0 0 0 0-292.571429z"
        style={{ backgroundColor: '#129012' }}
        topStyle={{ backgroundColor: '#983124' }}
        arrow={true}
        maxHeight={300}
        titleStyle={{ color: '#333333' }}
        duration={2000}
        animateWapperStyle={{ backgroundColor: '#129087' }}
        icon="M512 0a365.714286 365.714286 0 0 1 365.714286 365.714286c0 134.582857-121.929143 354.011429-365.714286 658.285714-243.785143-304.274286-365.714286-523.702857-365.714286-658.285714a365.714286 365.714286 0 0 1 365.714286-365.714286z m0 219.428571a146.285714 146.285714 0 1 0 0 292.571429 146.285714 146.285714 0 0 0 0-292.571429z"
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
