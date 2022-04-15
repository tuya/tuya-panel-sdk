import React from 'react';
import { View, Text } from 'react-native';
import { useDpState } from '@tuya/tuya-panel-sensing-sdk';
import { TYSdk } from 'tuya-panel-kit';

export default () => {
  const cacheDpState = {};
  const isLowPower = false;
  const dpInfo = useDpState(TYSdk.devInfo.state);

  const result = Object.keys(dpInfo).reduce((memo, item) => {
    const asyncExit =
      isLowPower && cacheDpState[item] !== undefined && !cacheDpState[item].pushStatus;
    if (asyncExit) {
      return {
        ...memo,
        [item]: cacheDpState[item].value,
      };
    }
    return {
      ...memo,
      [item]: dpInfo[item],
    };
  }, {});

  console.log('result', result);

  return (
    <View>
      <Text>打开控制台查看</Text>
    </View>
  );
};
