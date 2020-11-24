import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { Utils, TYSdk } from '@tuya-rn/tuya-native-components';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import _isEmpty from 'lodash/isEmpty';
import _parseInt from 'lodash/parseInt';

import { TYRCTGyroMapManager } from '../../../components/Basic/RCTGyroMap';
import SvgMap from '../../../components/Basic/SvgMap';
import Loading from '../../../components/Display/Loading';
import { TransferV1 } from '../../../utils/MapServiceChannelUtils';
import { handleError } from '../../../utils/FunctionUtils';
import logger from '../../../utils/LoggerUtils';

import ParseMapFileUtil from '../utils/ParseMapFileUtil';

// import data from './data2.json';

const { viewWidth, viewHeight } = Utils.RatioUtils;
interface IPoint {
  x?: number;
  y?: number;
  color?: string;
}

interface IHistory {
  subRecordId: string;
}

export interface GyroSweepMapProps {
  mapBg: number;
  isTopLeft: boolean;
  mapMatrix: number;
  markerIcon: string;
  pileIcon: string;
  strokeColor: string;
  strokeWidth: number;
  limitPointNum: number;
  pointsColorData: {
    current: string;
    barrier: string;
    clear: string;
    pile: string;
    unknown: string;
  };

  maxZoomScale: number;
  loadingType: string;
  parseType: string; // 地图数据解析类型，如果不传会通过mapMatrix来判断使用哪种
  history: IHistory;

  // -------向下兼容（废弃）
  pointsColor: string[]; // 坐标点颜色 1.当前点 2.障碍点. 3.清扫点 4. 充电桩, 5 未知区域）使用pointsColorData代替这个属性
  subRecordId: string; // 历史记录id, 请使用history
}

interface IState {
  clearData: boolean;
  currentPos: IPoint;
  pointsData: IPoint[];
  cleanPoints: IPoint[];
  pilePosition: IPoint;
  mapHeight: 0;
  loading: boolean; // 加载状态
  subRecordId: number;
}

export default class GyroSweepSvgMap extends Component<GyroSweepMapProps, IState> {
  static defaultProps = {
    mapBg: 0,
    isTopLeft: false,
    mapMatrix: 199,
    strokeColor: '#D9F6B4',
    strokeWidth: 1,
    pileIcon: 'https://images.tuyacn.com/app/android/dot-bak@2x.png',
    markerIcon: 'https://images.tuyacn.com/misc/marker1.png',
    limitPointNum: 3,
    pointsColor: ['#DCF4B8', '#999D9C', '#DCF4B9', '#2D76F0', '#00000000'], // （ 1.当前点 2.障碍点. 3.清扫点 4. 充电桩, 5 未知区域）未来会使用pointsColorData代替这个属性
    maxZoomScale: 4,
    loadingType: 'none',
    parseType: '',
    pointsColorData: {
      // current: '#00000000',
      // barrier: '#ABD6FE',
      // clear: '#FFFFFF',
      // pile: '#FF00FF',
      // unknown: '#00000000',
    },
    history: {},
  };

  isHistory = false;
  mapUtils: ParseMapFileUtil;
  subscriptionLatestMedia: any; // 获取流服务数据
  subscriptionTransferData: any; // 订阅流服务数据
  subscriptionTransferState: any; // 订阅流服务状态
  subscriptionHistoryMapData: any; // 订阅历史地图

  constructor(props: GyroSweepMapProps) {
    super(props);
    this.state = {
      clearData: true,
      currentPos: {},
      pointsData: [],
      cleanPoints: [], // 清扫点
      pilePosition: {},
      mapHeight: 0,
      subRecordId: 0,
      loading: true,
    };
    this.mapUtils = new ParseMapFileUtil({
      mapMatrix: props.mapMatrix || 199,
      pointsColor: props.pointsColor,
      isTopLeft: props.isTopLeft,
      maxScale: props.maxZoomScale,
      pointsColorData: props.pointsColorData,
    });
  }

