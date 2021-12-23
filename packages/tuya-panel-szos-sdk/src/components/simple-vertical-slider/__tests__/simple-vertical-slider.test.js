import React from 'react';
import { View } from 'react-native';
import { shallow } from 'enzyme';
import SimpleVerticalSlider from '..';

describe('SimpleVerticalSlider components', () => {
  it('basic render', () => {
    let value = 0;
    const wrapper = shallow(<SimpleVerticalSlider value={value} min={0} max={120} />);
    expect(wrapper).toMatchSnapshot();

    value = 100;
    wrapper.setProps({ value });
  });
  it(' type="linearGradient" render', () => {
    let value = 0;
    const wrapper = shallow(<SimpleVerticalSlider type="linearGradient"  value={value} min={0} max={120} />);
    expect(wrapper).toMatchSnapshot();
    value = 100;
    wrapper.setProps({ value });
  });

  it('render touch', () => {
    const wrapper = shallow(<SimpleVerticalSlider disabled={false} value={70} />);

    const pander = wrapper.findWhere(
      c => c.name() === 'View' && !!c.prop('onStartShouldSetResponder') === true
    );

    pander.simulate('startShouldSetResponder', { nativeEvent: { locationX: 25, locationY: 50 } });
    pander.simulate('moveShouldSetResponder');
    pander.simulate('responderTerminationRequest');
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

    pander.simulate('responderTerminate');
    expect(wrapper).toMatchSnapshot();
  });

  it('render touch disabled', () => {
    const wrapper = shallow(<SimpleVerticalSlider value={50} clickEnabled={false} />);

    const pander = wrapper.findWhere(
      c => c.name() === 'View' && !!c.prop('onStartShouldSetResponder') === true
    );

    pander.simulate('startShouldSetResponder', { nativeEvent: { locationX: 1, locationY: 25 } });
    pander.simulate('moveShouldSetResponder');
    pander.simulate('responderTerminationRequest');
    pander.simulate('responderGrant', {
      nativeEvent: { touches: [] },
      touchHistory: { touchBank: [] },
    });
    pander.simulate('responderTerminate');

    wrapper.setProps({ clickEnabled: true });
    pander.simulate('startShouldSetResponder', { nativeEvent: { locationX: 40, locationY: 25 } });
    pander.simulate('moveShouldSetResponder');
    pander.simulate('responderTerminationRequest');
    pander.simulate('responderGrant', {
      nativeEvent: { touches: [] },
      touchHistory: { touchBank: [] },
    });
    expect(wrapper).toMatchSnapshot();
  });
});
