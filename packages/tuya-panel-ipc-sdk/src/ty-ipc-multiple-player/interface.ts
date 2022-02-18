/* eslint-disable @typescript-eslint/no-empty-function */
import { ViewStyle, Dimensions } from 'react-native';
import Res from './res';
import Strings from './i18n';
import CameraManager from './components/player/cameraManager';

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
const _defaultTwoMicStyle = {
  topFullPage: {},
  topNormalPage: {},
  tipBox: {},
  textTip: {},
};

export interface CameraManagerParams {
  devId: string;
  online: boolean;
  isWirless?: boolean;
  enterBackDisConP2P?: boolean;
  clarity: string;
  privateMode?: boolean;
  theme: number;
  isMute: boolean;
  playerKey: string;
}

export interface commonParams {
  devId: string;
  playerKey: string;
}

export interface device {
  online: boolean;
  isWirless: boolean;
  definition: number;
  privateMode: boolean;
  isMute: boolean;
}

export interface goNativePageParam {
  // eslint-disable-next-line camelcase
  extra_camera_uuid: string;
  theme: number;
}

export const multipleCameraManager = CameraManager;

export interface StateParams {
  devId: string;
  showLoading: boolean;
  loadText: string;
  retryText: string;
  showRetry: boolean;
  videoStatus: number;
  showAnimation: boolean;
  playerWidth: number;
  playerHeight: number;
  isTalking: boolean;
  isFullScreen: boolean;
  isRecording: boolean;
  isTwoWayTalk: boolean;
  baseImg: string;
  isVideoCut: boolean;
}

export interface devicePower {
  isSupportedTalk: boolean;
  isSupportedSound: boolean;
  isSupportedCloudStorage: boolean;
  supportedAudioMode: number;
  videoClarity: string; // 默认清晰度
  videoClaritys: string[]; // 可切换的清晰度
  maxZoomInTimes: number;
}

export interface TYIpcMultiplePlayerProps {
  devId: string;
  style: ViewStyle;
  isOnPlayerPage: boolean;
  isWirless: boolean;
  privateMode: boolean;
  deviceOnline: boolean;
  defaultClarity: 'SS' | 'SD' | 'HD' | 'UD' | 'SSP' | 'AUDIO';
  isShareDevice: boolean;
  defaultMute: boolean;
  fullPlayerWidth: number;
  fullPlayerHeight: number;
  renderNormalComArr: Array<ComProvider>;
  renderFullComArr: Array<ComProvider>;
  // 隐藏全屏菜单
  hideFullMenu: boolean;
  stopFullAnim: boolean;
  showCutScreen: boolean;
  cutStyle: CutStyle;
  showOneWayMic: boolean;
  micTalkImage: number;
  micTalkImageStyle: any;
  showTwoWayMic: boolean;
  showTimeInterval: boolean;
  timerInterValStyle: TimerInterValStyle;
  twoMicStyle: TwoMicStyle;
  playerLoadParam: PlayerLoad;
  rockerDirections: RockerDirect;
  showCustomVideoLoad: boolean;
  showCustomVideoText: string;
  showCustomRetry: boolean;
  showCustomRetryText: string;
  enterBackDisConP2P: boolean;
  playerProps: PlayerProps;
  backIsNeedDisConnectP2P: boolean;
  screenOrientation: number;
  theme: 1 | 2;
  getDeviceConfigInfo: (data: devicePower) => void;
  reConnect?: () => any;
  onChangeMute: (status: boolean) => any;
  onChangeStreamStatus: (status: number, errMsg?: any) => any;
  onChangeScreenOrientation: (dir: number) => any;
  onChangeRecording: (isRecording: boolean, source: string) => any;
  onFullScreenTapView: (hideFullMenu: boolean) => any;
  onNormalScreenTapView: () => any;
  onRetryConnect?: () => any;
  onChangeTalking?: (data: any) => any;
  onListenSessionDisConnect: () => void;
  onListenRetryClick?: () => void;
  pressEnterAlbum?: () => any;
  enterBackgroundEvent: () => any;
  enterForegroundEvent: () => any;
}

export const _defaultProps = {
  isOnPlayerPage: true,
  theme: 2,
  hightScaleMode: false,
  isWirless: false,
  privateMode: false,
  defaultClarity: 'HD',
  isShareDevice: false,
  hideFullMenu: false,
  stopFullAnim: false,
  defaultMute: false,
  onChangeMute: (): void => {},
  onChangeRecording: (): void => {},
  onFullScreenTapView: (): void => {},
  onNormalScreenTapView: (): void => {},
  onChangeTalking: (): void => {},
  onChangeScreenOrientation: (): void => {},
  onListenSessionDisConnect: (): void => {},
  showCutScreen: true,
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
  audioLoadText: Strings.getLang('tyIpc_audio_only'),
  enterBackDisConP2P: true,
  playerProps: {
    showZoomInTimes: false,
    maxScaleMultiple: 6,
  },
  backIsNeedDisConnectP2P: true,
  enterBackgroundEvent: (): void => {},
  enterForegroundEvent: (): void => {},
  getDeviceConfigInfo: (): void => {},
  screenOrientation: 0,
  fullPlayerWidth: Math.round(Dimensions.get('window').height),
  fullPlayerHeight: Math.round(Dimensions.get('window').width),
  onChangeStreamStatus: (): void => {},
  reConnect: (): void => {},
};
