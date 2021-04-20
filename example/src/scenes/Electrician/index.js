import React, { Component } from 'react';
import { TYFlatList } from 'tuya-panel-kit';
import { produceRouterDatas } from '../../utils';
import { subRouters } from '../../config/routers';
import CountdownElectricianScene from './Countdown';
import SocketElectricianScene from './Socket';
import CountdownListElectricianScene from './CountdownList';
import CurtainElectricianScene from './Curtain';
import AnimatedHeaderElectricianScene from './AnimatedHeader';
import CurtainControlElectricianScene from './CurtainControl';
import DropDownElectricianScene from './dropDown';
import EleSettingElectricianScene from './EleSetting';
import MagicLayoutElectricianScene from './MagicLayout';
import NameEditorElectricianScene from './NameEditor';
import PowerLineElectricianScene from './PowerLine';
import PushAnimateElectricianScene from './PushAnimate';
import ScheduleListElectricianScene from './ScheduleList';
import ShuffingListElectricianScene from './ShuffingList';
import SlideLayoutElectricianScene from './SlideLayout';
import SocketListItemElectricianScene from './SocketListItem';

export default class AnimatedScene extends Component {
  static Countdown = CountdownElectricianScene;
  static Countdown = CountdownElectricianScene;
  static Socket = SocketElectricianScene;
  static CountdownList = CountdownListElectricianScene;
  static Curtain = CurtainElectricianScene;
  static AnimatedHeader = AnimatedHeaderElectricianScene;
  static CurtainControl = CurtainControlElectricianScene;
  static DropDown = DropDownElectricianScene;
  static EleSetting = EleSettingElectricianScene;
  static MagicLayout = MagicLayoutElectricianScene;
  static NameEditor = NameEditorElectricianScene;
  static PowerLine = PowerLineElectricianScene;
  static PushAnimate = PushAnimateElectricianScene;
  static ScheduleList = ScheduleListElectricianScene;
  static ShuffingList = ShuffingListElectricianScene;
  static SlideLayout = SlideLayoutElectricianScene;
  static SocketListItem = SocketListItemElectricianScene;

  get data() {
    return produceRouterDatas(subRouters.filter(r => /^Electrician.+\w*$/.test(r.id)));
  }

  render() {
    return <TYFlatList contentContainerStyle={{ paddingTop: 16 }} data={this.data} />;
  }
}
