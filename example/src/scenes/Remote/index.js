import React, { Component } from 'react';
import { TYFlatList } from 'tuya-panel-kit';
import { subRouters } from '../../config/routers';
import { produceRouterDatas } from '../../utils';
import CircleHandle from './CircleHandle';
import PressKey from './PressKey';
import DoubleKey from './DoubleKey';
import CurtainsAnimate from './CurtainsAnimate';
import PusherAnimate from './PusherAnimate';
import RollerAnimate from './RollerAnimate';
import LightAnimate from './LightAnimate';
import LetterSearch from './LetterSearch';
import MaskView from './MaskView';
import SearchInput from './SearchInput';
import DeviceItem from './DeviceItem';

export default class SweepRobotCategoryScene extends Component {
  get data() {
    return produceRouterDatas(subRouters.filter(r => /^Remote\.[^.]+$/.test(r.id)));
  }

  static CircleHandle = CircleHandle;
  static PressKey = PressKey;
  static DoubleKey = DoubleKey;
  static CurtainsAnimate = CurtainsAnimate;
  static PusherAnimate = PusherAnimate;
  static RollerAnimate = RollerAnimate;
  static RollerAnimate = RollerAnimate;
  static LightAnimate = LightAnimate;
  static LetterSearch = LetterSearch;
  static MaskView = MaskView;
  static SearchInput = SearchInput;
  static DeviceItem = DeviceItem;

  render() {
    return (
      <TYFlatList
        style={{ backgroundColor: '#fff' }}
        contentContainerStyle={{ paddingTop: 16, marginHorizontal: 24, backgroundColor: '#fff' }}
        data={this.data}
      />
    );
  }
}
