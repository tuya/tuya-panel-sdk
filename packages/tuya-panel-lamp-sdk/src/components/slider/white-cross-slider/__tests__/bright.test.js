import React from 'react';
import { shallow } from 'enzyme';
import Bright from '../Bright';

describe('Bright components', () => {
  it('basic render', () => {
    const wrapper = shallow(<Bright bright={30} min={10} max={1000} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('componentWillReceiveProps render', () => {
    let bright = 0;
    let size = 10;

    const wrapper = shallow(<Bright bright={bright} size={size} min={10} max={1000} />);
    expect(wrapper).toMatchSnapshot();

    bright = 30;
    wrapper.setProps({ bright });

    size = 30;
    wrapper.setProps({ size });

    wrapper.instance().update(500);

    wrapper.instance().handleUpdatePercent({ value: 500 });

    wrapper.setProps({ formatPercent: v => v });

    wrapper.unmount();
  });
});
