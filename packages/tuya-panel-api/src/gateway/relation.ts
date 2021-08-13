import { TYSdk } from 'tuya-panel-kit';
import { AddBleSubDev } from './interface';

/**
 * @description: 蓝牙单点设备转移到指定网关下
 * @param {*} sourceMeshId meshId或网关id，子设备当前所属，蓝牙单点传网关id，mesh设备传meshId，同时有mesh和蓝牙单点传meshId
 * @param {*} nodes 设备id和虚拟Id列表，例如:[{"devId":"002003545ccf7f34af1e", "uuid":"2334d72777532f8e"},{"devId":"002003545ccf7f34af1e", "uuid":"2334d72777532f8e"}]
 * @param {*} targetMeshId meshId或网关id，子设备目标所属
 * @return {*}
 */
const bleSubDevRelationUpdate = (
  sourceMeshId: string,
  nodes: AddBleSubDev[],
  targetMeshId: string | null
): Promise<boolean> => {
  return TYSdk.apiRequest(
    'tuya.m.device.relation.update.for.ble',
    { sourceMeshId, nodes, targetMeshId },
    '2.0'
  );
};

/**
 * @description: SIG Mesh子设备的添加和删除
 * @param {*} sourceMeshId meshId或网关id，子设备当前所属，蓝牙单点传网关id，mesh设备传meshId，同时有mesh和蓝牙单点传meshId
 * @param {*} nodeIds 子设备列表,蓝牙单点设备传uuid，mesh设备传nodeId
 * @param {*} targetMeshId meshId或网关id，子设备目标所属
 * @return {*}
 */
const sigmeshSubDevRelationUpdate = (
  sourceMeshId: string,
  nodeIds: string[],
  targetMeshId: string
): Promise<boolean> => {
  return TYSdk.apiRequest(
    'tuya.m.device.relation.update',
    { sourceMeshId, nodeIds, targetMeshId },
    '2.0'
  );
};

export default {
  bleSubDevRelationUpdate,
  sigmeshSubDevRelationUpdate,
};
