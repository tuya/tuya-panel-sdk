/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { NativeModules } from 'react-native';
import moment from 'moment';
import { times } from './loadsh';
import { apiRequest, parseJson, empty, wrapCharData } from './utils';

export type ChartType = 'sum' | 'avg' | 'minux' | 'max' | 'min' | 'count' | 'min&max';

export type ApiChartType = 'sum' | 'avg' | 'minux' | 'max' | 'min' | 'count';

export type AlarmCode = 'temp_current' | 'humidity_value' | 'temper_alarm' | 'tamper_alarm';

export type DpType = 'bool' | 'value' | 'enum' | 'raw' | 'string' | 'bitmap';

export type NetworkType = 'WIFI' | 'GPRS' | 'BLE' | 'NONE';

export interface DpSchema {
  code: string;
  dptype: string;
  iconname: string;
  id: string;
  /**
   * type: 'bitmap' only
   */
  label?: string[] | undefined;
  /**
   * type: 'bitmap' only
   */
  maxlen?: number | undefined;
  /**
   * type: 'value' only
   */
  max?: number | undefined;
  /**
   * type: 'value' only
   */
  min?: number | undefined;
  mode: 'rw' | 'ro' | 'rw';
  name: string;
  /**
   * type: 'enum' only
   */
  range?: any[] | undefined;
  /**
   * type: 'value' only
   */
  scale?: number | undefined;
  /**
   * type: 'value' only
   */
  step?: number | undefined;
  type: DpType;
  /**
   * type: 'value' only
   */
  unit?: string | undefined;
  [props: string]: any;
}

export interface DevInfo<S = Record<string, DpType>> {
  ability: number;
  activeTime: number;
  /**
   * @deprecated
   */
  appId: number;
  appKey: string;
  /**
   * @desc 网络是否在线
   */
  appOnline: boolean;
  attribute: number;
  baseAttribute: number;
  bv: number;
  capability: number;
  category: string;
  categoryCode: string;
  cloudOnline: boolean;
  codeIds: Record<string, string>;
  communication: Record<string, any>;
  devAttribute: number;
  /**
   * @desc 设备是否在线
   */
  deviceOnline: boolean;
  deviceType: number;
  devId: string;
  displayDps: any[];
  displayMsgs: Record<string, any>;
  displayOrder: number;
  dpMaxTime: number;
  dpName: Record<string | number, string>;
  dps: Record<number, string>;
  errorCode: number;
  faultDps: any[];
  gatewayVerCAD: string;
  gwType: string;
  homeDisplayOrder: number;
  homeId: number;
  i18nTime: number;
  iconUrl: string;
  idCodes: Record<number, string>;
  ip: string;
  isAdmin: boolean;
  isCloudOnline: boolean;
  /**
   * @desc 局域网是否在线
   */
  isLocalOnline: boolean;
  isMeshBleOnline: boolean;
  isNewFirmware: boolean;
  isShare: boolean;
  isUniversalPanel: boolean;
  isVDevice: boolean;
  latitude: string;
  localKey: string;
  longitude: string;
  lpv: number;
  meshId: string;
  name: string;
  networkType: NetworkType;
  originJson: Record<string, any>;
  panelConfig: {
    bic: Array<{ code: string; selected: boolean; value?: string | undefined }>;
    fun?: Record<string, any> | undefined;
  };
  pcc: string;
  productId: string;
  protocolAttribute: number;
  pv: number;
  quickOpDps: any[];
  rnFind: boolean;
  roomId: number;
  runtimeEnv: string;
  schema: {
    [K in keyof S]: DpSchema;
  };
  schemaExt: string;
  sharedTime: number;
  sigmeshId: string;
  standard: boolean;
  standSchemaModel: Record<string, any>;
  state: S;
  supportGroup: boolean;
  supportSGroup: boolean;
  timezoneId: string;
  ui: string;
  uiId: string;
  uiPhase: string;
  uiType: string;
  uiVersion: string;
  upgrading: boolean;
  uuid: string;
  vendorInfo: string;
  verSw: string;
  virtual: boolean;
  parentId?: string | undefined;
  groupId?: string | undefined;
}

export interface IUserInfo {
  attribute: number;
  commPref: any[];
  domain: {
    aispeechHttpsUrl: string;
    aispeechQuicUrl: string;
    deviceHttpUrl: string;
    deviceHttpsPskUrl: string;
    deviceHttpsUrl: string;
    deviceMediaMqttUrl: string;
    deviceMediaMqttsUrl: string;
    deviceMqttsPskUrl: string;
    deviceMqttsUrl: string;
    gwApiUrl: string;
    gwMqttUrl: string;
    httpPort: number;
    httpsPort: number;
    httpsPskPort: number;
    mobileApiUrl: string;
    mobileMediaMqttUrl: string;
    mobileMqttUrl: string;
    mobileMqttsUrl: string;
    mobileQuicUrl: string;
    mqttPort: number;
    mqttQuicUrl: string;
    mqttsPort: number;
    mqttsPskPort: number;
    pxApiUrl: string;
    regionCode: string;
    tuyaAppUrl: string;
    tuyaImagesUrl: string;
  };
  email: string;
  extras: { developer: number; passwordSet: number };
  headPic: string;
  id: string;
  mobile: string;
  nickname: string;
  phoneCode: string;
  regFrom: number;
  snsNickname: string;
  tempUnit: number;
  timezoneId: string;
  userType: number;
  username: string;
}

