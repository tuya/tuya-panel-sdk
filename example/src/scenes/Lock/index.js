import React, { Component } from 'react';
import { TYFlatList } from 'tuya-panel-kit';
import { subRouters } from '../../config/routers';
import LinkSelect from './linkSelect';
import GetPassword from './getPassword';
import DefendTime from './defendTime';
// import Gesture from './gesture';
import Finger from './finger';
import DatePickerRange from './datePickerRange';
import Avatar from './avatar';
import { produceRouterDatas } from '../../utils';

export default class LampCategoryScene extends Component {
  static LinkSelect = LinkSelect;
  static GetPassword = GetPassword;
  static DefendTime = DefendTime;
  static Finger = Finger;
  static DatePickerRange = DatePickerRange;
  static Avatar = Avatar;
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
