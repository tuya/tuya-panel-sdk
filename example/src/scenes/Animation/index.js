import React, { Component } from 'react';
import { TYFlatList } from 'tuya-panel-kit';
import { produceRouterDatas } from '../../utils';
import { subRouters } from '../../config/routers';
import DiffusionAnimatedScene from './diffusion';
import DrawerAnimatedScene from './drawer';
import JitterAlertAnimatedScene from './jitterAlert';
import ModeChangeAnimatedScene from './modeChange';
import NumberChangeAnimatedScene from './numberChange';
import WaveViewAnimatedScene from './waveView';

export default class AnimatedScene extends Component {
  static Diffusion = DiffusionAnimatedScene;
  static Drawer = DrawerAnimatedScene;
  static JitterAlert = JitterAlertAnimatedScene;
  static ModeChange = ModeChangeAnimatedScene;
  static NumberChange = NumberChangeAnimatedScene;
  static WaveView = WaveViewAnimatedScene;

  get data() {
    return produceRouterDatas(subRouters.filter(r => /^Animation.+\w*$/.test(r.id)));
  }

  render() {
    return <TYFlatList contentContainerStyle={{ paddingTop: 16 }} data={this.data} />;
  }
}
