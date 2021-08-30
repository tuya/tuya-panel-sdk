import React from 'react';
import { shallow } from 'enzyme';
import { Utils } from 'tuya-panel-kit';
import CurtainsAnimate from '../index';
import Res from './res';
const { roller, button, left, right } = Res;
const { convertX: cx } = Utils.RatioUtils;

describe('PressKey components', () => {
  it('basic render', () => {
    const wrapper = shallow(
      <CurtainsAnimate
        rollerImage={roller}
        buttonImage={button}
        curtainsLeftImage={left}
        curtainsRightImage={right}
        buttonPositionErrorValue={cx(4)}
        type={null}
      />
    );
    expect(wrapper).toMatchSnapshot();
    const wrapper1 = shallow(<CurtainsAnimate buttonPositionErrorValue={cx(4)} type={null} />);
    expect(wrapper1).toMatchSnapshot();
  });
  it('open render', () => {
    let type = null;
    const wrapper = shallow(
      <CurtainsAnimate
        rollerImage={roller}
        buttonImage={button}
        curtainsLeftImage={left}
        curtainsRightImage={right}
        buttonPositionErrorValue={cx(4)}
        type={type}
      />
    );
    const wrapper1 = shallow(<CurtainsAnimate buttonPositionErrorValue={cx(4)} type={type} />);
    type = 'open';
    wrapper.setProps({ type });
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
    wrapper1.setProps({ type });
    expect(wrapper1).toMatchSnapshot();
  });
  it('close render', () => {
    let type = null;
    const wrapper = shallow(
      <CurtainsAnimate
        rollerImage={roller}
        buttonImage={button}
        curtainsLeftImage={left}
        curtainsRightImage={right}
        buttonPositionErrorValue={cx(4)}
        type={type}
      />
    );
    const wrapper1 = shallow(<CurtainsAnimate buttonPositionErrorValue={cx(4)} type={type} />);
    type = 'close';
    wrapper.setProps({ type });
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
    wrapper1.setProps({ type });
    expect(wrapper1).toMatchSnapshot();
  });

  it('pause render', () => {
    let type = 'open';
    const wrapper = shallow(
      <CurtainsAnimate
        rollerImage={roller}
        buttonImage={button}
        curtainsLeftImage={left}
        curtainsRightImage={right}
        buttonPositionErrorValue={cx(4)}
        type={type}
      />
    );
    const wrapper1 = shallow(<CurtainsAnimate buttonPositionErrorValue={cx(4)} type={type} />);
    type = 'pause';
    wrapper.setProps({ type });
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
    wrapper1.setProps({ type });
    expect(wrapper1).toMatchSnapshot();
  });
});
