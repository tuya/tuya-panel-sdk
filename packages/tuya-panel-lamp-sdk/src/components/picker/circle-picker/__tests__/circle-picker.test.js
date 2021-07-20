import React from 'react';
import { View } from 'react-native';
import { shallow } from 'enzyme';
import CirclePicker from '../index';

describe('CirclePicker components', () => {
  const origConsole = console.error;
  beforeEach(() => {
    console.error = () => {};
  });
  afterEach(() => {
    console.error = origConsole;
  });

  it('basic render', () => {
    let value = 1000;
    const wrapper = shallow(<CirclePicker value={value} />);
    expect(wrapper).toMatchSnapshot();

    value = 500;
    wrapper.setProps({ value });
  });

  it('componentWillReceiveProps render', () => {
    let disabled = false;
    let hideThumb = false;

    const wrapper = shallow(<CirclePicker disabled={disabled} hideThumb={hideThumb} />);
    expect(wrapper).toMatchSnapshot();

    disabled = true;
    wrapper.setProps({ disabled });

    hideThumb = true;
    wrapper.setProps({ hideThumb });

    wrapper.setProps({
      renderThumb: () => {
        return <View />;
      },
    });

    wrapper.unmount();
  });

  it('render touch', () => {
    const wrapper = shallow(<CirclePicker disabled={false} value={1000} innerRadius={0} />);

    const pander = wrapper.findWhere(
      c => c.name() === 'View' && !!c.prop('onStartShouldSetResponder') === true
    );

    pander.simulate('startShouldSetResponder', { nativeEvent: { locationX: 216, locationY: 211 } });

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
    expect(wrapper).toMatchSnapshot();
  });

  it('render touch disabled', () => {
    const wrapper = shallow(<CirclePicker value={1000} />);

    const pander = wrapper.findWhere(
      c => c.name() === 'View' && !!c.prop('onStartShouldSetResponder') === true
    );
    wrapper.setProps({ disabled: true });
    pander.simulate('startShouldSetResponder', { nativeEvent: { locationX: 45, locationY: 3 } });
    expect(wrapper).toMatchSnapshot();
  });
});
