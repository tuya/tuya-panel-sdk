import { I18NLanMap } from "tuya-panel-kit"

declare module '*.css'
declare module '*.less'

declare type DpType = 'bool' | 'value' | 'enum' | 'raw' | 'string' | 'bitmap'

declare type DpValue = boolean | number | string

declare interface DeviceInfo {
  checkDpExist(idOrCode: number | string): boolean
  deleteDeviceInfo(): Promise<void>
  formatDps(data: Record<number, any>): Record<string, any>
  getBleManagerState(): Promise<boolean>
  getBluetoothState(): Promise<number>
  getDeviceInfo(): Promise<DevInfo>
  // tslint:disable-next-line no-unnecessary-generics
  getDeviceState<S = Record<string, DpType>>(): Promise<S>
  getDpCodeById(id: string | number): string
  getDpCodes(): string[]
  /**
   * @desc 主动从设备获取 dp 点状态
   */
  getDpDataFromDevice(idOrCode: string | number): Promise<void>
  getDpIdByCode(code: string): string
  getDpSchema(): DpSchema[]
  getDpSchema(code: string): DpSchema
  getFunConfig(): Record<string, any>
  /**
   * @deprecated
   */
  getGState(dp: string): any
  getState(dp?: string): any
  getUnpackPanelInfo(): Promise<I18NLanMap>
  gotoBlePermissions(): void
  gotoDeviceWifiNetworkMonitor(): void
  initDevice(): Promise<DevInfo>
  isBleDevice(): boolean
  isLocalLAN(): boolean
  isMeshDevice(): boolean
  isMeshWifiDevice(): boolean
  isShareDevice(): boolean
  isSigMeshDevice(): boolean
  isWifiDevice(): boolean
  /**
   * @desc 下发 dp 点
   */
  putDeviceData(cmd: Record<string, any>): Promise<{ success: boolean }>
  /**
   * @desc 局域网下发 dp 点
   */
  putLocalDpData(cmd: Record<string, any>): Promise<void>
  setDevState(state: Record<string, DpValue>): DevInfo
  setDeviceInfo(d: DevInfo): void
  /**
   * @deprecated
   */
  setGState(dp: string, val: any): any
  setState(dp: string, val: any): Record<string, any>
}

declare interface DevInfo<S = Record<string, DpType>> {
  ability: number
  activeTime: number
  /**
   * @deprecated
   */
  appId: number
  appKey: string
  /**
   * @desc 网络是否在线
   */
  appOnline: boolean
  attribute: number
  baseAttribute: number
  bv: number
  capability: number
  category: string
  categoryCode: string
  cloudOnline: boolean
  codeIds: Record<string, string>
  communication: Record<string, any>
  devAttribute: number
  /**
   * @desc 设备是否在线
   */
  deviceOnline: boolean
  deviceType: number
  devId: string
  displayDps: any[]
  displayMsgs: Record<string, any>
  displayOrder: number
  dpMaxTime: number
  dpName: Record<string | number, string>
  dps: Record<number, string>
  errorCode: number
  faultDps: any[]
  gatewayVerCAD: string
  gwType: string
  homeDisplayOrder: number
  homeId: number
  i18nTime: number
  iconUrl: string
  idCodes: Record<number, string>
  ip: string
  isAdmin: boolean
  isCloudOnline: boolean
  /**
   * @desc 局域网是否在线
   */
  isLocalOnline: boolean
  isMeshBleOnline: boolean
  isNewFirmware: boolean
  isShare: boolean
  isUniversalPanel: boolean
  isVDevice: boolean
  latitude: string
  localKey: string
  longitude: string
  lpv: number
  meshId: string
  name: string
  networkType: any
  originJson: Record<string, any>
  panelConfig: {
    bic: Array<{ code: string; selected: boolean; value?: string | undefined }>
    fun?: Record<string, any> | undefined
  }
  pcc: string
  productId: string
  protocolAttribute: number
  pv: number
  quickOpDps: any[]
  rnFind: boolean
  roomId: number
  runtimeEnv: string
  schema: {
    [K in keyof S]: DpSchema
  }
  schemaExt: string
  sharedTime: number
  sigmeshId: string
  standard: boolean
  standSchemaModel: Record<string, any>
  state: S
  supportGroup: boolean
  supportSGroup: boolean
  timezoneId: string
  ui: string
  uiId: string
  uiPhase: string
  uiType: string
  uiVersion: string
  upgrading: boolean
  uuid: string
  vendorInfo: string
  verSw: string
  virtual: boolean
  parentId?: string | undefined
  groupId?: string | undefined
}

declare interface DpSchema {
  code: string
  dptype: string
  iconname: string
  id: string
  /**
   * type: 'bitmap' only
   */
  label?: string[] | undefined
  /**
   * type: 'bitmap' only
   */
  maxlen?: number | undefined
  /**
   * type: 'value' only
   */
  max?: number | undefined
  /**
   * type: 'value' only
   */
  min?: number | undefined
  mode: 'rw' | 'ro' | 'rw'
  name: string
  /**
   * type: 'enum' only
   */
  range?: any[] | undefined
  /**
   * type: 'value' only
   */
  scale?: number | undefined
  /**
   * type: 'value' only
   */
  step?: number | undefined
  type: DpType
  /**
   * type: 'value' only
   */
  unit?: string | undefined
}
