import React, { useState, useEffect, useRef, ReactElement } from 'react';
import { Toast } from 'tuya-panel-kit';
import { delayCall } from '../utils';
import { FnType, IToastApi } from '../interface';

type CountDownTimeReturn = [
  number,
  {
    stop: FnType;
    reStart: FnType;
    refresh: (count: number) => void;
    setCount: (num: number) => void;
  }
];
/** 倒计时hook */
export const useCountDownTimer = (count = 3): CountDownTimeReturn => {
  const [number, setNumber] = useState<number>(count);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  const startCount = () => {
    const coutDownFn = () => {
      setNumber(pre => {
        const n = pre;
        if (n === 1) {
          clearInterval(intervalRef.current);
          return 0;
        }
        return n - 1;
      });
    };
    intervalRef.current = setInterval(coutDownFn, 1000);
  };

  useEffect(() => {
    // startCount();
    return () => clearInterval(intervalRef.current);
  }, []);

  const fns = {
    stop: () => clearInterval(intervalRef.current),
    reStart: () => {
      startCount();
    },
    refresh: (newCount: number) => {
      clearInterval(intervalRef.current);
      setNumber(newCount || count);
      startCount();
    },
    setCount: (num: number) => {
      setNumber(num);
    },
  };

  return [number, fns];
};

// eslint-disable-next-line no-shadow
enum ToastType {
  success = 'success',
  error = 'error',
  loading = 'loading',
  warning = 'warning',
}

export const useToast = (): [(ReactElement | null)[], IToastApi] => {
  const [visible, setVisible] = useState<boolean>(false);
  const [toastText, setToastText] = useState<string>();
  const [type, setType] = useState<ToastType>(ToastType.success);

  const showToast = (text?: string) => {
    setToastText(text);
    setVisible(true);
  };

  const apis = {
    success: (text: string) => {
      showToast(text);
      setType(ToastType.success);
    },
    loading: (text?: string) => {
      showToast(text);
      setType(ToastType.loading);
    },
    error: (text: string) => {
      showToast(text);
      setType(ToastType.error);
    },
    warning: (text: string) => {
      showToast(text);
      setType(ToastType.warning);
    },
    hide: () => {
      setVisible(false);
    },
  };

  const onFinish = () => setVisible(false);

  const elements = [
    type === 'success' ? (
      <Toast.Success key="success" show={visible} text={toastText} onFinish={onFinish} />
    ) : null,
    type === 'warning' ? (
      <Toast.Warning key="waring" show={visible} text={toastText} onFinish={onFinish} />
    ) : null,
    type === 'error' ? (
      <Toast.Error key="error" show={visible} text={toastText} onFinish={onFinish} />
    ) : null,
    type === 'loading' ? (
      <Toast.Loading key="loading" show={visible} text={toastText} onFinish={() => {}} />
    ) : null,
  ];

  return [elements, apis];
};

export const useLimitTimesRequest = (
  requestApi: (params?: any) => Promise<any>,
  options: {
    limitTimes?: number;
    interVal?: number;
    checkResult?: (res: any) => boolean;
  } = {
    limitTimes: 3,
    interVal: 2 * 1000,
    checkResult: res => !!res,
  }
): [(parmas: any) => Promise<any>, () => void] => {
  const dismiss = useRef<boolean>(false);
  const multiTimesRequest = useRef<(params: any) => Promise<any>>(
    (params: any) =>
      new Promise((resolve, reject) => {
        let restTimes = options.limitTimes || 3;
        /** 外部定义请求结果验证方法 */
        const checkResultFn = options.checkResult || (r => !!r);
        let result: any = null;
        let error: any = null;

        const log = () => {
          // eslint-disable-next-line no-console
          console.log(`sendRequest 尝试次数剩余 ${restTimes} 次`);
        };

        /**
         * 发送请求 每发送一次，减少一次剩余次数 restTimes
         */
        const send = () => {
          restTimes -= 1;
          requestApi(params)
            .then(res => {
              result = res;
              log();
              retry();
            })
            .catch(err => {
              error = err;
              log();
              retry();
            });
        };

        /**
         * 重试机制，获取到正确结果或者无剩余次数终止
         */
        const retry = () => {
          if (restTimes > 0 && !checkResultFn(result) && !dismiss.current) {
            delayCall(() => {
              send();
            }, options.interVal);
          } else if (dismiss.current) {
            resolve({});
          } else if (checkResultFn(result)) {
            resolve(result);
          } else {
            reject(error);
          }
        };
        send();
      })
  ).current;

  const dismissFn = () => {
    dismiss.current = true;
    // eslint-disable-next-line no-console
    console.log('dismiss request');
  };

  return [multiTimesRequest, dismissFn];
};
