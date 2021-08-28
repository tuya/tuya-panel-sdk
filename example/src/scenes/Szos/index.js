import React, { Component } from 'react';
import { TYFlatList } from 'tuya-panel-kit';
import { produceRouterDatas } from '../../utils';
import { subRouters } from '../../config/routers';
import SoundWave from './SoundWave';

export default class SzosScene extends Component {
    static SoundWave = SoundWave;

    get data() {
        return produceRouterDatas(subRouters.filter(r => /^Szos.+\w*$/.test(r.id)));
    }

    render() {
        return <TYFlatList contentContainerStyle = {
            { paddingTop: 16 } }
        data = { this.data }
        />;
    }
}