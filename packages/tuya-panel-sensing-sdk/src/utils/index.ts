import { Utils, TYSdk, NotificationProps, Notification, DpSchema } from 'tuya-panel-kit';
import { NativeModules } from 'react-native';
import { Utils as Normal } from '../szos-utils-sdk';
import BleSDK, { isGateway } from './ble';

const { convertX: cx, convertY: cy, winWidth, isIphoneX, isIos, winHeight } = Utils?.RatioUtils;
const { getDpCodeById, getDpIdByCode } = TYSdk?.device || {};
const { jumpTo: jumpToApp, showLoading, hideLoading } = TYSdk?.mobile || {};

const { scaleNumber } = Utils.NumberUtils;

const { jumpTo: jumpToH5 } = NativeModules?.TYRCTPublicManager || {};

const notificationTheme = {
  text: '#FFFFFF',
  background: '#2D2D2D',
  successIcon: '#00D973',
  errorIcon: '#FF5A5A',
  warningIcon: '#FF5A5A',
};

/**
 *
 * @param config 通知弹框配置信息
 */
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

/**
 * @description 云告警上下限 WiFi，WiFi ble，NB， Cat这些不依赖网关
 * @returns
 */
const isShowCloudAlarm = () => {
  const { capability } = TYSdk.devInfo;
  const isWifiBle = capability === 1025; // wifi ble 双模
  const isWifi = !!Utils.NumberUtils.getBitValue(capability, 0); // wifi
  const isNb = !!Utils.NumberUtils.getBitValue(capability, 3); // 是否NB
  const isCat = capability === 1048576; // 是否cat

  if (isWifiBle) return true;
  if (isWifi) return true;
  if (isNb) return true;
  if (isCat) return true;
  if (isGateway()) return true;
  return false;
};

/**
 * @description dp数据还原
 * @param value
 * @param schema
 * @returns
 */
const reductionDpState = (value: any, schema: DpSchema) => {
  if (schema?.type === 'value') {
    // eslint-disable-next-line no-param-reassign
    value = Normal.transLateNumber(value * Math.pow(10, schema?.scale || 0), schema?.scale);
  }
  return value;
};

/**
 * @description dpSchema 转化
 * @param schema
 * @param prefix 前缀
 * @returns
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const translateDpSchema = (schema: { [props: string]: DpSchema }, prefix = 'schema') => {
  const pre = prefix ? `${prefix}_` : 'schema_';
  const result = Object.keys(schema).reduce((memo, item) => {
    // eslint-disable-next-line no-param-reassign
    memo = {
      ...memo,
      [`${pre}${item}`]: {
        ...schema[item],
        max: Normal.transLateNumber(
          +scaleNumber(schema[item]?.scale || 0, schema[item]?.max || 0),
          schema[item]?.scale
        ), // 转化
        min: Normal.transLateNumber(
          +scaleNumber(schema[item]?.scale || 0, schema[item]?.min || 0),
          schema[item]?.scale
        ), // 转化
        step: Normal.transLateNumber(
          +scaleNumber(schema[item]?.scale || 0, schema[item]?.step || 0),
          schema[item]?.scale
        ), // 转化
      },
    };
    return memo;
  }, {});
  return result as Partial<{ [props: string]: DpSchema }>;
};

export {
  isShowCloudAlarm,
  reductionDpState,
  translateDpSchema,
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
  scaleNumber,
  BleSDK,
};

export default {
  isShowCloudAlarm,
  reductionDpState,
  translateDpSchema,
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
  scaleNumber,
  BleSDK,
};
