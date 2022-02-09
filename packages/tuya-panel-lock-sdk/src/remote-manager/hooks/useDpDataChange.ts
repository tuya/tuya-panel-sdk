/* eslint-disable import/no-unresolved */
import { useEffect, useState, useRef, useCallback } from 'react';
import RCTDeviceEventEmitter from 'react-native/Libraries/EventEmitter/RCTDeviceEventEmitter';
import moment from 'moment';
import { TYSdk } from 'tuya-panel-kit';
import Strings from '../i18n';
import { parseIPCDpCode, delayCall, toNumber, parseHexString, timeFormat } from '../utils';
import { useLimitTimesRequest } from './hooks';
import { getPictureUrlApi, getCurrentPictureUrlApi } from '../api';
import DPUtil from '../../utils/DPUtil';
import { Dp212ParseDataType, ManagerContextType } from '../interface';

const DP = DPUtil.createPageDp();

/**
 * DP 数据相关逻辑
 */
type DPState = {
  dp212ParseData: Dp212ParseDataType;
  countTime: number;
  imageFiles: {
    filePath?: string;
    fileKey?: string;
    error?: boolean;
    loading?: boolean;
  };
  isSupportDp212: boolean;
  refreshImage: () => Promise<void>;
};

const useDpDataCenter = (managerContext: ManagerContextType): Partial<DPState> => {
  const isSupportDp212 = TYSdk.device.checkDpExist('initiative_message');
  const { options, modal, toastApi } = managerContext;
  const initiativeMessageRef = useRef<string>();
  const [dp212ParseData, setDp212ParseData] = useState<Dp212ParseDataType>();
  const [countTime, setCountTime] = useState<number>(
    toNumber(options?.initDpData?.unlockRequest) || toNumber(options?.initDpData?.alarmRequest) || 0
  );
  const [imageFiles, setImageFiles] = useState<{
    filePath?: string;
    fileKey?: string;
    rotate?: number;
    error?: boolean;
    loading?: boolean;
  }>({ rotate: 0 });
  const [videoTime, setVideoTime] = useState<string>();
  const [requestForImage, dismissReqeustForImage] = useLimitTimesRequest(getCurrentPictureUrlApi, {
    limitTimes: 3,
    interVal: 2 * 1000,
    checkResult: res => res.fileUrl && res.fileKey,
  });
  const isVideoType = options.type === 'alarmVideo' || options.type === 'video';

  /** 通知栏弹窗 终止执行 */
  if (options.renderToarst) return {};

  /** 请求图片类型 */
  const requestImageType = options?.type === 'image' ? 1 : options?.type === 'alarmImage' ? 2 : 4;

  /** 初始化 接收到 DP212 数据后 开始 加载图片请求 */
  const requestForImageWhenRecivedDp212 = useCallback(
    (data: { filePath: string; fileKey: string; bucket: string }) => {
      const { filePath, fileKey, bucket } = data;
      getPictureUrlApi({ filePath, bucket })
        .then((res: any) => {
          if (res.fileUrl && fileKey) {
            // eslint-disable-next-line no-console
            console.log('通过initiative_message成功获取到图片啦');
            dismissReqeustForImage();
            /** 延时一秒更新，防止加载失败 */
            setImageFiles({ fileKey, filePath: res.fileUrl, rotate: res.angle });
          }
        })
        .catch(() => {
          toastApi?.error(Strings.getLang('TYLock_loadImageFailed'));
        });
    },
    []
  );

  /** 解析 DP212 数据 */
  const parseDp212Data = (newInitiativeMessage: string) => {
    try {
      const parseData = parseHexString(newInitiativeMessage);
      const { ext, time, type, v, files, bucket: parseBucket } = parseData;
      /** 版本号？ */
      if (Number(v) === 5) {
        if (Array.isArray(files)) {
          const resFiles = Array.isArray(files[0]) ? files[0] || [] : files;
          // const mediaFiles = files[1] || [];
          const bucket = Array.isArray(resFiles) ? resFiles[0] : resFiles;
          const filePath = Array.isArray(resFiles) ? resFiles[1] : resFiles;
          const fileKey = resFiles[2];

          requestForImageWhenRecivedDp212({ filePath, fileKey, bucket });
        }
      } else {
        const resFiles = Array.isArray(files[0]) ? files[0] || [] : files;

        requestForImageWhenRecivedDp212({
          filePath: resFiles[0],
          fileKey: resFiles[1],
          bucket: parseBucket,
        });
      }

      setDp212ParseData({ ext, time, type });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  };

  useEffect(() => {
    if (options?.initDpData?.dp212Data) {
      try {
        const parseData = parseHexString(options.initDpData.dp212Data as string);
        const { ext, time, type } = parseData;
        setDp212ParseData({ ext, time, type });
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      }
    }
  }, [options?.initDpData?.dp212Data]);

  useEffect(() => {
    const videoTimeListener = (e: any) => {
      const timestamp = moment(e.timestamp * 1000).format('YYYY-MM-DD HH:mm:ss');
      setVideoTime(timestamp);
    };
    RCTDeviceEventEmitter.addListener('video_timestamp', videoTimeListener);

    DP.listen('unlock_request').reply(unlock => {
      setCountTime(Number(unlock));
    });

    DP.listen('alarm_request').reply(alarm => {
      setCountTime(Number(alarm));
    });

    DP.listen('video_request_realtime').reply(videoDpValue => {
      const IPCCode = parseIPCDpCode(videoDpValue);

      if (IPCCode.action === 'close') {
        delayCall(() => {
          modal.close();
        }, 1500);
      }
    });

    DP.listen('initiative_message').reply(dpValue => {
      initiativeMessageRef.current = dpValue;
      parseDp212Data(dpValue);
    });

    if (isSupportDp212) {
      // /** 视频不给loading */
      if (options?.type === 'alarmImage' || options?.type === 'image') {
        toastApi?.loading();
      }
      /** 轮询请求 获取图片 */
      requestForImage(requestImageType)
        .then((res: any) => {
          if (res.fileKey && res.filePath) {
            // eslint-disable-next-line no-console
            console.log('通过接口获取图片成功啦', res);
            toastApi?.hide();
            setImageFiles({ fileKey: res.fileKey, filePath: res.fileUrl, rotate: res.angle });
            setDp212ParseData((preData: Dp212ParseDataType) => ({
              ...preData,
              time: res?.time || preData?.time,
            }));
          }
        })
        .catch(() => {
          // eslint-disable-next-line no-console
          console.log('获取图片失败啦');
          toastApi?.hide();
          setImageFiles({ error: true });
        });
    }

    return () => {
      DP.off();
      dismissReqeustForImage();
      RCTDeviceEventEmitter.removeListener('video_timestamp', videoTimeListener);
    };
  }, []);

  const refreshImage = async () => {
    toastApi?.loading();

    try {
      await getCurrentPictureUrlApi(requestImageType)
        .then((res: any) => {
          toastApi?.hide();
          const { fileKey, filePath } = res;
          if (fileKey && filePath) {
            toastApi?.success(Strings.getLang('TYLock_getSuccess'));
            setImageFiles({ fileKey, filePath, rotate: res.angle });
          }
        })
        .catch(() => {
          toastApi?.hide();
          toastApi?.success(Strings.getLang('TYLock_getFailed'));
        });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('error', e);
      toastApi?.error(Strings.getLang('TYLock_getFailed'));
    } finally {
      toastApi?.hide();
    }
  };

  const dpState = {
    dp212ParseData,
    countTime,
    imageFiles,
    isSupportDp212,
    refreshImage,
    headerTime: isVideoType ? videoTime : timeFormat(dp212ParseData?.time),
  };

  return dpState;
};

export default useDpDataCenter;
