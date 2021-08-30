/* eslint-disable jest/expect-expect */
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { shallow } from 'enzyme';
import WeekSelection from '../index';

describe('WeekSelection components', () => {
  let useEffect;
  const mockUseEffect = () => {
    useEffect.mockImplementationOnce(f => f());
  };
  useEffect = jest.spyOn(React, 'useEffect');
  mockUseEffect(); // 2 times
  mockUseEffect(); //
  it('basicd render', () => {
    const wrapper = shallow(
      <WeekSelection weekDay="0000000" onWeekChange={jest.fn()}></WeekSelection>
    );
    wrapper.find(TouchableOpacity).at(0).simulate('press');
    expect(wrapper).toMatchSnapshot();
  });
});
