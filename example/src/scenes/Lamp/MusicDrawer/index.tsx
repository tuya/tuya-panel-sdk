import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { MusicDrawer } from '@tuya/tuya-panel-lamp-sdk';
import { TYText } from 'tuya-panel-kit';
import { ScrollView } from 'react-native-gesture-handler';
import Res from './res';

const lang = {
  en: {
    mode: 'mode',
    unSelected: 'Unselected State',
    selected: 'Selected State',
    customizeStyle: 'Customize',
    customizeContent: 'Customize Content',
    drawerContent: 'Drawer Content',
    subTitle: 'Subtitle',
    customizeDescription: 'Has no left icon,but has subtitle,only one button image',
  },
  zh: {
    mode: '模式',
    unSelected: '未选中状态',
    defaultStyle: '选中状态',
    customizeStyle: '自定义样式',
    customizeContent: '自定义内容',
    drawerContent: '下拉内容',
    subTitle: '子标题',
    customizeDescription: '没有左边按钮，有子标题，按钮固定',
  },
};
const getLang = (key: string) => {
  return lang.en[key];
};

const MusicDrawers: React.FC = () => {
  const videoListData = ['multi', 'single'];
  const [activeVideoIndex, setActiveVideoIndex] = useState(-1);
  const [activeVideoIndex2, setActiveVideoIndex2] = useState(0);
  const DrawerData = videoListData.map((item, index) => ({
    id: item,
    leftIconSource: Res[`mode${index + 1}`],
    title: `${getLang('mode')}${index}`,
    rightIconSource: {
      stopIcon: Res.stopIconLight,
      startIcon: Res.startIconLight,
    },
  }));
  const CustomizeDrawerData = videoListData.map((item, index) => ({
    id: item,
    title: `${getLang('mode')}${index}`,
    subTitle: `${getLang('subTitle')}${index}`,
    rightIconSource: {
      normalIcon: Res.startIconLight,
    },
  }));
  const renderActiveContent = (key: string) => {
    if (key === 'multi') {
      return (
        <View style={styles.imgCard} pointerEvents="none">
          <TYText style={{ padding: 20 }}>{getLang('drawerContent')}</TYText>
        </View>
      );
    }
    return (
      <View style={{ height: 50 }} pointerEvents="none">
        <TYText style={{ padding: 20 }}>{`${getLang('drawerContent')}2`}</TYText>
      </View>
    );
  };

  const renderCustomizeContent = (key: string) => {
    if (key === 'multi') {
      return (
        <View style={styles.imgCard} pointerEvents="none">
          <TYText style={{ padding: 20, color: '#fff' }}>{getLang('drawerContent')}</TYText>
        </View>
      );
    }
    return (
      <View style={{ height: 50 }} pointerEvents="none">
        <TYText style={{ padding: 20, color: '#fff' }}>{`${getLang('drawerContent')}2`}</TYText>
      </View>
    );
  };
  return (
    <ScrollView style={styles.container}>
      <TYText style={styles.title}>{getLang('unSelected')}</TYText>
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
          onPress={() => console.log('press')}
          onChangeIndex={setActiveVideoIndex}
          height={100}
          renderActiveContent={renderActiveContent}
        />
      </View>
      <TYText style={styles.title}>{getLang('selected')}</TYText>
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
          onPress={() => console.log('press')}
          onChangeIndex={setActiveVideoIndex2}
          height={100}
          renderActiveContent={renderActiveContent}
        />
      </View>
      <TYText style={styles.title}>{getLang('customizeStyle')}</TYText>
      <TYText style={styles.title}>{getLang('customizeDescription')}</TYText>
      <View style={{ alignItems: 'center' }}>
        <MusicDrawer
          value={CustomizeDrawerData}
          styles={{
            containerStyle: [styles.videoContainer, { backgroundColor: 'green', width: 300 }],
            contentStyle: [styles.videoContent, { backgroundColor: 'green' }],
            titleStyle: [styles.text, { color: '#fff' }],
            rightIconBoxStyle: styles.musicBtn,
            rightIconStyle: { tintColor: '#fff' },
            leftIconBoxStyle: styles.videoImg,
          }}
          activeIndex={activeVideoIndex}
          onPress={() => console.log('press')}
          onChangeIndex={setActiveVideoIndex}
          height={140}
          renderActiveContent={renderCustomizeContent}
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
