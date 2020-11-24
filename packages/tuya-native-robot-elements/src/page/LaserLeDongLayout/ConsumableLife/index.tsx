import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { TYSdk, Button, Utils, TYFlatList } from '@tuya-rn/tuya-native-components';
import _isBoolean from 'lodash/isBoolean';
import _floor from 'lodash/floor';
import _isUndefined from 'lodash/isUndefined'

import SettingsSectionList from '../../../components/Basic/SettingsSectionList';
import {createDpValue$} from '../../../utils/RxUtils';
import { dpCodesEnum, dpCodesValueEnum } from '../../../map/LaserMap/LaserSweepMapLeDong/constant/dpCodes';
import I18n from '../../../i18n';
import Api from '../../../api';

import resource from './res';

const { convertY: convert, width, height } = Utils.RatioUtils;

interface IProps {
  sideBrushTimeCode: string; // 边刷
  mainBrushTimeCode: string; // 滚刷（主刷）
  filterTimeCode: string; // 滤网
  materialResetCode: string; // 重置
  materialResetEnum: { getTime: string; side: string; main: string; filter: string };
}

export default class ConsumableLife extends Component<IProps> {
  static defaultProps = {
    sideBrushTimeCode: dpCodesEnum.sideBrushTime, // 边刷
    mainBrushTimeCode: dpCodesEnum.mainBrushTime, // 滚刷（主刷）
    filterTimeCode: dpCodesEnum.filterTime, // 滤网
    materialResetCode: dpCodesEnum.materialReset, // 重置
    materialResetEnum: dpCodesValueEnum.materialReset,
  };

  subscriptionSideBrushTime: any;
  subscriptionMainBrushTime: any;
  subscriptionFilterTime: any;
  subscriptionMaterialReset: any;

  constructor(props: IProps) {
    super(props);
    const { sideBrushTimeCode, mainBrushTimeCode, filterTimeCode } = props;
    this.state = {
      [sideBrushTimeCode]: 0,
      [mainBrushTimeCode]: 0,
      [filterTimeCode]: 0,
    };
  }

  componentDidMount() {
    this.createSubscribe();
    this.getBrushValue();
  }

  createSubscribe() {
    const { sideBrushTimeCode, mainBrushTimeCode, filterTimeCode, materialResetCode } = this.props;
    const [sideBrushTime, mainBrushTime, filterTime, materialReset] = [
      sideBrushTimeCode,
      mainBrushTimeCode,
      filterTimeCode,
      materialResetCode,
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
    // this.subscriptionMaterialReset = materialReset.subscribe((value: number) => {
    //   setData(materialResetCode, value);
    // });
  }

  removeSubscribe() {
    // this.subscriptionVolume && this.subscriptionVolume.unsubscribe();
  }

  onConfirmDialogPress = (code: string, data: string) => {
    return new Promise((resolve, reject) => {
      Api.simpleConfirmDialog(
        I18n.getDpLang(code),
        I18n.getDpLang(code, data),
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

  getBrushValue = () => {
    const { materialResetCode, materialResetEnum } = this.props;
    TYSdk.device.putDeviceData({
      [materialResetCode]: materialResetEnum.getTime,
      option: 0,
    });
  };

  getLifePercentage = (code: string) => {
    const value = this.state[code];
    if (_isUndefined(value)) return '';
    const { max = 2147483647 } = TYSdk.device.getDpSchema(code) || {};
    return `${_floor(((max - value) / max) * 100)}%`;
  };

  getLifeTime = (code: string) => {
    const value = this.state[code];
    if (_isUndefined(value)) return '';
    const { max = 2147483647 } = TYSdk.device.getDpSchema(code) || {};
    return `${_floor((max - value) / 60 / 60)} ${I18n.getLang('hour')}`;
  };

  get list() {
    const {
      sideBrushTimeCode,
      mainBrushTimeCode,
      filterTimeCode,
      materialResetCode,
      materialResetEnum,
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
            title: `${I18n.getDpLang(filterTimeCode)} ${this.getLifePercentage(filterTimeCode)}`,
            subTitle: `${I18n.getLang('RemainingLife')} ${this.getLifeTime(filterTimeCode)}`,
            onPress: () => {
              this.onConfirmDialogPress(materialResetCode, materialResetEnum.filter).then(() => {
                this.getBrushValue();
              });
            },
          },
          {
            key: sideBrushTimeCode,
            dpCode: sideBrushTimeCode,
            Icon: resource.side,
            imageFollowIconColor: false,
            iconSize: convert(58),
            title: `${I18n.getDpLang(sideBrushTimeCode)} ${this.getLifePercentage(
              sideBrushTimeCode
            )}`,
            subTitle: `${I18n.getLang('RemainingLife')} ${this.getLifeTime(sideBrushTimeCode)}`,
            onPress: () => {
              this.onConfirmDialogPress(materialResetCode, materialResetEnum.side).then(() => {
                this.getBrushValue();
              });
            },
          },
          {
            key: mainBrushTimeCode,
            dpCode: mainBrushTimeCode,
            Icon: resource.main,
            imageFollowIconColor: false,
            iconSize: convert(58),
            title: `${I18n.getDpLang(mainBrushTimeCode)} ${this.getLifePercentage(
              mainBrushTimeCode
            )}`,
            subTitle: `${I18n.getLang('RemainingLife')} ${this.getLifeTime(mainBrushTimeCode)}`,
            onPress: () => {
              this.onConfirmDialogPress(materialResetCode, materialResetEnum.main).then(() => {
                this.getBrushValue();
              });
            },
          },
        ],
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
