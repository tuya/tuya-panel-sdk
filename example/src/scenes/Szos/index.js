import React, { Component } from 'react';
import { TYFlatList } from 'tuya-panel-kit';
import { produceRouterDatas } from '../../utils';
import { subRouters } from '../../config/routers';
import SoundWave from './SoundWave';
import GestureSlider from './GestureSlider';
import StreeringWheel from './SteeringWheel';
import SimpleVerticalSlider from './SimpleVerticalSlider';
import LineBoxSvg from './LineBoxSvg';
import TurnPlate from './TurnPlate';
export default class SzosScene extends Component {
  static SoundWave = SoundWave;
  static GestureSlider = GestureSlider;
  static StreeringWheel = StreeringWheel;
  static SimpleVerticalSlider = SimpleVerticalSlider;
  static LineBoxSvg = LineBoxSvg;
  static TurnPlate = TurnPlate;

  get data() {
    return produceRouterDatas(subRouters.filter(r => /^Szos.+\w*$/.test(r.id)));
  }

  render() {
    return <TYFlatList contentContainerStyle={{ paddingTop: 16 }} data={this.data} />;
  }
}
