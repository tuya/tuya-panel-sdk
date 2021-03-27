/**
 * @jest-environment jsdom
 */
import React from 'react';
import { shallow, mount } from 'enzyme';
import RectColorAndBrightPicker from '../index';

describe('ColourPicker', () => {
  const origConsole = console.error;
  beforeEach(() => {
    console.error = () => {};
  });
  afterEach(() => {
    console.error = origConsole;
  });

  it('basic render', () => {
    let value = { hue: 100, saturation: 500, value: 500 };
    const wrapper = shallow(<RectColorAndBrightPicker.ColourPicker value={value} />);
    expect(wrapper).toMatchSnapshot();

    value = { hue: 10, saturation: 50, value: 50 };
    wrapper.setProps({ value });

    wrapper.unmount();
  });

  it('componentWillReceiveProps render', () => {
    let disabled = false;
    let hideBright = false;
    let value = { hue: 100, saturation: 500, value: 500 };
    let lossShow = false;
    let thumbSize = 30;
    const wrapper = shallow(
      <RectColorAndBrightPicker.ColourPicker
        disabled={disabled}
        hideBright={hideBright}
        value={value}
        lossShow={lossShow}
        thumbSize={thumbSize}
      />
    );

    wrapper.simulate('layout', { nativeEvent: { layout: {} } });

    expect(wrapper).toMatchSnapshot();

    disabled = true;
    wrapper.setProps({ disabled });

    hideBright = true;
    wrapper.setProps({ hideBright });

    value = { hue: 10, saturation: 600, value: 600 };
    wrapper.setProps({ value });

    lossShow = true;
    wrapper.setProps({ lossShow });

    thumbSize = 50;
    wrapper.setProps({ thumbSize });

    wrapper.unmount();
  });

  it('rectPicker mount', () => {
    let value = { hue: 100, saturation: 500, value: 500 };
    const wrapper = mount(<RectColorAndBrightPicker.ColourPicker value={value} />);

    expect(wrapper).toMatchSnapshot();

    const rectPicker = wrapper.findWhere(c => c.name() === 'View' && !!c.prop('onLayout')).at(0);

    rectPicker.props().onLayout();
    rectPicker.props().onStartShouldSetResponder({ nativeEvent: { locationX: 45, locationY: 3 } });
    rectPicker.props().onResponderGrant({
      nativeEvent: { locationX: 60, locationY: 50 },
      touchHistory: { touchBank: [] },
    });
    rectPicker.props().onResponderMove({
      nativeEvent: { touches: [] },
      touchHistory: { touchBank: [] },
    });
    rectPicker.props().onResponderRelease({
      nativeEvent: { locationX: 45, locationY: 3 },
      touchHistory: { touchBank: [] },
    });

    wrapper.unmount();
  });

  it('rectPicker mount disable', () => {
    let value = { hue: 100, saturation: 500, value: 500 };
    const wrapper = mount(<RectColorAndBrightPicker.ColourPicker value={value} disabled={true} />);

    expect(wrapper).toMatchSnapshot();

    const rectPicker = wrapper.findWhere(c => c.name() === 'View' && !!c.prop('onLayout')).at(0);

    rectPicker.props().onStartShouldSetResponder({ nativeEvent: { locationX: 45, locationY: 3 } });

    rectPicker.props().onMoveShouldSetResponder();
    rectPicker.props().onResponderGrant({
      nativeEvent: { touches: [] },
      touchHistory: { touchBank: [] },
    });
    rectPicker.props().onResponderMove(
      {
        nativeEvent: { touches: [] },
        touchHistory: { touchBank: [] },
      },
      {
        dx: 40,
        dy: 40,
      }
    );
    rectPicker.props().onResponderRelease({
      nativeEvent: { touches: [] },
      touchHistory: { touchBank: [] },
    });

    wrapper.unmount();
  });

  it('slider mount', () => {
    let value = { hue: 100, saturation: 500, value: 500 };
    const wrapper = mount(<RectColorAndBrightPicker.ColourPicker value={value} />);

    expect(wrapper).toMatchSnapshot();

    const slider = wrapper
      .findWhere(
        c => c.prop('accessibilityLabel') === 'ReactColorPicker_Slider' && !!c.prop('onLayout')
      )
      .at(0);
    slider.props().onStartShouldSetResponder({ nativeEvent: { locationX: 45, locationY: 0 } });
    slider.props().onResponderGrant({
      nativeEvent: { locationX: 60, locationY: 50 },
      touchHistory: { touchBank: [] },
    });
    slider.props().onResponderMove(
      {
        nativeEvent: { touches: [] },
        touchHistory: { touchBank: [] },
      },
      {
        dx: 40,
        dy: 0,
      }
    );
    slider.props().onResponderRelease({
      nativeEvent: { touches: [] },
      touchHistory: { touchBank: [] },
    });

    wrapper.unmount();
  });
});
