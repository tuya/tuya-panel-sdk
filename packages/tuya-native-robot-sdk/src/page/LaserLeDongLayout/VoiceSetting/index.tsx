import React, { PureComponent } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TYSdk } from '@tuya-rn/tuya-native-components';

import SettingsSectionList from '../../../components/Basic/SettingsSectionList';
import { dpCodesEnum } from '../../../map/LaserMap/LaserSweepMapLeDong/constant/dpCodes';
import panelMapConfig, {
  ILaserMapPanelConfig,
} from '../../../map/LaserMap/LaserSweepMapLeDong/constant/panelMapConfig';
import I18n from '../../../i18n';

import Volume from './Volume';
import VoiceList from './VoiceList';

interface IProps {
  volumeCode: string;
  voiceTypeCode: string;
  voiceLinkCode: string;
  config?: ILaserMapPanelConfig['voice'];
  hideArrow?: boolean;
  LoadingElement?: () => React.ReactElement;
  SelectElement?: () => React.ReactElement;
  UnSelectElement?: () => React.ReactElement;
}

export default class VoiceSetting extends PureComponent<IProps> {
  static defaultProps = {
    volumeCode: dpCodesEnum.volume,
    voiceTypeCode: dpCodesEnum.voiceType,
    voiceLinkCode: dpCodesEnum.voiceLink,
    config: null,
  };

  get sections() {
    return [
      {
        visible: TYSdk.device.checkDpExist(this.props.volumeCode),
        data: [
          {
            renderItem: () => {
              return <Volume volumeCode={this.props.volumeCode} />;
            },
          },
        ],
      },
      {
        title: I18n.getDpLang(this.props.voiceTypeCode),
        visible: TYSdk.device.checkDpExist(this.props.voiceTypeCode),
        data: [
          {
            renderItem: () => {
              return (
                <VoiceList
                  voiceTypeCode={this.props.voiceTypeCode}
                  voiceLinkCode={this.props.voiceLinkCode}
                  config={this.props.config}
                  LoadingElement={this.props.LoadingElement}
                  SelectElement={this.props.SelectElement}
                  UnSelectElement={this.props.UnSelectElement}
                  hideArrow={this.props.hideArrow}
                />
              );
            },
          },
        ],
      },
    ];
  }
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
