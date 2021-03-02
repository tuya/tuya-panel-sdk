import React from 'react';
import { shallow } from 'enzyme';
import { EmptyMap } from '../index';

describe('EmptyMap components', () => {
  it('basic render', () => {
    const wrapper = shallow(
      <EmptyMap
        iconColor={'#ff00ff'}
        iconSize={48}
        fontStyle={{ color: '#fff000', fontSize: 16 }}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('componentWillReceiveProps render', () => {
    let fontStyle = null;
    const wrapper = shallow(<EmptyMap iconColor={'#ff000f'} iconSize={48} fontStyle={fontStyle} />);
    fontStyle = { color: '#0ff0f0', fontSize: 18 };
    expect(wrapper).toMatchSnapshot();
    wrapper.setProps({ wrapper });
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });
});
