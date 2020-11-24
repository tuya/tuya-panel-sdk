import React from 'react';
import { Modal } from '@tuya-rn/tuya-native-components';

import SimpleToastView from './SimpleToastView';
import _debounce from 'lodash/debounce';

export default {
  info: (content: string) => {
    const toastProps = {
      show: true,
      onHide: Modal.close,
      showPosition: 'bottom',
      text: content,
    };
    const modalProps = {
      alignContainer: 'center',
      mask: false,
    };
    Modal.render(<SimpleToastView {...toastProps} />, modalProps);
  },
  debounceInfo: _debounce((content: string) => {
    const toastProps = {
      show: true,
      onHide: Modal.close,
      showPosition: 'bottom',
      text: content,
    };
    const modalProps = {
      alignContainer: 'center',
      mask: false,
    };
    Modal.render(<SimpleToastView {...toastProps} />, modalProps);
  }, 200),
};
