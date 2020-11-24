import React, { PureComponent } from 'react';
import { Constructor, View } from 'react-native';
import { Observable, BehaviorSubject, Scheduler, Subscription } from 'rxjs';
import _ from 'lodash';
import { map, pluck, distinctUntilChanged } from 'rxjs/operators';
import { TYSdk } from '@tuya-rn/tuya-native-components';

import Api from '../../../api';
import { handleError, getClassSingletonInstance } from '../../../utils/FunctionUtils';
import { isRobotQuiet } from '../../../utils/Robot';
import { EmptyMap, DrawMap, IEmptyMapProps } from '../../../components/RobotBusiness/EmptyMap';
import RCTLaserMap, { IRCTLaserMapProps } from '../../../components/Basic/RCTLaserMap';

import {
  createBgAndPathObservable,
  createAreaDataObservable,
  IMapFileData,
  IPathFileData,
  requestPathByStart,
  createHeart$,
  createScreenResume$,
  IMapHeader,
  MapProtocolType,
} from './observables';
import ParseMapFileUtil, {
  ParseMapFileUtilConfig,
  IHistoryMapConfig,
  IUrlMapConfig,
} from './utils/ParseMapFileUtil';
import { IAreaData } from './command';

import { LaserProtocol } from './protocols/protocols';
import { CharProtocol, BlobProtocol, BlobLz4TuyaProtocol } from './protocols';

// import { getGyroMapHistoryMediaV3Total } from '@Api';

interface IOnlyMapSubjectData {
  width: number;
  height: number;
  origin: { x: number; y: number };
  data: string;
  pilePosition: { x: number; y: number };
}

export interface ISubjectData extends IAreaData {
  mapData?: IOnlyMapSubjectData;
  pathData?: string;
  planPathData?: string;
  pilePosition?: {
    x: number;
    y: number;
  };
}

type SubscribeSectionType = 'all' | 'onlyMap' | 'onlyAreaFrame';

export interface IMapInfo {
  mapHeader: IMapHeader;
}

export class RealTimeMapStore {
  static singletonInstance: RealTimeMapStore;
  static fileProtocol: Constructor<LaserProtocol>;
  // static mapProtocolType: string | undefined;

  mapFileData$: Observable<IMapFileData>; // 地图数据源
  planPathFileData$: Observable<IPathFileData>; // 规划路径数据源
  pathFileData$: Observable<IPathFileData>; // 清扫路径数据源
  areaFrameData$: Observable<IAreaData>;

  mapData: IMapFileData;
  pathData: IPathFileData;
  planPathData: IPathFileData;
  areaFrames: IAreaData;
  subjectAll: BehaviorSubject<ISubjectData>;
  subjectOnlyMap?: BehaviorSubject<IOnlyMapSubjectData>;
  subjectOnlyAreaFrame?: BehaviorSubject<IAreaData>;
  createHistoryFile$: (config: IHistoryMapConfig) => Observable<any>;
  parseFileUtil: ParseMapFileUtil;
  sectionOnlyMapSubjects: Map<any, BehaviorSubject<ISubjectData>>;
  sectionOnlyAreaFrameSubjects: Map<any, BehaviorSubject<ISubjectData>>;
  requestIncrement$: Observable<[number, string]>;
  mapDataOptions: any;
  subjectMapInfo: BehaviorSubject<IMapInfo>;
  storeOptions: {
    commandCode?: string;
  };

  constructor(
    options: ParseMapFileUtilConfig,
    storeOptions: { commandCode?: string; mapProtocolType?: MapProtocolType } = {}
  ) {
    if (!RealTimeMapStore.fileProtocol) {
      throw new Error('RealTimeMapStore.protocol not RealTimeMapStore.build');
    }
    const {
      mapFileData$,
      pathFileData$,
      planPathFileData$,
      createHistoryFile$,
      fileUtil: parseFileUtil,
      requestIncrement$,
    } = createBgAndPathObservable(options, {
      protocol: getClassSingletonInstance(RealTimeMapStore.fileProtocol),
      mapProtocolType: storeOptions.mapProtocolType,
    });
    this.requestIncrement$ = requestIncrement$;

    this.parseFileUtil = parseFileUtil;
    this.mapFileData$ = mapFileData$;
    this.pathFileData$ = pathFileData$;
    this.planPathFileData$ = planPathFileData$;
    this.areaFrameData$ = createAreaDataObservable(storeOptions.commandCode);
    this.createHistoryFile$ = createHistoryFile$;
    this.subjectAll = new BehaviorSubject({} as ISubjectData);
    this.subjectMapInfo = new BehaviorSubject({} as IMapInfo);

    this.subjectOnlyMap = new BehaviorSubject({} as IOnlyMapSubjectData);
    this.subjectOnlyAreaFrame = new BehaviorSubject({} as IAreaData);
    this.sectionOnlyMapSubjects = new Map();
    this.sectionOnlyAreaFrameSubjects = new Map();

    this.subscribeData();
  }

