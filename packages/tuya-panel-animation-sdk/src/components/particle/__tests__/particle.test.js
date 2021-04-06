import React from 'react';
import { shallow } from 'enzyme';
import Particle from '../index';
import SingleParticle from '../single-particle';

describe('Particle components', () => {
  it('basic render', () => {
    const wrapper = shallow(
      <Particle
        type="absorb"
        amount={30}
        color={['#f0f', '#00f', '#fff', '#ff0']}
        active={true}
        dotRadius={[2, 4, 6, 8]}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('SingleParticle render', () => {
    let active = true;
    const wrapper = shallow(
      <SingleParticle active={active} width={300} height={300} color={'#f0f'} />
    );
    const wrapper1 = shallow(
      <SingleParticle
        type="absorb"
        active={true}
        width={300}
        height={300}
        color={['#f0f', '#00f', '#fff', '#ff0']}
        dotRadius={[2, 4, 6, 8]}
      />
    );
    active = false;
    wrapper.setProps({ active });
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
    expect(wrapper1).toMatchSnapshot();
  });
});
