import React, { useRef } from 'react';
import { Modal, ModalProps } from 'tuya-panel-kit';
import { ManagerProvider } from '../context/managerContext';
import { getCurrentMonthViewTime } from '../utils';
import { IModal, ModalType, RemoteManagerApiType } from '../interface';

export { ModalProps };

const commonModalProps: ModalProps = {
  alignContainer: 'top',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onMaskPress: () => {}, // 点击蒙层的回调
  mask: false,
};

const useRemoteOpenModal = () => {
  const renderedRef = useRef<ModalType | null>();
  const modalApi = useRef<IModal>();
  const callBackOnClose = useRef<() => void>();
  const errorCallback = useRef<() => void>();

  const render = (element: React.ReactNode, opts: RemoteManagerApiType) => {
    /** 项同类型的弹窗 忽略 */
    if (renderedRef.current && renderedRef.current === opts.type) return;

    if (modalApi.current) {
      callBackOnClose.current = opts.onClose;
      errorCallback.current = opts.onError;

      Modal.render(
        <ManagerProvider
          value={{
            modal: {
              ...modalApi.current,
              close: () => modalApi.current.close(opts),
            },
            options: opts,
            modalHeaderTitle: '',
          }}
        >
          {element}
        </ManagerProvider>,
        commonModalProps
      );
      renderedRef.current = opts.type;
    }
  };

  /** 通知栏关闭弹窗 */
  const closeToarst = () => {
    renderedRef.current = null;

    Modal.close();
  };

  /** 正常关闭弹窗 */
  const close = (opt?: RemoteManagerApiType) => {
    renderedRef.current = null;

    callBackOnClose.current && callBackOnClose.current();
    console.log('here', opt);
    Modal.close();

    /** DP63 视频类弹窗 关闭判断判断剩余可观看次数，并弹窗提示 */
    if (opt && (opt.type === 'alarmVideo' || opt.type === 'video')) {
      getCurrentMonthViewTime();
    }
  };
  /** 出现错误 关闭 */
  const errorClose = () => {
    renderedRef.current = null;

    errorCallback.current && errorCallback.current();

    Modal.close();
  };

  modalApi.current = {
    render,
    close,
    errorClose,
    closeToarst,
    renderedModalType: renderedRef.current,
  };

  return [modalApi.current];
};

export default useRemoteOpenModal;
