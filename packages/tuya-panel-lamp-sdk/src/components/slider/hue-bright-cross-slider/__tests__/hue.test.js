import React from 'react';
import { shallow } from 'enzyme';
import Hue from '../Hue';

describe('Hue components', () => {
  it('basic render', () => {
    const wrapper = shallow(<Hue hue={30} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('componentWillReceiveProps render', () => {
    let hue = 0;
    let size = 10;

    const wrapper = shallow(<Hue hue={hue} size={size} />);
    expect(wrapper).toMatchSnapshot();

    hue = 30;
    wrapper.setProps({ hue });

    size = 30;
    wrapper.setProps({ size });

    wrapper.instance().update(500);

    wrapper.instance().handleUpdateThumb({ value: 500 });

    wrapper.unmount();
  });
});
