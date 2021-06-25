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

export type Timers = Array<{
  /**
   * 初始化状态，0：关闭；1：开启。
   */
  status: number;
  /**
   * 在0000000基础上，把所选择日期对应位置的 0 改成 1，第一位表示周日。
   */
  loops: string;
  /**
   * 定时时间。
   */
  time: string;
  /**
   * 定时任务主键。
   */
  id: number;
  /**
   * 是否发送执行通知。
   */
  isAppPush: boolean;
  /**
   * DP 值。
   */
  dps: string;
  /**
   * 分组定时排序。
   */
  groupOrder: number;
  /**
   * 分组定时 ID。
   */
  groupId: string;
  /**
   * 分组定时定时备注。
   */
  aliasName: string;
}>;

export interface IQueryTimerTasksResponse {
  /**
   * 定时分类状态
   */
  categoryStatus: number;
  /**
   * 定时任务 ID
   */
  id: string;
  /**
   * 定时分类
   */
  category: string;
  /**
   * 见Timers
   */
  timers: Timers[];
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

export interface IGetDpLastTimerResponse {
  /**
   * 定时时间
   */
  time: string;
  /**
   * 定时任务状态，0：关闭，1：开启，2：无效/已删除
   */
  status: number;
  /**
   * 定制类项目标识
   */
  project: number;
  /**
   * 定时动作
   */
  actionStr: string;
  /**
   * 分组定时排序
   */
  groupOrder: number;
  /**
   * 修改时间
   */
  gmtModified: number;
  /**
   * 创建时间
   */
  gmtCreate: number;
  /**
   * 设备 UUID
   */
  uuid: string;
  /**
   * 定时运行模式，0：云端定时，1：本地定时
   */
  runMode: number;
  /**
   * 设备 ID
   */
  devId: string;
  /**
   * 定时任务 ID
   */
  id: number;
  /**
   * 日期
   */
  date: string;
  /**
   * 时区
   */
  timeZone: string;
  /**
   * UID
   */
  uid: string;
  /**
   * 时区 ID
   */
  timezoneId: string;
  /**
   * 资源类型。0：单设备；1：群组设备。
   */
  bizType: any;
  /**
   * action中的value
   */
  value: any;
  /**
   * 分组定时 ID
   */
  groupId: string;
  /**
   * 周循环
   */
  loops: string;
  /**
   * 定时类型，0：普通定时，5：天文定时
   */
  timerType: number;
  /**
   * 定时业务分类，不同业务方使用不同的 categoryId 做区分
   */
  categoryId: string;
}

export interface IGetLastTimerPeriod {
  devId: string;
  instruct?: string;
}

export interface IGetLastTimerPeriodResponse {
  /**
   * 定时分类状态。
   */
  categoryStatus: number;
  /**
   * 定时任务 ID。
   */
  id: string;
  /**
   * 定时分类。
   */
  category: string;
  /**
   * 见Timers。
   */
  timers: Timers[];
}

export interface IGetAstronomicalList {
  bizId: string;
}

export interface IGetAstronomicalListResponse {
  categoryStatus: number;
  id: string;
  category: string;
  timers: Array<{
    status: number;
    loops: string;
    time: string;
    id: number;
    isAppPush: boolean;
    dps: string;
    groupOrder: number;
    groupId: string;
    aliasName: string;
  }>;
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

export interface IGetDpsInfosResponse {
  /**
   * 	DP Code
   */
  code: string;
  /**
   * 	DP ID
   */
  dpId: number;
  /**
   * 	DP 值
   */
  value: string;
  /**
   * 	DP 名称
   */
  name: string;
  /**
   * 	DP 最近上报时间
   */
  time: number;
  /**
   * 	DP 类型
   */
  type: string;
}

export interface IUpdateDpName {
  gwId: string;
  devId: string;
  dpId: string;
  name: string;
}

export interface IGetGroupDpsInfosResponse {
  /**
   * 	DP Code
   */
  code: string;
  /**
   * 	DP ID
   */
  dpId: number;
  /**
   * 	DP 值
   */
  value: string;
  /**
   * 	DP 名称
   */
  name: string;
  /**
   * 	DP 最近上报时间
   */
  time: number;
  /**
   * 	DP 类型
   */
  type: string;
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

export interface IGetWeatherQualityResponse {
  c: Array<{
    /**
     * 城市名称
     */
    name: string;
    /**
     * 城市 ID
     */
    id: number;
  }>;
  w: Array<{
    /**
     * 风向
     */
    windDir: string;
    /**
     * 日落文本
     */
    sunSetFormat: string;
    /**
     * 概述
     */
    tips: string;
    /**
     * 体感温度
     */
    realFeel: number;
    /**
     * 二氧化氮
     */
    no2: number;
    /**
     * 日落时间戳
     */
    sunSet: number;
    /**
     * 二氧化硫
     */
    so2: number;
    /**
     * 时区
     */
    zoneId: string;
    /**
     * 空气湿度
     */
    humidity: number;
    /**
     * 风速，国内外都是 m/s
     */
    windSpeed: string;
    /**
     * 温度 ，国内外都是单位摄氏度
     */
    temp: number;
    /**
     * 臭氧
     */
    o3: number;
    /**
     * 日出文本
     */
    sunRiseFormat: string;
    /**
     * PM10
     */
    pm10: number;
    /**
     * 大气气压
     */
    pressure: number;
    /**
     * 一氧化碳
     */
    co: number;
    /**
     * 空气质量评分等级
     */
    qualityLevel: number;
    /**
     * 空气质量评分
     */
    quality: string;
    /**
     * 天气文本描述
     */
    condition: string;
    /**
     * PM25
     */
    pm25: number;
    /**
     * 天气图标地址
     */
    condIconUrl: string;
    /**
     * 空气质量
     */
    aqi: number;
    /**
     * 天气文本编号
     */
    conditionNum: number;
    /**
     * 日出
     */
    sunRise: number;
  }>;
}

export interface IGetWeathers {
  devId: string;
  dataRange?: number;
}

export interface IGetWeathersResponse {
  c: Array<{
    /**
     * 城市名称
     */
    name: string;
    /**
     * 城市 ID
     */
    id: number;
  }>;
  weathers: Array<{
    /**
     * 风向
     */
    temp: number;
    /**
     * 日落文本
     */
    thigh: number;
    /**
     * 概述
     */
    pressure: number;
    /**
     * 体感温度
     */
    condition: string;
    /**
     * 二氧化氮
     */
    tlow: number;
    /**
     * 日落时间戳
     */
    condIconUrl: string;
    /**
     * 空气湿度
     */
    humidity: number;
    /**
     * 天气文本编号
     */
    conditionNum: number;
    /**
     * 风速，国内外都是 m/s
     */
    windSpeed: string;
    /**
     * 风向
     */
    windDir: string;
    /**
     * 风速等级
     */
    windLevel: number;
    /**
     * 时区
     */
    zoneId: string;
    /**
     * 日出时间戳
     */
    sunRise: number;
    /**
     * 日落时间戳
     */
    sunSet: number;
    /**
     * 日落文本
     */
    sunSetFormat: string;
    /**
     * 日出文本
     */
    sunRiseFormat: string;
  }>;
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

export interface IGetCustomizePositionResponse {
  /**
   * 经度
   */
  lon: string;
  /**
   * 纬度
   */
  lat: string;
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

export type Dp = {
  /**
   * 上报数据的时间戳格式
   */
  timeStamp: number;
  /**
   * dp点的id
   */
  dpId: number;
  /**
   * 根据设备时区转换后的时间格式 yyyy-MM-dd HH:mm:ss
   */
  timeStr: string;
  /**
   * dp点的值
   */
  value: string;
};

export interface IGetLogInSpecifiedTimeResponse {
  /**
   * 总数据
   */
  total: number;
  /**
   * 见Dp
   */
  dps: Dp[];
  /**
   * 是否有下一页
   */
  hasNext: boolean;
}

export interface IGetDpReportLog {
  devId: string;
  dpIds: string;
  offset: number;
  limit: number;
  sortType?: 'DESC' | 'ASC';
}

export interface IGetDpReportLogResponse {
  /**
   * 总条数
   */
  total: number;
  /**
   * 见Dp
   */
  dps: Dp[];
  /**
   * 是否有下一页
   */
  hasNext: boolean;
}

export interface IGetDpLogDays {
  devId: string;
  dpId: string;
  type?: string;
  startDay: string;
  endDay: string;
}

export interface IGetDpLogDaysResponse {
  /**
   * 总条数
   */
  total: string;
  /**
   * 每天对应的值
   */
  values: string[];
  /**
   * 天的集合
   */
  days: string[];
}

export interface IGetDpResultByMonth {
  devId: string;
  dpId: string;
  type: 'sum' | 'minux' | 'mac';
}

export interface IGetDpResultByMonthResponse {
  [date: string]: string;
}

export interface IGetDpResultByHour {
  devId: string;
  dpId: string;
  date: string;
  uid?: string;
  auto?: number;
  type: 'sum' | 'minux' | 'avg';
}

export interface IGetDpResultByHourResponse {
  [date: string]: string;
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

export interface IGetDataWithSpecifiedResponse {
  result: {
    [date: string]: string;
  };
  min: string;
}

export interface IGetWeekWithSpecified {
  devId: string;
  dpId: string;
  startWeek: string;
  endWeek: string;
  type: 'sum' | 'minux' | 'avg';
}

export interface IGetWeekWithSpecifiedResponse {
  result: {
    [date: string]: string;
  };
  min: string;
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

export interface IGetMonthWithSpecifiedResponse {
  [date: string]: string;
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

export interface IGetMultiDpsAllResultResponse {
  /**
   * dp点的id
   */
  dpId: number;
  /**
   * 数据库唯一id
   */
  rowkey: string;
  /**
   * 时间戳格式的时间
   */
  timeStamp: number;
  /**
   * 转换后的时间格式 yyyy-MM-dd HH:mm:ss
   */
  timeStr: string;
  /**
   * dp点的值
   */
  value: string;
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

export type IGetLinkageDeviceListResponse = Array<{
  category: string;
  datapoints: any[];
  devId: string;
  iconUrl: string;
  name: string;
  productId: string;
}>;

export type IGetSceneListResponse = Array<{
  actions: any[];
  attribute: number;
  auditStatus: number;
  background: string;
  boundForPanel: boolean;
  boundForWiFiPanel: boolean;
  code: string;
  commonField: string;
  coverIcon: string;
  disableTime: number;
  displayColor: string;
  enabled: true;
  devId: string;
  name: string;
  id: string;
}>;

export interface IBindRule {
  associativeEntityId: string;
  ruleId: string;
  entitySubIds: string;
  expr: [string[]];
  bizDomain: string;
}

export interface IBindRuleResponse {
  /**
   * 关联 DP 点和 DP 点值的组合
   */
  associativeEntityId: string;
  /**
   * 动作 ID
   */
  associativeEntityValue: string;
  /**
   * 业务域
   */
  bizDomain: string;
  /**
   * 数据 ID
   */
  id: number;
  /**
   * 家庭 ID
   */
  ownerId: string;
  /**
   * 设备 ID
   */
  sourceEntityId: string;
  /**
   * 规则 ID
   */
  triggerRuleId: string;
  /**
   * 执行动作设备信息
   */
  triggerRuleVO: any;
}

export interface IGetBindRuleList {
  bizDomain: string;
  sourceEntityId: string;
  entityType: number;
}

export type IGetBindRuleListResponse = Array<{
  associativeEntityId: string;
  associativeEntityValueList: any[];
  bizDomain: string;
  sourceEntityId: string;
}>;

export interface IRemoveRule {
  bizDomain: string;
  sourceEntityId: string;
  associativeEntityId: string;
  associativeEntityValue: string;
}
