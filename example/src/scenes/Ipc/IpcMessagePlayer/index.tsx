import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TYIpcMessagePlayer } from '@tuya/tuya-panel-ipc-sdk';

const IpcNativePlayer: React.FC = () => {
  return (
    <View style={styles.TYIpcPlayerPage}>
      <TYIpcMessagePlayer
        shareVideos={[
          'https://ty-cn-bizlock-1254153901.cos.ap-shanghai.myqcloud.com/4eb379-30857896-e1f3ad0e4b07d090/common/1626942614154_1626942614.mjpeg?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKID3rPghRGDF0lIZb4tABvQFq9C7kHirFvU%26q-sign-time%3D1626960303%3B1626963903%26q-key-time%3D1626960303%3B1626963903%26q-header-list%3D%26q-url-param-list%3D%26q-signature%3Ddb3d348b82d9108adbc55173ff7a9b2728a956e8@4urg4dmqqm9gpdv7',
        ]}
        mediaUrl="https://ty-cn-bizlock-1254153901.cos.ap-shanghai.myqcloud.com/4eb379-30857896-e1f3ad0e4b07d090/common/1626942614154_1626942614.mjpeg?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKID3rPghRGDF0lIZb4tABvQFq9C7kHirFvU%26q-sign-time%3D1626960303%3B1626963903%26q-key-time%3D1626960303%3B1626963903%26q-header-list%3D%26q-url-param-list%3D%26q-signature%3Ddb3d348b82d9108adbc55173ff7a9b2728a956e8@4urg4dmqqm9gpdv7"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  TYIpcPlayerPage: {
    flex: 1,
  },
});

export default IpcNativePlayer;
