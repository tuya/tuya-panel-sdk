/**
 * @jest-environment jsdom
 */
import React from 'react';
import { TYListItem, Popup, Picker } from 'tuya-panel-kit';
import { shallow, mount } from 'enzyme';
import TimePickerRange from '../index';
import TimePicker from '../timePicker';

jest.mock('tuya-panel-kit', () => {
  const RealModule = jest.requireActual('tuya-panel-kit');
  const mockModule = {
    ...RealModule,
    Popup: {
      ...RealModule.Popup,
      custom: ({ content, onConfirm, onCancel }) => {
        onConfirm();
        onCancel();
        return null;
      },
    },
  };
  return mockModule;
});

describe('TimePickerRange components', () => {
  const origConsole = console.error;
  beforeEach(() => {
    console.error = () => {};
  });
  afterEach(() => {
    console.error = origConsole;
  });
  // eslint-disable-next-line jest/expect-expect
  it('mount render', () => {
    const wrapper = shallow(
      <TimePickerRange beginTime={480} endTime={1200} isShowSecond onTimeChange={jest.fn()} />
    );
    wrapper.find(TYListItem).at(0).simulate('press');
    wrapper.find(TYListItem).at(1).simulate('press');
    wrapper.unmount();
  });
  it('basicd isShowSecond render', () => {
    const wrapper = shallow(
      <TimePickerRange
        beginTime={480}
        endTime={1200}
        isShowSecond
        onTimeChange={jest.fn()}
        customOnClick={jest.fn()}
      />
    );

    wrapper.find(TYListItem).at(0).simulate('press');
    expect(wrapper).toMatchSnapshot();
  });
  it('basicd isShowSecond false render', () => {
    let useEffect;
    const mockUseEffect = () => {
      useEffect.mockImplementationOnce(f => f());
    };
    useEffect = jest.spyOn(React, 'useEffect');
    mockUseEffect(); // 2 times
    mockUseEffect(); //
    const wrapper = shallow(
      <TimePickerRange
        beginTime={480}
        endTime={1200}
        isShowSecond={false}
        onTimeChange={jest.fn()}
        customOnClick={jest.fn()}
      />
    );

    wrapper.find(TYListItem).at(1).simulate('press');
    expect(wrapper).toMatchSnapshot();
  });
  it('TimePicker render', () => {
    const wrapper = shallow(
      <TimePicker
        hour={2}
        minutes={22}
        second={11}
        hourLabel="hourLabel"
        minutesLabel="minutesLabel"
        secondLabel="secondLabel"
        isShowSecond={false}
        onTimeChange={jest.fn()}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('TimePicker isShowSecond render', () => {
    const wrapper = shallow(
      <TimePicker
        hour={2}
        minutes={22}
        second={11}
        hourLabel="hourLabel"
        minutesLabel="minutesLabel"
        secondLabel="secondLabel"
        isShowSecond
        onTimeChange={jest.fn()}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
