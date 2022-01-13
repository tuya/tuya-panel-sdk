/* eslint-disable consistent-return */
/* eslint-disable no-console */
import { TYSdk } from 'tuya-panel-kit';
import CameraManager from './nativeApi';
import { decodeClarityDic } from './cameraData';
import Strings from '../ty-ipc-player/i18n';

const TYEvent = TYSdk.event;
/**
 * 判断P2P连接。是否connect 再去connect
 */
export const connecP2PAndStartPreview = (
  isWirless: boolean,
  clarityStatus: string,
  voiceStatus: string,
  hightScaleMode: boolean,
  reConnect: boolean,
  isBusy: boolean,
  p2pIsConnecting: boolean,
) => {
  TYEvent.emit('streamStatus', { status: 2 });
  TYEvent.emit('p2pIsConnecting', true);
  CameraManager.isConnected(msg => {
    TYEvent.emit('p2pIsConnected', Boolean(msg));
    TYEvent.emit('p2pIsConnecting', false);
    if (!msg) {
      connectAndstartPreView(isWirless, clarityStatus, voiceStatus, hightScaleMode,reConnect, isBusy, p2pIsConnecting);
    } else {
      startPreview(clarityStatus, voiceStatus, hightScaleMode, reConnect, isBusy, p2pIsConnecting);
    }
  });
};

/*
 * connect接受两个参数,成功回调函数和失败回调函数
 */
const connectAndstartPreView = (
  isWirless: boolean,
  clarityStatus: string,
  voiceStatus: string,
  hightScaleMode: boolean,
  reConnect: boolean,
  isBusy: boolean,
  p2pIsConnecting: boolean,
) => {
  if (isWirless) {
    wakeupWirless();
  }
  CameraManager.connect(
    () => {
      TYEvent.emit('p2pIsConnected', true);
      startPreview(clarityStatus, voiceStatus, hightScaleMode, reConnect, isBusy, p2pIsConnecting);
    },
    errMsg => {
      TYEvent.emit('streamStatus', { status: 3, errMsg });
    }
  );
};

/*
 * connect接受两个参数,成功回调函数和失败回调函数 // 多通道切换
 */

const connectAndstartPreViewWithChannel = (
  isWirless: boolean,
  clarityStatus: string,
  voiceStatus: string,
  hightScaleMode: boolean,
  channelNum: number
) => {
  if (isWirless) {
    wakeupWirless();
  }
  CameraManager.connect(
    () => {
      TYEvent.emit('p2pIsConnected', true);
      startPreviewWithChannel(clarityStatus, voiceStatus, hightScaleMode, channelNum);
    },
    errMsg => {
      TYEvent.emit('streamStatus', { status: 3, errMsg });
    }
  );
};

const startPreview = (clarityStatus: string, voiceStatus: string, hightScaleMode: boolean, reConnect: boolean, isBusy: boolean, p2pIsConnecting: boolean) => {
  TYEvent.emit('streamStatus', { status: 4 });
  CameraManager.startPreviewWithDefinition(
    decodeClarityDic[clarityStatus],
    () => {
      // 如果是按高适配,则延迟1秒
      if (hightScaleMode) {
        TYEvent.emit('autoAdjustViewScaleMode', '');
        setTimeout(() => {
          clarityStatus === 'AUDIO' && TYEvent.emit('streamStatus', { status: 7 });
          clarityStatus !== 'AUDIO' && TYEvent.emit('streamStatus', { status: 6 });
        }, 1000);
      } else {
        clarityStatus === 'AUDIO' && TYEvent.emit('streamStatus', { status: 7 });
        clarityStatus !== 'AUDIO' && TYEvent.emit('streamStatus', { status: 6 });
      }
      operatMute(voiceStatus);
    },
    errMsg => {
      if (reConnect && !p2pIsConnecting) {
        startPreview(clarityStatus, voiceStatus, hightScaleMode, reConnect, isBusy, p2pIsConnecting);
      } else if (isBusy) {
        TYEvent.emit('streamStatus', { status: 9, errMsg });
      } else {
        TYEvent.emit('streamStatus', { status: 5, errMsg });
      }
    }
  );
};

// channel通道切换

const startPreviewWithChannel = (
  clarityStatus: string,
  voiceStatus: string,
  hightScaleMode: boolean,
  channelNum: number
) => {
  TYEvent.emit('streamStatus', { status: 4 });
  CameraManager.stopPreview(
    () => {
      if (CameraManager.switchChannelWithChannel === undefined) {
        CameraManager.showTip(Strings.getLang('tyIpc_method_not_supported_version'));
        return false;
      }
      CameraManager.switchChannelWithChannel(
        channelNum,
        () => {
          CameraManager.startPreviewWithDefinition(
            decodeClarityDic[clarityStatus],
            () => {
              // 如果是按高适配,则延迟1秒
              if (hightScaleMode) {
                TYEvent.emit('autoAdjustViewScaleMode', '');
                setTimeout(() => {
                  TYEvent.emit('streamStatus', { status: 6 });
                }, 1000);
              } else {
                TYEvent.emit('streamStatus', { status: 6 });
              }
              operatMute(voiceStatus);
            },
            errMsg => {
              TYEvent.emit('streamStatus', { status: 5, errMsg });
            }
          );
        },
        errMsg => {
          TYEvent.emit('streamStatus', { status: 5, errMsg });
        }
      );
    },
    errMsg => {
      TYEvent.emit('streamStatus', { status: 5, errMsg });
    }
  );
};

