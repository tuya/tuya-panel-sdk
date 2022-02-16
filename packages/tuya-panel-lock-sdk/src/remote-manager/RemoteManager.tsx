/* eslint-disable no-console */
import React, { useRef, useEffect } from 'react';
import { TYSdk } from 'tuya-panel-kit';
import moment from 'moment';
import DPUtil from '../utils/DPUtil';
import RemoteRequestPannel from './RemoteRequestPannel';
import RemoteToarst from './remote-toarst';
import useRemoteOpenModal from './hooks/useRemoteOpenModal';
import { getDpsTimeWithDevId, delayCall, parseIPCDpCode, isMainRoute } from './utils';
import { ModalType, RemoteManagerReturnType, OptionsType, RemoteManagerApiType } from './interface';

const DP = DPUtil.createPageDp();

const useRemoteManager = (
  options: Partial<OptionsType> = {
    type: 'image',
    countTime: 60,
    rotate: 0,
    deviceOnline: false,
    useFakeTime: false,
    isAdmin: false,
    isShare: false,
    withAudio: false,
    isSupportTowTalk: true,
  }
): RemoteManagerReturnType => {
  const [modal] = useRemoteOpenModal();
  const pannelRef = useRef<any>();
  const isToarstRef = useRef<boolean>(true);
  const ignoreStateRef = useRef<boolean>(false);
  const startListenRef = useRef<boolean>(false);
  const dp212DataRef = useRef<string>('');

  useEffect(() => {
    /** for test */
    // delayCall(() => {
    //   DP.mock({ video_request_realtime: '00000100' });
    // }, 1000);

    /** 保留 先上报的 dp212 数据 */
    DP.listen('initiative_message').reply(dpValue => {
      dp212DataRef.current = dpValue;
    });

    /** 路由从其他页面跳回首页，取消忽略状态 */
    const TYSdkNavigator = TYSdk.Navigator as any;
    const hasListener = !!TYSdkNavigator.addListener;
    const handlePageFocus = () => {
      ignoreStateRef.current = false;
    };
    hasListener && TYSdkNavigator.addListener('focus', handlePageFocus);
    return () => {
      DP.off();
      hasListener && TYSdkNavigator.removeListener('focus', handlePageFocus);
    };
  }, []);

  /** 页面初始化时检查是否有未处理的 dp 弹窗请求 */
  const openWaitingModalOnPageInit = async (opts: RemoteManagerApiType) => {
    const now = moment().valueOf();
    const [realTimeDiff, remoteNoDoKeyDiff, enforceLockUpDiff] = await Promise.all([
      getDpsTimeWithDevId(now, 'video_request_realtime'),
      getDpsTimeWithDevId(now, 'remote_no_dp_key'),
      getDpsTimeWithDevId(now, 'enforce_lock_up'),
    ]);
    const hasVideoTimeDp = !!TYSdk.device.getDpIdByCode('video_request_realtime');

    const earlierThanRemoteNoDpKey = remoteNoDoKeyDiff ? realTimeDiff < remoteNoDoKeyDiff : true;
    const earlierThanEnforceLockUp = enforceLockUpDiff ? realTimeDiff < enforceLockUpDiff : true;

    if (
      realTimeDiff < 60 &&
      earlierThanRemoteNoDpKey &&
      earlierThanEnforceLockUp &&
      hasVideoTimeDp
    ) {
      console.log(
        `mock DP report -> video_request_realtime: ${opts?.initDpData?.videoRequestTime}`
      );
      DP.mock({ video_request_realtime: opts?.initDpData?.videoRequestTime }, realTimeDiff);
    }
  };

  /** 处理最近的弹窗请求 */
  const handleRecentlyRequest = (opts: RemoteManagerApiType) => {
    if (!startListenRef.current) {
      /** 延时触发, 首次进入开启弹窗 防止云端数据未同步 不然会失败 */
      delayCall(() => openWaitingModalOnPageInit(opts), 2000);
    }
    startListenRef.current = true;
  };

  /** 忽略处理 */
  const handleIgnore = (restTime = 0) => {
    ignoreStateRef.current = true;

    delayCall(() => {
      ignoreStateRef.current = false;
    }, restTime * 1000);
  };

  /** 开启弹窗 类型？ &  通知栏或者霸屏 */
  const renderModal = (type: ModalType, opts: RemoteManagerApiType) => {
    isToarstRef.current = opts.renderToarst || true;
    const mergeOpts = { ...options, ...opts, type };
    const bgColor = '#171817';

    // 分享者不弹窗
    if (mergeOpts.isShare) return;

    if (opts.renderToarst) {
      modal.render(
        <RemoteToarst
          onConfirm={(restCount: number) => {
            modal.closeToarst();
            renderModal(type, { ...opts, renderToarst: false, countTime: restCount });
          }}
          onCancel={(restCount: number) => {
            handleIgnore(restCount);

            modal.closeToarst();
          }}
        />,
        mergeOpts
      );
    } else {
      modal.render(<RemoteRequestPannel bgColor={bgColor} ref={pannelRef} />, mergeOpts);
    }
  };

  /** -------------Modal Apis--------------- */
  /** 实时视频 */
  const remoteRealTimeVideo = (opts: RemoteManagerApiType) => {
    renderModal('video', opts);
  };

  /** 告警视频 */
  const remoteAlarmVideo = (opts: RemoteManagerApiType) => {
    renderModal('alarmVideo', opts);
  };

  /** 开门抓拍 */
  const remoteOpenDoorCamera = (opts: RemoteManagerApiType) => {
    renderModal('image', opts);
  };

  /** 告警抓拍 */
  const remoteAlarmCamera = (opts: RemoteManagerApiType) => {
    renderModal('alarmImage', opts);
  };

  /** 开始监听门锁请求 */
  const startListen = (opts: RemoteManagerApiType) => {
    handleRecentlyRequest(opts);
    /** --------------- 面板主页 dp 监听 -------------- */
    DP.listen('video_request_realtime').reply((dpValue, waitTime = 0) => {
      const IPCCode = parseIPCDpCode(dpValue);

      if (IPCCode.action === 'open') {
        if (IPCCode.requestType === 'openDoor') {
          if (IPCCode.requestContent === 'video') {
            remoteRealTimeVideo({
              deviceOnline: opts.deviceOnline,
              renderToarst: !isMainRoute(),
              withAudio: IPCCode.withAudio,
              isSupportTowTalk: true,
              useFakeTime: true,
              countTime: 60 - waitTime,
              initDpData: {
                dp212Data: dp212DataRef.current,
              },
              onClose: () => {
                DP.dispatch({ video_request_realtime: '0101' });
              },
            });
          }

          if (IPCCode.requestContent === 'image') {
            remoteOpenDoorCamera({
              deviceOnline: opts.deviceOnline,
              renderToarst: !isMainRoute(),
              useFakeTime: true,
              countTime: 60 - waitTime,
              initDpData: {
                dp212Data: dp212DataRef.current,
              },
              onClose: () => {
                DP.dispatch({ video_request_realtime: '0101' });
              },
            });
          }
        }

        if (IPCCode.requestType === 'alarmModal') {
          if (IPCCode.requestContent === 'video') {
            remoteAlarmVideo({
              deviceOnline: opts.deviceOnline,
              renderToarst: !isMainRoute(),
              withAudio: IPCCode.withAudio,
              isSupportTowTalk: true,
              rotate: opts.rotate,
              useFakeTime: true,
              countTime: 60 - waitTime,
              initDpData: {
                dp212Data: dp212DataRef.current,
              },
              onClose: () => {
                DP.dispatch({ video_request_realtime: '0101' });
              },
            });
          }

          if (IPCCode.requestContent === 'image') {
            remoteAlarmCamera({
              deviceOnline: opts.deviceOnline,
              renderToarst: !isMainRoute(),
              useFakeTime: true,
              countTime: 60 - waitTime,
              initDpData: {
                dp212Data: dp212DataRef.current,
              },
              onClose: () => {
                DP.dispatch({ video_request_realtime: '0101' });
              },
            });
          }
        }
      }
    });

    DP.listen('unlock_request').reply(dpValue => {
      if (!ignoreStateRef.current) {
        remoteOpenDoorCamera({
          deviceOnline: opts.deviceOnline,
          renderToarst: !isMainRoute(),
          rotate: opts.rotate,
          initDpData: {
            unlockRequest: dpValue,
            dp212Data: dp212DataRef.current,
          },
          onIgnore: () => {
            handleIgnore(dpValue);
            opts?.onIgnore && opts.onIgnore();
          },
        });
      }
    });

    DP.listen('alarm_request').reply(dpValue => {
      if (!ignoreStateRef.current) {
        remoteAlarmCamera({
          deviceOnline: opts.deviceOnline,
          renderToarst: !isMainRoute(),
          rotate: opts.rotate,
          initDpData: {
            alarmRequest: dpValue,
            dp212Data: dp212DataRef.current,
          },
          onIgnore: () => {
            handleIgnore(dpValue);

            opts?.onIgnore && opts.onIgnore();
          },
        });
      }
    });
  };

  const updateOptions = (c: Partial<OptionsType>) => {
    if (modal.renderedModalType) {
      if (!isToarstRef.current) {
        pannelRef.current.updateOptions(c);
      }
    }
  };

  const off = () => DP.off;

  const mockReport = (dps: Record<string, any>, ...args) => {
    DP.mock(dps, ...args);
  };

  return {
    remoteAlarmCamera,
    remoteAlarmVideo,
    remoteOpenDoorCamera,
    remoteRealTimeVideo,
    startListen,
    updateOptions,
    off,
    mockReport,
  };
};

export default useRemoteManager;