export interface IStatisticsConfig<T = string> {
  [props: string]: {
    dpCode: T;
    dpId: number;
    type: ('sum' | 'avg' | 'minux' | 'max' | 'min' | 'count' | 'min&max')[];
  };
}

/**
 * @description 智能联动api
 */
export interface IAutos {
  background: string;
  displayColor: string;
  displayIcon: string;
  enabled: boolean;
  id: string;
  name: string;
}

export interface IProduceSetting {
  auditStatus: number;
  boundForPanel: boolean;
  boundForWiFiPanel: boolean;
  enabled: boolean;
  i18nData: {
    content: {
      en: string;
      zh: string;
      'zh-Hans': string;
    };
    name: {
      en: string;
      zh: string;
      'zh-Hans': string;
    };
  };
  id: string;
  iotAutoAlarm: boolean;
  isLogicRule: boolean;
  localLinkage: boolean;
  name: string;
  needCleanGidSid: boolean;
  needValidOutOfWork: boolean;
  newLocalScene: boolean;
  offGwSync: boolean;
  offGwSyncSuccess: boolean;
  outOfWork: number;
  stickyOnTop: boolean;
  [props: string]: any;
}

export interface ISceneIcons {
  type: string;
  url: string;
  defaultIconName: string;
  isRemoved: boolean;
  removeIconName: string;
}
export interface IScenes extends IAutos {
  sceneIcons: ISceneIcons[];
}
export interface ISceneAndAuto {
  autos: IAutos[];
  scenes: IScenes[];
}

export type PushType = 'appPushTrigger' | 'mobileVoiceSend' | 'smsSend';

/** 告警类型，需要传给云端 */

// eslint-disable-next-line no-shadow
export enum EntityValue {
  // 温度告警
  tempAlarm = 1,
  // 湿度告警
  humidityAlarm,
  // 防拆告警
  tamperAlarm,
}

/**
 * @param dpId 绑定的DP ID
 * @param dpValue 告警value
 * @param pushType 推送方式
 * @param timer 循环周期
 * @param timeout 超时时间
 * @param name 推动内容
 * @param entityValue 告警类型
 */
export interface IBindParams<I = string> {
  dpId: I;
  dpValue: string | boolean | number | any[];
  entityValue: string;
  pushType?: PushType;
  timer?: Array<{ start: string; end: string; loops: string }>;
  timeout?: number;
  name?: string;
  actionStrategy?: 'repeat' | 'edge'; // 持续触发 边缘触发
}

export interface IDpExcelQuery {
  dpId: number;
  name: string;
}

export interface IResponseSupportCall {
  attributeKey: string;
  attributeSign: number;
  group: string;
  icon: string;
  iconMini: string;
  iconShow: string;
  iconV2: string;
  id: string;
  nameKey: string;
  newRemark: string;
  remark: string;
  url: string;
}

export interface IResponseCallServiceStatus {
  // eslint-disable-next-line camelcase
  phone_notify_serve: {
    expireDate: number;
    packageStatus: number;
    remainingTimes: number;
  };
  // eslint-disable-next-line camelcase
  sms_notification: {
    expireDate: number;
    packageStatus: number;
    remainingTimes: number;
  };
  [props: string]: any;
}

export interface IActionsItem {
  actionExecutor: string;
  actionStrategy: 'repeat' | 'edge'; // 持续触发 边缘触发
  attribute: number;
  devDelMark: boolean;
  executorProperty: {
    deviceExecuteLog: number;
    [props: string]: any;
  };
  orderNum: number;
  ruleId: string;
  [props: string]: any;
}

export interface IConditionsItem {
  attribute: number;
  condType: number;
  devDelMark: boolean;
  entityId: string;
  entitySubIds: string;
  entityType: number;
  expr: any[];
  expression: string;
  extra: string;
  handleStrategy: string;
  orderNum: string;
  serverProperty: string;
  serviceProvider: string;
  [props: string]: any;
}

export interface IQueryDataItem {
  associativeEntityId: string;
  associativeEntityValue: string;
  bindExecutor: string;
  bindId: number;
  bizDomain: string;
  conditionRuleId: string;
  enable: boolean;
  icon: string;
  id: number;
  name: string;
  ownerId: string;
  property: string;
  sourceEntityId: string;
  status: boolean;
  triggerRuleId: string;
  triggerRuleVO: {
    preConditions: any[];
    actions: IActionsItem[];
    attribute: number;
    auditStatus: number;
    boundForPanel: boolean;
    boundForWiFiPanel: boolean;
    code: string;
    commonField: string;
    conditions: IConditionsItem[];
    coverIcon: string;
    displayColor: string;
    enabled: boolean;
    gmtCreate: number;
    gmtModified: number;
    id: string;
    iotAutoAlarm: boolean;
    isLogicRule: boolean;
    localLinkage: boolean;
    matchType: number;
    name: string;
    newLocalScene: boolean;
    outOfWork: number;
    ownerId: string;
    ruleSource: number;
    ruleType: number;
    runtimeEnv: string;
    scenarioRule: boolean;
    stickyOnTop: boolean;
    uid: string;
  };
  uid: string;
  [props: string]: any;
}

export type NoticeType = 'appPushTrigger' | 'mobileVoiceSend' | 'smsSend' | 'noSetting';

export interface IServe {
  url?: string;
  status?: boolean;
  nameKey?: string;
  title?: string;
  key?: NoticeType;
  pushType?: NoticeType;
  [key: string]: any;
}

