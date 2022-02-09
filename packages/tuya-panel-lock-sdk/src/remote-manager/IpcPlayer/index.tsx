/* eslint-disable no-shadow */
import React, { useContext, useImperativeHandle } from 'react';
import { View, StyleSheet } from 'react-native';
import { Utils } from 'tuya-panel-kit';
import { TYIpcPlayer } from '@tuya/tuya-panel-ipc-sdk';
import PlayBtn from './PlayButton';
import Mask from './Mask';
import VideoController from './VideoController';
import useIPCReducer from './useIpcReducer';
import managerContext from '../context/managerContext';
import IPCContext from './IPCContext';
import { AesImage } from '../../AesMediaPreview';
import Mantle from '../Mantle';

import { MODE, IPCPlayerProps, StreamType, IPCReducerType } from './interface';
import Strings from '../i18n';

const { convertX: cx, width: winWidth } = Utils.RatioUtils;

const IPCPlayer = React.forwardRef<IPCReducerType, IPCPlayerProps>(
  (
    {
      containerHeight = 500,
      rotate = 0,
      onPlay,
      isSupTowTalk,
      withAudio,
      deviceOnline,
      onStopPlaying,
    },
    ref
  ) => {
    const { dpData } = useContext(managerContext);

    const IPC = useIPCReducer({
      rotate,
      withAudio,
      containerHeight: containerHeight + 70,
      isTwoWayTalk: isSupTowTalk,
      isSupportMic: withAudio,
      voiceStatus: withAudio ? 'ON' : 'OFF',
    });

    useImperativeHandle(ref, () => IPC);

    const onChangeStreamStatus = (status: StreamType) => {
      if (status === 7) IPC.updateVoiceStatus('ON');
      /** 开始播放开始计时 */
      if (status === 6) {
        IPC.updateMode(MODE.playing);
      }

      IPC.updateStreamStatus(status);
    };

    const onChangeRecording = (isRecording: boolean) => {
      IPC.updateRecordState(isRecording);
    };

    const handlePlayPress = () => {
      onPlay && onPlay();
      IPC.play();
    };

    const onChangeScreenOrientation = (isFull: any) => IPC.updateIsFullScreen(isFull);
    const onListenIsTalking = (isTalking: boolean) => IPC.updateIsTalking(isTalking);

    const showPlayer = IPC.state.mode === MODE.playing || IPC.state.mode === MODE.loading;
    const showMask =
      IPC.state.mode === MODE.playing ||
      IPC.state.mode === MODE.loading ||
      IPC.state.mode === MODE.notAllowed;

    return (
      <IPCContext.Provider value={IPC}>
        <View style={[styles.container, { height: containerHeight, width: '100%' }]}>
          {showMask && IPC.state.maskVisible && (
            <Mask onStopPlaying={onStopPlaying} type={IPC.state.maskType} />
          )}
          {IPC.state.mode === MODE.pause && (
            <>
              <AesImage
                key="poster"
                rotate={rotate}
                width={winWidth}
                imagePath={dpData.imageFiles.filePath}
                imageKey={dpData.imageFiles.fileKey}
              />
              <PlayBtn onPress={handlePlayPress} />
            </>
          )}

          {showPlayer && (
            <>
              <View style={{ flex: 1, zIndex: 999 }}>
                <TYIpcPlayer
                  key="video"
                  showTwoWayMic={false}
                  playerProps={{ rotateZ: rotate }}
                  deviceOnline={deviceOnline}
                  showCutScreen={false}
                  timerInterValStyle={{ timerContain: { top: cx(88) } }}
                  onChangeStreamStatus={onChangeStreamStatus}
                  onChangeRecording={onChangeRecording}
                  clarityStatus={IPC.state.clarityStatus}
                  voiceStatus={IPC.state.voiceStatus}
                  onListenIsTalking={onListenIsTalking}
                  scaleMultiple={IPC.state.scacleRatio}
                  showCustomRetry={IPC.state.streamStatus === 5}
                  showCustomRetryText={Strings.getLang('TYLock_retry')}
                  onChangeScreenOrientation={onChangeScreenOrientation}
                />
              </View>
              <Mantle
                style={{
                  position: 'absolute',
                  zIndex: 8888,
                  bottom: 0,
                  width: '100%',
                }}
                height={cx(88)}
                stops={{
                  '0%': 'rgba(0,0,0,0)',
                  '100%': 'rgba(0,0,0,0.4)',
                }}
              />

              <VideoController />
            </>
          )}
        </View>
      </IPCContext.Provider>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'relative',
  },
});

export default React.memo(IPCPlayer);
