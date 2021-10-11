/**
 * @jest-environment jsdom
 */
import React from 'react';
import { shallow } from 'enzyme';
import Percent from '../Percent';

describe('Percent', () => {
  it('base render', () => {
    let percent = 100;
    let isVertical = false;
    let layout = 'left';
    const wrapper = shallow(<Percent percent={percent} isVertical={isVertical} layout={layout} />);
    percent = 80;
    wrapper.setProps({ percent });

    percent = 50;
    wrapper.setProps({ percent });

    percent = 10;
    wrapper.setProps({ percent });

    isVertical = true;
    wrapper.setProps({ isVertical });

    layout = 'top';
    wrapper.setProps({ layout });

    wrapper.instance().setNativeProps({ percent: 1 });

    expect(wrapper).toMatchSnapshot();

    wrapper.unmount();
  });
});
