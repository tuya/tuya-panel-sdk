/*
 * @Author: 豆芽(douya.ye@tuya.com)
 * @Date: 2021-11-05 10:02:48
 * @LastEditTime: 2021-11-05 11:17:20
 * @LastEditors: 豆芽(douya.ye@tuya.com)
 * @Description: ll
 * @FilePath: /tuya-panel-sdk/example/src/scenes/Szos/index.js
 */
import React, { Component } from 'react';
import { TYFlatList } from 'tuya-panel-kit';
import { produceRouterDatas } from '../../utils';
import { subRouters } from '../../config/routers';
import SoundWave from './SoundWave';
import GestureSlider from './GestureSlider';
import StreeringWheel from './SteeringWheel';
import SimpleVerticalSlider from './SimpleVerticalSlider';
import TurnPlate from './TurnPlate';
import MultiSlider from './MultiSlider';
import ImgAnimate from './ImgAnimate';
export default class SzosScene extends Component {
  static SoundWave = SoundWave;
  static GestureSlider = GestureSlider;
  static StreeringWheel = StreeringWheel;
  static SimpleVerticalSlider = SimpleVerticalSlider;
  static TurnPlate = TurnPlate;
  static MultiSlider = MultiSlider;
  static ImgAnimate = ImgAnimate;

  get data() {
    return produceRouterDatas(subRouters.filter(r => /^Szos.+\w*$/.test(r.id)));
  }

  render() {
    return <TYFlatList contentContainerStyle={{ paddingTop: 16 }} data={this.data} />;
  }
}
