import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { TYSdk, TYFlatList, IconFont } from '@tuya-rn/tuya-native-components';

import { stringToAtHex, atHexToString } from '../../../utils/StringsUtils';
import { awaitExpectDpsState } from '../../../utils/FunctionUtils';
import panelMapConfig, {
  ILaserMapPanelConfig,
} from '../../../map/LaserMap/LaserSweepMapLeDong/constant/panelMapConfig';
import { createDpValue$ } from '../../../utils/RxUtils';
import Toast from '../../../components/Display/Toast';
import I18n from '../../../i18n';
import { dpCodesEnum } from '../../../map/LaserMap/LaserSweepMapLeDong/constant/dpCodes';
import voice from '../../../protocol/ledong/voice';

interface IProps {
  voiceTypeCode: string;
  voiceLinkCode: string;
  route: string;
  hideArrow: boolean;
  config?: ILaserMapPanelConfig['voice'];
  LoadingElement?: () => React.ReactElement;
  SelectElement?: () => React.ReactElement;
  UnSelectElement?: () => React.ReactElement;
}

interface IState {
  voiceType: string;
  voiceLink: string;
  voiceItem: string; // 选中的进程中选项需要本地存一下
  loading: boolean; // 是否在下载
  // inPage: boolean; // 是否在当前页
}

const LoadingElement = () => <ActivityIndicator size="small" color="#333" />;
const SelectElement = () => <IconFont name="selected" color="#333" size={20} />;

export default class voicetypeSetting extends Component<IProps, IState> {
  static defaultProps = {
    voiceTypeCode: dpCodesEnum.voiceType,
    voiceLinkCode: dpCodesEnum.voiceLink,
    hideArrow: false,
    LoadingElement,
    SelectElement,
    UnSelectElement: null,
  };
  state = {
    voiceType: '',
    voiceLink: '',
    voiceItem: '0', // 选中的进程中选项需要本地存一下
    loading: false,
  };

  componentDidMount() {
    this.createSubscribe();
  }

  subscriptionVoiceType: any;
  subscriptionVoiceLink: any;

  createSubscribe() {
    const { voiceTypeCode, voiceLinkCode } = this.props;
    const voiceLinkCodeSubscript = createDpValue$(voiceLinkCode);
    this.subscriptionVoiceType = createDpValue$(voiceTypeCode).subscribe(
      (value: string) => {
        if (value) {
          this.setState({
            voiceType: value,
          });
        }
      }
    );
    this.subscriptionVoiceLink = voiceLinkCodeSubscript.skip(1).subscribe((value: string) => {
      if (value) {
        this.setState({
          voiceLink: value,
        });
      }
    });
    voiceLinkCodeSubscript.take(1).subscribe((value: string) => {
      // 第一次数据看看是不是在加载中
      if (value) {
        const { isSuccess, isFail, isProcessing, process, id } = voice.decode(value);
        if (isProcessing) {
          this.setState({
            voiceItem: id,
            loading: true,
            voiceLink: value,
          });
          this.awaitValue();
        } else {
          this.setState({
            voiceLink: value,
          });
        }
      }
    });
  }

  removeSubscribe() {
    this.subscriptionVoiceType && this.subscriptionVoiceType.unsubscribe();
    this.subscriptionVoiceLink && this.subscriptionVoiceLink.unsubscribe();
  }

  awaitValue = () => {
    const { voiceLinkCode, voiceTypeCode } = this.props;

    const expectValue = [
      {
        dpCode: voiceTypeCode,
        comparator: (value = '') => {
          return true;
        },
      },
      {
        dpCode: voiceLinkCode,
        comparator: (value = '') => {
          const { isSuccess, isFail, isProcessing, process, id } = voice.decode(value);
          // console.warn({
          //   isSuccess, isFail, isProcessing, process, id
          // });

          if (isFail || isSuccess) return true;
          return false;
        },
      },
    ];

    awaitExpectDpsState(expectValue).then(rez => {
      // 后续可以做失败提示
      this.setState({
        loading: false,
      });
    });
  };

  onChange = (value: string, voiceUri?: string) => {
    const { voiceType } = this.state;
    const { voiceLinkCode, voiceTypeCode } = this.props;
    if (voiceType === value) return;

    this.setState({
      voiceItem: value,
      loading: true,
    });

    if (voiceUri) {
      // 面板新配置
      const commData = voice.encodeDataByUrl(value, voiceUri);
      if (!commData) {
        Toast.debounceInfo(I18n.getLang('voiceCommDataInVail'));
        this.setState({
          loading: false,
        });
        return;
      }

      TYSdk.device.putDeviceData({
        [voiceLinkCode]: stringToAtHex(JSON.stringify(commData)),
      });
    } else {
      // dp配置
      const commData = voice.encodeData(value);
      if (!commData) {
        Toast.debounceInfo(I18n.getLang('voiceCommDataInVail')); 
        this.setState({
          loading: false,
        });
        return;
      }

      TYSdk.device.putDeviceData({
        [voiceLinkCode]: stringToAtHex(JSON.stringify(commData)),
      });
    }

    this.awaitValue();
  };

  getSettings = () => {
    const {
      voiceTypeCode,
      config,
      SelectElement,
      UnSelectElement,
      LoadingElement,
      hideArrow,
    } = this.props;
    const { voiceLink, voiceType, voiceItem, loading } = this.state;

    const { isSuccess, isFail, isProcessing, process, id } = voice.decode(voiceLink) || {};
    const { range: voicetypeList = [] } = TYSdk.device.getDpSchema(voiceTypeCode) || {};

    const data = [
      ...voicetypeList.map((value: string) => {
        const voiceConf = config?.[value] ? config[value] : {};
        const btnBase = {
          key: value,
          title: I18n.getDpLang(voiceTypeCode, value),
          arrow: !hideArrow,
          onPress: () => this.onChange(value, voiceConf.voiceUri),
        };

        if (voiceConf.iconUri) {
          btnBase.Icon = { uri: voiceConf.iconUri };
          btnBase.imageFollowIconColor = false;
          btnBase.iconSize = 64;
        }

        if (UnSelectElement) {
          // 如果有未选择状态按钮
          btnBase.Action = UnSelectElement;
        }

        if (loading && value === voiceItem) {
          // 在下载中
          btnBase.Action = LoadingElement;
          btnBase.arrow = false;
          return btnBase;
        }
        if (loading && value !== voiceItem) {
          // 不在下载的要禁用
          btnBase.disabled = true;
          return btnBase;
        }

        if (isFail && !loading && value === id) {
          // 下载失败
          btnBase.value = `${I18n.getLang('voiceUpdateFail')}`;
          return btnBase;
        }

        if (value === voiceType) {
          // 选定
          btnBase.Action = SelectElement;
          btnBase.arrow = false;

          return btnBase;
        }

        // 正常情况
        return btnBase;
      }),
    ];
    return data;
  };

  render() {
    const btnList = this.getSettings();

    return <TYFlatList data={btnList} />;
  }
}
