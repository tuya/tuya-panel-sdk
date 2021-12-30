import React, { Component } from 'react';
import { TYFlatList } from 'tuya-panel-kit';
import { produceRouterDatas } from '../../utils';
import { subRouters } from '../../config/routers';

import SimpleVerticalSlider from './SimpleVerticalSlider';
import TurnPlate from './TurnPlate';

export default class SzosScene extends Component {
  get data() {
    return produceRouterDatas(subRouters.filter(r => /^Szos.+\w*$/.test(r.id)));
  }

  static SimpleVerticalSlider = SimpleVerticalSlider;
  static TurnPlate = TurnPlate;
  render() {
    return <TYFlatList contentContainerStyle={{ paddingTop: 16 }} data={this.data} />;
  }
}
