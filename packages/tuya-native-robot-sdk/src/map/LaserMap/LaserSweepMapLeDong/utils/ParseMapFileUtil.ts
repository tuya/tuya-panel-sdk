import { Utils, TYSdk } from '@tuya-rn/tuya-native-components';
import _random from 'lodash/random';
import _isEmpty from 'lodash/isEmpty';
import _isString from 'lodash/isString';
import _chunk from 'lodash/chunk';
import _omitBy from 'lodash/omitBy';
import _isNil from 'lodash/isNil';
import _isEqual from 'lodash/isEqual';
import _ from 'lodash';

import { BehaviorSubject, Subject } from 'rxjs';

import {
  path,
  cleanPoint,
  cleanZone,
  forbiddenZone,
  forbiddenWall,
  map as mapProtocol,
  mapPartition,
  area as areaProtocol,
} from '../../../../protocol/ledong';
import { stringToAtHex, atHexToString } from '../../../../utils/StringsUtils';
import { awaitExpectDpsState } from '../../../../utils/FunctionUtils';
import logger from '../../../../utils/LoggerUtils';

import dpCodes, { IdpCodesEnum } from '../constant/dpCodes';
import panelMapConfig, { ILaserMapPanelConfig } from '../constant/panelMapConfig';


const defaultParseConfig = {
  mapConfig: panelMapConfig,
  isTopLeft: false,
  dpCodesEnum: dpCodes.dpCodesEnum,
  // isGray: false,
};

export interface ParseMapFileUtilConfig {
  mapConfig?: ILaserMapPanelConfig;
  isBase64?: boolean;
  isTopLeft?: boolean; // 是否从左上角开始画
  dpCodesEnum?: IdpCodesEnum;
  // isGray: boolean;
}

// 地图存储数据类型
export interface IParseMapFileUtilMapStore {
  mapData: Object; // 废弃

  // 地图信息
  bitmapBytes: number[]; // 地图原始数据
  bitmapBytesIds: Map<number, number>; // id -> 数量
  autoAreaId: number; // 自动分区id
  pilePosition: Object; //充电桩
  mapPathId: number | undefined; // 地图中的路径id
  mapId: number | undefined; // 地图id
  width: number; // 地图bitmap宽
  height: number; // 地图bitmap高
  resolution: number; // 比例尺
  x_min: number; // 地图最小坐标——x
  y_min: number; // 地图最小坐标——y
  origin_x: number;
  origin_y: number;
  AllowForbidArea: boolean; // 是否允许设置区域
  isBitMapEmpty: boolean; // 是否为空
  hasMapRoom: boolean; // 地图是否有分区
  // RCTMapState: nativeMapStatus; // RCT地图组件状态
  // RCTMapId: string; // RCTd地图Id

  // -----区域信息
  areaMapId: number; // 区域中的mapId，需要和mapId匹配
  appointData: { x: number; y: number }; // 指哪扫哪数据
  sweepRegionData: any[];
  virtualAreaData: any[];
  virtualMopAreaData: any[];
  virtualAllAreaData: any[];
  virtualAllWallData: any[]; // 虚拟墙

  robotOriginAppointData: any;
  robotOriginSweepRegionData: any[];
  robotOriginVirtualAreaData: any[];
  robotOriginVirtualAllAreaData: any[];
  robotOriginVirtualMopAreaData: any[];
  robotOriginVirtualAllWallData: any[];

  mapRoomData: Map<string, any>; // 分区信息

  // ---路径信息
  pathId: number | undefined; // 路径Id
  pathData: { x: number; y: number; type: string }[] | [];
  hasPathInfo: number;
  startCount: number;
  totalCount: number;
  pointCounts: number;
  requestStart: number;

  // 历史地图缓存
  historyList: Map<string, string>;
}

export class ParseMapFileUtil {
  constructor(config?: ParseMapFileUtilConfig) {
    this.config = Object.assign({}, this.config, config);
    // this.addMapStateChangeListener();
    this.addStoreChangeEmitter();
    this.addStoreChange();
  }
  static instance: ParseMapFileUtil;
  static getInstance(config?: ParseMapFileUtilConfig) {
    if (!ParseMapFileUtil.instance) ParseMapFileUtil.instance = new ParseMapFileUtil(config);
    return this.instance;
  }

