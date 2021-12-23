/*
 * @Author: 豆芽(douya.ye@tuya.com)
 * @Date: 2021-11-29 16:56:44
 * @LastEditTime: 2021-11-29 16:56:45
 * @LastEditors: 豆芽(douya.ye@tuya.com)
 * @Description:
 * @FilePath: /tuya-panel-sdk/packages/tuya-panel-szos-sdk/src/components/multi-slider/__tests__/default-marker.test.js
 */

import React from 'react';
import { shallow } from 'enzyme';
import DefaultMarker from '../DefaultMarker';

describe('default label', () => {
  it('default render', () => {
    const props = {
      enabled: false,
      pressed: true,
      pressedMarkerStyle: {},
      markerStyle: {},
      disabledMarkerStyle: {},
      size: 24,
    };
    const wrapper = shallow(<DefaultMarker {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
