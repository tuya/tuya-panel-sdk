import React, { useState } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { TYText } from 'tuya-panel-kit';
import { TYIpcPlayer } from '@tuya/tuya-panel-ipc-sdk';

const IpcPLayer: React.FC = () => {
  const [scaleMultiple, setScaleMultiple] = useState(-1);
  const onChangeStreamStatus = (status: number) => {
    console.log(status, 'sds');
  };

  const onChangeZoomStatus = (data: any) => {
    console.log(data, 'sds');
  };

  const onChangeActiveZoomStatus = (data: any) => {
    console.log(data, 'sdsds');
  };
  return (
    <ScrollView
      scrollEnabled
      contentContainerStyle={styles.TYIpcPlayerPage}
      showsVerticalScrollIndicator={false}
      alwaysBounceVertical={false}
    >
      <TYText style={styles.descTxt} text="Description: 视频播放" />
      <View style={styles.playerContainer}>
        <TYIpcPlayer
          onChangeZoomStatus={onChangeZoomStatus}
          // onChangeActiveZoomStatus={onChangeActiveZoomStatus}
          deviceOnline
          onChangeStreamStatus={onChangeStreamStatus}
          scaleMultiple={scaleMultiple}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  TYIpcPlayerPage: {
    paddingBottom: 50,
  },
  descTxt: {
    color: 'red',
    marginVertical: 10,
    paddingLeft: 15,
  },
  playerContainer: {
    backgroundColor: '#000000',
    flex: 1,
  },
});

export default IpcPLayer;
