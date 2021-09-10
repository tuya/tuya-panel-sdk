import React, { Component } from 'react';
import { TYFlatList } from 'tuya-panel-kit';
import { produceRouterDatas } from '../../utils';
import { subRouters } from '../../config/routers';
import IpcPirScene from './IpcPir';
import IpcLayoutAutoScene from './IpcLayoutAuto';
import IpcGrid from './IpcGrid';
import IpcCrossDevice from './IpcCrossDevice';
import IpcPlayer from './IpcPlayer';
import IpcBatteryScene from './IpcBattery';
import IpcPlayerRnPageTest from './IpcPlayerRnPageTest';
import IpcVideoBit from './IpcVideoBit';
import IpcTempHumi from './IpcTempHumi';
import IpcProgressBar from './IpcProgressBar';
import IpcTimerInterval from './IpcTimerInterval';
import IpcPtz from './IpcPtz';
import IpcDragSort from './IpcDragSort';
import IpcMessagePlayer from './IpcMessagePlayer';
import IpcGpsSignal from './IpcGpsSignal';
import IpcGridList from './IpcGridList';
import IpcStepButton from './IpcStepButton';

export default class AnimatedScene extends Component {
  get data() {
    return produceRouterDatas(subRouters.filter(r => /^Ipc.+\w*$/.test(r.id)));
  }

  static IpcPir = IpcPirScene;
  static IpcLayoutAuto = IpcLayoutAutoScene;
  static IpcGrid = IpcGrid;
  static IpcCrossDevice = IpcCrossDevice;
  static IpcPlayer = IpcPlayer;
  static IpcBattery = IpcBatteryScene;
  static IpcPlayerRnPageTest = IpcPlayerRnPageTest;
  static IpcVideoBit = IpcVideoBit;
  static IpcTempHumi = IpcTempHumi;
  static IpcProgressBar = IpcProgressBar;
  static IpcTimerInterval = IpcTimerInterval;
  static IpcPtz = IpcPtz;
  static IpcDragSort = IpcDragSort;
  static IpcMessagePlayer = IpcMessagePlayer;
  static IpcGpsSignal = IpcGpsSignal;
  static IpcGridList = IpcGridList;
  static IpcStepButton = IpcStepButton;

  render() {
    return <TYFlatList contentContainerStyle={{ paddingTop: 16 }} data={this.data} />;
  }
}
