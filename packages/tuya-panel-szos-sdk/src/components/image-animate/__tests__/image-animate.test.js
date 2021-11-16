/*
 * @Author: 豆芽(douya.ye@tuya.com)
 * @Date: 2021-11-16 14:42:07
 * @LastEditTime: 2021-11-16 15:06:08
 * @LastEditors: 豆芽(douya.ye@tuya.com)
 * @Description: 图片旋转动画
 * @FilePath: /tuya-panel-sdk/packages/tuya-panel-szos-sdk/src/components/image-animate/__tests__/image-animate.test.js
 */

import React from 'react';
import { Text } from 'react-native';
import { shallow, mount } from 'enzyme';
import ImageAnimate from '../index';
import { reload } from '../../../res';

describe('BoxShow components', () => {
  jest.useFakeTimers();
  it('default render', () => {
    const wrapper = shallow(<ImageAnimate />);
    expect(wrapper).toMatchSnapshot();
  });

  it('render widthSource', () => {
    const wrapper = shallow(<ImageAnimate source={reload} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('render widthChildren', () => {
    const wrapper = shallow(
      <ImageAnimate source={reload}>
        <Text>我是children</Text>
      </ImageAnimate>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('render widthStyle', () => {
    const wrapper = shallow(
      <ImageAnimate style={{ backgroundColor: 'green' }}>
        <Text>我是children</Text>
      </ImageAnimate>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('render widthAll', () => {
    const wrapper = shallow(
      <ImageAnimate source={reload} style={{ backgroundColor: 'green' }}>
        <Text>我是children</Text>
      </ImageAnimate>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('kj', () => {
    const wrapper = shallow(
      <ImageAnimate source={reload} style={{ backgroundColor: 'green' }}>
        <Text>我是children</Text>
      </ImageAnimate>
    );
    expect(wrapper).toMatchSnapshot();
    wrapper.instance();
  });
});
