/**
 * @jest-environment jsdom
 */

import React from 'react';
import { shallow } from 'enzyme';
import MaskView from '../index';

describe('MaskView components', () => {
  it('left render', () => {
    let visible = false;
    const wrapper = shallow(<MaskView mode="left" visible={visible} />);
    visible = true;
    wrapper.setProps({ visible });
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });

  it('right render', () => {
    let visible = false;
    const wrapper = shallow(<MaskView mode="right" visible={visible} />);
    visible = true;
    wrapper.setProps({ visible });
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });

  it('top render', () => {
    let visible = false;
    const wrapper = shallow(<MaskView mode="top" visible={visible} />);
    visible = true;
    wrapper.setProps({ visible });
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });

  it('bottom render', () => {
    let visible = false;
    const wrapper = shallow(<MaskView mode="bottom" visible={visible} />);
    visible = true;
    wrapper.setProps({ visible });
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });

  it('offset', () => {
    let visible = false;
    const wrapper = shallow(
      <MaskView mode="bottom" visible={visible} offsetX={200} offsetY={50} />
    );
    visible = true;
    wrapper.setProps({ visible });
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });
});
