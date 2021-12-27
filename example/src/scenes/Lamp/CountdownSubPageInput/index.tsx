import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { TYIpcNative } from '@tuya/tuya-panel-ipc-sdk';

const CountdownSubPageInput: React.FC = () => {
  const countdown1 = 2000;
  const countdwon2 = 500;
  const handlePress = () => {
    TYIpcNative.enterRnPage('Lamp.CountdownSubPage', { countdown: countdown1 });
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress}>
        <View
          style={{
            width: 324,
            height: 78,
            backgroundColor: 'red',
            marginBottom: 10,
            borderRadius: 16,
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePress}>
        <View
          style={{
            width: 324,
            height: 78,
            backgroundColor: 'green',
            marginBottom: 10,
            borderRadius: 16,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    //  padding: 20,
  },
});

export default CountdownSubPageInput;