/**
 * @sms 短信开通信息
 * @mobile 电话开通信息
 * @app app通知信息
 */
export interface IServerInfo {
  sms: IServe;
  mobile: IServe;
  app?: IServe;
}
export interface IHighAbilityResp {
  code: string;
  extConfig: string;
  isBuy: boolean;
  isEnable: boolean;
  uuid: boolean;
}
export interface IListItem<I = string, C = string> {
  conditionType: number;
  dpCode: C;
  dpId: I;
  dpValue: boolean | number[];
  entityValue: string;
  key: string;
  name: string;
  status: boolean;
  timer: {
    start: any;
    end: any;
    loops: any;
    weeks: string;
    id: any;
  }[];
  timeout?: number;
}

export interface IDeviceLogResponse {
  total: number;
  dpc: any[];
  dps: {
    timeStamp: number;
    dpId: number;
    timeStr: string;
    value: string;
  }[];
  hasNext: boolean;
}

// eslint-disable-next-line no-shadow
enum API {
  /**
   * @description 小时统计数据
   */
  hourList = 'tuya.m.dp.rang.stat.hour.list',
  /**
   * @description 天统计数据
   */
  dayList = 'tuya.m.dp.rang.stat.day.list',
  /**
   * 月统计数据
   */
  monthList = 'tuya.m.dp.rang.stat.month.list',
  /**
   * @description 小时导出数据
   */
  exportHourList = 'tuya.m.dp.rang.stat.hour.export',
  /**
   * @description 天导出数据
   */
  exportDayList = 'tuya.m.dp.rang.stat.day.export',
  /**
   * @description 月导出数据
   */
  exportMonthList = 'tuya.m.dp.rang.stat.month.export',
  /**
   * @description 根据业务域及源实体查询关联的绑定关系
   */
  queryCloudAlarm = 'tuya.m.linkage.associative.entity.query',
  /**
   * @description 绑定关联实体模型的业务数据接口
   */
  updateCloudAlarm = 'tuya.m.linkage.associative.entity.bind',
  /**
   * @description 取消绑定
   */
  removeCloudAlarm = 'tuya.m.linkage.bind.delete',
  /**
   * @description 业务解绑，删除后不可恢复
   */
  forceRemoveCloudAlarm = 'tuya.m.linkage.associative.entity.remove',
  /**
   * @description 获取支持的服务
   */
  supportCall = 'tuya.m.app.third.party.info',
  /**
   * @description 查询电话、短信服务是否开通/是否到期
   */
  serviceStatus = 'tuya.m.notification.subscribe.all.info',
  /**
   * @description 年平均
   */
  yearAverage = 'tuya.m.dp.total.avg.month',
  /**
   * @description 图片域名
   */
  ossUrl = 'tuya.m.app.panel.url.get',
  /**
   * 获取用户信息
   */
  userInfo = 'tuya.m.user.info.get',
  /**
   * @description 统计数据
   */
  statisticsConfig = 'tuya.m.dp.statistics.config.all.get',
  /**
   * @description 设备日志
   */
  deviceLog = 'tuya.m.operate.log',
  /**
   * @description 开启智能化场景
   */
  enableScene = 'tuya.m.linkage.rule.enable',
  /**
   * @description 告警启动&停用
   */
  enableRule = 'tuya.m.linkage.bind.enable',
  /**
   * @description 关闭智能化场景
   */
  disableScene = 'tuya.m.linkage.rule.disable',
  /**
   * @description 触发场景
   */
  startScene = 'tuya.m.linkage.rule.trigger',
  /**
   * @description 高级能力
   */
  highAbility = 'tuya.app.buyer.high.power.get',
  /**
   * @description 低功耗设备
   */
  lowPowDevice = 'tuya.p.support.dp.cache.get',
  /**
   * @description 下发dp
   */
  sendDp = 'tuya.m.device.cache.dp.add',
  /**
   * @description 产品配置
   */
  productSetting = 'tuya.m.linkage.rule.product.query',
  /**
   * @description 开启/关闭
   */
  productSwitch = 'tuya.m.linkage.dev.warn.set',
  /**
   * @description 查询联动设备执行日志
   */
  getAlarmScenesLog = 'tuya.m.linkage.device.execute.log.query',
  /**
   * @description
   */
  getLastDp = 'tuya.m.device.cache.dp.get',
  /**
   * @description
   */
  addCache = 'tuya.m.device.cache.dp.add',
}

/** 默认全天开启告警 */
const DEFAULT_TIME = [
  {
    start: '00:00',
    end: '23:59',
    loops: '1111111',
  },
];

const TYPublicNative = NativeModules.TYRCTScenePanelManager;

export interface IDpsInfos<T = Record<string, any>> {
  code: keyof T;
  dpId: number;
  time: number;
  type: DpType;
  value: string;
}

/**
 * @description T -> dpId枚举
 * @description K -> dpCode枚举
 */
class SensingSDK<I = string, C = string> {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  constructor(BIZ_DOMAIN: string, TYSdk: any, language: string) {
    if (!SensingSDK.INSTANCE) {
      this.BIZ_DOMAIN = BIZ_DOMAIN;
      this.devInfo! = TYSdk.devInfo;
      this.LANGUAGE = language;
      this.TYSdk! = TYSdk;
      SensingSDK.INSTANCE = this;
    }
    return SensingSDK.INSTANCE;
  }

