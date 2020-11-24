import _get from 'lodash/get';
import _chunk from 'lodash/chunk';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Platform,
  requireNativeComponent,
  ImageBackground,
  NativeModules,
  ColorPropType,
} from 'react-native';
import { TYSdk, Utils } from '@tuya-rn/tuya-native-components';
import { LoadingBubbles } from './Loading';
import * as TYVisionApi from './api';
import { dealXY } from './utils';
import {
  DP_CODES,
  GLOBAL_MAP_TYPE,
  HISTORY_MAP_TYPE,
  MAP_END_TYPE,
  CURRENT_POS_TYPE,
  HISTORY_MAP_STATUS,
} from './constant';

// 避免安卓三指拖动crash...
console.reportErrorsAsExceptions = false;

const infoStyle = 'background: blue; color: #fff;';
const sucStyle = 'background: green; color: #fff;';
const errStyle = 'background: red; color: #fff;';

const { width } = Dimensions.get('window');
const { getHistoryMedia } = TYVisionApi;
const { DeviceEventEmitter } = TYSdk;
const TuyaTransfer = NativeModules.TYRCTTransferManager;
const TYRCTVisionMap = requireNativeComponent('TYRCTVisionMap');
const { hexStringToNumber } = Utils.StringUtils;
const { highLowToInt, toFilledString } = Utils.NumberUtils;

export { TYVisionApi };

const CLEAR_GLOBAL_MAP_FLAG = '00000000000000000000000000000000000000';
const CLEAR_HISTORY_MAP_FLAG = '00000002000000000000000000000000000000';

export default class SweepMapVision extends Component {
  static propTypes = {
    /**
     * 是否允许编辑指哪扫哪等功能
     */
    edit: PropTypes.bool,
    /**
     * 地图背景
     */
    mapBg: PropTypes.number,

    /**
     * 指哪扫哪图标，暂时只支持url
     */
    appointIcon: PropTypes.string,

    /**
     * 当前点图标，暂时只支持url
     */
    markerIcon: PropTypes.string,

    /**
     * 起始点图标，暂时只支持url
     */
    initialIcon: PropTypes.string,

    /**
     * 地图点颜色
     *
     * 分别为Loading、空，全局地图、历史地图
     */
    pointsColor: PropTypes.array,

    /**
     * 区域清扫颜色
     */
    sweepRegionColor: ColorPropType,

    /**
     * 虚拟墙颜色
     */
    virtualWallColor: ColorPropType,

    /**
     * 路径点宽度
     */
    pathWidth: PropTypes.number,

    /**
     * 起始点坐标
     */
    initialPos: PropTypes.object,

    /**
     * 指哪扫哪数据
     */
    appointData: PropTypes.array,

    /**
     * 区域清扫数据
     */
    sweepRegionData: PropTypes.array,

    /**
     * 虚拟墙数据
     */
    virtualWallData: PropTypes.array,

    /**
     * 地图尺寸
     */
    mapMatrix: PropTypes.number,

    /**
     * 全局图描边宽度
     */
    globalWidth: PropTypes.number,

    /**
     * 历史图描边宽度
     */
    historyWidth: PropTypes.number,

    /**
     * 地图最大放大倍数
     */
    maxZoomScale: PropTypes.number,
  };

  static defaultProps = {
    edit: true,
    mapBg: 0,
    appointIcon: 'https://images.tuyacn.com/smart/Group6@2x.png',
    markerIcon: 'https://images.tuyacn.com/smart/Oval24x.png',
    initialIcon: 'https://images.tuyacn.com/smart/Origin24x.png',
    pointsColor: ['#353B6C', '#575FA4', '#858DFF', '#DF196F'], // 历史点，障碍点、全局地图
    sweepRegionColor: '#3DFFFFFF',
    virtualWallColor: '#80F5A623',
    pathWidth: 5,
    initialPos: {},
    appointData: [],
    sweepRegionData: [],
    virtualWallData: [],
    mapMatrix: 200,
    globalWidth: 0.5,
    historyWidth: 1,
    maxZoomScale: 4,
  };

