import React, { Component, PureComponent } from 'react';
import { View, StyleSheet, InteractionManager, Button, Clipboard } from 'react-native';
import { Utils, TYSdk } from '@tuya-rn/tuya-native-components';
import _ from 'lodash';

import TYRCTLaserMap from '../../../components/Basic/RCTLaserMap';
import { handleError } from '../../../utils/FunctionUtils';
import { convertColorToArgbHex } from '../../../utils/PressCoordinateUtils';
import { toJsonSafe } from '../../../utils/StringsUtils';
import { mapTypeMap, mapTypeMapHex } from '../../../protocol/ledong/map';

import { withMapDataObservable } from './hoc';
import { createBgAndPathObservable, createHistoryFile, createDpDataChannel$ } from './observables';
import constant from './constant';
import panelMapConfig, { ILaserMapPanelConfig } from './constant/panelMapConfig';
import nativeMap from './constant/nativeMap';
import dpValueFunc from './constant/dpValueFunc';
import { IdpCodesEnum, IdpCodesValueEnum } from './constant/dpCodes';

import TipBus from './tipBus';
import Loading from './Loading';
import { parseBitmapTypesColor, getTypesMap, getRoomIdColorMap } from './utils/parseColor';
import fileUtil from './utils/ParseMapFileUtil';

const {
  RatioUtils: { width },
} = Utils;

const {
  dpCodes: { dpCodesEnum: defaultDpCodesEnum, dpCodesValueEnum: defaultDpCodesValueEnum },
} = constant;
const { nativeMapStatus } = nativeMap;

enum mapDisplayModeEnum {
  immediateMap = 'immediateMap', // 实时地图
  history = 'history', // 历史地图
  splitMap = 'splitMap', // 地图分区
}

interface ILaserMapProps {
  history: {
    bucket: string;
    file: any;
  };
  uiInterFace?: {
    isEdit?: boolean; // 是否编辑
    isShowAppoint?: boolean; // 是否显示指拿扫哪
    isShowSweepArea?: boolean; // 是否显示清扫区域
    isShowForbiddenSweepArea?: boolean; // 是否显示禁扫区域
    isShowForbiddenMopArea?: boolean; // 是否显示禁拖区域
    isShowForbiddenWall?: boolean; // 是否显示虚拟墙
    isShowPileRing?: boolean; // 是否显示禁区禁示圈
    isShowSweepPath?: boolean; // 是否显示路径

    isShowRoomName?: boolean; // 是否显示分区名称
    isShowRoomProperty?: boolean; // 是否显示分区属性
    isShowRoomOrder?: boolean; // 是否显示分区顺序

    isMapLodingLite?: boolean; // 是否开启简洁loading
    isUseHistoryMapCache?: boolean; // 是否使用历史地图缓存
    isTestMode?: boolean; // 是否开启调试按钮
    isStatic?: boolean; // 是否为静态图

    bitmapColorType?: 'gray' | 'origin' | 'color';
    mainRouteId?: string; // 主地图路由id
    roomStateList?: {
      // 用于在编辑时，展示传入的数据
      id: string; // id
      active: boolean; // 是否选定
      name: number; // 名称
      water: number; // 水箱
      fan: number; // 吸力
      order: number; // 顺序
      // 后期可拓展分区业务内容：水箱啥的。。。
    }[];
  };
  config: ILaserMapPanelConfig;
  mapDisplayMode: mapDisplayModeEnum; // 地图模式
  dpCodesValueEnum: IdpCodesValueEnum;
  dpCodesEnum: IdpCodesEnum;

  onMapId: (data?: any) => any;
  onLaserMapPoints: (data?: any) => any;
  onLongPressInAreaView: (data?: any) => any;
  onClickSplitArea: (data?: any) => any;
}

interface ILaserMapState {
  mapId: number;
  bitmapBytes: number[];
  bitmapBytesIds: Map<string, number>;
  origin: { x: number; y: number };
  bitmapWidth: number;
  bitmapHeight: number;
  mapRoomData: Map<
    string,
    {
      id: string;
      tag: string;
      name: string;
      water: number;
      order: number;
      fan: number;
    }
  >;

  pathData: any[];
  viewHeight: number;
  viewWidth: number;
  resolution: number;
  RCTMapId: string;
  pilePosition?: {};
  planPathData: any[];

