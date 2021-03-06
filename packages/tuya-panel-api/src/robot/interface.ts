export interface IMessage {
  code?: string;
  message: string;
  errorMsg?: string;
}

export interface IGetGyroHistoryListOpts {
  /**
   * 清扫记录dpCode，默认值：clean_record
   *
   * @type {string}
   * @memberof IGetGyroHistoryListOpts
   */
  cleanRecordCode?: string;
  /**
   * 查询第几页数，默认值：0
   *
   * @type {number}
   * @memberof IGetGyroHistoryListOpts
   */
  page?: number;
  /**
   * 每页展示最多数据，默认值：10
   *
   * @type {number}
   * @memberof IGetGyroHistoryListOpts
   */
  pageLimit?: number;
  /**
   * 开始时间 unix时间戳
   *
   * @type {number}
   * @memberof IGetGyroHistoryListOpts
   */
  startTime?: number;
  /**
   * 结束时间 unix时间戳
   *
   * @type {number}
   * @memberof IGetGyroHistoryListOpts
   */
  endTime?: number; // unix时间戳
}

export interface IRecordOriginList {
  datas: IRecordOriginData[];
  hasNext: boolean;
  totalCount: number;
}

export interface IRecordOriginData {
  recordId: string;
  value: string;
  dpId: number;
  gmtCreate: number;
}

export interface IRecordExportList {
  dataList: IRecordExportData[];
  hasNext: boolean;
}

export interface IRecordExportData {
  id: string;
  value: string;
  timestamp: number;
}

export interface IGetGyroMapLatestMediaOpts {
  offset?: string;
  limit?: number;
}

export interface IGyroMapMediaOrigin {
  dataList: string[];
  datatype: number;
  devId: string;
  endTime: number;
  hasNext: boolean;
  mapId: number;
  startRow: string;
  startTime: number;
  status: number;
  subRecordId: number;
}

export interface IGyroMapMediaExport {
  dataList: string[];
  subRecordId: number;
  nextOffset: string;
}

export interface IGetGyroMapHistoryMediaOpts extends IGetGyroMapLatestMediaOpts {
  subRecordId: string;
}

export interface IBitmapToImageOpt {
  width: number;
  height: number;
  points: string;
  pointLength: number;
  colorsMaps: { [index: string]: string };
  scale: number;
  orientation:
    | 'up'
    | 'down'
    | 'left'
    | 'right'
    | 'upMirrored'
    | 'downMirrored'
    | 'leftMirrored'
    | 'rightMirrored';
}

export interface IGetLaserHistoryListOpts {
  /**
   * 查询第几页数，默认值：0
   *
   * @type {number}
   * @memberof IGetLaserHistoryListOpts
   */
  page?: number;
  /**
   * 每页展示最多数据，默认值：10
   *
   * @type {number}
   * @memberof IGetLaserHistoryListOpts
   */
  pageLimit?: number;
}

export interface ILaserOriginRecordList {
  totalCount: number;
  datas: {
    id: number;
    bucket: string;
    extend: string;
    devId: string;
    file: string;
    /**
     *  unix 时间戳
     *
     * @type {number}
     * @memberof ILaserOriginRecordList
     */
    time: number;
    fileType: string;
  }[];
}

export interface ILaserRecordExportList {
  dataList: {
    id: number;
    file: string;
    value: string;
    timestamp: number;
  }[];
  hasNext: boolean;
}

export interface ILaserRecordExportList {
  dataList: {
    id: number;
    file: string;
    value: string;
    timestamp: number;
  }[];
  hasNext: boolean;
}

export interface ILaserMultiFloorExportList {
  dataList: {
    id: number;
    historyFile: string;
    backupFile: string;
    value: string;
    timestamp: number;
  }[];
  hasNext: boolean;
}
export interface IStreamData {
  dataList: string[];
  hasNext: boolean;
  startRow: number;
  subRecordId: number;
}
export interface ITransferParams {
  subRecordId: number;
  start: number;
  size: number;
  mapId?: number;
}
