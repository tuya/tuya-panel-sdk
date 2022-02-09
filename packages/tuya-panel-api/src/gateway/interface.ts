export interface BleNodeInfo {
  // BLE 设备的 uuid
  uuid: string;
  // BLE 设备的设备 ID
  devId: string;
}
export interface BeaconNodeInfo {
  // Beacon 设备的 MAC地址，全部小写并且无冒号分隔 。例如：“0800200a8c6d”
  mac: string;
  // Beacon 设备的设备 ID
  devId: string;
}
