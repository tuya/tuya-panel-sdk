/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, NativeModules } from 'react-native';
import { TYText, Slider, Utils } from 'tuya-panel-kit';
import Strings from '../i18n';
import VideoContext from './Context';
import { timeFormat } from './fn';

const CameraMessageManager = NativeModules.TYRCTCameraMessageManager;
const { convertX: cx } = Utils.RatioUtils;
const MAX_P = 1000;
const MIN_P = 0;

const toRotateMode = (rotate: number) => {
  const rotateMap = {
    0: 0,
    90: 1,
    180: 2,
    270: 3,
  };

  return rotateMap[rotate];
};

const PlayerController: React.FC = () => {
  const {
    videoSource,
    videoKey,
    progress,
    duration,
    status,
    isPalying,
    handlePlay,
    onProgress,
    toastApi,
    downloadAble,
    rotate,
  } = useContext(VideoContext);

  const handleSliding = (v: number) => {
    const per = v / MAX_P;
    onProgress && onProgress(per);
  };

  const downLoad = () => {
    toastApi.loading();

    CameraMessageManager.startDownloadVideoMessageAttachmentWithUrlV1(
      {
        url: videoSource, // 附件地址（string)
        encryptKey: videoKey, // 加密key（string)
        savePath: 2, // 保存在什么地方（t.Integer）。0: 默认值，保存在手机相册。1: 保存在 App 相册。2: 同时保存到手机相册和 App 相册
        rotateMode: toRotateMode(rotate), // 旋转角度（t.Integer)，仅支持：0(正常模式，不旋转)、1(顺时针旋转90度)、2(顺时针旋转180度)、3(顺时针旋转270度)
      },
      () => {
        toastApi.success(Strings.getLang('saveSuccess'));
      },
      () => {
        toastApi.error(Strings.getLang('saveFail'));
      }
    );
  };

  const timeText = `${timeFormat(progress / 1000)} / ${timeFormat(duration / 1000)}`;

  return (
    <View style={styles.controller}>
      <TouchableOpacity style={styles.btn} onPress={handlePlay}>
        <Image
          source={isPalying ? require('../res/minpause.png') : require('../res/minstart.png')}
          style={{ height: cx(32), width: cx(32) }}
        />
      </TouchableOpacity>

      <Slider.Horizontal
        disabled={status === 'init'}
        style={{ flex: 1 }}
        maximumValue={MAX_P}
        minimumValue={MIN_P}
        stepValue={1}
        thumbStyle={{ width: cx(12), height: cx(12) }}
        trackStyle={{ height: cx(3) }}
        value={duration === 0 ? 0 : (progress / duration) * 1000}
        maximumTrackTintColor="rgba(0, 0, 0, 0.3)"
        minimumTrackTintColor="white"
        onSlidingComplete={handleSliding}
        animationType="timing"
      />

      <TYText style={styles.timeText}>{timeText}</TYText>

      {downloadAble && (
        <TouchableOpacity onPress={downLoad}>
          <Image
            source={require('../res/download.png')}
            style={{ width: cx(27), height: cx(27), marginRight: cx(16) }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    paddingHorizontal: cx(20),
    paddingVertical: cx(14),
  },
  controller: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: cx(40),
  },
  timeText: {
    color: 'white',
    fontSize: 11,
    marginHorizontal: cx(20),
  },
});

export default PlayerController;
