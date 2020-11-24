export const GLOBAL_MAP_TYPE = 0;
export const HISTORY_MAP_TYPE = 2;
export const MAP_END_TYPE = 128;

export const CURRENT_POS_TYPE = 3;

export const HISTORY_MAP_STATUS = {
  none: 'none', // 无历史地图
  uploading: 'uploading', // 有历史地图正在上传中
  uploaded: 'uploaded', // 有历史地图且上传完成
  getMap: 'getmap', // 向机器发起重新传输历史地图请求
};

export const DP_CODES = {
  mapData: 'mapdata',
  historyNotice: 'hismap_notice',
};
