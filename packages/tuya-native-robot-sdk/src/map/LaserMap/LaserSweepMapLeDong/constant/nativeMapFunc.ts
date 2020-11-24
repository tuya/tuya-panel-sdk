import nativeMap from './nativeMap';

const { nativeMapStatus } = nativeMap;

function mapStatusIsPoint(mapStatus: number) {
  return mapStatus === nativeMapStatus.pressToRun;
}

function mapStatusIsArea(mapStatus: number) {
  return mapStatus === nativeMapStatus.areaSet;
}

function mapStatusIsNormal(mapStatus: number) {
  return mapStatus === nativeMapStatus.normal;
}

function mapStatusIsSelectZone(mapStatus: number) {
  return mapStatus === nativeMapStatus.selectZone;
}

function mapStatusIsVirtualArea(mapStatus: number) {
  return mapStatus === nativeMapStatus.virtualArea;
}

function mapStatusIsVirtualWall(mapStatus: number) {
  return mapStatus === nativeMapStatus.virtualWall;
}

export default {
  // 地图状态
  mapStatusIsPoint,
  mapStatusIsArea,
  mapStatusIsNormal,
  mapStatusIsVirtualArea,
  mapStatusIsSelectZone,
  mapStatusIsVirtualWall,
};
