import React from 'react';
import { shallow } from 'enzyme';
import { DrawMap } from '../index';

describe('DrawMap components', () => {
  it('basic render', () => {
    const wrapper = shallow(<DrawMap iconColor={'#ff00ff'} iconSize={48} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('componentWillReceiveProps render', () => {
    let iconSize = 18;
    const wrapper = shallow(<DrawMap iconColor={'#fff'} iconSize={iconSize} />);
    iconSize = 30;
    expect(wrapper).toMatchSnapshot();
    wrapper.setProps({ wrapper });
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });
});
