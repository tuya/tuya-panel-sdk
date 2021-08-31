import React, { useState } from 'react';
import { View } from 'react-native';
import { SingleTimePicker } from '@tuya/tuya-panel-lamp-sdk';
import Strings from '../../../i18n/index';

const SingleTimePickerScene: React.FC = () => {
  const [hour, setHour] = useState(12);
  const [minute, setMinute] = useState(0);

  const handleTimeChange = (h: number, m: number) => {
    setHour(h);
    setMinute(m);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
      }}
    >
      <SingleTimePicker
        is24Hour={false}
        hour={hour}
        minute={minute}
        loop
        visibleItemCount={7}
        itemStyle={{ fontSize: 30, color: '#000' }}
        onChange={handleTimeChange}
        amText={Strings.getLang('TYLamp_am')}
        pmText={Strings.getLang('TYLamp_pm')}
        prefixPosition="right"
        textSize={30}
      />
    </View>
  );
};
export default SingleTimePickerScene;
