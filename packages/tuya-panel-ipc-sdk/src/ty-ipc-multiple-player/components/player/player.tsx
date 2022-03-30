/* eslint-disable react/no-deprecated */
/* eslint-disable react/static-property-placement */
/* eslint-disable react/sort-comp */
import { View, DeviceEventEmitter, AppState, StyleSheet, BackHandler } from 'react-native';
import React from 'react';
import { TYSdk, TYText } from 'tuya-panel-kit';
import _ from 'lodash';
import Config from '../../config';
import Strings from '../../i18n';
import { getEventName, getRandom } from '../../utils/util';
import PlayerLoad from '../playerLoad';
import CameraManager from './cameraManager';
import TwoWayMic from '../talk/twoWayMic';
import OneWayMic from '../talk/oneWayMic';
import CutScreen from '../record/cutScreen';
import NativePlayer from '../../native/nativePlayer';
import TimeInterval from '../record/timeInterval';
import { videoLoadText, clarityDic } from '../../config/cameraData';
import { putDpWithList } from '../../utils/multiDeviceManager';
import multiCameraManager from '../../native/multiCameraManager';
import { _defaultProps, TYIpcMultiplePlayerProps, StateParams, devicePower } from '../../interface';

const { isIOS, Global } = Config;
const TYEvent = TYSdk.event;
class Player extends React.Component<TYIpcMultiplePlayerProps, StateParams> {
  static defaultProps = _defaultProps;

  manager: CameraManager;

  private goToBack: boolean;

  private onLivePage: boolean;

  private otherRnPage: boolean;

  private foregroundListener: any;

  private backgroundListener: any;

  private backPressListener: any;

  private sessionDidDisconnectedListener: any;

  private fullScreenPlayerClickListener: any;

  private wirlessFlag: boolean;

  // 是否获取了设备配置信息
  private isGetConfig: boolean;

  // 设备能力支持
  private deviceSupportPower: devicePower;

  private playerKey: string;

  constructor(props: TYIpcMultiplePlayerProps) {
    super(props);
    this.state = {
      devId: props.devId,
      showLoading: true,
      loadText: !props.deviceOnline ? videoLoadText[0] : videoLoadText[2],
      retryText: '',
      showRetry: false,
      videoStatus: -1,
      showAnimation: props.deviceOnline,
      playerWidth: 0,
      playerHeight: 0,
      isTalking: false,
      isFullScreen: props.screenOrientation === 1,
      isRecording: false,
      isTwoWayTalk: false,
      baseImg: '',
      isVideoCut: false,
    };

    this.goToBack = false;
    this.onLivePage = true;
    this.wirlessFlag = false;
    this.otherRnPage = false;
    this.isGetConfig = false;
    this.playerKey = getRandom();

    this.deviceSupportPower = {
      isSupportedTalk: true,
      isSupportedSound: true,
      isSupportedCloudStorage: true,
      supportedAudioMode: 0,
      videoClarity: 'HD', // 默认清晰度
      videoClaritys: [], // 可切换的清晰度
      maxZoomInTimes: -1,
    };

    this.updateDeviceStatus(props, {
      mute: props.defaultMute,
    });
  }

  componentWillMount() {
    // 兼容老版本APP不存在多路预览插件
    if (multiCameraManager) {
      const {
        defaultMute,
        devId,
        deviceOnline,
        isWirless,
        defaultClarity,
        privateMode,
        theme,
        screenOrientation,
        onChangeScreenOrientation,
      } = this.props;
      this.manager = new CameraManager({
        devId,
        online: deviceOnline,
        isWirless,
        clarity: defaultClarity,
        privateMode,
        theme,
        isMute: defaultMute,
        playerKey: this.playerKey,
      });
      // 初始化时是横屏
      if (screenOrientation === 1) {
        this.manager.setScreenOrientation(1);
        onChangeScreenOrientation(1);
      }

      this.listenEvent();

      this.getDeviceConfig();
    }
  }

