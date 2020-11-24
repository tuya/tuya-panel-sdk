import _chunk from 'lodash/chunk';
import _parseInt from 'lodash/parseInt';
import _map from 'lodash/map';
import _ceil from 'lodash/ceil';
import _isEmpty from 'lodash/isEmpty';

import constant from './constant';

const { PointType } = constant;

export default class ParseMapFileUtil {
  isTopLeft = false;
  mapMatrix = 0;
  pointsColor = [];
  pointsColorData:
    | {
        current: string;
        barrier: string;
        clear: string;
        pile: string;
        unknown: string;
      }
    | {} = {};
  maxScale = 4;
  mapHeight = 0;
  mapWidth = 0;
  mapFrame = {
    maxX: 0,
    minX: 0,
    maxY: 0,
    minY: 0,
  };

  constructor(config: object) {
    const {
      mapMatrix,
      pointsColor = [],
      pointsColorData,
      isTopLeft,
      mapHeight = 0,
      mapWidth = 0,
      maxScale = 4,
    } = config;

    this.mapMatrix = mapMatrix;
    this.pointsColor = [...pointsColor];
    this.pointsColorData = pointsColorData;
    this.isTopLeft = isTopLeft;
    this.mapWidth = mapWidth;
    this.mapHeight = mapHeight;
    this.maxScale = maxScale;

    this.mapFrame.minX = mapMatrix;
    this.mapFrame.minY = mapMatrix;
  }

  get pointsColorMap() {
    if (!_isEmpty(this.pointsColorData)) {
      const { unknown = 'rgba(0,0,0,0)', barrier, clear, current, pile } = this.pointsColorData;
      return {
        [PointType.clear]: clear,
        [PointType.unknown]: unknown,
        [PointType.barrier]: barrier,
        [PointType.current]: current,
        [PointType.pile]: pile,
      };
    }
    const [current, barrier, clear, pile, unknown = 'rgba(0,0,0,0)'] = this.pointsColor;

    return {
      [PointType.current]: current,
      [PointType.clear]: clear,
      [PointType.unknown]: unknown,
      [PointType.barrier]: barrier,
      [PointType.pile]: pile,
    };
  }

  get scale() {
    // mapMatrix 地图地图边长
    // maxScale 最大放大倍数
    // mapHeight 地图视图高度
    // mapWidth 地图视图宽度
    // mapFrame = { maxX 最大的x坐标，minX 最小的x坐标，maxY 最大的y坐标，minY 最小的y坐标  }
    const { mapMatrix, maxScale, mapHeight, mapWidth, mapFrame } = this;

    const xWidth = mapMatrix + 1;
    const yHeight = _ceil(mapWidth / mapHeight, 1) * xWidth;
    const x = _ceil((mapFrame.maxX + mapFrame.minX) / 2);
    const y = _ceil((mapFrame.maxY + mapFrame.minY) / 2);
    const scaleX =
      mapFrame.maxX - mapFrame.minX > 0 ? xWidth / (mapFrame.maxX - mapFrame.minX) : maxScale;
    const scaleY =
      mapFrame.maxY - mapFrame.minY > 0 ? yHeight / (mapFrame.maxY - mapFrame.minY) : maxScale;
    const scale = Math.min(maxScale, Math.min(scaleX, scaleY) * 0.95);
    // debugger
    if (scale) {
      return { x, y, scale };
    }

    return {};
  }

  get radius() {
    // mapMatrix 地图边长，dp配置配的
    // mapWidth 手机屏幕宽度
    const { mapMatrix, mapWidth } = this;
    return mapWidth / (mapMatrix + 1) / 2;
  }

  setMapFrame({ maxX = 0, minX = 0, maxY = 0, minY = 0 }) {
    const { mapFrame } = this;
    // if (minY === 91 || mapFrame.minY === 91) debugger

    this.mapFrame = {
      maxX: Math.max(maxX, mapFrame.maxX),
      minX: Math.min(minX, mapFrame.minX),
      maxY: Math.max(maxY, mapFrame.maxY),
      minY: Math.min(minY, mapFrame.minY),
    };
  }

  parseValuebybit10(value: string) {
    const { isTopLeft, mapMatrix } = this;
    // 10个字节一个点, 解析单条数据
    const bitLength = 10;
    const points = value.match(/\w{10}/g) || [];
    const pointsData = new Map();
    const cleanPoints = new Map();
    let pilePosition = {};
    let currentPos = {};

    points.forEach(point => {
      if (point.length >= bitLength) {
        const [xstr, ystr, type] =
          point.replace(/(\w{4})(\w{4})(\w{2})/, '$1_$2_$3').split('_') || [];

        const [xnum, ynum] = _map([xstr, ystr], str => _parseInt(str, 16));

        const x = this.parseXY(xnum);
        const y = isTopLeft ? this.parseXY(ynum) : mapMatrix - this.parseXY(ynum);
        const color = this.pointsColorMap[type] || this.pointsColorMap[PointType.unknown];

        const curPoint = { x, y, color };
        // ios 只支持两种颜色，清扫点和障碍点，不支持未知点颜色，从数据中去除。当前点等同于清扫点的颜色
        if(type === PointType.clear || type === PointType.barrier || type === PointType.current) {
          pointsData.set(`${x}-${y}`, curPoint);
        } else {
          pointsData.delete(`${x}-${y}`)
        }
        if (type === PointType.clear) cleanPoints.set(`${x}-${y}`, curPoint)
        if (type === PointType.pile) pilePosition = curPoint;
        if (type === PointType.current) currentPos = curPoint;

        this.setMapFrame({ maxX: x, minX: x, maxY: y, minY: y });
      }
    });

    return {
      pointsData: Array.from(pointsData.values()),
      cleanPoints: Array.from(cleanPoints.values()),
      pilePosition,
      currentPos,
    };
  }