  static INSTANCE: SensingSDK<any, any> | null = null;

  BIZ_DOMAIN:
    | string // 不要超过32，接口会做限制
    | undefined; // 不要超过32，接口会做限制

  devInfo: DevInfo | undefined;

  LANGUAGE: string | undefined;

  TYSdk:
    | Record<string, any>
    /**
     * @desc 根据业务域及源实体查询关联的绑定关系
     * @param dpId
     * @returns
     */
    | undefined;

  /**
   * @desc 根据业务域及源实体查询关联的绑定关系
   * @param dpId
   * @returns
   */
  queryCloudAlarm = (dpId?: I): Promise<IQueryDataItem[]> => {
    const entityID = dpId ? { associativeEntityId: dpId } : null;
    const sourceEntityId = this.devInfo!.devId;
    return apiRequest(
      API.queryCloudAlarm,
      {
        sourceEntityId,
        bizDomain: this.BIZ_DOMAIN,
        ...entityID,
      },
      '1.0'
    );
  };

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  getServerList = async (needApp = false) => {
    try {
      const serveLists = await this.getIsSupportCall(); // 服务列表
      const serveStatus = await this.getCallServiceStatus(); // 开通服务的状态
      const urlQuery = `clientId=${this.devInfo!.appKey}&lang=${this.LANGUAGE}&homeId=${
        this.devInfo!.homeId
      }`;
      const result = serveLists.reduce<Partial<IServerInfo>>((acc, item) => {
        if (/^.*(sms|call).*$/.test(item.nameKey)) {
          const key =
            item.nameKey === 'personal_push_call_service'
              ? 'phone_notify_serve'
              : 'sms_notification';
          const hasWh = item.url.includes('?');
          const isCall = item.nameKey.includes('call');
          // eslint-disable-next-line no-shadow
          const result = {
            url: `${item.url}${!hasWh ? '?' : '&'}${urlQuery}`,
            nameKey: item.nameKey,
            status: serveStatus[key].remainingTimes > 0,
            pushType: isCall ? 'mobileVoiceSend' : ('smsSend' as NoticeType),
            key: isCall ? 'mobileVoiceSend' : ('smsSend' as NoticeType),
          } as IServe;
          acc[isCall ? 'mobile' : 'sms'] = result;
        }
        return acc;
      }, {});
      if (needApp) {
        return {
          ...result,
          app: {
            status: true, // 一直为true,默认支持app通知
            pushType: 'appPushTrigger' as NoticeType,
            nameKey: '',
            key: 'appPushTrigger' as NoticeType,
          },
        };
      }
      return result;
    } catch (error) {
      __DEV__ && console.log('error', error);
      throw error;
    }
  };

  /**
   * @description 告警启动&停用
   * @param bindId 绑定告警ID
   * @param enable 开启/禁用
   * @returns {boolean}
   */
  enableRule = (bindId: string, enable: boolean) => {
    return apiRequest(API.enableRule, {
      bindId,
      enable,
    });
  };

  static enableRule = (bindId: string, enable: boolean) => {
    return apiRequest(API.enableRule, {
      bindId,
      enable,
    });
  };

  /**
   * @description 绑定关联实体模型的业务数据接口
   * @param {Object} params
   * @expr 匹配条件
   * @isBack {Boolean} 是否跳转会面板，修复消息中心点击，场景被删除
   * @returns
   */

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  updateCloudAlarm = (
    params: IBindParams<I>,
    expr:
      | ['>' | '<' | '>=' | '<=' | '==', '>' | '<' | '>=' | '<=' | '==']
      | '>'
      | '<'
      | '>='
      | '<='
      | '==',
    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    isBack: boolean = true
  ) => {
    const {
      dpId,
      dpValue,
      pushType = 'appPushTrigger',
      timer = DEFAULT_TIME,
      entityValue,
      name,
      actionStrategy = 'repeat',
    } = params;
    const { timezoneId, devId } = this.devInfo!;

    let conditions: any[] = [];

    const backInfo = isBack
      ? {
          jumpType: 'panel', // 跳转类型,固定 panel
          devId, // 要跳转的设备id
          source: 'deviceType',
        }
      : {};

    if (Array.isArray(dpValue)) {
      dpValue.forEach((item, index) => {
        conditions.push({
          entityId: devId,
          entityType: 1,
          entitySubIds: dpId,
          expr: Array.isArray(expr) && [[`$dp${dpId}`, index === 0 ? expr[0] : expr[1], item]],
        });
      });
    }

    if (typeof dpValue === 'boolean') {
      conditions = [
        {
          entityId: devId,
          entityType: 1,
          entitySubIds: dpId,
          expr: typeof expr === 'string' && [[`$dp${dpId}`, '==', dpValue]],
        },
      ];
    }

    if (typeof dpValue === 'number' || typeof dpValue === 'string') {
      // 数值类型
      conditions = [
        {
          entityId: devId,
          entityType: 1,
          entitySubIds: dpId,
          expr: typeof expr === 'string' && [[`$dp${dpId}`, expr, dpValue]],
        },
      ];
    }

    const postData = {
      relationExpr: {
        bizDomain: this.BIZ_DOMAIN,
        sourceEntityId: devId,
        associativeEntityId: dpId,
        associativeEntityValue: entityValue,
        triggerRuleVO: {
          name: name || '',
          preConditions: timer.map(d => ({
            expr: {
              ...d,
              timeZoneId: timezoneId,
              timeInterval: 'custom',
            },
            condType: 'timeCheck',
          })),
          // 触发动作
          actions: [
            {
              actionStrategy,
              actionExecutor: pushType,
              executorProperty: {
                deviceExecuteLog: 1,
                ...backInfo,
              },
            },
          ],
          conditions,
        },
        uniqueType: 3,
      },
    };

    return apiRequest(API.updateCloudAlarm, postData);
  };

