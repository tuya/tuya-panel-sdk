import React, { Component } from 'react';
import { TYFlatList } from 'tuya-panel-kit';
import { produceRouterDatas } from '../../utils';
import { subRouters } from '../../config/routers';
import LinkageApiScene from './LinkageApi';

export default class AnimatedScene extends Component {
  static LinkageApi = LinkageApiScene;

  get data() {
    return produceRouterDatas(subRouters.filter(r => /^ApiScene.+\w*$/.test(r.id)));
  }

  render() {
    return <TYFlatList contentContainerStyle={{ paddingTop: 16 }} data={this.data} />;
  }
}
