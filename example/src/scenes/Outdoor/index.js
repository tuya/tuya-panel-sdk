import React, { Component } from 'react';
import { TYFlatList } from 'tuya-panel-kit';
import { subRouters } from '../../config/routers';
import { produceRouterDatas } from '../../utils';
import LocationText from './location-text';
import SettingSlider from './setting-slider';
import CircleProgress from './shadow-circle-progress';

export default class OutdoorScene extends Component {
  get data() {
    return produceRouterDatas(subRouters.filter(r => /^Outdoor\.((?!\.)\w)+$/.test(r.id)));
  }

  static LocationText = LocationText;
  static SettingSlider = SettingSlider;
  static shadowCircleProgress = CircleProgress;

  render() {
    return <TYFlatList data={this.data} />;
  }
}