  areaMapId: number;
  appointData: any[];
  sweepRegionData: any[];
  virtualAreaData: any[];
  virtualMopAreaData: any[];
  virtualAllAreaData: any[];
  virtualAllWallData: any[];

  showCurPosRing: boolean;
  canUpdateMap: boolean;
  isBitMapEmpty: boolean;
  loading: boolean;

  // ----调试相关---
  immediateMapUrl: string;
  immediateRouUrl: string;
  historyMapUrl: string;
}

const defaultUiInterFace = {
  isEdit: false, // 是否编辑
  isShowAppoint: true, // 是否显示指拿扫哪
  isShowSweepArea: true, // 是否显示清扫区域
  isShowSweepPath: true,
  isShowForbiddenSweepArea: true, // 是否显示禁扫区域
  isShowForbiddenMopArea: true, // 是否显示禁拖区域
  isShowForbiddenWall: true, // 是否显示虚拟墙
  isShowPileRing: false,

  isShowRoomName: true, // 是否显示分区名称
  isShowRoomProperty: true, // 是否显示分区属性
  isShowRoomOrder: true, // 是否显示分区顺序

  isMapLodingLite: true,
  isUseHistoryMapCache: true,
  isTestMode: false,
  isStatic: false,
  bitmapColorType: 'color',
  mainRouteId: 'main',
  roomStateList: [],
};

// function createMap(config = {}, withDataChannel = withMapDataObservable) {
export default class LaserMapLeDong extends PureComponent<ILaserMapProps, ILaserMapState> {
  static mapConstant = constant;
  // 暴露地图内部数据
  static mapStoreObservable$ = fileUtil.storeSubject;
  
  static defaultProps = {
    history: {
      bucket: '',
      file: undefined,
    },
    dpCodesEnum: defaultDpCodesEnum,
    dpCodesValueEnum: defaultDpCodesValueEnum,
    config: panelMapConfig,
    mapDisplayMode: mapDisplayModeEnum.immediateMap,
    uiInterFace: defaultUiInterFace,

    onClickSplitArea: () => {},
  };

  /** 性能相关 */
  canUpdateMap: boolean = true; // 是否可以更新组件
  isRouteProcessing: boolean = false; // 路由是否开始跳转

  isHistory: boolean;
  subscriptionHeart: any;
  subscriptionMapData: any;
  subscriptionPathData: any;
  subscriptionHistoryData: any;
  subscriptionCommRow: any;
  subscriptionMapStoreChange: any;
  subscriptionRobotDp: any;

  bitmapBytesColorTypes = {
    color: [],
    gray: [],
    origin: [],
  };
  bitmapColorMapTypes = {
    color: {},
    gray: {},
    origin: {},
  };

  constructor(props: ILaserMapProps) {
    super(props);
    this.state = {
      viewHeight: 0,
      viewWidth: 0,
      resolution: 0.05,
      showCurPosRing: false,
      canUpdateMap: true,
      loading: true,
      isBitMapEmpty: false, // 地图是否为空
      refreash: true, // 仅用来强制更新组件
      RCTMapId: '',

      mapData: { origin: {} },
      mapRoomData: new Map(),
      bitmapBytes: [],

      areaMapId: 0,
      pathData: [],
      planPathData: [],
      appointData: [],
      sweepRegionData: [],
      virtualAreaData: [],
      virtualMopAreaData: [],
      virtualAllAreaData: [],

      immediateMapUrl: '',
      immediateRouUrl: '',
      historyMapUrl: '',
    };
    this.isHistory = !!this.props.history.file;
    // this.updateKey = null;
  }

  componentDidMount() {
    const { mapDisplayMode } = this.props;

    switch (mapDisplayMode) {
      case mapDisplayModeEnum.immediateMap:
        // 实时地图
        this.showImmediateMap();
        break;
      case mapDisplayModeEnum.history:
        // 历史地图
        this.showHistoryMap();
        break;
      case mapDisplayModeEnum.splitMap:
        // 地图分区
        this.showSplitMap();
        break;
    }
  }

  componentWillUnmount() {
    if (this.subscriptionMapData) {
      this.subscriptionMapData.unsubscribe();
    }
  }

  shouldComponentUpdate(nextProps: ILaserMapProps, nextState: ILaserMapState) {
    return (
      (this.canUpdateMap && nextState !== this.state) ||
      nextProps.uiInterFace !== this.props.uiInterFace
    );
  }

