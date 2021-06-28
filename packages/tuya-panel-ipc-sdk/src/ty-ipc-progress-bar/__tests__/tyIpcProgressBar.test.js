import React from 'react';
import { shallow } from 'enzyme';
import TYIpcProgressBar from '../index';

const defaultBarData1 = {
  key: 'example3',
  value: 0,
  min: 0,
  max: 100,
  disabled: true,
  showPercentUnit: true,
  maxColor: 'red',
  minColor: 'green',
}

const defaultBarData2 = {
  key: 'example3',
  value: 0,
  min: 0,
  max: 100,
  disabled: true,
  showPercentUnit: true,
  maxColor: 'red',
  minColor: 'green',
  customUnitText: 'unit',
  noTitle: true,
}

describe('TYIpcProgressBar components', () => {
  it('basic render', () => {
    const wrapper = shallow(
      <TYIpcProgressBar/>);
    expect(wrapper).toMatchSnapshot();
  });

  it('basic render disabled', () => {
    const wrapper = shallow(
      <TYIpcProgressBar barData={defaultBarData1}/>);
    expect(wrapper).toMatchSnapshot();
  });

  it('basic render disabled with image', () => {
    const wrapper = shallow(
      <TYIpcProgressBar barData={defaultBarData2}/>);
    expect(wrapper).toMatchSnapshot();
  });

});