  componentDidMount() {
    const { history, subRecordId } = this.props;
    const isHistory = !!history.subRecordId || !!subRecordId;
    if (isHistory) {
      this.subscriptionHistoryMapData = this.historyMapParse().subscribe(
        this.setMapData,
        e => {
          logger.error('subscriptionLatestMediaErr', e);
        },
        () => {
          this.fristLoadComplete();
        }
      );
    } else {
      // 实时地图
      const { transferDataChannel$, transferStateChannel$ } = TransferV1.createRx();

      const transferDataChannelFilter$ = transferDataChannel$.pipe(
        filter((value: { header: string; body: string }) => {
          if (parseInt(value.body, 16) === 0) return false; // 无效数据
          return true;
        }),
        map((value: { header: string; body: string }) => {
          // 流服务增量地图上报时，subRecordId变化重置地图
          const { body, header } = value;
          const subRecordId = _parseInt(header.substring(0, 4), 16);
          return { data: body, subRecordId };
        })
      );

      /** 获取流服务全量数据流 */
      this.subscriptionLatestMedia = this.firstMapParse().subscribe(
        this.setMapData,
        e => {
          logger.error('subscriptionLatestMediaErr', e);
        },
        () => {
          this.fristLoadComplete();
        }
      );

      /** 流服务推送流 */
      this.subscriptionTransferData = transferDataChannelFilter$.subscribe(
        this.subscriptionLatestMediaData,
        handleError
      );

      /** 流服务状态流 */
      this.subscriptionTransferState = transferStateChannel$.subscribe(
        this.subscribeTransferState,
        handleError
      );

      TYSdk.DeviceEventEmitter.addListener('enterForegroundEvent', this.onEnterChange);
      TYSdk.event.on('$gyro-unload', () => {
        // 主地图收到消息后，清除数据后重新拉取数据
        this.onEnterChange();
      });
    }
  }

  componentWillUnmount() {
    this.subscriptionLatestMedia && this.subscriptionLatestMedia.unsubscribe();
    this.subscriptionTransferData && this.subscriptionTransferData.unsubscribe();
    this.subscriptionTransferState && this.subscriptionTransferState.unsubscribe();

    TYSdk.DeviceEventEmitter.removeListener('enterForegroundEvent', this.onEnterChange);

    TYSdk.event.emit('$gyro-unload', {});
    this.clearMapData(); // 卸载组件时需要清空数据，不然会导致地图数据重叠
  }

  firstMapParse() {
    const { latestMediaChannel$ } = TransferV1.createRx();

    const latestMediaChannelFilter$ = latestMediaChannel$.pipe(
      map((value: { dataList: string; subRecordId: number }) => {
        return value;
      })
    );

    return this.parseFisrtData(latestMediaChannelFilter$);
  }

  historyMapParse() {
    const { history, subRecordId } = this.props;
    const id = history.subRecordId || subRecordId;
    const { historyMediaChannel$ } = TransferV1.createHistoryRx({ subRecordId: id });

    const historyMediaChannelFilter$ = historyMediaChannel$.pipe(
      map((value: { dataList: string; subRecordId: number }) => {
        return value;
      })
    );

    return this.parseFisrtData(historyMediaChannelFilter$);
  }

  parseFisrtData = (
    observable: Observable<{ dataList: string; subRecordId: number }>
  ): Observable<{
    pointsData: any[];
    pilePosition: object;
    currentPos: object;
    subRecordId: number;
  }> => {
    return (
      observable
        // 数据一过来就解析，防止堆栈爆了
        .map((value: { dataList: string; subRecordId: number }) => {
          const { dataList, subRecordId } = value;
          const mapData = this.pressMapData([dataList]);
          return {
            mapData,
            subRecordId,
          };
        })
        // 把数据做累加，直到完成后才发出
        .reduce(
          (total, cur) => {
            // const { mapData: preMapData, subRecordId: preSubRecordId } = total;
            const {
              pointsData = [],
              cleanPoints = [],
              pilePosition = {},
              currentPos = {},
              subRecordId = 0,
            } = total;
            const { mapData: curMapData, subRecordId: curSubRecordId } = cur;
            return {
              pointsData: [...pointsData, ...curMapData.pointsData],
              cleanPoints: [...cleanPoints, ...curMapData.cleanPoints],
              pilePosition: _isEmpty(curMapData.pilePosition)
                ? pilePosition
                : curMapData.pilePosition,
              currentPos: _isEmpty(curMapData.currentPos) ? currentPos : curMapData.currentPos,
              subRecordId: curSubRecordId,
            };
          },
          {
            pointsData: [],
            cleanPoints: [],
            pilePosition: {},
            currentPos: {},
            subRecordId: 0,
          }
        )
    );
  };

  pressMapData(datas: string[]) {
    const { mapMatrix, parseType } = this.props;
    const isHighLow = mapMatrix > 255;

    if (parseType === 'withoutClearPointbyBit10')
      return this.mapUtils.parseDataWithoutClearPointbyBit10(datas);
    if (parseType === 'databyBit6') return this.mapUtils.parseDatabyBit6(datas);
    if (parseType === 'databyBit10') return this.mapUtils.parseDatabyBit10(datas);

    if (isHighLow) return this.mapUtils.parseDatabyBit10(datas);
    else return this.mapUtils.parseDatabyBit6(datas);
  }

