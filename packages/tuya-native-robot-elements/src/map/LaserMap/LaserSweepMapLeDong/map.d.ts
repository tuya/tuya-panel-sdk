declare module '@type/LaserSweepMapLeDong' {
  export interface IOriginRegion {
    vertexs: [[number, number], [number, number], [number, number], [number, number]];
    id: number;
    active: string;
    tag: string;
  }

  /** 地图原始数据 */
  export interface IOriginMapData {
    mapId: number;
    pathId: number;
    width: number;
    height: number;
    resolution: number; // 比例尺
    x_min: number; // 地图左下标对应的x世界坐标
    y_min: number; // 地图左下标对应的x世界坐标
    lz4_len: number; // 地图压缩长度
    area: IOriginRegion[]; // 区域信息
    map: string; // 地图数据
    base64_len: number; // 地图数据长度
    chargeHandleState: string; // 充电桩信息
    chargeHandlePos: [number, number]; //  充电桩位置
    chargeHandlePhi: number; // 充电桩朝向
  }

  export interface IOriginPathData {
    pathID: number;
    posArray: number[];
    hasPathInfo: number;
    startPos: number;
    totalPoints: number;
    pointCounts: number;
  }
}
