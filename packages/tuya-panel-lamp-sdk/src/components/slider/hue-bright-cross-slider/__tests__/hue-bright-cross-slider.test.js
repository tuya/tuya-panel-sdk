import React from 'react';
import { View } from 'react-native';
import { shallow } from 'enzyme';
import HueBrightCrossSlider from '../index';

describe('HueBrightCrossSlider components', () => {
  it('basic render', () => {
    let value = { hue: 0, saturation: 1000, value: 1000 };
    const wrapper = shallow(<HueBrightCrossSlider value={value} />);
    expect(wrapper).toMatchSnapshot();

    value = { hue: 30, saturation: 800, value: 800 };
    wrapper.setProps({ value });
  });

  it('componentWillReceiveProps render', () => {
    let value = { hue: 0, saturation: 1000, value: 1000 };
    let stepBright = 1;

    const wrapper = shallow(<HueBrightCrossSlider value={value} stepBright={stepBright} />);
    expect(wrapper).toMatchSnapshot();

    value = { hue: 30, saturation: 800, value: 800 };
    wrapper.setProps({ value });

    stepBright = 10;
    wrapper.setProps({ stepBright });

    wrapper.instance().coorToBright(100);
    wrapper.instance().coorToHue(100);
    wrapper.instance().notEqualColour({ hue: 0, value: 1000 }, { hue: 1, value: 10 });

    wrapper.setProps({
      renderThumb: () => {
        return <View />;
      },
    });

    wrapper.unmount();
  });

  it('render touch', () => {
    const wrapper = shallow(
      <HueBrightCrossSlider stepBright={10} value={{ hue: 30, saturation: 800, value: 800 }} />
    );

    const pander = wrapper.findWhere(
      c => c.name() === 'View' && !!c.prop('onStartShouldSetResponder') === true
    );

    pander.simulate('startShouldSetResponder', { nativeEvent: { locationX: 45, locationY: 3 } });

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

    pander.simulate('responderReject');
    pander.simulate('responderTerminate');

    wrapper.setProps({ disabled: true });

    pander.simulate('startShouldSetResponder', { nativeEvent: { locationX: 45, locationY: 3 } });

    expect(wrapper).toMatchSnapshot();
  });
});
