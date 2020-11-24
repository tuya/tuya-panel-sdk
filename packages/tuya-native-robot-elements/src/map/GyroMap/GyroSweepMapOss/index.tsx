import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { Utils, TYSdk } from '@tuya-rn/tuya-native-components';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import _isEmpty from 'lodash/isEmpty';

import { TYRCTGyroMapManager } from '../../../components/Basic/RCTGyroMap';
import Loading from '../../../components/Display/Loading';
import { handleError } from '../../../utils/FunctionUtils';
import { OSSRx, TransferV2 } from '../../../utils/MapServiceChannelUtils';

import ParseMapFileUtil from '../utils/ParseMapFileUtil';

const { viewWidth } = Utils.RatioUtils;
interface IPoint {
  x?: number;
  y?: number;
  color?: string;
}

interface IHistory {
  file: string;
  mapLeng?: number;
  pathLeng?: number;
}

interface GyroSweepMapOssPropTypes {
  mapBg: number;
  isTopLeft: boolean;
  mapMatrix: number;
  markerIcon: string;
  pileIcon: string;
  strokeColor: string;
  strokeWidth: number;
  limitPointNum: number;
  pointsColor: string[]; // 向下兼容（废弃）
  // subRecordId: string;
  maxZoomScale: number;
  loadingType: string;
  parseType: string; // 地图数据解析类型
  history: IHistory;
}

interface IState {
  clearData: boolean;
  currentPos: IPoint;
  pointsData: IPoint[];
  pilePosition: IPoint;
  mapHeight: 0;
  loading: boolean; // 加载状态
}

function extractError(error: Error) {
  return Observable.of(error);
}

// TODO # 陀螺仪v3地图

// 全量地图走oss通道
// 增量走流服务v1通道
export default class GyroSweepMapOss extends Component<GyroSweepMapOssPropTypes, IState> {
  static defaultProps = {
    mapBg: 0,
    isTopLeft: false,
    mapMatrix: 199,
    strokeColor: '#D9F6B4',
    strokeWidth: 1,
    pileIcon: 'https://images.tuyacn.com/app/android/dot-bak@2x.png',
    markerIcon: 'https://images.tuyacn.com/misc/marker1.png',
    limitPointNum: 3,
    pointsColor: ['#D9F6B4', '#FFFFFF', '#D9F6B4'],
    subRecordId: '',
    maxZoomScale: 4,
    loadingType: 'none',
    parseType: 'parseDatabyBit6',
    history: {},
  };

  isHistory = false;
  mapUtils: ParseMapFileUtil;
  subscriptionMapData: any; // 订阅mqtt数据
  subscriptionLatestMedia: any; // 获取流服务数据
  subscriptionTransferData: any; // 订阅流服务数据
  subscriptionTransferState: any; // 订阅流服务状态
  subscriptionHistoryMapData: any; // 订阅历史地图

  constructor(props: GyroSweepMapOssPropTypes) {
    super(props);
    this.state = {
      clearData: true,
      currentPos: {},
      pointsData: [],
      pilePosition: {},
      mapHeight: 0,
      loading: true, // 加载状态
    };
    this.mapUtils = new ParseMapFileUtil({
      mapMatrix: props.mapMatrix,
      pointsColor: props.pointsColor,
      isTopLeft: props.isTopLeft,
      maxScale: props.maxZoomScale,
    });
  }

