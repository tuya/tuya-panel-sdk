import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { TYSdk } from 'tuya-panel-kit';
import Res from './res';
import Styles from './style';
import { TYIpcMusicControlProps } from './interface';

const modeImgSource = {
  '0': Res.lullaby.lullabyCircleMode,
  '1': Res.lullaby.lullabySingleMode,
  '2': Res.lullaby.lullabyRandomMode,
};
const controlImgSource = {
  '0': Res.lullaby.lullabyPlay,
  '1': Res.lullaby.lullabyPause,
};

const TYIpcMusicControl: React.FunctionComponent<TYIpcMusicControlProps> = props => {
  const {
    containerStyle,
    ipcMusicControl,
    ipcMusicMode,
    pressList,
    pressControl,
    pressMode,
    pressPrev,
    pressNext,
    themeColor,
  } = props;
  const controlData = [
    {
      key: 'mode',
      imageSource: modeImgSource[ipcMusicMode],
    },
    { key: 'prev', imageSource: Res.lullaby.lullabyPrev },
    {
      key: 'control',
      imageSource: controlImgSource[ipcMusicControl],
    },
    { key: 'next', imageSource: Res.lullaby.lullabyNext },
    { key: 'list', imageSource: Res.lullaby.lullabyList },
  ];

  const pressControlBtn = key => {
    switch (key) {
      case 'list':
        pressList();
        break;
      case 'control':
        pressControl();
        break;
      case 'mode':
        pressMode();
        break;
      case 'prev':
        pressPrev();
        break;
      case 'next':
        pressNext();
        break;
      default:
        return false;
    }
    return '';
  };
  return (
    <View style={[Styles.musicControlPage, containerStyle]}>
      {controlData.map(item => (
        <TouchableOpacity
          activeOpacity={0.7}
          style={Styles.controlItemBox}
          key={item.key}
          onPress={() => pressControlBtn(item.key)}
        >
          <Image source={item.imageSource} style={{ tintColor: themeColor }} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

TYIpcMusicControl.defaultProps = {
  containerStyle: {},
  ipcMusicControl: '1',
  ipcMusicMode: '0',
  themeColor: 'red',
  pressList: () => {},
  pressControl: () => {
    if (TYSdk.device.getDpSchema('ipc_lullaby_control')) {
      const dpValue = TYSdk.device.getState('ipc_lullaby_control');
      TYSdk.native.putDpData({
        ipc_lullaby_control: dpValue === '0' ? '1' : '0',
      });
    }
  },
  pressMode: () => {
    if (TYSdk.device.getDpSchema('ipc_lullaby_mode')) {
      let sendValue = '0';
      const dpValues = TYSdk.device.getState('ipc_lullaby_mode');
      if (dpValues === '0') {
        sendValue = '1';
      } else if (dpValues === '1') {
        sendValue = '2';
      } else if (dpValues === '2') {
        sendValue = '0';
      }
      TYSdk.native.putDpData({
        ipc_lullaby_mode: sendValue,
      });
    }
  },
  pressPrev: () => {
    if (TYSdk.device.getDpSchema('ipc_lullaby_command')) {
      TYSdk.native.putDpData({
        ipc_lullaby_command: '1',
      });
    }
  },
  pressNext: () => {
    if (TYSdk.device.getDpSchema('ipc_lullaby_command')) {
      TYSdk.native.putDpData({
        ipc_lullaby_command: '0',
      });
    }
  },
};

export default TYIpcMusicControl;
