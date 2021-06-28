import React, { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { TYText } from 'tuya-panel-kit';
import { TYIpcProgressBar } from '@tuya/tuya-panel-ipc-sdk';
import Res from './res';

const defaultBarData1 = {
  key: 'example1',
  value: 0,
  min: 0,
  max: 100,
  disabled: false,
  // noTitle: true,
  // noUnit: true,
};

const defaultBarData2 = {
  key: 'example2',
  value: 0,
  min: 0,
  max: 100,
  disabled: false,
  iconImage: Res.lightBright,
  // noTitle: true,
  // noUnit: true,
};

const defaultBarData3 = {
  key: 'example3',
  value: 0,
  min: 0,
  max: 100,
  disabled: false,
  showPercentUnit: true,
  iconImage: Res.lightBright,
  maxColor: 'red',
  minColor: 'green',
  // noTitle: true,
  // noUnit: true,
};

const defaultBarData4 = {
  key: 'example4',
  value: 0,
  min: 0,
  max: 100,
  disabled: false,
  iconImage: Res.lightBright,
  customUnitImage: Res.lightBright,
  maxColor: 'red',
  minColor: 'green',
  // noTitle: true,
  // noUnit: true,
};

  
 

const IpcProgressBar: React.FC = () => {

  const [barData1, setBarData1] = useState(defaultBarData1);
  const [barData2, setBarData2] = useState(defaultBarData2);
  const [barData3, setBarData3] = useState(defaultBarData3);
  const [barData4, setBarData4] = useState(defaultBarData4);
  const isEnlish = true;

  const onValueChange = (value: number, key: string) => {
    const newBarData1 = { ...barData1, ...{ value } };
    const newBarData2 = { ...barData2, ...{ value } };
    const newBarData3 = { ...barData3, ...{ value } };
    const newBarData4 = { ...barData4, ...{ value } };
    setBarData1(newBarData1);
    setBarData2(newBarData2);
    setBarData3(newBarData3);
    setBarData4(newBarData4);
  }

  const onSlidingComplete = (value: number, key: string) => {
    const newBarData1 = { ...barData1, ...{ value } };
    const newBarData2 = { ...barData2, ...{ value } };
    const newBarData3 = { ...barData3, ...{ value } };
    const newBarData4 = { ...barData4, ...{ value } };
    setBarData1(newBarData1);
    setBarData2(newBarData2);
    setBarData3(newBarData3);
    setBarData4(newBarData4);
  }

  return (
    <ScrollView
      scrollEnabled
      contentContainerStyle={styles.IpcProgressBarPage}
      showsVerticalScrollIndicator={false}
      alwaysBounceVertical={false}
    >
      <TYText style={styles.descTxt} text={isEnlish ? 'Basic render ' : '基础渲染'} />
      {/* <TYText style={styles.descTxt} text="描述: 单个告警区域设置" /> */}
      <TYIpcProgressBar onValueChange={onValueChange} onSlidingComplete={onSlidingComplete} barData={barData1}/>
      <TYText style={styles.descTxt} text={isEnlish ? 'Icon image rendering' : '图标图片渲染'} />
      <TYIpcProgressBar onValueChange={onValueChange} onSlidingComplete={onSlidingComplete} barData={barData2} />
      <TYText style={styles.descTxt} text={isEnlish ? 'Percentage display' : '百分比显示'} />
      <TYIpcProgressBar onValueChange={onValueChange} onSlidingComplete={onSlidingComplete} barData={barData3} />
      <TYText style={styles.descTxt} text={isEnlish ? 'Style customization' : '样式自定义'} />
      <TYIpcProgressBar
        onValueChange={onValueChange}
        onSlidingComplete={onSlidingComplete}
        barData={barData3}
        sliderProperty={{
          thumbStyle: {width: 50, height: 50}
        }}
      />
      <TYText style={styles.descTxt} text={isEnlish ? 'Style Picture unit' : '图片单位'} />
      <TYIpcProgressBar
        onValueChange={onValueChange}
        onSlidingComplete={onSlidingComplete}
        barData={barData4}
        sliderProperty={{
          trackStyle: { height: 50 },
          thumbStyle: {width: 60, height: 60}
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  IpcProgressBarPage: {
    paddingBottom: 50,
  },
  descTxt: {
    color: 'red',
    marginVertical: 10,
    paddingLeft: 15,
  },
});

export default IpcProgressBar;
