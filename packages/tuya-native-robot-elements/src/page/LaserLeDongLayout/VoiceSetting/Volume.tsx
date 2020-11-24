import React, { Component } from 'react';
import { TYSdk, TYSectionList } from '@tuya-rn/tuya-native-components';

import _debounce from 'lodash/debounce';

import { createDpValue$ } from '../../../utils/RxUtils';
import SettingsSectionList from '../../../components/Basic/SettingsSectionList';
import { dpCodesEnum } from '../../../map/LaserMap/LaserSweepMapLeDong/constant/dpCodes';

import I18n from '../../../i18n';

interface IProps {
  volumeCode: string;
}

interface IState {
  volume: number;
}

export default class voicetypeSetting extends Component<IProps, IState> {
  static defaultProps = {
    volumeCode: dpCodesEnum.volume,
  };

  state = {
    volume: 0,
  };

  subscriptionVolume: any;

  componentDidMount() {
    this.createSubscribe();
  }

  createSubscribe() {
    const { volumeCode } = this.props;
    this.subscriptionVolume = createDpValue$(volumeCode).subscribe((value: number) => {
      this.setState({
        volume: value,
      });
    });
  }

  removeSubscribe() {
    this.subscriptionVolume && this.subscriptionVolume.unsubscribe();
  }

  get sections() {
    const { volume } = this.state;
    const { volumeCode } = this.props;
    const { step: volumeStep = 1, max: volumeMax = 10, min: volumeMin = 0 } =
      TYSdk.device.getDpSchema(volumeCode) || {};
    return [
      {
        title: I18n.getDpLang(volumeCode),
        visible: !!TYSdk.device.checkDpExist(volumeCode),
        data: [
          {
            key: volumeCode,
            dpCode: volumeCode,
            value: volume,
            arrow: false,
            canTouchTrack: true,
            actionType: 'iconfont',
            Icon: 'volume-sharp-off',
            Action: 'volume-sharp-max',
            stepValue: volumeStep,
            minimumValue: volumeMin,
            maximumValue: volumeMax,
            onSlidingComplete: (value: number) => {
              this.putData(value);
            },
            renderItem: ({ item }) => {
              return <TYSectionList.SliderItem {...item} />;
            },
          },
        ],
      },
    ];
  }

  putData = _debounce(value => {
    const { volumeCode } = this.props;
    TYSdk.device.putDeviceData({ [volumeCode]: value });
  }, 10);

  render() {
    return <SettingsSectionList sections={this.sections} />;
  }
}
