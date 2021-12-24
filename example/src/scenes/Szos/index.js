/*
 * @Author: 豆芽(douya.ye@tuya.com)
 * @Date: 2021-11-05 10:02:48
 * @LastEditTime: 2021-12-15 11:27:04
 * @LastEditors: 豆芽(douya.ye@tuya.com)
 * @Description: ll
 * @FilePath: /tuya-panel-sdk/example/src/scenes/Szos/index.js
 */
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
