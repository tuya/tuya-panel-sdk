/**
 * @jest-environment jsdom
 */
import React from 'react';
import { shallow } from 'enzyme';
import DpCacheText from '../index';

global.document = document;
global.window = window;

describe('DpCacheText', () => {
  it('basic demoewfwf', () => {
    const wrapper = shallow(<DpCacheText showIcon title="s" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('basic demo1', () => {
    const wrapper = shallow(<DpCacheText showIcon={false} title=";;" />);
    expect(wrapper).toMatchSnapshot();
  });
});