  showImmediateMap = () => {
    const { dpCodesEnum } = this.props;
    const config = this.getMapConfig();
    const uiInterFace = this.getInterFaceConfig();
    requestAnimationFrame(() => {
      // 创建rx数据流
      createBgAndPathObservable({ mapConfig: config });
    });

    // 订阅实时地图数据
    this.subscriptionMapData = fileUtil.storeSubject.subscribe(value => {
      try {
        if (!this.getInterFaceConfig().isStatic) {
          this.subscribeMapFileData(value);
        }
      } catch (e) {
        handleError(e);
      }
    }, handleError);

    // 订阅dp数据
    this.subscriptionRobotDp = createDpDataChannel$([
      dpCodesEnum.robotStatus,
      dpCodesEnum.cleanMode,
    ]).subscribe(this.subscribeRobotDp, handleError);

    TYSdk.event.on('NAVIGATOR_ON_WILL_FOCUS', ({ id } = {}) => {
      this.canUpdateMap = id === uiInterFace.mainRouteId;
      setTimeout(() => {
        id === uiInterFace.mainRouteId && this.setState({ refreash: !this.state.refreash });
      }, 100);
    });

    TYSdk.event.on('MapShouldUninterruptibleSleep', () => {
      this.canUpdateMap = false;
    });

    TYSdk.event.on('MapCanRunable', () => {
      this.canUpdateMap = true;
      setTimeout(() => {
        this.setState({ refreash: !this.state.refreash });
      }, 100);
    });
  };

  showHistoryMap = () => {
    const config = this.getMapConfig();
    // const { createHistoryFile$ } = createBgAndPathObservable();
    const { file, bucket } = this.props.history;

    const historyConfig = {
      bucket,
      file,
    };

    InteractionManager.runAfterInteractions(() => {
      setTimeout(() => {
        const nowStore = fileUtil.storeSubject.getValue();
        const { isUseHistoryMapCache } = this.getInterFaceConfig();
        if (nowStore.historyList.has(`${bucket}-${file}`) && isUseHistoryMapCache) {
          // 如果已经缓存且允许直接取结果
          const data = toJsonSafe(nowStore.historyList.get(`${bucket}-${file}`));
          if (!data || !_.isString(data)) {
            this.subscribeMapFileData(data);
            return;
          }
        }

        // 否则取数据
        createHistoryFile(historyConfig, { mapConfig: config });

        this.subscriptionMapData = fileUtil.storeSubject.subscribe(value => {
          // console.warn('value', value);
          try {
            if (value.historyList.has(`${bucket}-${file}`) && !this.state.bitmapBytesHex?.length) {
              const data = toJsonSafe(value.historyList.get(`${bucket}-${file}`));
              if (!data || !_.isString(data)) {
                this.subscribeMapFileData(data);
                return;
              }
            }
          } catch (e) {
            handleError(e);
          }
        }, handleError);
      }, 100);
    });
  };

  showSplitMap = () => {
    // 直接取最新实时地图数据
    InteractionManager.runAfterInteractions(() => {
      setTimeout(() => {
        if (this.getInterFaceConfig().isStatic) {
          const nowStore = fileUtil.storeSubject.getValue();
          this.subscribeMapFileData(nowStore);
          // this.subscribeCommRow(nowStore);
        }

        this.subscriptionMapData = fileUtil.storeSubject.subscribe(value => {
          const uiInterFace = this.getInterFaceConfig();

          try {
            if (!uiInterFace.isStatic) {
              this.subscribeMapFileData(value);
              // this.subscribePathFileData(value);
              // this.subscribeCommRow(value);
            }
          } catch (e) {
            handleError(e);
          }
        }, handleError);
      }, 100);
    });
  };

