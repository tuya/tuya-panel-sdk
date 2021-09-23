import React from 'react';
import { shallow } from 'enzyme';
import AnimatedNumber from '../index';

describe('getPassword components', () => {
  it('basic render', () => {
    const wrapper = shallow(<AnimatedNumber />);
    expect(wrapper).toMatchSnapshot();
  });

  it('useeffect event', () => {
    let useEffect;
    const mockUseEffect = () => {
      useEffect.mockImplementationOnce(f => f());
    };
    useEffect = jest.spyOn(React, 'useEffect');
    mockUseEffect();
    const wrapper = shallow(<AnimatedNumber />);
    expect(wrapper).toMatchSnapshot();
    wrapper.setProps({ loop: true });
    mockUseEffect();
  });

  it('props change', () => {
    const props = {
      loop: true,
      end: 0,
      onStart: jest.fn(),
      onEnd: jest.fn(),
      onLoop: jest.fn(),
    };
    let useEffect;
    const mockUseEffect = () => {
      useEffect.mockImplementationOnce(f => f());
    };
    useEffect = jest.spyOn(React, 'useEffect');
    mockUseEffect();
    const wrapper = shallow(React.createElement(<AnimatedNumber {...props} />));
    expect(wrapper).toMatchSnapshot();
    wrapper.setProps({ loop: true });
    expect(wrapper).toMatchSnapshot();
  });
});
