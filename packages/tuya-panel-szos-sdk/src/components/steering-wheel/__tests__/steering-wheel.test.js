/**
 * @jest-environment jsdom
 */
import React from 'react';
import { View } from 'react-native';
import { shallow, useStateMock, mount } from 'enzyme';
import { State } from 'react-native-gesture-handler';
import SteeringWheel from '../index';

describe('StreeringWheel components', () => {
  jest.useFakeTimers();
  it('basic render', () => {
    const left = 0;
    const top = 0;
    const driveRef = { current: null };
    const wheelLeftRef = { current: null };
    const wrapper = shallow(
      <SteeringWheel
        wheelLeftRef={wheelLeftRef}
        leftPart={left}
        topPart={top}
        driveRef={driveRef}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('content render', () => {
    const props = {
      leftPart: 0,
      topPart: 0,
      childrenProps: (
        <View style={{ borderColor: 'red', borderWidth: 1, width: 167, height: 167 }} />
      ),
    };
    const wrapper = shallow(<SteeringWheel {...props} />);
    const wrapperHandle = wrapper.children().at(0);
    wrapperHandle.simulate('layout', {
      nativeEvent: {
        layout: { x: 200, y: 277, width: 167, height: 167 },
      },
    });
    wrapperHandle.simulate('handlerStateChange', {
      nativeEvent: {
        state: State.BEGAN,
        absoluteX: 250,
        absoluteY: 298,
      },
    });
    wrapperHandle.simulate('handlerStateChange', {
      nativeEvent: {
        state: State.ACTIVE,
        absoluteX: 263,
        absoluteY: 291,
      },
    });
    wrapperHandle.simulate('handlerStateChange', {
      nativeEvent: {
        state: State.ACTIVE,
        absoluteX: 246,
        absoluteY: 356,
      },
    });
    wrapperHandle.simulate('handlerStateChange', {
      nativeEvent: {
        state: State.ACTIVE,
        absoluteX: 888,
        absoluteY: 888,
      },
    });
    wrapperHandle.simulate('handlerStateChange', {
      nativeEvent: {
        state: State.END,
        absoluteX: 184,
        absoluteY: 359,
      },
    });
    wrapperHandle.simulate('handlerStateChange', {
      nativeEvent: {
        state: State.BEGAN,
        absoluteX: 888,
        absoluteY: 888,
      },
    });
    wrapperHandle.simulate('handlerStateChange', {
      nativeEvent: {
        state: State.CANCELLED,
        absoluteX: 184,
        absoluteY: 359,
      },
    });
    wrapperHandle.simulate('handlerStateChange', {
      nativeEvent: {
        state: State.FAILED,
        absoluteX: 184,
        absoluteY: 359,
      },
    });
    wrapperHandle.simulate('handlerStateChange', {
      nativeEvent: {
        state: State.UNDETERMINED,
        absoluteX: 184,
        absoluteY: 359,
      },
    });
    wrapperHandle.simulate('handlerStateChange', {
      nativeEvent: {
        state: State.shallow,
        absoluteX: 184,
        absoluteY: 359,
      },
    });
    expect(wrapper).toMatchSnapshot();

    wrapper.unmount();
  });

  it('render with value', () => {
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);
    const props = {
      leftPart: 50,
      topPart: 50,
      childrenProps: (
        <View style={{ borderColor: 'red', borderWidth: 1, width: 167, height: 167 }} />
      ),
    };
    const changeRotate = () => {};
    const wrapper = shallow(<SteeringWheel {...props} changeRotate={changeRotate} />);
    const wrapperHandle = wrapper.children().at(0);
    wrapperHandle.simulate('handlerStateChange', {
      nativeEvent: {
        state: State.BEGAN,
        absoluteX: 144,
        absoluteY: 295,
      },
    });
    wrapper.update();
    wrapperHandle.simulate('handlerStateChange', {
      nativeEvent: {
        state: State.ACTIVE,
        absoluteX: 144,
        absoluteY: 295,
      },
    });
    wrapper.update();
    wrapperHandle.simulate('gestureEvent', {
      nativeEvent: {
        state: State.ACTIVE,
        x: 888,
        y: 888,
      },
    });
    wrapper.update();

    wrapperHandle.simulate('gestureEvent', {
      nativeEvent: {
        state: State.ACTIVE,
        x: 110,
        y: 283,
      },
    });
    wrapperHandle.simulate('gestureEvent', {
      nativeEvent: {
        state: State.ACTIVE,
        x: 263,
        y: 271,
      },
    });
    wrapperHandle.simulate('gestureEvent', {
      nativeEvent: {
        state: State.END,
        x: 212,
        y: 222,
      },
    });
    expect(wrapper).toMatchSnapshot();

    wrapper.unmount();
  });
});