  /**
   * @description 取消绑定,单个解绑
   * @param bindId 绑定id
   * @returns
   */

  removeCloudAlarm = (bindId: string) => apiRequest(API.removeCloudAlarm, { bindId });

  static removeCloudAlarm = (bindId: string) => apiRequest(API.removeCloudAlarm, { bindId });

  /**
   *
   * @param {string} associativeEntityId 设备ID、DP点、群组ID、规则ID等，保存时无该参数，则不传
   * @param {string} associativeEntityValue 保存时有该参数则必传，否则不传
   * @returns {boolean}
   */
  forceRemoveAlarm = (
    associativeEntityId: string,
    associativeEntityValue: string
  ): Promise<boolean> => {
    return apiRequest(API.forceRemoveCloudAlarm, {
      bizDomain: this.BIZ_DOMAIN, // 业务域标记,必传
      sourceEntityId: this.devInfo!.devId, // 设备id
      associativeEntityId: associativeEntityId, // 设备ID、DP点、群组ID、规则ID等，保存时无该参数，则不传
      associativeEntityValue: associativeEntityValue, // 保存时有该参数则必传，否则不传
    });
  };

  /**
   * @description 获取支持的服务
   * @returns
   */
  getIsSupportCall = (): Promise<IResponseSupportCall[]> =>
    apiRequest(API.supportCall, { homeId: this.devInfo!.homeId }, '4.0');

  /**
   * @description 查询电话、短信服务是否开通/是否到期
   * @returns
   */
  getCallServiceStatus = (): Promise<IResponseCallServiceStatus> =>
    apiRequest(API.serviceStatus, {});

  static getCallServiceStatus = (): Promise<IResponseCallServiceStatus> =>
    apiRequest(API.serviceStatus, {});

  /**
   * @desc 获取一天中每小时的数据
   * @param {array} dateArr - [Date.now()]
   * @param {String} dpCode
   * @param {String} type - 统计类型
   * @param {Boolean} isSourceData 是否使用源数据，不对数据进行处理
   * @param {Boolean} hideDataStaticLost 数据是否可继承
   * @param {Object} devInfo
   * @source 源数据
   * {
   *  "2021090100": "66.50"
   *  ....
   * }
   * @return 不足24小时则补齐
   * ```
   * {
   *  total: 10,
   *  average: 100,
   *  data:[
   *    {
   *      type:'avg',
   *      date: '00',
   *      value: '66.50'
   *    }
   * ]
   * }
   * ```
   */

  /* istanbul ignore next */

  getHourList = async (
    dateArr: number[],
    dpCode: string,
    type: ApiChartType = 'sum',
    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    isSourceData: boolean = false,
    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    hideDataStaticLost: boolean = true,
    devInfo = this.devInfo!
  ) => {
    try {
      const date = moment(dateArr[0])?.format('YYYYMMDD');
      const params = {
        date,
        type,
        devId: devInfo.devId,
        dpId: this.TYSdk!.device.getDpIdByCode(dpCode),
        auto: '2', // 无数据是补#
        number: 1,
        keepScalaPoint: true,
      };
      __DEV__ && console.log('日期', date, params);
      const Ret: Record<string, any> = await apiRequest(API.hourList, params, '1.0');
      if (isSourceData) return Ret;
      const result = wrapCharData(Ret, ['max', 'min'].includes(type) && hideDataStaticLost);
      const len = Object.keys(result).length;
      if (len !== 24) {
        const lastDate = Object.keys(result)[len - 1];
        times(24 - len, n => {
          const d = +lastDate + n + 1;
          result[d] = null;
        });
      }

      let totalNum = 0;
      const minAndMax = Object.values(result).filter(d => !empty.includes(d));

      const data = Object.keys(result).map(item => {
        const d = item.split('');
        const value = empty.includes(result[item]) ? null : +result[item];
        const end = d.pop();
        const start = d.pop();
        const wrapValue = value === null || value === undefined ? 0 : value;
        totalNum += wrapValue;
        return {
          type,
          value,
          dpCode,
          date: `${start}${end}`,
          originalDate: moment(item, 'YYYYMMDDHHmm').format('YYYY/MM/DD HH:mm'), // 将云端返回的字符串格式转换成moment格式
        };
      });

      const avg = totalNum / data.filter(d => d.value !== null).length;
      return {
        data,
        total: data.length,
        average: Number.isNaN(avg) ? 0 : avg.toFixed(devInfo?.schema[dpCode]?.scale || 0),
        min: +Math.min(...minAndMax),
        max: +Math.max(...minAndMax),
      };
    } catch (error: any) {
      __DEV__ && console.log('error', error);
      const err: any = parseJson(error);
      const msg = err.message || err.errorMsg;
      throw msg;
    }
  };

  /**
   * @desc 获取一月中每天的数据
   * @param {Array} dateArr - [Date.now(),Date.now()]
   * @param {String} dpCode
   * @param {String} type - 统计类型
   * @param {Boolean} isSourceData 是否使用源数据，不对数据进行处理
   * @param {Object} devInfo
   *
   * @return
   * ```
   * {
   *  total: 10,
   *  average: 100,
   *  data:[
   *    {
   *      type:'avg',
   *      date: '00',
   *      value: '66.50'
   *    }
   * ]
   * }
   * ```
   */

