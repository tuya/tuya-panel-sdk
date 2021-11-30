import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ConicalGradient } from '@tuya/tuya-panel-lamp-sdk';

const ConicalGradientView: React.FC = () => {
  const fullDeg = Math.PI * 2;

  return (
    <View style={styles.container}>
      <ConicalGradient
        offsetAngle={90}
        outerRadius={135}
        innerRadius={90}
        colors={[
          {
            angle: fullDeg * 0.06,
            color: '#04E4FC',
          },
          {
            angle: fullDeg * 0.2,
            color: '#0BFB2A',
          },
          {
            angle: fullDeg * 0.3,
            color: '#E9FE06',
          },
          {
            angle: fullDeg * 0.44,
            color: '#F8880E',
          },
          {
            angle: fullDeg * 0.55,
            color: '#FF0000',
          },
          {
            angle: fullDeg * 0.69,
            color: '#FC00EF',
          },
          {
            angle: fullDeg * 0.81,
            color: '#8700F9',
          },
          {
            angle: fullDeg * 0.95,
            color: '#023CFC',
          },
        ]}
      />
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

export default ConicalGradientView;
