import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { TimeFormatComponent } from '@tuya/tuya-panel-lamp-sdk';
import { Utils } from 'tuya-panel-kit';
import Strings from '../../../i18n';

const { RangeTime, SingleTime } = TimeFormatComponent;

const { convertX: cx, winWidth } = Utils.RatioUtils;
const isZh = Strings.language?.startsWith('zh');

const TimeFormatComponentScene: React.FC<any> = () => {
  return (
    <>
      <Text style={styles.text}>{Strings.getLang('TYLamp_12_title')}</Text>
      <SingleTime
        time={1200}
        is24Hour={false}
        itemStyle={{
          flexDirection: isZh ? 'row' : 'row-reverse',
          justifyContent: isZh ? 'flex-start' : 'flex-end',
        }}
      />
      <RangeTime
        startTime={245}
        endTime={460}
        is24Hour={false}
        itemStyle={{ flexDirection: isZh ? 'row' : 'row-reverse' }}
      />
      <Text style={styles.text}>{Strings.getLang('TYLamp_24_title')}</Text>
      <SingleTime
        time={245}
        is24Hour
        itemStyle={{
          flexDirection: isZh ? 'row' : 'row-reverse',
        }}
      />
      <RangeTime
        startTime={245}
        endTime={460}
        is24Hour
        itemStyle={{ flexDirection: isZh ? 'row' : 'row-reverse' }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    backgroundColor: '#DFDFDF',
    fontSize: cx(16),
    marginVertical: cx(5),
    paddingVertical: cx(5),
    width: winWidth,
  },
});

export default TimeFormatComponentScene;
