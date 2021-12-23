/*
 * @Author: 豆芽(douya.ye@tuya.com)
 * @Date: 2021-12-15 11:31:10
 * @LastEditTime: 2021-12-15 11:33:15
 * @LastEditors: 豆芽(douya.ye@tuya.com)
 * @Description: dpCache 单元测试
 * @FilePath: /tuya-panel-sdk/packages/tuya-panel-szos-sdk/src/components/dp-cache-text/__tests__/dp-cache-text.test.js
 */

import React from 'react';
import { Text } from 'react-native';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DpCacheText from '../index';

configure({ adapter: new Adapter() });

describe('DpCacheText', () => {
  it('default render', () => {
    const wrapper = shallow(<DpCacheText title="豆芽" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('rander show icon', () => {
    const wrapper = shallow(<DpCacheText title="豆芽" showIcon={true} />);
    expect(wrapper).toMatchSnapshot();
  });
});
