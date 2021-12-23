/*
 * @Author: 豆芽(douya.ye@tuya.com)
 * @Date: 2021-11-16 14:38:23
 * @LastEditTime: 2021-11-16 14:43:40
 * @LastEditors: 豆芽(douya.ye@tuya.com)
 * @Description: 上下留白
 * @FilePath: /tuya-panel-sdk/packages/tuya-panel-szos-sdk/src/components/white-space/__tests__/white-space.test.js
 */

import React from 'react';
import { View } from 'react-native';
import { shallow, mount } from 'enzyme';
import WhiteSpace from '../index';

describe('BoxShow components', () => {
  it('default render', () => {
    const wrapper = shallow(<WhiteSpace />);
    expect(wrapper).toMatchSnapshot();
  });

  it('render height', () => {
    const wrapper = shallow(<WhiteSpace height={10} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('render backgroundColor', () => {
    const wrapper = shallow(<WhiteSpace backgroundColor="green" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('render all', () => {
    const wrapper = shallow(<WhiteSpace backgroundColor="green" height={10} />);
    expect(wrapper).toMatchSnapshot();
  });
});
