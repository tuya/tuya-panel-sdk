import { useReducer, useEffect, useContext } from 'react';
import { NativeModules } from 'react-native';
import { TYIpcNative } from '@tuya/tuya-panel-ipc-sdk';
import { TYSdk } from 'tuya-panel-kit';
import Strings from '../i18n';
import ManagerContext from '../context/managerContext';
import {
  getCloudServiceStatus,
  setCurrentMonthViewCount,
  getCurrentMonthViewCount,
  hasTheAbilityOfAudioInVideo,
} from '../api';
import { getRechargeUrl, delayCall } from '../utils';

import {
  InitStateType,
  ActionType,
  MODE,
  IPCReducerType,
  IpcDpCodeSample,
  MaskType,
  SupportedMicWayType,
  StreamType,
} from './interface';

const { TYRCTCameraManager, TYRCTMultiCameraManager } = NativeModules;

const CHANGE_MODE = 'CHANGE_MODE';
const CHANGE_VOICE_STATUS = 'CHANGE_VOICE_STATUS';
const CHANGE_MASK_VISIBLE = 'CHANGE_MASK_VISIBLE';
const CHANGE_SUPPORT_MICWAY = 'CHANGE_SUPPORT_MICWAY';
const CHANGE_ISTALKING = 'CHANGE_ISTALKING';
const CHANGE_AUDIO_TEXT = 'CHANGE_AUDIO_TEXT';
const CHANGE_PRIVATE_MODE = 'CHANGE_PRIVATE_MODE';
const CHANGE_CLARITY_STATUS = 'CHANGE_CLARITY_STATUS';
const CHANGE_ISFULLSCREEN = 'CHANGE_ISFULLSCREEN';
const CHANGE_CLOUDSERVICE_STATUS = 'CHANGE_CLOUDSERVICE_STATUS';
const CHANGE_NOPLAYTIMES = 'CHANGE_NOPLAYTIMES';
const CHANGE_SCACLERATIO = 'CHANGE_SCACLERATIO';
const CHANGE_STREAMSTATUS = 'CHANGE_STREAMSTATUS';
const CHANGE_WITHAUDIO = 'CHANGE_WITHAUDIO';
const CHANGE_TALKING_PENDING = 'CHANGE_TALKING_PENDING';
const CHANGE_CHANGESOUND_SWITCH = 'CHANGE_CHANGESOUND_SWITCH';
const CHANGE_RECORD_MODE = 'CHANGE_RECORD_MODE';
const CHANGE_RECORD_DISABLE = 'CHANGE_RECORD_DISABLE';

function reducer(state: InitStateType, action: ActionType): InitStateType {
  switch (action.type) {
    case CHANGE_MODE:
      return { ...state, mode: action.payload };
    case CHANGE_VOICE_STATUS:
      return { ...state, voiceStatus: action.payload };
    case CHANGE_MASK_VISIBLE:
      return { ...state, maskVisible: action.payload?.visible, maskType: action.payload?.type };
    case CHANGE_SUPPORT_MICWAY:
      return {
        ...state,
        isSupportMic: action.payload?.isSupportMic,
      };
    case CHANGE_ISTALKING:
      return { ...state, isTalking: action.payload };
    case CHANGE_AUDIO_TEXT:
      return { ...state, audioLoadText: action.payload };
    case CHANGE_PRIVATE_MODE:
      return { ...state, privateMode: action.payload };
    case CHANGE_CLARITY_STATUS:
      return { ...state, clarityStatus: action.payload };
    case CHANGE_ISFULLSCREEN:
      return { ...state, isFullScreen: action.payload };
    case CHANGE_CLOUDSERVICE_STATUS:
      return { ...state, cloudServiceStatus: action.payload };
    case CHANGE_NOPLAYTIMES:
      return { ...state, noPlayTimes: action.payload };
    case CHANGE_SCACLERATIO:
      return { ...state, scacleRatio: action.payload };
    case CHANGE_STREAMSTATUS:
      return { ...state, streamStatus: action.payload };
    case CHANGE_WITHAUDIO:
      return { ...state, withAudio: action.payload };
    case CHANGE_TALKING_PENDING:
      return { ...state, talkPending: action.payload };
    case CHANGE_CHANGESOUND_SWITCH:
      return { ...state, changeSound: action.payload };
    case CHANGE_RECORD_MODE:
      return { ...state, isRecording: action.payload };
    case CHANGE_RECORD_DISABLE:
      return { ...state, disableRecord: action.payload };
    default:
      return state;
  }
}

