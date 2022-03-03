import React from 'react';
import { TYSdk, Button, Utils, TYText } from 'tuya-panel-kit';
import { StyleSheet, View } from 'react-native';
import Strings from '../../../i18n';

const { convertX: cx } = Utils.RatioUtils;

const TestWhiteScene: React.FC<any> = route => {
  const handleSave = () => {
    TYSdk.Navigator.pop();
    if (route.handleOpenSave) {
      route.handleOpenSave({
        workMode: 'white',
        hue: 10,
        saturation: 1000,
        value: 10,
        brightness: 500,
        temperature: 100,
      });
    }
  };

  return (
    <View style={styles.main}>
      <TYText>{Strings.getLang('TYLamp_test_white')}</TYText>
      <Button
        size={24}
        text={Strings.getLang('TYLamp_save')}
        style={styles.button}
        textStyle={styles.text}
        onPress={handleSave}
        wrapperStyle={styles.box}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    top: cx(20),
  },
  button: {
    backgroundColor: '#1C1D1E',
    elevation: 8,
    height: cx(38),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    width: cx(68),
  },
  main: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: cx(15),
  },
});
export default TestWhiteScene;