  static bulidProtocol(fileProtocol: Constructor<LaserProtocol>) {
    RealTimeMapStore.fileProtocol = fileProtocol;
  }

  setMapDataOptions = (data: any) => {
    this.mapDataOptions = data;
  };

  onlyeMapPipes() {
    return [
      map<ISubjectData, IOnlyMapSubjectData | undefined>(data => {
        return data.mapData;
      }),
    ];
  }

  getLatestMap() {
    const { mapData } = this.subjectAll.getValue();
    return { mapData };
  }

  setSectionSubject(type: SubscribeSectionType, thisObj: Object) {
    if (type === 'all') {
      return;
    }
    if (type === 'onlyMap' && !this.sectionOnlyMapSubjects.has(thisObj)) {
      this.sectionOnlyMapSubjects.set(thisObj, new BehaviorSubject(this.getLatestMap()));
    }

    if (type === 'onlyAreaFrame' && !this.sectionOnlyAreaFrameSubjects.has(thisObj)) {
      this.sectionOnlyMapSubjects.set(thisObj, new BehaviorSubject(this.getLatestMap()));
    }
  }

  getSectionSubject(type: SubscribeSectionType, thisObj?: any) {
    if (type === 'onlyMap') {
      return this.sectionOnlyMapSubjects.get(thisObj);
    }
    if (type === 'onlyAreaFrame') {
      return this.sectionOnlyAreaFrameSubjects.get(thisObj);
    }

    return this.subjectAll;
  }

  clearSectionSubject(type: SubscribeSectionType, thisObj?: any) {
    if (type === 'all') return;
    let subject: BehaviorSubject<ISubjectData> | undefined;
    if (type === 'onlyMap') {
      subject = this.sectionOnlyMapSubjects.get(thisObj);
      this.sectionOnlyMapSubjects.delete(thisObj);
    } else if (type === 'onlyAreaFrame') {
      subject = this.sectionOnlyAreaFrameSubjects.get(thisObj);
      this.sectionOnlyAreaFrameSubjects.delete(thisObj);
    }
    if (subject) {
      subject.unsubscribe();
    }
  }

  getHistoryData(historyConfig: IHistoryMapConfig) {
    return new Promise<ISubjectData>((resolve, reject) => {
      this.createHistoryFile$(historyConfig).subscribe(data => {
        const { mapData, pathData, pilePosition } = data;
        resolve({ mapData, pathData, pilePosition });
      }, reject);
    });
  }

  getFileMapData = async (config: IUrlMapConfig) => {
    const data = await this.parseFileUtil.decodeFileMapData(config);
    const { mapData, pilePosition } = data;
    return { mapData, pilePosition };
  };

  subjectNext<T>(subject: BehaviorSubject<T> | undefined, value: any, type: 'replace' | 'merge') {
    if (!subject) {
      return;
    }
    if (type === 'replace') {
      subject.next(value);
    } else {
      const preValue = subject.getValue();
      const curValue = { ...preValue, ...value };
      subject.next(curValue);
    }
  }

  subjectListNext(map: Map<any, BehaviorSubject<ISubjectData>>, value: any) {
    const size = map.size;
    const values = [...map.values()];
    for (let index = 0; index < size; index++) {
      const itemSubject = values[index];
      this.subjectNext(itemSubject, value, 'replace');
    }
  }

