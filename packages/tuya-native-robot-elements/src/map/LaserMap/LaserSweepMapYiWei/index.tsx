import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, Clipboard, Button } from 'react-native';
import { Utils, TYSdk } from '@tuya-rn/tuya-native-components';
import _ from 'lodash';
import { Subscription } from 'rxjs';

import { LoadingBubbles } from '../../../components/Display/Loading';
import TYRCTLaserMap from '../../../components/Basic/RCTLaserMap';
import { withMapHistory } from '../../../page/LaserYiWeiLayout/HistoryMap';
import { handleError } from '../../../utils/FunctionUtils';
import { isRobotQuiet } from '../../../utils/Robot';
import Api from '../../../api';

import {
  defaultMapConfig,
  mapConfigV2,
  mapConfigBlob,
  mapConfigTuya,
  mapConfigTuya_Lz4,
  mapConfigBlob_HidePath,
  mapConfigChar_HidePath,
  mapConfigBlob_Lz4,
  mapConfigBlob_Lz4_HidePath,
} from './constant';

import {
  createBgAndPathObservable,
  createHeart$,
  createScreenResume$,
  createAreaDataObservable,
  requestPathByStart,
} from './observables';

const {
  RatioUtils: { width, viewWidth },
} = Utils;

interface IMapConfig {
  isBlob: boolean;
}

interface ILaserMapProps {
  mapBg: number;
  pointsColor: string[];
  heartCode: string;
  heartEnum: {
    gmap: string;
    inmap: string;
  };
  bucket: string;
  history: {
    file: any;
    mapLen: number;
    pathLen: number;
  };
  isEdit: boolean;
  setOrigin: (v: any) => void;
  mapConfig: {};
  holdHeart: boolean;
  commandCode: string;
  isRobotQuit: (status: string) => boolean;
}

interface ILaserMapState {
  mapData: { origin: { x?: number; y?: number } };
  pathData: [];
  viewHeight: number;
  pilePosition?: {};
  planPathData: [];
  mapUrl?: string;
  areaData: any;
}

