/*
 * @Author: 豆芽(douya.ye@tuya.com)
 * @Date: 2021-11-29 16:53:26
 * @LastEditTime: 2021-11-29 16:56:52
 * @LastEditors: 豆芽(douya.ye@tuya.com)
 * @Description:
 * @FilePath: /tuya-panel-sdk/packages/tuya-panel-szos-sdk/src/components/multi-slider/__tests__/default-label.test.js
 */

import React from 'react';
import { shallow } from 'enzyme';
import DefaultLabel from '../DefaultLabel';

describe('default label', () => {
  it('default render', () => {
    const props = {
      oneMarkerValue: 0,
      twoMarkerValue: 100,
      oneMarkerLeftPosition: 10,
      twoMarkerLeftPosition: 100,
      oneMarkerPressed: false,
      twoMarkerPressed: true,
      unit: '%',
      sliderLabelStyle: {},
    };
    const wrapper = shallow(<DefaultLabel {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
