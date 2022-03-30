import React, {
  useContext,
  useState,
  useImperativeHandle,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Text } from 'react-native';
import { Utils, TYText, Button, TYSdk } from 'tuya-panel-kit';
import { SlideChoose } from '../index';

import ImagePannel from './ImagePannel';
import IPCPlayer from './IpcPlayer';
import ManagerContext from './context/managerContext';
import OpenDoorState from './OpenDoorState';
import Mantle from './Mantle';
import HangupButton from './HangupButton';
import { delayCall, isStatusBarInScreen } from './utils';
import DPUtil from '../utils/DPUtil';
import { remoteOpenApi } from './api';
import { IRemoteRequestPannel, OpenStateEnum } from './interface';
import Strings from './i18n';

const DP = DPUtil.createPageDp();

const { height: screenHeight, convertX: cx } = Utils.RatioUtils;

type getRefType<T> = T extends React.ForwardRefExoticComponent<React.RefAttributes<infer R>>
  ? R
  : null;

const sliderChooseLeftColor = {
  linearStops: {
    '0%': '#FF4040',
    '100%': 'rgba(254,72,71,0.5)',
  },
};

const sliderChooseRightColor = {
  linearStops: {
    '100%': '#239C8E',
    '0%': 'rgba(35,156,142,0.5)',
  },
};

