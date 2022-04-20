import React from 'react';
import { Text, View } from 'react-native';
import { SwitchButton } from 'tuya-panel-kit';
import { AlarmSwitch, WhiteSpace } from '@tuya/tuya-panel-sensing-sdk';

const theme = {
  fontColor: '#333333',
  subFontColor: '#999',
  descFontColor: '#999',
  cellBg: '#ffffff',
};

const arr = Array.from({ length: 5 }, (_, index) => index + 1);

const Demo = () => {
  const list = arr.map(d => {
    return {
      theme,
      key: d,
      value: false,
      title: `温度过高${d}`,
      showIcon: false,
      top: 20,
      show: true,
      dps: [],
      arrow: false,
      onPress: () => undefined,
      action: <SwitchButton value={false} onValueChange={enabled => undefined} />,
    };
  });
  return (
    <View style={{ flex: 1 }}>
      <View style={{ paddingRight: 16, paddingLeft: 16 }}>
        <Text>告警开关</Text>
        <WhiteSpace size="sm" />
        <AlarmSwitch language="en" initList={list} />
      </View>
    </View>
  );
};

export default Demo;
