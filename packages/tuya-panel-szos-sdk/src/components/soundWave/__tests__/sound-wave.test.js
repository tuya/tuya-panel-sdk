import React from 'react';
import { shallow } from 'enzyme';
import SoundWave from '../index';

describe('SoundWave components', () => {
  it('basic render', () => {
    const wrapper = shallow(<SoundWave data={[]} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('render with data', () => {
    let data = Array.from({ length: 66 }, _ => Math.random());
    const prop = {
      width: 310,
      height: 212,
      duration: 1000,
      style: { flexDirection: 'row' },
      barInitHeight: 16,
      barWidth: 2,
      barColor: '#534B72',
      start: true,
      barCount: 66,
      data: [],
    };
    const wrapper = shallow(<SoundWave {...prop} />);
    expect(wrapper).toMatchSnapshot();
    prop.data = Array.from({ length: 66 }, _ => Math.random());
    wrapper.setProps({ ...prop });
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });
});
