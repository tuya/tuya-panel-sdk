import React, { Component } from 'react';
import { TYFlatList } from 'tuya-panel-kit';
import { produceRouterDatas } from '../../utils';
import { subRouters } from '../../config/routers';
import LaserDataApiScene from './LaserDataApi';

export default class AnimatedScene extends Component {
  static LaserDataApi = LaserDataApiScene;

  get data() {
    return produceRouterDatas(subRouters.filter(r => /^SweepRobot.+\w*$/.test(r.id)));
  }

  render() {
    return <TYFlatList contentContainerStyle={{ paddingTop: 16 }} data={this.data} />;
  }
}
