import React from 'react';
import { shallow } from 'enzyme';
import SportCard from '../index';

describe('sport-card components', () => {
  it('basic render', () => {
    const cardDatas = [
      {
        dp: 'activetime_day',
        bgColor: '#24D671',
        iconFont: '',
        unit: 'h',
        tip: '',
        value: '',
      },
      {
        dp: 'calories_day',
        bgColor: '#FE9456',
        iconFont: '',
        unit: 'cal',
        tip: '',
        value: '',
      },
      {
        dp: 'distance_day',
        bgColor: '#F6BA7B',
        iconFont: '',
        unit: 'km',
        tip: '',
        value: '',
      },
    ];
    const wrapper = shallow(<SportCard dpDatas={cardDatas} />);
    expect(wrapper).toMatchSnapshot();
  });
});