function createMap(config: IMapConfig = defaultMapConfig) {
  const finalConfig = { ...defaultMapConfig, ...config };

  class LaserMap extends Component<ILaserMapProps, ILaserMapState> {
    static defaultProps = {
      ...TYRCTLaserMap.defaultProps,
      commandCode: 'command',
      robotStatusCode: 'status',
      mapBg: 0,
      pointsColor: ['70A5EEFF', 'CDCCCCFF', 'FFFFFF00', 'ff6AD9FF'], // 清扫点，障碍点、未知区域、充电桩
      heartCode: null,
      heartEnum: {},
      holdHeart: true,
      bucket: '',
      history: {},
      isEdit: false,
      setOrigin: () => {}, // 兼容旧写法。== onOriginChange
      mapConfig: {},
      isRobotQuit: isRobotQuiet,
    };
    isHistory: boolean;
    subscriptionHeart: Subscription;
    subscriptionMapData: Subscription;
    subscriptionPathData: Subscription;
    subscriptionHistoryData: Subscription;
    subscriptionMapUrl: Subscription;
    mapScale: any;
    subscriptionScreenResume: Subscription;
    subscriptionAreaData: Subscription;
    subscriptionPathIncrement: Subscription;
    subscriptionPlanPathData: Subscription;

    static HistoryElement: any;

    constructor(props: ILaserMapProps) {
      super(props);
      this.getPanelConfig();
      this.state = {
        viewHeight: 0,
        mapData: { origin: {} },
        pathData: [],
        planPathData: [],
        areaData: {},
      };
      this.isHistory = !!this.props.history.file;
    }

    async componentDidMount() {
      const {
        mapFileData$,
        pathFileData$,
        planPathFileData$,
        createHistoryFile$,
        mapFileUrl$,
        requestIncrement$,
      } = createBgAndPathObservable({
        pointsColor: this.props.pointsColor,
        ...finalConfig,
      });

      if (!this.isHistory) {
        // 实时地图
        this.handleRestart();
        requestPathByStart({ start: 0 });
        const {
          holdHeart,
          heartCode,
          heartEnum: { gmap, inmap },
          commandCode,
        } = this.props;
        const heartConfig = {
          holdHeart,
          heartCode,
          heartEnum: { gmap, inmap },
        };
        this.subscriptionAreaData = createAreaDataObservable(commandCode).subscribe(
          this.subscibeAreaData,
          handleError
        );

        this.subscriptionPathIncrement = requestIncrement$.subscribe(
          this.subscribePathIncrement,
          handleError
        );

        this.subscriptionScreenResume = createScreenResume$().subscribe(
          this.subscribeScreenResume,
          handleError
        );
        this.subscriptionHeart = createHeart$(heartConfig).subscribe(() => {}, handleError);

        this.subscriptionMapData = mapFileData$.subscribe(this.subscribeMapFileData, handleError);
        this.subscriptionPathData = pathFileData$.subscribe(
          this.subscribePathFileData,
          handleError
        );
        this.subscriptionPlanPathData = planPathFileData$.subscribe(
          this.subscribePlanPathFileData,
          handleError
        );
        this.subscriptionMapUrl = mapFileUrl$.subscribe(this.subscribeMapUrl, handleError);
      } else {
        // 历史地图
        const { file, mapLen: mapLength, pathLen: pathLength } = this.props.history;

        const historyConfig = {
          bucket: this.props.bucket,
          file,
          mapLength,
          pathLength,
        };

        this.subscriptionHistoryData = createHistoryFile$(historyConfig).subscribe(
          this.subscribeHistoryFileData,
          handleError
        );
      }
    }

    componentWillUnmount() {
      if (this.subscriptionHistoryData) {
        this.subscriptionHistoryData.unsubscribe();
      }
      if (this.subscriptionHeart) {
        this.subscriptionHeart.unsubscribe();
      }
      if (this.subscriptionMapData) {
        this.subscriptionMapData.unsubscribe();
      }
      if (this.subscriptionPathData) {
        this.subscriptionPathData.unsubscribe();
      }
      if (this.subscriptionMapUrl) {
        this.subscriptionMapUrl.unsubscribe();
      }
      if (this.subscriptionScreenResume) {
        this.subscriptionScreenResume.unsubscribe();
      }
      if (this.subscriptionAreaData) {
        this.subscriptionAreaData.unsubscribe();
      }
      if (this.subscriptionPathIncrement) {
        this.subscriptionPathIncrement.unsubscribe();
      }
    }
    // 首次加载和息屏resume 触发
    handleRestart() {
      const { commandCode } = this.props;

      if (TYSdk.device.checkDpExist(commandCode)) {
        // 向机器请求获取所有框的数据。
        TYSdk.device.putDeviceData({ [commandCode]: 'AA013030', option: 0 });
      }
    }

    subscribeScreenResume = () => {
      this.handleRestart();
    };

    // eslint-disable-next-line react/sort-comp
    subscribeHistoryFileData = (data: any) => {
      this.setState(data);
    };

    subscibeAreaData = (data: any) => {
      this.setState({ areaData: data });
    };

    subscribePathIncrement = ([start, status]: [number, string]) => {
      if (!this.props.isRobotQuit(status)) {
        requestPathByStart({ start });
      }
    };

    subscribeMapFileData = (data: any) => {
      const { mapData, pilePosition, idColorMap } = data;
      const { origin } = mapData || {};
      this.setState({ mapData, pilePosition, idColorMap });
      // 兼容
      this.props.setOrigin(origin);
    };
    subscribeMapUrl = (mapUrl: string) => {
      this.setState({ mapUrl });
    };

    subscribePathFileData = (data: any) => {
      const { pathData } = data;
      this.setState({ pathData });
    };

    subscribePlanPathFileData = (data: any) => {
      const { pathData } = data;
      this.setState({ planPathData: pathData });
    };

    onLayout = (e: any) => {
      const { viewHeight } = this.state;

      if (viewHeight <= 0 && e) {
        this.setState({
          viewHeight: e.nativeEvent.layout.height,
        });
      }
    };

    getPanelConfig() {
      const { panelFunMapScale: mapScale = 1 } = Api.getFunConfig();
      this.mapScale = mapScale;
    }

    getCurrentPos(pathData: []) {
      return pathData[pathData.length - 1] || {};
    }

    dealPathData(pathData: []) {
      return JSON.stringify(pathData);
    }

    renderMap() {
      const { isEdit, mapConfig, ...fProps } = this.props;
      const { mapData, pathData, viewHeight, pilePosition, planPathData, idColorMap } = this.state;
      const finalMapData = { ...mapData };
      // #CDCCCCFF
      if (this.props.pointTypeColorMap) {
        finalMapData['pointTypeColorMap'] =
          typeof this.props.pointTypeColorMap === 'string'
            ? this.props.pointTypeColorMap
            : JSON.stringify(this.props.pointTypeColorMap);

        console.log('pointTypeColorMap', finalMapData['pointTypeColorMap']);
      }
      if (idColorMap) {
        finalMapData['roomIdColorMap'] = JSON.stringify(idColorMap);
        console.log('roomIdColorMap', finalMapData['roomIdColorMap']);
      }
      // debugger
      if (viewHeight) {
        return (
          <TYRCTLaserMap
            {...fProps}
            height={viewHeight}
            width={width}
            mapData={finalMapData}
            pathData={this.dealPathData(pathData)}
            planPathData={this.dealPathData(planPathData)}
            currentPos={this.getCurrentPos(pathData)}
            {...this.state.areaData}
            pilePosition={pilePosition}
            edit={isEdit}
            onMapId={({ mapId }) => {
              global.mapId = mapId;
              this.props.onMapId && this.props.onMapId({ mapId });
            }}
            {...mapConfig}
          />
        );
      }
      return null;
    }

    renderLoading = () => {
      return (
        <View style={[styles.loading, { bottom: this.state.viewHeight / 2 }]}>
          <LoadingBubbles size={10} color={this.props.pointsColor[0]} />
        </View>
      );
    };

    renderDebug() {
      const { mapUrl } = this.state;
      // mapUrl && Clipboard.setString(mapUrl);
      return (
        <View
          style={{
            position: 'absolute',
            bottom: 40,
            left: 0,
            height: 60,
            width: viewWidth,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Button
            onPress={() => {
              mapUrl && Clipboard.setString(mapUrl);
            }}
            title="点击复制地图文件url到剪贴板"
            color={'#00FF00'}
          ></Button>
        </View>
      );
    }

    render() {
      const { mapBg } = this.props;
      let content;
      const nodes = [
        !this.state.mapData.data && this.renderLoading(),
        this.renderMap(),
        // this.renderDebug(),
      ];

      if (mapBg) {
        content = (
          <ImageBackground style={styles.map} source={mapBg} onLayout={this.onLayout}>
            {nodes}
          </ImageBackground>
        );
      } else {
        content = (
          <View style={styles.map} onLayout={this.onLayout}>
            {nodes}
          </View>
        );
      }
      return content;
    }
  }
  const MapElement = LaserMap;
  const HistoyMapElement = withMapHistory(MapElement);
  MapElement.HistoryElement = HistoyMapElement;
  return MapElement;
}

/**
 * 激光&一微&全量&地图
 * 监听command dp点数据,并解析数据框，渲染在地图上。
 */
export default class LaserMapYiWei extends Component {
  static V1 = createMap();

  static V2 = createMap(mapConfigV2);

  static Char = createMap(); // char 传输

  static Char_HidePath = createMap(mapConfigChar_HidePath);

  static Blob = createMap(mapConfigBlob); // Blob 传输

  static Blob_Tuya = createMap(mapConfigTuya);
  static Blob_Tuya_Lz4 = createMap(mapConfigTuya_Lz4);

  static Blob_HidePath = createMap(mapConfigBlob_HidePath);

  static Blob_Lz4 = createMap(mapConfigBlob_Lz4);
  static Blob_Lz4_HidePath = createMap(mapConfigBlob_Lz4_HidePath);

  render() {
    return <LaserMapYiWei.Char {...this.props}></LaserMapYiWei.Char>;
  }
}

const SimpleLaserMap = LaserMapYiWei.V1;

export { SimpleLaserMap };

const styles = StyleSheet.create({
  map: {
    flex: 1,
    backgroundColor: 'transparent',
  },

  loading: {
    position: 'absolute',
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
