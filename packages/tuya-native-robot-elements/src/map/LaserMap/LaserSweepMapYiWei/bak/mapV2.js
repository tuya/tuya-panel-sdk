import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { Utils, TYSdk } from '@tuya-rn/tuya-native-components';
import _ from 'lodash';

import { LoadingBubbles } from '../components';
import Api from '../api';
import TYRCTLaserMap, { TYLaserManager } from '../rct-laser-map';
import { handleError, sequencePromise, scaleNumber } from '../utils';
import { fileTypeMap, bitmapTypeMap } from './constant';
import { withMapDataObservable } from './hoc';

const {
  StringUtils: { hexStringToNumber },
  NumberUtils: { highLowToInt },
  RatioUtils: { width },
} = Utils;

/**
 * 激光&一微&全量&地图
 *
 */
export class SimpleLaserMap extends PureComponent {
  static propTypes = {
    ...TYRCTLaserMap.propTypes,
    mapBg: PropTypes.number,

    pointsColor: PropTypes.array,
    heartCode: PropTypes.string,
    heartEnum: PropTypes.object,
    holdHeart: PropTypes.bool,
    bucket: PropTypes.string,
    history: PropTypes.object,
    isEdit: PropTypes.bool,
    setOrigin: PropTypes.func,

    mapConfig: PropTypes.object,
  };

  static defaultProps = {
    ...TYRCTLaserMap.defaultProps,
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
  };

  constructor(props) {
    super(props);
    this.getPanelConfig();
    this.state = {
      viewHeight: 0,
      mapData: { origin: {} },
      pathData: [],
      planPathData: [],
    };
    this.prePathData = '';
    this.isHistory = !!this.props.history.file;
    this.setBucket(props.bucket);
  }

  async componentDidMount() {
    if (this.isHistory) {
      const { file, mapLen: mapLength, pathLen: pathLength } = this.props.history;
      this.parseHistoryFile({
        bucket: this.getBucket(),
        file,
        mapLength,
        pathLength,
      });
      return;
    }
    try {
      // 鉴权，获取存储桶的访问权限
      const bucket = await Api.updateCloudConfig();
      this.setBucket(bucket);
      // 通过sdk 获取机器最近的一次地图数据，地图和路径bin文件的路径。
      const { mapPath, routePath } = await Api.getLatestMapFile();
      const promises = [
        { type: fileTypeMap.map, filePath: mapPath },
        { type: fileTypeMap.path, filePath: routePath },
      ].map(({ filePath, type }) => async () => {
        const url = await Api.getCloudFileUrl(bucket, filePath);
        await this.parseFileContentByType(url, type);
      });
      sequencePromise(...promises);
    } catch (error) {
      handleError(error);
    } finally {
      this.subscriptionFileChannel = this.subscribeFileChannel();
    }
  }

  componentWillUnmount() {
    if (this.subscriptionFileChannel) {
      this.subscriptionFileChannel.unsubscribe();
    }
    if (this.subscriptionCommandData) {
      this.subscriptionCommandData.unsubscribe();
    }
  }

  onDataChange = async data => {
    try {
      const bucket = this.getBucket();
      if (!data || !bucket) return;

      const { mapPath: filePath, mapType: fileType } = data;
      const url = await Api.getCloudFileUrl(bucket, filePath);
      await this.parseFileContentByType(url, fileType);
    } catch (error) {
      handleError(error);
      throw error;
    }
  };

  onLayout = e => {
    const { viewHeight } = this.state;

    if (viewHeight <= 0 && e) {
      this.setState({
        viewHeight: e.nativeEvent.layout.height,
      });
    }
  };

  setBucket(bucket) {
    this.bucket = bucket;
  }

  getBucket() {
    return this.bucket;
  }

  getPanelConfig() {
    const { panelFunMapScale: mapScale = 1 } = Api.getFunConfig();
    this.mapScale = mapScale;
  }

  getBitMapByType = type => {
    const { pointsColor, bitmapColorMap } = this.props;
    let color;
    if (bitmapColorMap) {
      color = this.dealBitmapColorMap(type, bitmapColorMap);
    } else {
      color = this.dealPointsColor(type, pointsColor);
    }
    return this.converRgbToArgb(hexStringToNumber(color));
  };

  getDefaultOrigin = () => {
    try {
      return this.state.mapData.origin || {};
    } catch (error) {
      handleError(error);
      return {};
    }
  };

