import React, { Component } from 'react';
import { TYFlatList } from 'tuya-panel-kit';
import CountdownElectricianScene from './Countdown';
import { produceRouterDatas } from '../../utils';
import { subRouters } from '../../config/routers';

export default class AnimatedScene extends Component {
  static Countdown = CountdownElectricianScene;

  get data() {
    return produceRouterDatas(subRouters.filter(r => /^Electrician.+\w*$/.test(r.id)));
  }

  render() {
    return <TYFlatList contentContainerStyle={{ paddingTop: 16 }} data={this.data} />;
  }
}
