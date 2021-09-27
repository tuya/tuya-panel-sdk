import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { shallow } from 'enzyme';
import CountDownButton, { useCountDownTimer } from '../CountdownButton';

describe('CountDownButton component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it('should render without issues', () => {
    const countDown = shallow(<CountDownButton />);
    expect(countDown.length).toBe(1);
    expect(countDown).toMatchSnapshot();
  });

  it('should render without countDownNumber', () => {
    const countDown = shallow(<CountDownButton countDownNumber={5} />);

    expect(countDown.length).toBe(1);
    expect(countDown).toMatchSnapshot();
  });

  it('render with onIdleEndCallBack', async () => {
    const useEffect = jest.spyOn(React, 'useEffect');
    useEffect.mockImplementation(f => f());
    const onIdleEndCallBack = jest.fn();
    const component = shallow(
      <CountDownButton onIdleEndCallBack={onIdleEndCallBack} countDownNumber={3} />
    );
    jest.advanceTimersByTime(3000);
    expect(onIdleEndCallBack).toHaveBeenCalled();
    expect(component.length).toBe(1);
    expect(component).toMatchSnapshot();
  });

  it('render with btnText', () => {
    const component = shallow(<CountDownButton btnText="hahh" />);

    expect(component.length).toBe(1);
    expect(component).toMatchSnapshot();
  });

  it('render with customCountDownText', () => {
    const component = shallow(<CountDownButton customCountDownText={t => `倒计时${t}s`} />);

    expect(component.length).toBe(1);
    expect(component).toMatchSnapshot();
  });

  it('render with style', () => {
    const component = shallow(<CountDownButton style={{ backgroundColor: '#fff' }} />);

    expect(component.find(View).props().style).toHaveProperty('backgroundColor');
    expect(component.length).toBe(1);
    expect(component).toMatchSnapshot();
  });

  it('render with onCountChange', () => {
    const component = shallow(<CountDownButton onCountChange={() => {}} />);

    expect(component.length).toBe(1);
    expect(component).toMatchSnapshot();
  });

  it('render with textStyle', () => {
    const component = shallow(<CountDownButton textStyle={{ color: 'red' }} />);

    expect(component.length).toBe(1);
    expect(component).toMatchSnapshot();
  });

  it('render with onPress', () => {
    const onPress = jest.fn();
    const component = shallow(<CountDownButton onPress={onPress} />);
    component.simulate('press');
    expect(onPress).toBeCalled();
    expect(component.length).toBe(1);
    expect(component).toMatchSnapshot();
  });

  it('test hooks useCountDownTimer', () => {
    const TestCom = () => {
      const [number, timer] = useCountDownTimer(3);
      useCountDownTimer();

      const handlePress = () => {
        timer.stop();
        timer.reStart();
        timer.refresh();
      };

      return <TouchableOpacity onPress={handlePress}>{number}</TouchableOpacity>;
    };

    const test = shallow(<TestCom />);
    test.simulate('press');
    expect(test.prop('children')).toBe(3);
  });
});
