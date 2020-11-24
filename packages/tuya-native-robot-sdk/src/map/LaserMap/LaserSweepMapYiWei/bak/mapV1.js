import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import { Utils, TYSdk } from '@tuya-rn/tuya-native-components';
import _ from 'lodash';

import { LoadingBubbles } from '../components';
import Api from '../api';
import TYRCTLaserMap, { TYLaserManager } from '../rct-laser-map';

export const scaleNumber = (scale, value) => {
  return Number((value / 10 ** scale).toFixed(scale));
};

const bgType = 0;
const pathType = 1;
const planPathType = 3;

const {
  StringUtils: { hexStringToNumber },
  NumberUtils: { highLowToInt },
  RatioUtils: { width },
} = Utils;

const typeBarrier = 1;
const typeBattery = 2;
const typeUnKnown = 3;

let intervalDirection;

/**
 * 激光扫地机地图 -- 一微
 */

export default class MapsLaser extends PureComponent {
  static propTypes = {
    mapBg: PropTypes.number,
    markerIcon: PropTypes.string,
    pileIcon: PropTypes.string,
    pointsColor: PropTypes.array,
    heartCode: PropTypes.string,
    heartEnum: PropTypes.object,
    holdHeart: PropTypes.bool,
    pathWidth: PropTypes.number,
    pathColor: PropTypes.string,
    planPathWidth: PropTypes.number,
    planPathColor: PropTypes.string,
    bucket: PropTypes.string,
    history: PropTypes.object,
    isEdit: PropTypes.bool,
    appointData: PropTypes.array,
    sweepRegionData: PropTypes.array,
    virtualAreaData: PropTypes.array,
    virtualWallData: PropTypes.array,
    setOrigin: PropTypes.func,
    mapConfig: PropTypes.object,
  };

