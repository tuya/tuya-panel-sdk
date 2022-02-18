import React from 'react';
import { Modal } from 'tuya-panel-kit';
import Previewer from './Previewer';
import { IPreviewer } from './interface';

interface IUseAVPreviewModalReturn {
  open: (opts: IPreviewer) => void;
  close: () => void;
}

function useAVPreviewModal(): IUseAVPreviewModalReturn {
  const renderModal = (component: React.ReactElement) => {
    Modal.render(component, {
      alignContainer: 'center',
      maskStyle: { backgroundColor: '#000' },
      onMaskPress: Modal.close,
    });
  };

  const interfaces: IUseAVPreviewModalReturn = {
    open: (opts: IPreviewer) => {
      renderModal(<Previewer onClose={Modal.close} {...opts} />);
    },
    close: Modal.close,
  };

  return interfaces;
}

export default useAVPreviewModal;
