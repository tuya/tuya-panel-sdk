/*
 * @Author: 豆芽(douya.ye@tuya.com)
 * @Date: 2021-11-16 10:51:16
 * @LastEditTime: 2021-11-29 20:18:10
 * @LastEditors: 豆芽(douya.ye@tuya.com)
 * @Description: 测试
 * @FilePath: /tuya-panel-sdk/packages/tuya-panel-szos-sdk/src/components/box-shadow/__tests__/box-shadow.test.js
 */

import React from 'react';
import { View } from 'react-native';
import { shallow } from 'enzyme';
import BoxShow from '../index';

describe('BoxShow components', () => {
  it('default render', () => {
    const setting = {
      width: 0,
      height: 0,
      opacity: 1,
      border: 0,
      radius: 0,
      x: 0,
      y: 0,
      color: '#000',
      style: {},
    };
    const wrapper = shallow(<BoxShow setting={setting} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('default no Props', () => {
    const wrapper = shallow(<BoxShow />);
    expect(wrapper).toMatchSnapshot();
  });

  it('render rgba', () => {
    const setting = {
      width: 300,
      height: 40,
      opacity: 0.16,
      border: 12,
      radius: 20,
      color: 'rgba(255,0,0,0.5)',
    };
    const wrapper = shallow(<BoxShow setting={setting} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('render simpleColor', () => {
    const setting = {
      width: 0,
      height: 0,
      opacity: 1,
      border: 0,
      radius: 0,
      x: 0,
      y: 0,
      color: 'green',
      style: {},
    };
    const wrapper = shallow(<BoxShow setting={setting} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('render errorColor', () => {
    const setting = {
      width: 0,
      height: 0,
      opacity: 1,
      border: 0,
      radius: 0,
      x: 0,
      y: 0,
      color: 'jiojiuhj',
      style: {},
    };
    const wrapper = shallow(<BoxShow setting={setting} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('render children', () => {
    const setting = {
      width: 300,
      height: 40,
      opacity: 0.16,
      border: 12,
      radius: 20,
      color: '#444',
    };
    const wrapper = shallow(
      <BoxShow setting={setting}>
        <View style={{ width: 100, height: 100, borderRadius: 20 }} />
      </BoxShow>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
