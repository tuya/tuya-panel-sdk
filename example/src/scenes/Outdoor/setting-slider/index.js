import React from 'react';
import { View } from 'react-native';
import { SettingSlider } from '@tuya/tuya-panel-outdoor-sdk';

const SettingSliderView = () => {
  return (
    <View>
      <SettingSlider
        code="control"
        range={['open', 'stop', 'close']}
        value="stop"
        type="enum"
        step={1}
        themeColor="#57BCFB"
        onValueConfrim={() => {}}
      />
    </View>
  );
};
export default SettingSliderView;
