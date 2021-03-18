import React, { Component } from 'react';
import { TYFlatList } from 'tuya-panel-kit';
import { produceRouterDatas } from '../../utils';
import { subRouters } from '../../config/routers';
import IpcPirScene from './IpcPir';

export default class AnimatedScene extends Component {
  get data() {
    return produceRouterDatas(subRouters.filter(r => /^Ipc.+\w*$/.test(r.id)));
  }

  static IpcPir = IpcPirScene;
  render() {
    return <TYFlatList contentContainerStyle={{ paddingTop: 16 }} data={this.data} />;
  }
}
