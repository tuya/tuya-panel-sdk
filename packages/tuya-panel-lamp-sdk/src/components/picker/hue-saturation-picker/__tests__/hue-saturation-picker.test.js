import React from 'react';
import { shallow } from 'enzyme';
import HueSaturationPicker from '../index';

describe('HueSaturationPicker components', () => {
  it('basic render', () => {
    let value = { hue: 0, saturation: 1000, value: 1000 };
    const wrapper = shallow(
      <HueSaturationPicker
        value={value}
        onChange={jest.fn()}
        onMove={jest.fn()}
        onGrant={jest.fn()}
        onRelease={jest.fn()}
        onPress={jest.fn()}
        style={{
          backgroundColor: '#444',
        }}
        thumbStyle={{
          backgroundColor: '#333',
        }}
      />
    );
    expect(wrapper).toMatchSnapshot();

    value = { hue: 200, saturation: 500, value: 500 };
    wrapper.setProps({ value });
  });

  it('componentWillReceiveProps render', () => {
    let disabled = false;
    let hideThumb = false;
    let touchOffset = 0;
    const wrapper = shallow(<HueSaturationPicker disabled={disabled} hideThumb={hideThumb} />);
    expect(wrapper).toMatchSnapshot();

    disabled = true;
    wrapper.setProps({ disabled });

    hideThumb = true;
    wrapper.setProps({ hideThumb });

    touchOffset = 20;
    wrapper.setProps({ touchOffset });

    wrapper.unmount();
  });

  it('render touch', () => {
    const wrapper = shallow(
      <HueSaturationPicker value={{ hue: 100, saturation: 1000, value: 1000 }} />
    );
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
    expect(wrapper).toMatchSnapshot();
  });

  it('render touch disabled', () => {
    const wrapper = shallow(
      <HueSaturationPicker value={{ hue: 100, saturation: 1000, value: 1000 }} />
    );

    const pander = wrapper.findWhere(
      c => c.name() === 'View' && !!c.prop('onStartShouldSetResponder') === true
    );
    wrapper.setProps({ disabled: true });
    pander.simulate('startShouldSetResponder', { nativeEvent: { locationX: 45, locationY: 3 } });
    expect(wrapper).toMatchSnapshot();
  });
});
