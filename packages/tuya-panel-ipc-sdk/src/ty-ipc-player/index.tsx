/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable react/sort-comp */
/* eslint-disable react/no-deprecated */
import React from 'react';
import { View, BackHandler, AppState, UIManager, DeviceEventEmitter } from 'react-native';
import _ from 'lodash';
import { TYSdk } from 'tuya-panel-kit';
import TYIpcPlayerManager from '../ty-ipc-native';
import {
  judgeP2pISConnectedOperate,
  getAuduioType,
  exitPlayPreview,
  getConfigCameraInfo,
} from '../ty-ipc-native/nativeManager';
import NativePlayer from './nativePlayer';
import Strings from './i18n';
import Config from './config';
import { enterBackTimeOut, cancelEnterBackTimeOut, enterBackTimeOutSpecial } from './utils';
import styles from './styles';
import PlayerLoad from './components/playerLoad';
import CutScreen from './components/cutScreen';
import OneWayMic from './components/oneWayMic';
import TwoWayMic from './components/twoWayMic';
import TimeInterval from './components/timeInterval';
import AudioOnlyMode from './components/audioOnlyMode';
import ZoomInTimes from './components/zoomInTimes';
import { TYIpcPlayerProps, _defaultProps } from './interface';
import { videoLoadText } from '../ty-ipc-native/cameraData';

