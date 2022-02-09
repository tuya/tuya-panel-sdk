/* eslint-disable no-shadow */
import React, { ReactElement, useState } from 'react';
import { Toast } from 'tuya-panel-kit';

enum ToastType {
  success = 'success',
  error = 'error',
  loading = 'loading',
  warning = 'warning',
}

export interface IToastApi {
  success: (text: string) => void;
  error: (text: string) => void;
  warning: (text: string) => void;
  loading: (text?: string) => void;
  hide: () => void;
}

/**
 * 简化 Toast 组件调用
 * @param params
 * @returns
 */
export const useToast = (params?: {
  onFinish?: () => void;
}): [(ReactElement | null)[], IToastApi] => {
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

  const handleFinish = () => {
    if (params?.onFinish) {
      params.onFinish();
    } else {
      setVisible(false);
    }
  };

  const elements = [
    type === 'success' ? (
      <Toast.Success key="success" show={visible} text={toastText} onFinish={handleFinish} />
    ) : null,
    type === 'warning' ? (
      <Toast.Warning key="waring" show={visible} text={toastText} onFinish={handleFinish} />
    ) : null,
    type === 'error' ? (
      <Toast.Error key="error" show={visible} text={toastText} onFinish={handleFinish} />
    ) : null,
    type === 'loading' ? (
      <Toast.Loading key="loading" show={visible} text={toastText} onFinish={() => {}} />
    ) : null,
  ];

  return [elements, apis];
};
