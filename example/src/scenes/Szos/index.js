import React, { Component } from 'react';
import { TYFlatList } from 'tuya-panel-kit';
import { produceRouterDatas } from '../../utils';
import { subRouters } from '../../config/routers';
import SoundWave from './SoundWave';
// import GestureSlider from './GestureSlider';

export default class SzosScene extends Component {
    static SoundWave = SoundWave;
    // static GestureSlider = GestureSlider;

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