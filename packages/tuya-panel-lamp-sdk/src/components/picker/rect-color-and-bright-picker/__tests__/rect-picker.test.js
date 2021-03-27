/**
 * @jest-environment jsdom
 */
import React from 'react';
import { shallow, mount } from 'enzyme';
import RectPicker from '../RectPicker';

describe('RectPicker', () => {
  const origConsole = console.error;
  beforeEach(() => {
    console.error = () => {};
  });
  afterEach(() => {
    console.error = origConsole;
  });

  it('basic render', () => {
    const wrapper = shallow(
      <RectPicker value={{ temperature: 100 }} lossShow={false} thumbSize={30} />
    );

    wrapper.setProps({ lossShow: true, thumbSize: 50 });

    expect(wrapper).toMatchSnapshot();

    wrapper.unmount();
  });

  it('render touch', () => {
    const wrapper = shallow(
      <RectPicker
        value={{ temperature: 100 }}
        valueToCoor={({ temperature }, origin) => {
          return origin;
        }}
      />
    );
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
    const wrapper = shallow(<RectPicker value={{ temperature: 100 }} disabled={true} />);
    const pander = wrapper.findWhere(
      c => c.name() === 'View' && !!c.prop('onStartShouldSetResponder') === true
    );

    pander.simulate('layout', { nativeEvent: { layout: {} } });
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
    const wrapper = mount(<RectPicker value={{ temperature: 100 }} />);
    expect(wrapper).toMatchSnapshot();

    wrapper.instance().showPicker = true;

    const rectPicker = wrapper.findWhere(c => c.name() === 'View' && !!c.prop('onLayout')).at(0);

    rectPicker.props().onStartShouldSetResponder({ nativeEvent: { locationX: 45, locationY: 3 } });

    wrapper.unmount();
  });
});