  componentDidMount() {
    if (this.props.history.file) {
      const ossRx = new OSSRx({ fileType: 'blob' });
      
      const historyMapChannel$ = ossRx.createHistoryDataRx({
        bucket: this.props.bucket || this.props.history.bucket,
        file: this.props.history.file,
      });

      const historyMapChannelFilter$ = historyMapChannel$.pipe(
        map((value: string) => {
          // 数据头部有4字节表示地图点数量
          const pointLength = 8;
          return { data: value.slice(pointLength), clean: true };
        })
      );

      this.subscriptionHistoryMapData = historyMapChannelFilter$.subscribe(
        this.subscriptionLatestMediaData,
        handleError
      );
    } else {
      // 实时地图
      const ossRx = new OSSRx({ fileType: 'blob' });
      const { mapFileData$ } = ossRx.createRx();
      const { transferDataChannel$, transferStateChannel$ } = TransferV2.createRx();

      const mapFileDataFilter$ = mapFileData$.pipe(
        map((value: string) => {
          // oss全量地图上报时，重置地图
          // 数据头部有4字节表示地图点数量
          const pointLength = 8;
          return value.slice(pointLength);
        })
      );

      const transferDataChannelFilter$ = transferDataChannel$.pipe(
        map((value: { header: string; body: string }) => {
          // 流服务增量地图上报时，不重置地图
          // 截掉前30个头协议bit
          const { body } = value;
          return body;
        })
      );

      this.subscriptionMapData = mapFileDataFilter$
        .skip(1)
        .map((value: string) => ({ data: value, clean: true }))
        .subscribe(this.subscriptionLatestMediaData, handleError);

      this.subscriptionLatestMedia = this.firstMapParse().subscribe(
        this.setMapData,
        () => {},
        () => {
          this.fristLoadComplete();
        }
      );

      this.subscriptionTransferData = transferDataChannelFilter$
        .map((value: string) => ({ data: value, clean: false }))
        .subscribe(this.subscriptionLatestMediaData, handleError);

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
    this.subscriptionMapData && this.subscriptionMapData.unsubscribe();
    this.subscriptionLatestMedia && this.subscriptionLatestMedia.unsubscribe();
    this.subscriptionTransferData && this.subscriptionTransferData.unsubscribe();
    this.subscriptionTransferState && this.subscriptionTransferState.unsubscribe();

    TYSdk.DeviceEventEmitter.removeListener('enterForegroundEvent', this.onEnterChange);
    TYSdk.event.emit('$gyro-unload', {});
    this.clearMapData(); // 卸载组件时需要清空数据，不然会导致地图数据重叠
  }

  firstMapParse() {
    const ossRx = new OSSRx({ fileType: 'blob' });
    const { mapFileData$ } = ossRx.createRx();
    const { latestMediaChannel$ } = TransferV2.createRx();

    const mapFileDataFilter$ = mapFileData$.pipe(
      map((value: string) => {
        // oss全量地图上报时，重置地图
        // 数据头部有4字节表示地图点数量
        const pointLength = 8;
        // return { data: value.slice(pointLength), clean: true };
        return value.slice(pointLength);
      })
    );
    const latestMediaChannelFilter$ = latestMediaChannel$.pipe(
      map((value: { dataList: string; subRecordId: number }) => {
        return value.dataList;
      })
    );

    const mergeMapData$ = Observable.merge(mapFileDataFilter$.take(1), latestMediaChannelFilter$);

    return (
      mergeMapData$
        // 数据一过来就解析，防止堆栈爆了
        .map((value: string) => this.pressMapData([value]))
        // 把数据做累加，直到完成后才发出
        .reduce(
          (pre, cur) => {
            return {
              pointsData: [...pre.pointsData, ...cur.pointsData],
              pilePosition: _isEmpty(cur.pilePosition) ? pre.pilePosition : cur.pilePosition,
              currentPos: _isEmpty(cur.currentPos) ? pre.currentPos : cur.currentPos,
            };
          },
          {
            pointsData: [],
            pilePosition: {},
            currentPos: {},
          }
        )
    );
  }

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

  subscriptionLatestMediaData = async ({ data, clean }: { data: string; clean: boolean }) => {
    if (clean) await this.clearMapData();

    const { pointsData, pilePosition, currentPos } = this.pressMapData([data]);
    this.setState({
      clearData: false,
      pointsData,
      pilePosition,
      currentPos,
      loading: false,
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

  setMapData = ({ pointsData, pilePosition, currentPos }) => {
    this.setState({
      clearData: false,
      pointsData,
      pilePosition,
      currentPos,
      // loading: false,
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
    this.clearMapData();
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
    } = this.props;
    const { clearData, currentPos, pointsData, pilePosition, mapHeight } = this.state;

    const { scale, radius } = this.mapUtils;

    // if ((mapHeight && !isIos) || (mapHeight && pointsData.length !== 0 && isIos)) {
    if (mapHeight || (mapHeight && pointsData.length !== 0)) {
      // #FF90EE #90EE90 #FF3030 #FFFF00
      return (
        <RCTGyroMap
          width={viewWidth}
          height={mapHeight}
          radius={radius}
          pointType="square"
          clearData={clearData}
          currentPos={currentPos}
          data={pointsData}
          scale={scale}
          markerIcon={markerIcon}
          pileIcon={pileIcon}
          pilePosition={pilePosition}
          backgroundColor="transparent"
          barrierColor={pointsColor[1]}
          pointColor={pointsColor[2]}
          strokeColor={strokeColor}
          strokeWidth={strokeWidth}
          limitPointNum={limitPointNum}
          maxZoomScale={maxZoomScale}
        />
      );
    }

    return null;
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
