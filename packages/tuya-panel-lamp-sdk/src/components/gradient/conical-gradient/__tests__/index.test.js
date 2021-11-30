/**
 * @jest-environment jsdom
 */
import React from 'react';
import { shallow } from 'enzyme';
import ConicalGradientIos from '../index.ios';
import ConicalGradientAndroid from '../index.android';
import ConicalGradientWeb from '../index.web';
import ConicalGradientNormal from '../Normal';
import AndroidConicalGradent from '../Android';

const fullDeg = Math.PI * 2;

describe('ConicalGradientIos', () => {
  it('basic render', () => {
    let offsetAngle = 90;
    let outerRadius = 135;
    let innerRadius = 90;
    let colors = [
      {
        angle: fullDeg * 0.06,
        color: '#04E4FC',
      },
      {
        angle: fullDeg * 0.2,
        color: '#0BFB2A',
      },
    ];

    const wrapper = shallow(
      <ConicalGradientIos
        offsetAngle={offsetAngle}
        outerRadius={outerRadius}
        innerRadius={innerRadius}
        colors={colors}
      />
    );

    expect(wrapper).toMatchSnapshot();

    offsetAngle = 0;
    wrapper.setProps({ offsetAngle });

    outerRadius = 100;
    wrapper.setProps({ outerRadius });

    innerRadius = 0;
    wrapper.setProps({ innerRadius });

    colors = [
      {
        angle: fullDeg * 0.2,
        color: '#0BFB2A',
      },
    ];
    wrapper.setProps({ colors });

    wrapper.unmount();
  });
});

describe('ConicalGradientAndroid', () => {
  it('basic render', () => {
    let offsetAngle = 90;
    let outerRadius = 135;
    let innerRadius = 90;
    let colors = [
      {
        angle: fullDeg * 0.06,
        color: '#04E4FC',
      },
      {
        angle: fullDeg * 0.2,
        color: '#0BFB2A',
      },
    ];

    const wrapper = shallow(
      <ConicalGradientAndroid
        offsetAngle={offsetAngle}
        outerRadius={outerRadius}
        innerRadius={innerRadius}
        colors={colors}
      />
    );

    expect(wrapper).toMatchSnapshot();

    offsetAngle = 0;
    wrapper.setProps({ offsetAngle });

    outerRadius = 100;
    wrapper.setProps({ outerRadius });

    innerRadius = 0;
    wrapper.setProps({ innerRadius });

    colors = [
      {
        angle: fullDeg * 0.2,
        color: '#0BFB2A',
      },
    ];
    wrapper.setProps({ colors });

    wrapper.unmount();
  });
});

describe('ConicalGradientWeb', () => {
  it('basic render', () => {
    let offsetAngle = 90;
    let outerRadius = 135;
    let innerRadius = 90;
    let colors = [
      {
        angle: fullDeg * 0.06,
        color: '#04E4FC',
      },
      {
        angle: fullDeg * 0.2,
        color: '#0BFB2A',
      },
    ];

    const wrapper = shallow(
      <ConicalGradientWeb
        offsetAngle={offsetAngle}
        outerRadius={outerRadius}
        innerRadius={innerRadius}
        colors={colors}
      />
    );

    expect(wrapper).toMatchSnapshot();

    offsetAngle = 0;
    wrapper.setProps({ offsetAngle });

    outerRadius = 100;
    wrapper.setProps({ outerRadius });

    innerRadius = 0;
    wrapper.setProps({ innerRadius });

    colors = [
      {
        angle: fullDeg * 0.2,
        color: '#0BFB2A',
      },
    ];
    wrapper.setProps({ colors });

    wrapper.instance().setColors([
      {
        angle: 1,
        color: '#0BFB2A',
      },
    ]);

    wrapper.instance().getIosProps();

    wrapper.unmount();
  });
});

describe('ConicalGradientNormal', () => {
  it('basic render', () => {
    let offsetAngle = 90;
    let outerRadius = 135;
    let innerRadius = 90;
    let colors = [
      {
        angle: fullDeg * 0.06,
        color: '#04E4FC',
      },
      {
        angle: fullDeg * 0.2,
        color: '#0BFB2A',
      },
    ];

    const wrapper = shallow(
      <ConicalGradientNormal
        offsetAngle={offsetAngle}
        outerRadius={outerRadius}
        innerRadius={innerRadius}
        colors={colors}
      />
    );

    expect(wrapper).toMatchSnapshot();

    offsetAngle = 0;
    wrapper.setProps({ offsetAngle });

    outerRadius = 100;
    wrapper.setProps({ outerRadius });

    innerRadius = 0;
    wrapper.setProps({ innerRadius });

    colors = [
      {
        angle: fullDeg * 0.2,
        color: '#0BFB2A',
      },
    ];
    wrapper.setProps({ colors });

    wrapper.unmount();
  });
});

describe('AndroidConicalGradent', () => {
  it('basic render', () => {
    const wrapper = shallow(<AndroidConicalGradent />);

    expect(wrapper).toMatchSnapshot();

    wrapper.unmount();
  });
});
