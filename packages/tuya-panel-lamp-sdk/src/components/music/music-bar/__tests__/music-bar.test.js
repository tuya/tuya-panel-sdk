import React from 'react';
import { shallow } from 'enzyme';
import MusicBar from '../index';

describe('MusicBar components', () => {
  it('basic render', () => {
    const wrapper = shallow(
      <MusicBar size={50} colors={['rgb(255,0,0)', 'rgb(255,255,0)']} musicIndex={2} />
    );
    expect(wrapper).toMatchSnapshot();

    wrapper.setProps({
      size: 60,
      colors: ['rgb(255,255,0)', 'rgb(255,0,0)'],
      musicIndex: 5,
      barNum: 22,
    });
  });
});
