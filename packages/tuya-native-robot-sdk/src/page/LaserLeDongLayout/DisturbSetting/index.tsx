import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { TYSdk, Utils, Popup } from '@tuya-rn/tuya-native-components';
import _isUndefined from 'lodash/isUndefined';
import _isEmpty from 'lodash/isEmpty';
import _isObject from 'lodash/isObject';

import SettingsSectionList from '../../../components/Basic/SettingsSectionList';
import appointed from '../../../protocol/ledong/AppointedCleaning';

import {createDpValue$} from '../../../utils/RxUtils';
import muteProtocol, { IMuteValue } from '../../../protocol/ledong/muteProtocol';
import I18n from '../../../i18n';

import { dpCodesEnum } from '../../../map/LaserMap/LaserSweepMapLeDong/constant/dpCodes';

interface IProps {
  disturbSwitchCode: string;
  commonCmdCode: string;
  is12Hours: boolean;
}

interface IState {
  mute: IMuteValue;
}

export default class DisturbSetting extends Component<IProps, IState> {
  static defaultProps = {
    disturbSwitchCode: dpCodesEnum.disturbSwitch,
    commonCmdCode: dpCodesEnum.commRaw,
    is12Hours: false,
  };

  subscriptionCommonCmd: any;

  state = {
    mute: {
      ...muteProtocol.initMute(this.props.is12Hours),
    },
    timer: [],
  };

  componentDidMount() {
    this.createSubscribe();
    this.requestData();
  }

  componentWillUnmount() {
    this.removeSubscribe();
  }

  get sections() {
    const { mute } = this.state;
    const { is12Hours } = this.props;

    const data = [
      {
        title: '',
        data: [
          {
            key: 'disturbSwitch',
            title: I18n.getDpLang(this.props.disturbSwitchCode),
            value: mute.unlock,
            arrow: false,
            onValueChange: (value: boolean) => {
              this.putData({
                unlock: value,
              });
            },
          },
          {
            key: 'startTime',
            title: I18n.getLang('startTime'),
            value: mute.startText,
            onPress: () => {
              Popup.datePicker({
                title: I18n.getLang('startTime'),
                cancelText: I18n.getLang('cancel'),
                confirmText: I18n.getLang('confirm'),
                defaultDate: muteProtocol.secondToDate(mute.startTime),
                mode: 'time',
                use12Hours: is12Hours,
                onConfirm: (date: Date) => {
                  this.checkStartTime(date).then(() => {
                    this.putData({
                      startTime: muteProtocol.DateToSecond(date),
                      unlock: true,
                    });
                    Popup.close();
                  });
                },
              });
            },
          },
          {
            key: 'endTime',
            title: I18n.getLang('endTime'),
            value: mute.endText,
            onPress: () => {
              Popup.datePicker({
                title: I18n.getLang('endTime'),
                defaultDate: muteProtocol.secondToDate(mute.endTime),
                mode: 'time',
                use12Hours: is12Hours,
                cancelText: I18n.getLang('cancel'),
                confirmText: I18n.getLang('confirm'),
                onConfirm: (date: Date) => {
                  this.checkEndTime(date).then(() => {
                    this.putData({
                      endTime: muteProtocol.DateToSecond(date),
                      unlock: true,
                    });
                    Popup.close();
                  });
                },
              });
            },
          },
        ],
      },
    ];

    return data;
  }

  createSubscribe() {
    const { commonCmdCode, is12Hours } = this.props;
    this.subscriptionCommonCmd = createDpValue$(commonCmdCode, false).subscribe(
      (comm: string) => {
        // 测试数据
        // const commtst = '{"dInfo":{"ts":1589789710231,"userId":"0"},"data":{"timeZone":8,"timeZoneSec":28800,"value":[]},"infoType":21002,"message":"ok"}'
        // const commtst = '7b2264496e666f223a7b227473223a313538393738393731303233312c22757365724964223a2230227d2c2264617461223a7b2274696d655a6f6e65223a382c2274696d655a6f6e65536563223a32383830302c2276616c7565223a5b5d7d2c22696e666f54797065223a32313030322c226d657373616765223a226f6b227d';
        const mute = comm ? muteProtocol.decodeMuteValue(comm, is12Hours) : null;
        const timer = comm ? appointed.decode(comm, is12Hours) : null;
        if (timer) {
          // 如果存在预约时间，需要保留
          this.setState({ timer });
        }
        // if (_isEmpty(mute) && _isObject(mute)) {
        //   // 如果上报预约清扫却解不出值，代表无，需要设置默认时间
        //   const { startTime, endTime } = this.state.mute;
        //   this.putData({
        //     startTime,
        //     endTime,
        //     unlock: true,
        //   });
        //   return;
        // }
        if (mute && !_isEmpty(mute)) {
          this.setState({
            mute,
          });
          return;
        }
      }
    );
  }

  removeSubscribe() {
    this.subscriptionCommonCmd && this.subscriptionCommonCmd.unsubscribe();
  }

  checkEndTime(date: Date) {
    return new Promise((resolve, reject) => {
      const second = muteProtocol.DateToSecond(date);
      if (second === this.state.mute.startTime) {
        Popup.close();
        TYSdk.mobile.simpleTipDialog(I18n.getLang('noStartTimeEqualEndTime'), () => {
          reject();
        });
      } else resolve();
    });
  }

  checkStartTime(date: Date) {
    return new Promise((resolve, reject) => {
      const second = muteProtocol.DateToSecond(date);
      if (second === this.state.mute.endTime) {
        Popup.close();
        TYSdk.mobile.simpleTipDialog(I18n.getLang('noStartTimeEqualEndTime'), () => {
          reject();
        });
      } else resolve();
    });
  }

  requestData() {
    TYSdk.device.putDeviceData({
      [this.props.commonCmdCode]: muteProtocol.encodeRequestMute(),
      option: 0,
    });
  }

  putData = (params: { startTime?: number; endTime?: number; unlock?: boolean }) => {
    const { mute, timer } = this.state;
    const { startTime, endTime, unlock } = params;
    const commonData = muteProtocol.encodeMuteValue({
      startTime: _isUndefined(startTime) ? mute.startTime : startTime,
      endTime: _isUndefined(endTime) ? mute.endTime : endTime,
      unlock: _isUndefined(unlock) ? mute.unlock : unlock,
      extendsData: timer
    });

    TYSdk.device.putDeviceData({
      [this.props.commonCmdCode]: commonData,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <SettingsSectionList sections={this.sections} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(248,248,248)',
  },
});
