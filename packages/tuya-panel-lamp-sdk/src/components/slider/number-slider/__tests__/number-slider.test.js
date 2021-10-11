import React from 'react';
import { View } from 'react-native';
import { shallow } from 'enzyme';
import NumberSlider from '../index';

describe('NumberSlider components', () => {
  it('basic render', () => {
    let value = 0;
    const wrapper = shallow(
      <NumberSlider
        value={value}
        showAnimation={false}
        showMax={900}
        showMin={10}
        visibleTint={false}
      />
    );
    expect(wrapper).toMatchSnapshot();

    value = 100;
    wrapper.setProps({ value });

    wrapper.setProps({
      renderThumb: () => {
        return <View />;
      },
    });
  });

  it('componentWillReceiveProps render', () => {
    let value = 0;
    let direction = 'horizontal';
    let trackSlideEnabled = false;

    const wrapper = shallow(
      <NumberSlider value={value} direction={direction} trackSlideEnabled={trackSlideEnabled} />
    );

    wrapper.simulate('layout', { nativeEvent: { layout: {} } });

    expect(wrapper).toMatchSnapshot();

    value = 100;
    wrapper.setProps({ value });

    direction = 'vertical';
    wrapper.setProps({ direction });

    trackSlideEnabled = true;
    wrapper.setProps({ trackSlideEnabled });

    wrapper.setProps({
      renderThumb: () => {
        return <View />;
      },
    });

    wrapper.unmount();
  });

  it('render touch', () => {
    const wrapper = shallow(<NumberSlider disabled={false} value={300} />);

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

  it('render touch disabled', () => {
    const wrapper = shallow(<NumberSlider value={300} trackSlideEnabled={false} />);

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

    wrapper.setProps({ disabled: true });
    pander.simulate('startShouldSetResponder', { nativeEvent: { locationX: 90, locationY: 25 } });
    pander.simulate('moveShouldSetResponder');
    pander.simulate('responderTerminationRequest');
    pander.simulate('responderGrant', {
      nativeEvent: { touches: [] },
      touchHistory: { touchBank: [] },
    });
    expect(wrapper).toMatchSnapshot();
  });
});
