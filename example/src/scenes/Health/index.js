import React, { Component } from 'react';
import { TYFlatList } from 'tuya-panel-kit';
import { produceRouterDatas } from '../../utils';
import { subRouters } from '../../config/routers';
import UnlockButton from './UnlockButton';
import SleepBarPercent from './SleepBarPercent';
import ScrollRuler from './ScrollRuler';
import CountDown from './CountDown';
import Progess from './Progess';
import RotateView from './RotateView';
import BreatheView from './BreatheView';

export default class HealthScene extends Component {
  static UnlockButton = UnlockButton;
  static SleepBarPercent = SleepBarPercent;
  static ScrollRuler = ScrollRuler;
  static CountDown = CountDown;
  static Progess = Progess;
  static BreatheView = BreatheView;
  static RotateView = RotateView;
  get data() {
    return produceRouterDatas(subRouters.filter(r => /^Health.+\w*$/.test(r.id)));
  }

  render() {
    return <TYFlatList contentContainerStyle={{ paddingTop: 16 }} data={this.data} />;
  }
}
