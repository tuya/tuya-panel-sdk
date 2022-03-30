/**
 * @jest-environment jsdom
 */
import React from 'react';
import { shallow, mount } from 'enzyme';
import { GlobalToast } from 'tuya-panel-kit';
import BreakPointInput from '../index';
// const jsdom = require('jsdom');

// const { JSDOM } = jsdom;
// const { window } = new JSDOM('');
// const { document } = new JSDOM(``).window;

global.document = document;
global.window = window;
describe('BreakPointInput components', () => {
  it('basic render', () => {
    const wrapper = shallow(<BreakPointInput name="test" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('render focus', () => {
    const maxLen = 4;
    const func = () => {
      GlobalToast.show({
        text: 'focus',
        onFinish: () => {
          GlobalToast.hide();
        },
      });
    };
    const wrapper = shallow(<BreakPointInput name="test" maxLen={maxLen} focusFuc={func} />);
    const wrapperHandle = wrapper.children().at(0);
    wrapperHandle.simulate('focus');
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });

  it('deny change', () => {
    const wrapper = mount(<BreakPointInput name="test" placeHolder="192.168.31.177" />);
    wrapper.setProps({ placeHolder: '44' });
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });

  it('reg change', () => {
    const wrapper = mount(<BreakPointInput name="test" placeHolder="192.168.31.177" />);
    wrapper.setProps({ placeHolder: '44.gt.1.1' });
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });

  it('render change', () => {
    const wrapper = mount(<BreakPointInput name="test" placeHolder="192.168.31.177" />);
    wrapper.setProps({ placeHolder: '192.168.666.177' });
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });
});
