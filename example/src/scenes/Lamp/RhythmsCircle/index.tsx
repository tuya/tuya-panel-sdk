import React, { useState } from 'react';
import { View } from 'react-native';
import { RhythmsCircle } from '@tuya/tuya-panel-lamp-sdk';
import { Utils } from 'tuya-panel-kit';
import Icon from '../../../res/rhythmIcons';
import Res from '../../../res/index';

const { convertX: cx } = Utils.RatioUtils;

const defaultData = [
  {
    color: '#CE8040',
    icon: Icon.icon1,
    index: 0,
    time: 390,
    valid: true,
  },
  {
    color: '#CEECFE',
    icon: Icon.icon2,
    index: 1,
    time: 690,
    valid: true,
  },
  {
    color: '#CE8040',
    icon: Icon.icon3,
    index: 2,
    time: 1020,
    valid: true,
  },
  {
    color: '#333',
    icon: Icon.icon4,
    index: 3,
    time: 1260,
    valid: true,
  },
  // {
  //   color: '#CE8040',
  //   icon: img,
  //   index: 4,
  //   time: 1320,
  //   valid: true,
  // },
];
const RhythmsCircleScene: React.FC = () => {
  const [data, setData] = useState(defaultData);

  const handleRelease = d => {
    setData(d);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      }}
    >
      <RhythmsCircle
        timeImg={Res.timeLight}
        thumbStyle={{ backgroundColor: '#fff' }}
        iconStyle={{ tintColor: '#AEAEAE' }}
        size={cx(280)}
        ringWidth={cx(40)}
        thumbSize={cx(36)}
        // onChange={handleRelease}
        onRelease={handleRelease}
        disabled={false}
        disabledOpacity={1}
        stepOverEnabled={false}
        data={data}
      />
    </View>
  );
};

export default RhythmsCircleScene;