  componentWillReceiveProps(nextProps: TYIpcMultiplePlayerProps) {
    // 隐私模式和设备在线变更监听 重新拉流
    const { privateMode, deviceOnline, isOnPlayerPage } = this.props;
    if (!_.isEqual(deviceOnline, nextProps.deviceOnline)) {
      this.manager.online = nextProps.deviceOnline;
    }

    // 开启隐私模式
    if (!_.isEqual(privateMode, nextProps.privateMode)) {
      this.manager.privateMode = nextProps.privateMode;
    }
    if (isOnPlayerPage !== nextProps.isOnPlayerPage) {
      if (!nextProps.isOnPlayerPage) {
        // 1. 播放页进入其他RN页
        this.manager.exitPlayPreview();
      } else {
        // 2. 其他页面退回到播放页
        this.manager.startPlay();
      }
    }
  }

  componentWillUnmount() {
    if (multiCameraManager) {
      this.updateDeviceStatus(
        this.props,
        {
          mute: false,
        },
        true
      );
      const { backIsNeedDisConnectP2P } = this.props;
      this.manager.exitPlayPreview(backIsNeedDisConnectP2P);
      this.removeListenEvent();
    }
  }

  // 更新设备互斥状态（状态存到全局）
  updateDeviceStatus = (props = this.props, status = { mute: false }, isDelete = false) => {
    if (isDelete) {
      delete Global.deviceStatusStore[`${this.playerKey}${props.devId}`];
    } else {
      Global.deviceStatusStore[`${this.playerKey}${props.devId}`] = {
        ...status,
        devId: props.devId,
        playerKey: this.playerKey,
      };
    }
  };

  getDeviceConfig = () => {
    // 初始化获取设备能力支持，若此次获取为空，在首次p2p连接之后再获取一次
    this.manager.getDeviceConfig().then((res: any) => {
      const { getDeviceConfigInfo } = this.props;
      if (res) {
        // 能力支持中，针对每一个属性进行判断
        let flag = false;
        Object.keys(this.deviceSupportPower).forEach((key: string) => {
          if (res[key] !== undefined) {
            if (key === 'videoClarity') res.videoClarity = clarityDic[res.videoClarity];
            if (key === 'videoClaritys')
              res.videoClaritys = res.videoClaritys.map((clarity: number) => clarityDic[clarity]);
          } else {
            flag = true;
          }
        });
        if (!res.videoClaritys) res.videoClaritys = [];

        if (!flag) {
          this.isGetConfig = true;
        }

        this.deviceSupportPower = res;
        if (res.supportedAudioMode === 2) {
          this.setState({
            isTwoWayTalk: true,
          });
        }
        getDeviceConfigInfo(res);
      } else {
        getDeviceConfigInfo({
          ...this.deviceSupportPower,
          videoClarity: clarityDic[2], // 默认清晰度，云端没有的情况下给默认值高清
          videoClaritys: [], // 可切换的清晰度
          maxZoomInTimes: 8,
        });
      }
    });
  };

  getStreamStatus = (data: { status: number | boolean; errMsg?: any }) => {
    const { status, errMsg } = data;
    const { isShareDevice, onChangeStreamStatus } = this.props;

    // 监听到视频流获取的状态变化,将视频流状态
    let showLoading = true;
    let showRetry = false;
    let showAnimation = true;
    const loadText =
      this.manager.clarity === 'AUDIO'
        ? Strings.getLang('tyIpc_audio_stream_geting')
        : videoLoadText[Number(status)];
    let retryText = Strings.getLang('tyIpc_video_stream_retry');

    (status === 6 || status === 7) && (showLoading = false);

    if (status === 0) {
      showAnimation = false;
    }

    if (status === 1) {
      retryText = Strings.getLang('tyIpc_private_mode_sleep_close');
      showAnimation = false;

      // 如果是非分享设备,且状态为隐私模式时,有点击重试选项
      if (!isShareDevice) {
        showRetry = true;
      }
    }

    if (status === 3 || status === 5) {
      showRetry = true;
    }

    if (status === 8) {
      retryText = Strings.getLang('tyIpc_video_stream_retry_play');
      showRetry = true;
    }

    this.setState({
      videoStatus: Number(status),
      showLoading,
      loadText,
      showRetry,
      retryText,
      showAnimation,
    });

    onChangeStreamStatus(Number(status), errMsg);
  };

