/*
 * @Author: 豆芽(douya.ye@tuya.com)
 * @Date: 2021-11-16 14:42:07
 * @LastEditTime: 2021-11-29 19:43:08
 * @LastEditors: 豆芽(douya.ye@tuya.com)
 * @Description: 图片旋转动画
 * @FilePath: /tuya-panel-sdk/packages/tuya-panel-szos-sdk/src/components/image-animate/__tests__/image-animate.test.js
 */

import React from 'react';
import { Text } from 'react-native';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ImageAnimate from '../index';
import { reload } from '../../../res';

configure({ adapter: new Adapter() });

describe('ImageAnimate', () => {
  let useEffect;
  let effectWrapper;
  const mockUseEffect = () => {
    useEffect.mockImplementationOnce(f => f());
  };
  beforeEach(() => {
    useEffect = jest.spyOn(React, 'useEffect');
    mockUseEffect(); // 2 times
    mockUseEffect(); //
    effectWrapper = shallow(<ImageAnimate />);
  });
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

  it('render width children', () => {
    const wrapper = shallow(
      <ImageAnimate source={reload} style={{ backgroundColor: 'green' }}>
        <Text>我是children</Text>
      </ImageAnimate>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('use effect', () => {
    expect(effectWrapper).toMatchSnapshot();
  });
});
