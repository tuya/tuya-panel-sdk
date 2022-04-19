import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import BottomBar from '@tuya/tuya-panel-lamp-sdk/src/components/container/bottomBar';
import Res from '../../../res/bottomBarIcons';

const BottomBarScene: React.FC = () => {
  const [activeMode, setActiveMode] = useState('light');
  const [power, setPower] = useState(true);
  const handlePress = (item: any) => {
    setActiveMode(item.key);
  };

  const handlePower = () => {
    setPower(!power);
  };

  const renderPower = () => {
    return (
      <TouchableOpacity
        key="power"
        style={[
          {
            width: 88,
            height: 48,
            borderRadius: 24,
            alignItems: 'center',
            justifyContent: 'center',
          },
          {
            backgroundColor: power ? '#0D84FF' : 'rgba(255,255,255,0.1)',
          },
        ]}
        onPress={() => handlePower()}
      >
        <Image
          source={Res.power}
          style={{
            width: 32,
            height: 32,
            tintColor: '#FFF',
          }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.main}>
      <View style={styles.content}>
        <BottomBar handlePress={handlePress} activeMode={activeMode} />
      </View>

      <View style={styles.content}>
        <BottomBar
          handlePress={handlePress}
          activeMode={activeMode}
          data={[
            {
              key: 'power',
              source: Res.power,
              isSupport: true,
              renderContent: renderPower(),
            },
            { key: 'light', source: Res.light, isSupport: true },
            { key: 'scene', source: Res.scene, isSupport: true },
            { key: 'music', source: Res.music, isSupport: true },
            { key: 'plan', source: Res.plan, isSupport: true },
          ]}
        />
      </View>

      <View style={styles.content}>
        <BottomBar
          handlePress={handlePress}
          activeMode={activeMode}
          data={[
            { key: 'light', source: Res.light, isSupport: true },
            { key: 'scene', source: Res.scene, isSupport: true },
            {
              key: 'power',
              source: Res.power,
              isSupport: true,
              renderContent: renderPower(),
            },
            { key: 'music', source: Res.music, isSupport: true },
            { key: 'plan', source: Res.plan, isSupport: true },
          ]}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  content: {
    backgroundColor: '#000',
    height: 84,
    width: '100%',
  },
  main: { alignItems: 'center', flex: 1, justifyContent: 'space-around' },
});
export default BottomBarScene;
