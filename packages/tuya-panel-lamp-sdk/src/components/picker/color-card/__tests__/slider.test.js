/**
 * @jest-environment jsdom
 */
import React from 'react';
import { shallow, mount } from 'enzyme';
import Slider, { Percent } from '../Slider';

describe('Slider', () => {
  const origConsole = console.error;
  beforeEach(() => {
    console.error = () => {};
  });
  afterEach(() => {
    console.error = origConsole;
  });

  it('basic render', () => {
    const wrapper = shallow(<Slider value={100} />);

    expect(wrapper).toMatchSnapshot();

    wrapper.unmount();
  });

  it('render touch', () => {
    const wrapper = shallow(<Slider value={100} />);
    const pander = wrapper.findWhere(
      c => c.name() === 'View' && !!c.prop('onStartShouldSetResponder') === true
    );

    pander.simulate('layout', { nativeEvent: { layout: {} } });
    pander.simulate('startShouldSetResponder', { nativeEvent: { locationX: 45, locationY: 3 } });

    pander.simulate('moveShouldSetResponder', { nativeEvent: { locationX: 45, locationY: 3 } });
    pander.simulate('responderGrant', {
      nativeEvent: { touches: [] },
      touchHistory: { touchBank: [] },
    });
    pander.simulate('responderMove', {
      nativeEvent: { touches: [] },
      touchHistory: { touchBank: [] },
    });
    pander.simulate('responderRelease', {
      nativeEvent: { touches: [] },
      touchHistory: { touchBank: [] },
    });

    pander.simulate('responderTerminationRequest');
    pander.simulate('responderTerminate');
    expect(wrapper).toMatchSnapshot();
  });

  it('render touch disabled', () => {
    const wrapper = shallow(<Slider value={100} disabled />);
    const pander = wrapper.findWhere(
      c => c.name() === 'View' && !!c.prop('onStartShouldSetResponder') === true
    );

    pander.simulate('startShouldSetResponder', { nativeEvent: { locationX: 45, locationY: 3 } });

    pander.simulate('moveShouldSetResponder');
    pander.simulate('responderGrant', {
      nativeEvent: { touches: [] },
      touchHistory: { touchBank: [] },
    });
    pander.simulate('responderMove', {
      nativeEvent: { touches: [] },
      touchHistory: { touchBank: [] },
    });
    pander.simulate('responderRelease', {
      nativeEvent: { touches: [] },
      touchHistory: { touchBank: [] },
    });

    pander.simulate('responderTerminationRequest');
    pander.simulate('responderTerminate');
    expect(wrapper).toMatchSnapshot();
  });

  it('basic mount', () => {
    const wrapper = mount(<Slider value={100} />);
    expect(wrapper).toMatchSnapshot();

    wrapper.unmount();
  });

  it('Percent render', () => {
    const wrapper = shallow(<Percent percent={10} />);

    wrapper.setProps({ percent: 30 });
    wrapper.setProps({ percent: 70 });

    wrapper.instance().setNativeProps({ percent: 50 });

    expect(wrapper).toMatchSnapshot();

    wrapper.unmount();
  });
});
