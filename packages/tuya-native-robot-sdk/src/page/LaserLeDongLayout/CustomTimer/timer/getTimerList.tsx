import _sortBy from 'lodash/sortBy';
import React from 'react';
import { TYSdk, Utils } from '@tuya-rn/tuya-native-components';
import _isEmpty from 'lodash/isEmpty';
import _isNull from 'lodash/isNull';

import {
  dpCodesEnum,
  dpCodesValueEnum,
} from '../../../../map/LaserMap/LaserSweepMapLeDong/constant/dpCodes';
import appointed from '../../../../protocol/ledong/AppointedCleaning';

import { ITimerProps, IDpId, ITimerData } from './interface';
// @ts-ignore
import I18n from '../../../../i18n';
import { atHexToString } from '../../../../utils/StringsUtils';
import { awaitExpectDpsState } from '../../../../utils/FunctionUtils';
import { createDpValue$ } from '../../../../utils/RxUtils';
import muteProtocol from '../../../../protocol/ledong/muteProtocol';

import { ITimerDataSource } from './interface';

interface ITimerList {
  commonCmdCode: string;
  is12Hours: boolean;
}

export default class GetTimerList {
  commonCmdCode: string = dpCodesEnum.commRaw;
  is12Hours: boolean = true;

  subscriptionCommonCmd: any;
  subscriptionTimer: any;
  subscriptionMute: any;

  state: {
    dataSource: ITimerDataSource[];
  } = {
    dataSource: [],
  };

  constructor(
    props: ITimerList = {
      is12Hours: true,
      commonCmdCode: dpCodesEnum.commRaw,
    }
  ) {
    this.is12Hours = props.is12Hours;
    this.commonCmdCode = props.commonCmdCode;
  }

  createSubscribe() {
    const { commonCmdCode, is12Hours } = this;
    const subscriptionCommonCmd = createDpValue$(commonCmdCode, false).map((comm: string) => {
      // const test =
      //   '7b2264496e666f223a7b227473223a313539303230313033343333352c22757365724964223a2230227d2c2264617461223a7b2274696d655a6f6e65223a382c2276616c7565223a5b7b22616374697665223a747275652c22706572696f64223a5b332c345d2c227365676d656e74546167496473223a5b5d2c22737461727454696d65223a33373832322c22756e6c6f636b223a747275652c22776f726b4e6f697379223a227374726f6e67227d2c7b22616374697665223a747275652c22706572696f64223a5b5d2c227365676d656e74546167496473223a5b5d2c22737461727454657874223a2230383a313620504d222c22737461727454696d65223a313539303134393736342c22756e6c6f636b223a747275652c22776f726b4e6f697379223a226175746f227d2c7b22616374697665223a66616c73652c22656e6454657874223a2230333a303020504d222c22656e6454696d65223a35343030302c22706572696f64223a5b302c312c322c332c342c352c365d2c22737461727454657874223a2231313a303020414d222c22737461727454696d65223a33393630302c22756e6c6f636b223a66616c73657d5d7d2c22696e666f54797065223a32313030322c226d657373616765223a226f6b227d';
      const timer = comm ? appointed.decode(comm, is12Hours) : null;
      const mute = comm ? muteProtocol.decodeMuteValue(comm, is12Hours) : null;
      let rez = {};

      if (timer) {
        const curValue = timer.map(item => {
          const dpStrArr = [
            `${I18n.getDpLang(dpCodesEnum.cleanSwitch)}: ${I18n.getDpLang(
              dpCodesEnum.cleanSwitch,
              true
            )}`,
          ];
          if (item.workNoisy !== undefined) {
            dpStrArr.push(
              `${I18n.getLang('timer_fan')}: ${I18n.getLang(`timer_fan_${item.workNoisy}`)}`
            );
          }

          if (item.waterPump !== undefined) {
            dpStrArr.push(
              `${I18n.getLang('timer_water')}: ${I18n.getLang(`timer_water_${item.waterPump}`)}`
            );
          }

          if (item.cleanMode !== undefined) {
            dpStrArr.push(
              `${I18n.getLang('timer_cleanMode')}: ${I18n.getLang(
                `timer_cleanMode_${item.cleanMode}`
              )}`
            );
          }
          // 把周期时间转为时间戳(s)
          const timestamp =
            item.period && item.period.length
              ? Math.round(appointed.secondToDate(item.startTime).getTime() / 1000)
              : item.startTime;
          return {
            id: `${item.startTime} ${new Date().getTime()}`,
            formatTimeStr: item.startText,
            repeatStr: appointed.periodToLoop(item.period),
            dpStrArr: dpStrArr,
            rowOpen: false,
            switchValue: item.unlock,
            originalData: { ...item, timestamp },
          };
        });
        rez.timer = curValue;
      }

      if (mute) {
        rez.mute = mute;
      }

      return rez;
    });

    return subscriptionCommonCmd;
  }
  destroySubscribe() {
    // this.subscriptionCommonCmd && this.subscriptionCommonCmd.unsubscribe();
    // this.subscriptionMute && this.subscriptionMute.unsubscribe();
    // this.subscriptionTimer && this.subscriptionTimer.unsubscribe();
  }

  requestData() {
    TYSdk.device.putDeviceData({
      [dpCodesEnum.commRaw]: appointed.encodeRequest(),
      option: 0,
    });
  }

  getTimerList = async () => {
    this.requestData();

    const expectValue = [
      {
        dpCode: dpCodesEnum.commRaw,
        comparator: (value = '') => {
          const { infoType } = Utils.JsonUtils.parseJSON(atHexToString(value)) || {};
          if (infoType === 21002) return true;
          return false;
        },
      },
    ];

    const isExpect = await awaitExpectDpsState(expectValue);
  };

  putTimerList = async (cmd: string) => {
    TYSdk.device.putDeviceData({
      [dpCodesEnum.commRaw]: cmd,
      option: 0,
    });

    const expectValue = [
      {
        dpCode: dpCodesEnum.commRaw,
        comparator: (value = '') => {
          const { infoType } = Utils.JsonUtils.parseJSON(atHexToString(value)) || {};
          if (infoType === 21001 || infoType === 21002) return true;
          return false;
        },
      },
    ];

    const isExpect = await awaitExpectDpsState(expectValue);
    // await this.getTimerList();
  };
}
