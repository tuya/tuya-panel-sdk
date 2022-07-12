import React from 'react';
import { Text } from 'react-native';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Strings } from 'tuya-panel-kit';
import AddService from '../index';

const initList = [
  {
    conditionType: 1,
    dpCode: 'temp_current',
    dpId: '1', // 温度dp
    dpValue: [0, 10], // 默认范围
    entityValue: 'tempAlarm',
    key: 'tempAlarm',
    name: 'tempAlarm',
    status: false,
    timer: [],
    timeout: 0,
  },
  {
    conditionType: 1,
    dpCode: 'humidity_value',
    dpId: '2', // 湿度dp
    dpValue: [0, 10], // 默认范围
    entityValue: 'humidityAlarm',
    key: 'humidityAlarm',
    name: 'humidityAlarm',
    status: false,
    timer: [],
    timeout: 0,
  },
];

configure({ adapter: new Adapter() });

describe('AddService', () => {
  let useEffect;
  let effectWrapper;
  const mockUseEffect = () => {
    useEffect.mockImplementationOnce(f => f());
  };
  beforeEach(() => {
    useEffect = jest.spyOn(React, 'useEffect');
    mockUseEffect(); // 2 times
    mockUseEffect(); //
    effectWrapper = shallow(<AddService />);
  });

  it('default render', () => {
    const wrapper = shallow(
      <AddService
        getBindInfo={() => undefined}
        initList={initList}
        Strings={Strings}
        bindInfo={initList}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
