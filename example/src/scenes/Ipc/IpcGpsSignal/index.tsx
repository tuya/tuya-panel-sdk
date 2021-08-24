import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { TYText } from 'tuya-panel-kit';
import { TYIpcGpsSignal } from '@tuya/tuya-panel-ipc-sdk';

const IpcGpsSignal: React.FC = () => {
  const isEnglish = true;
  return (
    <ScrollView
      scrollEnabled
      contentContainerStyle={styles.IpcGpsSignalPage}
      showsVerticalScrollIndicator={false}
      alwaysBounceVertical={false}
    >
      <TYText style={styles.descTxt} text={isEnglish ? 'Custom mode' : '默认样式'} />
      <TYIpcGpsSignal containerStyle={{ marginLeft: 50 }} gpsSignal={0} lteSignal={50} />
      <TYText style={styles.descTxt} text={isEnglish ? 'Only show GPS' : '只显示GPS'} />
      <TYIpcGpsSignal containerStyle={{ marginLeft: 50 }} gpsSignal={0} />
      <TYText style={styles.descTxt} text={isEnglish ? 'Only show LTE' : '只显示LTE'} />
      <TYIpcGpsSignal containerStyle={{ marginLeft: 50 }} lteSignal={50} />
      <TYText style={styles.descTxt} text={isEnglish ? 'Custom style' : '自定义样式'} />
      <TYIpcGpsSignal
        containerStyle={{ backgroundColor: 'green', marginLeft: 50 }}
        gpsSignal={0}
        lteSignal={50}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  IpcGpsSignalPage: {
    backgroundColor: 'black',
    height: '100%',
    paddingBottom: 50,
  },
  descTxt: {
    color: 'white',
    marginVertical: 10,
    paddingLeft: 15,
  },
});

export default IpcGpsSignal;
