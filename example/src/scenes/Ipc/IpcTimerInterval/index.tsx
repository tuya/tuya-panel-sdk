import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { TYText } from 'tuya-panel-kit';
import { TYIpcTimeInterval } from '@tuya/tuya-panel-ipc-sdk';

const IpcTimerInterval: React.FC = () => {

  const isEnglish = true;
  
  return (
    <ScrollView
      scrollEnabled
      contentContainerStyle={styles.IpcTimerIntervalPage}
      showsVerticalScrollIndicator={false}
      alwaysBounceVertical={false}
    >
      <TYText style={styles.descTxt} text={isEnglish ? 'Normal timerInterval' : '基本默认定时'} />
      <TYIpcTimeInterval />
      <TYText style={styles.descTxt} text={isEnglish ? 'Normal timerInterval' : '从起始3600秒开始计时'} />
      <TYIpcTimeInterval startValue={3600} />
      <TYText style={styles.descTxt} text={isEnglish ? 'Custom style' : '自定义样式'} />
      <TYIpcTimeInterval startValue={3600} timerContainStyle={{ backgroundColor: 'red' }} dotStyle={{ backgroundColor: 'yellow' }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  IpcTimerIntervalPage: {
    paddingBottom: 50,
    paddingLeft: 15,
  },
  descTxt: {
    color: 'red',
    marginVertical: 10,
    
  },
});

export default IpcTimerInterval;