const defaultState: InitStateType = {
  mode: MODE.pause,
  voiceStatus: 'OFF',
  maskVisible: false,
  maskType: undefined,
  isSupportMic: false,
  isTwoWayTalk: false,
  isTalking: false,
  audioLoadText: '',
  privateMode: false,
  clarityStatus: 'SSP',
  isFullScreen: false,
  cloudServiceStatus: false,
  noPlayTimes: false,
  scacleRatio: -2,
  rotate: 0,
  containerHeight: 500,
  withAudio: false,
  streamStatus: 0,
  talkPending: false,
  changeSound: false,
  isRecording: false,
  disableRecord: false,
};

const toRotateMode = (rotate: number) => {
  const rotateMap = {
    0: 0,
    90: 1,
    180: 2,
    270: 3,
  };

  return rotateMap[rotate];
};

const useIPCReducer = (initState: Partial<InitStateType> = {}): IPCReducerType => {
  const { modal, countTime, toastApi, options } = useContext(ManagerContext);
  const [state, dispatch] = useReducer(reducer, { ...defaultState, ...initState });
  const updateState = (type: string, payload: any) => dispatch({ type, payload });

  useEffect(() => {
    if (countTime === 30) {
      /** 如果视频没开始播放就不提示了 */
      if (state.streamStatus === 6) {
        showMask(MaskType.sleepTip);
      } else if (state.mode !== MODE.playing && state.mode !== MODE.pause) {
        /** 30 秒未开始正常播放就下发错误dp 关闭弹窗 */
        putVideoDp(IpcDpCodeSample.error);

        modal.errorClose();
      }
    }
    /** 55 秒后进入休眠提示 */
    if (countTime === 5) {
      showMask(MaskType.readyToSleepTip);
    }
  }, [countTime]);

  useEffect(() => {
    // 云能力判断，如果云能力不支持音频关闭音频功能，否则按照dp上报的处理
    hasTheAbilityOfAudioInVideo().then(withAudio => {
      if (!withAudio) {
        updateState(CHANGE_WITHAUDIO, withAudio);
        updateState(CHANGE_VOICE_STATUS, 'OFF');
      }
    });

    /** 播放次数限制 */
    Promise.all([getCloudServiceStatus(), getCurrentMonthViewCount()]).then(result => {
      // 是否购买了增值服务
      const hasBuyCloudService = result[0] === 'running';
      // 当月播放次数
      const currentMthViewCount = result[1].count || 0;
      // 最多观看次数
      const maxViewCount = hasBuyCloudService ? 1000 : 50;
      updateState(CHANGE_CLOUDSERVICE_STATUS, hasBuyCloudService);
      if (currentMthViewCount >= maxViewCount) {
        updateState(CHANGE_NOPLAYTIMES, true);
      }
    });
  }, []);

  /** 开启或关闭静音 */
  const toggleMute = async () => {
    const status = state.voiceStatus === 'OFF' ? 'ON' : 'OFF';
    const { success } = (await TYIpcNative.enableMute(status)) as any;

    if (success) updateState(CHANGE_VOICE_STATUS, status);
  };

  /** 开启或关闭对讲 */
  const toggleTalking = () => {
    updateState(CHANGE_TALKING_PENDING, true);
    /** ipc组件没暴露错误码，自己调 sdk 获取 */
    const testStartTalk = () => {
      try {
        TYRCTCameraManager.startTalk(
          () => {
            updateState(CHANGE_TALKING_PENDING, false);
            TYSdk.event.emit('isTalkingListen', { isTalking: true });
          },
          (e: any) => {
            updateState(CHANGE_TALKING_PENDING, false);
            TYSdk.event.emit('isTalkingListen', { isTalking: false });
            const srr = JSON.stringify(e);
            // eslint-disable-next-line no-console
            console.log('srr', srr);
            if (e.code === 'ECOM.IPC.TUYA-20007') {
              TYRCTCameraManager.showTip(Strings.getLang('TYLock_startTalkFailed_busy'));
            } else {
              TYRCTCameraManager.showTip(Strings.getLang('TYLock_operate_failed'));
            }
          }
        );
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
        updateState(CHANGE_TALKING_PENDING, false);
        if (!state.isTwoWayTalk) updateVoiceStatus('ON');
      }
    };
    if (!state.isTalking) {
      // TYIpcNative.enableStartTalk(state.isTwoWayTalk);
      testStartTalk();
      // 不支持双向对讲 关闭外放声音
      if (!state.isTwoWayTalk) updateVoiceStatus('OFF');
    } else {
      TYIpcNative.enableStopTalk(state.isTwoWayTalk);
      updateState(CHANGE_TALKING_PENDING, false);
      if (!state.isTwoWayTalk) updateVoiceStatus('ON');
    }
  };

  /** 去充值 */
  const goToSendMoney = () => {
    getRechargeUrl()
      .then((h5Url: string) => {
        TYIpcNative.gotoHybridContainer(h5Url);
      })
      .catch(() => {
        TYIpcNative.showToast(Strings.getLang('TYLock_request_failed'));
      });
  };

  /** 更新缩放比例 */
  const updateScacleRatio = (s: number) => updateState(CHANGE_SCACLERATIO, s);
  /** 下发视频Dp命令 */
  const putVideoDp = (code: IpcDpCodeSample) => {
    TYSdk.device.putDeviceData({ video_request_realtime: code });
  };
  /** 开启遮罩弹窗 */
  const showMask = (type: MaskType) => updateState(CHANGE_MASK_VISIBLE, { visible: true, type });
  /** 开启或关闭全屏 */
  const updateIsFullScreen = (flag: boolean) => updateState(CHANGE_ISFULLSCREEN, flag);
  /** 关闭遮罩弹窗 */
  const hideMask = () => updateState(CHANGE_MASK_VISIBLE, false);
  /** 变更对讲支持状态 */
  const updateSupportedMicWay = (obj: SupportedMicWayType) =>
    updateState(CHANGE_SUPPORT_MICWAY, obj);
  /** 对讲状态 */
  const updateIsTalking = (flag: boolean) => updateState(CHANGE_ISTALKING, flag);

  /** 播放 */
  const play = () => {
    if (!state.noPlayTimes) {
      setCurrentMonthViewCount();
      putVideoDp(IpcDpCodeSample.playing);
      updateState(CHANGE_MODE, MODE.loading);
    } else {
      putVideoDp(IpcDpCodeSample.freeEnd);
      showMask(MaskType.noFreeTimes);
      updateState(CHANGE_MODE, MODE.notAllowed);
    }
  };

  /** 普通原生相册页面	 */
  const enterAlbum = () => TYIpcNative.enterAlbum();
  /** 普通原生云存储页面	 */
  const enterCloudBack = () => TYIpcNative.enterCloudBack();
  /** 暂停 */
  const pause = () => updateState(CHANGE_MODE, MODE.pause);
  /** 更新播放器状态 */
  const updateMode = (mode: MODE) => updateState(CHANGE_MODE, mode);
  /** 开启关闭声音 */
  const updateVoiceStatus = (status: InitStateType['voiceStatus']) =>
    updateState(CHANGE_VOICE_STATUS, status);
  /** 更新流加载状态 */
  const updateStreamStatus = (s: StreamType) => updateState(CHANGE_STREAMSTATUS, s);

  /** 变声开关 */
  const toggleChangeSound = () => updateState(CHANGE_CHANGESOUND_SWITCH, !state.changeSound);

  /** 截屏 */
  const snapshot = () => {
    TYRCTMultiCameraManager.snapShoot(
      {
        devId: TYSdk.devInfo.devId,
        saveToAlbum: false,
        rotateMode: toRotateMode(options.rotate),
      },
      () => {
        toastApi?.success(Strings.getLang('TYLock_snapshot_success'));
      },
      () => {
        TYIpcNative.showToast('TYLock_snapshot_failed');
      }
    );
  };

  /** 录屏 */
  const toggleRecord = () => {
    /** 点击录屏 3s 内不能关闭 */
    if (!state.isRecording) {
      updateState(CHANGE_RECORD_DISABLE, true);

      delayCall(() => {
        updateState(CHANGE_RECORD_DISABLE, false);
      }, 3000);
    }

    /** ipc 组件不支持保存到手机相册，先用 App 提供的 sdk 实现 */
    TYRCTMultiCameraManager.isRecording(
      {
        devId: TYSdk.devInfo.devId,
      },
      isRecording => {
        if (isRecording) {
          TYRCTMultiCameraManager.stopRecord(
            {
              devId: TYSdk.devInfo.devId,
            },
            imgSource => {
              TYSdk.event.emit('cutScreenListen', {
                showCutScreen: true,
                isVideoCut: true,
                imageSrc: imgSource,
              });
              toastApi?.success(Strings.getLang('TYLock_record_success'));
              TYSdk.event.emit('isRecordingListen', {
                isRecording: false,
              });
            },
            () => {
              TYSdk.event.emit('isRecordingListen', {
                isRecording: false,
              });
              toastApi.error(Strings.getLang('TYLock_record_failed'));
            }
          );
        } else {
          TYRCTMultiCameraManager.startRecord(
            {
              devId: TYSdk.devInfo.devId,
              saveToAlbum: false,
              rotateMode: toRotateMode(options.rotate),
            },
            () => {
              TYSdk.event.emit('isRecordingListen', {
                isRecording: true,
              });
            },
            err => {
              console.error(err);
              TYSdk.event.emit('isRecordingListen', {
                isRecording: true,
              });
            }
          );
        }
      }
    );

    // TYIpcNative.enableRecord().then((data: any) => {
    //   const { success, isSaveErr } = data;
    //   if (!success && isSaveErr) {
    //     // 表示保存出错
    //     toastApi.error(Strings.getLang('TYLock_record_failed'));
    //   } else if (!success && !isSaveErr) {
    //     // 表示启用出错
    //     toastApi.error(Strings.getLang('TYLock_operate_failed'));
    //   } else if (state.isRecording) {
    //     toastApi?.success(Strings.getLang('TYLock_record_success'));
    //   }
    // });
  };

  /** 更新录制状态 */
  const updateRecordState = (isRecord: boolean) => {
    updateState(CHANGE_RECORD_MODE, isRecord);
  };

  /** 设置录制开关禁用状态 */
  const setRecordDisable = (disable: boolean) => {
    updateState(CHANGE_RECORD_DISABLE, disable);
  };

  return {
    state,
    play,
    toggleMute,
    toggleTalking,
    goToSendMoney,
    pause,
    enterAlbum,
    enterCloudBack,
    updateMode,
    showMask,
    updateIsFullScreen,
    hideMask,
    updateSupportedMicWay,
    updateIsTalking,
    updateVoiceStatus,
    updateScacleRatio,
    updateStreamStatus,
    putVideoDp,
    toggleChangeSound,
    snapshot,
    toggleRecord,
    setRecordDisable,
    updateRecordState,
  };
};

export default useIPCReducer;
