import React from 'react';
import { NormalTiming } from '@tuya/tuya-panel-lamp-sdk';

const { AddTimer } = NormalTiming;

const AddTimerScene: React.FC<any> = props => {
  const themeConfig = {
    rowStyle: {
      backgroundColor: 'rgba(0,0,0,0.05)',
    },
  };
  const route = {
    params: {
      ...themeConfig,
      ...props,
    },
  };

  return <AddTimer route={route} />;
};

export default AddTimerScene;
