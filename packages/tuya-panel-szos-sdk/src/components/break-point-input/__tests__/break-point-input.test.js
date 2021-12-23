/**
 * @jest-environment jsdom
 */
import React from 'react';
import { shallow, mount } from 'enzyme';
import BreakPointInput from '../index';
import { GlobalToast } from 'tuya-panel-kit';
// const jsdom = require('jsdom');

// const { JSDOM } = jsdom;
// const { window } = new JSDOM('');
// const { document } = new JSDOM(``).window;

global.document = document;
global.window = window;
describe('BreakPointInput components', () => {
  it('basic render', () => {
    const placeH = '12';
    const wrapper = mount(<BreakPointInput name="test" placeHolder={placeH} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('basic placeHolder', () => {
    const placeH = '192.168.1.1';
    const wrapper = shallow(<BreakPointInput name="test" placeHolder={placeH} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('render focus', () => {
    const placeH = '12';
    const changeColor = false;
    const func = () => {
      GlobalToast.show({
        text: 'focus',
        onFinish: () => {
          GlobalToast.hide();
        },
      });
    };
    const wrapper = shallow(
      <BreakPointInput name="test" placeHolder={placeH} focusFuc={func} changeColor={changeColor} />
    );
    const wrapperHandle = wrapper.children().at(0);
    wrapperHandle.simulate('focus');
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });

  it('render change', () => {
    const changeColor = false;

    const wrapper = mount(
      <BreakPointInput name="test" placeHolder="192.168.31.177" changeColor={changeColor} />
    );
    wrapper.setProps({ placeHolder: '192.168.hu.177' });
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });
});
