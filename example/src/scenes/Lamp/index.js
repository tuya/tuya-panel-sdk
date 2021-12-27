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
import BrightRectSliderScene from './BrightRectSlider';
import HueBrightCrossSliderScene from './HueBrightCrossSlider';
import NumberSliderScene from './NumberSlider';
import ScaleSliderScene from './ScaleSlider';
import WhiteCrossSliderScene from './WhiteCrossSlider';
import CountdownPickerScene from './CountdownPicker';
import ColorDiskScene from './ColorDisk';
import ColorRectScene from './ColorRect';
import WeekGroupScene from './WeekGroup';
import AppMusicCardScene from './MusicRhythm/AppMusicCard';
import ConicalGradientScene from './ConicalGradient';
import ColorSelectorAnimationScene from './ColorSelectorAnimation';
import MusicDrawerScene from './MusicDrawer';
import CountdownSubPage from './CountdownSubPage';

export default class LampScene extends Component {
  get data() {
    return produceRouterDatas(subRouters.filter(r => /^Lamp.+\w*$/.test(r.id)));
  }

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
  static CountdownPicker = CountdownPickerScene;
  static SingleTimePicker = SingleTimePickerScene;
  static BrightRectSlider = BrightRectSliderScene;
  static HueBrightCrossSlider = HueBrightCrossSliderScene;
  static NumberSlider = NumberSliderScene;
  static ScaleSlider = ScaleSliderScene;
  static WhiteCrossSlider = WhiteCrossSliderScene;
  static ColorDisk = ColorDiskScene;
  static ColorRect = ColorRectScene;
  static WeekGroup = WeekGroupScene;
  static AppMusicCard = AppMusicCardScene;
  static MusicDrawer = MusicDrawerScene;
  static ConicalGradient = ConicalGradientScene;
  static ColorSelectorAnimation = ColorSelectorAnimationScene;
  static CountdownSubPage = CountdownSubPage;
  render() {
    return <TYFlatList contentContainerStyle={{ paddingTop: 16 }} data={this.data} />;
  }
}
