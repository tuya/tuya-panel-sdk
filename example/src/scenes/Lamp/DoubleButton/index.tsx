import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DoubleButton } from '@tuya/tuya-panel-lamp-sdk';
import Strings from '../../../i18n';

const ButtonScene = () => {
  const data = {
    left: {
      title: Strings.getLang('TYLamp_left_title'),
      text: Strings.getLang('TYLamp_left_text'),
      activeTitle: Strings.getLang('TYLamp_new_left_title'),
      activeText: Strings.getLang('TYLamp_new_left_text'),
    },
    right: {
      title: Strings.getLang('TYLamp_right_title'),
      text: Strings.getLang('TYLamp_right_text'),
      activeTitle: Strings.getLang('TYLamp_new_right_title'),
      activeText: Strings.getLang('TYLamp_new_right_text'),
    },
  };
  return (
    <View style={styles.main}>
      <DoubleButton dataSource={data} />
    </View>
  );
};
const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
export default ButtonScene;