  parseValuebybit6(value: string) {
    // 6个字节一个点, 解析单条数据
    const { isTopLeft, mapMatrix } = this;
    const bitLength = 6;

    const points = value.match(/(\w{6})/g) || []; // 这里是把一串内容切成每6位（3个Byte）一段，3个Byte为一个点数据
    const pointsData = new Map();
    const cleanPoints = new Map();
    let pilePosition = {};
    let currentPos = {};

    points.forEach(point => {
      // 这是解析一个点（3个Byte），例 OF1D00
      if (point.length >= bitLength) {
        // x: 0F y: 1D 类型00
        const [xstr, ystr, type] = point.match(/\w{2}/g) || [];
        // x，y的值需要转为10进制 例 x：15 y: 29
        const [xnum, ynum] = _map([xstr, ystr], str => _parseInt(str, 16));

        // 真实x的坐标是 xnum和mapMatrix 之间取最小（mapMatrix表示地图最多有多少个点，6字节一个点mapMatrix最大为255）
        const x = this.parseXY(xnum);
        // y同理，这里isTopLeft表示点是否从左上角开始绘制
        const y = isTopLeft ? this.parseXY(ynum) : mapMatrix - this.parseXY(ynum);
        // 类型颜色
        const color = this.pointsColorMap[type] || this.pointsColorMap[PointType.unknown];

        const curPoint = { x, y, color };
        // if (!pointsData.has(`${x}${y}${color}`)) pointsData.set(`${x}${y}${color}`, curPoint);
        // ios 只支持两种颜色，清扫点和障碍点，不支持未知点颜色，从数据中去除。当前点等同于清扫点的颜色
        if(type === PointType.clear || type === PointType.barrier || type === PointType.current) {
          pointsData.set(`${x}-${y}`, curPoint);
        } else {
          pointsData.delete(`${x}-${y}`)
        }
        if (type === PointType.clear) cleanPoints.set(`${x}-${y}`, curPoint)
        if (type === PointType.pile) pilePosition = curPoint;
        if (type === PointType.current) currentPos = curPoint;

        this.setMapFrame({ maxX: x, minX: x, maxY: y, minY: y });
      }
    });
    // console.warn('debugger pointsData', pointsData, JSON.stringify(Array.from(pointsData.values()), null, 2) )
    return {
      pointsData: Array.from(pointsData.values()),
      cleanPoints: Array.from(cleanPoints.values()),
      pilePosition,
      currentPos,
    };
  }

  parseXY(xy: number) {
    return Math.min(xy, this.mapMatrix);
  }

  parseDatabyBit10(datas: string[]) {
    // 10bit一个点
    const pointsData = [];
    const cleanPoints = [];
    let pilePosition = {};
    let currentPos = {};

    datas.forEach(value => {
      const ds = this.parseValuebybit10(value);

      pointsData.push(...ds.pointsData);
      cleanPoints.push(...ds.cleanPoints);
      !_isEmpty(ds.pilePosition) && (pilePosition = { ...ds.pilePosition });
      !_isEmpty(ds.currentPos) && (currentPos = { ...ds.currentPos });
    });

    return { pointsData, pilePosition, currentPos, cleanPoints };
  }

  parseDatabyBit6(datas: string[]) {
    // 6bit一个点
    const pointsData = [];
    const cleanPoints = [];
    let pilePosition = {};
    let currentPos = {};

    datas.forEach(value => {
      const ds = this.parseValuebybit6(value);
      pointsData.push(...ds.pointsData);
      cleanPoints.push(...ds.cleanPoints);
      !_isEmpty(ds.pilePosition) && (pilePosition = { ...ds.pilePosition });
      !_isEmpty(ds.currentPos) && (currentPos = { ...ds.currentPos });
    });
    // console.warn('cleanPoints', cleanPoints);
    

    return { pointsData, pilePosition, currentPos, cleanPoints };
  }

  parseDataWithoutClearPointbyBit10(datas: string[]) {
    // 10bit一个点，数据中几乎不包含清扫（02）类型的点
    const pointsData = new Map();
    const cleanPoints = [];
    let pilePosition = {};
    let currentPos = {};

    const getClearPoints = (curX, curY) => {
      // 机器人每次更新当前位置附近的81邻域,绘制当前点在中间的9*9的清扫点
      const distance = 4; // 当前点离最小点、最大点的距离
      const [minx, miny, maxx, maxy] = [
        curX - distance,
        curY - distance,
        curX + distance,
        curY + distance,
      ];

      for (let curx = minx; curx < maxx; curx++) {
        for (let cury = miny; cury < maxy; cury++) {
          const point = {
            x: curx,
            y: cury,
            color: this.pointsColorMap[PointType.clear],
          };
          // if (!pointsData.has(`${curx}${cury}`)) pointsData.set(`${curx}${cury}`, point);
          pointsData.set(`${curx}-${cury}`, point);
        }
      }
    };

    datas.forEach(value => {
      const ds = this.parseValuebybit10(value);

      cleanPoints.push(...ds.cleanPoints);
      !_isEmpty(ds.pilePosition) && (pilePosition = { ...ds.pilePosition });
      !_isEmpty(ds.currentPos) && (currentPos = { ...ds.currentPos });
      const { x: curX, y: curY } = currentPos;
      if (!curX || !curY) return;

      getClearPoints(curX, curY);

      ds.pointsData.forEach(p => {
        pointsData.set(`${p.x}-${p.y}`, p);
        
      });
    });

    return { pointsData: Array.from(pointsData.values()), pilePosition, currentPos, cleanPoints };
  }
}
