import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { TYText } from 'tuya-panel-kit';
import { TYIpcNative } from '@tuya/tuya-panel-ipc-sdk';

const IpcPlayerRnPageTest: React.FC = () => {
  useEffect(() => {
    return () => {
      TYIpcNative.backLivePlayWillUnmount();
    };
  }, []);

  return (
    <View style={styles.ipcPlayerRnPageTestPage}>
      <TYText text="预览播放界面跳转到Rn页面测试" />
    </View>
  );
};
const styles = StyleSheet.create({
  ipcPlayerRnPageTestPage: {
    flex: 1,
    paddingTop: 10,
  },
});

export default IpcPlayerRnPageTest;
