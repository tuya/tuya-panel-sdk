import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { TYText } from 'tuya-panel-kit';
import Res from '../res';
import Config from '../config';
import TYIpcPlayerManager from '../../ty-ipc-native';

const { cx } = Config;

export interface AudioOnlyModeProps {
  fullBackIconStyle: any;
  audioLoadText: string;
  isFullScreen: boolean;
  audioLoadParam: any;
}

export interface AudioOnlyModeState {}

const _defaultProps = {
  // 全屏Icon容器style
  fullBackIconStyle: {},
  // 返回图片style
  backImgStyle: {},
  showAnimation: true,
  loadText: '',
  showRetry: false,
  retryText: '',
};

class AudioOnlyMode extends React.Component<AudioOnlyModeProps, AudioOnlyModeState> {
  static defaultProps = _defaultProps;
  constructor(props: AudioOnlyModeProps) {
    super(props);
    this.state = {};
  }

  rotateV: number;

  exitFullScreen = () => {
    TYIpcPlayerManager.setScreenOrientation(0);
  };

  /*
   * 返回箭头
   */
  renderFullBackIcon = () => {
    const { audioLoadParam } = this.props;
    return (
      <TouchableOpacity
        style={[styles.backIconBox, audioLoadParam.fullBackIconContainer]}
        onPress={this.exitFullScreen}
        activeOpacity={0.7}
      >
        <Image
          source={audioLoadParam.fullBackImg ? audioLoadParam.fullBackImg : Res.backArrow}
          style={[styles.arrowIcon, audioLoadParam.fullBackImgStyle]}
        />
      </TouchableOpacity>
    );
  };

  renderAudioMode = () => {
    const { audioLoadText, audioLoadParam } = this.props;
    return (
      <View>
        <TYText style={[styles.audioTextStyle, audioLoadParam.audioTextStyle]}>
          {audioLoadText}
        </TYText>
      </View>
    );
  };

  render() {
    const { isFullScreen, audioLoadParam } = this.props;

    return (
      <View style={[styles.playerLoadPage, audioLoadParam.audioLoadContainer]}>
        {isFullScreen && this.renderFullBackIcon()}
        {this.renderAudioMode()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  arrowIcon: {
    resizeMode: 'contain',
    width: cx(32),
  },
  audioTextStyle: {
    color: '#fff',
    fontSize: cx(26),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  backIconBox: {
    left: cx(10),
    position: 'absolute',
    top: cx(18),
  },
  playerLoadPage: {
    alignItems: 'center',
    backgroundColor: '#000000',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
});

export default AudioOnlyMode;
