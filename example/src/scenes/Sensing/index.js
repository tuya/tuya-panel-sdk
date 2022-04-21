import React, { Component } from 'react';
import { TYFlatList, TYSdk } from 'tuya-panel-kit';
import { SensingSDK } from '@tuya/tuya-panel-sensing-sdk';
import { produceRouterDatas } from '../../utils';
import { subRouters } from '../../config/routers';
import WhiteSpace from './WhiteSpace';
import MultiSlider from './MultiSlider';
import Stepper from './Stepper';
import DpCacheText from './DpCacheText';
import ImageAnimate from './ImageAnimate';
import SendEmail from './SendEmail';
import AlarmCloud from './AlarmCloud';
import AlarmSwitch from './AlarmSwitch';
import TemperatureScaleSwitching from './TemperatureScaleSwitching';
import useBoolean from './hooks/useBoolean';
import useCurrentByDp from './hooks/useCurrentByDp';
import useDpScheme from './hooks/useDpSchema';
import useDpState from './hooks/useDpState';
import useUpdateInfo from './hooks/useUpdateInfo';

export default class SensingScenes extends Component {
  get data() {
    return produceRouterDatas(subRouters.filter(r => /^Sensing.+\w*$/.test(r.id)));
  }

  static WhiteSpace = WhiteSpace;

  static MultiSlider = MultiSlider;

  static Stepper = Stepper;

  static DpCacheText = DpCacheText;

  static ImageAnimate = ImageAnimate;

  static SendEmail = SendEmail;

  static AlarmCloud = AlarmCloud;

  static AlarmSwitch = AlarmSwitch;

  static TemperatureScaleSwitching = TemperatureScaleSwitching;

  static useBoolean = useBoolean;

  static useCurrentByDp = useCurrentByDp;

  static useDpScheme = useDpScheme;

  static useDpState = useDpState;

  static useUpdateInfo = useUpdateInfo;

  // eslint-disable-next-line react/sort-comp
  componentDidMount() {
    // eslint-disable-next-line no-new
    new SensingSDK('SDK', TYSdk, 'en');
  }

  render() {
    return <TYFlatList contentContainerStyle={{ paddingTop: 16 }} data={this.data} />;
  }
}