  subscribeMapFileData = async (data: any) => {
    const {
      // mapData,
      mapId,
      mapRoomData,
      bitmapBytes,
      bitmapBytesHex,
      bitmapBytesIds,
      width,
      height,
      origin_x,
      origin_y,

      areaMapId,
      pilePosition,
      appointData,
      sweepRegionData,
      virtualAreaData,
      virtualMopAreaData,
      virtualAllAreaData,
      virtualAllWallData,
      resolution,
      isBitMapEmpty,

      pathData,
    } = data || {};
    const {
      map: { isNativeParse },
    } = this.getMapConfig();

    const nextState = _.omitBy(
      {
        mapId,
        mapRoomData,
        bitmapBytes,
        bitmapBytesIds,
        origin: { x: origin_x, y: origin_y },
        bitmapWidth: width,
        bitmapHeight: height,

        resolution,
        pilePosition,

        areaMapId,
        appointData,
        sweepRegionData,
        virtualAreaData,
        virtualMopAreaData,
        virtualAllAreaData,
        virtualAllWallData,
        isBitMapEmpty,

        pathData,
        loading: bitmapBytesHex ? !bitmapBytesHex.length : true,
      },
      _.isNil
    );

    if (!isNativeParse && nextState.bitmapBytes && nextState.bitmapBytesIds) {
      const { bitmapBytesColorTypes, bitmapColorMapTypes } = await this.getBitmapColor({
        bitmapBytes,
        bitmapBytesIds,
      });

      this.bitmapBytesColorTypes = bitmapBytesColorTypes;
      this.bitmapColorMapTypes = bitmapColorMapTypes;
    }

    this.setState(nextState);
  };

  subscribeCommRow = (data: any) => {
    const { appointData, sweepRegionData, virtualAreaData, virtualMopAreaData } = data || {};

    const nextState =
      _.omitBy({ appointData, sweepRegionData, virtualAreaData, virtualMopAreaData }, _.isNil) ||
      {};
    this.setState(nextState);
  };

  subscribeRobotDp = (data: any) => {
    const { dpCodesEnum } = this.props;
    if (
      dpValueFunc.robotStatusIdle(data[dpCodesEnum.robotStatus]) ||
      dpValueFunc.robotStatusCharing(data[dpCodesEnum.robotStatus]) ||
      dpValueFunc.robotStatusFullCharge(data[dpCodesEnum.robotStatus])
    ) {
      this.setState({ showCurPosRing: true });
    } else {
      this.setState({ showCurPosRing: false });
    }
  };

  onLayout = (e: any) => {
    const { viewHeight, viewWidth } = this.state;

    if (viewHeight <= 0 && e) {
      this.setState({
        viewHeight: e.nativeEvent.layout.height,
        viewWidth: e.nativeEvent.layout.width,
      });
    }
  };

  onMapId = (data: { mapId: string }) => {
    const { mapId } = data;
    const { onMapId } = this.props;

    this.setState({ RCTMapId: mapId });
    onMapId && onMapId(data);
  };

  getRoomProperty = (params: { name: string; water: number; fan: number }) => {
    // const { mapRoomData } = this.state;
    const { isShowRoomName, isShowRoomProperty } = this.getInterFaceConfig();
    const { room } = this.getMapConfig();
    // const room = mapRoomData.get(key) || {};

    const roomProperty = [];
    if (isShowRoomName && params.name) {
      roomProperty.push({
        propertyType: 'text',
        value: params.name,
      });
    }
    if (isShowRoomProperty) {
      [
        { value: params.water, icon: 'waterIcons', enumName: 'waterEnum' },
        { value: params.fan, icon: 'fanIcons', enumName: 'fanEnum' },
      ].forEach(item => {
        const { value, icon, enumName } = item;
        if (!_.isUndefined(value)) {
          const iconIndex = (room[`${enumName}`] || []).indexOf(`${value}`);
          const iconUrl = room[icon][iconIndex];
          if (!!iconUrl) {
            roomProperty.push({
              propertyType: 'uri',
              value: iconUrl,
            });
          }
        }
      });
    }
    return roomProperty;
  };

  async getBitmapColor({ bitmapBytes, bitmapBytesIds }) {
    const { map } = this.getMapConfig();

    const { bitmapColorType } = this.getInterFaceConfig();

    const bitmapBytesColor = await parseBitmapTypesColor(bitmapBytes, {
      originMapColor: {
        sweep: map.sweepPointTypeColor,
        barrier: map.barrierPointTypeColor,
        unknown: map.unknownPointTypeColor,
        battery: map.batteryPointTypeColor,
      },
      colorType: bitmapColorType,
      bitmapValueBase: map.isNativeParse ? 16 : 10,
    });

    const roomType = getTypesMap(bitmapBytesIds, bitmapColorType, {
      bitmapValueBase: map.isNativeParse ? 16 : 10,
    });

    return {
      bitmapBytesColorTypes: {
        ...this.bitmapBytesColorTypes,
        [bitmapColorType]: bitmapBytesColor,
      },
      bitmapColorMapTypes: {
        ...this.bitmapColorMapTypes,
        [bitmapColorType]: roomType,
      },
    };
  }

