import React from 'react';
import { shallow } from 'enzyme';
import SettingSlider from '../index';

describe('LocationText components', () => {
  it('basic render', () => {
    const wrapper = shallow(
      <SettingSlider
        code="control"
        range={['open', 'stop', 'close']}
        value="stop"
        type="enum"
        step={1}
        themeColor="#934234"
        onValueConfrim={() => {}}
        onValueChange={() => {}}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
