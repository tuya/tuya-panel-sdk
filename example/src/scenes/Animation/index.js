import React, { Component } from 'react';
import { TYFlatList } from 'tuya-panel-kit';
import { produceRouterDatas } from '../../utils';
import { subRouters } from '../../config/routers';
import CountDownAnimatedScene from './countdown';
import DiffusionAnimatedScene from './diffusion';
import DrawerAnimatedScene from './drawer';
import JitterAlertAnimatedScene from './jitterAlert';
// import TimeCheckAnimatedScene from './timeCheck';
// import NumberChangeAnimatedScene from './numberChange';
// import ModeChangeAnimatedScene from './modeChange';
// import WaveViewAnimatedScene from './waveView';
// import ScaleCarouselAnimatedScene from './scaleCarousel';
// import HorPickerAnimatedScene from './horPicker';
// import ParticleScene from './particle';

export default class AnimatedScene extends Component {
  static CountDown = CountDownAnimatedScene;
  static Diffusion = DiffusionAnimatedScene;
  static Drawer = DrawerAnimatedScene;
  static JitterAlert = JitterAlertAnimatedScene;

  get data() {
    return produceRouterDatas(subRouters.filter(r => /^Animation.+\w*$/.test(r.id)));
  }
  // static TimeCheck = TimeCheckAnimatedScene;
  // static NumberChange = NumberChangeAnimatedScene;
  // static ModeChange = ModeChangeAnimatedScene;
  // static WaveView = WaveViewAnimatedScene;
  // static ScaleCarousel = ScaleCarouselAnimatedScene;
  // static HorPicker = HorPickerAnimatedScene;
  // static Particle = ParticleScene;

  render() {
    return <TYFlatList contentContainerStyle={{ paddingTop: 16 }} data={this.data} />;
  }
}
