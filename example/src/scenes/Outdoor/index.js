import React from 'react';
import { TYFlatList } from 'tuya-panel-kit';
import { subRouters } from '../../config/routers';
import { produceRouterDatas } from '../../utils';
import LocationText from './location-text';
import DateText from './date-text';
import CalendarList from './calendar-list';
import SettingSlider from './setting-slider';
import CircleProgress from './shadow-circle-progress';
import Battery from './battery';
import SportNoTarget from './sport-no-target';
import SportTarget from './sport-target';
import SwipePop from './swipe-pop';

export default class OutdoorScene extends React.Component {
  get data() {
    return produceRouterDatas(subRouters.filter(r => /^Outdoor\.((?!\.)\w)+$/.test(r.id)));
  }

  static DateText = DateText;
  static LocationText = LocationText;
  static SettingSlider = SettingSlider;
  static shadowCircleProgress = CircleProgress;
  static Battery = Battery;
  static CalendarList = CalendarList;
  static SportNoTarget = SportNoTarget;
  static SportTarget = SportTarget;
  static SwipePop = SwipePop;

  render() {
    return <TYFlatList data={this.data} />;
  }
}
