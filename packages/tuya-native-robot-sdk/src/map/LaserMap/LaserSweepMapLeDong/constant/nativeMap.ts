// 和native 交互用户地图状态
export enum nativeMapStatus {
  normal = 0,
  pressToRun = 1,
  areaSet = 2,
  virtualArea = 3,
  virtualWall = 4,
  selectZone = 5, // 假设
}

export default {
  nativeMapStatus,
};
