import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TYText } from 'tuya-panel-kit';
import { TYIpcVideoBit } from '@tuya/tuya-panel-ipc-sdk';

const IpcVideoBit: React.FC = () => {
  const NormalTopRight = () => {
    return (
      <TYIpcVideoBit
        bitValue="20"
        unit="m/s"
        unitStyle={{ color: 'black' }}
        containerStyle={{ position: 'absolute', left: 20, top: 50 }}
      />
    );
  };
  const NormalTopRight1 = () => {
    return (
      <TYIpcVideoBit
        bitValue="30"
        valueStyle={{ color: 'black' }}
        containerStyle={{ position: 'absolute', left: 20, top: 90 }}
      />
    );
  };

  const NormalTopRight2 = () => {
    return (
      <TYIpcVideoBit
        bitValue="60"
        valueStyle={{ color: 'red' }}
        containerStyle={{ position: 'absolute', left: 20, top: 130 }}
      />
    );
  };

  const NormalTopRight3 = () => {
    return (
      <TYIpcVideoBit
        bitValue="60"
        valueStyle={{ fontSize: 24 }}
        bitTxtBoxStyle={{ width: 100, height: 30 }}
        containerStyle={{ position: 'absolute', left: 20, top: 170 }}
      />
    );
  };

  const NormalTopRight4 = () => {
    return (
      <TYIpcVideoBit
        bitValue="90"
        valueStyle={{ fontSize: 24, color: 'black' }}
        bitTxtBoxStyle={{ width: 100, height: 30 }}
        containerStyle={{ position: 'absolute', left: 20, top: 210 }}
      />
    );
  };

  const NormalTopRight5 = () => {
    return (
      <TYIpcVideoBit
        bitValue="110"
        valueStyle={{ fontSize: 24, color: 'white' }}
        bitTxtBoxStyle={{ width: 100, height: 30 }}
        containerStyle={{ position: 'absolute', left: 20, top: 250 }}
      />
    );
  };

  return (
    <View style={styles.TYIpcPlayerPage}>
      <TYText style={styles.descTxt} text="Description: videoBit" />
      <NormalTopRight />
      <NormalTopRight1 />
      <NormalTopRight2 />
      <NormalTopRight3 />
      <NormalTopRight4 />
      <NormalTopRight5 />
    </View>
  );
};

const styles = StyleSheet.create({
  TYIpcPlayerPage: {
    flex: 1,
  },
  descTxt: {
    color: 'black',
    marginVertical: 10,
    paddingLeft: 15,
  },
});

export default IpcVideoBit;
