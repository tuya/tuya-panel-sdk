import React from 'react';
import { shallow } from 'enzyme';
import SettingSlider from '../index';

describe('SettingSlider components', () => {
  it('basic render', () => {
    const wrapper = shallow(
      <SettingSlider
        code="control"
        range={['open', 'stop', 'close']}
        value="stop"
        step={1}
        themeColor="#57BCFB"
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
