import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { TYSdk, Utils } from '@tuya-rn/tuya-native-components';
import _isBoolean from 'lodash/isBoolean';
import _floor from 'lodash/floor';
import _isUndefined from 'lodash/isUndefined';

import SettingsSectionList from '../../Basic/SettingsSectionList';
import { createDpValue$ } from '../../../utils/RxUtils';
import I18n from '../../../i18n';
import Api from '../../../api';

import resource from './res';

const { convertY: convert, width, height } = Utils.RatioUtils;

export interface ICodeConfig {
  code: string;
  resetCode: string;
  maxValue: number;
  reverse: boolean; // 值是否是相反的，默认为剩余时间
}

interface IProps {
  sideBrushTime: ICodeConfig;
  mainBrushTime: ICodeConfig;
  filterTime: ICodeConfig;
  mopTime: ICodeConfig;
}

export default class ConsumableLife extends Component<IProps> {
  static defaultProps = {
    sideBrushTime: {
      code: '',
      resetCode: '',
      maxValue: 150,
      reverse: true,
    },
    filterTime: {
      code: '',
      resetCode: '',
      maxValue: 150,
      reverse: true,
    },
    mopTime: {
      code: '',
      resetCode: '',
      maxValue: 150,
      reverse: true,
    },
    mainBrushTime: {
      code: '',
      resetCode: '',
      maxValue: 300,
      reverse: true,
    },
  };

  subscriptionSideBrushTime: any;
  subscriptionMainBrushTime: any;
  subscriptionFilterTime: any;
  subscriptionMopTime: any;

  constructor(props: IProps) {
    super(props);
    const {
      sideBrushTime: { code: sideBrushTimeCode },
      mainBrushTime: { code: mainBrushTimeCode },
      filterTime: { code: filterTimeCode },
      mopTime: { code: mopTimeCode },
    } = this.props;
    this.state = {
      [sideBrushTimeCode]: 0,
      [mainBrushTimeCode]: 0,
      [filterTimeCode]: 0,
      [mopTimeCode]: 0,
    };
  }

  componentDidMount() {
    this.createSubscribe();
    // this.getBrushValue();
  }

  createSubscribe() {
    const {
      sideBrushTime: { code: sideBrushTimeCode },
      mainBrushTime: { code: mainBrushTimeCode },
      filterTime: { code: filterTimeCode },
      mopTime: { code: mopTimeCode },
    } = this.props;

    const [sideBrushTime, mainBrushTime, filterTime, mopTime] = [
      sideBrushTimeCode,
      mainBrushTimeCode,
      filterTimeCode,
      mopTimeCode,
    ].map(code => createDpValue$(code).distinctUntilChanged());

    const setData = (code: string, value: any) => {
      this.setState({
        [code]: value,
      });
    };

    this.subscriptionSideBrushTime = sideBrushTime.subscribe((value: number) => {
      setData(sideBrushTimeCode, value);
    });
    this.subscriptionMainBrushTime = mainBrushTime.subscribe((value: number) => {
      setData(mainBrushTimeCode, value);
    });
    this.subscriptionFilterTime = filterTime.subscribe((value: number) => {
      setData(filterTimeCode, value);
    });
    this.subscriptionMopTime = mopTime.subscribe((value: number) => {
      setData(mopTimeCode, value);
    });
  }

  removeSubscribe() {
    this.subscriptionSideBrushTime && this.subscriptionSideBrushTime.unsubscribe();
    this.subscriptionMainBrushTime && this.subscriptionMainBrushTime.unsubscribe();
    this.subscriptionFilterTime && this.subscriptionFilterTime.unsubscribe();
    this.subscriptionMopTime && this.subscriptionMopTime.unsubscribe();
  }

  onConfirmDialogPress = (code: string, data: any) => {
    if (!TYSdk.device.checkDpExist(code)) return;
    return new Promise((resolve, reject) => {
      Api.simpleConfirmDialog(
        I18n.getDpLang(code),
        // I18n.getDpLang(code, data),
        '',
        () => {
          TYSdk.device.putDeviceData({
            [code]: data,
          });
          resolve();
        },
        () => {
          reject();
        }
      );
    });
  };

