import React from 'react';
import { shallow } from 'enzyme';
import { Utils } from 'tuya-panel-kit';
import LineBoxSvg from '../index';

const { convertX: cx } = Utils.RatioUtils;


const data = [-20, 0, 10, -10, 0, 0, 0, 15, 12, 20];

const lineBoxWidth = cx(266);
const lineBoxHeight = cx(72);
const strokeWidth = cx(2);

describe('LineBoxSvg components', () => {
  it('content render', () => {
    const wrapper = shallow(
    <LineBoxSvg
      size={{ height: lineBoxHeight, width: lineBoxWidth }}
      data={data}
    />)
    expect(wrapper).toMatchSnapshot();
  })

  it('customize render', () => {
    const wrapper = shallow(
      <LineBoxSvg
        size={{ height: lineBoxHeight, width: lineBoxWidth }}
        data={data}
        strokeStyle={{ width: strokeWidth, color: 'rgba(45,167,58)' }}
        bottomLinearStyle={{ color: 'rgba(45,167,58)', opacity: 0 }}
        topLinearStyle={{ color: 'rgba(45,167,58)', opacity: 0.3 }}
      />)
    expect(wrapper).toMatchSnapshot();
  })

})
