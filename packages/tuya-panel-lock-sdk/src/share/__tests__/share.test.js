/* eslint-disable jest/expect-expect */
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { shallow } from 'enzyme';
import { Button } from 'tuya-panel-kit';
import Share from '../index';
import ShareManager from '../shareManager';

// eslint-disable-next-line import/no-unresolved
const logo = require('../../res/safe.png');

describe('WeekSelection components', () => {
  it('basic render', () => {
    const wrapper = shallow(
      <Share
        shareMessage="浮丘测试"
        text="分享"
        customShareList={[{ key: 'message', title: 'test', img: logo }]}
      />
    );
    wrapper.find(TouchableOpacity).at(0).simulate('press');
    expect(wrapper).toMatchSnapshot();
  });
  it('basic ShareManager render', () => {
    const wrapper = shallow(
      <ShareManager
        shareData={{ title: '', message: 'test' }}
        customShareList={[{ key: 'message', title: 'test', img: logo }]}
      />
    );
    wrapper.find(Button).at(0).simulate('press');
    wrapper.find(Button).at(3).simulate('press');
    wrapper.find(Button).at(4).simulate('press');
    expect(wrapper).toMatchSnapshot();
  });
});
