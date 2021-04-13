import React, { Component } from 'react';
import { TYFlatList } from 'tuya-panel-kit';
import { produceRouterDatas } from '../../utils';
import { subRouters } from '../../config/routers';
import IpcPirScene from './IpcPir';
import IpcLayoutAutoScene from './IpcLayoutAuto';
import IpcGrid from './IpcGrid';
import IpcCrossDevice from './IpcCrossDevice';
import IpcPlayer from './IpcPlayer';
import IpcPlayerRnPageTest from './IpcPlayerRnPageTest';
export default class AnimatedScene extends Component {
  get data() {
    return produceRouterDatas(subRouters.filter(r => /^Ipc.+\w*$/.test(r.id)));
  }

  static IpcPir = IpcPirScene;
  static IpcLayoutAuto = IpcLayoutAutoScene;
  static IpcGrid = IpcGrid;
  static IpcCrossDevice = IpcCrossDevice;
  static IpcPlayer = IpcPlayer;
  static IpcPlayerRnPageTest = IpcPlayerRnPageTest;

  render() {
    return <TYFlatList contentContainerStyle={{ paddingTop: 16 }} data={this.data} />;
  }
}
