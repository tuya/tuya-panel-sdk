import React from 'react';
import { shallow } from 'enzyme';
import Temp from '../Temp';

describe('Temp components', () => {
  it('basic render', () => {
    const wrapper = shallow(<Temp temp={30} min={0} max={1000} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('componentWillReceiveProps render', () => {
    let temp = 0;
    let size = 10;

    const wrapper = shallow(<Temp temp={temp} size={size} min={0} max={1000} />);
    expect(wrapper).toMatchSnapshot();

    temp = 30;
    wrapper.setProps({ temp });

    size = 30;
    wrapper.setProps({ size });

    wrapper.instance().update(500);

    wrapper.instance().handleUpdateThumb({ value: 500 });

    wrapper.setProps({ formatPercent: v => v });

    wrapper.unmount();
  });
});