  enterBackground = () => {
    this.goToBack = true;
    this.onLivePage = false;
    const { enterBackDisConP2P, enterBackgroundEvent } = this.props;

    if (!enterBackDisConP2P) {
      this.manager.exitPlayPreviewByAudioOrOther();
    } else {
      this.manager.exitPlayPreview();
    }

    enterBackgroundEvent && enterBackgroundEvent();
  };

  enterFront = () => {
    if (this.goToBack && !this.otherRnPage) {
      const { enterForegroundEvent } = this.props;
      this.onLivePage = true;

      this.manager.startPlay();
      this.goToBack = false;

      enterForegroundEvent();
    }
  };

  handleAppStateChange = (nextAppState: string) => {
    // 表示手机应用滑到后台,统一断开disconenct, 安卓和ios差异限制, 安卓立即断开,ios5秒后断开
    const { enterBackDisConP2P } = this.props;
    if (nextAppState === 'background' && !enterBackDisConP2P) {
      this.manager.exitPlayPreviewByAudioOrOther();
    }
    nextAppState === 'background' && isIOS && enterBackDisConP2P && this.manager.enterBackTimeOut();

    nextAppState === 'active' && isIOS && this.manager.cancelEnterBackTimeOut();
    // 进入前台，判定是否处于预览页面,如果处于预览页面，不做处理, 如果不处于预览页面,判定P2P是否连接，如若未连接，进行连接P2P,如若已连接，则忽略，目的是返回预览界面,可以快速出流
    nextAppState === 'active' &&
      isIOS &&
      !this.onLivePage &&
      this.manager.judgeP2pISConnectedOperate();
  };

  listenP2PIsConnected = (p2pContent: boolean | number) => {
    if (!this.isGetConfig && p2pContent) {
      this.getDeviceConfig();
    }
  };

  listenPlayerStatus = (param: {
    type: string;
    status: boolean | number;
    source: string;
    isFullScreen: boolean;
  }) => {
    const { type, status, source, isFullScreen } = param;
    if (type === 'p2pIsConnected') this.listenP2PIsConnected(status);

    if (type === 'streamStatus')
      this.getStreamStatus({
        status,
      });

    if (type === 'talking') {
      this.listenTalk(Boolean(status));
    }

    if (type === 'recording') {
      this.listenRecord(Boolean(status), source);
    }

    if (type === 'screenshot') {
      this.listenScreenshot(Boolean(status), source);
    }

    if (type === 'screenOrientation') {
      this.listenScreenOrientation(isFullScreen);
    }

    if (type === 'isMute') {
      this.listenMute(Boolean(status));
    }

    if (type === 'isMuteMutual') {
      this.listenMute(Boolean(status), true);
    }
  };

  listenMute = (status: boolean, mutual = false) => {
    const { onChangeMute } = this.props;
    if (mutual) {
      this.manager.isMute = status;
    }
    onChangeMute(status);
  };

  listenScreenOrientation = (isFullScreen: boolean) => {
    this.setState({
      isFullScreen,
    });
    const { onChangeScreenOrientation } = this.props;
    onChangeScreenOrientation(isFullScreen ? 1 : 0);
  };

  listenScreenshot = (status: boolean, source: string) => {
    this.setState({
      baseImg: status ? source : '',
      isVideoCut: false,
    });
  };

  listenRecord = (isRecording: boolean, source: string) => {
    this.setState({
      isRecording,
      baseImg: source || '',
      isVideoCut: true,
    });
    const { onChangeRecording } = this.props;
    onChangeRecording && onChangeRecording(isRecording, source);
  };

