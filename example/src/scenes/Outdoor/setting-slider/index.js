import React from 'react';
import { View } from 'react-native';
import { SettingSlider } from '@tuya/tuya-panel-outdoor-sdk';
import Strings from './i18n';

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
        onValueConfirm={() => {}}
        strings={Strings}
      />
    </View>
  );
};
export default SettingSliderView;
