/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prefer-promise-reject-errors */
import { TYSdk } from 'tuya-panel-kit';
import CameraManager from '../../native/multiCameraManager';
import { messageEmit } from '../../utils/util';
import Global from '../../config/global';
import NativeCameraManager from '../../native/cameraManager';
import TYRCTOrientationManager from '../../native/tyrctOrientationManager';
import { commonParams, device, goNativePageParam } from '../../interface';

interface result {
  success: boolean;
  error?: any;
  source?: string;
}

export const startPlay = async (params: commonParams & device): Promise<result> => {
  const { online, privateMode } = params;
  /* 返回状态进行定义
     status:  0: 设备离线 1: 隐私模式 2: 正在连接P2P通道 3: 通道构建失败 4: 正在获取视频流 5: 获取视频流失败 6: 正常播放 7.音频模式
  */
  if (!online) {
    messageEmit(params.playerKey + params.devId, 'streamStatus', { status: 0 });

    return {
      success: true,
    };
  }

  if (privateMode) {
    return startPrivateMode(params);
  }

  return connectP2PAndStartPreview(params);
};

// 开启隐私模式
const startPrivateMode = (params: commonParams) => {
  clearEventStatus(params);
  messageEmit(params.playerKey + params.devId, 'streamStatus', { status: 1 });

  return disconnect(params);
};

// 清除摄像头状态：录制、对讲、扬声器
export const clearEventStatus = (param: commonParams): void => {
  enableMute(param, true);

  talkingAndCloseTalk(param);

  enableRecording(param, false);
};

/**
 * 判断P2P连接。是否connect 再去connect
 */
export const connectP2PAndStartPreview = async (params: commonParams & device): Promise<result> => {
  const isConnect = await isConnected(params);
  if (!isConnect) {
    messageEmit(params.playerKey + params.devId, 'streamStatus', { status: 2 });
    return connectAndStartPreView(params);
  }

  return startPreview(params);
};

/*
 * connect接受三个参数,成功回调函数和失败回调函数
 */
export const connectAndStartPreView = async (params: commonParams & device): Promise<result> => {
  if (params.isWirless) {
    wakeUpWirless(params);
  }

  const res = await p2pConnect(params);
  if (res.success) {
    return startPreview(params);
  }

  return { success: true };
};

/**
 * 暂停预览，不断开p2p连接
 */
export const pausePlay = (params: commonParams): Promise<result> => {
  return stopPreview(params);
};

/*
  断开P2P
*/
export const disconnect = (params: commonParams): Promise<result> => {
  return new Promise(resolve => {
    CameraManager.disconnect(params);
    messageEmit(params.playerKey + params.devId, 'p2pIsConnected', { status: false });
    resolve({ success: true });
  });
};

/**
 * 停止预览，并断开p2p连接
 */
export const stopPreviewAndDisconnect = async (
  params: commonParams & { disConnectP2P?: boolean }
): Promise<result | void> => {
  const res = await stopPreview(params);
  if (res.success && params.disConnectP2P) disconnect(params);
};

/*
 *  backPlayPreview: 退出视频预览页面
 * 进入后台,暂停视频流及静音
 * @param: disConnectP2P 是否需要断开P2P连接
 *
 */
export const exitPlayPreview = (param: commonParams & { disConnectP2P?: boolean }): void => {
  clearEventStatus(param);
  stopPreviewAndDisconnect(param);
};

// 针对音频模式及特殊面板要求 从预览界面进入后台,不断开音视频流
export const exitPlayPreviewByAudioOrOther = (params: commonParams): void => {
  enableRecording(params, false);
  talkingAndCloseTalk(params);
};

export const wakeUpWirless = (param: commonParams): void => {
  CameraManager.wakeUpDoorBell(param);
  CameraManager.wakeUpDoorBell(param);
  CameraManager.wakeUpDoorBell(param);
};

export const judgeP2pISConnectedOperate = async (
  param: commonParams & {
    isWirless: boolean;
    online: boolean;
  }
  // eslint-disable-next-line consistent-return
): Promise<result> => {
  const { devId, isWirless, online, playerKey } = param;

  if (!online) {
    return { success: false };
  }

  try {
    const isConnect = await isConnected({ devId, playerKey });
    if (!isConnect) {
      if (isWirless) {
        wakeUpWirless({ devId, playerKey });
      }

      return p2pConnect({ devId, playerKey }, false);
    }
  } catch (err) {
    return { success: false };
  }
};

