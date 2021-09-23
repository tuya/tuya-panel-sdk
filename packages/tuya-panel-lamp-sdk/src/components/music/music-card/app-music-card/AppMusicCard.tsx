import React, { useState, useMemo, useCallback } from 'react';
import { View, StyleSheet, Animated, TouchableOpacity, Image, FlatList } from 'react-native';
import { TYText, Utils, Dialog, Button } from 'tuya-panel-kit';
import { useUnmount, useCreation, usePersistFn } from 'ahooks';
import color from 'color';
import Res from '../../../../res';
import { ColorUtils } from '../../../../utils';
import MusicBar from '../../music-bar';
import AppMusicData from './config/appMusic';
import * as MusicManager from './utils/MusicManager';
import Strings from './i18n';
import { AppleMusicDataType, AppMusicCardProps, AppMusicListItemType } from './interface';

const { convertX: cx } = Utils.RatioUtils;

const AppMusic: React.FC<AppMusicCardProps> = ({
  style,
  theme,
  isColourExist = true,
  isTempExist = true,
  dataSource = AppMusicData,
  onPlay,
  onMusicDataPut,
}) => {
  const { isDarkTheme = false, themeColor = '#1082FE', background = '#fff', fontColor } =
    theme || {};
  const animMusicCard = useCreation(() => dataSource.map(() => new Animated.Value(0)), []);
  const [activeAppMusicIndex, setActiveAppMusicIndex] = useState(-1);
  const [musicBarColor, setMusicBarColor] = useState(['rgb(255,0,0)', 'rgb(255,255,0)']);
  const [musicIndex, setMusicIndex] = useState(2);

  const handlePlay = async (musicOption: AppMusicListItemType) => {
    try {
      onPlay?.();
      let colorStr = 'rgb(255,255,0)';
      await MusicManager.open(
        musicOption,
        (musicData: AppleMusicDataType, index: number) => {
          const { hue, saturation, temperature } = musicData;
          if (isColourExist) {
            colorStr = ColorUtils.hsv2rgba(hue!, saturation, 1000);
          } else {
            colorStr = ColorUtils.brightKelvin2rgb(1000, temperature);
          }
          const [, color2] = musicBarColor;
          setMusicBarColor([color2, colorStr]);
          setMusicIndex(index);
        },
        onMusicDataPut,
        { isColourExist, isTempExist }
      );
    } catch (err) {
      Dialog.alert({
        title: Strings.getLang('AppMusicCard_open_mike_failure'),
        subTitle: Strings.getLang('AppMusicCard_open_mike_error'),
        confirmText: Strings.getLang('AppMusicCard_confirm'),
        onConfirm: Dialog.close,
      });
    }
  };

  const handleAppToggleMusic = usePersistFn(async (index: number) => {
    const newIndex = activeAppMusicIndex === index ? -1 : index;
    await MusicManager.close();
    animMusicCard.forEach((animItem: any) => {
      Animated.timing(animItem, {
        toValue: 0,
        duration: 300,
      }).start();
    });
    if (newIndex !== -1) {
      Animated.timing(animMusicCard[index], {
        toValue: 1,
        duration: 300,
      }).start();
      const musicOption = dataSource[index];
      await handlePlay(musicOption);
    } else {
      animMusicCard.forEach((animItem: any) => {
        Animated.timing(animItem, {
          toValue: 0,
          duration: 300,
        }).start();
      });
    }
    setActiveAppMusicIndex(newIndex);
  });

  const renderMusicRowItem = ({ item, index }) => {
    if (!animMusicCard[index]) return <View />;

    const isActive = activeAppMusicIndex === index;
    const cardHeight = animMusicCard[index].interpolate({
      inputRange: [0, 1],
      outputRange: [cx(102), cx(165)],
    });

    return (
      <Animated.View style={[styles.musicBox, { height: cardHeight, backgroundColor: background }]}>
        {isActive && (
          <View style={{ position: 'absolute', bottom: -cx(5) }}>
            <MusicBar size={50} colors={musicBarColor} musicIndex={musicIndex} />
            <Image
              source={Res.musicMask}
              style={[styles.musicBarMask, { height: cx(94), tintColor: background }]}
            />
          </View>
        )}
        <View style={[styles.musicContent, { backgroundColor: background }]}>
          <View style={styles.musicInfo}>
            <Image style={styles.musicImg} source={item.icon} resizeMode="contain" />
            <TYText size={cx(16)} color={fontColor} text={item.title} />
          </View>
          <Button
            style={{
              backgroundColor: isDarkTheme
                ? 'rgba(255, 255, 255, 0.1)'
                : color(themeColor).alpha(0.1).rgbaString(),
            }}
            size={cx(38)}
            image={isActive ? Res.stopIcon : Res.startIcon}
            imageColor={isDarkTheme ? '#fff' : themeColor}
            imageStyle={styles.musicControlBtn}
            onPress={() => handleAppToggleMusic(index)}
          />
        </View>
      </Animated.View>
    );
  };

  useUnmount(() => {
    MusicManager.close();
    animMusicCard.forEach((animItem: any) => {
      Animated.timing(animItem, {
        toValue: 0,
        duration: 300,
      }).start();
    });
    setActiveAppMusicIndex(-1);
  });

  return (
    <View style={style}>
      <FlatList
        data={dataSource}
        renderItem={renderMusicRowItem}
        keyExtractor={item => `${item.id}`}
        extraData={[dataSource, activeAppMusicIndex]}
      />
    </View>
  );
};

export default AppMusic;

const styles = StyleSheet.create({
  musicBarMask: {
    bottom: 0,
    position: 'absolute',
    resizeMode: 'cover',
    width: '100%',
  },
  musicBox: {
    alignItems: 'center',
    borderRadius: cx(16),
    justifyContent: 'space-between',
    marginBottom: cx(16),
    overflow: 'hidden',
    width: cx(327),
  },
  musicContent: {
    alignItems: 'center',
    borderRadius: cx(16),
    flexDirection: 'row',
    height: cx(102),
    justifyContent: 'space-between',
    paddingLeft: cx(16),
    paddingRight: cx(24),
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  musicControlBtn: {
    height: cx(38),
    width: cx(38),
  },

  musicImg: {
    height: cx(52),
    marginRight: cx(12),
    width: cx(52),
  },

  musicInfo: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-start',
  },
});