  getBitmapData = () => {
    const { bitmapBytesColorTypes, bitmapColorMapTypes } = this;
    const {
      bitmapBytesIds,
      origin,
      bitmapWidth,
      bitmapHeight,
      mapRoomData,
      isBitMapEmpty,
    } = this.state;

    if (isBitMapEmpty) {
      return {
        width: 0,
        height: 0,
        data: '[]',
        origin: { x: 0, y: 0 },
        pointTypeColorMap: '{}',
        roomIdColorMap: '{}',
        roomInfo: '{}',
      };
    }

    const { map } = this.getMapConfig();

    const { bitmapColorType, roomStateList, isShowRoomOrder } = this.getInterFaceConfig();

    const roomIdColorMap = getRoomIdColorMap(bitmapBytesIds, bitmapColorType, {
      bitmapValueBase: map.isNativeParse ? 16 : 10,
    });
    const roomInfo = bitmapColorMapTypes[bitmapColorType] || {};

    Object.keys(roomInfo).forEach(key => {
      if (mapRoomData.has(key)) {
        const room = mapRoomData.get(key);
        const roomProperty = this.getRoomProperty({
          name: room?.name,
          water: room?.water,
          fan: room?.fan,
        });
        roomInfo[key] = {
          ...roomInfo[key],
          defaultSelected: false,
          defaultOrder: isShowRoomOrder ? room.order : 0,
          roomProperty,
          extend: JSON.stringify(room),
        };
      }
    });

    // 展示临时数据

    if (!_.isEmpty(roomInfo) && roomStateList.length) {
      console.warn('roomStateList.length', roomStateList);

      roomStateList.forEach(value => {
        const { id, name, active, water, fan, order, tag } = value;
        const roomProperty = this.getRoomProperty({
          name,
          water,
          fan,
        });

        const newSet = {
          defaultSelected: active,
          defaultOrder: order,
          roomProperty,
        };

        if (roomInfo[`${id}`]) {
          roomInfo[`${id}`] = {
            ...roomInfo[`${id}`],
            ...newSet,
          };
        }
        if (mapRoomData.has(tag)) {
          const room = mapRoomData.get(tag);
          if (room.id) {
            roomInfo[`${room.id}`] = {
              ...roomInfo[`${room.id}`],
              ...newSet,
            };
          }
        }
      });
    }

    return {
      width: bitmapWidth,
      height: bitmapHeight,
      data: JSON.stringify(bitmapBytesColorTypes[bitmapColorType] || []),
      origin,
      pointTypeColorMap: JSON.stringify({
        sweep: convertColorToArgbHex(map.sweepPointTypeColor),
        barrier: convertColorToArgbHex(map.barrierPointTypeColor),
        unknown: convertColorToArgbHex(map.unknownPointTypeColor),
        battery: convertColorToArgbHex(map.batteryPointTypeColor),
      }),
      roomIdColorMap: JSON.stringify(roomIdColorMap),
      roomInfo: JSON.stringify(roomInfo),
    };
  };

  getRoomInfo = curRoomInfo => {
    const { mapRoomData } = this.state;
    const { isShowRoomOrder } = this.getInterFaceConfig();
    const roomInfo = {};
    mapRoomData.forEach((room, key) => {
      // const bitmapId = DECToHex(Number(room.id)) || '';
      const bitmapId = room.id;
      const curInfo = curRoomInfo[bitmapId] || {};
      if (bitmapId || !roomInfo[bitmapId]) {
        const roomProperty = this.getRoomProperty({
          name: room?.name,
          water: room?.water,
          fan: room?.fan,
        });
        roomInfo[bitmapId] = {
          ...curInfo,
          defaultSelected: false,
          defaultOrder: isShowRoomOrder && room.order ? room.order : 0,
          roomProperty,
          extend: JSON.stringify(room),
        };
      }
    });
    return roomInfo;
  };

