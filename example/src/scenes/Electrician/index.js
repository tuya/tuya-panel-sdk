import React, { Component } from 'react';
import { TYFlatList } from 'tuya-panel-kit';
import { produceRouterDatas } from '../../utils';
import { subRouters } from '../../config/routers';
import CountdownElectricianScene from './Countdown';
import SocketElectricianScene from './Socket';
import CountdownListElectricianScene from './CountdownList';

export default class AnimatedScene extends Component {
  static Countdown = CountdownElectricianScene;
  static Socket = SocketElectricianScene;
  static CountdownList = CountdownListElectricianScene;

  get data() {
    return produceRouterDatas(subRouters.filter(r => /^Electrician.+\w*$/.test(r.id)));
  }

  render() {
    return <TYFlatList contentContainerStyle={{ paddingTop: 16 }} data={this.data} />;
  }
}
