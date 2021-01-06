import React, { Component } from 'react';
import { TYFlatList } from 'tuya-panel-kit';
import { produceRouterDatas } from '../../utils';
import { subRouters } from '../../config/routers';
import CountDownAnimatedScene from './countdown';
// import TimeCheckAnimatedScene from './timeCheck';
// import NumberChangeAnimatedScene from './numberChange';
// import ModeChangeAnimatedScene from './modeChange';
// import DrawerAnimatedScene from './drawer';
// import DiffusionAnimatedScene from './diffusion';
// import JitterAlertAnimatedScene from './jitterAlert';
// import WaveViewAnimatedScene from './waveView';
// import ScaleCarouselAnimatedScene from './scaleCarousel';
// import HorPickerAnimatedScene from './horPicker';
// import ParticleScene from './particle';

export default class AnimatedScene extends Component {
  static CountDown = CountDownAnimatedScene;
  get data() {
    return produceRouterDatas(subRouters.filter(r => /^Animation.+\w*$/.test(r.id)));
  }
  // static TimeCheck = TimeCheckAnimatedScene;
  // static NumberChange = NumberChangeAnimatedScene;
  // static ModeChange = ModeChangeAnimatedScene;
  // static Drawer = DrawerAnimatedScene;
  // static Diffusion = DiffusionAnimatedScene;
  // static JitterAlert = JitterAlertAnimatedScene;
  // static WaveView = WaveViewAnimatedScene;
  // static ScaleCarousel = ScaleCarouselAnimatedScene;
  // static HorPicker = HorPickerAnimatedScene;
  // static Particle = ParticleScene;

  render() {
    return <TYFlatList contentContainerStyle={{ paddingTop: 16 }} data={this.data} />;
  }
}