  getRoomInfoEidtData = (curRoomInfo = {}) => {
    const { roomStateList } = this.getInterFaceConfig();
    const { mapRoomData } = this.state;
    const roomInfo = {};
    roomStateList.forEach(value => {
      const { id, name, active, water, fan, order, tag } = value;
      // const id = DECToHex(originId);

      const roomProperty = this.getRoomProperty({
        name,
        water,
        fan,
      });

      const newSet = {
        defaultSelected: active,
        defaultOrder: order,
        roomProperty,
      };
      // 如果有Id
      if (mapRoomData.has(id)) {
        const room = mapRoomData.get(id);
        roomInfo[`${id}`] = {
          ...curRoomInfo[`${id}`],
          ...newSet,
          extend: JSON.stringify(room),
        };
      }
      // 如果有tag
      if (mapRoomData.has(tag)) {
        const room = mapRoomData.get(tag);
        if (room?.id) {
          // const HexId = DECToHex(Number(room?.id) || 0);
          roomInfo[`${room?.id}`] = {
            ...curRoomInfo[`${room?.id}`],
            ...newSet,
            extend: JSON.stringify(room),
          };
        }
      }
    });
    return roomInfo;
  };

  getBitmapDataNew = () => {
    const { bitmapBytesHex, origin, bitmapWidth, bitmapHeight } = this.state;

    const { map } = this.getMapConfig();
    const { bitmapColorType, roomStateList } = this.getInterFaceConfig();

    const originMapColor = {
      sweep: map.sweepPointTypeColor,
      barrier: map.barrierPointTypeColor,
      unknown: map.unknownPointTypeColor,
      battery: map.batteryPointTypeColor,
    };
    const roomIdColorMap = getRoomIdColorMapNew({
      colorType: bitmapColorType,
      originMapColor,
    });

    const roomInfo = getRoomInfoMapNew({
      colorType: bitmapColorType,
      originMapColor,
    });

    const robotRoomInfo = this.getRoomInfo(roomInfo);
    const editRoomInfo = this.getRoomInfoEidtData(roomInfo);
    const rezultRoomInfo = !roomStateList.length
      ? Object.assign({}, roomInfo, robotRoomInfo)
      : Object.assign({}, roomInfo, editRoomInfo);

    return {
      width: bitmapWidth,
      height: bitmapHeight,
      // data: JSON.stringify(bitmapBytesColorTypes[bitmapColorType] || []),
      origin,
      map: bitmapBytesHex,
      flipOrientation: 5,
      pointCount: Math.floor(bitmapBytesHex?.length / 2) || 0,
      roomIdColorMap: JSON.stringify(roomIdColorMap),
      roomInfo: JSON.stringify(rezultRoomInfo),
    };
  };

  getOldAreaData() {
    const {
      isShowForbiddenSweepArea,
      isShowSweepArea,
      isShowAppoint,
      isShowForbiddenMopArea,
    } = this.getInterFaceConfig();
    const { mapDisplayMode } = this.props;
    const {
      sweepRegionData,
      virtualAreaData,
      appointData,
      virtualMopAreaData,
      virtualAllAreaData,
      mapId,
      areaMapId,
    } = this.state;

    if (mapDisplayMode === mapDisplayModeEnum.immediateMap && mapId !== areaMapId) return [];
    const [RCTsweepRegionData, RCTvirtualAreaData, RCTvirtualMopAreaData, RCTvirtualAllAreaData] = [
      sweepRegionData,
      virtualAreaData,
      virtualMopAreaData,
      virtualAllAreaData,
    ].map(areaData => {
      if (!areaData) return null;
      if (areaData && !areaData.length) return [];
      return areaData.map(area => area.points);
    });

    const RCTappointData = appointData && appointData.points ? [appointData.points[0]] : null;
    const nextStateVirtualAreaData = [];
    RCTvirtualAreaData &&
      isShowForbiddenSweepArea &&
      nextStateVirtualAreaData.push(...RCTvirtualAreaData);
    RCTvirtualAllAreaData &&
      isShowForbiddenSweepArea &&
      nextStateVirtualAreaData.push(...RCTvirtualAllAreaData);
    RCTvirtualMopAreaData &&
      isShowForbiddenMopArea &&
      nextStateVirtualAreaData.push(...RCTvirtualMopAreaData);

    const nextState: any = {};
    RCTsweepRegionData && isShowSweepArea && (nextState.sweepRegionData = RCTsweepRegionData);
    RCTappointData && isShowAppoint && (nextState.appointData = RCTappointData);
    nextStateVirtualAreaData.length && (nextState.virtualAreaData = nextStateVirtualAreaData);

    return nextState;
  }

