import React from 'react';
import { View } from 'react-native';
import { shallow } from 'enzyme';
import PercentSlider from '../index';

describe('PercentSlider components', () => {
  it('basic render', () => {
    let value = 0;
    const formatPercent = num => num;
    const wrapper = shallow(<PercentSlider value={value} formatPercent={formatPercent} />);
    expect(wrapper).toMatchSnapshot();

    value = 100;
    wrapper.setProps({ value });
  });

  it('componentWillReceiveProps render', () => {
    let value = 0;
    let direction = 'horizontal';

    const wrapper = shallow(<PercentSlider value={value} direction={direction} />);
    expect(wrapper).toMatchSnapshot();

    value = 100;
    wrapper.setProps({ value });

    value = 60;
    wrapper.setProps({ value });

    value = 10;
    wrapper.setProps({ value });

    direction = 'vertical';
    wrapper.setProps({ direction });

    // wrapper.instance().handleThumbChange(10, 10);

    wrapper.setProps({
      renderThumb: () => {
        return <View />;
      },
    });

    wrapper.unmount();
  });
});
