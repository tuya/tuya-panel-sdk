import React from 'react';
import { View } from 'react-native';
import { shallow } from 'enzyme';
import WhiteBrightCrossSlider from '../index';

describe('WhiteBrightCrossSlider components', () => {
  it('basic render', () => {
    let value = { temperature: 0, brightness: 1000 };
    const wrapper = shallow(<WhiteBrightCrossSlider value={value} />);
    expect(wrapper).toMatchSnapshot();

    value = { temperature: 30, brightness: 800 };
    wrapper.setProps({ value });
  });

  it('componentWillReceiveProps render', () => {
    let value = { temperature: 0, brightness: 1000 };
    let stepBright = 1;

    const wrapper = shallow(<WhiteBrightCrossSlider value={value} stepBright={stepBright} />);
    expect(wrapper).toMatchSnapshot();

    value = { temperature: 30, brightness: 800 };
    wrapper.setProps({ value });

    stepBright = 10;
    wrapper.setProps({ stepBright });

    wrapper.instance().coorToBright(100);
    wrapper.instance().coorToTemperature(100);
    wrapper
      .instance()
      .notEqualColour({ brightness: 10, temperature: 1000 }, { brightness: 1000, temperature: 0 });

    wrapper.setProps({
      renderThumb: () => {
        return <View />;
      },
    });

    wrapper.unmount();
  });

  it('render touch', () => {
    const wrapper = shallow(
      <WhiteBrightCrossSlider stepBright={10} value={{ temperature: 30, brightness: 800 }} />
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
