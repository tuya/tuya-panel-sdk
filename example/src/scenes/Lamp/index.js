import React, { Component } from 'react';
import { TYFlatList } from 'tuya-panel-kit';
import { produceRouterDatas } from '../../utils';
import { subRouters } from '../../config/routers';
import RectColorAndBrightPickerScene from './RectColorAndBrightPicker';
import TemperaturePickerScene from './TemperaturePicker';
import HueSaturationPickerScene from './HueSaturationPicker';
import HuePickerScene from './HuePicker';

export default class LampScene extends Component {
  static RectColorAndBrightPicker = RectColorAndBrightPickerScene;
  static TemperaturePicker = TemperaturePickerScene;
  static HueSaturationPicker = HueSaturationPickerScene;
  static HuePicker = HuePickerScene;

  get data() {
    return produceRouterDatas(subRouters.filter(r => /^Lamp.+\w*$/.test(r.id)));
  }

  render() {
    return <TYFlatList contentContainerStyle={{ paddingTop: 16 }} data={this.data} />;
  }
}
