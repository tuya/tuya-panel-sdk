/*
 * @Author: 豆芽(douya.ye@tuya.com)
 * @Date: 2021-11-16 15:34:18
 * @LastEditTime: 2021-11-29 20:31:47
 * @LastEditors: 豆芽(douya.ye@tuya.com)
 * @Description: 双向欢动单元测试
 * @FilePath: /tuya-panel-sdk/packages/tuya-panel-szos-sdk/src/components/multi-slider/__tests__/multi-slider.test.js
 */

import React from 'react';
import { Text } from 'react-native';
import { shallow, mount } from 'enzyme';
import MultiSlider from '../index';
import { reload } from '../../../res';

describe('multi slider', () => {
  let MultiSliderCom = null;
  beforeAll(() => {
    console.log('BeforeAll');
  });

  beforeEach(() => {
    console.log('BeforeEach');
    MultiSliderCom = new MultiSlider();
  });
  afterEach(() => {
    console.log('AfterEach');
  });

  afterAll(() => {
    console.log('AfterAll');
  });

  it('default render', () => {
    const wrapper = shallow(
      <MultiSlider
        values={[10, 80]}
        min={0}
        max={100}
        step={1}
        sliderLength={280}
        isMarkersSeparated={true}
        enableLabel={true}
        onValuesChangeStart={() => undefined}
        onValuesChange={() => undefined}
        onValuesChangeFinish={() => undefined}
        onMarkersPosition={() => undefined}
        imageBackgroundSource={reload}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('no bg', () => {
    const wrapper = shallow(
      <MultiSlider
        values={[10, 80]}
        min={0}
        max={100}
        step={1}
        isMarkersSeparated={false}
        sliderLength={280}
        selectedStyle={{ backgroundColor: 'red' }}
        enableLabel={false}
        onValuesChangeStart={() => undefined}
        onValuesChange={() => undefined}
        onValuesChangeFinish={() => undefined}
        onMarkersPosition={() => undefined}
        onToggleOne={() => undefined}
        onToggleTwo={() => undefined}
        allowOverlap={false}
        snapped={true}
        unit="%"
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});