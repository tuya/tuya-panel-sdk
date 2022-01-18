import { TYSdk } from 'tuya-panel-kit';
import { BleNodeInfo, BeaconNodeInfo } from './interface';

/**
 * @description: 绑定 BLE 设备到网关、从网关解绑 BLE 设备。
 * @param {*} sourceMeshId 子设备当前所属的 meshId 或网关设备 ID。绑定到网关下时，传网关的 sigmeshId。从网关解绑时，传网关的设备 ID。
 * @param {*} nodes BLE 设备信息列表
 * @param {*} targetMeshId 绑定目标的 meshId。绑定到网关下时，传网关的设备 ID。从网关解绑时，传 null。
 * @return {*}
 */
const bleSubDevRelationUpdate = (
  sourceMeshId: string,
  nodes: BleNodeInfo[],
  targetMeshId: string | null
): Promise<boolean> => {
  return TYSdk.apiRequest(
    'tuya.m.device.relation.update.for.ble',
    { sourceMeshId, nodes, targetMeshId },
    '2.0'
  );
};

/**
 * @description: 绑定 SIG MESH 设备到网关、从网关解绑 SIG MESH 设备。
 * @param {*} sourceMeshId 子设备当前所属的 meshId 或网关设备 ID。绑定到网关下时，传子设备的 meshId。从网关解绑时，传网关的设备 ID。
 * @param {*} nodeIds SIG MESH 设备 nodeId 列表
 * @param {*} targetMeshId 绑定目标的 meshId。绑定到网关下时，传网关的设备 ID。从网关解绑时，传 null。
 * @return {*}
 */
const sigmeshSubDevRelationUpdate = (
  sourceMeshId: string,
  nodeIds: string[],
  targetMeshId: string | null
): Promise<boolean> => {
  return TYSdk.apiRequest(
    'tuya.m.device.relation.update',
    { sourceMeshId, nodeIds, targetMeshId },
    '2.0'
  );
};

/**
 * @description: 绑定 Beacon 设备到网关、从网关解绑 Beacon 设备。
 * @param {*} sourceMeshId 子设备当前所属的网关设备 ID。绑定到网关下时，传null。从网关解绑时，传网关的设备 ID。
 * @param {*} nodeIds Beacon 设备信息列表（mac要求小写并且去掉冒号）
 * @param {*} targetMeshId 绑定目标的 meshId。绑定到网关下时，传网关的设备 ID。从网关解绑时，传 null。
 * @return {*}
 */
const beaconSubDevRelationUpdate = (
  sourceMeshId: string | null,
  nodeIds: BeaconNodeInfo[],
  targetMeshId: string | null
): Promise<boolean> => {
  return TYSdk.apiRequest(
    'tuya.m.device.relation.update.for.beacon',
    { sourceMeshId, nodeIds, targetMeshId },
    '2.0'
  );
};

export default {
  bleSubDevRelationUpdate,
  sigmeshSubDevRelationUpdate,
  beaconSubDevRelationUpdate,
};
