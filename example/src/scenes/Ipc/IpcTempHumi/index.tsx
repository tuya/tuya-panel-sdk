import React, { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { TYText } from 'tuya-panel-kit';
import { TYIpcTempHumi } from '@tuya/tuya-panel-ipc-sdk';

const IpcTempHumi: React.FC = () => {
  const isEnglish = false;
  
  return (
    <ScrollView
      scrollEnabled
      contentContainerStyle={styles.IpcTempHumiPage}
      showsVerticalScrollIndicator={false}
      alwaysBounceVertical={false}
    >
      <TYText style={styles.descTxt} text={isEnglish ? 'Standard temperature and humidity dp mode' : '标准温湿度dp模式'} />
      <TYIpcTempHumi
        sensor_temperature={20}
        temp_report_f={100}
        sensor_humidity={10}
        // 温度单位选择, 默认0, 表示摄氏度  1 表示华氏度
        temp_unit_select={'0'}
      />
      <TYText style={styles.descTxt} text={isEnglish ? 'Custom mode' : '自定义模式'} />
      <TYIpcTempHumi
        standardDpMode={false}
        sensor_temperature={20}
        temp_report_f={100}
        sensor_humidity={10}
        temp_unit_select={'1'}
      />
      <TYText style={styles.descTxt} text={isEnglish ? 'Only show humidity' : '只显示湿度'} />
      <TYIpcTempHumi
        standardDpMode={false}
        sensor_humidity={10}
      />
      <TYText style={styles.descTxt} text={isEnglish ? 'Only show temperature' : '只显示温度'} />
      <TYIpcTempHumi
        standardDpMode={false}
        sensor_temperature={20}
        temp_report_f={100}
      />
      <TYText style={styles.descTxt} text={isEnglish ? 'Custom style' : '自定义样式'} />
      <TYIpcTempHumi
        containerStyle={{ backgroundColor: 'red' }}
        tempIconTextStyle={{color: 'yellow'}}
        standardDpMode={false}
        sensor_temperature={20}
        temp_report_f={100}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  IpcTempHumiPage: {
    paddingBottom: 50,
  },
  descTxt: {
    color: 'red',
    marginVertical: 10,
    paddingLeft: 15,
  },
});

export default IpcTempHumi;
