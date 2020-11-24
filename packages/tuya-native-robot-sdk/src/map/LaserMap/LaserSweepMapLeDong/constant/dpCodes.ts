export interface IdpCodesEnum {
  heart: string;
  cleanMode: string;
  pathData: string;
  robotStatus: string;
  commRaw: string,
  [index: string]: any;
}

export interface IdpCodesValueEnum {
  cleanMode: { smart: string; zone: string; pose: string; backCharge: string; part: string };
  robotStatus: {
    toCharge: string;
    chargring: string;
    fullCharge: string;
    pause: string;
    idle: string;
    totaling: string;
    pointing: string;
    areaing: string;
    fault: string;
    dormant: string;
  };
  [index: string]: any
}

export const dpCodesEnum: IdpCodesEnum = {
  heart: '',
  cleanSwitch: 'clean_switch',
  cleanMode: 'clean_mode',
  pathData: 'path_comm',
  robotStatus: 'robot_state',
  commRaw: 'comm_raw',
  disturbSwitch: 'disturb_switch',
  volume: 'volume',
  suck: 'fan_mode',
  resetMap: 'reset_map', // 重置地图
  /** 语音包dp */
  voiceType: 'voice_id', // 选定语音包
  voiceLink: 'voice_link', // 用于复杂通信
  /** 耗材dp */
  sideBrushTime: 'side_brush_time', // 边刷
  mainBrushTime: 'main_brush_time', // 滚刷（主刷）
  filterTime: 'filter_time', // 滤网
  materialReset: 'material_reset',// 重置
};

export const dpCodesValueEnum: IdpCodesValueEnum = {
  cleanMode: {
    smart: 'smart', // 自动清扫
    zone: 'zone', // 区域清扫
    pose: 'pose', // 指拿扫拿
    backCharge: 'backcharge', // 回充
    part: 'curpointing', // 局部清扫
  },
  robotStatus: {
    toCharge: 'tocharge', // 回充的路上，去回充
    chargring: 'chargring', // 充电中
    fullCharge: 'fullcharge', // 充满电
    pause: 'pause', // 暂停
    idle: 'idle', // 待机
    totaling: 'totaling', // 全局清扫中,
    pointing: 'pointing', // 指哪扫哪
    areaing: 'areaing', // 局域清扫
    fault: 'fault', // 故障
    dormant: 'dormant', // 休眠
  },

  materialReset: {
    getTime: 'gettime',
    side: 'resetsidebrush',
    main: 'resetmainbrush',
    filter: 'resetfilter',
  },

  suck: {
    mop: 'mop',
    quiet: 'quiet',
    auto: 'auto',
    strong: 'strong',
    max: 'max',
  },
};

export default {
  dpCodesEnum,
  dpCodesValueEnum,
};
 