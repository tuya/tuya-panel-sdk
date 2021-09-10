import { TYIpcStepButton } from '@tuya/tuya-panel-ipc-sdk';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const IpcStepButton: React.FunctionComponent = () => {
  const onValueChange = (value: number) => {
    console.log(value);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Original style</Text>
      <View style={styles.warp}>
        <TYIpcStepButton onValueChange={onValueChange} initialValue={60} unit="Num" subUnit="g" />
      </View>
      <Text style={styles.text}>Custom styles</Text>
      <View style={styles.warp}>
        <TYIpcStepButton
          containerStyle={{ width: 200 }}
          onValueChange={onValueChange}
          initialValue={1}
          count={5}
          unit="m"
          min={0}
          max={200}
          speed={0.1}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  text: {
    fontSize: 15,
  },
  warp: {
    marginBottom: 20,
    marginTop: 10,
  },
});

export default IpcStepButton;
