import React, { Component } from 'react';
import { TYFlatList } from 'tuya-panel-kit';
import { produceRouterDatas } from '../../utils';
import { subRouters } from '../../config/routers';
import AddDeviceTipScene from './AddDeviceTip';
import SetPasswordScene from './SetPassword';
// import TopBarWithArcScene from './TopBarWithArc';
import TempHumWithBlurcScene from './TempHumWithBlur';

export default class GatewayScene extends Component {
  static AddDeviceTip = AddDeviceTipScene;
  static SetPassword = SetPasswordScene;
  // static TopBarWithArc = TopBarWithArcScene;
  static TempHumWithBlur = TempHumWithBlurcScene;

  get data() {
    return produceRouterDatas(subRouters.filter(r => /^Gateway.+\w*$/.test(r.id)));
  }

  render() {
    return <TYFlatList contentContainerStyle={{ paddingTop: 16 }} data={this.data} />;
  }
}
