import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TYText } from 'tuya-panel-kit';
import { TYIpcPtz } from '@tuya/tuya-panel-ipc-sdk';

const IpcPtz: React.FC = () => {
  const NormalTopRight = () => {
    return <TYIpcPtz themeType="light" containerStyle={{ position: 'absolute', top: 50 }} />;
  };
  const NormalTopRight1 = () => {
    return <TYIpcPtz themeType="dark" containerStyle={{ position: 'absolute', top: 60 }} />;
  };

  return (
    <View style={styles.TYIpcPlayerPage}>
      <TYText style={styles.descLight} text="主题: 浅色" />
      <NormalTopRight />
      <TYText style={styles.descDark} text="主题: 深色" />
      <NormalTopRight1 />
    </View>
  );
};

const styles = StyleSheet.create({
  TYIpcPlayerPage: {
    flex: 1,
  },
  descDark: {
    color: 'red',
    marginVertical: 10,
    paddingLeft: 15,
  },
  descLight: {
    color: 'red',
    marginVertical: 10,
    paddingLeft: 15,
  },
});

export default IpcPtz;