  getTypeAreaData() {
    const {
      isShowForbiddenSweepArea,
      isShowSweepArea,
      isShowAppoint,
      isShowForbiddenMopArea,
      isShowForbiddenWall,
    } = this.getInterFaceConfig();

    const { mapDisplayMode } = this.props;
    const {
      sweepRegionData,
      virtualAreaData,
      appointData,
      virtualMopAreaData,
      virtualAllAreaData,
      virtualAllWallData,
      mapId,
      areaMapId,
    } = this.state;

    if (mapDisplayMode === mapDisplayModeEnum.immediateMap && mapId !== areaMapId) return [];

    const nextTypeAreaData = [];
    sweepRegionData && isShowSweepArea && nextTypeAreaData.push(...sweepRegionData);
    appointData && appointData.points && isShowAppoint && nextTypeAreaData.push(appointData);
    virtualAreaData && isShowForbiddenSweepArea && nextTypeAreaData.push(...virtualAreaData);
    virtualAllAreaData && isShowForbiddenSweepArea && nextTypeAreaData.push(...virtualAllAreaData);
    virtualMopAreaData && isShowForbiddenMopArea && nextTypeAreaData.push(...virtualMopAreaData);
    virtualAllWallData && isShowForbiddenWall && nextTypeAreaData.push(...virtualAllWallData);

    return nextTypeAreaData;
  }

  getCurrentPos(pathData: [] = []) {
    return pathData[pathData.length - 1] || {};
  }

  getPilePosition() {
    const { pile } = this.getMapConfig();
    const { isShowPileRing } = this.getInterFaceConfig();
    const pilePosition = {
      ...this.state.pilePosition,
      radius: _.floor(pile.ringRadiusRealMeter / (this.state.resolution || 0.05)),
      bgColor: convertColorToArgbHex(pile.ringBgColor),
      borderColor: convertColorToArgbHex(pile.ringBorderColor),
    };

    if (isShowPileRing && pile.showWithForbiddenEdit) {
      return {
        ...pilePosition,
        hidden: false,
      };
    }
    return { ...pilePosition, hidden: true };
  }

  getInterFaceConfig() {
    const { uiInterFace } = this.props;
    return Object.assign({}, defaultUiInterFace, uiInterFace);
  }

  getMapConfig() {
    const { config } = this.props;
    return Object.assign({}, panelMapConfig, config);
  }

  dealDataToJson(data: any[]) {
    return JSON.stringify(data);
  }

  dealPathDataColor() {
    const { path, curPos } = this.getMapConfig();
    const { pathData, showCurPosRing } = this.state;
    const { isShowSweepPath } = this.getInterFaceConfig();

    if (!isShowSweepPath) return [];
    if (!pathData.length) return [];

    const tmp = [...pathData];
    tmp[tmp.length - 1] = {
      ...tmp[tmp.length - 1],
      hidden: !(curPos.showBreathingRingWithRobotCharge && showCurPosRing),
      rate: curPos.ringRate,
      bgColor: convertColorToArgbHex(curPos.ringBgColor),
      duration: curPos.ringDuration,
      dataColors: {
        common: convertColorToArgbHex(path.commonTypeColor),
        userTransitions: convertColorToArgbHex(path.userTransitionsTypeColor),
        charge: convertColorToArgbHex(path.chargeTypeColor),
        transitions: convertColorToArgbHex(path.transitionsTypeColor),
        control: convertColorToArgbHex(path.controlTypeColor),
      },
    };

    return tmp;
  }

  getFactorInfo() {
    const { area } = this.getMapConfig();
    const { resolution } = this.state;
    if (!area.showFactor) return {};
    return {
      factor: resolution,
      font: area.factorFontSize,
      color: convertColorToArgbHex(area.factorFontColor),
    };
  }

