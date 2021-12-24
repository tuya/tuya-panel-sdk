import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { TYSdk } from 'tuya-panel-kit';

const TestWhiteScene: React.FC<any> = route => {
  useEffect(() => {
    setTimeout(() => {
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
    }, 1000);
  }, []);

  return <Text>Simulating white light action...</Text>;
};

export default TestWhiteScene;
