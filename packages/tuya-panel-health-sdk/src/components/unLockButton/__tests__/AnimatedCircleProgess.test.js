import React from 'react';
import { shallow } from 'enzyme';
import AnimatedCircleProgess from '../AnimatedCircleProgess';

describe('AnimatedCircleProgess', () => {
  it('AnimatedCircleProgess Component should be render', () => {
    const wrapper = shallow(
      <AnimatedCircleProgess
        // ref={acpRef}
        size={100}
        color="#fff"
        duration={300}
      />
    );

    // 是否能正确渲染
    expect(wrapper).toMatchSnapshot();
  });
});