interface talkParam extends commonParams {
  isTwoTalk: boolean;
}

/*
    开启对讲
    @param
  */
export const startTalk = async (
  params: talkParam
): Promise<{ success: boolean; isMute: boolean; error?: any }> => {
  const { devId, isTwoTalk } = params;
  // 双向对讲，关闭静音
  const muteRes = await enableMute(params, !isTwoTalk);

  return new Promise(resolve => {
    CameraManager.startTalk(
      { devId },
      () => {
        // console.log('开启对讲');
        messageEmit(params.playerKey + params.devId, 'talking', { status: true });
        resolve({ success: true, isMute: muteRes.success });
      },
      (err: any) => {
        messageEmit(params.playerKey + params.devId, 'talking', { status: false });

        resolve({
          success: false,
          isMute: muteRes.success,
          error: err,
        });
      }
    );
  });
};

/**
 * 关闭对讲
 * @param params
 * @returns
 */

export const stopTalk = async (
  params: talkParam
): Promise<{ success: boolean; isMute: boolean; error?: any }> => {
  const { isTwoTalk } = params;
  let muteRes = { success: true };
  // 单项对讲，关闭静音
  if (!isTwoTalk) muteRes = await enableMute(params, true);

  return new Promise(resolve => {
    // 关闭对讲
    CameraManager.stopTalk(
      params,
      () => {
        // console.log('关闭对讲');
        messageEmit(params.playerKey + params.devId, 'talking', { status: false });
        resolve({ success: true, isMute: !muteRes.success });
      },
      (err: any) => {
        resolve({ success: false, isMute: !muteRes.success, error: err });
      }
    );
  });
};

// export const previewAndMute = (param: isMute) => {

// }

/**
 * 设置静音
 * @param params
 * @param enable 是否开启静音
 * @param mutual 是否是因状态互斥，主动开启静音
 * @returns
 */

export const enableMute = async (
  params: commonParams,
  enable = true,
  mutual = false
): Promise<{ success: boolean; error?: any }> => {
  const mute = await isMuting(params);
  // mute=true enable=false 关闭静音
  // mute=false enable=true 开启静音

  const name = `${params.playerKey}${params.devId}`;
  let _mute: boolean | undefined;
  if ((mute && !enable) || (!mute && enable)) {
    _mute = enable;
  }

  // 判断其他设备声音是否开启，若开启，状态推送关闭
  let closeObj: any;
  if (_mute !== undefined && !_mute) {
    const statusKeys = Object.keys(Global.deviceStatusStore);

    for (let i = 0; i < statusKeys.length; i++) {
      const key: string = statusKeys[i];
      if (!Global.deviceStatusStore[key].mute && key !== name) {
        closeObj = Global.deviceStatusStore[key];

        break;
      }
    }
    if (closeObj) {
      await enableMute(
        {
          devId: closeObj.devId,
          playerKey: closeObj.playerKey,
        },
        true,
        true
      );
    }
  }

  return new Promise(resolve => {
    if (_mute !== undefined) {
      CameraManager.enableMute(
        {
          mute: _mute,
          ...params,
        },
        () => {
          Global.deviceStatusStore[name].mute = Boolean(_mute);

          if (mutual) {
            messageEmit(name, 'isMuteMutual', { status: enable });
          } else {
            messageEmit(name, 'isMute', { status: enable });
          }

          resolve({
            success: true,
          });
        },
        (err: any) => {
          messageEmit(name, 'isMute', { status: !enable });
          resolve({
            success: false,
            error: err,
          });
        }
      );
    } else {
      resolve({ success: true });
    }
  });
};
interface devicePower {
  isSupportedTalk: boolean;
  isSupportedSound: boolean;
  isSupportedCloudStorage: boolean;
  supportedAudioMode: number;
  videoClarity: number; // 默认清晰度
  videoClaritys: number[]; // 可切换的清晰度
  maxZoomInTimes: number;
}

/**
 * 获取设备能力支持情况
 */
