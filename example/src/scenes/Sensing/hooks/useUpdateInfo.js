import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { useUpdateInfo } from '@tuya/tuya-panel-sensing-sdk';
import { TYSdk } from 'tuya-panel-kit';

export default () => {
  const getUnit = useUpdateInfo();
  const [info, setInfo] = useState([]);

  useEffect(() => {
    getUnit(TYSdk.devInfo.state).then(res => {
      setInfo(res);
    });
  }, []);

  return (
    <View>
      <Text>获取用户信息</Text>
      <Text>{JSON.stringify(info)}</Text>
      <Text>打开控制台查看</Text>
    </View>
  );
};
