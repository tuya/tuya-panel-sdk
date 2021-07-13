import React, { Component } from 'react';
import { TYFlatList } from 'tuya-panel-kit';
import { produceRouterDatas } from '../../utils';
import { subRouters } from '../../config/routers';
import UnlockButton from './UnlockButton';
import SleepBarPercent from './SleepBarPercent';
export default class HealthScene extends Component {
  static UnlockButton = UnlockButton;
  static SleepBarPercent = SleepBarPercent;
  get data() {
    return produceRouterDatas(subRouters.filter(r => /^Health.+\w*$/.test(r.id)));
  }

  render() {
    return <TYFlatList contentContainerStyle={{ paddingTop: 16 }} data={this.data} />;
  }
}