  /* istanbul ignore next */
  getDayList = async (
    dateArr: number[],
    dpCode: string,
    type: ApiChartType = 'sum',
    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    isSourceData: boolean = false,
    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    hideDataStaticLost: boolean = true,
    devInfo = this.devInfo!
  ) => {
    try {
      let startDay;
      let endDay;
      if (dateArr[0] === dateArr[1]) {
        // 开始时间和结束时间一样，则取最近一个月
        startDay = moment(dateArr[0])?.subtract(1, 'months')?.format('YYYYMMDD');
        endDay = moment(dateArr[1])?.format('YYYYMMDD');
      } else {
        startDay = moment(dateArr[0])?.format('YYYYMMDD');
        endDay = moment(dateArr[1])?.format('YYYYMMDD');
      }
      __DEV__ && console.log('日期', startDay, endDay, dateArr);
      const params = {
        devId: devInfo.devId,
        dpId: this.TYSdk!.device.getDpIdByCode(dpCode),
        startDay,
        endDay,
        type,
        auto: '2',
        keepScalaPoint: true,
      };
      const Ret: any = await apiRequest(API.dayList, params, '1.0');
      if (isSourceData) return Ret.result;
      const result = wrapCharData(Ret.result, ['max', 'min'].includes(type) && hideDataStaticLost);
      let totalNum = 0;
      const minAndMax: any[] = Object.values(result).filter((d: any) => !empty.includes(d));
      const data = Object.keys(result).map(item => {
        const d = item.split('');
        d.shift();
        d.shift();
        d.shift();
        d.shift();
        const value = empty.includes(result[item]) ? null : +result[item];
        totalNum += value === null || value === undefined ? 0 : value;
        return {
          type,
          value,
          dpCode,
          date: `${d[0]}${d[1]}/${d[2]}${d[3]}`,
          originalDate: moment(item, 'YYYYMMDD').format('YYYY/MM/DD'),
        };
      });
      const avg = totalNum / data.filter(d => d.value !== null).length;
      return {
        data,
        total: data.length,
        average: Number.isNaN(avg) ? 0 : avg.toFixed(devInfo?.schema[dpCode]?.scale || 0),
        min: +Math.min(...minAndMax),
        max: +Math.max(...minAndMax),
      };
    } catch (error: any) {
      __DEV__ && console.log('error', error);
      const err: any = parseJson(error);
      const msg = err.message || err.errorMsg;
      throw msg;
    }
  };

  /**
   * @desc 获取一年中每月的数据
   * @param {String} dateArr - [Date.now(),Date.now()]
   * @param {String} dpCode
   * @param {String} type - 统计类型
   * @param {Boolean} isSourceData 是否使用源数据，不对数据进行处理
   * @param {Boolean} hideDataStaticLost
   * @param {Object} devInfo 设备信息
   * @return
   * ```
   * {
   *  total: 10,
   *  average: 100,
   *  data:[
   *    {
   *      type:'avg',
   *      date: '00',
   *      value: '66.50'
   *    }
   * ]
   * }
   * ```
   */
  /* istanbul ignore next */
  getMonthList = async (
    dateArr: number[],
    dpCode: string,
    type: ApiChartType = 'sum',
    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    isSourceData: boolean = false,
    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    hideDataStaticLost: boolean = true,
    devInfo = this.devInfo!
  ) => {
    try {
      let startMonth;
      let endMonth;
      if (dateArr[0] === dateArr[1]) {
        // 开始时间和结束时间一样，则取最近一个月
        startMonth = moment(dateArr[0])?.subtract(1, 'years')?.format('YYYYMM');
        endMonth = moment(dateArr[1])?.format('YYYYMM');
      } else {
        startMonth = moment(dateArr[0])?.format('YYYYMM');
        endMonth = moment(dateArr[1])?.format('YYYYMM');
      }
      __DEV__ && console.log('日期', startMonth, endMonth);
      const params = {
        devId: devInfo.devId,
        dpId: this.TYSdk!.device.getDpIdByCode(dpCode),
        startMonth,
        endMonth,
        type,
        auto: '2',
        keepScalaPoint: true,
      };
      const Ret: any = await apiRequest(API.monthList, params, '1.0');
      if (isSourceData) return Ret.result;
      let totalNum = 0;
      const result = wrapCharData(Ret.result, ['max', 'min'].includes(type) && hideDataStaticLost);
      const minAndMax: any[] = Object.values(result).filter((d: any) => !empty.includes(d));
      const data = Object.keys(result).map(item => {
        const value = empty.includes(result[item]) ? null : +result[item];
        totalNum += value === null || value === undefined ? 0 : value;
        return {
          type,
          value,
          dpCode,
          date: moment(item, 'YYYYMM').format('YYYY/MM'),
          originalDate: moment(item, 'YYYYMM').format('YYYY/MM'),
        };
      });
      const avg = totalNum / data.filter(d => d.value !== null).length;
      return {
        data,
        total: data.length,
        average: Number.isNaN(avg) ? 0 : avg.toFixed(devInfo?.schema[dpCode]?.scale || 0),
        min: minAndMax.length === 0 ? 0 : +Math.min(...minAndMax),
        max: minAndMax.length === 0 ? 0 : +Math.max(...minAndMax),
      };
    } catch (error: any) {
      __DEV__ && console.log('error', error);
      const err: any = parseJson(error);
      const msg = err.message || err.errorMsg;
      throw msg;
    }
  };

