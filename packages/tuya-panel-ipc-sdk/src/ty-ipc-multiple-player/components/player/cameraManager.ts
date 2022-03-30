import { TYSdk } from 'tuya-panel-kit';
import Config from '../../config';
import {
  startPlay,
  pausePlay,
  disconnect,
  exitPlayPreview,
  exitPlayPreviewByAudioOrOther,
  judgeP2pISConnectedOperate,
  startTalk,
  stopTalk,
  getDeviceConfig,
  enableMute,
  enableRecording,
  isRecording,
  snapShoot,
  setScreenOrientation,
  clearEventStatus,
  stopPreview,
  gotoCloudStoragePanel,
  gotoPlaybackPanel,
  gotoAppAlbumPanel,
} from './playerManagerFunc';
import { decodeClarityDic } from '../../config/cameraData';
import { CameraManagerParams } from '../../interface';

const { isIOS, Global } = Config;

interface result {
  success: boolean;
  error?: any;
  source?: string;
}

class CameraManager {
  // 设备id
  private devId: string;

  // 设备是否在线
  // 这个值会动态变化
  private _online: boolean;

  // 是否是低功耗设备，这个值一般不变，除非设备id变化
  // 设备id变化单独处理，相当于所有流程重新走一变
  private isWirless: boolean;

  // 进入后台是否断开p2p连接
  private enterBackDisConP2P: boolean;

  // 视频清晰度
  clarity: string;

  // 隐私模式状态
  private _privateMode: boolean;

  // 主题
  private theme: number;

  private _isMute: boolean;

  private playerKey: string;

  constructor({
    devId,
    online,
    isWirless,
    enterBackDisConP2P,
    clarity,
    privateMode,
    theme,
    isMute,
    playerKey,
  }: CameraManagerParams) {
    this.devId = devId || TYSdk.devInfo.devId;
    this._online = Boolean(online);
    this.isWirless = Boolean(isWirless);
    this.enterBackDisConP2P = Boolean(enterBackDisConP2P);
    this.clarity = clarity;
    this._privateMode = Boolean(privateMode);
    this.theme = theme;
    this._isMute = isMute;
    this.playerKey = playerKey;

    this.startPlay();
  }

  // 设备在线状态
  set online(online: boolean) {
    this._online = online;
    this.startPlay();
  }

  // 隐私模式
  set privateMode(val: boolean) {
    this._privateMode = val;
    this.startPlay();
  }

  // 视频预览
  startPlay(): Promise<result> {
    return startPlay({
      privateMode: this._privateMode,
      devId: this.devId,
      playerKey: this.playerKey,
      online: this._online,
      isWirless: this.isWirless,
      definition: decodeClarityDic[this.clarity],
      isMute: this._isMute,
    });
  }

  pausePlay(): Promise<result> {
    return pausePlay({ devId: this.devId, playerKey: this.playerKey });
  }

  disconnect = (): Promise<result> => {
    return disconnect({ devId: this.devId, playerKey: this.playerKey });
  };

  exitPlayPreview(backIsNeedDisConnectP2P?: boolean): void {
    return exitPlayPreview({
      devId: this.devId,
      playerKey: this.playerKey,
      disConnectP2P:
        backIsNeedDisConnectP2P !== undefined ? backIsNeedDisConnectP2P : this.enterBackDisConP2P,
    });
  }

  exitPlayPreviewByAudioOrOther(): void {
    exitPlayPreviewByAudioOrOther({ devId: this.devId, playerKey: this.playerKey });
  }

  // timeOutTime 判定进入后台5秒后主动断开P2P
  enterBackTimeOut = (timeOutTime = 5000): void => {
    // 安卓进入后台，先立马断开,安卓rn机制如此,进入后台会停止所有的定时;
    !isIOS && this.exitPlayPreview();

    if (isIOS) {
      Global.enterBackTimeOut = setTimeout(() => {
        this.disconnect();
      }, timeOutTime);
    }
  };

  cancelEnterBackTimeOut = (): void => {
    clearTimeout(Global.enterBackTimeOut);
  };

  judgeP2pISConnectedOperate(): void {
    judgeP2pISConnectedOperate({
      devId: this.devId,
      isWirless: this.isWirless,
      online: this._online,
      playerKey: this.playerKey,
    });
  }

  // 设置对讲
  enableStartTalk(enable: boolean, isTwoTalk = false): Promise<result> {
    const param = {
      isTwoTalk,
      devId: this.devId,
      playerKey: this.playerKey,
    };

    if (enable) {
      return startTalk(param);
    }
    return stopTalk(param);
  }

  getDeviceConfig(): Promise<any> {
    return getDeviceConfig({ devId: this.devId, playerKey: this.playerKey });
  }

  // 设置静音，默认开启静音
  enableMute(enable = true): Promise<result> {
    this._isMute = enable;
    return enableMute(
      {
        devId: this.devId,
        playerKey: this.playerKey,
      },
      enable
    );
  }

  set isMute(value: boolean) {
    this._isMute = value;
  }

  // 跳转APP相册
  enterAppAlbum(): void {
    gotoAppAlbumPanel({
      extra_camera_uuid: this.devId,
      theme: this.theme,
    });
  }

  // 跳转回放
  enterPlayback(): void {
    gotoPlaybackPanel({
      extra_camera_uuid: this.devId,
      theme: this.theme,
    });
  }

  // 跳转到云存储
  enterCloud(): void {
    gotoCloudStoragePanel({
      extra_camera_uuid: this.devId,
      theme: this.theme,
    });
  }

  enableRecording(enable = true): Promise<result> {
    return enableRecording(
      {
        devId: this.devId,
        playerKey: this.playerKey,
      },
      enable
    );
  }

  changeClarity(clarity: string): Promise<result> {
    this.clarity = clarity;
    return this.startPlay();
  }

  isRecording(): Promise<boolean> {
    return isRecording({
      devId: this.devId,
      playerKey: this.playerKey,
    });
  }

  snapShoot(): Promise<result> {
    return snapShoot({
      devId: this.devId,
      playerKey: this.playerKey,
    });
  }

  setScreenOrientation(dir: 0 | 1): void {
    setScreenOrientation(
      {
        devId: this.devId,
        playerKey: this.playerKey,
      },
      dir
    );
  }

  // 清除摄像头状态：关闭录制、关闭对讲、关闭扬声器，停止预览
  closeStatusStopPreview = (): void => {
    clearEventStatus({
      devId: this.devId,
      playerKey: this.playerKey,
    });
    stopPreview({
      devId: this.devId,
      playerKey: this.playerKey,
    });
  };
}

export default CameraManager;
