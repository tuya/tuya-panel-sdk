import React from 'react';
import { NormalTiming } from '@tuya/tuya-panel-lamp-sdk';

const { Repeat } = NormalTiming;

const RepeatScene: React.FC<any> = props => {
  const route = {
    params: {
      weekOptionStyle: {
        centerBgc: 'rgba(0,0,0,0.05)',
        borderBottomColor: 'rgba(0,0,0,0.1)',
        borderColor: 'rgba(0,0,0,0.2)',
      },
      ...props,
    },
  };

  return <Repeat route={route} />;
};

export default RepeatScene;
