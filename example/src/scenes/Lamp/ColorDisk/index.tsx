import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ColorDisk } from '@tuya/tuya-panel-lamp-sdk';

const ColorDisks: React.FC = () => (
  <View style={styles.container}>
    <ColorDisk radius={100} colors={['#E292FE', '#FFF76B']} />
    <ColorDisk radius={100} startAngle={Math.PI / 2} colors={[{ color: '#E292FE', percent: 30 }]} />
    <ColorDisk radius={100} colors={['#E292FE', '#FFF76B', '#96D35F', '#52D6FC', '#B18CFE']} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-around',
  },
});

export default ColorDisks;
