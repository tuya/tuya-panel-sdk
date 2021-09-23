import React, { useState } from 'react';
import { View } from 'react-native';
import { SwitchButton, TYText } from 'tuya-panel-kit';
import { AppMusicCard } from '@tuya/tuya-panel-lamp-sdk';

const AppMusic = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  return (
    <View style={{ padding: 20 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
          marginBottom: 20,
        }}
      >
        <TYText>isDrakTheme: </TYText>
        <SwitchButton value={isDarkTheme} onValueChange={setIsDarkTheme} />
      </View>
      <AppMusicCard
        style={{ alignSelf: 'center' }}
        theme={{
          isDarkTheme,
          themeColor: '#1082fe',
          background: isDarkTheme ? '#222222' : '#fff',
          fontColor: isDarkTheme ? '#fff' : '#000',
        }}
      />
    </View>
  );
};

export default AppMusic;