  config: ParseMapFileUtilConfig = defaultParseConfig;

  store = {
    mapData: {},
    bitmapBytes: [],
    bitmapBytesIds: [],
    pilePosition: {},
    mapPathId: undefined,
    autoAreaId: 0,
    mapId: 0,
    width: 0,
    height: 0,
    resolution: 0,
    x_min: 0,
    y_min: 0,

    origin_x: 0,
    origin_y: 0,
    AllowForbidArea: true, // 是否允许设置区域
    isBitMapEmpty: true, // 地图数据是否为空
    hasMapRoom: false, // 是否有地图分区
    // RCTMapState: 0, // RCT地图组件状态
    // RCTMapId: '', // RCTd地图Id, 3.16以上支持
    mapRoomData: new Map(),

    areaMapId: 0,
    appointData: {},
    sweepRegionData: [],
    virtualAreaData: [],
    virtualAllAreaData: [],
    virtualMopAreaData: [],
    virtualAllWallData: [],

    robotOriginAppointData: {},
    robotOriginSweepRegionData: [],
    robotOriginVirtualAreaData: [],
    robotOriginVirtualAllAreaData: [],
    robotOriginVirtualMopAreaData: [],
    robotOriginVirtualAllWallData: [],

    pathId: undefined,
    pathData: [],
    hasPathInfo: false,
    startCount: 0,
    totalCount: 0,
    pointCounts: 0,
    requestStart: 0,

    historyList: new Map(),
  };

  storeSubject = new BehaviorSubject(this.store);
  incrementSubject = new Subject();
  incrementSubjectSilent = new Subject();

  userId = `${_random(0, 9999)}`; // 随机一个用户id，作为标志

  setStore = (value = {}, broadcast = true) => {
    if (_isEmpty(value)) return;

    if (value.historyList) {
      const { key, data } = value.historyList || {};
      if (!key || !data) return;
      this.store.historyList.set(key, data);
    } else if (value.pathData || value.bitmapBytes) {
      // 如果是地图或路径数据，不比较直接过
      this.store = { ...this.store, ...value };
    } else {
      const keys = Object.keys(value);
      keys.forEach(key => {
        if (_isEqual(value[key], this.store[key])) delete value[key];
      });

      if (_isEmpty(value)) {
        return;
      }
      this.store = { ...this.store, ...value };
    }

    if (broadcast) {
      // 如果需要广播
      logger.info('TUYA-地图所有数据', this.store);
      TYSdk.event.emit('robot_receive_mapStateChange', value);
      this.storeSubject.next(this.store);
    }
  };

  addStoreChange() {
    this.storeSubject
      .scan((pre, cur) => {
        this.onAutoAreaIdChange(pre.autoAreaId, cur.autoAreaId);
        return cur;
      })
      .subscribe();
  }

  addStoreChangeEmitter() {
    this.incrementSubject.subscribe((value = {}) => {
      this.setStore(value);
    });
    this.incrementSubjectSilent.subscribe((value = {}) => {
      this.setStore(value, false);
    });
  }

  accumulatePath = (prePath: any, curPath: any) => {
    return path.decodeWithScanOrigin(
      prePath,
      curPath,
      this.store.requestStart,
      this.store.mapPathId
    );
  };

  onAutoAreaIdChange = (preId: number, curId: number) => {
    if (preId !== curId) {
      console.log('onAutoAreaIdChange', preId !== curId, preId, curId);
      this.requestZoneData();
    }
  };

  decodePathFile = (data: string, opts: { mapPathId?: number }) => {
    const { x_min, y_min } = this.store;
    if (!x_min || !y_min) return {};

    const pathvalue = path.decode(data, {
      mapPathId: opts.mapPathId,
      resolution: this.store.resolution,
    });

    if (_isEmpty(pathvalue)) return {};

    const { pathData, hasPathInfo, pathId, totalCount, startCount, pointCounts } = pathvalue;

    const nextState = {
      // ...this.pathStore,
      pathData,
      hasPathInfo,
      pathId,
      totalCount,
      startCount,
      pointCounts,
    };

    return nextState;
  };

