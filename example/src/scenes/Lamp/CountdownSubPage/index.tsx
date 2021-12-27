import React from 'react';
import { TYIpcNative } from '@tuya/tuya-panel-ipc-sdk';
import { Utils } from 'tuya-panel-kit';
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
    countdown: 4000,
    minuteLabel: '分',
    secondLabel: '秒',
    hourLabel: '时',
    countdownDo: () => {},
    onSave: (time: number) => {},
    onCountdownText: 'The light will turn on automatically after the countdown',
    offCountdownText: 'The light will turn off automatically after the countdown',
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
    cancelText: '取消',
    cancelTextStyle: {
      color: '#fff',
      fontSize: 16,
    },
    picker: {
      time: 4000,
      isShowSecond: true,
      timeTextStyle: { fontSize: 40, color: '#eee' },
      unitTextStyle: { fontSize: 14, color: 'rgba(255,255,255,0.5)' },
      minuteLabel: '分',
      secondLabel: '秒',
      hourLabel: '时',
    },
    clock: {
      countdown: 4000,
      totalCountDown: 4000,
      minuteLabel: '分',
      secondLabel: '秒',
      hourLabel: '时',
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
      resetText: '重置定时',
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