  listenTalk = (isTalking: boolean) => {
    this.setState({ isTalking });
    const { onChangeTalking } = this.props;
    onChangeTalking && onChangeTalking(isTalking);
  };

  listenEvent = () => {
    const { devId } = this.props;
    const { playerKey } = this;
    TYEvent.on(getEventName({ devId, playerKey }, 'message'), this.listenPlayerStatus);

    AppState.addEventListener('change', this.handleAppStateChange);

    this.foregroundListener = DeviceEventEmitter.addListener(
      'enterForegroundEvent',
      this.enterFront
    );

    this.backgroundListener = DeviceEventEmitter.addListener(
      'enterBackgroundEvent',
      this.enterBackground
    );

    // Android 返回键退出全屏
    this.backPressListener = BackHandler.addEventListener('hardwareBackPress', () => {
      const { isFullScreen } = this.state;
      const { onChangeScreenOrientation } = this.props;
      if (isFullScreen) {
        this.manager.setScreenOrientation(0);
        onChangeScreenOrientation(0);
        return true;
      }
      return false;
    });

    // 监听全屏时屏幕点击事件
    this.fullScreenPlayerClickListener = DeviceEventEmitter.addListener(
      'didTapVideoView',
      (res: { devId: string }) => {
        if (res && res.devId) {
          const { devId: playerDevId } = this.state;
          const { devId: currentDevId } = res;

          if (playerDevId === currentDevId) {
            const { hideFullMenu, onFullScreenTapView, onNormalScreenTapView } = this.props;
            const { isFullScreen } = this.state;
            if (isFullScreen) {
              onFullScreenTapView(!hideFullMenu);
            } else {
              onNormalScreenTapView();
            }
          }
        }
      }
    );

    // session断开，提示网络错误
    this.sessionDidDisconnectedListener = DeviceEventEmitter.addListener(
      'sessionDidDisconnected',
      (res: { devId: string }) => {
        if (res && res.devId) {
          const { devId: playerDevId } = this.state;
          const { devId: currentDevId } = res;

          if (currentDevId === playerDevId) {
            // 对于隐私模式为false或undefined时对session处理, 隐私模式为true时不做处理
            const { privateMode: privateModeState, onListenSessionDisConnect } = this.props;
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
              this.manager.startPlay();
            } else {
              onListenSessionDisConnect();
              // session断开和进入后台调用同样的逻辑
              this.manager.exitPlayPreview();
            }
          }
        }
      }
    );
  };

  removeListenEvent = () => {
    const { devId } = this.props;
    const { playerKey } = this;
    TYEvent.off(getEventName({ playerKey, devId }, 'message'), this.listenPlayerStatus);

    AppState.removeEventListener('change', this.handleAppStateChange);

    this.foregroundListener.remove();
    this.backgroundListener.remove();
    this.backPressListener.remove();
    this.fullScreenPlayerClickListener.remove();
    this.sessionDidDisconnectedListener.remove();
  };

  reConnect = () => {
    const { onRetryConnect, onListenRetryClick } = this.props;
    if (onRetryConnect) {
      onRetryConnect();
    } else {
      const { videoStatus, devId } = this.state;
      // 表示隐私模式
      if (videoStatus === 1) {
        this.setState({
          showLoading: true,
          showRetry: false,
          loadText: Strings.getLang('tyIpc_re_connect_stream'),
          showAnimation: true,
        });
        // 下发隐私模式
        putDpWithList([{ devId, dps: { 105: false } }]);
      } else {
        onListenRetryClick && onListenRetryClick();
        this.manager.startPlay();
      }
    }
  };

  _onLayout = (e: any) => {
    const { width, height } = e.nativeEvent.layout;

    if (!this.state.isFullScreen) {
      this.setState({
        playerWidth: Math.round(width),
        playerHeight: Math.round(height),
      });
    }
  };

  pressEnterAlbum = () => {
    const { pressEnterAlbum } = this.props;
    if (pressEnterAlbum) {
      pressEnterAlbum();
    } else {
      this.manager.enterAppAlbum();
    }
  };

  exitFullScreen = () => {
    const { onChangeScreenOrientation } = this.props;
    this.manager.setScreenOrientation(0);
    onChangeScreenOrientation(0);
  };

  renderEmpty = () => {
    return (
      <View style={{ ...styles.playerPage, ...styles.center }} onLayout={e => this._onLayout(e)}>
        <TYText style={styles.tip}>{Strings.getLang('tyIpc_version_tip')}</TYText>
      </View>
    );
  };

  renderPlayer() {
    const {
      playerWidth,
      playerHeight,
      loadText,
      showAnimation,
      showRetry,
      retryText,
      isTwoWayTalk,
      isRecording,
      showLoading,
      isTalking,
      isFullScreen,
      baseImg,
      isVideoCut,
      devId,
    } = this.state;

    const {
      showTimeInterval,
      showTwoWayMic,
      showOneWayMic,
      micTalkImage,
      micTalkImageStyle,
      timerInterValStyle,
      showCutScreen,
      cutStyle,
      fullPlayerWidth,
      fullPlayerHeight,
      renderFullComArr,
      hideFullMenu,
      stopFullAnim,
      onFullScreenTapView,
      renderNormalComArr,
      twoMicStyle,
      playerLoadParam,
      rockerDirections,
      showCustomVideoLoad,
      showCustomVideoText,
      showCustomRetry,
      showCustomRetryText,
      playerProps,
    } = this.props;

    const realWidth = isFullScreen ? fullPlayerWidth : playerWidth;
    const realHeight = isFullScreen ? fullPlayerHeight : playerHeight;

    return (
      <View style={styles.playerPage} onLayout={e => this._onLayout(e)}>
        <NativePlayer
          style={{ width: realWidth, height: realHeight }}
          devId={devId}
          setAvailableRockerDirections={rockerDirections}
          playerProps={playerProps}
          action={-1}
        />

        {renderNormalComArr &&
          !isFullScreen &&
          renderNormalComArr.map((item, index) => {
            return <item.component key={`${index + 1}`} />;
          })}

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
        {showTimeInterval && isRecording && (
          <TimeInterval isFullScreen={isFullScreen} timerInterValStyle={timerInterValStyle} />
        )}
        {showCutScreen && (
          <CutScreen
            isFullScreen={isFullScreen}
            cutStyle={cutStyle}
            pressEnterAlbum={this.pressEnterAlbum}
            baseImg={baseImg}
            isVideoCut={isVideoCut}
          />
        )}

        {/* 全屏自定义 */}
        {renderFullComArr &&
          isFullScreen &&
          renderFullComArr.map((item, index) => {
            return (
              <item.component
                key={`${index + 1}`}
                {...(item.propData,
                { hideFullMenu, stopFullAnim, fullPlayerWidth, fullPlayerHeight })}
                resetFullScreenBtn={(value: boolean) => {
                  onFullScreenTapView(value);
                }}
                exitFullScreen={this.exitFullScreen}
              />
            );
          })}

        {showLoading || showCustomVideoLoad ? (
          <PlayerLoad
            isFullScreen={isFullScreen}
            reConnect={this.reConnect}
            showAnimation={showAnimation}
            loadText={showCustomVideoLoad ? showCustomVideoText : loadText}
            showRetry={showCustomRetry || showRetry}
            retryText={
              showCustomRetry && showCustomRetryText !== '' ? showCustomRetryText : retryText
            }
            playerLoadParam={playerLoadParam}
            exitFullScreen={this.exitFullScreen}
          />
        ) : null}
      </View>
    );
  }

  render() {
    return multiCameraManager ? this.renderPlayer() : this.renderEmpty();
  }
}

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  playerPage: {
    backgroundColor: '#000',
    flex: 1,
    position: 'relative',
  },
  tip: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default Player;
