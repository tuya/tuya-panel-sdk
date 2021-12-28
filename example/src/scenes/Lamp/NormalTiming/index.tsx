import React from 'react';
import { NormalTiming } from '@tuya/tuya-panel-lamp-sdk';

const { Timer } = NormalTiming;

const NormalTimingScene: React.FC<any> = () => {
  const themeConfig = {};
  const timerConfig = {
    addTimerRouter: 'Lamp.AddTimer',
    weeksRouter: 'Lamp.Repeat',
    openLampRouter: 'Lamp.TestWhite',
    useNavigation: false,
  };

  const route = {
    params: {
      timerConfig,
      themeConfig,
    },
  };
  const navigation = {
    push() {},
  };
  return <Timer route={route} navigation={navigation} />;
};

export default NormalTimingScene;
