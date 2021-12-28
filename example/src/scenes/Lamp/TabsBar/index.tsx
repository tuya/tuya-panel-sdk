import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Utils, TYText, IconFont } from 'tuya-panel-kit';
import { TabsBar } from '@tuya/tuya-panel-lamp-sdk';
import Strings from '../../../i18n';

const { convertX: cx } = Utils.RatioUtils;
const RadioScene = () => {
  const [radioValue, setRadioValue] = useState<string | number>('TEST0');
  const icons = {
    loop:
      'M110.16666639 530.5000001l5.4 1.2999999 134.4999999 43.7000001a37.50000029 37.50000029 0 0 1-17.79999961 72.64999951l-5.4-1.35-41.9500002-13.54999922a362.7500001 362.7500001 0 0 0 692.49999991-29.25 37.50000029 37.50000029 0 1 1 72.5000001 18.99999932 437.64999961 437.64999961 0 0 1-835.89999961 34.75000019l-18.1000002 55.8a37.50000029 37.50000029 0 0 1-41.85 25.40000039l-5.4-1.35a37.50000029 37.50000029 0 0 1-25.40000039-41.85l1.35-5.4 43.7000001-134.4999999a37.50000029 37.50000029 0 0 1 41.85-25.40000039zM526.66666688 74.4999998a437.7499998 437.7499998 0 0 1 412.65 291.7000002l18.10000019-55.7499999a37.50000029 37.50000029 0 0 1 41.85-25.40000039l5.4 1.35a37.50000029 37.50000029 0 0 1 25.39999951 41.85l-1.35 5.4-43.7000001 134.4999999a37.50000029 37.50000029 0 0 1-41.85 25.40000039l-5.4-1.35-134.4999999-43.7000001a37.50000029 37.50000029 0 0 1 17.80000049-72.64999951l5.4 1.35 41.94999932 13.54999922a362.6499999 362.6499999 0 0 0-692.9499999 31.05 37.50000029 37.50000029 0 0 1-72.64999952-18.59999942A437.64999961 437.64999961 0 0 1 526.66666688 74.4999998z',
  };

  const dataList = [
    ...Array.from('4321').map(i => ({
      label: `${5 - +i}`,
      value: `TEST${5 - +i}`,
    })),
    {
      label: Strings.getLang('TYLamp_loop'),
      value: 'TEST0',
      unSelectedIcon: <IconFont size={cx(18)} d={icons.loop} color="red" />,
    },
  ];
  return (
    <ScrollView style={styles.container}>
      <View style={styles.tabsValueText}>
        <TYText size={cx(20)} weight="900">
          {radioValue}
        </TYText>
      </View>
      <View style={styles.sectionTitle}>
        <TYText text={Strings.getLang('TYLamp_vertical')} />
      </View>
      <View style={styles.tabsValueText}>
        <TabsBar
          dataSource={dataList}
          horizontal={false}
          onChange={(e: number | string) => {
            console.log('onChange', e);
            setRadioValue(e);
          }}
          value={radioValue}
          style={{
            width: cx(56),
            height: cx(300),
            borderRadius: cx(12),
            backgroundColor: '#a6e22e',
          }}
          activeItemStyle={{
            borderRadius: cx(10),
            backgroundColor: '#87cefa',
          }}
          textStyle={styles.textStyle}
          divider={false}
          activeTextStyle={styles.activeTextStyle}
        />
      </View>
      <View style={styles.sectionTitle}>
        <TYText text={Strings.getLang('TYLamp_horizontal')} />
      </View>
      <View style={[styles.tabsValueText, { paddingBottom: cx(50) }]}>
        <TabsBar
          dataSource={dataList}
          onChange={(e: number | string) => {
            setRadioValue(e);
          }}
          dividerStyle={{
            width: cx(3),
            height: '100%',
            backgroundColor: '#fff',
          }}
          value={radioValue}
          style={{
            marginTop: cx(20),
            height: cx(50),
            width: cx(300),
            borderRadius: cx(12),
            borderWidth: 0,
            backgroundColor: '#a6e22e',
          }}
          activeItemStyle={{
            borderRadius: cx(10),
            backgroundColor: '#87cefa',
          }}
          textStyle={styles.textStyle}
          activeTextStyle={styles.activeTextStyle}
        />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  activeTextStyle: {
    color: '#87ce',
    fontSize: cx(15),
    fontWeight: '700',
  },
  container: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingBottom: cx(20),
  },
  sectionTitle: { backgroundColor: '#F0F0F0', paddingHorizontal: cx(10), paddingVertical: cx(10) },
  tabsValueText: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: cx(20),
  },
  textStyle: {
    color: '#fff',
    fontSize: cx(20),
    fontWeight: '700',
  },
});
export default RadioScene;
