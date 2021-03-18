import React from 'react';
import { shallow } from 'enzyme';
import CountdownList from '../index';

describe('CountdownList components', () => {
  it('basic render', () => {
    const wrapper = shallow(<CountdownList dpCodes={[]} timeUnit="hour" countdownType="hm" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('componentWillReceiveProps render', () => {
    let dpCodes = [];
    const wrapper = shallow(<CountdownList dpCodes={dpCodes} timeUnit="hour" countdownType="hm" />);
    dpCodes = [];
    expect(wrapper).toMatchSnapshot();
    wrapper.setProps({ wrapper });
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });
});
