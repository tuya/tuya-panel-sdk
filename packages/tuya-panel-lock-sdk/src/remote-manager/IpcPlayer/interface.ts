/* eslint-disable no-shadow */
export enum MODE {
  pause = 0,
  loading = 1,
  playing = 2,
  notAllowed = 3,
}

export enum MaskType {
  sleepTip = 0,
  readyToSleepTip,
  getFailed,
  noFreeTimes,
}

/** IPC视频下发的dp命令值 */
export enum IpcDpCodeSample {
  playing = '0300' /** 开始播放 */,
  freeEnd = '0202' /** 免费次数用完 */,
  stop = '0101' /** 休眠提示 停止播放 */,
  error = '0103' /** 加载失败 */,
}

export type StreamType =
  | 0 /** 设备离线 */
  | 1 /** 隐私模式 */
  | 2 /** 正在连接P2P通道 */
  | 3 /** 通道构建失败 */
  | 4 /** 正在获取视频流 */
  | 5 /** 获取视频流失败 */
  | 6 /** 正常播放 */
  | 7;

export interface InitStateType {
  /** 播放器状态模式 播放 ｜ loading ｜ 暂停 */
  mode: MODE;
  /** 声音开关 */
  voiceStatus: 'ON' | 'OFF';
  /** 是否开启蒙层 */
  maskVisible: boolean;
  /** 蒙层类型 */
  maskType: MaskType | undefined;
  /** 是否支持麦克风 */
  isSupportMic: boolean;
  /** 是否支持双向对讲 */
  isTwoWayTalk: boolean;
  /** 是否正在对讲 */
  isTalking: boolean;
  /** 视频文案 */
  audioLoadText: string;
  /** 私有模式 */
  privateMode: boolean;
  /** 清晰度 | 纯音频模式 */
  clarityStatus: 'SS' | 'SD' | 'HD' | 'SSP' | 'AUDIO';
  /** 是否开启全屏 */
  isFullScreen: boolean;
  /** 是否已开启增值服务 */
  cloudServiceStatus: boolean;
  /** 没有可用播放次数 */
  noPlayTimes: boolean;
  /** 视频缩放比例 */
  scacleRatio: number;
  /** 旋转角度 */
  rotate: number;
  /** 容器高度 */
  containerHeight: number;
  /** 是否带音频 */
  withAudio: boolean;
  /** 流加载状态 */
  streamStatus: StreamType;
  /** 开启对讲 挂起状态 */
  talkPending: boolean;
  /** 变声开关 */
  changeSound: boolean;
  /** 录制开关 */
  isRecording: boolean;
  /** 是否禁用录制 */
  disableRecord: boolean;
}

export interface IPCPlayerProps {
  /** 外层容器高度 */
  containerHeight?: number;
  /** 是否为远程开门请求 */
  isRemoteRequest?: boolean;
  /** 是否支持音频 */
  withAudio?: boolean;
  /** 是否支持双向对讲设备 */
  isSupTowTalk?: boolean;
  /** 旋转角度 */
  rotate?: number;
  /** 播放视频回调 */
  onPlay?: () => void;
  /** 设备是否在线 */
  deviceOnline: boolean;
  /** 30秒 中断视频回调 */
  onStopPlaying?: () => void;
}

export interface ActionType {
  payload?: any;
  type: string;
}

export interface IPCDpCodeType {
  requestType: 'open' | 'close'; // 请求类型
  requestContent: 'openDoor' | 'alarmModal' | 'newImage'; // 请求内容
  withAudio: boolean; // 是否带音频
  isSupportTwoMic: boolean; // 是否支持双向对讲
}

export type SupportedMicWayType = { isSupportMic: boolean };

export interface IPCReducerType {
  state: InitStateType;
  pause: () => void;
  play: () => void;
  showMask: (type: MaskType) => void;
  hideMask: () => void;
  toggleMute: () => Promise<any>;
  updateSupportedMicWay: (obj: SupportedMicWayType) => void;
  updateIsTalking: (flag: boolean) => void;
  updateVoiceStatus: (status: InitStateType['voiceStatus']) => void;
  toggleTalking: () => void;
  goToSendMoney: () => void;
  enterAlbum: () => void;
  enterCloudBack: () => void;
  updateIsFullScreen: (flag: boolean) => void;
  updateMode: (mode: MODE) => void;
  updateScacleRatio: (s: number) => void;
  updateStreamStatus: (s: StreamType) => void;
  putVideoDp: (code: IpcDpCodeSample) => void;
  toggleChangeSound: () => void;
  snapshot: () => void;
  toggleRecord: () => void;
  setRecordDisable: (disable: boolean) => void;
  updateRecordState: (isRecording: boolean) => void;
}
