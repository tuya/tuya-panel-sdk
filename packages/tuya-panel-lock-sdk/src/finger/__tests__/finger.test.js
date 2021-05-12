import React from 'react';
import { shallow } from 'enzyme';
import Finger from '../index';

describe('finger components', () => {
  it('basic render', () => {
    const wrapper = shallow(
      <Finger
        currentNumber={7}
        totalNumber={10}
        isSuccess={true}
        isNeedPageTip={true}
        commonTip="commonTip"
        tipPageTip="tipPageTip"
      ></Finger>
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('basic render', () => {
    const wrapper = shallow(
      <Finger
        currentNumber={5}
        totalNumber={10}
        isSuccess={false}
        isNeedPageTip={true}
        commonTip="commonTip"
        tipPageTip="tipPageTip"
      ></Finger>
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('currentNumber render', () => {
    const wrapper = shallow(
      <Finger
        currentNumber={5}
        totalNumber={10}
        isSuccess={false}
        isNeedPageTip={false}
        commonTip="commonTip"
        tipPageTip="tipPageTip"
      ></Finger>
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('isNeedPageTip render', () => {
    const wrapper = shallow(
      <Finger
        currentNumber={12}
        totalNumber={10}
        isSuccess={false}
        isNeedPageTip={false}
        commonTip="commonTip"
        tipPageTip="tipPageTip"
      ></Finger>
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('currentNumber render', () => {
    const wrapper = shallow(
      <Finger
        currentNumber={2}
        totalNumber={10}
        isSuccess={true}
        isNeedPageTip={false}
        commonTip="commonTip"
        tipPageTip="tipPageTip"
      ></Finger>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
