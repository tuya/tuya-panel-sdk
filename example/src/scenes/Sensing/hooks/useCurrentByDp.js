import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useCurrentByDp } from '@tuya/tuya-panel-sensing-sdk';
import moment from 'moment';

export default () => {
  const getDeviceTime = useCurrentByDp(true, ['temp_current', 'humidity_value']);

  const [date, setDate] = useState(Date.now());

  useEffect(() => {
    getDeviceTime().then(res => {
      setDate(res);
    });
  }, []);

  return (
    <View>
      <Text>最新时间</Text>
      <Text>{moment(date).format('YYYY-MM-DD HH:mm:ss')}</Text>
    </View>
  );
};
