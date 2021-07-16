import React from 'react';
import { shallow } from 'enzyme';
import ShadowCircleProgress from '../index';

describe('ShadowCircleProgress components', () => {
  it('basic render', () => {
    const wrapper = shallow(
      <ShadowCircleProgress themeColor="#FB7319" unit="steps" title={1111} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