export const getDeviceConfig = (params: commonParams): Promise<devicePower> => {
  return new Promise(resolve => {
    const key = [
      'isSupportedTalk', // 是否支持对讲
      'isSupportedSound', // 是否支持拾音器
      'isSupportedCloudStorage', // 是否支持云存储
      'supportedAudioMode', // 当前支持对讲模式：0 未知；1：单向对讲；2：双向对讲
      'obtainCameraConfigInfo', // 获取设备 config 信息. 不包含 password, p2pConfig, p2pId 这三个字段
    ];
    const param = {
      query: key.join(','),
      ...params,
    };

    CameraManager.obtainCameraConfig(
      param,
      (res: devicePower) => {
        resolve(res);
      },
      () => {
        resolve({
          isSupportedTalk: false,
          isSupportedSound: false,
          isSupportedCloudStorage: false,
          supportedAudioMode: 1,
          videoClarity: 2, // 默认清晰度
          videoClaritys: [], // 可切换的清晰度
          maxZoomInTimes: 8, // 最大缩放倍数
        });
      }
    );
  });
};

/**
 * 当前是否对讲中
 */
export const isTalkBacking = (params: commonParams): Promise<boolean> => {
  return new Promise(resolve => {
    CameraManager.isTalkBacking(params, (msg: boolean) => {
      resolve(msg);
    });
  });
};

/**
 * 当前是否静音
 */
export const isMuting = (params: commonParams): Promise<boolean> => {
  return new Promise(resolve => {
    CameraManager.isMuting(params, (msg: boolean) => {
      resolve(msg);
    });
  });
};

/**
 * 对讲中，关闭对讲
 */
export const talkingAndCloseTalk = (params: commonParams): void => {
  isTalkBacking(params).then((isTalking: boolean) => {
    if (isTalking)
      stopTalk({
        ...params,
        isTwoTalk: true,
      });
  });
};

/**
 * p2p连接
 */
export const p2pConnect = (
  params: commonParams,
  inform = true
): Promise<{ success: boolean; error?: any; status?: boolean | number }> => {
  return new Promise(resolve => {
    CameraManager.connect(
      params,
      () => {
        // console.log('p2p连接成功');
        if (inform)
          messageEmit(params.playerKey + params.devId, 'p2pIsConnected', { status: true });
        resolve({
          success: true,
        });
      },
      (error: any) => {
        // console.log('p2p连接失败');
        if (inform)
          messageEmit(params.playerKey + params.devId, 'streamStatus', { status: 3, error });
        resolve({ success: false, error });
      }
    );
  });
};

/**
 * 视频预览
 */
export const startPreview = (
  params: commonParams & device
): Promise<{ success: boolean; error?: any }> => {
  messageEmit(params.playerKey + params.devId, 'streamStatus', { status: 4 });
  const { isMute } = params;

  return new Promise(resolve => {
    CameraManager.startPreview(
      params,
      () => {
        messageEmit(params.playerKey + params.devId, 'streamStatus', { status: 6 });
        enableMute(params, isMute);
        resolve({ success: true });
      },
      (error: any) => {
        messageEmit(params.playerKey + params.devId, 'streamStatus', { status: 5, error });

        resolve({ success: false, error });
      }
    );
  });
};

/**
 * 停止预览
 */
export const stopPreview = (params: commonParams): Promise<{ success: boolean; error?: any }> => {
  return new Promise(resolve => {
    CameraManager.stopPreview(
      params,
      () => {
        // 停止预览
        messageEmit(params.playerKey + params.devId, 'streamStatus', { status: 8 });

        resolve({
          success: true,
        });
      },
      (err: any) => {
        resolve({
          success: false,
          error: err,
        });
      }
    );
  });
};

/**
 * p2p是否已连接
 */
export const isConnected = (params: commonParams, inform = true): Promise<boolean> => {
  return new Promise(resolve => {
    CameraManager.isConnected({ devId: params.devId }, (msg: boolean | string) => {
      inform &&
        messageEmit(params.playerKey + params.devId, 'p2pIsConnected', { status: Boolean(msg) });
      resolve(Boolean(msg));
    });
  });
};

/**
 * 开启录制
 */
export const startRecord = (param: commonParams): Promise<result> => {
  return new Promise(resolve => {
    // saveToAlbum=true 保存到APP相册 会返回文件路径
    // saveToAlbum=false 保存到系统相册 不会返回文路径 ios系统无法直接跳转到系统相册
    CameraManager.startRecord(
      { ...param, saveToAlbum: true },
      () => {
        messageEmit(param.playerKey + param.devId, 'recording', { status: true });

        resolve({
          success: true,
        });
      },
      (err: any) => {
        messageEmit(param.playerKey + param.devId, 'recording', {
          status: false,
          error: err,
        });
        resolve({
          success: false,
          error: err,
        });
      }
    );
  });
};

