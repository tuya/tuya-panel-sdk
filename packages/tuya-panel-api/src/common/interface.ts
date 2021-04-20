// 场景相关接口
export interface Scene {
  dpId: number;
  bindType: number;
  /**
   * 按键ID
   */
  btnId: number;
  devId: string;
  /**
   * 触发条件
   */
  dpValue: string;
  /**
   * 规则ID
   */
  ruleId: string;
  gwId?: string;
  localSid?: string;
  ruleBackground?: string;
  actionExcutor?: string[];
  condRuleId?: string;
  ruleName?: string;
}

export interface Bill {
  devId: string;
  unit: string;
  notificationStatus: boolean;
  price: number;
  billType: number;
  threshold: number;
  position: string;
  cycle: string;
}

export interface Automation {
  attribute: number;
  auditStatus: number;
  background: string; // 可能是背景图片也可能是颜色
  boundForPanel: boolean;
  boundForWiFiPanel: boolean;
  code: string;
  commonField: string;
  coverIcon: string;
  disableTime: number;
  displayColor: string;
  enabled: boolean;
  gmtCreate: number;
  gmtModified: number;
  id: string;
  iotAutoAlarm: boolean;
  localLinkage: boolean;
  logicRule: boolean;
  matchType: number;
  name: string;
  newLocalScene: boolean;
  ownerId: string;
  ruleSource: number;
  ruleType: number;
  scenarioRule: boolean;
  stickyOnTop: boolean;
  uid: string;
}

export interface AlarmList {
  auditStatus: number;
  boundForPanel: boolean;
  boundForWiFiPanel: boolean;
  enabled: boolean;
  i18nData: { name: { en: string; zh: string }; content: { en: string; zh: string } };
  id: string;
  iotAutoAlarm: boolean;
  isLogicRule: boolean;
  localLinkage: boolean;
  name: string;
  newLocalScene: boolean;
  stickyOnTop: boolean;
}

export interface ISelectedScene {
  devId: string;
  dpId: string | number;
  dpValue: string | number | boolean;
  btnId: string;
  ruleId: string;
}

export interface IBindScene {
  devId: string;
  btnId: string;
}

// 云端定时接口
export interface IAndSingleTime {
  bizId: string;
  bizType: string;
  actions: any;
  loops?: string;
  category?: string;
  status?: number;
  isAppPush?: boolean;
  aliasName?: string;
}

export interface IQueryTimerTasks {
  bizId: string;
  bizType: string;
  category: string;
}

export interface IModifySingleTimer {
  bizId: string;
  bizType: string;
  id: string | number;
  actions: any;
  loops?: string;
  status?: number;
  isAppPush?: boolean;
  aliasName?: string;
}

export interface IAndGroupTimer {
  bizId: string;
  bizType: string;
  actionsArray: any;
  loops?: string;
  category?: string;
  status?: number;
  isAppPush?: boolean;
  aliasName?: string;
}

export interface IModifyGroupTimer {
  bizId: string;
  bizType: string;
  actionsArray: any;
  loops?: string;
  status?: number;
  isAppPush?: boolean;
  aliasName?: string;
}

export interface IModDeleteTaskByIds {
  bizId: string;
  bizType: string;
  ids: string;
  status: number;
}

export interface IModDeleteTaskByCategory {
  bizId: string;
  bizType: string;
  category: string;
  status: number;
}

export interface IGetDpLastTimer {
  bizId: string;
  type: string;
  instruct?: string;
}

export interface IGetLastTimerPeriod {
  devId: string;
  instruct?: string;
}

export interface IGetAstronomicalList {
  bizId: string;
}

export interface IAstronomical {
  bizId: string;
  bizType: number;
  loops: string;
  dps: any;
  astronomicalType: number;
  timezone: string;
  date: string;
  time: string;
  offsetType: number;
  lat: number;
  lon: number;
}

export interface IUpdateAstronomicalStatus {
  id: string;
  status: number;
}

// 电费统计接口
export interface IUpdateBillConfigure {
  devId: string;
  unit: number;
  notificationStatus: boolean;
  threshold: number;
  cycle: string;
  position: string;
  price: number;
  billType: number;
}

// 设备接口
export interface IGetDpsInfos {
  gwId: string;
  devId: string;
}

export interface IUpdateDpName {
  gwId: string;
  devId: string;
  dpId: string;
  name: string;
}

export interface IUpdateGroupDpName {
  group: string;
  dpId: string;
  name: string;
}

export interface IGetWeatherQuality {
  devId: string;
  isLocal: boolean;
}
export interface IGetWeathers {
  devId: string;
  dataRange?: number;
}

export interface ISaveCustomizePosition {
  devId: string;
  lon: string;
  lat: string;
  locationName?: string;
}

export interface IGetCustomizePosition {
  devId: string;
}

// 数据统计接口
export interface IGetLogInSpecifiedTime {
  devId: string;
  dpIds: string;
  offset: number;
  limit: number;
  sortType?: 'DESC' | 'ASC';
  startTime?: string;
  endTime?: string;
}

export interface IGetDpReportLog {
  devId: string;
  dpIds: string;
  offset: number;
  limit: number;
  sortType?: 'DESC' | 'ASC';
}

export interface IGetDpLogDays {
  devId: string;
  dpId: string;
  type?: string;
  startDay: string;
  endDay: string;
}

export interface IGetDpResultByMonth {
  devId: string;
  dpId: string;
  type: 'sum' | 'minux' | 'mac';
}

export interface IGetDpResultByHour {
  devId: string;
  dpId: string;
  date: string;
  uid?: string;
  auto?: number;
  type: 'sum' | 'minux' | 'avg';
}

export interface IGetDataWithSpecified {
  devId: string;
  dpId: string;
  startDay: string;
  endDay: string;
  uid?: string;
  auto?: number;
  type: 'sum' | 'minux' | 'avg';
}

export interface IGetWeekWithSpecified {
  devId: string;
  dpId: string;
  startWeek: string;
  endWeek: string;
  type: 'sum' | 'minux' | 'avg';
}

export interface IGetMonthWithSpecified {
  devId: string;
  dpId: string;
  startMonth: string;
  endMonth: string;
  uid?: string;
  auto?: number;
  type: 'sum' | 'minux' | 'avg';
}

export interface IGetMultiDpsAllResult {
  devId: string;
  dpIds: string;
  startTime: string;
  endTime: string;
  reverse?: number;
  rowType?: number;
  startRowKey?: string;
  endRowKey?: string;
  size?: number;
}

// 告警相关接口
export interface ISetAlarmSwitch {
  devId: string;
  ruleIds: string;
  disabled: string;
}

export interface IAlarmSdk {
  getDevAlarmList;
  setAlarmSwitch;
}

// 联动相关
export interface IGetLinkageDeviceList {
  gid: number;
  sourceType: string;
}

export interface IBindRule {
  associativeEntityId: string;
  ruleId: string;
  entitySubIds: string;
  expr: [string[]];
  bizDomain: string;
}

export interface IGetBindRuleList {
  bizDomain: string;
  sourceEntityId: string;
  entityType: number;
}

export interface IRemoveRule {
  bizDomain: string;
  sourceEntityId: string;
  associativeEntityId: string;
  associativeEntityValue: string;
}
