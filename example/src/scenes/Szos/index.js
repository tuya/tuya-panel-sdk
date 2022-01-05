import React, { Component } from 'react';
import { TYFlatList } from 'tuya-panel-kit';
import { produceRouterDatas } from '../../utils';
import { subRouters } from '../../config/routers';

import SimpleVerticalSlider from './SimpleVerticalSlider';
import TurnPlate from './TurnPlate';
import StreeringWheel from './SteeringWheel';
import BreakPointInput from './BreakPointInput';
import SimpleTopBar from './SimpleTopBar';

export default class SzosScene extends Component {
  get data() {
    return produceRouterDatas(subRouters.filter(r => /^Szos.+\w*$/.test(r.id)));
  }

  static SimpleVerticalSlider = SimpleVerticalSlider;
  static TurnPlate = TurnPlate;
  static StreeringWheel = StreeringWheel;
  static BreakPointInput = BreakPointInput;
  static BreakPointInput = BreakPointInput;
  static SimpleTopBar = SimpleTopBar;
  render() {
    return <TYFlatList contentContainerStyle={{ paddingTop: 16 }} data={this.data} />;
  }
}
