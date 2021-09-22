import React, { Component } from 'react';
import { TYFlatList } from 'tuya-panel-kit';
import { subRouters } from '../../config/routers';
import AnimatedNumber from './animatedNumber';
import CountDownButtonDemo from './countDownButton';
import LinkSelect from './linkSelect';
import SlideChooseDemo from './sliderChoose';
import ShareManager from './share';
import GetPassword from './getPassword';
import DefendTime from './defendTime';
import WeekSelection from './weekSelection';
// import Gesture from './gesture';
import Finger from './finger';
import DatePickerRange from './datePickerRange';
import TimePickerRange from './timePickerRange';
import RandomPassword from './randomPassword';
import TouchableWarpView from './touchableView';
import { produceRouterDatas } from '../../utils';

export default class LampCategoryScene extends Component {
  static CountDownButton = CountDownButtonDemo;
  static SlideChoose = SlideChooseDemo;
  static LinkSelect = LinkSelect;
  static Share = ShareManager;
  static GetPassword = GetPassword;
  static DefendTime = DefendTime;
  static Finger = Finger;
  static DatePickerRange = DatePickerRange;
  static WeekSelection = WeekSelection;
  static RandomPassword = RandomPassword;
  static TouchableView = TouchableWarpView;
  static AnimatedNumber = AnimatedNumber;
  static TimePickerRange = TimePickerRange;
  // static Gesture = Gesture;
  get data() {
    return produceRouterDatas(subRouters.filter(r => /^Lock\.((?!\.)\w)+$/.test(r.id)));
  }

  render() {
    return (
      <TYFlatList
        style={{ backgroundColor: '#fff' }}
        contentContainerStyle={{ paddingTop: 16, marginHorizontal: 24, backgroundColor: '#fff' }}
        data={this.data}
      />
    );
  }
}
