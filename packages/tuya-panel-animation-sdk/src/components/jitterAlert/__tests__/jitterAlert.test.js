import React from 'react';
import { View } from 'react-native';
import { shallow } from 'enzyme';
import JitterAlert from '../index';

describe('jitterAlert components', () => {
  it('basic render', () => {
    let active = true;
    const wrapper = shallow(<JitterAlert active={active} size={64} onPress={() => {}} />);
    expect(wrapper).toMatchSnapshot();
    active = false;
    wrapper.setProps({ active });
    wrapper.unmount();
  });

  it('renderContent render', () => {
    const wrapper = shallow(
      <JitterAlert
        active={true}
        onPress={() => {}}
        renderContent={<View style={{ width: 200, height: 200, backgroundColor: '#f0f' }} />}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
