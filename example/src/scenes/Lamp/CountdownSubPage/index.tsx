import React from 'react';
import { TYIpcNative } from '@tuya/tuya-panel-ipc-sdk';
import { Utils } from 'tuya-panel-kit';
import Strings from '../../../i18n';
import CountdownSubPage from '../../../../../packages/tuya-panel-lamp-sdk/src/components/time/countdown-subpage';

const { winWidth, convertX } = Utils.RatioUtils;
const cx = (value: number) => {
  return Math.floor(convertX(value));
};
const CountdownSubPageDemo = () => {
  const handlePress = () => {
    TYIpcNative.enterRnPage('Lamp.CountdownSubPage', '');
  };
  const params = {
    background: '#fff',
    countdown: 100,
    minuteLabel: Strings.getLang('TYLamp_minute'),
    secondLabel: Strings.getLang('TYLamp_second'),
    hourLabel: Strings.getLang('TYLamp_hour'),
    countdownDo: () => {},
    onSave: (time: number) => {},
    onCountdownText: Strings.getLang('TYLamp_onCountdown'),
    offCountdownText: Strings.getLang('TYLamp_offCountdown'),
    confirmText: '确认',
    confirmButtonStyle: {
      backgroundColor: '#87cefa',
      height: 48,
      width: winWidth - cx(32),
      paddingHorizontal: cx(16),
      borderRadius: 24,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: cx(16),
      marginHorizontal: cx(16),
    },
    confirmTextStyle: {
      color: '#fff',
      fontSize: 16,
    },
    cancelButtonStyle: {
      marginHorizontal: cx(16),
      height: 48,
      width: winWidth - cx(32),
      borderRadius: 24,
      backgroundColor: '#333',
      marginBottom: cx(16),
      alignItems: 'center',
      justifyContent: 'center',
    },
    cancelText: Strings.getLang('TYLamp_cancel'),
    cancelTextStyle: {
      color: '#fff',
      fontSize: 16,
    },
    picker: {
      time: 200,
      isShowSecond: true,
      timeTextStyle: { fontSize: 40, color: '#eee' },
      unitTextStyle: { fontSize: 14, color: 'rgba(255,255,255,0.5)' },
      minuteLabel: Strings.getLang('TYLamp_minute'),
      secondLabel: Strings.getLang('TYLamp_second'),
      hourLabel: Strings.getLang('TYLamp_hour'),
    },
    clock: {
      countdown: 200,
      totalCountDown: 200,
      minuteLabel: Strings.getLang('TYLamp_minute'),
      secondLabel: Strings.getLang('TYLamp_second'),
      hourLabel: Strings.getLang('TYLamp_hour'),
      timeTextStyle: { fontSize: 40, color: '#000' },
      unitTextStyle: { fontSize: 14, color: 'rgba(255,255,255,0.5)' },
      lineColor: '#333',
      activeColor: '#87cefa',
      innerBackgroundColor: 'rgba(255,255,255,0.85)',
      isShowHour: false,
      size: 280,
      lineHeight: 5,
      lineWidth: 1,
      lineNum: 100,
      resetText: Strings.getLang('TYLamp_resetCountdown'),
      resetTextStyle: {
        color: '#888',
      },
      onReset: () => {},
      onCancel: () => {},
    },
  };
  return (
    <CountdownSubPage
      route={{
        params,
      }}
    />
  );
  // return (
  //   <TouchableOpacity onPress={handlePress}>
  //     <View style={{ width: 100, height: 100, backgroundColor: 'red' }} />
  //   </TouchableOpacity>
  // );
};
export default CountdownSubPageDemo;