  /**
   *
   * 请求路径
   * @param {string} [pathCode]
   */
  requestPathByStart = ({ code, start = 0 }: { code: any; start: number }) => {
    if (typeof code !== 'string') {
      console.warn(`pathDataCode: ${code} isn't string`);
      return;
    }
    if (typeof start !== 'number') {
      console.warn(`start: ${start} isn't number `);
      return;
    }

    const data = path.encodeRequest({
      startCount: start,
      userId: this.userId,
    });

    // this.pathStore = { ...this.pathStore, requestStart: start };

    TYSdk.device.putDeviceData({
      [code]: stringToAtHex(JSON.stringify(data)),
      option: 0,
    });
  };

  requestZoneData = async () => {
    const { userId } = this;
    const { dpCodesEnum } = this.config;
    const commData = {
      data: {
        sn: TYSdk.devInfo.devId,
        userId,
      },
      infoType: 21004,
      dInfo: { userId, ts: `${new Date().getTime()}` },
    };

    TYSdk.device.putDeviceData({
      [dpCodesEnum.commRaw]: stringToAtHex(JSON.stringify(commData)),
      option: 0,
    });

    const expectValue = [
      {
        dpCode: dpCodesEnum.commRaw,
        comparator: (value = '') => {
          const { infoType } = Utils.JsonUtils.parseJSON(atHexToString(value)) || {};
          if (infoType === 21004) return true;
          return false;
        },
      },
    ];

    await awaitExpectDpsState(expectValue);
  };

  decodeMapFile = async (
    data: string,
    opts: { mapConfig: ILaserMapPanelConfig; isHistory?: boolean } = {
      mapConfig: panelMapConfig,
      isHistory: false,
    }
  ): Promise<IParseMapFileUtilMapStore | Object> => {
    const {
      mapConfig: { map, area, pile },
    } = opts;
    const { resolution } = this.store;
    const nextState = await mapProtocol.decode(data, {
      isTopLeft: false,
    });
    const { robotOriginAreaData } = nextState;
    const appointData = cleanPoint.decodeToRCTArea(robotOriginAreaData, { resolution });

    if (opts.isHistory) {
      const sweepRegionData = cleanZone.decodeToRCTArea(robotOriginAreaData, {
        resolution,
        bgColor: area.sweepBgColor,
        borderColor: area.sweepBorderColor,
        textColor: area.sweepTextColor,
        showName: area.sweepNameDisplay,
        canEditName: area.sweepNameEdit,
      });
      const virtualAllAreaData = forbiddenZone.decodeToRCTArea(robotOriginAreaData, {
        resolution,
        bgColor: area.forbiddenSweepBgColor,
        borderColor: area.forbiddenSweepBorderColor,
        textColor: area.forbiddenSweepTextColor,
        forbidType: forbiddenZone.ForbidTypeEnum.all,
        showName: area.forbiddenSweepNameDisplay,
        canEditName: area.forbiddenSweepNameEdit,
      });
      const virtualAreaData = forbiddenZone.decodeToRCTArea(robotOriginAreaData, {
        resolution,
        bgColor: area.forbiddenSweepBgColor,
        borderColor: area.forbiddenSweepBorderColor,
        textColor: area.forbiddenSweepTextColor,
        forbidType: forbiddenZone.ForbidTypeEnum.sweep,
        showName: area.forbiddenSweepNameDisplay,
        canEditName: area.forbiddenSweepNameEdit,
      });
      const virtualMopAreaData = forbiddenZone.decodeToRCTArea(robotOriginAreaData, {
        resolution,
        bgColor: area.forbiddenMopBgColor,
        borderColor: area.forbiddenMopBorderColor,
        textColor: area.forbiddenMopTextColor,
        forbidType: forbiddenZone.ForbidTypeEnum.mop,
        showName: area.forbiddenMopNameDisplay,
        canEditName: area.forbiddenMopNameEdit,
      });
      return _omitBy(
        {
          ...nextState,
          appointData,
          sweepRegionData,
          virtualAreaData,
          virtualMopAreaData,
          virtualAllAreaData,
        },
        _isNil
      );
    }
    return _omitBy({ ...nextState, appointData }, _isNil);
  };

