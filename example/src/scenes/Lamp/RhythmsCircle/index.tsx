import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { RhythmsCircle } from '@tuya/tuya-panel-lamp-sdk';
import { Utils, TYText } from 'tuya-panel-kit';
import Icon from '../../../res/rhythmIcons';
import Res from '../../../res';
import Strings from '../../../i18n';

const { convertX: cx, winWidth } = Utils.RatioUtils;

const defaultData = [
  {
    color: '#CE8040',
    noActiveColor: '#fff',
    activeColor: '#F7EB2A',
    icon: Icon.icon1,
    index: 0,
    time: 390,
    valid: true,
  },
  {
    color: '#CEECFE',
    noActiveColor: '#fff',
    activeColor: '#FFB420',
    icon: Icon.icon2,
    index: 1,
    time: 690,
    valid: true,
  },
  {
    color: '#CE8040',
    noActiveColor: '#fff',
    activeColor: '#54FFC6',
    icon: Icon.icon3,
    index: 2,
    time: 1020,
    valid: true,
  },
  {
    color: '#333',
    noActiveColor: '#fff',
    activeColor: '#3391FF',
    icon: Icon.icon4,
    index: 3,
    time: 1260,
    valid: true,
  },
];
const RhythmsCircleScene: React.FC = () => {
  const [data, setData] = useState(defaultData);
  const [data1, setData1] = useState(defaultData);

  return (
    <View style={styles.flex1}>
      <>
        <TYText style={styles.text}>{Strings.getLang('TYLamp_rhythms_tip')}</TYText>
        <RhythmsCircle
          pickerStyle={{ marginVertical: cx(30) }}
          timeImg={Res.timeLight}
          thumbStyle={{ backgroundColor: '#fff' }}
          iconStyle={{ tintColor: '#AEAEAE' }}
          size={cx(200)}
          ringWidth={cx(30)}
          thumbSize={cx(26)}
          onRelease={d => setData(d)}
          disabled={false}
          disabledOpacity={1}
          stepOverEnabled={false}
          data={data}
        />
      </>
      <>
        <TYText style={styles.text1}>{Strings.getLang('TYLamp_rhythms_tip1')}</TYText>
        <RhythmsCircle
          pickerStyle={{ marginVertical: cx(30) }}
          timeImg={Res.timeLight}
          thumbStyle={{ backgroundColor: '#fff' }}
          iconStyle={{ tintColor: '#AEAEAE' }}
          size={cx(200)}
          ringWidth={cx(30)}
          thumbSize={cx(26)}
          onRelease={d => setData1(d)}
          disabled={false}
          disabledOpacity={1}
          stepOverEnabled
          data={data1}
        />
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  flex1: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    backgroundColor: '#DFDFDF',
    paddingVertical: cx(10),
    width: winWidth,
  },
  text1: {
    backgroundColor: '#DFDFDF',
    paddingVertical: cx(10),
    width: winWidth,
  },
});

export default RhythmsCircleScene;
