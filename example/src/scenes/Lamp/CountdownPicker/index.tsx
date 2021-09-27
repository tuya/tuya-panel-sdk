import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CountdownPicker } from '@tuya/tuya-panel-lamp-sdk';

const CountdownPickers: React.FC = () => {
  return (
    <View style={styles.container}>
      <CountdownPicker
        style={{ flex: 1 }}
        hourLabel="H"
        minuteLabel="M"
        secondLabel="S"
        defaultValue={1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
});

export default CountdownPickers;
