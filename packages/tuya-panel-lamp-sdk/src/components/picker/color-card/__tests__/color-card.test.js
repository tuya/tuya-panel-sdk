import React from 'react';
import { shallow } from 'enzyme';
import ColorCard from '../index';

describe('ColorCard components', () => {
  it('basic render', () => {
    let value = {};
    const wrapper = shallow(<ColorCard width={400} height={260} value={value} />);
    expect(wrapper).toMatchSnapshot();

    value = {
      hue: 500,
      saturation: 1000,
      value: 1000,
    };
  });
  it('basic render no slider', () => {
    const wrapper = shallow(
      <ColorCard
        width={280}
        height={150}
        value={{
          hue: 333,
          saturation: 1000,
          value: 1000,
        }}
      />
    );
    expect(wrapper).toMatchSnapshot();
    wrapper.setProps({
      hasBorder: true,
      hideBright: true,
    });
    wrapper.setProps({
      innerBorderColor: 'red',
      xNum: 11,
      yNum: 4,
      opacityAnimationValue: 0.5,
    });
  });
});