const { normalPlayerWidth, normalPlayerHeight, isIOS } = Config;
if (!isIOS && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const TYEvent = TYSdk.event;
const TYNative = TYSdk.native;
const TYDevice = TYSdk.device;
interface TYIpcPlayerState {
  loadText: string;
  showLoading: boolean;
  playerWidth: number;
  playerHeight: number;
  showAnimation: boolean;
  showRetry: boolean;
  retryText: string;
  cameraAction: number;
  nativePage: number;
  isTalking: boolean;
  isTwoWayTalk: boolean;
  isRecording: boolean;
  videoStatus: number;
  zoomVideoStatus: number;
  currentVideoScale: number;
  currentScaleStatus: number;
}

class TYIpcPlayer extends React.Component<TYIpcPlayerProps, TYIpcPlayerState> {
  static defaultProps = _defaultProps;
  backPressListener: any;
  foregroundListener: any;
  goToBack: boolean;
  backgroundListener: any;
  onLivePage: any;
  zoomFreeListener: any;
  enterPhoneBackgroundListener: any;
  fullScreenPlayerClickListener: any;
  prevP2PConnect: boolean;
  fromH5PageListener: any;
  sessionDidDisconnectedListener: any;
  wirlessFlag: boolean;
  p2pListener: any;
  isFirstJudgeP2p: boolean;
  otherRnPage: boolean;
  props: any;
  currentScaleStatus: number;
  constructor(props: TYIpcPlayerProps) {
    super(props);
    this.state = {
      cameraAction: 0,
      nativePage: 0,
      showLoading: true,
      loadText: Strings.getLang('tyIpc_video_channel_connecting'),
      // 展示加载动画
      showAnimation: true,
      showRetry: false,
      // 点击重试
      retryText: '',
      playerWidth: normalPlayerWidth,
      playerHeight: normalPlayerHeight,
      isTalking: false,
      isTwoWayTalk: false,
      isRecording: false,
      videoStatus: -1,
      zoomVideoStatus: props.scaleMultiple === undefined ? 0 : props.scaleMultiple,
      // 记录App 推送的比例及当前视频播放比例
      currentScaleStatus: -1,
      currentVideoScale: 1,
    };
    this.goToBack = false;
    this.onLivePage = true;
    this.prevP2PConnect = false;
    this.wirlessFlag = false;
    this.isFirstJudgeP2p = true;
    this.otherRnPage = false;
  }

  componentWillMount() {
    TYEvent.on('streamStatus', this.getStreamStatus);
    TYEvent.on('changeCameraAction', this.getCameraAction);
    TYEvent.on('screenOrientation', this.getScreenOrientation);
    TYEvent.on('jumptoRnPage', this.listenJumptoRnPage);
    TYEvent.on('backLivePreview', this.listenBackLivePreview);
    TYEvent.on('isTalkingListen', this.listenIsTalking);
    TYEvent.on('talkingChangeMute', this.listenTalkingChangeMute);
    TYEvent.on('isRecordingListen', this.listenIsRecording);
    TYEvent.on('p2pIsConnected', this.listenP2PIsConnected);
    TYEvent.on('supportedAudioMode', this.supportedAudioMode);
    TYEvent.on('deviceDataChange', this.dpChange);
    TYEvent.on('autoAdjustViewScaleMode', this.autoAdjustViewScaleMode);
    TYEvent.on('getCameraConfig', this.getCameraConfig);
    TYEvent.on('isEnterRnPage', this.jugeIsEnterRnPage);
    TYEvent.on('activeChangeScale', this.activeChangeScale);
    TYIpcPlayerManager.startPlay(
      this.props.isWirless,
      this.props.privateMode,
      this.props.deviceOnline,
      this.props.clarityStatus,
      this.props.voiceStatus,
      this.props.hightScaleMode,
      this.props.channelNum
    );
    // 进入前台
    // const listen = new NativeEventEmitter(NativeModules.TYRCTCameraManager);
    this.foregroundListener = DeviceEventEmitter.addListener('enterForegroundEvent', () => {
      const {
        isWirless,
        privateMode,
        deviceOnline,
        clarityStatus,
        voiceStatus,
        hightScaleMode,
        channelNum,
      } = this.props;
      this.initStatus();
      this.resetMulScaleWithBefore();
      if (this.goToBack && !this.otherRnPage) {
        this.onLivePage = true;
        let sendNativePage = 0;
        let sendCameraAction = 0;
        const { nativePage } = this.state;
        nativePage === 1 && ((sendNativePage = 0), (sendCameraAction = 2));
        nativePage === 2 && ((sendNativePage = 0), (sendCameraAction = 0));
        // 从设置页面返回到预览界面

        nativePage === 4 && ((sendNativePage = 0), (sendCameraAction = 5), getAuduioType());
        this.setState({
          cameraAction: sendNativePage,
          nativePage: sendCameraAction,
        });
        TYIpcPlayerManager.startPlay(
          isWirless,
          privateMode,
          deviceOnline,
          clarityStatus,
          voiceStatus,
          hightScaleMode,
          channelNum
        );
      }
      this.goToBack = false;
    });

    this.backgroundListener = DeviceEventEmitter.addListener('enterBackgroundEvent', () => {
      this.goToBack = true;
      this.onLivePage = false;
      const { enterBackDisConP2P, showCutScreen } = this.props;
      // 先不将此事件开放出去
      // this.props.addListenerEnterBackgroundEvent();
      if (showCutScreen) {
        TYEvent.emit('hideScreenListen', {});
      }

      if (!enterBackDisConP2P) {
        TYIpcPlayerManager.exitPlayPreviewSpecial();
      } else {
        TYIpcPlayerManager.backPlayPreview(enterBackDisConP2P);
      }
    });
    // Android 返回键退出全屏
    this.backPressListener = BackHandler.addEventListener('hardwareBackPress', () => {
      const { isFullScreen } = this.props;
      if (isFullScreen) {
        TYIpcPlayerManager.setScreenOrientation(0);
        return true;
      }
      return false;
    });
    // 监听全屏时屏幕点击事件
    this.fullScreenPlayerClickListener = DeviceEventEmitter.addListener('didTapVideoView', () => {
      const { isFullScreen, hideFullMenu } = this.props;
      if (isFullScreen) {
        this.props.onFullScreenTapView(!hideFullMenu);
      } else {
        this.props.onNormalScreenTapView();
      }
    });
    // 监听视频播放展示为按宽还是按高
    this.zoomFreeListener = DeviceEventEmitter.addListener('zoomFree', (value: any) => {
      const { zoomStatus, scaleStatus, currentVideoScale } = value;
      const { scaleMultiple } = this.props;
      // if (isFullScreen) {
      //   return false;
      // }
      const sendStatus = scaleMultiple === undefined ? zoomStatus : scaleStatus;
      this.props.onChangeZoomStatus &&
        scaleMultiple === undefined &&
        this.props.onChangeZoomStatus(sendStatus);
      if (this.props.onChangeZoomStatus && scaleMultiple !== undefined) {
        this.setState({
          currentScaleStatus: scaleStatus,
          currentVideoScale,
        });
        this.props.onChangeZoomStatus({ scaleStatus, currentVideoScale });
      }
    });
    // 安卓3.18监听进入后台的事件
    this.enterPhoneBackgroundListener = DeviceEventEmitter.addListener(
      'enterPhoneBackground',
      value => {
        // 这个事件安卓和ios都有提供，但安卓和ios 实现逻辑不一样
        const { isForeground } = value;
        const { enterBackDisConP2P } = this.props;
        if (!enterBackDisConP2P && !isForeground) {
          enterBackTimeOutSpecial();
        }
        // 判定安卓进入后台
        !isForeground && !isIOS && enterBackDisConP2P && enterBackTimeOut();
        // 进入前台, 清除定时
        if (isForeground && !isIOS) {
          cancelEnterBackTimeOut();
        }
        // 针对安卓从原生界面返回，判定P2p有没有连接，低功耗进行唤醒
        if (isForeground && !this.onLivePage && !isIOS) {
          const { isWirless, deviceOnline } = this.props;
          judgeP2pISConnectedOperate(isWirless, deviceOnline);
        }
      }
    );
    // 从原生H5页面返回
    this.fromH5PageListener = DeviceEventEmitter.addListener('backFromActivityBrowser', () => {
      // 购买成功后的监听
      TYEvent.emit('backFromH5Page', '');
    });

    // p2p流
    this.p2pListener = DeviceEventEmitter.addListener('p2pConnect', value => {
      this.setState({
        showLoading: true,
        loadText: Strings.getLang('tyIpc_video_channel_connect_fail'),
        showRetry: true,
        // 点击重试
        retryText: Strings.getLang('tyIpc_video_stream_retry'),
      });
      exitPlayPreview();
    });
    // session断开，提示网络错误
    this.sessionDidDisconnectedListener = DeviceEventEmitter.addListener(
      'sessionDidDisconnected',
      () => {
        // 对于隐私模式为false或undefined时对session处理, 隐私模式为true时不做处理
        const { privateMode: privateModeState } = this.props;
        if (!privateModeState) {
          this.setState({
            showLoading: true,
            loadText: Strings.getLang('tyIpc_net_err'),
            showRetry: true,
            // 点击重试
            retryText: Strings.getLang('tyIpc_video_stream_retry'),
          });
        }
        // 低功耗session断开并且进入面板有上报低功耗休眠false
        if (this.wirlessFlag) {
          const {
            isWirless,
            privateMode,
            deviceOnline,
            clarityStatus,
            voiceStatus,
            hightScaleMode,
            channelNum,
          } = this.props;
          TYIpcPlayerManager.startPlay(
            isWirless,
            privateMode,
            deviceOnline,
            clarityStatus,
            voiceStatus,
            hightScaleMode,
            channelNum
          );
          return false;
        }
        this.props.onListenSessionDisConnect && this.props.onListenSessionDisConnect();
        // session断开和进入后台调用同样的逻辑
        exitPlayPreview();
      }
    );

    // ios使用Rn本身提供的检测进入手机应用后台
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps: TYIpcPlayerProps) {
    // 隐私模式和设备在线变更监听 重新拉流
    const { privateMode, deviceOnline, zoomStatus, channelNum, scaleMultiple } = this.props;
    if (
      !_.isEqual(privateMode, nextProps.privateMode) ||
      !_.isEqual(deviceOnline, nextProps.deviceOnline) ||
      !_.isEqual(channelNum, nextProps.channelNum)
    ) {
      TYIpcPlayerManager.startPlay(
        nextProps.isWirless,
        nextProps.privateMode,
        nextProps.deviceOnline,
        nextProps.clarityStatus,
        nextProps.voiceStatus,
        nextProps.hightScaleMode,
        nextProps.channelNum
      );
    }

    if (!_.isEqual(zoomStatus, nextProps.zoomStatus)) {
      this.setState({
        zoomVideoStatus: nextProps.zoomStatus,
      });
    }
    if (!_.isEqual(scaleMultiple, nextProps.scaleMultiple)) {
      this.setState({
        zoomVideoStatus: nextProps.scaleMultiple,
      });
    }
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.isFullScreen) {
      if (nextProps.fullPlayerWidth < nextProps.fullPlayerHeight) {
        return false;
      }
    }
    return true;
  }

  componentWillUnmount() {
    TYEvent.off('streamStatus', this.getStreamStatus);
    TYEvent.off('changeCameraAction', this.getCameraAction);
    TYEvent.off('screenOrientation', this.getScreenOrientation);
    TYEvent.off('jumptoRnPage', this.listenJumptoRnPage);
    TYEvent.off('backLivePreview', this.listenBackLivePreview);
    TYEvent.off('isTalkingListen', this.listenIsTalking);
    TYEvent.off('talkingChangeMute', this.listenTalkingChangeMute);
    TYEvent.off('isRecordingListen', this.listenIsRecording);
    TYEvent.off('p2pIsConnected', this.listenP2PIsConnected);
    TYEvent.off('deviceDataChange', this.dpChange);
    TYEvent.off('autoAdjustViewScaleMode', this.autoAdjustViewScaleMode);
    TYEvent.off('getCameraConfig', this.getCameraConfig);
    TYEvent.off('isEnterRnPage', this.jugeIsEnterRnPage);
    TYEvent.off('activeChangeScale', this.activeChangeScale);
    AppState.removeEventListener('change', this.handleAppStateChange);
    this.foregroundListener.remove();
    this.backPressListener.remove();
    this.backgroundListener.remove();
    this.zoomFreeListener.remove();
    this.enterPhoneBackgroundListener.remove();
    this.fullScreenPlayerClickListener.remove();
    this.fromH5PageListener.remove();
    this.p2pListener.remove();
    this.sessionDidDisconnectedListener.remove();
    // 退出视频预览界面
    const { backIsNeedDisConnectP2P } = this.props;
    TYIpcPlayerManager.backPlayPreview(backIsNeedDisConnectP2P);
  }

  // 还原设置视频缩放比例值
  resetMulScaleWithBefore = (value?: number) => {
    let sendStatus = this.state.currentScaleStatus;
    const { currentVideoScale } = this.state;
    // 等于0表示还原为按宽
    // 等于1表示按高传-2
    if (value === 0) {
      sendStatus = -1;
    } else if (value === 1) {
      sendStatus = -2;
    } else if (sendStatus === -1) {
      sendStatus = -1;
    } else if (sendStatus === -2) {
      sendStatus = -2;
    } else {
      sendStatus = currentVideoScale + Math.random() / 100;
    }
    this.props.onChangeActiveZoomStatus &&
      this.props.onChangeActiveZoomStatus({ zoomStatus: sendStatus });
  };

  // 获取视频播放比例值
  getRealPlayerScale = (isFullScreen, zoomVideoStatus, playerProps) => {
    // showZoomInTimes 为需要在全屏自己编写全屏比例放大功能时添加
    if (isFullScreen && isIOS && !playerProps.showZoomInTimes) {
      return -2;
    }
    return zoomVideoStatus;
  };

  jugeIsEnterRnPage = (value: boolean) => {
    this.otherRnPage = value;
  };

  activeChangeScale = () => {
    this.props.onChangeActiveZoomStatus &&
      this.props.onChangeActiveZoomStatus({ zoomStatus: this.state.currentScaleStatus });
  };

  dpChange = (data: any) => {
    const changedp = data.payload;
    // 进入到面板中,低功耗产品上报休眠
    if (changedp.wireless_awake === false) {
      // 上报有休眠
      this.wirlessFlag = true;
    }
  };

  autoAdjustViewScaleMode = () => {
    const { scaleMultiple } = this.props;
    setTimeout(() => {
      this.setState({
        zoomVideoStatus: scaleMultiple !== undefined ? -2 : 1,
      });
    }, 0);
  };

  getCameraConfig = (data: any) => {
    this.props.getCloudCameraConfig(data);
  };

  listenJumptoRnPage = data => {
    const { onLivePage } = data;
    this.onLivePage = onLivePage;
  };

  listenBackLivePreview = () => {
    this.setState({
      showLoading: true,
      loadText: Strings.getLang('tyIpc_re_connect_stream'),
    });
    this.resetMulScaleWithBefore();
    this.onLivePage = true;
    const {
      isWirless,
      privateMode,
      deviceOnline,
      clarityStatus,
      voiceStatus,
      hightScaleMode,
      channelNum,
    } = this.props;
    TYIpcPlayerManager.startPlay(
      isWirless,
      privateMode,
      deviceOnline,
      clarityStatus,
      voiceStatus,
      hightScaleMode,
      channelNum
    );
  };

  // 推送是否在对讲
  listenIsTalking = (data: { isTalking: boolean }) => {
    const { isTalking } = data;
    this.setState({
      isTalking,
    });
    this.props.onListenIsTalking(isTalking);
  };

  // 推送在对讲中切换声音 单向对讲时 需喇叭静音 结束对讲 喇叭开启  双向对讲时 需喇叭开启 结束开启
  listenTalkingChangeMute = (data: { voiceStatus: 'OFF' | 'ON' }) => {
    const { voiceStatus } = data;
    this.props.onListenTalkingChangeMute(voiceStatus);
  };

  // 推送是否在录像
  listenIsRecording = (data: any) => {
    const { isRecording } = data;
    this.setState({
      isRecording,
    });
    this.props.onChangeRecording(isRecording);
  };

  // P2P连接之后,推送是否支持对讲, 以及正确对讲方式
  supportedAudioMode = data => {
    const { isTwoWayTalk } = data;
    this.setState({
      isTwoWayTalk: Boolean(isTwoWayTalk),
    });
    this.props.onChangeSupportedMicWay(data);
  };

  listenP2PIsConnected = p2pContent => {
    if (this.prevP2PConnect !== p2pContent && p2pContent) {
      // 首次P2P连接,判断正确的对讲方式
      getAuduioType();
      getConfigCameraInfo();
    }
    this.prevP2PConnect = p2pContent;
  };

  changeZoomInTimes = (scaleStatues: number) => {
    this.props.onChangeActiveZoomStatus({ zoomStatus: scaleStatues });
  };

  handleAppStateChange = nextAppState => {
    // 表示手机应用滑到后台,统一断开disconenct, 安卓和ios差异限制, 安卓立即断开,ios5秒后断开
    const { enterBackDisConP2P, isWirless, deviceOnline } = this.props;
    if (nextAppState === 'background' && !enterBackDisConP2P) {
      enterBackTimeOutSpecial();
    }
    nextAppState === 'background' && isIOS && enterBackDisConP2P && enterBackTimeOut();

    nextAppState === 'active' && isIOS && cancelEnterBackTimeOut();
    // 进入前台，判定是否处于预览页面,如果处于预览页面，不做处理, 如果不处于预览页面,判定P2P是否连接，如若未连接，进行连接P2P,如若已连接，则忽略，目的是返回预览界面,可以快速出流
    nextAppState === 'active' &&
      isIOS &&
      !this.onLivePage &&
      judgeP2pISConnectedOperate(isWirless, deviceOnline);
  };

  // 获取cameraAction
  getCameraAction = (data: { action: number; nativePage: number }) => {
    this.setState({
      cameraAction: data.action,
      nativePage: data.nativePage,
    });
  };

  getScreenOrientation = (data: { isFullScreen: number }) => {
    const { isFullScreen } = data;
    const sendData = Boolean(isFullScreen);
    if (isIOS) {
      sendData ? TYNative.disablePopGesture() : TYNative.enablePopGesture();
    }
    if (sendData) {
      this.resetMulScaleWithBefore(1);
    } else {
      this.resetMulScaleWithBefore(0);
    }
    this.props.onChangeScreenOrientation(sendData);
  };

  getStreamStatus = (data: { status: number; errMsg?: any }) => {
    const { status, errMsg } = data;
    const { clarityStatus } = this.props;
    // 监听到视频流获取的状态变化,将视频流状态
    let showLoading = true;
    let showRetry = false;
    let showAnimation = true;
    const loadText =
      clarityStatus === 'AUDIO'
        ? Strings.getLang('tyIpc_audio_stream_geting')
        : videoLoadText[status];
    let retryText = Strings.getLang('tyIpc_video_stream_retry');
    // 是否为分享设备
    const { isShareDeveice } = this.props;

    (status === 6 || status === 7) && (showLoading = false);
    // 如果是非分享设备,且状态为隐私模式时,有点击重试选项
    if (!isShareDeveice && status === 1) {
      showRetry = true;
    }

    status === 0 && (showAnimation = false);

    status === 1 &&
      ((retryText = Strings.getLang('tyIpc_private_mode_sleep_close')), (showAnimation = false));

    if (status === 3 || status === 5) {
      showRetry = true;
    }

    this.setState({
      showLoading,
      loadText,
      showRetry,
      retryText,
      videoStatus: status,
      showAnimation,
    });
    this.props.onChangeStreamStatus(status, errMsg);
  };

  onChangePreview = () => {};

  _onLayout = (e: any) => {
    const { width, height } = e.nativeEvent.layout;
    this.setState({
      playerWidth: Math.round(width),
      playerHeight: Math.round(height),
    });
  };

  // 点击重试按钮封装
  reConnect = () => {
    // 当外部有传入connect函数时,调用外部方法
    if (this.props.onRetryConnect) {
      this.props.onRetryConnect();
    } else {
      const {
        isWirless,
        privateMode,
        deviceOnline,
        clarityStatus,
        voiceStatus,
        hightScaleMode,
        channelNum,
      } = this.props;
      const { videoStatus } = this.state;
      // 表示隐私模式
      if (videoStatus === 1) {
        this.setState({
          showLoading: true,
          showRetry: false,
          loadText: Strings.getLang('tyIpc_re_connect_stream'),
          showAnimation: true,
        });
        TYDevice.putDeviceData({
          basic_private: false,
        });
        return false;
      }

      this.props.onListenRetryClick && this.props.onListenRetryClick();
      TYIpcPlayerManager.startPlay(
        isWirless,
        privateMode,
        deviceOnline,
        clarityStatus,
        voiceStatus,
        hightScaleMode,
        channelNum
      );
    }
  };

  // 静音状态、录制状态、对讲状态、是否高清四个状态在每一次进入前台时将状态暴露出去
  initStatus = () => {
    this.props.initStatus &&
      TYIpcPlayerManager.initStatus().then((data: any) => {
        this.props.initStatus(data);
      });
  };

  render() {
    const {
      cameraAction,
      playerWidth,
      playerHeight,
      showLoading,
      loadText,
      showAnimation,
      showRetry,
      retryText,
      isTalking,
      isTwoWayTalk,
      isRecording,
      zoomVideoStatus,
      videoStatus,
      currentVideoScale,
    } = this.state;
    const {
      isFullScreen,
      fullPlayerWidth,
      fullPlayerHeight,
      renderNormalComArr,
      renderFullComArr,
      hideFullMenu,
      stopFullAnim,
      showCutScreen,
      showOneWayMic,
      micTalkImage,
      micTalkImageStyle,
      showTwoWayMic,
      showTimeInterval,
      playerLoadParam,
      rockerDirections,
      cutStyle,
      pressEnterAlbum,
      showCustomVideoLoad,
      showCustomVideoText,
      showCustomRetry,
      showCustomRetryText,
      timerInterValStyle,
      twoMicStyle,
      scaleMultiple,
      audioLoadParam,
      audioLoadText,
      clarityStatus,
      playerProps,
      zoomInTimesStyle,
    } = this.props;
    const realWidth = isFullScreen ? fullPlayerWidth : playerWidth;
    const realHeight = isFullScreen ? fullPlayerHeight : playerHeight;
    return (
      <View style={styles.tyIpcPlayerPage} onLayout={e => this._onLayout(e)}>
        {this.props.onChangeZoomStatus ? (
          scaleMultiple !== undefined ? (
            <NativePlayer
              setAvailableRockerDirections={rockerDirections}
              onChangePreview={this.onChangePreview}
              action={cameraAction}
              // scaleMultiple={isFullScreen ? -2 : zoomVideoStatus}
              scaleMultiple={this.getRealPlayerScale(isFullScreen, zoomVideoStatus, playerProps)}
              style={{
                width: realWidth,
                height: realHeight,
              }}
              {...playerProps}
            />
          ) : (
            <NativePlayer
              setAvailableRockerDirections={rockerDirections}
              onChangePreview={this.onChangePreview}
              action={cameraAction}
              scaleMode={isFullScreen && isIOS ? 1 : zoomVideoStatus}
              style={{
                width: realWidth,
                height: realHeight,
              }}
              {...playerProps}
            />
          )
        ) : (
          <NativePlayer
            setAvailableRockerDirections={rockerDirections}
            onChangePreview={this.onChangePreview}
            action={cameraAction}
            style={{
              width: realWidth,
              height: realHeight,
            }}
            {...playerProps}
          />
        )}
        {renderNormalComArr &&
          !isFullScreen &&
          renderNormalComArr.map((item, index) => {
            return <item.component key={`${index + 1}`} />;
          })}

        {showTimeInterval && isRecording && (
          <TimeInterval isFullScreen={isFullScreen} timerInterValStyle={timerInterValStyle} />
        )}
        {showCutScreen && (
          <CutScreen
            isFullScreen={isFullScreen}
            cutStyle={cutStyle}
            pressEnterAlbum={pressEnterAlbum}
          />
        )}
        {showOneWayMic && isTalking && !isTwoWayTalk && (
          <OneWayMic micTalkImage={micTalkImage} micTalkImageStyle={micTalkImageStyle} />
        )}
        {showTwoWayMic && isTalking && isTwoWayTalk && (
          <TwoWayMic
            isFullScreen={isFullScreen}
            tipText={Strings.getLang('tyIpc_mic_two_way_talking')}
            playerWidth={playerWidth}
            twoMicStyle={twoMicStyle}
          />
        )}
        {/* {playerProps.showZoomInTimes && (
          <ZoomInTimes
            onPress={this.changeZoomInTimes}
            maxScaleMultiple={playerProps.maxScaleMultiple || 6}
            isFullScreen={isFullScreen}
            zoomInTimesStyle={zoomInTimesStyle}
            currentVideoScale={currentVideoScale}
          />
        )} */}
        {/* 全屏自定义 */}
        {renderFullComArr &&
          isFullScreen &&
          renderFullComArr.map((item, index) => {
            return (
              <item.component
                key={`${index + 1}`}
                {...(item.propData,
                { hideFullMenu, stopFullAnim, fullPlayerWidth, fullPlayerHeight })}
                resetFullScreenBtn={value => {
                  this.props.onFullScreenTapView(value);
                }}
              />
            );
          })}

        {/* {showLoading ? ( */}
        {showLoading || showCustomVideoLoad ? (
          <PlayerLoad
            isFullScreen={isFullScreen}
            showAnimation={showAnimation}
            loadText={showCustomVideoLoad ? showCustomVideoText : loadText}
            showRetry={showCustomRetry || showRetry}
            retryText={
              showCustomRetry && showCustomRetryText !== '' ? showCustomRetryText : retryText
            }
            reConnect={this.reConnect}
            playerLoadParam={playerLoadParam}
          />
        ) : null}

        {videoStatus === 7 && clarityStatus === 'AUDIO' && (
          <AudioOnlyMode
            isFullScreen={isFullScreen}
            audioLoadText={audioLoadText}
            audioLoadParam={audioLoadParam}
          />
        )}
      </View>
    );
  }
}

export default TYIpcPlayer;
