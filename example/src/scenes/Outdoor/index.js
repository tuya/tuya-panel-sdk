import React from 'react';
import { TYFlatList } from 'tuya-panel-kit';
import { subRouters } from '../../config/routers';
import { produceRouterDatas } from '../../utils';
import LocationText from './location-text';
import DateText from './date-text';
import CalendarList from './calendar-list';
import SettingSlider from './setting-slider';
import CircleProgress from './shadow-circle-progress';

export default class OutdoorScene extends React.Component {
  get data() {
    return produceRouterDatas(subRouters.filter(r => /^Outdoor\.((?!\.)\w)+$/.test(r.id)));
  }

  static DateText = DateText;
  static LocationText = LocationText;
  static SettingSlider = SettingSlider;
  static shadowCircleProgress = CircleProgress;
  static CalendarList = CalendarList;

  render() {
    return <TYFlatList data={this.data} />;
  }
}
