/* eslint-disable @typescript-eslint/no-empty-function */
import Res from './res';
import TYIpcPlayerManager from '../ty-ipc-native';
import Strings from './i18n';

interface ComProvider {
  component: any;
  propData?: any;
}

interface PlayerLoad {
  playerLoadContainer: any;
  fullBackIconContainer: any;
  fullBackImg?: any;
  fullBackImgStyle: any;
  loadAnimBoxStyle: any;
  loadingAnimBgImg?: number;
  loadingAnimBgImgStyle: any;
  loadingAnimImg?: number;
  loadingAnimImgStyle: any;
  loadingTextStyle: any;
  reTryTextStyle: any;
}
interface AudioLoadParam {
  audioTextStyle: any;
  audioLoadContainer: any;
  fullBackIconContainer: any;
  fullBackImg?: any;
  fullBackImgStyle: any;
}
interface PlayerProps {
  showZoomInTimes: boolean;
  maxScaleMultiple: number;
  [propname: string]: any;
}
interface RockerDirect {
  rockerEnabled: false;
  up: false;
  left: false;
  down: false;
  right: false;
  showIndicator: false;
}

interface CutStyle {
  containerStyle: any;
  descTxtStyle: any;
  albumBox: any;
  albumTxt: any;
}

interface TimerInterValStyle {
  timerPageFull: any;
  timerPageNormal: any;
  timerContain: any;
  dotStyle: any;
  timeStyle: any;
}

interface TwoMicStyle {
  topFullPage: any;
  topNormalPage: any;
  tipBox: any;
  textTip: any;
}

interface initStatus {
  isMuting: boolean;
  isRecording: boolean;
  isTalkBacking: boolean;
  isHDOn: boolean;
}

const _defaultPlayerLoad = {
  playerLoadContainer: {},
  fullBackIconContainer: {},
  fullBackImgStyle: {},
  loadAnimBoxStyle: {},
  loadingAnimBgImgStyle: {},
  loadingAnimImgStyle: {},
  loadingTextStyle: {},
  reTryTextStyle: {},
};

const _defaultRockerDirect = {
  rockerEnabled: false,
  up: false,
  left: false,
  down: false,
  right: false,
  showIndicator: false,
};

const _defaultCutStyle = {
  containerStyle: {},
  descTxtStyle: {},
  albumBox: {},
  albumTxt: {},
};

const _defaultTimerInterValStyle = {
  timerPageFull: {},
  timerPageNormal: {},
  timerContain: {},
  dotStyle: {},
  timeStyle: {},
};

const _defaultZoomInTimesStyle = {};

const _defaultTwoMicStyle = {
  topFullPage: {},
  topNormalPage: {},
  tipBox: {},
  textTip: {},
};

const _defaultAudioLoadParam = {
  audioLoadContainer: {},
  audioTextStyle: {},
};

export interface TYIpcPlayerProps {
  action: number;
  hightScaleMode: boolean;
  onChangePreview: () => void;
  isWirless: boolean;
  privateMode: boolean;
  deviceOnline: boolean;
  clarityStatus: 'SS' | 'SD' | 'HD' | 'UD' | 'SSP' | 'AUDIO';
  voiceStatus: 'OFF' | 'ON';
  isShareDeveice: boolean;
  reConnect: () => any;
  onChangeStreamStatus: (status: number, errMsg?: any) => any;
  onChangeScreenOrientation: (isFullScreen: boolean) => any;
  onChangeZoomStatus?: (zoomStatus: any) => any;
  // 如进入前台, 从Rn页面返回才会主动触发, 横竖屏转换, 必传
  onChangeActiveZoomStatus: (zoomStatus: number) => any;
  onChangeRecording: (isRecording: boolean) => any;
  initStatus: (initStatusObj: initStatus) => any;
  zoomStatus: number;
  isFullScreen: boolean;
  fullPlayerWidth: number;
  fullPlayerHeight: number;
  renderNormalComArr: Array<ComProvider>;
  renderFullComArr: Array<ComProvider>;
  // 隐藏全屏菜单
  hideFullMenu: boolean;
  stopFullAnim: boolean;
  onFullScreenTapView: (hideFullMenu: boolean) => any;
  onNormalScreenTapView: () => any;
  onRetryConnect?: () => any;
  onChangeSupportedMicWay?: (data: any) => any;
  onListenTalkingChangeMute?: (data: any) => any;
  onListenIsTalking?: (data: any) => any;
  onListenSessionDisConnect?: () => void;
  onListenRetryClick?: () => void;
  getCloudCameraConfig: (data: any) => any;
  showCutScreen: boolean;
  pressEnterAlbum?: () => any;
  cutStyle: CutStyle;
  showOneWayMic: boolean;
  micTalkImage: number;
  micTalkImageStyle: any;
  showTwoWayMic: boolean;
  showTimeInterval: boolean;
  timerInterValStyle: TimerInterValStyle;
  twoMicStyle: TwoMicStyle;
  dot: any;
  timeStyle: any;
  playerLoadParam: PlayerLoad;
  // 3.19
  rockerDirections: RockerDirect;
  showCustomVideoLoad: boolean;
  showCustomVideoText: string;
  showCustomRetry: boolean;
  showCustomRetryText: string;
  channelNum: number;
  scaleMultiple: undefined | number;
  audioLoadParam: AudioLoadParam;
  audioLoadText: string;
  enterBackDisConP2P: boolean;
  playerProps: PlayerProps;
  backIsNeedDisConnectP2P: boolean;
  zoomInTimesStyle: any;
  enterBackgroundEvent: () => any;
  enterForegroundEvent: () => any;
  activeConnect: 'none' | 'connect' | 'startPreview';
  notNeedJudgeConnectForeground: boolean;
}

export const _defaultProps = {
  hightScaleMode: false,
  isWirless: false,
  privateMode: false,
  clarityStatus: 'HD',
  voiceStatus: 'OFF',
  isShareDeveice: false,
  isFullScreen: false,
  hideFullMenu: false,
  stopFullAnim: false,
  onChangeRecording: (): void => {},
  onFullScreenTapView: (): void => {},
  onNormalScreenTapView: (): void => {},
  onChangeSupportedMicWay: (): void => {},
  onListenTalkingChangeMute: (): void => {},
  onListenIsTalking: (): void => {},
  getCloudCameraConfig: (): void => {},
  showCutScreen: true,
  pressEnterAlbum: (): void => {
    TYIpcPlayerManager.enterAlbum();
  },
  cutStyle: _defaultCutStyle,
  showOneWayMic: true,
  micTalkImage: Res.fullInterComMic,
  micTalkImageStyle: {},
  showTwoWayMic: true,
  showTimeInterval: true,
  timerInterValStyle: _defaultTimerInterValStyle,
  twoMicStyle: _defaultTwoMicStyle,
  playerLoadParam: _defaultPlayerLoad,
  rockerDirections: _defaultRockerDirect,
  showCustomVideoLoad: false,
  showCustomVideoText: '',
  showCustomRetry: false,
  showCustomRetryText: '',
  channelNum: -1,
  scaleMultiple: undefined,
  audioLoadParam: _defaultAudioLoadParam,
  audioLoadText: Strings.getLang('tyIpc_audio_only'),
  enterBackDisConP2P: true,
  playerProps: {
    showZoomInTimes: false,
    maxScaleMultiple: 6,
  },
  backIsNeedDisConnectP2P: true,
  zoomInTimesStyle: _defaultZoomInTimesStyle,
  enterBackgroundEvent: (): void => {},
  enterForegroundEvent: (): void => {},
  activeConnect: 'connect',
  notNeedJudgeConnectForeground: false,
};
