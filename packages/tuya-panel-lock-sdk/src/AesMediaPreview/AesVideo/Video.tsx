import React, { useState, useEffect } from 'react';
import { View, StyleSheet, NativeEventEmitter, Image } from 'react-native';
import { Utils, TYText, RotationView } from 'tuya-panel-kit';
import { TYIpcNativeModule } from '@tuya/tuya-panel-ipc-sdk';
import { createFn, playFn, pauseFn, resumFn, stopFn, toggleMute } from './fn';
import VideoContext from './Context';
import { useToast, useRefenrence } from '../../hooks';
import AesImage from '../AesPictrue/AesImage';
import Strings from '../i18n';
import PlayerController from './Controller';
import PlayButton from './PlayButton';
import { PlayStatus, IVideoProps } from '../interface';

const { width: winWidth, convertX: cx, isIos } = Utils.RatioUtils;
const { CameraMessageManager, MessageMediaPlayer } = TYIpcNativeModule;
const emitter = new NativeEventEmitter(CameraMessageManager);
const Player = MessageMediaPlayer;

const Video = React.forwardRef<any, IVideoProps>(
  ({
    rotate = 0,
    defaultVideoHeight = cx(400),
    imageKey,
    imagePath,
    videoKey,
    videoSource,
    errorImage = <Image source={require('../res/loadError.png')} style={styles.icon} />,
    errorText = Strings.getLang('videoError'),
    onLoadImageFailed,
    onLoadImageSuccess,
    onLoadVideoFailed,
    onLoadVideoSuccess,
    downloadAble = true,
  }) => {
    const [toastElement, toastApi] = useToast();
    const [status, setStatus] = useState<PlayStatus>(PlayStatus.init);
    const [duration, setDuration] = useState<number>(0);
    const [progress, setProgress] = useState<number>(0);
    const [videoHeight, setVideoHeight] = useState<number>(defaultVideoHeight);
    const durationRef = useRefenrence(duration);
    const isPalying = status === PlayStatus.play;
    /** 旋转后是否为 水平状态 */
    const isHorizontal = rotate % 180 === 0;
    /** 根据播放器旋转的角度设置不同的宽高 */
    const playerHeight = videoHeight > winWidth ? videoHeight : winWidth;
    const palyerWidth = winWidth;

    useEffect(() => {
      const onPlayMediaVideoInfo = ({ duration: d, height: h, progress: p }: any) => {
        setDuration(d);
        setProgress(p);

        h > 0 && setVideoHeight(h);
      };

      const onPlayFinished = () => {
        setStatus(PlayStatus.finish);
        setProgress(durationRef.current);
      };

      emitter.addListener('playMediaVideoInfo', onPlayMediaVideoInfo);
      emitter.addListener('playMediaVideoFinished', onPlayFinished);

      createFn();
      return () => {
        stopFn();
        emitter.removeListener('playMediaVideoInfo', onPlayMediaVideoInfo);
        emitter.removeListener('playMediaVideoFinished', onPlayFinished);
      };
    }, []);

    const handlePlay = async () => {
      try {
        if (status === PlayStatus.init) {
          setStatus(PlayStatus.loading);
          await toggleMute(false);
          setStatus(PlayStatus.play);
          await playFn({ path: videoSource, key: videoKey, startTime: 0 });
        } else if (status === PlayStatus.pause) {
          setStatus(PlayStatus.play);
          await resumFn();
        } else if (status === PlayStatus.finish) {
          setProgress(0);
          setStatus(PlayStatus.play);
          await playFn({ path: videoSource, key: videoKey, startTime: 0 });
        } else if (status === PlayStatus.play) {
          setStatus(PlayStatus.pause);
          await pauseFn();
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      }
    };

    const onProgress = (per: number) => {
      const toTime = Math.round(per * duration);

      playFn({
        path: videoSource,
        key: videoKey,
        startTime: toTime,
      });

      setStatus(PlayStatus.play);
    };

    const videoStyle = {
      height: playerHeight,
      width: palyerWidth,
      transform: [
        { rotate: `${rotate}deg` },
        {
          /** 翻转后 通过缩放填满播放器内的黑边 */
          scaleY: isHorizontal ? 1 : winWidth / videoHeight,
        },
      ],
    };

    const showPlayer = status === PlayStatus.play || status === PlayStatus.pause;

    /** ios 加上rotateZ属性会失效 安卓要加这个 */
    const PlayerProps = isIos ? {} : { rotateZ: rotate };
    /** 展示封面图 */
    const showCoverImage = [
      PlayStatus.init,
      PlayStatus.loading,
      PlayStatus.error,
      PlayStatus.finish,
    ].includes(status);
    /** 展示播放按钮 */
    const showPlayButton = [PlayStatus.init, PlayStatus.finish, PlayStatus.pause].includes(status);

    return (
      <VideoContext.Provider
        value={{
          progress,
          duration,
          status,
          isPalying,
          emitter,
          setStatus,
          handlePlay,
          onProgress,
          toastApi,
          videoKey,
          videoSource,
          imageKey,
          imagePath,
          downloadAble,
        }}
      >
        {/* 整体高度 = 播放器高度 + 底部控制栏高度 */}
        <View style={[styles.wrapper, { height: playerHeight + 120, width: palyerWidth }]}>
          <View style={[styles.videoContainer, { height: playerHeight }]}>
            {showPlayer && (
              <Player
                {...PlayerProps}
                style={videoStyle}
                doubleClick={false}
                onLoadFail={onLoadVideoFailed}
                onLoadSuccess={onLoadVideoSuccess}
              />
            )}

            {/* 封面图 */}
            {showCoverImage && (
              <AesImage
                onLoadImageFailed={onLoadImageFailed}
                onLoadImageSuccess={onLoadImageSuccess}
                rotate={rotate}
                imagePath={imagePath}
                imageKey={imageKey}
                width={winWidth}
              />
            )}

            <View style={styles.playerCenter}>
              <PlayButton visible={showPlayButton} />

              {/* loading ｜ 错误提示 */}
              {status === PlayStatus.loading && (
                <>
                  <RotationView active duration={1000}>
                    <Image
                      source={require('../res/loading.png')}
                      style={[styles.loading, { tintColor: '#fff' }]}
                    />
                  </RotationView>

                  <TYText style={styles.loadingText}>{Strings.getLang('getVideoLoading')}</TYText>
                </>
              )}

              {status === PlayStatus.error && (
                <>
                  {errorImage}
                  <TYText style={styles.errorText}>{errorText}</TYText>
                </>
              )}
            </View>
          </View>
          {/* 底部控制栏 */}
          {status !== PlayStatus.error && <PlayerController />}
        </View>

        {toastElement}
      </VideoContext.Provider>
    );
  }
);

Video.displayName = 'VideoPlayer';

const styles = StyleSheet.create({
  errorText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
    textAlign: 'center',
  },

  icon: {
    height: cx(54),
    marginTop: cx(54),
    width: cx(54),
  },

  loading: {
    height: 30,
    width: 30,
  },

  loadingText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
    textAlign: 'center',
  },

  playerCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },

  videoContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },

  wrapper: {
    alignItems: 'center',
    backgroundColor: '#000',
    justifyContent: 'center',
    position: 'relative',
  },
});

export default Video;
