import React from 'react';
import { shallow } from 'enzyme';
import Bar from '../Bar';

describe('Bar components', () => {
  it('basic render', () => {
    const wrapper = shallow(
      <Bar width={10} height={40} colors={['rgb(255,255,0)', 'rgb(255,0,0)']} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
