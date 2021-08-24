import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  NativeModules,
  requireNativeComponent,
  NativeEventEmitter,
} from 'react-native';
import { TYText } from 'tuya-panel-kit';
import publicConfig from '../publicConfig';
import Res from './res';
import CameraManager from '../ty-ipc-native/nativeApi';
import { getImageInfoUrl, getImageKey } from './utils';
import Strings from './i18n';
import Styles from './style';
import { TYIpcMessagePlayerProps } from './interface';

const CameraMessageManager = NativeModules.TYRCTCameraMessageManager;
const TYRCTCameraMessageManagerEmitter = new NativeEventEmitter(CameraMessageManager); // 视频播放相关事件
const { isIOS } = publicConfig;
const MediaPlayer = isIOS
  ? requireNativeComponent('TYRCTCameraMessageMediaPlayer')
  : requireNativeComponent('TYRCTCameraMessageMediaPlayerManager');

const TYIpcMessagePlayer: React.FunctionComponent<TYIpcMessagePlayerProps> & {
  defaultProps: Partial<TYIpcMessagePlayerProps>;
} = (props: TYIpcMessagePlayerProps) => {
  const [mediaPlayer, setMediaPlayer] = useState(false);

  const {
    containerStyle,
    timeBoxStyle,
    playerStyle,
    shareStyle,
    shareVideos,
    mediaUrl,
    time,
  } = props;

  useEffect(() => {
    let timer = null;
    creatPlayer();
    videoPlay({
      path: getImageInfoUrl(mediaUrl),
      key: getImageKey(mediaUrl),
    });
    // 监听视频播放结束事件
    TYRCTCameraMessageManagerEmitter.addListener('playMediaVideoFinished', () => {
      timer = setTimeout(() => {
        videoPlay({
          path: getImageInfoUrl(mediaUrl),
          key: getImageKey(mediaUrl),
        });
      }, 1000);
    });
    return () => {
      stopVideoPlay();
      TYRCTCameraMessageManagerEmitter.removeListener('playMediaVideoFinished', () => {});
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    let timer = null;
    if (!mediaUrl) {
      videoPlay({
        path: getImageInfoUrl(mediaUrl),
        key: getImageKey(mediaUrl),
      });
      // 监听视频播放结束事件
      TYRCTCameraMessageManagerEmitter.addListener('playMediaVideoFinished', () => {
        timer = setTimeout(() => {
          videoPlay({
            path: getImageInfoUrl(mediaUrl),
            key: getImageKey(mediaUrl),
          });
        }, 1000);
      });
    }
    return () => {
      clearTimeout(timer);
      TYRCTCameraMessageManagerEmitter.removeListener('playMediaVideoFinished', () => {});
      stopVideoPlay();
    };
  }, [mediaUrl]);

  // 跳转分享页面
  const goShareMediaPage = Videos => {
    CameraMessageManager.shareMedia({ mediaUrl: Videos[0], hexUrl: '', type: '3' });
  };

  // 创建媒体设备
  const creatPlayer = () => {
    CameraMessageManager.createMediaDevice(
      () => {
        setMediaPlayer(true);
      },
      () => {
        CameraManager.showTip(Strings.getLang('ty_ipc_message_player_createFailed'));
      }
    );
  };

  // 视频播放
  const videoPlay = ({ path, key }) => {
    CameraMessageManager.playMediaVideoWithPath(
      path,
      key,
      0,
      () => {},
      () => {
        CameraManager.showTip(Strings.getLang('ty_ipc_message_player_playFailed'));
      }
    );
  };

  // 停止视频播放
  const stopVideoPlay = () => {
    CameraMessageManager.stopVideoPlay(
      () => {},
      () => {}
    );
  };

  return (
    <View style={[Styles.item, containerStyle]}>
      {mediaUrl && (
        <View style={Styles.imgBox}>
          <TouchableOpacity style={[Styles.imgBox, playerStyle]} activeOpacity={0.9}>
            {mediaPlayer === true && <MediaPlayer style={Styles.img} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={Styles.shareTouch}
            activeOpacity={0.8}
            onPress={() => goShareMediaPage(shareVideos)}
          >
            <Image source={Res.share} style={[Styles.imgIcon, shareStyle]} />
          </TouchableOpacity>
          <View style={[Styles.timeBox, timeBoxStyle]}>
            <Image source={Res.photoTime} style={Styles.timImg} />
            <TYText style={Styles.timeText}>{time}</TYText>
          </View>
        </View>
      )}
    </View>
  );
};

TYIpcMessagePlayer.defaultProps = {
  shareVideos: [],
  mediaUrl: '123',
  time: '2021-07-01 17:30:50',
};

export default TYIpcMessagePlayer;
