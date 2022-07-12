/* istanbul ignore file */
import SensingSDK from './SensingSDK';
import {
  MultiSlider,
  ImageAnimate,
  WhiteSpace,
  DpCacheText,
  SendEmail,
  Stepper,
  AddService,
  BleOfflineView,
  NewOfflineView,
  Loading,
} from './components';
import { AlarmCloud, AlarmSwitch, TemperatureScaleSwitching } from './TemperatureHumidity';
import {
  useBoolean,
  useToggle,
  useDpSchema,
  useDpState,
  useUpdateInfo,
  useCurrentByDp,
} from './hooks';

import {
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
  BleSDK,
  isShowCloudAlarm,
  reductionDpState,
  translateDpSchema,
  scaleNumber,
} from './utils';

export type {
  ChartType,
  ApiChartType,
  AlarmCode,
  DpType,
  NetworkType,
  NoticeType,
  DevInfo,
  IDeviceLogResponse,
  IListItem,
  IHighAbilityResp,
  IServerInfo,
  IServe,
  IQueryDataItem,
  IConditionsItem,
  IActionsItem,
  IResponseCallServiceStatus,
  IResponseSupportCall,
  IDpExcelQuery,
  IBindParams,
  EntityValue,
  PushType,
  ISceneAndAuto,
  IScenes,
  ISceneIcons,
  IAutos,
  IStatisticsConfig,
  IUserInfo,
  IDpsInfos,
  IProduceSetting,
} from './SensingSDK';

const Utils = {
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
  BleSDK,
  isShowCloudAlarm,
  reductionDpState,
  translateDpSchema,
  scaleNumber,
};

const hooks = {
  useBoolean,
  useToggle,
  useDpSchema,
  useDpState,
  useUpdateInfo,
  useCurrentByDp,
};

class SDK extends SensingSDK {
  static Utils = Utils;
  static hooks = hooks;
  static BleSDK = BleSDK;
}

export {
  SensingSDK,
  MultiSlider,
  ImageAnimate,
  WhiteSpace,
  useBoolean,
  useToggle,
  useDpSchema,
  useDpState,
  useUpdateInfo,
  DpCacheText,
  Utils,
  SendEmail,
  useCurrentByDp,
  AlarmCloud,
  Stepper,
  AlarmSwitch,
  TemperatureScaleSwitching,
  AddService,
  BleOfflineView,
  NewOfflineView,
  Loading,
};

export default SDK;
