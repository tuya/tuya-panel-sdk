import React from 'react';
import { shallow } from 'enzyme';
import RCTLaserMap from '../index';

describe('RCTLaserMap components', () => {
  it('basic render', () => {
    const wrapper = shallow(<RCTLaserMap />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly', () => {
    const wrapper = shallow(<RCTLaserMap pathData={''} planPathData={''} />);
    wrapper.setState({
      layoutHeight: 100,
      layoutWidth: 100,
    });
    expect(wrapper).toMatchSnapshot();
  });
});
