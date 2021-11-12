import React from 'react';
import { View } from 'react-native';
import { CalendarList } from '@tuya/tuya-panel-outdoor-sdk';

export default function CalendarView() {
  const [current, seta] = React.useState('2021/08/30');

  setTimeout(() => {
    console.log('yes');
    seta('2021/09/30');
  }, 3 * 1000);

  function dateChange(obj) {
    console.log(obj);
  }
  return (
    <View style={{ flex: 1, paddingTop: 100 }}>
      <CalendarList
        futureTextStyle={{
          color: '#ccc',
        }}
        current={current}
        onChange={dateChange}
        prev={5}
        next={5}
        lang="zh"
      />
    </View>
  );
}
