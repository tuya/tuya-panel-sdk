/* istanbul ignore file */
import SensingSDK from './SensingSDK';
import {
  MultiSlider,
  ImageAnimate,
  WhiteSpace,
  DpCacheText,
  SendEmail,
  Stepper,
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
};

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
};

export default SensingSDK;
