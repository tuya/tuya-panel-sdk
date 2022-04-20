import { Utils, TYSdk, NotificationProps, Notification } from 'tuya-panel-kit';
import { NativeModules } from 'react-native';

const { convertX: cx, convertY: cy, winWidth, isIphoneX, isIos, winHeight } = Utils?.RatioUtils;
const { getDpCodeById, getDpIdByCode } = TYSdk?.device || {};
const { jumpTo: jumpToApp, showLoading, hideLoading } = TYSdk?.mobile || {};

const { jumpTo: jumpToH5 } = NativeModules?.TYRCTPublicManager || {};

const notificationTheme = {
  text: '#FFFFFF',
  background: '#2D2D2D',
  successIcon: '#00D973',
  errorIcon: '#FF5A5A',
  warningIcon: '#FF5A5A',
};

const notification = (config: NotificationProps) => {
  Notification.show({
    variant: 'error',
    autoCloseTime: 1500,
    theme: notificationTheme,
    enableClose: false,
    show: true,
    ...config,
  });
};

export {
  cx,
  cy,
  winWidth,
  isIphoneX,
  isIos,
  getDpCodeById,
  getDpIdByCode,
  jumpToApp,
  showLoading,
  hideLoading,
  jumpToH5,
  notification,
  winHeight,
};

export default {};
