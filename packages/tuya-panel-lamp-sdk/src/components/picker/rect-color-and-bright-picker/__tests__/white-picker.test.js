/**
 * @jest-environment jsdom
 */
import React from 'react';
import { shallow, mount } from 'enzyme';
import RectColorAndBrightPicker from '../index';

describe('WhitePicker', () => {
  const origConsole = console.error;
  beforeEach(() => {
    console.error = () => {};
  });
  afterEach(() => {
    console.error = origConsole;
  });

  it('basic render', () => {
    let value = { temperature: 10, brightness: 1000 };
    const wrapper = shallow(
      <RectColorAndBrightPicker.WhitePicker
        value={value}
        lossShow={true}
        storageKey="testKey"
        direction="leftTop"
      />
    );
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });

  it('render rightBottom', () => {
    const wrapper = shallow(<RectColorAndBrightPicker.WhitePicker direction="rightBottom" />);
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });

  it('render rightTop', () => {
    const wrapper = shallow(<RectColorAndBrightPicker.WhitePicker direction="rightTop" />);
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });

  it('render left', () => {
    const wrapper = shallow(<RectColorAndBrightPicker.WhitePicker direction="left" />);
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });

  it('render right', () => {
    const wrapper = shallow(<RectColorAndBrightPicker.WhitePicker direction="right" />);
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });

  it('render top', () => {
    const wrapper = shallow(<RectColorAndBrightPicker.WhitePicker direction="top" />);
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });

  it('componentWillReceiveProps render', () => {
    let value = { temperature: 10, brightness: 1000 };
    const wrapper = mount(<RectColorAndBrightPicker.WhitePicker value={value} />);

    expect(wrapper).toMatchSnapshot();

    const rectPicker = wrapper.findWhere(c => c.name() === 'View' && !!c.prop('onLayout')).at(0);

    rectPicker.props().onStartShouldSetResponder({ nativeEvent: { locationX: 45, locationY: 3 } });

    wrapper.setProps({ direction: 'bottom' });

    wrapper.setProps({ value: { temperature: 300, brightness: 300 } });

    rectPicker.props().onResponderGrant({
      nativeEvent: { locationX: 60, locationY: 50 },
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

  it('rectPicker mount', () => {
    let value = { temperature: 10, brightness: 1000 };
    const wrapper = mount(<RectColorAndBrightPicker.WhitePicker value={value} />);

    expect(wrapper).toMatchSnapshot();

    const rectPicker = wrapper.findWhere(c => c.name() === 'View' && !!c.prop('onLayout')).at(0);

    rectPicker.props().onStartShouldSetResponder({ nativeEvent: { locationX: 45, locationY: 3 } });
    rectPicker.props().onResponderGrant({
      nativeEvent: { locationX: 60, locationY: 50 },
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

  it('rectPicker mount disable', () => {
    let value = { temperature: 10, brightness: 1000 };
    const wrapper = mount(<RectColorAndBrightPicker.WhitePicker value={value} disabled={true} />);

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
    let value = { temperature: 10, brightness: 1000 };
    const wrapper = mount(<RectColorAndBrightPicker.WhitePicker value={value} />);

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
