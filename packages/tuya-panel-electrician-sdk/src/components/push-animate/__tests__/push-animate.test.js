import React from 'react';
import { View } from 'react-native';
import { shallow } from 'enzyme';
import PushAnimate from '../index';

describe('PushAnimate components', () => {
  it('basic render', () => {
    const fn = jest.fn();
    const wrapper = shallow(
      <PushAnimate
        value={0}
        width={100}
        height={100}
        origin="top"
        needMask={true}
        duration={1000}
        outPush={true}
        restore={true}
        onValueChange={fn}
        range={[0, 100]}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