  getCurrentPos(pathData) {
    return pathData[pathData.length - 1] || {};
  }

  intervalId = null;

  parseHistoryFile = async ({ bucket, file, mapLength, pathLength } = {}) => {
    const url = await Api.getCloudFileUrl(bucket, file);
    const { text } = await Api.downloadFile(url);
    const data = text();
    const mapData = data.slice(0, mapLength);
    const pathData = data.slice(mapLength, mapLength + pathLength);
    this.parseFileByType(mapData, fileTypeMap.map);
    this.parseFileByType(pathData, fileTypeMap.path);
  };

  parseFileContentByType = async (url, type) => {
    const { text } = await Api.downloadFile(url);
    this.parseFileByType(text(), type);
  };

  shrinkValue(value) {
    return scaleNumber(this.mapScale, value);
  }

  // 充电桩小于0时视为无效充电桩
  transformPileXY({ pileX, pileY }, { originX, originY }) {
    if (pileX <= 0 && pileY <= 0) return {};
    const finalX = pileX - originX;
    const finalY = pileY - originY;
    return {
      x: finalX,
      y: finalY,
    };
  }

  parseFileByType(data, type) {
    const options = {
      [fileTypeMap.map]: this.parseMapFile,
      [fileTypeMap.path]: this.parsePathFile,
      [fileTypeMap.planPath]: this.parsePathFile,
      // [fileTypeMap.planPath]: this.parsePlanPathFile,
    };
    const parse = options[type];
    const nextState = parse(data);
    if (nextState) {
      this.setState(nextState);
    }
  }

  parseMapFile = (data, headerLength = 32) => {
    let [id, type, bgWidth, bgHeight, originX, originY, pileX, pileY] = _.chunk(
      hexStringToNumber(data.slice(0, headerLength)),
      2
    ).map(([high, low]) => highLowToInt(high, low));

    [originX, originY, pileX, pileY] = [originX, originY, pileX, pileY].map(d =>
      this.shrinkValue(d)
    );
    console.log(
      'debugger-parseMapFile-header',
      `[id,type,bgWidth,bgHeight,originX,originY,pileX,pileY,]`,
      [id, type, bgWidth, bgHeight, originX, originY, pileX, pileY]
    );

    const dataArray = data.slice(headerLength).split('');
    const mapArea = bgWidth * bgHeight;
    const isRepeat = dataArray.length * 4 === mapArea;

    const bitmapBytes = dataArray.reduce((pre, cur) => {
      const [one, two] = Utils.NumberUtils.toFixedString(parseInt(cur, 16).toString(2), 4)
        .match(/\w{2}/g)
        .map(d => this.getBitMapByType(d));
      const double = [one, two];
      const finalData = isRepeat ? double.concat(double) : double;
      return pre.concat(finalData);
    }, []);

    if (bgWidth * bgHeight < bitmapBytes.length) {
      bitmapBytes.splice(bgWidth * bgHeight, bitmapBytes.length - bgWidth * bgHeight);
    }

    const mapData = {
      width: bgWidth,
      height: bgHeight,
      data: JSON.stringify(bitmapBytes),
      origin: {
        x: originX,
        y: originY,
      },
    };

    const nextState = {
      mapData,
      pilePosition: this.transformPileXY({ pileX, pileY }, { originX, originY }),
    };

    // 有原点时 根据原点重新计算路径(需分开setState)
    const shouldUpdatePath =
      this.prePathData &&
      (originX !== this.state.mapData.origin.x || originY !== this.state.mapData.origin.y);

    if (shouldUpdatePath) {
      const pathState = this.parsePathFile(this.prePathData, {
        x: originX,
        y: originY,
      });
      Object.assign(nextState, pathState);
    }
    this.props.setOrigin({ x: originX, y: originY });

    return nextState;
  };

  dealPathData(pathData) {
    return JSON.stringify(pathData);
  }

  parsePathFile = (
    data,
    { x: originX, y: originY } = this.getDefaultOrigin(),
    headerLength = 6
  ) => {
    if (!originX || !originY) {
      return;
    }
    this.prePathData = data;
    const dataArr = hexStringToNumber(data);

    const [id, type, totalCount] = _.chunk(dataArr.slice(0, headerLength), 2).map(([high, low]) =>
      highLowToInt(high, low)
    );

    const pathDataArr = _.chunk(dataArr.slice(headerLength), 4);
    const pathData = pathDataArr.reduce((pre, cur) => {
      const [x, y] = _.chunk(cur, 2).map(([high, low]) =>
        this.shrinkValue(this.dealPL(highLowToInt(high, low)))
      );
      const point = { x, y };
      pre.push(point);
      return pre;
    }, []);

    console.log('debugger---pathData', `[id, type, totalCount]`, [id, type, totalCount]);

    return {
      pathData,
    };
  };