  renderMap() {
    const {
      // uiInterFace: { isEdit },
      onLaserMapPoints,
      onLongPressInAreaView,
      onClickSplitArea,
    } = this.props;
    const { area, path, map, curPos } = this.getMapConfig();
    const { isEdit } = this.getInterFaceConfig();
    const {
      map: { isNativeParse },
    } = this.getMapConfig();

    const { planPathData } = this.state;

    const mapData = isNativeParse ? this.getBitmapDataNew() : this.getBitmapData();
    console.log('mapData', mapData);

    const pathData: number[] = this.dealPathDataColor();
    const pilePosition = this.getPilePosition();
    const areaInfoList = this.getTypeAreaData();

    // const {
    //   appointData: appointDataOld,
    //   sweepRegionData: sweepRegionDataOld,
    //   virtualAreaData: virtualAreaDataOld,
    // } = this.getOldAreaData();

    return (
      <TYRCTLaserMap
        mapData={mapData}
        pathData={this.dealDataToJson(pathData)}
        pathColor={convertColorToArgbHex(path.color)}
        pathWidth={path.width}
        planPathData={this.dealDataToJson(planPathData)}
        planPathWidth={path.planPathWidth}
        planPathColor={convertColorToArgbHex(path.planPathColor)}
        currentPos={this.getCurrentPos(pathData)}
        pilePosition={pilePosition}
        sweepRegionColor={convertColorToArgbHex(area.sweepBgColor)}
        virtualAreaColor={convertColorToArgbHex(area.forbiddenSweepBgColor)}
        virtualWallColor={convertColorToArgbHex(area.forbiddenWallBgColor)}
        // appointData={appointDataOld}
        // sweepRegionData={sweepRegionDataOld}
        // virtualAreaData={virtualAreaDataOld}
        areaInfoList={this.dealDataToJson(areaInfoList)}
        appointIcon={area.appointIconUrl}
        markerIcon={curPos.iconUrl}
        hasTypeMap={map.isTypeManager}
        minAreaWidth={area.minWidth}
        isRotate={area.isForbiddenRotate}
        factorInfo={this.getFactorInfo()}
        edit={isEdit}
        onMapId={this.onMapId}
        onLaserMapPoints={onLaserMapPoints}
        onLongPressInAreaView={onLongPressInAreaView}
        onClickSplitArea={onClickSplitArea}
      />
    );
  }

  renderTestButton = () => {
    const { uiPhase = '', ui = '' } = TYSdk.devInfo || {};
    const { immediateMapUrl, immediateRouUrl, historyMapUrl } = this.state;
    const { mapDisplayMode, uiInterFace } = this.props;

    if (!uiInterFace.isTestMode) return;
    // if (uiPhase === 'release') return null;
    switch (mapDisplayMode) {
      case mapDisplayModeEnum.immediateMap:
        return (
          <View style={styles.test}>
            <Button
              title="复制实时地图URLbin"
              onPress={() => {
                Clipboard.setString(immediateMapUrl);
              }}
            />
            <Button
              title="复制云端路径URLbin"
              onPress={() => {
                Clipboard.setString(immediateRouUrl);
              }}
            />
          </View>
        );
      case mapDisplayModeEnum.history:
        return (
          <View style={styles.test}>
            <Button
              title="复制历史地图URLbin"
              onPress={() => {
                Clipboard.setString(historyMapUrl);
              }}
            />
          </View>
        );
      default:
        return null;
    }
  };

  render() {
    const { map } = this.getMapConfig();
    const uiInterFace = this.getInterFaceConfig();
    const { isBitMapEmpty } = this.state;
    const loading = this.state.loading;
    const hideMap = loading || isBitMapEmpty;

    return (
      <View style={styles.container}>
        <View style={styles.map}>{this.renderMap()}</View>

        <View style={styles.float} pointerEvents="none">
          {hideMap && (
            <Loading
              loadingImageUri={map.loadingImageUri}
              loadingShowType={map.loadingShowType}
              loadingColor={map.loadingColor}
              isLoading={loading}
              isEmpty={isBitMapEmpty}
              isLite={uiInterFace.isMapLodingLite}
              isShowLoadingTips={map.isShowLoadingTips}
            />
          )}
          <TipBus />
          {this.renderTestButton()}
        </View>
      </View>
    );
  }
}

//   return withDataChannel(LaserMap);
// }

// export default class LaserMapLeDong extends Component {
//   static mapConstant = constant;
//   static V1 = createMap();
//   // 暴露地图内部数据
//   static mapStoreObservable$ = fileUtil.storeSubject;
//   // static pathStoreObservable$ = createBgAndPathStoreObservable().pathStoreChannel$;

//   render() {
//     return <LaserMapLeDong.V1 {...this.props}></LaserMapLeDong.V1>;
//   }
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    backgroundColor: 'transparent',
  },

  float: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  test: {
    position: 'absolute',
    top: 40,
  },
});
