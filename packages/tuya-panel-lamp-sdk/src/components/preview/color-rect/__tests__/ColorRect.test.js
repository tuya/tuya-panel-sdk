import React from 'react';
import { shallow } from 'enzyme';
import ColorRect from '../ColorRect';

describe('ColorRect components', () => {
  it('basic render', () => {
    const wrapper = shallow(
      <ColorRect style={{ width: 80, height: 100 }} colors={['#E292FE', '#FFF76B']} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('render with custom color percent', () => {
    const wrapper = shallow(
      <ColorRect
        style={{ borderRadius: 8, width: 80, height: 100, overflow: 'hidden' }}
        colors={[
          { color: 'green', percent: 0.14 },
          { color: 'yellow', percent: 0.26 },
          { color: 'red', percent: 0.6 },
        ]}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
