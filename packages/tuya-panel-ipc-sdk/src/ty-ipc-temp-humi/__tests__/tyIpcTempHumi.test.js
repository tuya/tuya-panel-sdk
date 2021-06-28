import React from 'react';
import { shallow } from 'enzyme';
import TYIpcTempHumi from '../index';

describe('TYIpcTempHumi components', () => {
  it('basic render', () => {
    const wrapper = shallow(
      <TYIpcTempHumi
       standardDpMode={false}
       sensor_temperature={20}
       temp_report_f={100}
       sensor_humidity={10}
       // 温度单位选择, 默认0, 表示摄氏度  1 表示华氏度
       temp_unit_select={'0'}
      />);
    expect(wrapper).toMatchSnapshot();
  });

  it('basic render with F', () => {
    const wrapper = shallow(
      <TYIpcTempHumi
       standardDpMode={false}
       sensor_temperature={20}
       temp_report_f={100}
       sensor_humidity={10}
       // 温度单位选择, 默认0, 表示摄氏度  1 表示华氏度
       temp_unit_select={'1'}
      />);
    expect(wrapper).toMatchSnapshot();
  });

  it('basic render expect F', () => {
    const wrapper = shallow(
      <TYIpcTempHumi
       standardDpMode={false}
       sensor_temperature={20}
       sensor_humidity={10}
       // 温度单位选择, 默认0, 表示摄氏度  1 表示华氏度
       temp_unit_select={'0'}
      />);
    expect(wrapper).toMatchSnapshot();
  });

  it('basic render only temp', () => {
    const wrapper = shallow(
      <TYIpcTempHumi
       standardDpMode={false}
       sensor_temperature={20}
       // 温度单位选择, 默认0, 表示摄氏度  1 表示华氏度
       temp_unit_select={'0'}
      />);
    expect(wrapper).toMatchSnapshot();
  });

  it('basic render only F temp', () => {
    const wrapper = shallow(
      <TYIpcTempHumi
       standardDpMode={false}
       temp_report_f={100}
       sensor_humidity={10}
       // 温度单位选择, 默认0, 表示摄氏度  1 表示华氏度
       temp_unit_select={'1'}
      />);
    expect(wrapper).toMatchSnapshot();
  });
  it('basic render no temp', () => {
    const wrapper = shallow(
      <TYIpcTempHumi
       standardDpMode={false}
       sensor_humidity={10}
       // 温度单位选择, 默认0, 表示摄氏度  1 表示华氏度
      />);
    expect(wrapper).toMatchSnapshot();
  });
});