const RemoteRequestPannel = React.forwardRef<any, IRemoteRequestPannel>(
  ({ bgColor }, forWardRef) => {
    const isSupprotEnforce = TYSdk.device.checkDpExist('enforce_lock_up');

    const IpcPlayerRef = useRef<getRefType<typeof IPCPlayer>>(null);
    const {
      modal,
      updateOptions,
      options,
      countTime,
      dpData,
      toastApi,
      timer,
      modalHeaderTitle,
      isDoorBellRing,
    } = useContext(ManagerContext);

    const [showIgnoreCountDown, setShowIgnoreCountDown] = useState<boolean>(true);
    const [openState, setOpenState] = useState<OpenStateEnum>(OpenStateEnum.default);
    const [enforceBtnDisable, setEnforceBtnDisable] = useState<boolean>(false);
    const [hangupBtnDisabled, setHangupBtnDisabled] = useState<boolean>(false);

    const modalType = options?.type;
    // const isFamilyAdmin = options?.isAdmin || options?.isAdmin === 1;
    const showContent = !options.isShare && dpData.isSupportDp212;
    const headerHeight = cx(60);
    const footerHeight = cx(152);
    const contentHeight = screenHeight - footerHeight;
    const isVideoModal = modalType === 'alarmVideo' || modalType === 'video';
    const isAlarmType = modalType === 'alarmVideo' || modalType === 'alarmImage';
    const showEnforceBtn = !options.isShare && isSupprotEnforce;
    const needPadding = isStatusBarInScreen() || Utils.RatioUtils.isIphoneX;

    useImperativeHandle(
      forWardRef,
      () => ({
        updateOptions,
      }),
      []
    );

    useEffect(() => {
      /** 倒计时归零 调用忽略事件 */
      if (countTime === 0) {
        handleCountDownOver();
      }
    }, [countTime]);

    useEffect(() => {
      /** 监听开门状态变更 */
      if (!isAlarmType) {
        DP.listen('remote_no_dp_key').reply(remoteNoDpKey => {
          if (remoteNoDpKey && remoteNoDpKey.slice(0, 2) === '00') {
            setOpenState(OpenStateEnum.success);
          } else {
            setOpenState(OpenStateEnum.fail);
          }

          delayCall(modal.close, 2000);
        });
      }

      return () => {
        DP.off();
      };
    }, []);

    /** ipc 播放器 30秒 选择中断 */
    const handleStopPlayingIpc = async () => {
      await checkBeforeCloseModal();
      modal.close();
    };

    /** 倒计时结束 */
    const handleCountDownOver = async () => {
      toastApi?.hide();
      await checkBeforeCloseModal();
      modal.close();
    };

    /** 关闭弹窗前的处理 */
    const checkBeforeCloseModal = (): Promise<void> => {
      return new Promise(resolve => {
        const IPC = IpcPlayerRef.current;
        if (!IPC) resolve();
        const needDispose = IPC.state.isRecording || IPC.state.isTalking;

        if (needDispose) {
          IPC.state.isRecording && IpcPlayerRef.current?.toggleRecord();
          IPC.state.isTalking && IPC.toggleTalking();

          /** 延时1秒 进行下一步处理 */
          delayCall(resolve, 1500);
        } else {
          resolve();
        }
      });
    };

    /** 忽略 */
    const handleIgnore = async () => {
      await checkBeforeCloseModal();

      toastApi?.hide();
      options?.onIgnore && options.onIgnore();
      modal.close();
    };

    /** 强制反锁 */
    const handleEnforceLock = () => {
      toastApi?.loading(Strings.getLang('TYLock_forceLockLoading'));
      setEnforceBtnDisable(true);

      DP.dispatch({ enforce_lock_up: true })
        .listenWithinTime('reverse_lock', 10 * 1000)
        .reply(reverse => {
          if (reverse) {
            toastApi?.success(Strings.getLang('TYLock_forceLockSuccess'));
            DP.dispatch({ remote_no_dp_key: '00' });
          } else {
            setEnforceBtnDisable(false);
            toastApi?.error(Strings.getLang('TYLock_forceLockFailed'));
          }

          delayCall(() => {
            modal.close();
          }, 2000);
        })
        .timeout(() => {
          setEnforceBtnDisable(false);
          toastApi?.error(
            `${Strings.getLang('TYLock_timeout')}, ${Strings.getLang('TYLock_forceLockFailed')}`
          );
        });
    };

    /** 同意开门 */
    const handleAgree = async (done: any) => {
      await checkBeforeCloseModal();
      setOpenState(OpenStateEnum.loading);
      toastApi?.hide();

      remoteOpenApi(true)
        .then(() => {
          DP.listenWithinTime('remote_no_dp_key', 10 * 1000).timeout(() => {
            done();
            setOpenState(OpenStateEnum.fail);
            delayCall(modal.close, 3000);
          });
        })
        .catch(() => {
          done();
          toastApi.error(Strings.getLang('TYLock_openDoor_fail'));
          setOpenState(OpenStateEnum.default);
        });
    };

    /** 拒绝开门 */
    const handleReject = async (done: any) => {
      await checkBeforeCloseModal();
      toastApi?.hide();

      remoteOpenApi(false)
        .then(() => {
          done();
          setOpenState(OpenStateEnum.refuse);
          delayCall(modal.close, 3000);
        })
        .catch(() => {
          done();
          toastApi.error(Strings.getLang('TYLock_request_failed'));
          setOpenState(OpenStateEnum.default);
        });
    };

    /** 挂断 */
    const handleHangup = async () => {
      setHangupBtnDisabled(true);
      await checkBeforeCloseModal();

      remoteOpenApi(false)
        .catch(() => {
          toastApi.error(Strings.getLang('TYLock_request_failed'));
        })
        .finally(() => {
          setHangupBtnDisabled(false);

          if (options.onHangup) {
            options.onHangup();
          }
        });
    };

    /** 底部忽略文案 */
    const ignoreBtnText = `${Strings.getLang('TYLock_ignore')}${
      showIgnoreCountDown ? `(${countTime})` : ''
    }`;

    /** 告警弹窗底部操作区域 */
    const alarmFooter = useMemo(() => {
      return (
        showEnforceBtn && (
          <Button
            onPress={handleEnforceLock}
            disabled={enforceBtnDisable}
            wrapperStyle={styles.enforceBtn}
            textStyle={styles.enforceBtnText}
            text={Strings.getLang('TYLock_enforceLock')}
          />
        )
      );
    }, [showEnforceBtn, enforceBtnDisable]);

    /** 请求弹窗底部操作区域 */
    const requestFooter = useMemo(() => {
      return (
        <View style={{ flexShrink: 1 }}>
          {isDoorBellRing ? (
            <HangupButton disabled={hangupBtnDisabled} onPress={handleHangup} />
          ) : (
            <SlideChoose
              async
              leftText={Strings.getLang('TYLock_refuse')}
              rightText={Strings.getLang('TYLock_agree')}
              onChooseRight={handleAgree}
              onChooseLeft={handleReject}
              triggerDistance={10}
              waveColor="#fff"
              indicatorColor="black"
              leftColor={sliderChooseLeftColor}
              rightColor={sliderChooseRightColor}
            />
          )}
        </View>
      );
    }, [isDoorBellRing]);

    return (
      <View>
        {openState === OpenStateEnum.default ? (
          <View ref={forWardRef} style={[styles.container, { backgroundColor: bgColor }]}>
            <Mantle
              style={[
                styles.header,
                {
                  /** 防止刘海屏遮挡 */
                  top: needPadding ? Utils.RatioUtils.statusBarHeight : 0,
                },
              ]}
              height={headerHeight}
            >
              <TYText
                style={[styles.headerTitle, { marginBottom: cx(10) }]}
                text={modalHeaderTitle}
              />
              <TYText style={[styles.headerTitle, { fontSize: cx(12) }]} text={dpData.headerTime} />
            </Mantle>

            <View style={[styles.content, { height: contentHeight, backgroundColor: bgColor }]}>
              {showContent && (
                <View style={{ zIndex: 9999 }}>
                  {isVideoModal ? (
                    <IPCPlayer
                      ref={IpcPlayerRef}
                      deviceOnline={!!options?.deviceOnline}
                      containerHeight={contentHeight}
                      isSupTowTalk={options?.isSupportTowTalk}
                      withAudio={options?.withAudio}
                      rotate={dpData.imageFiles?.rotate}
                      onStopPlaying={handleStopPlayingIpc}
                      onPlay={() => {
                        setShowIgnoreCountDown(false);

                        timer?.refresh(60);
                      }}
                    />
                  ) : (
                    <ImagePannel contentHeight={contentHeight} />
                  )}
                </View>
              )}
            </View>

            <View style={[styles.footer, { height: footerHeight }]}>
              {isAlarmType ? alarmFooter : requestFooter}

              <TouchableWithoutFeedback onPress={handleIgnore}>
                <View style={styles.countDownBtn}>
                  <Text style={styles.countDownBtnText}>{ignoreBtnText}</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        ) : (
          <OpenDoorState openState={openState} />
        )}
      </View>
    );
  }
);

RemoteRequestPannel.displayName = 'RemoteRequestPannel';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    height: '100%',
  },

  content: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    position: 'relative',
  },

  countDownBtn: {
    flexShrink: 1,
    marginTop: cx(32),
  },

  countDownBtnText: {
    color: '#999',
    fontSize: cx(14),
    textAlign: 'center',
  },

  enforceBtn: {
    backgroundColor: '#239C8E',
    borderRadius: cx(24),
    height: cx(48),
    width: cx(280),
  },

  enforceBtnText: {
    color: '#fff',
    fontSize: cx(16),
    height: cx(48),
    lineHeight: cx(48),
    width: cx(280),
  },

  footer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: cx(24),
  },

  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: cx(8),
    position: 'absolute',
    width: '100%',
    zIndex: 999,
  },

  headerTitle: {
    color: '#fff',
    fontSize: cx(16),
  },
});

export default RemoteRequestPannel;
