import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TYIpcMessagePlayer } from '@tuya/tuya-panel-ipc-sdk';

const IpcNativePlayer: React.FC = () => {
  return (
    <View style={styles.TYIpcPlayerPage}>
      <TYIpcMessagePlayer shareVideos={[]} mediaUrl="" />
    </View>
  );
};

const styles = StyleSheet.create({
  TYIpcPlayerPage: {
    flex: 1,
  },
});

export default IpcNativePlayer;
