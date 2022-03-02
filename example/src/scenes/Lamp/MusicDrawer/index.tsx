import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { MusicDrawer } from '@tuya/tuya-panel-lamp-sdk';
import { TYText } from 'tuya-panel-kit';
import { ScrollView } from 'react-native-gesture-handler';
import Res from '../../../res';
import Strings from '../../../i18n';

const MusicDrawers: React.FC = () => {
  const videoListData = ['multi', 'single'];
  const [activeVideoIndex, setActiveVideoIndex] = useState(-1);
  const [activeVideoIndex2, setActiveVideoIndex2] = useState(0);
  const DrawerData = videoListData.map((item, index) => ({
    id: item,
    leftIconSource: Res[`mode${index + 1}`],
    title: `${Strings.getLang('TYLamp_mode')}${index}`,
    rightIconSource: {
      stopIcon: Res.stopIconLight,
      startIcon: Res.startIconLight,
    },
  }));

  const CustomizeDrawerData2 = videoListData.map((item, index) => ({
    id: item,
    title: `${Strings.getLang('TYLamp_mode')}${index}`,
    subTitle: `${Strings.getLang('TYLamp_subTitle')}${index}`,
  }));
  const renderActiveContent = (key: string) => {
    if (key === 'multi') {
      return (
        <View style={styles.imgCard} pointerEvents="none">
          <TYText style={{ padding: 20 }}>{Strings.getLang('TYLamp_drawerContent')}</TYText>
        </View>
      );
    }
    return (
      <View style={{ height: 50 }} pointerEvents="none">
        <TYText style={{ padding: 20 }}>{`${Strings.getLang('TYLamp_drawerContent')}2`}</TYText>
      </View>
    );
  };

  const renderCustomizeContent = (key: string) => {
    if (key === 'multi') {
      return (
        <View style={styles.imgCard} pointerEvents="none">
          <TYText style={{ padding: 20, color: '#fff' }}>
            {Strings.getLang('TYLamp_drawerContent')}
          </TYText>
        </View>
      );
    }
    return (
      <View style={{ height: 50 }} pointerEvents="none">
        <TYText style={{ padding: 20, color: '#fff' }}>{`${Strings.getLang(
          'TYLamp_drawerContent'
        )}2`}</TYText>
      </View>
    );
  };
  return (
    <ScrollView style={styles.container}>
      <TYText style={styles.title}>{Strings.getLang('TYLamp_unSelected')}</TYText>
      <View style={{ alignItems: 'center' }}>
        <MusicDrawer
          value={DrawerData}
          styles={{
            containerStyle: styles.videoContainer,
            contentStyle: styles.videoContent,
            titleStyle: styles.text,
            rightIconBoxStyle: styles.musicBtn,
            leftIconBoxStyle: styles.videoImg,
          }}
          activeIndex={activeVideoIndex}
          onChangeIndex={setActiveVideoIndex}
          height={100}
          renderActiveContent={renderActiveContent}
        />
      </View>
      <TYText style={styles.title}>{Strings.getLang('TYLamp_selected')}</TYText>
      <View style={{ alignItems: 'center' }}>
        <MusicDrawer
          value={DrawerData}
          styles={{
            containerStyle: styles.videoContainer,
            contentStyle: styles.videoContent,
            titleStyle: styles.text,
            rightIconBoxStyle: styles.musicBtn,
            leftIconBoxStyle: styles.videoImg,
          }}
          activeIndex={activeVideoIndex2}
          onChangeIndex={setActiveVideoIndex2}
          height={100}
          renderActiveContent={renderActiveContent}
        />
      </View>
      <TYText style={styles.title}>{Strings.getLang('TYLamp_customizeStyle')}</TYText>
      <TYText style={styles.title}>{Strings.getLang('TYLamp_customizeDescription')}</TYText>
      <View style={{ alignItems: 'center' }}>
        <MusicDrawer
          value={CustomizeDrawerData2}
          styles={{
            containerStyle: [styles.videoContainer, { backgroundColor: 'green', width: 300 }],
            contentStyle: [styles.videoContent, { backgroundColor: 'green' }],
            titleStyle: [styles.text, { color: '#fff' }],
            rightIconBoxStyle: styles.musicBtn,
            rightIconStyle: { tintColor: '#fff' },
            leftIconBoxStyle: styles.videoImg,
          }}
          activeIndex={activeVideoIndex}
          onChangeIndex={setActiveVideoIndex}
          height={150}
          renderActiveContent={renderCustomizeContent}
          switchOption={{
            theme: {
              onTintColor: '#00F',
              onThumbTintColor: '#57BCFB',
              thumbTintColor: '#57BCFB',
            },
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgCard: {
    height: 200,
    overflow: 'hidden',
    width: '100%',
  },
  musicBtn: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 19,
    borderWidth: 0,
    marginRight: 24,
  },
  text: { fontSize: 18 },
  title: {
    marginVertical: 10,
    paddingLeft: 15,
  },
  videoContainer: {
    borderRadius: 16,
    marginBottom: 16,
  },
  videoContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingLeft: 14,
  },
  videoImg: {
    height: 52,
    marginHorizontal: 12,
    width: 52,
  },
});

export default MusicDrawers;
