import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TYIpcMusicControl } from '@tuya/tuya-panel-ipc-sdk';

const IpcMusicControl: React.FC = () => {
  return (
    <View style={styles.TYIpcMusicPage}>
      <TYIpcMusicControl />
      <TYIpcMusicControl themeColor="#000" ipcMusicControl="0" />
    </View>
  );
};

const styles = StyleSheet.create({
  TYIpcMusicPage: {
    flex: 1,
  },
});

export default IpcMusicControl;
