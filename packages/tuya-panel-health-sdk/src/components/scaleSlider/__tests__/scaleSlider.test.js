import React from 'react';
import { View } from 'react-native';
import { shallow } from 'enzyme';
import ScaleSlider from '../index';

describe('ScaleSlider components', () => {
  it('basic render', () => {
    let defaultValue = 0;
    const wrapper = shallow(<ScaleSlider min={0} max={60} defaultValue={defaultValue} />);
    expect(wrapper).toMatchSnapshot();
    defaultValue = 100;
    wrapper.setProps({ defaultValue });
  });

  it('render touch', () => {
    const wrapper = shallow(<ScaleSlider min={0} max={100} />);

    const pander = wrapper.findWhere(
      c => c.name() === 'View' && !!c.prop('onStartShouldSetResponder') === true
    );

    pander.simulate('startShouldSetResponder', { nativeEvent: { locationX: 326, locationY: 25 } });
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
});
