import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Hooks } from '@tuya/tuya-panel-lamp-sdk';
import Strings from '../../../i18n';

const { useDisturbDialog } = Hooks;
const DisturbDialog: React.FC = () => {
  // const handlePress = () => { /
  useDisturbDialog();
  // };
  return (
    <View style={styles.container}>
      {/* <Button onPress={handlePress} title={Strings.getLang('TYLamp_openDialog')} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-around',
  },
});

export default DisturbDialog;
