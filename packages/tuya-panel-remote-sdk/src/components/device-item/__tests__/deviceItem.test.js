/**
 * @jest-environment jsdom
 */

import React from 'react';
import { shallow } from 'enzyme';
import { TYText } from 'tuya-panel-kit';
import DeviceItem from '../index';
import Res from './res';

describe('DeviceItem components', () => {
  it('leftIcon', () => {
    const wrapper = shallow(<DeviceItem icon={Res.iconLight} />);
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });

  it('content', () => {
    const wrapper = shallow(<DeviceItem icon={Res.iconLight} title="Title" subTitle="SubTitle" />);
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });

  it('rightIcon', () => {
    const wrapper = shallow(
      <DeviceItem icon={Res.iconLight} title="Title" subTitle="SubTitle" showRightArrow={false} />
    );
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });

  it('scroll', () => {
    const wrapper = shallow(
      <DeviceItem
        icon={Res.iconLight}
        title="Title"
        subTitle="SubTitle"
        showRightArrow={false}
        enableSwipe={false}
      />
    );
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });

  it('custom content', () => {
    const wrapper = shallow(
      <DeviceItem
        icon={Res.iconLight}
        content={<TYText text="自定义内容" style={{ height: '100%' }} />}
      />
    );
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });

  it('extra', () => {
    const wrapper = shallow(<DeviceItem icon={Res.iconLight} extra={<TYText text="extra" />} />);
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });
});