  /**
   * @description 导出历史数据接口（日）
   * @oldApi tuya.m.dp.path.hour.export 老接口，废弃
   * @newApi tuya.m.dp.rang.stat.hour.export 新接口
   * @param {Array} date [Date.now()]
   * @param {array} dpExcelQuery [{dpId:1,name:'温度'}]
   * @param {string} email 18470186610@163.com
   * @param {string} type 'sum' | 'avg
   * @returns
   */
  /* istanbul ignore next */
  exportHourList = async (
    date: number[],
    dpExcelQuery: IDpExcelQuery[],
    email = '',
    type: ApiChartType = 'avg'
  ) => {
    try {
      const params = {
        email,
        type,
        date: moment(date[0]).format('YYYYMMDD'),
        number: 0,
        lang: this.LANGUAGE,
        auto: '2',
        devId: this.TYSdk!.devInfo.devId,
        dpExcelQuery: JSON.stringify(dpExcelQuery),
        title: this.TYSdk!.devInfo.name,
        keepScalaPoint: true, // 小数点位数是否和scale保持一致~
      };
      __DEV__ && console.log('params', params);
      return apiRequest(API.exportHourList, params, '1.0');
    } catch (error) {
      __DEV__ && console.log('error', error);
      throw error;
    }
  };
  /**
   * @description 导出历史数据接口（月）
   * @oldApi tuya.m.dp.path.hour.export 老接口，废弃
   * @newApi tuya.m.dp.rang.stat.hour.export 新接口
   * @param {Array} dateArr [Date.now(),Date.now()]
   * @param {array} dpExcelQuery [{dpId:1,name:'温度'}]
   * @param {string} email 18470186610@163.com
   * @param {string} type 'sum' | 'avg
   * @returns
   */
  /* istanbul ignore next */

  exportDayList = async (
    dateArr: number[],
    dpExcelQuery: IDpExcelQuery[],
    email = '',
    type: ApiChartType = 'avg'
  ) => {
    try {
      const params = {
        type,
        email,
        startDay: moment(dateArr[0]).format('YYYYMMDD'),
        endDay: moment(dateArr[1]).format('YYYYMMDD'),
        auto: '2',
        devId: this.TYSdk!.devInfo.devId,
        dpExcelQuery: JSON.stringify(dpExcelQuery),
        lang: this.LANGUAGE,
        title: this.TYSdk!.devInfo.name,
        keepScalaPoint: true, // 小数点位数是否和scale保持一致~
      };
      __DEV__ && console.log('params', params);
      return apiRequest(API.exportDayList, params, '1.0');
    } catch (error) {
      __DEV__ && console.log('error', error);
      throw error;
    }
  };

  /**
   * @description 导出历史数据接口（年）
   * @param {string} dateArr [Date.now(),Date.now()]
   * @param {array} dpExcelQuery [{dpId:1,name:'温度'}]
   * @param {string} email 18470186610@163.com
   * @param {string} type 'sum' | 'avg
   * @returns
   */
  /* istanbul ignore next */
  exportMonthList = async (
    dateArr: number[],
    dpExcelQuery: IDpExcelQuery[],
    email = '',
    type: ApiChartType = 'avg'
  ) => {
    try {
      const params = {
        email,
        type,
        auto: '2',
        startMonth: moment(dateArr[0]).format('YYYYMM'),
        endMonth: moment(dateArr[1]).format('YYYYMM'),
        devId: this.TYSdk!.devInfo.devId,
        dpExcelQuery: JSON.stringify(dpExcelQuery),
        lang: this.LANGUAGE,
        title: this.TYSdk!.devInfo.name,
        keepScalaPoint: true, // 小数点位数是否和scale保持一致~
      };
      return apiRequest(API.exportMonthList, params, '1.0');
    } catch (error) {
      __DEV__ && console.log('error', error);
      throw error;
    }
  };
  /**
   * @description 获取年平均
   * @param timeArr
   * @param code
   * @param type
   * @returns
   */
  /* istanbul ignore next */

  getYearAverage = async (timeArr: [number, number], code: C, type: ChartType) => {
    try {
      const startMonth = moment(timeArr[0]).format('YYYYMM');
      const endMonth = moment(timeArr[1]).format('YYYYMM');
      const Ret: any = await apiRequest(
        API.yearAverage,
        {
          dpId: this.TYSdk!.device.getDpIdByCode(code),
          startMonth,
          endMonth,
          type,
          devId: this.TYSdk!.devInfo.devId,
          auto: '2',
          keepScalaPoint: true,
        },
        '1.0'
      );
      return Ret || 0;
    } catch (error) {
      __DEV__ && console.log('error', error);
      throw error;
    }
  };

  /**
   * @description 获取图片域名前缀
   * @returns
   */

  getOssUrl = () => apiRequest<string>(API.ossUrl, {}, '1.0');

  static getOssUrl = () => apiRequest<string>(API.ossUrl, {}, '1.0');

  /**
   * @description 获取用户信息，包含温标信息
   * @returns
   */
  getUserInfo = () => apiRequest<IUserInfo>(API.userInfo, {});

  // 静态方法
  static getUserInfo = () => apiRequest<IUserInfo>(API.userInfo, {});