  subscribeData() {
    this.mapFileData$.observeOn(Scheduler.async).subscribe((data: IMapFileData) => {
      const value = {
        mapData: { ...data.mapData, ...this.mapDataOptions },
        pilePosition: data.pilePosition,
      };
      const mapInfo = { mapHeader: data.header };
      this.subjectMapInfo.next(mapInfo);
      this.subjectNext<ISubjectData>(this.subjectAll, value, 'merge');
      this.subjectListNext(this.sectionOnlyMapSubjects, value);
    }, handleError);

    this.pathFileData$.observeOn(Scheduler.async).subscribe((data: IPathFileData) => {
      this.subjectNext<ISubjectData>(
        this.subjectAll,
        { pathData: this.stringifyData(data.pathData) },
        'merge'
      );
    }, handleError);

    this.planPathFileData$.observeOn(Scheduler.async).subscribe((data: IPathFileData) => {
      this.subjectNext<ISubjectData>(
        this.subjectAll,
        { planPathData: this.stringifyData(data.pathData) },
        'merge'
      );
    }, handleError);

    this.areaFrameData$.observeOn(Scheduler.async).subscribe((data: IAreaData) => {
      this.areaFrames = data;
      this.subjectNext<ISubjectData>(this.subjectAll, data, 'merge');
      this.subjectListNext(this.sectionOnlyAreaFrameSubjects, data);
      // this.subjectNext<IAreaData>(this.subjectOnlyAreaFrame, data, 'replace');
    }, handleError);
  }

  stringifyData(data: any) {
    return JSON.stringify(data);
  }

  getLatestFrame(
    subject?:
      | BehaviorSubject<ISubjectData>
      | BehaviorSubject<IOnlyMapSubjectData>
      | BehaviorSubject<IAreaData>
  ) {
    if (subject) {
      return subject.getValue();
    }
    return this.subjectAll && this.subjectAll.getValue();
  }

  getLatestMapInfo() {
    return this.subjectMapInfo.getValue();
  }

  subscribeAll<T>(next: (value: T) => void, error: (e: Error) => void = handleError) {
    this.subjectAll && this.subjectAll.subscribe(next, error);
  }
}

interface ILaserMapRealTimeProps extends IRCTLaserMapProps {
  subscribeType: SubscribeSectionType;
  onOriginChange?: (origin: { x: number; y: number }) => void;
  storeOptions?: {
    heartEnum?: { gmap: string; inmap: string };
    heartCode?: string;
    pointsColor: string[];
    commandCode: string;
    mapProtocolType: MapProtocolType;
  };
  mapDataOptions?: {
    pointTypeColorMap: any;
  };
  emptyMapProps?: IEmptyMapProps;
  onMapId: (data?: any) => any;
}

interface ILaserMapRealTimeState {
  mapProperties: ISubjectData;
  firstFrame: ISubjectData;
}

export class LaserMapRealTime extends PureComponent<
  ILaserMapRealTimeProps,
  ILaserMapRealTimeState