  parsePlanPathFile(data) {}

  subscribeFileChannel() {
    TYLaserManager.startConnectSweeperDataChannel();
    TYSdk.DeviceEventEmitter.addListener('laserMqttEventData', this.onDataChange);
    const {
      holdHeart,
      heartCode,
      heartEnum: { gmap, inmap },
    } = this.props;
    TYSdk.device.putDeviceData({
      [heartCode]: gmap,
    });

    TYSdk.device.putDeviceData({
      [heartCode]: inmap,
    });
    if (holdHeart) {
      this.intervalId = setInterval(() => {
        TYSdk.device.putDeviceData({
          [heartCode]: inmap,
        });
      }, 60 * 1000);
    }
    return {
      unsubscribe: () => {
        TYLaserManager.stopConnectSweeperDataChannel();
        TYSdk.DeviceEventEmitter.removeListener('laserMqttEventData', this.onDataChange);
        clearInterval(this.intervalId);
      },
    };
  }

  converRgbToArgb = rgbArr => {
    const r = rgbArr[0];
    const g = rgbArr[1];
    const b = rgbArr[2];
    const a = rgbArr.length > 3 ? rgbArr[3] : 255;
    const color = (a << 24) | (r << 16) | (g << 8) | b;
    return color;
  };

  dealPointsColor(type, pointsColor) {
    let color;
    switch (type) {
      case bitmapTypeMap.sweep:
        color = pointsColor[0];
        break;
      case bitmapTypeMap.barrier:
        color = pointsColor[1];
        break;
      case bitmapTypeMap.battery:
        color = pointsColor[3];
        break;
      case bitmapTypeMap.unknown:
        color = pointsColor[2];
        break;
      default:
        color = pointsColor[0];
        break;
    }
    return color;
  }

  dealBitmapColorMap(type, bitmapColorMap) {
    // return
  }

  // 兼容负数
  dealPL(v) {
    return v >> 15 === 0 ? v : v - 65535;
  }

  renderMap() {
    const {
      pathColor,
      pathWidth,
      markerIcon,
      appointIcon,
      appointData,
      sweepRegionData,
      virtualAreaData,
      virtualWallData,
      pileIcon,
      planPathWidth,
      planPathColor,
      isEdit,
      sweepRegionColor,
      virtualAreaColor,
      virtualWallColor,
    } = this.props;
    const { mapData, pathData, viewHeight, pilePosition, planPathData } = this.state;
    if (viewHeight) {
      return (
        <TYRCTLaserMap
          height={viewHeight}
          width={width}
          mapData={mapData}
          pathWidth={pathWidth}
          planPathWidth={planPathWidth}
          planPathColor={planPathColor}
          pathData={this.dealPathData(pathData)}
          planPathData={this.dealPathData(planPathData)}
          currentPos={this.getCurrentPos(pathData)}
          pilePosition={pilePosition}
          pileIcon={pileIcon}
          appointData={appointData}
          sweepRegionData={sweepRegionData}
          virtualAreaData={virtualAreaData}
          virtualWallData={virtualWallData}
          pathColor={pathColor}
          edit={isEdit}
          sweepRegionColor={sweepRegionColor}
          virtualAreaColor={virtualAreaColor}
          virtualWallColor={virtualWallColor}
          markerIcon={markerIcon}
          appointIcon={appointIcon}
          {...this.props.mapConfig}
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

  render() {
    const { mapBg } = this.props;
    let content;
    if (mapBg) {
      content = (
        <ImageBackground style={styles.map} source={mapBg} onLayout={this.onLayout}>
          {!this.state.mapData.data && this.renderLoading()}
          {this.renderMap()}
        </ImageBackground>
      );
    } else {
      content = (
        <View style={styles.map} onLayout={this.onLayout}>
          {!this.state.mapData.data && this.renderLoading()}
          {this.renderMap()}
        </View>
      );
    }
    return content;
  }
}

/**
 * 激光&一微&全量&地图
 * 监听command dp点数据,并解析数据框，渲染在地图上。
 */
export default withMapDataObservable(SimpleLaserMap);

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