  /**
   *
   * @returns 获取开通统计Dp
   */

  /* istanbul ignore next */
  getStatisticsConfig = async () => {
    try {
      const list = await apiRequest(API.statisticsConfig, { pid: this.devInfo!.productId });
      const obj: IStatisticsConfig = {};
      if (Array.isArray(list)) {
        list.forEach(d => {
          const code = this.TYSdk!.device.getDpCodeById(d.dpId);
          obj[code] = {
            dpId: d.dpId,
            dpCode: code,
            type: obj[code]
              ? [...obj[code].type, d.algorithmType].sort()
              : [d.algorithmType].sort(),
          };
        });
      }
      return obj;
    } catch (error) {
      __DEV__ && console.log('error', error);
      throw error;
    }
  };

  /**
   * @description 查询联动设备执行日志（需要在云端存在绑定关系的)
   * @param dps dp点，字符串拼接
   * @param offset
   * @param limit
   * @returns
   */
  getAlarmScenesLog = <T = any>(dps: string, offset = 0, limit = 10) => {
    return apiRequest<{ totalCount: number; datas: T }>(API.getAlarmScenesLog, {
      triggerDevId: this.TYSdk?.devInfo.devId,
      source: 'associativeEntityBind',
      triggerDps: dps,
      offset,
      limit,
    });
  };

  /**
   * @description 获取设备日志信息
   * @param dpIds dpId 字符串
   * @param offset 偏移量
   * @param limit 显示数量
   * @returns
   */
  getDeviceLog = (dpIds: string, offset: number, limit: number): Promise<IDeviceLogResponse> => {
    return apiRequest(API.deviceLog, {
      dpIds,
      offset,
      limit,
      devId: this.TYSdk!.devInfo.devId,
      timeLength: '13',
      breakFrequencyLimit: true,
    });
  };

  /**
   * @description 开启关闭自动化场景
   * @param enable 开启/关闭
   * @param ruleId 规则Id
   * @returns Promise
   */

  enableScene = (enable: boolean, ruleId: string | number | undefined) => {
    const apiUrl = enable ? API.enableScene : API.disableScene;
    return apiRequest(apiUrl, {
      ruleId,
    });
  };

  static enableScene = (enable: boolean, ruleId: string | number | undefined) => {
    const apiUrl = enable ? API.enableScene : API.disableScene;
    return apiRequest(apiUrl, {
      ruleId,
    });
  };

  /**
   * @description  触发场景
   * @param ruleId 规则ID
   * @returns
   */
  startScene = (ruleId: string | number | undefined) => apiRequest(API.startScene, { ruleId });

  static startScene = (ruleId: string | number | undefined) =>
    apiRequest(API.startScene, { ruleId });

  /**
   *
   * @param resolve
   * @param reject
   * @returns
   */

  getSceneAndAuto = (resolve: (data: ISceneAndAuto) => void, reject: (err: Error) => void) =>
    TYPublicNative.getSceneAndAuto(this.devInfo!.devId, resolve, reject);

  /**
   * @param {String} 高级能力Code 默认dp缓存Code-tyabi8xqnc
   * @returns 高级能力获取
   */

  isHighAbility = (code: string): Promise<IHighAbilityResp> =>
    apiRequest(API.highAbility, { input: { deviceId: this.devInfo!.devId, code } });

  /**
   * @description 是否低功耗设备
   * @returns
   */

  isLowPowDevice = (): Promise<boolean> =>
    apiRequest(API.lowPowDevice, { productId: this.devInfo!.productId });

  /**
   * @description 获取缓存数据
   * @returns
   */

  getLastDp = (): Promise<any[]> => apiRequest(API.getLastDp, { devId: this.devInfo!.devId });

  /**
   * @description 添加缓存
   * @param dpInfo dp下发信息
   * @returns
   */
  addCache = (dpInfo: Record<string, any>) => {
    return apiRequest<boolean>(API.addCache, {
      devId: this.TYSdk!.devInfo.devId,
      dps: JSON.stringify(dpInfo),
      time: Date.now(),
    });
  };

  /**
   * @description 获取设备最近一次在线时间需要
   * @returns {IDpsInfos<T>[]} T 为DPState
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  getDpsInfos = <T = {}>() => {
    const key = this.TYSdk?.devInfo.groupId ? 'group' : 'device';
    const nameMap = {
      device: 's.m.dev.dp.get',
      group: 's.m.dev.group.dp.get',
    };
    const postDataMap = {
      device: {
        gwId: this?.TYSdk?.devInfo.devId,
        devId: this?.TYSdk?.devInfo.devId,
      },
      group: { groupId: this?.TYSdk?.devInfo.groupId },
    };
    const versionMap = {
      device: '2.0',
      group: '1.0',
    };
    return apiRequest<IDpsInfos<T>[]>(nameMap[key], postDataMap[key], versionMap[key]);
  };

  /**
   *
   * @returns iot平台上的产品配置
   */
  productSetting = () => apiRequest<IProduceSetting[]>(API.productSetting, {});
  /**
   *
   * @param ruleIds 规则ID
   * @param disabled 开启/关闭
   * @returns
   */
  productSwitch = (ruleIds: string, disabled: boolean) =>
    apiRequest<boolean>(API.productSwitch, {
      devId: this?.devInfo?.devId,
      disabled,
      ruleIds,
    });
}

export default SensingSDK;

export { SensingSDK };