const operatMute = (voiceStatus: string) => {
  CameraManager.enableMute(
    voiceStatus === 'OFF',
    () => {},
    () => {
      CameraManager.showTip(Strings.getLang('operatorFailed'));
    }
  );
};

/*
 * 三次唤醒低功耗设备
 */
const wakeupWirless = () => {
  CameraManager.wakeUpDoorBell();
  console.log('---->wake 1次');
  CameraManager.wakeUpDoorBell();
  console.log('---->wake 2次');
  CameraManager.wakeUpDoorBell();
  console.log('---->wake 3次');
};

/*
 *  backPlayPreview: 退出视频预览页面
 * 进入后台,暂停视频流及静音
 * @param: disConnectP2P 是否需要断开P2P连接
 *
 */

export const exitPlayPreview = (disConnectP2P = false) => {
  CameraManager.isRecording(msg => {
    if (msg) {
      CameraManager.stopRecord(
        () => {
          CameraManager.stopPreview(
            () => {},
            () => {}
          );
        },
        () => {}
      );
    } else {
      CameraManager.stopPreview(
        () => {},
        () => {}
      );
    }
  });

  CameraManager.isTalkBacking(msg => {
    if (msg) {
      CameraManager.stopTalk(
        () => {},
        () => {}
      );
    }
  });
  CameraManager.isMuting(msg => {
    if (!msg) {
      CameraManager.enableMute(
        true,
        () => {},
        () => {}
      );
    }
  });
  TYEvent.emit('isRecordingListen', {
    isRecording: false,
  });

  TYEvent.emit('isTalkingListen', {
    isTalking: false,
  });

  if (disConnectP2P) {
    CameraManager.disconnect();
    TYEvent.emit('p2pIsConnected', false);
  }
};

// 针对音频模式及特殊面板要求 从预览界面进入后台,不断开音视频流的
export const exitPlayPreviewByAudioOrOther = () => {
  CameraManager.isRecording(msg => {
    if (msg) {
      CameraManager.stopRecord(
        () => {},
        () => {}
      );
    }
  });
  CameraManager.isTalkBacking(msg => {
    if (msg) {
      CameraManager.stopTalk(
        () => {},
        () => {}
      );
    }
  });
  TYEvent.emit('isRecordingListen', {
    isRecording: false,
  });

  TYEvent.emit('isTalkingListen', {
    isTalking: false,
  });
};

export const judgeP2pISConnectedOperate = (isWirles: boolean, deviceOnline: boolean) => {
  if (!deviceOnline) {
    return false;
  }
  CameraManager.isConnected(msg => {
    // 如果是低功耗先对其进行唤醒
    if (!msg) {
      //  store.dispatch(p2pIsConnected({ p2pIsConnected: false }));
      if (isWirles) {
        wakeupWirless();
      }
      CameraManager.connect(
        () => {
          // store.dispatch(p2pIsConnected({ p2pIsConnected: true }));
        },
        () => {}
      );
    }
  });
};

export const getAuduioType = () => {
  CameraManager.isSupportedTalk(result => {
    if (result) {
      CameraManager.supportedAudioMode(msg => {
        if (msg === 1) {
          // 有对讲
          TYEvent.emit('supportedAudioMode', { isSupportMic: true, isTwoWayTalk: false });
        } else if (msg === 2) {
          // 有对讲
          TYEvent.emit('supportedAudioMode', { isSupportMic: true, isTwoWayTalk: true });
        }
      });
    } else {
      TYEvent.emit('supportedAudioMode', { isSupportMic: false });
    }
  });
};

// 断开P2P连接
export const disconnect = () => {
  CameraManager.disconnect();
};

// 获取摄像头配置信息
export const getConfigCameraInfo = () => {
  CameraManager.obtainCameraConfigInfo(result => {
    TYEvent.emit('getCameraConfig', result);
  });
};

// 通道视频流切换
export const connecP2PAndStartPreviewWithChannel = (
  isWirless: boolean,
  clarityStatus: string,
  voiceStatus: string,
  hightScaleMode: boolean,
  channelNum: number
) => {
  TYEvent.emit('streamStatus', { status: 2 });
  CameraManager.isConnected(msg => {
    TYEvent.emit('p2pIsConnected', Boolean(msg));
    if (!msg) {
      connectAndstartPreViewWithChannel(
        isWirless,
        clarityStatus,
        voiceStatus,
        hightScaleMode,
        channelNum
      );
    } else {
      startPreviewWithChannel(clarityStatus, voiceStatus, hightScaleMode, channelNum);
    }
  });
};
