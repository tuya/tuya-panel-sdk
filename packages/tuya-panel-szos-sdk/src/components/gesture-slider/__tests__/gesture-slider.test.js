import React from 'react';
import { shallow } from 'enzyme';
import GestureSlider from '../index';
import { State } from 'react-native-gesture-handler';

describe('GestureSlider components', () => {
  jest.useFakeTimers();
  it('basic render', () => {
    const wrapper = shallow(<GestureSlider minValue={1} maxValue={105} defaultValue={2} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('render with defaultValue', () => {
    const wrapper = shallow(<GestureSlider minValue={1} maxValue={105} defaultValue={2} />);
    const wrapperHandle = wrapper.children().at(1);
    wrapperHandle.simulate('handlerStateChange', {
      nativeEvent: {
        state: State.BEGAN,
        absoluteX: 150,
        absoluteY: 100,
      },
    });
    wrapperHandle.simulate('gestureEvent', {
      nativeEvent: {
        state: State.ACTIVE,
        absoluteX: 550.5,
        absoluteY: 100,
      },
    });
    wrapperHandle.simulate('gestureEvent', {
      nativeEvent: {
        state: State.ACTIVE,
        absoluteX: 0.5,
        absoluteY: 100,
      },
    });
    expect(wrapper).toMatchSnapshot();

    wrapper.unmount();
  });

  it('render with value', () => {
    let step = 2;
    const props = {
      minValue: 1,
      maxValue: 105,
      value: step,
      scaleSpace: 4,
      onChange: ({ step: s }) => {
        step = s;
      },
    };
    const wrapper = shallow(<GestureSlider {...props} />);
    const wrapperHandle = wrapper.children().at(1);
    wrapperHandle.simulate('handlerStateChange', {
      nativeEvent: {
        state: State.BEGAN,
        absoluteX: 550,
        absoluteY: 100,
      },
    });
    wrapper.setProps({ step, scaleSpace: 8 });
    wrapperHandle.simulate('gestureEvent', {
      nativeEvent: {
        state: State.ACTIVE,
        absoluteX: 220,
        absoluteY: 100,
      },
    });
    wrapper.setProps({ step, scaleSpace: 16 });

    wrapperHandle.simulate('gestureEvent', {
      nativeEvent: {
        state: State.ACTIVE,
        absoluteX: 0.5,
        absoluteY: 100,
      },
    });
    expect(wrapper).toMatchSnapshot();

    wrapper.unmount();
  });
});