  subscriptionLatestMediaData = async ({
    data,
    subRecordId,
  }: {
    data: string;
    subRecordId: number;
  }) => {
    const { pointsData, pilePosition, currentPos, cleanPoints = [] } = this.pressMapData([data]);
    console.warn('data, cleanPoints', data, cleanPoints);

    if (subRecordId !== this.state.subRecordId) {
      this.setState({
        clearData: false,
        pointsData,
        cleanPoints,
        pilePosition,
        currentPos,
        loading: false,
        subRecordId,
      });
      return;
    }

    this.setState({
      clearData: false,
      pointsData: [...this.state.pointsData, ...pointsData],
      cleanPoints: [...this.state.cleanPoints, ...cleanPoints],
      pilePosition,
      currentPos,
      loading: false,
      subRecordId,
    });
  };

  subscribeTransferState = (data: any) => {
    if (data.state) {
      TYRCTGyroMapManager.subscribeDevice();
    }
  };

  fristLoadComplete = () => {
    this.setState({
      loading: false,
    });
  };

  setMapData = (data: {
    pointsData: IPoint[];
    cleanPoints: IPoint[];
    pilePosition: IPoint;
    currentPos: IPoint;
    subRecordId: number;
  }) => {
    const {
      pointsData = [],
      pilePosition = {},
      currentPos = {},
      subRecordId = 0,
      cleanPoints = [],
    } = data;

    this.setState({
      clearData: false,
      pointsData,
      pilePosition,
      currentPos,
      subRecordId,
      cleanPoints,
    });
  };

  clearMapData = () =>
    new Promise((resolve, reject) => {
      // 清除地图时需要将数据置空
      this.setState(
        {
          clearData: true,
          pointsData: [],
          pilePosition: {},
          currentPos: {},
        },
        () => {
          resolve();
        }
      );
    });

  onEnterChange = () => {
    // this.clearMapData();
    this.firstMapParse().subscribe(this.setMapData);
  };

  onLayout = (e: any) => {
    const { mapHeight } = this.state;

    if (mapHeight <= 0 && e) {
      const height = e.nativeEvent.layout.height;
      this.setState({
        mapHeight: height,
      });
      this.mapUtils.mapHeight = height;
      this.mapUtils.mapWidth = viewWidth;
    }
  };

  renderMap() {
    const {
      markerIcon,
      pointsColor,
      pileIcon,
      strokeColor,
      strokeWidth,
      limitPointNum,
      maxZoomScale,
      pointsColorData,
    } = this.props;
    const { clearData, currentPos, pointsData, cleanPoints, pilePosition, mapHeight } = this.state;
    const barrierColor = pointsColorData.barrier || pointsColor[1];
    const pointColor = pointsColorData.clear || pointsColor[2];
    const currentColor = pointsColorData.current || pointsData[0];

    // const { scale, radius, mapFrame } = this.mapUtils;

    const mapData = {
      pointsData: { clean: cleanPoints },
      pilePos: pilePosition,
    };
    const pathData = {
      curPos: currentPos,
    };
    const config = {
      mapPointsDataType: {
        clean: pointColor,
        barrier: barrierColor,
        current: currentColor,
      },
      curPointIconUrl: markerIcon,
    };
    return (
      <SvgMap
        width={viewWidth}
        height={viewHeight}
        mapData={mapData}
        pathData={pathData}
        config={config}
      />
    );
  }

  render() {
    const { mapBg, loadingType } = this.props;

    if (mapBg) {
      return (
        <ImageBackground style={styles.map} source={mapBg} onLayout={this.onLayout}>
          {this.renderMap()}
          {this.state.loading && <Loading style={styles.loading} type={loadingType} />}
          {/* {this.renderLog()} */}
        </ImageBackground>
      );
    }

    return (
      <View style={styles.map} onLayout={this.onLayout}>
        {this.renderMap()}
        {this.state.loading && <Loading style={styles.loading} type={loadingType} />}
        {/* {this.renderLog()} */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },

  loading: {
    width: viewWidth,
    height: '100%',
    position: 'absolute',
  },

  logContainer: {
    position: 'absolute',
    width: viewWidth,
    bottom: 0,
    left: 0,
    height: 200,
    // backgroundColor: '#F0F0F0',
  },
});