/**
 * 停止录制
 */
export const stopRecord = (param: commonParams): Promise<result> => {
  return new Promise(resolve => {
    CameraManager.stopRecord(
      param,
      (source: string) => {
        messageEmit(param.playerKey + param.devId, 'recording', {
          status: false,
          source,
        });
        resolve({
          success: true,
          source,
        });
      },
      (err: any) => {
        messageEmit(param.playerKey + param.devId, 'recording', {
          status: false,
          error: err,
        });

        resolve({
          success: false,
          error: err,
        });
      }
    );
  });
};

/**
 * 是否录制中
 */
export const isRecording = (param: commonParams, isEmit = false): Promise<boolean> => {
  return new Promise(resolve => {
    CameraManager.isRecording(param, (msg: boolean) => {
      isEmit &&
        messageEmit(param.playerKey + param.devId, 'recording', {
          status: false,
        });

      resolve(msg);
    });
  });
};

/**
 * 录制
 */
export const enableRecording = async (param: commonParams, enable = true): Promise<result> => {
  const recording = await isRecording(param);
  // 开启录制
  if (enable && !recording) {
    return startRecord(param);
  }
  // 关闭录制
  if (!enable && recording) {
    return stopRecord(param);
  }

  return {
    success: false,
  };
};

export const showTip = (text: string): void => {
  if (!text) return;
  NativeCameraManager.showTip(text);
};

/**
 * 进入回放
 */
export const enterPlayBack = (param: commonParams): void => {
  CameraManager.gotoCameraNewPlaybackPanel(param);
};
/**
 * 进入云存储
 */
export const enterCloudBack = (param: commonParams): void => {
  CameraManager.gotoCloudStoragePanel(param);
};

/**
 * 截屏
 */
export const snapShoot = (param: commonParams): Promise<result> => {
  return new Promise(resolve => {
    CameraManager.snapShoot(
      { ...param, saveToAlbum: true },
      (msg: string) => {
        messageEmit(param.playerKey + param.devId, 'screenshot', {
          status: true,
          source: msg,
        });

        resolve({
          success: true,
          source: msg,
        });
      },
      (err: any) => {
        messageEmit(param.playerKey + param.devId, 'screenshot', {
          status: false,
        });
        resolve({
          success: false,
          error: JSON.stringify(err),
        });
      }
    );
  });
};

// 非摄像头品类的产品，旋转屏幕使用方法需初始化
TYSdk.devInfo.category !== 'sp' &&
  TYRCTOrientationManager &&
  TYRCTOrientationManager.supportedOrientations &&
  TYRCTOrientationManager.supportedOrientations(['portrait', 'landscape-right']);

/*
     横竖屏切换
  */
export const setScreenOrientation = (param: commonParams, dir: 0 | 1): void => {
  if (TYSdk.devInfo.category === 'sp') {
    NativeCameraManager.setScreenOrientation(dir);
  } else {
    TYRCTOrientationManager &&
      TYRCTOrientationManager.lockOrientation &&
      TYRCTOrientationManager.lockOrientation(dir === 1 ? 'landscape-right' : 'portrait');
  }
  messageEmit(param.playerKey + param.devId, 'screenOrientation', {
    status: true,
    isFullScreen: Boolean(dir),
  });
};

// 跳转原生页面
export const goToAppPage = (url: string, param: Record<string, unknown>): void => {
  const paramStr = Object.keys(param).map(key => `${key}=${param[key]}`);
  TYSdk.native.jumpTo(`tuyaSmart://${url}?${paramStr.join('&')}`);
};

// 云存储
export const gotoCloudStoragePanel = (param: goNativePageParam): void => {
  CameraManager.gotoCloudStoragePanel(param);
};

// 回放
export const gotoPlaybackPanel = (param: goNativePageParam): void => {
  CameraManager.gotoPlaybackPanel(param);
};

// APP相册
export const gotoAppAlbumPanel = (param: goNativePageParam): void => {
  CameraManager.gotoAppAlbumPanel(param);
};
