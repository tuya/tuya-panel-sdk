import React from 'react';
import { View } from 'react-native';
import { shallow } from 'enzyme';
import ScaleSlider from '../index';

describe('ScaleSlider components', () => {
  it('basic render', () => {
    let value = 0;
    const wrapper = shallow(<ScaleSlider value={value} />);
    expect(wrapper).toMatchSnapshot();

    value = 100;
    wrapper.setProps({ value });
  });

  it('componentWillReceiveProps render', () => {
    let value = 0;
    let direction = 'horizontal';

    const wrapper = shallow(
      <ScaleSlider value={value} direction={direction} formatPercent={v => v} />
    );
    expect(wrapper).toMatchSnapshot();

    value = 100;
    wrapper.setProps({ value });

    direction = 'vertical';
    wrapper.setProps({ direction });

    wrapper.setState({ isLoaded: true });

    wrapper.setProps({
      renderThumb: () => {
        return <View />;
      },
    });

    wrapper.setProps({
      renderThumb: () => {
        return <View />;
      },
    });

    wrapper.instance().handleLayout({ nativeEvent: { layout: { width: 300, height: 20 } } });

    wrapper.instance().handlePercentUpdate(10, 100);

    wrapper.instance().getLinePath(30);

    direction = 'horizontal';
    wrapper.setProps({ direction });

    wrapper.instance().getLinePath(10);

    wrapper.unmount();
  });
});