  decodeComplexCmd = (
    content: string,
    opts: { mapConfig: ILaserMapPanelConfig } = { mapConfig: panelMapConfig }
  ) => {
    const { resolution } = this.store;
    const {
      mapConfig: { area },
    } = opts;
    // 解析 command Dp，有多种类型的数据交互,
    const areaInfo = areaProtocol.decode(content);
    const robotOriginAppointData = cleanPoint.partitionFromComm(content);
    const robotOriginSweepRegionData = cleanZone.partitionFromComm(content);
    const robotOriginVirtualAreaData = forbiddenZone.partitionFromComm(content, {
      forbidType: forbiddenZone.ForbidTypeEnum.sweep,
    });

    const robotOriginVirtualAllAreaData = forbiddenZone.partitionFromComm(content, {
      forbidType: forbiddenZone.ForbidTypeEnum.all,
    });

    const robotOriginVirtualMopAreaData = forbiddenZone.partitionFromComm(content, {
      forbidType: forbiddenZone.ForbidTypeEnum.mop,
    });
    const robotOriginVirtualAllWallData = forbiddenWall.partitionFromComm(content, {
      forbidType: forbiddenZone.ForbidTypeEnum.all,
    });

    const appointData = cleanPoint.decodeCommToRCTArea(content, { resolution });
    const sweepRegionData = cleanZone.decodeCommToRCTArea(content, {
      resolution,
      bgColor: area.sweepBgColor,
      borderColor: area.sweepBorderColor,
      textColor: area.sweepTextColor,
      showName: area.sweepNameDisplay,
      canEditName: area.sweepNameEdit,
    });
    const virtualAreaData = forbiddenZone.decodeCommToRCTArea(content, {
      resolution,
      bgColor: area.forbiddenSweepBgColor,
      borderColor: area.forbiddenSweepBorderColor,
      textColor: area.forbiddenSweepTextColor,
      forbidType: forbiddenZone.ForbidTypeEnum.sweep,
      showName: area.forbiddenSweepNameDisplay,
      canEditName: area.forbiddenSweepNameEdit,
    });

    const virtualAllAreaData = forbiddenZone.decodeCommToRCTArea(content, {
      resolution,
      bgColor: area.forbiddenSweepBgColor,
      borderColor: area.forbiddenSweepBorderColor,
      textColor: area.forbiddenSweepTextColor,
      forbidType: forbiddenZone.ForbidTypeEnum.all,
      showName: area.forbiddenSweepNameDisplay,
      canEditName: area.forbiddenSweepNameEdit,
    });

    const virtualAllWallData = forbiddenWall.decodeCommToRCTArea(content, {
      resolution,
      bgColor: area.forbiddenWallBgColor,
      // borderColor: area.forbiddenSweepBorderColor,
      // textColor: area.forbiddenSweepTextColor,
      forbidType: forbiddenZone.ForbidTypeEnum.all,
      lineWidth: area.forbiddenWallLineWidth,
    });

    const virtualMopAreaData = forbiddenZone.decodeCommToRCTArea(content, {
      resolution,
      bgColor: area.forbiddenMopBgColor,
      borderColor: area.forbiddenMopBorderColor,
      textColor: area.forbiddenMopTextColor,
      forbidType: forbiddenZone.ForbidTypeEnum.mop,
      showName: area.forbiddenMopNameDisplay,
      canEditName: area.forbiddenMopNameEdit,
    });

    const mapRoomData = mapPartition.decodeSaveDataFromComm(content);

    const nextState: any =
      _omitBy(
        {
          areaMapId: areaInfo?.data?.mapId,
          appointData,
          sweepRegionData,
          virtualAreaData,
          virtualMopAreaData,
          virtualAllAreaData,
          virtualAllWallData,
          robotOriginAppointData,
          robotOriginSweepRegionData,
          robotOriginVirtualAreaData,
          robotOriginVirtualMopAreaData,
          robotOriginVirtualAllAreaData,
          robotOriginVirtualAllWallData,
          mapRoomData,
        },
        _isNil
      ) || {};

    logger.info('debugger---decodeComplexCmd', {
      content,
      nextState,
    });

    return nextState;
  };

  decodeHistoryFile = async (
    content: string,
    opts: { mapConfig: ILaserMapPanelConfig } = { mapConfig: panelMapConfig }
  ) => {
    const {
      mapConfig: { area },
    } = opts;
    const mapData = await this.decodeMapFile(content, { ...opts, isHistory: true });
    const { posArray, resolution } = mapData;
    const pathData = path.parsePath(posArray, { resolution });

    return {
      ...mapData,
      pathData,
    };
  };
}

export default ParseMapFileUtil.getInstance();