  static defaultProps = {
    mapBg: 0,
    markerIcon: 'https://images.tuyacn.com/app/android/dian.png',
    pileIcon: 'https://images.tuyacn.com/smart/chongdian2x.png',
    pointsColor: ['70A5EEFF', 'CDCCCCFF', 'FFFFFF00', 'ff6AD9FF'], // 清扫点，障碍点、未知区域、充电桩
    heartCode: null,
    heartEnum: {},
    holdHeart: true,
    pathWidth: 0.8,
    pathColor: '#ffffff',
    planPathWidth: 0.8,
    planPathColor: '#FFD700',
    bucket: '',
    history: {},
    isEdit: false,
    appointData: [],
    sweepRegionData: [],
    virtualAreaData: [],
    virtualWallData: [],
    setOrigin: () => {},
    mapConfig: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      viewHeight: 0,
      bucket: props.bucket,
      history: props.history,
      mapData: { origin: {} },
      pathData: [],
      planPathData: [],
    };
    this.mapScale = Api.getFunConfig().panelFunMapScale || 1;
    this.pathDataStr = '';
    this.isHistory = this.props.history.file;
  }

  componentDidMount() {
    if (!this.isHistory) {
      Api.updateCloudConfig(TYSdk.devInfo.devId)
        .then(d => {
          this.setState({
            bucket: d,
          });
          this.getLastMap();
        })
        .catch(e => {
          console.log('===openSweeperDataChannelerror', e);
        });
    } else {
      setTimeout(() => {
        this.getCloudFileUrl(this.state.bucket, this.state.history.file).then(url => {
          this.getFile(`${url}`, bgType);
        });
      }, 3000);
    }
  }

  componentWillUnmount() {
    if (this.isHistory) {
      TYLaserManager.stopConnectSweeperDataChannel();
      TYSdk.DeviceEventEmitter.removeListener('laserMqttEventData', this.dataChange);
    }
    if (this.props.heartCode !== null) {
      clearInterval(intervalDirection);
    }
  }

  // eslint-disable-next-line react/sort-comp
  getPanelConfig() {
    const { panelFunMapScale: mapScale = 1 } = Api.getFunConfig();
  }

  onSetTimeOutBg = bgData => {
    if (this.timeBgHandle) {
      this.onClearTimeout();
      this.timeBgHandle = setTimeout(() => this.parseBgData(bgData), 500);
    } else {
      this.timeBgHandle = setTimeout(() => this.parseBgData(bgData), 1000);
    }
  };

  onSetTimeOutPath = (pathData, isPlanPath) => {
    if (this.timePathHandle) {
      this.onClearTimeout();
      this.timePathHandle = setTimeout(
        () => this.parsePathData(pathData, this.state.mapData.origin || {}, isPlanPath),
        500
      );
    } else {
      this.timePathHandle = setTimeout(
        () => this.parsePathData(pathData, this.state.mapData.origin || {}, isPlanPath),
        1000
      );
    }
  };

  onClearTimeout = () => {
    if (this.timeBgHandle) {
      clearTimeout(this.timeBgHandle);
    }
    if (this.timePathHandle) {
      clearTimeout(this.timePathHandle);
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

  setMapListener() {
    setTimeout(() => {
      TYLaserManager.startConnectSweeperDataChannel();
      TYSdk.DeviceEventEmitter.addListener('laserMqttEventData', this.dataChange);
      TYSdk.device.putDeviceData({
        [this.props.heartCode]: this.props.heartEnum.gmap,
      });
      TYSdk.device.putDeviceData({
        [this.props.heartCode]: this.props.heartEnum.inmap,
      });
      intervalDirection = setInterval(() => {
        if (this.props.holdHeart) {
          TYSdk.device.putDeviceData({
            [this.props.heartCode]: this.props.heartEnum.inmap,
          });
        }
      }, 60 * 1000);
    }, 1000);
  }

  getLastMap = () => {
    Api.getSweeperCurrentPath()
      .then(d => {
        if (d.mapPath) {
          this.getCloudFileUrl(this.state.bucket, d.mapPath).then(url => {
            this.getFile(`${url}`, bgType);
          });
        }
        if (d.routePath) {
          this.getCloudFileUrl(this.state.bucket, d.routePath).then(url => {
            this.getFile(`${url}`, pathType);
          });
        }
      })
      .finally(this.setMapListener);
  };

  getFile = (url, type) => {
    RNFetchBlob.fetch('GET', `${url}`, {
      Authorization: 'Bearer access-token...',
    })
      .then(res => {
        const { status } = res.info();
        if (status === 200) {
          const mapDataTxt = res.text();
          if (this.isHistory) {
            this.onSetTimeOutBg(mapDataTxt.substr(0, this.state.history.mapLen));
            this.onSetTimeOutPath(
              mapDataTxt.substr(this.state.history.mapLen, this.state.history.pathLen)
            );
            return;
          }
          console.log('=======type=====', type);
          if (type === bgType) {
            setTimeout(() => {
              this.onSetTimeOutBg(mapDataTxt);
            }, 500);
          } else if (type === pathType) {
            setTimeout(() => {
              this.onSetTimeOutPath(mapDataTxt, false);
            }, 500);
          } else if (type === planPathType) {
            setTimeout(() => {
              this.onSetTimeOutPath(mapDataTxt, true);
            }, 500);
          }
        }
      })
      .catch((errorMessage, statusCode) => {
        console.log('getFileFromUrlError', errorMessage, statusCode);
      });
  };

  getCloudFileUrl = (bucket, mapPath) =>
    new Promise((resolve, reject) => {
      TYLaserManager.getCloudFileUrl(bucket, mapPath, resolve, reject);
    });

  dataChange = d => {
    const { bucket } = this.state;
    if (d && bucket !== '') {
      this.getCloudFileUrl(bucket, d.mapPath).then(url => {
        this.getFile(`${url}`, d.mapType);
      });
    }
  };

  converRgbToArgb = rgbArr => {
    const r = rgbArr[0];
    const g = rgbArr[1];
    const b = rgbArr[2];
    const a = rgbArr.length > 3 ? rgbArr[3] : 255;
    const color = (a << 24) | (r << 16) | (g << 8) | b;
    return color;
  };

  parseColorByte = type => {
    const { pointsColor } = this.props;
    let colorByte = this.converRgbToArgb(hexStringToNumber(pointsColor[0]));
    switch (type) {
      case typeBarrier:
        colorByte = this.converRgbToArgb(hexStringToNumber(pointsColor[1]));
        break;
      case typeUnKnown:
        colorByte = this.converRgbToArgb(hexStringToNumber(pointsColor[2]));
        break;
      case typeBattery:
        colorByte = this.converRgbToArgb(hexStringToNumber(pointsColor[3]));
        break;
      default:
        colorByte = this.converRgbToArgb(hexStringToNumber(pointsColor[0]));
        break;
    }
    return colorByte;
  };

  parseBgData = datas => {
    const headLeng = 32;
    const dataHead = hexStringToNumber(datas.substr(0, headLeng));
    const bgId = highLowToInt(dataHead[0], dataHead[1]);
    const type = highLowToInt(dataHead[2], dataHead[3]);
    const bgWidth = highLowToInt(dataHead[4], dataHead[5]);
    const bgHeight = highLowToInt(dataHead[6], dataHead[7]);
    const ox = scaleNumber(this.mapScale, this.dealPL(highLowToInt(dataHead[8], dataHead[9])));
    const oy = scaleNumber(this.mapScale, this.dealPL(highLowToInt(dataHead[10], dataHead[11])));
    const pileX = scaleNumber(this.mapScale, this.dealPL(highLowToInt(dataHead[12], dataHead[13])));
    const pileY = scaleNumber(this.mapScale, this.dealPL(highLowToInt(dataHead[14], dataHead[15])));
    const dataArr = datas.substring(headLeng).split('');
    const bitmapBytes = [];
    dataArr.forEach(d => {
      const binData = Utils.NumberUtils.toFixedString(parseInt(d, 16).toString(2), 4);
      bitmapBytes.push(this.parseColorByte(parseInt(binData.substring(0, 2), 2)));
      bitmapBytes.push(this.parseColorByte(parseInt(binData.substring(2, 4), 2)));
      if (dataArr.length * 4 === bgWidth * bgHeight) {
        bitmapBytes.push(this.parseColorByte(parseInt(binData.substring(0, 2), 2)));
        bitmapBytes.push(this.parseColorByte(parseInt(binData.substring(2, 4), 2)));
      }
    });
    if (bgWidth * bgHeight < bitmapBytes.length) {
      bitmapBytes.splice(bgWidth * bgHeight, bitmapBytes.length - bgWidth * bgHeight);
    }
    const mapData = {
      width: bgWidth,
      height: bgHeight,
      data: JSON.stringify(bitmapBytes),
      origin: {
        x: ox,
        y: oy,
      },
    };

    // 充电桩小于0时视为无效充电桩
    function transformPileXY({ pileX, pileY }, { originX, originY }) {
      if (pileX <= 0 && pileY <= 0) return {};
      const finalX = pileX - originX;
      const finalY = pileY - originY;
      return {
        x: finalX,
        y: finalY,
      };
    }

    const newState = {
      mapData,
      pilePosition: transformPileXY({ pileX, pileY }, { originX: ox, originY: oy }),
    };

    // 有原点时 根据原点重新计算路径(需分开setState)
    const needDrawPath =
      (ox !== this.state.mapData.origin.x || oy !== this.state.mapData.origin.y) &&
      this.pathDataStr !== '';
    this.setState(newState);
    if (needDrawPath) {
      this.parsePathData(this.pathDataStr, { x: ox, y: oy }, false);
    }
    this.props.setOrigin({ x: ox, y: oy });
  };

  parsePathData = (datas, origin, isPlanPath) => {
    this.pathDataStr = datas;
    if (!origin.x || !origin.y) {
      return;
    }
    const dataArr = hexStringToNumber(datas);
    const pathId = highLowToInt(dataArr[0], dataArr[1]);
    const type = highLowToInt(dataArr[2], dataArr[3]);
    const pathSum = highLowToInt(dataArr[4], dataArr[5]);
    const pathDataArr = _.chunk(_.drop(dataArr, 6), 4);
    const pathData = [];
    for (let i = 0; i < pathDataArr.length; i += 1) {
      const pointArr = pathDataArr[i];
      pathData.push({
        x: scaleNumber(this.mapScale, this.dealPL(highLowToInt(pointArr[0], pointArr[1]))),
        y: scaleNumber(this.mapScale, this.dealPL(highLowToInt(pointArr[2], pointArr[3]))),
      });
    }
    console.log('=====pathData===', pathData);
    if (isPlanPath) {
      this.setState({
        planPathData: pathData,
      });
    } else {
      this.setState({
        pathData,
      });
    }
  };

  // 兼容负数
  dealPL = point => {
    return point > 32768 ? point - 65535 : point;
  };

  renderMap = () => {
    const {
      pathColor,
      pathWidth,
      markerIcon,
      appointData,
      sweepRegionData,
      virtualAreaData,
      virtualWallData,
      pileIcon,
      planPathWidth,
      planPathColor,
      isEdit,
    } = this.props;
    const { mapData, pathData, viewHeight, pilePosition, planPathData } = this.state;
    // console.log('====', mapSize, pathData, pathColor, bgMapData, origin);
    const pathDataStr = JSON.stringify(pathData);
    const planPathDataStr = JSON.stringify(planPathData);
    if (viewHeight) {
      return (
        <TYRCTLaserMap
          height={viewHeight}
          width={width}
          mapData={mapData}
          pathWidth={pathWidth}
          planPathWidth={planPathWidth}
          planPathColor={planPathColor}
          pathData={pathDataStr}
          planPathData={planPathDataStr}
          currentPos={pathData[pathData.length - 1] || {}}
          pilePosition={pilePosition}
          pileIcon={pileIcon}
          appointData={appointData}
          sweepRegionData={sweepRegionData}
          virtualAreaData={virtualAreaData}
          virtualWallData={virtualWallData}
          pathColor={pathColor}
          edit={isEdit}
          sweepRegionColor={this.props.sweepRegionColor}
          virtualAreaColor={this.props.virtualAreaColor}
          virtualWallColor={this.props.virtualWallColor}
          markerIcon={this.props.markerIcon}
          appointIcon={this.props.appointIcon}
          {...this.props.mapConfig}
        />
      );
    }
    return null;
  };

  renderLoading = () => {
    return (
      <View style={[styles.loading, { bottom: this.state.viewHeight / 2 }]}>
        <LoadingBubbles size={10} color={this.props.pointsColor[0]} />
      </View>
    );
  };

  render = () => {
    const { mapBg } = this.props;
    if (mapBg) {
      return (
        <ImageBackground style={styles.map} source={mapBg} onLayout={this.onLayout}>
          {!this.state.mapData.data && this.renderLoading()}
          {this.renderMap()}
        </ImageBackground>
      );
    }
    return (
      <View style={styles.map} onLayout={this.onLayout}>
        {!this.state.mapData.data && this.renderLoading()}
        {this.renderMap()}
      </View>
    );
  };
}

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