  constructor(props) {
    super(props);
    this._minX = props.mapMatrix;
    this._maxX = 0;
    this._minY = props.mapMatrix;
    this._maxY = 0;
    this._isFirstHistoryMap = true;
    this._globalId = 0;
    this._historyId = 0;
    this._globalMap = []; // 增量全局地图数据
    this._historyMap = []; // 增量历史地图数据
    this._timerId = null;
    this.state = {
      isLoading: true,
      viewHeight: 0,
      radius: width / props.mapMatrix / 2,
      scale: {},
      pathData: [],
      globalMap: [],
      historyMap: [],
    };
  }

  componentDidMount() {
    this._timerId = setTimeout(async () => {
      await this.initHistoryMap();
      await this.initGlobalMap();
      const historyNotice = TYSdk.device.getState(DP_CODES.historyNotice);
      this.reFetchHistoryMap(historyNotice);
    }, 375);
    TuyaTransfer.startConnect();
    this.onDpDataChange = data => {
      switch (data.type) {
        case 'dpData':
          this._handleDpDataChange(data.payload);
          break;
        default:
          break;
      }
    };
    TYSdk.event.on('deviceDataChange', this.onDpDataChange);
    DeviceEventEmitter.addListener('transferData', this._handleTransferData); // 流服务数据上报通知
    DeviceEventEmitter.addListener('transferState', this._handleTransferState); // 流服务连接完毕通知
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.globalMap !== this.state.globalMap ||
      prevState.historyMap !== this.state.historyMap
    ) {
      const isEmptyMap = this.state.globalMap.length === 0 && this.state.historyMap.length === 0;
      TYSdk.event.emit('visionMapChange', isEmptyMap);
    }
  }

  componentWillUnmount() {
    clearTimeout(this._timerId);
    TYSdk.event.off('deviceDataChange', this.onDpDataChange);
    TYSdk.DeviceEventEmitter.removeListener('transferData', this._handleTransferData);
    TYSdk.DeviceEventEmitter.removeListener('transferState', this._handleTransferState);
    TuyaTransfer.disSubscribeDevice();
    TuyaTransfer.stopConnect();
  }

  get initialPos() {
    const { pathData } = this.state;
    if (pathData && pathData.length > 0) {
      return this.props.initialPos;
    }
    return {};
  }

  get isEmptyMap() {
    const { globalMap, historyMap } = this.state;
    return this.state.pathData.length === 0 && globalMap.length === 0 && historyMap.length === 0;
  }

  getScale = () => {
    const { mapMatrix, maxZoomScale } = this.props;
    const { viewHeight } = this.state;
    const xWidth = mapMatrix + 1;
    const yHeight = (width / viewHeight) * xWidth;
    const x = parseInt((this._maxX + this._minX) / 2, 10);
    const y = parseInt((this._maxY + this._minY) / 2, 10);
    const scaleX = this._maxX - this._minX > 0 ? xWidth / (this._maxX - this._minX) : 4;
    const scaleY = this._maxY - this._minY > 0 ? yHeight / (this._maxY - this._minY) : 4;
    const scale = Math.min(maxZoomScale * 0.8, Math.min(scaleX, scaleY) * 0.95);
    if (scale) {
      return { ...dealXY(x, y), scale };
    }
    return {};
  };

  getFrames = mapData => {
    let frames = [];
    if (mapData.length % 102 === 0) {
      // 不存在第一帧
      frames = mapData.match(/[a-z\d]{102}/gi) || [];
    } else if (mapData.length % 102 === 38) {
      // 存在第一帧
      const firstFrame = mapData.slice(0, 38); // 第一帧一共19个字节
      const resetFrames = mapData.slice(38).match(/[a-z\d]{102}/gi) || [];
      frames = [firstFrame, ...resetFrames];
    } else {
      // 地图数据有问题
      console.log(`%c mapData is Not Valid ${mapData} `, errStyle);
    }
    return frames;
  };

  getLatestData = (d1 = {}, d2 = {}) => {
    const d1List = _get(d1, 'dataList', []);
    const d2List = _get(d2, 'dataList', []);
    // 地图数据会在两个mapId中轮流来回传递，哪个数据最新就用哪个
    let latestData = d1.startTime > d2.startTime ? d1List : d2List;
    /**
     * 如果`列表1`早于`列表2`推送至云端且
     * `列表1`的数据多于`列表2`且
     * `列表2`不为清空地图指令，
     * 那么优先用`列表1`的数据，
     * 用于避免新数据还没完全推送到云端时，先用老数据，否则会出现地图缺块现象；
     */
    if (
      d1.startTime < d2.startTime &&
      d1List.length > d2List.length &&
      d2List[0] !== CLEAR_GLOBAL_MAP_FLAG &&
      d2List[0] !== CLEAR_HISTORY_MAP_FLAG
    ) {
      latestData = d1List;
    }
    if (
      d1.startTime > d2.startTime &&
      d2List.length > d1List.length &&
      d1List[0] !== CLEAR_GLOBAL_MAP_FLAG &&
      d1List[0] !== CLEAR_HISTORY_MAP_FLAG
    ) {
      latestData = d2List;
    }
    return latestData;
  };

  /**
   * 如果当前历史地图已经传输完毕，
   * 但当前页面中历史地图为空，则向机器发起重新传输历史地图请求，
   * 解决传输过程中网络中断导致历史地图传输失败的问题；
   */
  reFetchHistoryMap = historyNotice => {
    if (historyNotice === HISTORY_MAP_STATUS.uploaded && this.state.historyMap.length === 0) {
      TYSdk.device.putDeviceData({ [DP_CODES.historyNotice]: HISTORY_MAP_STATUS.getMap });
    }
  };

  /**
   * @desc 解析路径点数据并渲染
   * @param {String} data - 路径点数据
   */
  parsePath = data => {
    const [, , globalColor] = this.props.pointsColor;
    const [cmd, ...dataArr] = hexStringToNumber(data);
    // console.log('dataArr :', dataArr);
    // 当前点会一次上报三个点过来
    if (cmd !== CURRENT_POS_TYPE || dataArr.length !== 39) {
      console.log(`%c mapData is Not Valid Current Pos Type`, errStyle);
      return;
    }
    const chunked = _chunk(dataArr, 13);
    this.setState(prevState => {
      const pathData = chunked.reduce((acc, cur) => {
        const x = highLowToInt(cur[7], cur[8]);
        const y = highLowToInt(cur[9], cur[10]);
        return [
          ...acc,
          {
            ...dealXY(x, y),
            color: globalColor,
          },
        ];
      }, prevState.pathData);
      return { pathData };
    });
  };

  /**
   * @param {Object} luPoint - 左上角坐标点
   * @param {Object} rdPoint - 右下角坐标点
   * @param {Array} pointArr - 地图数据
   * @param {Boolean} isHistory - 是否历史地图
   */
  addMapDataToQueue = ({ luPoint, rdPoint, pointArr }, isHistory) => {
    if (!pointArr || pointArr.length === 0) {
      return;
    }
    const { pointsColor } = this.props;
    const color = isHistory ? pointsColor[3] : pointsColor[2];
    const globalWidth = rdPoint.x - luPoint.x + 1;
    const nPointArr = _chunk(
      pointArr
        .map(d => toFilledString(d.toString(2), 8))
        .join('')
        .split(''),
      globalWidth
    );
    nPointArr.forEach((np, y) => {
      np.forEach((p, x) => {
        if (p === '1') {
          const point = {
            ...dealXY(luPoint.x + x, luPoint.y + y),
            color,
          };
          this._minX = Math.min(luPoint.x + x, this._minX);
          this._maxX = Math.max(luPoint.x + x, this._maxX);
          this._minY = Math.min(luPoint.y + y, this._minY);
          this._maxY = Math.max(luPoint.y + y, this._maxY);
          if (isHistory) {
            this._historyMap.push(point);
          } else {
            this._globalMap.push(point);
          }
        }
      });
    });
  };

  /**
   * @desc
   * 将拼包后的地图数据拆包解析成具体每一帧的数据，
   * 其中第一帧固定长度为`19`个字节，其余帧数长度固定为`51`个字节
   *
   * ps 拼包原因是为了减少传输时间
   *
   * @param {String} mapData - 地图数据
   * @param {Boolean} isEnd - 首次进入面板的时候不需要等到80帧，只要没有下一条数据就可以画
   * @param {Boolean} isInitGlobalMap -是否为首次用接口获取全局地图
   */
  parseFrames = (mapData, isEnd = false, isInitGlobalMap = false) => {
    if (!mapData) {
      return;
    }
    const frames = this.getFrames(mapData);
    console.log('frames:', frames, 'isEnd:', isEnd);
    frames.forEach((hex, idx) => {
      const isLastFrame = idx === frames.length - 1;
      const dataArr = hexStringToNumber(hex);
      this.parseMap(dataArr, isEnd && isLastFrame, isInitGlobalMap);
    });
  };

  /**
   * @param {Array} dataArr - 已经解析完毕的16进制值
   * @param {Boolean} isEnd - 首次进入面板的时候不需要等到80帧，只要没有下一条数据就可以画
   * @param {Boolean} isInitGlobalMap -是否为首次用接口获取全局地图
   */
  parseMap = (dataArr, isEnd = false, isInitGlobalMap = false) => {
    const [
      frameIdH, // 帧数高八位
      frameIdL, // 帧数低八位
      mapTypeH, // 地图类型高八位
      mapTypeL, // 地图类型低八位
      x1H, // x1高八位 (地图左上角坐标)
      x1L, // x1低八位
      y1H, // y1高八位
      y1L, // y1低八位
      x2H, // x2 高八位 (地图右下角坐标)
      x2L,
      y2H,
      y2L,
      curXH, // 当前点高八位
      curXL,
      curYH,
      curYL,
      numH, // 地图数据点数量高八位
      numL, // 地图数据点数量低八位
      ...points // 地图数据点 (包含crc校验)
    ] = dataArr;
    const pointArr = points.slice(0, -1); // 去掉crc校验
    const frameId = highLowToInt(frameIdH, frameIdL);
    const mapType = highLowToInt(mapTypeH, mapTypeL);
    const x1 = highLowToInt(x1H, x1L);
    const y1 = highLowToInt(y1H, y1L);
    const x2 = highLowToInt(x2H, x2L);
    const y2 = highLowToInt(y2H, y2L);
    const luPoint = { x: x1, y: y1 }; // 左上角坐标点
    const rdPoint = { x: x2, y: y2 }; // 右下角坐标点
    // 在左上角和右下角全为0时，代表当前地图为空，因此我们需要清空当前地图并不再往下继续请求下一帧地图数据
    const shouldClearMapData = x1 === 0 && y1 === 0 && x2 === 0 && y2 === 0;
    if (isEnd) {
      if (this._globalId > 0) {
        this.addMapDataToQueue({ luPoint, rdPoint, pointArr }, false);
        this.updateMap(isInitGlobalMap);
      }
      if (this._historyId > 0) {
        this.addMapDataToQueue({ luPoint, rdPoint, pointArr }, true);
        mapType === MAP_END_TYPE && this.updateMap();
      }
      return;
    }
    switch (mapType) {
      case GLOBAL_MAP_TYPE:
        if (shouldClearMapData) {
          this._globalId = 0;
          this._globalMap = [];
          this.setState({ pathData: [], globalMap: [] });
          console.log('%c Clear Global Map ', infoStyle);
        } else if (frameId === 0) {
          this._globalId = frameId + 1;
          this._globalMap = [];
          this._historyId = 0;
          this._historyMap = [];
          this.addMapDataToQueue({ luPoint, rdPoint, pointArr }, false);
          console.log('%c Transfer Global Map ', infoStyle);
          console.log(`%c Start Add Global Map to Render Queue: ${frameId} `, infoStyle);
        } else if (this._globalId === frameId) {
          this._globalId = frameId + 1;
          this.addMapDataToQueue({ luPoint, rdPoint, pointArr }, false);
          console.log(`%c Add Global Map to Render Queue: ${frameId} `, infoStyle);
        } else {
          console.log(`%c Global Map frameId ${frameId} not match ${this._globalId} `, errStyle);
        }
        break;
      case HISTORY_MAP_TYPE:
        if (shouldClearMapData) {
          this._historyId = 0;
          this._historyMap = [];
          this.setState({ historyMap: [] });
          console.log('%c Clear History Map ', infoStyle);
        } else if (frameId === 0) {
          this._globalId = 0;
          this._globalMap = [];
          this._historyId = frameId + 1;
          this._historyMap = [];
          console.log('%c Transfer History Map ', infoStyle);
          this.addMapDataToQueue({ luPoint, rdPoint, pointArr }, true);
          console.log(`%c Start Add History Map to Render Queue: ${frameId} `, infoStyle);
        } else if (this._historyId === frameId) {
          this._historyId = frameId + 1;
          this.addMapDataToQueue({ luPoint, rdPoint, pointArr }, true);
          console.log(`%c Add HistoryMap to Render Queue: ${frameId} `, infoStyle);
        } else {
          console.log(`%c History Map frameId ${frameId} not match ${this._historyId} `, errStyle);
        }
        break;
      case MAP_END_TYPE:
        if (this._globalId > 0) {
          this.addMapDataToQueue({ luPoint, rdPoint, pointArr }, false);
          this.updateMap(isInitGlobalMap);
        }
        if (this._historyId > 0) {
          this.addMapDataToQueue({ luPoint, rdPoint, pointArr }, true);
          this.updateMap();
          this.initHistoryMap();
        }
        break;
      default:
        break;
    }
  };

  /**
   * 解析完毕首次拉取的地图数据或接收到80帧后开始更新地图（以全量的方式）
   */
  updateMap = isInitGlobalMap => {
    if (this._globalId > 0) {
      console.log(`%c Finish Transfer Global Map ${this._globalId} `, sucStyle);
      this.setState(
        prevState => {
          // 如果为流媒体更新的全局地图时，需要清空之前的路径点数据
          const prevPathData = prevState.pathData;
          const newPathData =
            prevPathData.length > 0
              ? [prevPathData[prevPathData.length - 1]]
              : [{ ...this.props.initialPos, color: this.props.pointsColor[2] }]; // 安卓路径点的颜色取得第一个点，这里需要强制变更路径点的颜色
          return {
            pathData: isInitGlobalMap ? prevPathData : newPathData,
            globalMap: this._globalMap,
          };
        },
        () => {
          this._globalId = 0;
          this._globalMap = [];
        }
      );
    } else if (this._historyId > 0) {
      console.log(`%c Finish Transfer History Map ${this._historyId} `, sucStyle);
      this.setState({ historyMap: this._historyMap }, () => {
        this._historyId = 0;
        this._historyMap = [];
      });
    }
  };

  initGlobalMap = async () => {
    const [d0, d1] = await Promise.all([getHistoryMedia(1), getHistoryMedia(2)]);
    const mapData = this.getLatestData(d0, d1);
    return new Promise(resolve => {
      if (
        mapData.length === 0 ||
        mapData[0] === CLEAR_GLOBAL_MAP_FLAG ||
        mapData[0] === CLEAR_HISTORY_MAP_FLAG
      ) {
        this.setState(
          prevState => ({
            isLoading: false,
            scale: Object.keys(prevState.scale).length > 0 ? prevState.scale : this.getScale(),
          }),
          resolve
        );
        return;
      }
      mapData.forEach((data, idx) => {
        const isEnd = idx === mapData.length - 1;
        this.parseFrames(data, isEnd, true);
      });
      // 如果当前全局地图存在但路径点为空时，则从上一次上报的路径数据中取点
      if (this.state.pathData.length === 0) {
        const pathData =
          TYSdk.device.getState(DP_CODES.mapData) || TYSdk.device.getState('map_data');
        this.parsePath(pathData);
      }
      this.setState(
        prevState => ({
          isLoading: false,
          scale: Object.keys(prevState.scale).length > 0 ? prevState.scale : this.getScale(),
        }),
        resolve
      );
    });
  };

  initHistoryMap = async () => {
    const data = await getHistoryMedia(3);
    const mapData = _get(data, 'dataList', []);
    return new Promise(resolve => {
      if (
        mapData.length === 0 ||
        mapData[0] === CLEAR_GLOBAL_MAP_FLAG ||
        mapData[0] === CLEAR_HISTORY_MAP_FLAG
      ) {
        this.setState({ isLoading: false }, resolve);
        return;
      }
      // const mapData = [
      //   '000000020050005000af00af008100780000ed0001000200700060007f006f00810077002000000000000000000000000000000000000000000000007f007f00ff00ff00ffed0002000200800060008f006f00810077002000000000000000000000000000000000000000000000c000e000f000ff00fc00ed0003000200700070007f007f00810077002003ff03ff07ff07ff07ff07ff07ff07ff07ff07ff03ff01ff00f9007800780000ed',
      //   '0004008000800070008f007f008100760020f800f800f800f800f800f800f800f800f800f800f800f800f8007c0000000000ed',
      // ];
      mapData.forEach((d, idx) => {
        const isEnd = idx === mapData.length - 1;
        this.parseFrames(d, isEnd);
      });
      this.setState({ isLoading: false }, resolve);
    });
  };

  /**
   * 接受到mapData变更且类型为当前点时，绘制路径点
   */
  _handleDpDataChange = data => {
    const mapData = data[DP_CODES.mapData] || data.map_data;
    const historyNotice = data[DP_CODES.historyNotice];
    this.reFetchHistoryMap(historyNotice);
    if (typeof mapData !== 'undefined') {
      if (mapData === '0305') {
        this._globalId = 0;
        this._globalMap = [];
        this.setState({ pathData: [], globalMap: [] });
        console.log('%c Clear Global Map ', infoStyle);
        return;
      }
      this.parsePath(mapData);
    }
  };

  _handleTransferState = state => {
    if (state.state) {
      TuyaTransfer.subscribeDevice();
    }
  };

  _handleTransferData = d => {
    if (!d || !d.data) {
      return;
    }
    // 前13个字节是流媒体传输协议，面板无需关注
    const dataHex = d.data.slice(26);
    if (!dataHex) {
      return;
    }
    const frames = this.getFrames(dataHex);
    const lastFrame = frames[frames.length - 1];
    const mapType = lastFrame.slice(6, 8);
    const isMapEnd = parseInt(mapType, 16) === MAP_END_TYPE;
    const shouldUpdateHistory = isMapEnd && this._historyId > 0;
    this.parseFrames(dataHex);
    if (
      isMapEnd &&
      !this.state.isLoading &&
      (Object.keys(this.state.scale).length === 0 ||
        (this._isFirstHistoryMap && shouldUpdateHistory))
    ) {
      if (shouldUpdateHistory) this._isFirstHistoryMap = false;
      this.setState({ scale: this.getScale() });
    }
  };

  _handleLayout = e => {
    const { viewHeight } = this.state;
    if (viewHeight <= 0 && e) {
      this.setState({
        viewHeight: e.nativeEvent.layout.height,
      });
    }
  };

  renderMap = () => {
    const {
      edit,
      appointIcon,
      markerIcon,
      initialIcon,
      sweepRegionColor,
      virtualWallColor,
      pathWidth,
      globalWidth,
      historyWidth,
      appointData,
      sweepRegionData,
      virtualWallData,
      maxZoomScale,
    } = this.props;
    const { viewHeight, radius, pathData, globalMap, historyMap } = this.state;
    const { initialPos } = this;
    // console.log(`%c Current Pos: ${JSON.stringify(pathData[pathData.length - 1])} `, infoStyle);
    // console.log('pathData :', JSON.stringify(pathData));
    // console.log('globalMap :', globalMap.length);
    // console.log('historyMap :', historyMap.length);
    if (viewHeight) {
      return (
        <TYRCTVisionMap
          width={width}
          height={viewHeight}
          radius={radius}
          appointIcon={appointIcon}
          markerIcon={markerIcon}
          initialIcon={initialIcon}
          pathData={pathData.length === 0 ? [{}] : pathData}
          pathWidth={pathWidth}
          globalWidth={globalWidth}
          historyWidth={historyWidth}
          historyData={historyMap}
          globalData={globalMap}
          initialPos={initialPos}
          appointData={appointData}
          sweepRegionData={sweepRegionData}
          virtualWallData={this.isEmptyMap ? [] : virtualWallData}
          sweepRegionColor={sweepRegionColor}
          virtualWallColor={virtualWallColor}
          scale={this.state.scale}
          maxZoomScale={maxZoomScale}
          edit={edit}
        />
      );
    }
    return null;
  };

  renderLoading = () => {
    const [loadingColor] = this.props.pointsColor;
    return (
      <View style={[styles.loading, { bottom: this.state.viewHeight / 2 }]}>
        <LoadingBubbles size={10} color={loadingColor} />
      </View>
    );
  };

  render() {
    const { mapBg } = this.props;
    if (mapBg) {
      return (
        <ImageBackground style={styles.map} source={mapBg} onLayout={this._handleLayout}>
          {(this.isEmptyMap || this.state.isLoading) && this.renderLoading()}
          {!this.state.isLoading && this.renderMap()}
        </ImageBackground>
      );
    }
    return (
      <View style={styles.map} onLayout={this._handleLayout}>
        {(this.isEmptyMap || this.state.isLoading) && this.renderLoading()}
        {!this.state.isLoading && this.renderMap()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    backgroundColor: 'transparent',
  },

  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