  getLifePercentage = (key: string) => {
    const keysValue = this.props[key];
    if (!keysValue) return;

    const { code, resetCode, maxValue, reverse = true } = keysValue;
    const value = this.state[code];
    if (_isUndefined(value)) return '';

    const { max = 100 } = TYSdk.device.getDpSchema(code) || {};

    if (reverse) {
      return `${_floor(((max - value) / max) * 100)}%`;
    }
    return `${_floor((value / max) * 100)}%`;
  };

  getLifeTime = (key: string) => {
    const keysValue = this.props[key];
    if (!keysValue) return;

    const { code, maxValue, reverse = true } = keysValue;
    const value = this.state[code];
    if (_isUndefined(value)) return '';
    const { max = 100 } = TYSdk.device.getDpSchema(code) || {};

    if (reverse) {
      return `${_floor(((max - value) / max) * maxValue)} ${I18n.getLang('hour')}`;
    }
    return `${_floor((value / max) * maxValue)} ${I18n.getLang('hour')}`;
  };

  get list() {
    const {
      sideBrushTime: { code: sideBrushTimeCode, resetCode: sideBrushTimeResetCode },
      mainBrushTime: { code: mainBrushTimeCode, resetCode: mainBrushTimeResetCode },
      filterTime: { code: filterTimeCode, resetCode: filterTimeResetCode },
      mopTime: { code: mopTimeCode, resetCode: mopTimeResetCode },
    } = this.props;
    return [
      {
        // title: '',
        data: [
          {
            key: filterTimeCode,
            dpCode: filterTimeCode,
            Icon: resource.filter,
            imageFollowIconColor: false,
            iconSize: convert(58),
            title: `${I18n.getDpLang(filterTimeCode)} ${this.getLifePercentage('filterTime')}`,
            subTitle: `${I18n.getLang('RemainingLife')} ${this.getLifeTime('filterTime')}`,
            onPress: () => {
              this.onConfirmDialogPress(filterTimeResetCode, true);
            },
          },
          {
            key: sideBrushTimeCode,
            dpCode: sideBrushTimeCode,
            Icon: resource.side,
            imageFollowIconColor: false,
            iconSize: convert(58),
            title: `${I18n.getDpLang(sideBrushTimeCode)} ${this.getLifePercentage(
              'sideBrushTime'
            )}`,
            subTitle: `${I18n.getLang('RemainingLife')} ${this.getLifeTime('sideBrushTime')}`,
            onPress: () => {
              this.onConfirmDialogPress(sideBrushTimeResetCode, true);
            },
          },
          {
            key: mainBrushTimeCode,
            dpCode: mainBrushTimeCode,
            Icon: resource.main,
            imageFollowIconColor: false,
            iconSize: convert(58),
            title: `${I18n.getDpLang(mainBrushTimeCode)} ${this.getLifePercentage(
              'mainBrushTime'
            )}`,
            subTitle: `${I18n.getLang('RemainingLife')} ${this.getLifeTime('mainBrushTime')}`,
            onPress: () => {
              this.onConfirmDialogPress(mainBrushTimeResetCode, true);
            },
          },
          {
            key: mopTimeCode,
            dpCode: mopTimeCode,
            Icon: resource.mop_material,
            imageFollowIconColor: false,
            iconSize: convert(58),
            title: `${I18n.getDpLang(mopTimeCode)} ${this.getLifePercentage('mopTime')}`,
            subTitle: `${I18n.getLang('RemainingLife')} ${this.getLifeTime('mopTime')}`,
            onPress: () => {
              this.onConfirmDialogPress(mopTimeResetCode, true);
            },
          },
        ].map(item => {
          return {
            ...item,
            styles: {
              container: { height: convert(80) },
            },
          };
        }),
      },
    ];
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.list}>
          <SettingsSectionList sections={this.list} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(248,248,248)',
    paddingTop: convert(10),
  },

  list: {
    height: height - convert(130),
  },

  listContainer: {
    height: convert(60),
    paddingVertical: convert(10),
  },

  title: {
    fontSize: convert(14),
  },

  subTitle: {
    marginTop: convert(5),
  },

  button: {
    width: width - convert(40),
    height: convert(40),
    borderRadius: convert(20),
    backgroundColor: '#1F2D3C',
  },

  buttonText: {
    fontSize: convert(12),
    color: '#fff',
  },
});
