import React from 'react';
import { shallow } from 'enzyme';
import SoundWave from '../index';

describe('SoundWave components', () => {
  jest.useFakeTimers();
  it('basic render', () => {
    const wrapper = shallow(<SoundWave data={[]} start={false} />);
    wrapper.setProps({ start: true }, () => {
      jest.runOnlyPendingTimers();
    });
    wrapper.children().forEach((c, i) => {
      expect(c.key()).toBe(`${i}`);
      expect(c.name()).toBe(`AnimatedComponent`);
    });
    wrapper.unmount();
  });

  it('render with data', () => {
    jest.useFakeTimers();

    let data = Array.from({ length: 66 }, _ => Math.random());
    const prop = {
      width: 310,
      height: 212,
      duration: 1000,
      style: { flexDirection: 'row' },
      barInitHeight: 16,
      barWidth: 2,
      barColor: '#534B72',
      start: false,
      barCount: 66,
      data: data,
    };
    const wrapper = shallow(<SoundWave {...prop} />);
    wrapper.children().forEach((c, i) => {
      expect(c.key()).toBe(`${i}`);
      expect(c.name()).toBe('AnimatedComponent');
    });
    prop.data = Array.from({ length: 66 }, _ => Math.random());
    // expect(wrapper.children()).toMatchSnapshot();
    wrapper.setProps({ ...prop, start: true });
    jest.advanceTimersByTime(2000);
    wrapper.children().forEach((c, i) => {
      expect(c.key()).toBe(`${i}`);
      expect(c.name()).toBe('AnimatedComponent');
      //   console.log(c.prop('style'));
    });
    wrapper.unmount();
  });
});
