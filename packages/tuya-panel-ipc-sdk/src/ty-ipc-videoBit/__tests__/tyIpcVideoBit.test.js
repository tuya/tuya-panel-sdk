import React from 'react';
import { shallow } from 'enzyme';
import TYIpcVideoBit from '../index';

describe('TYIpcVideoBit components', () => {
  it('basic render', () => {
    const wrapper = shallow(
      <TYIpcVideoBit containerStyle={{ position: 'absolute', right: 0, top: 30 }} />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('container render', () => {
    const wrapper = shallow(<TYIpcVideoBit valueStyle={{ color: 'red', fontSize: 24 }} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('bitTxtBox render', () => {
    const wrapper = shallow(<TYIpcVideoBit bitTxtBoxStyle={{ width: 100, height: 30 }} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('unit render', () => {
    const wrapper = shallow(<TYIpcVideoBit unitStyle={{ color: 'black' }} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('bit data', () => {
    const wrapper = shallow(<TYIpcVideoBit bitValue={30} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('unit data', () => {
    const wrapper = shallow(<TYIpcVideoBit unit="m/s" />);
    expect(wrapper).toMatchSnapshot();
  });
});