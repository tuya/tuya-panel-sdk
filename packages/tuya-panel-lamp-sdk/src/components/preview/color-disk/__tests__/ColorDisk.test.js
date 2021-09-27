import React from 'react';
import { shallow } from 'enzyme';
import ColorDisk from '../ColorDisk';

describe('ColorDisk components', () => {
  it('basic render', () => {
    const wrapper = shallow(
      <ColorDisk radius={100} startAngle={Math.PI} colors={['#E292FE', '#FFF76B']} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('render with custome color percent', () => {
    const wrapper = shallow(
      <ColorDisk
        radius={100}
        startAngle={Math.PI}
        colors={['#E292FE', { color: '#E292FE', percent: 30 }]}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
