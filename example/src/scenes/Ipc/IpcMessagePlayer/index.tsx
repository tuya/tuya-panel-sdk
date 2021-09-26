import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TYIpcMessagePlayer } from '@tuya/tuya-panel-ipc-sdk';

const IpcMessagePlayer: React.FC = () => {
  return (
    <View style={styles.TYIpcPlayerPage}>
      <TYIpcMessagePlayer />
    </View>
  );
};

const styles = StyleSheet.create({
  TYIpcPlayerPage: {
    flex: 1,
  },
});

export default IpcMessagePlayer;
