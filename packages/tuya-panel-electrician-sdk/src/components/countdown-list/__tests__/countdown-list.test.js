import React from 'react';
import { shallow } from 'enzyme';
import CountdownList from '../index';

describe('CountdownList components', () => {
  it('basic render', () => {
    const wrapper = shallow(
      <CountdownList dpCodes={['countdown_1']} timeUnit="hour" countdownType="hm" />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('componentWillReceiveProps render', () => {
    let dpCodes = ['countdown_1'];
    const wrapper = shallow(<CountdownList dpCodes={dpCodes} timeUnit="hour" countdownType="hm" />);
    dpCodes = ['countdown_2'];
    expect(wrapper).toMatchSnapshot();
    wrapper.setProps({ wrapper });
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });
});
