/**
 * @jest-environment jsdom
 */

import React from 'react';
import { shallow, mount } from 'enzyme';
import LightAnimate from '../index';

// jest.mock('react-native-svg', () => {
//   const realRectSvg = jest.requireActual('react-native-svg');
//   return {
//     ...realRectSvg,
//     Rect: ({ children }) => <>{children}</>,
//     Circle: ({ children }) => <>{children}</>,
//   };
// });
// jest.mock('react-native', () => {
//   const rn = jest.requireActual('react-native');
//   return {
//     ...rn,
//     Image: () => null,
//   };
// });

describe('LightAnimate components', () => {
  it('basic render', () => {
    const wrapper = shallow(<LightAnimate type={null} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('lightTempMinus render', () => {
    let type = null;
    const wrapper = shallow(<LightAnimate type={type} />);
    type = 'lightTempMinus';
    wrapper.setProps({ type });
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });

  it('lightTempAdd render', () => {
    let type = 'lightTempMinus';
    const wrapper = shallow(<LightAnimate type={type} />);
    type = 'lightTempAdd';
    wrapper.setProps({ type });
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });

  it('lightBrightAdd render', () => {
    const duration = 2000;
    const wrapper = shallow(<LightAnimate type={null} duration={duration} />);
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });
});
