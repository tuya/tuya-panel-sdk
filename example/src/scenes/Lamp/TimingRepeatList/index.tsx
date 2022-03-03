import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { TimingRepeatList } from '@tuya/tuya-panel-lamp-sdk';
import { Utils, Dialog, TYText } from 'tuya-panel-kit';
import Strings from '../../../i18n';

const { convertX: cx } = Utils.RatioUtils;
const data = [
  {
    name: Strings.getLang('TYLamp_normalTiming_title'),
    startTime: 100,
    endTime: 100,
  },
  {
    name: Strings.getLang('TYLamp_sleepTiming_title'),
    startTime: 120,
  },
  {
    name: Strings.getLang('TYLamp_sleepTiming_title'),
    startTime: 308,
    endTime: 348,
  },
];

const isZh = Strings.language?.startsWith('zh');
const singleTimeStyles = {
  itemStyle: {
    flexDirection: isZh ? 'row' : 'row-reverse',
  },
};
const rangeTimeStyles = {
  itemStyle: {
    flexDirection: isZh ? 'row' : 'row-reverse',
  },
  timeStyle: {
    color: '#010101',
    fontWeight: '500',
    fontSize: cx(16),
    marginRight: isZh ? 0 : cx(4),
  },
  isEllipsis: true,
};

const TimeFormatComponentScene: React.FC<any> = () => {
  useEffect(() => {
    Dialog.custom({
      title: Strings.getLang('TYLamp_timing_repeat'),
      subTitle: Strings.getLang('TYLamp_timing_tip'),
      // eslint-disable-next-line react/display-name
      header: () => (
        <View style={styles.header}>
          <TYText style={styles.title}>{Strings.getLang('TYLamp_timing_repeat')}</TYText>
          <TYText style={styles.sub_title}>{Strings.getLang('TYLamp_timing_tip')}</TYText>
        </View>
      ),
      content: (
        <TimingRepeatList
          is24Hour={false}
          data={data}
          style={{ maxHeight: data.length === 2 ? cx(169) : cx(149) }}
          singleTimeProps={singleTimeStyles}
          rangeTimeProps={rangeTimeStyles}
          rightStyle={{ backgroundColor: 'rgba(16,130,254,0.1)' }}
          nameStyle={{ color: '1082FE' }}
        />
      ),
      cancelText: Strings.getLang('cancel'),
      onConfirm: () => {
        Dialog.close();
      },
    });
  }, []);

  return <></>;
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: cx(20),
  },
  sub_title: {
    color: 'rgba(0,0,0,0.5)',
    fontSize: cx(15),
    textAlign: 'center',
  },
  title: {
    color: '#010101',
    fontSize: cx(17),
    fontWeight: '500',
    marginBottom: cx(12),
    marginTop: cx(32),
  },
});

export default TimeFormatComponentScene;
