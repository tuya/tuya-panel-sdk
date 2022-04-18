/**
 * @jest-environment jsdom
 */
import React from 'react';
import { shallow } from 'enzyme';
import WhiteSpace from '../index';

global.document = document;
global.window = window;

describe('DpCacheText', () => {
  it('basic demo', () => {
    const wrapper = shallow(<WhiteSpace />);
    expect(wrapper).toMatchSnapshot();
  });

  it('basic demo1', () => {
    const wrapper = shallow(<WhiteSpace size="md" />);
    expect(wrapper).toMatchSnapshot();
  });
});
