import React from 'react';
import { shallow } from 'enzyme';
import Countdown from '../index';
import { formatTimeValue, getTimePlus } from '../utils';

describe('Countdown components', () => {
  it('basic render', () => {
    const wrapper = shallow(
      <Countdown
        counting={true}
        timeUnit="hour"
        formatString="{0}:{1}:{2}"
        countdownTextStyle={{ color: '#132412' }}
        value={1}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('componentWillReceiveProps render', () => {
    let counting = true;
    let timeUnit = 'hour';
    let value = 1;
    const wrapper = shallow(
      <Countdown
        counting={counting}
        timeUnit="hour"
        formatString="{0}:{1}:{2}"
        countdownTextStyle={{ color: '#132412' }}
        value={1}
      />
    );
    counting = true;
    timeUnit = 'hour';
    value = 1;
    expect(wrapper).toMatchSnapshot();
    wrapper.setProps({ wrapper });
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });

  it('Countdown untis', () => {
    expect(getTimePlus('min')).toEqual(60);
    expect(getTimePlus('hour')).toEqual(3600);
    expect(getTimePlus('s')).toEqual(1);
    expect(formatTimeValue('min', 1)).toEqual(60);
    expect(formatTimeValue('hour', 1)).toEqual(3600);
    expect(formatTimeValue('s', 1)).toEqual(1);
  });
});
