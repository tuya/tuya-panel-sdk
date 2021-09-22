/* eslint-disable jest/expect-expect */
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { shallow } from 'enzyme';
import { Button } from 'tuya-panel-kit';
import Share from '../index';
import ShareManager from '../shareManager';

const logo = require('../../res/safe.png');

describe('WeekSelection components', () => {
  // let useEffect;
  // const mockUseEffect = () => {
  //   useEffect.mockImplementationOnce(f => f());
  // };
  // useEffect = jest.spyOn(React, 'useEffect');
  // mockUseEffect(); // 2 times
  // mockUseEffect(); //
  it('basicd render', () => {
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
  it('basicd ShareManager render', () => {
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