> {
  static defaultProps = {
    subscribeType: 'all',
  };

  static get HistoryMap() {
    return LaserMapHistory;
  }

  static get HistoryMapTuyaStream() {
    return LaserMapHistoryStream;
  }

  static get CharProtocol() {
    RealTimeMapStore.bulidProtocol(CharProtocol);
    return LaserMapRealTime;
  }

  static get BlobProtocol() {
    RealTimeMapStore.bulidProtocol(BlobProtocol);
    return LaserMapRealTime;
  }

  static get BlobLz4TuyaProtocol() {
    RealTimeMapStore.bulidProtocol(BlobLz4TuyaProtocol);
    return LaserMapRealTime;
  }

  state = {
    mapProperties: {},
    firstFrame: {},
  };

  storeMananger: RealTimeMapStore;
  subject: BehaviorSubject<ISubjectData>;
  originSubscription: Subscription;
  mapPropertiesSubscription: Subscription;
  commandCode: string;
  subscriptionHeart: Subscription;
  subscriptionScreenResume: Subscription;
  subscriptionPathIncrement: Subscription;

  constructor(props: ILaserMapRealTimeProps) {
    super(props);
    this.storeMananger = getClassSingletonInstance<RealTimeMapStore>(
      RealTimeMapStore,
      undefined,
      props.storeOptions
    );
    this.storeMananger.setSectionSubject(props.subscribeType, this);
    props.mapDataOptions && this.storeMananger.setMapDataOptions(props.mapDataOptions);
  }

  componentDidMount() {
    setTimeout(() => {
      this.subject = this.storeMananger.getSectionSubject(this.props.subscribeType, this);
      const firstFrame = this.storeMananger.getLatestFrame(this.subject);

      this.setState({ firstFrame });
      this.mapPropertiesSubscription = this.subject.subscribe((value: ISubjectData) => {
        this.setState({ mapProperties: value });
      });
      function diffOrigin(pre: { x: number; y: number }, cur: { x: number; y: number }) {
        if (!pre || !cur) {
          return false;
        }
        return `${pre.x}-${pre.y}` === `${cur.x}-${cur.y}`;
      }
      const origin$ = this.subject.pipe(
        pluck('mapData', 'origin'),
        distinctUntilChanged(diffOrigin)
      );
      // const origin$ = this.subject.pipe(pluck('mapData', 'origin'))

      if (this.props.onOriginChange) {
        this.originSubscription = origin$.subscribe((origin: { x: number; y: number }) => {
          this.props.onOriginChange && this.props.onOriginChange(origin);
        });
      }
      this.backgroundReady();
    }, 100);
  }

  componentWillUnmount() {
    if (this.originSubscription) {
      this.originSubscription.unsubscribe();
    }
    if (this.mapPropertiesSubscription) {
      this.mapPropertiesSubscription.unsubscribe();
    }
    if (this.subscriptionHeart) {
      this.subscriptionHeart.unsubscribe();
    }
    if (this.subscriptionScreenResume) {
      this.subscriptionScreenResume.unsubscribe();
    }
    if (this.subscriptionPathIncrement) {
      this.subscriptionPathIncrement.unsubscribe();
    }
    this.storeMananger.clearSectionSubject(this.props.subscribeType, this);
  }

  getLatestMapInfo() {
    return this.storeMananger.getLatestMapInfo();
  }

  /**
   * 主实时地图
   * 1. 自动请求增量路径。
   * 2. 首次加载，息屏重载自动请求区域框数据。
   * 3. 自动发心跳。
   *
   * @memberof LaserMapRealTime
   */
  backgroundReady = () => {
    const { storeOptions } = this.props;
    if (!storeOptions) return;
    requestPathByStart({ start: 0 });
    const { heartCode, heartEnum: { gmap, inmap } = {}, commandCode } = storeOptions;
    this.commandCode = commandCode;

    const heartConfig = {
      heartCode,
      heartEnum: { gmap, inmap },
    };

    this.subscriptionHeart = createHeart$(heartConfig).subscribe(() => {}, handleError);

    this.handleRestart(commandCode);

    this.subscriptionScreenResume = createScreenResume$().subscribe(
      this.subscribeScreenResume,
      handleError
    );

    this.subscriptionPathIncrement = this.storeMananger.requestIncrement$.subscribe(
      this.subscribePathIncrement,
      handleError
    );
  };

  subscribePathIncrement = ([start, status]: [number, string]) => {
    if (!isRobotQuiet(status)) {
      requestPathByStart({ start });
    }
  };

  // 首次加载和息屏resume 触发
  handleRestart(commandCode: string) {
    if (TYSdk.device.checkDpExist(commandCode)) {
      // 向机器请求获取所有框的数据。
      TYSdk.device.putDeviceData({ [commandCode]: 'AA013030' });
    }
  }

  subscribeScreenResume = () => {
    this.handleRestart(this.commandCode);
  };

  isEmptyMap() {
    const { mapHeader } = this.storeMananger.getLatestMapInfo();
    const mapWidth = mapHeader && mapHeader.bgWidth;
    const mapHeight = mapHeader && mapHeader.bgHeight;
    const isEmpty = mapWidth === 0 || mapHeight === 0;
    return isEmpty;
  }

  isWaitData() {
    const { mapProperties, firstFrame } = this.state;
    const finalProps = { ...firstFrame, ...mapProperties };
    return !finalProps.mapData;
  }

  onMapId = (data: { mapId: string }) => {
    const { onMapId } = this.props;
    onMapId && onMapId(data);
  };

  renderBox() {
    const { emptyMapProps } = this.props;
    if (this.isWaitData()) {
      return <DrawMap {...emptyMapProps}></DrawMap>;
    } else if (this.isEmptyMap()) {
      return <EmptyMap {...emptyMapProps}></EmptyMap>;
    }
    return null;
  }

  render() {
    const { mapProperties, firstFrame } = this.state;

    const { mapData } = mapProperties;
    const { height, width } = mapData || {};
    if (!height || !width) {
      delete mapProperties.pathData;

      if (mapProperties.mapData) {
        mapProperties.mapData = {
          ...mapProperties.mapData,
          origin: { x: 0, y: 0 },
        };
      }

      // realPathData = pathData;
    }
    return (
      <View style={{ flex: 1 }}>
        {this.renderBox()}
        <RCTLaserMap {...firstFrame} {...mapProperties} onMapId={this.onMapId} {...this.props} />
      </View>
    );
  }
}

