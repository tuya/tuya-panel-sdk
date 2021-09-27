import React, { Component } from 'react';
import { TYFlatList } from 'tuya-panel-kit';
import { produceRouterDatas } from '../../utils';
import { subRouters } from '../../config/routers';
import RectColorAndBrightPickerScene from './RectColorAndBrightPicker';
import TemperaturePickerScene from './TemperaturePicker';
import HueSaturationPickerScene from './HueSaturationPicker';
import HuePickerScene from './HuePicker';
import CirclePickerScene from './CirclePicker';
import TemperatureBrightPickerScene from './TemperatureBrightPicker';
import TemperaturePolarPickerScene from './TemperaturePolarPicker';
import LampLightPreviewScene from './LampLightPreview';
import LampPreviewScene from './LampPreview';
import ColorSelectorNoScrollScene from './ColorSelectorNoScroll';
import SingleTimePickerScene from './SingleTimePicker';
import ColorDiskScene from './ColorDisk';
import WeekGroupScene from './WeekGroup';
import AppMusicCardScene from './MusicRhythm/AppMusicCard';

export default class LampScene extends Component {
  static RectColorAndBrightPicker = RectColorAndBrightPickerScene;
  static TemperaturePicker = TemperaturePickerScene;
  static HueSaturationPicker = HueSaturationPickerScene;
  static HuePicker = HuePickerScene;
  static CirclePicker = CirclePickerScene;
  static TemperatureBrightPicker = TemperatureBrightPickerScene;
  static TemperaturePolarPicker = TemperaturePolarPickerScene;
  static LampLightPreview = LampLightPreviewScene;
  static LampPreview = LampPreviewScene;
  static ColorSelectorNoScroll = ColorSelectorNoScrollScene;
  static SingleTimePicker = SingleTimePickerScene;
  static ColorDisk = ColorDiskScene;
  static WeekGroup = WeekGroupScene;
  static AppMusicCard = AppMusicCardScene;

  get data() {
    return produceRouterDatas(subRouters.filter(r => /^Lamp.+\w*$/.test(r.id)));
  }

  render() {
    return <TYFlatList contentContainerStyle={{ paddingTop: 16 }} data={this.data} />;
  }
}
