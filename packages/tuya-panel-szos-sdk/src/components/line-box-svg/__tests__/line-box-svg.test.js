/**
 * @jest-environment jsdom
 */

import React from 'react';
import { shallow, mount } from 'enzyme';
import { Utils } from 'tuya-panel-kit';
import LineBoxSvg from '../index';

const { convertX: cx } = Utils.RatioUtils;

const data = [0, 1, 10, -10, 0, 0, 0, 2, 0, 12];

const lineBoxWidth = cx(266);
const lineBoxHeight = cx(72);
const strokeWidth = cx(2);

describe('LineBoxSvg components', () => {
  it('content render', () => {
    const wrapper = shallow(
      <LineBoxSvg
        range={{ min: -12, max: 12 }}
        size={{ height: lineBoxHeight, width: lineBoxWidth }}
        data={data}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('customize render', () => {
    const wrapper = shallow(
      <LineBoxSvg
        range={{ min: -12, max: 12 }}
        size={{ height: lineBoxHeight, width: lineBoxWidth }}
        data={data}
        strokeStyle={{ width: strokeWidth, color: 'rgba(45,167,58)' }}
        bottomLinearStyle={{ color: 'rgba(45,167,58)', opacity: 0 }}
        topLinearStyle={{ color: 'rgba(45,167,58)', opacity: 0.3 }}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('diff range render', () => {
    const wrapper = shallow(
      <LineBoxSvg
        range={{ min: 0, max: 100 }}
        size={{ height: lineBoxHeight, width: lineBoxWidth }}
        data={data}
        strokeStyle={{ width: strokeWidth, color: 'rgba(45,167,58)' }}
        bottomLinearStyle={{ color: 'rgba(45,167,58)', opacity: 0 }}
        topLinearStyle={{ color: 'rgba(45,167,58)', opacity: 0.3 }}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