export class LaserMapFrame extends PureComponent<ILaserMapRealTimeProps> {
  storeMananger = getClassSingletonInstance<RealTimeMapStore>(RealTimeMapStore);
  sectionSubject:
    | BehaviorSubject<ISubjectData>
    | BehaviorSubject<IOnlyMapSubjectData>
    | BehaviorSubject<IAreaData>;
  latestFrame: ISubjectData;

  state = {
    latestFrame: {},
  };

  constructor(props: ILaserMapRealTimeProps) {
    super(props);
    this.storeMananger.setSectionSubject(props.subscribeType, this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.sectionSubject = this.storeMananger.getSectionSubject(this.props.subscribeType);
      const latestFrame = this.storeMananger.getLatestFrame(this.sectionSubject);
      this.setState({ latestFrame });
    }, 100);
  }

  render() {
    const { latestFrame } = this.state;
    return <RCTLaserMap {...latestFrame} {...this.props}></RCTLaserMap>;
  }
}

interface ILaserMapHistoryProps extends ILaserMapRealTimeProps {
  bucket: string;
  history: { file: string; mapLen: number; pathLen: number };
}
export class LaserMapHistory extends PureComponent<ILaserMapHistoryProps> {
  static defualtProps = {};
  storeMananger = getClassSingletonInstance<RealTimeMapStore>(RealTimeMapStore);

  state = {
    data: {},
  };

  async componentDidMount() {
    const {
      bucket,
      history: { pathLen, mapLen, file },
    } = this.props;
    const data = await this.storeMananger.getHistoryData({
      bucket,
      mapLength: mapLen,
      pathLength: pathLen,
      file,
    });
    const { pathData = [] } = data;
    this.setState({ data: { ...data, pathData: JSON.stringify(pathData) } });
  }

  render() {
    return <RCTLaserMap {...this.props} {...this.state.data}></RCTLaserMap>;
  }
}

interface ILaserMapHistoryStreamProps extends ILaserMapRealTimeProps {
  sessionId: number;
  mapId: number;
  pathId: number;
}

export class LaserMapHistoryStream extends PureComponent<ILaserMapHistoryStreamProps> {
  static defualtProps = {
    pathId: 3,
  };

  storeMananger = getClassSingletonInstance<RealTimeMapStore>(RealTimeMapStore);

  state = {
    data: {},
  };

  async componentDidMount() {
    const { sessionId, mapId, pathId } = this.props;
    if (!sessionId) return;
    const format = d => d.slice(8);
    const mapBuffer = await Api.getGyroMapHistoryMediaV3Total(sessionId, mapId, { format });
    const pathBuffer = await Api.getGyroMapHistoryMediaV3Total(sessionId, pathId, { format });
    console.log({ mapBuffer, pathBuffer });
    if (!mapBuffer) return;
    const { mapData, pilePosition } = this.storeMananger.parseFileUtil.parseMapFile(mapBuffer);
    const { pathData: pathArray = [] } = pathBuffer
      ? this.storeMananger.parseFileUtil.parsePathFile(pathBuffer)
      : {};
    const pathData = pathArray ? JSON.stringify(pathArray) : '';
    this.setState({ data: { mapData, pathData, pilePosition } });
  }

  render() {
    return <RCTLaserMap {...this.props} {...this.state.data}></RCTLaserMap>;
  }
}

type ILaserMapHistoryFrameProps = IRCTLaserMapProps & IUrlMapConfig;

export class LaserMapFileFrame extends PureComponent<ILaserMapHistoryFrameProps> {
  storeMananger = getClassSingletonInstance<RealTimeMapStore>(RealTimeMapStore);

  mapProps: any;

  async componentDidMount() {
    const { bucket, file } = this.props;
    this.mapProps = await this.storeMananger.getFileMapData({ bucket, file });
    this.forceUpdate();
  }

  getFileUrl = async (filePath: string) => {
    const { bucket } = this.props;
    const url = await Api.getCloudFileUrl(bucket, filePath);
    return url;
  };

  render() {
    return <RCTLaserMap {...this.mapProps} {...this.props}></RCTLaserMap>;
  }
}
