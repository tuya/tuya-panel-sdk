/* eslint-disable no-console */
/* eslint-disable prefer-destructuring */
/* eslint-disable literal-check/literal-check */
// 生物节律接口
import { TYSdk } from 'tuya-panel-kit';

import { parseJSON } from './utils';

const cloneDeep = (data: any) => {
  let _data = data;
  try {
    _data = JSON.parse(JSON.stringify(data));
  } catch (err) {
    _data = data;
  }
  return _data;
};

// 默认位置天安门附近
const DefaultLocation = {
  latitude: 39.90960456049752,
  longitude: 116.3972282409668,
};

/**
 * 功能：获取当前位置的经纬度，必须开启app定位权限
 */
export const getCurrentLocation = (): Promise<{ longitude: number; latitude: number }> => {
  let { longitude, latitude } = DefaultLocation;
  return new Promise((resolve, reject) => {
    TYSdk.native.updateLocation({ isImmediate: true }, (res: any) => {
      if (res) {
        if (res && res.longitude !== undefined && res.latitude !== undefined) {
          longitude = res.longitude;
          latitude = res.latitude;
        }
        resolve({ longitude, latitude });
      } else {
        reject(res);
      }
    });
  });
};

/**
 * @description: 根据经纬度获取城市
 * @param {number} lon 经度
 * @param {number} lat 纬度
 */
type TCityInfo = {
  country: string; // 国家
  province: string; // 省
  city: string; // 城市
};
export const getCityInfoByLocation = (lon: number, lat: number): Promise<TCityInfo> => {
  const { devId } = TYSdk.devInfo;
  return new Promise((resolve, reject) => {
    TYSdk.native.apiRNRequest(
      {
        a: 'tuya.m.light.rhythm.city',
        postData: {
          devId,
          lon,
          lat,
        },
        v: '1.0',
      },
      (d: any) => {
        resolve(parseJSON(d));
      },
      (err: any) => {
        reject(err);
      }
    );
  });
};

/**
 * @description: 根据经纬度获取生物节律时间
 * @param {string} devId 设备id
 * @param {number} lon 经度
 * @param {number} lat 纬度
 */
type RhythmTimeInfo = {
  sunrise: string; // 日出(时分)
  sunset: string; // 日落(时分)
  transitAtNoon: string; // 正午(时分)
  dawn: string; // 日出前(时分)
  dusk: string; // 日落后(时分)
  date: string; // 日期
};
export const getRhythmTimeByLocation = (lon: number, lat: number): Promise<RhythmTimeInfo[]> => {
  const { devId } = TYSdk.devInfo;
  return new Promise((resolve, reject) => {
    TYSdk.native.apiRNRequest(
      {
        a: 'tuya.m.light.rhythm.time.list',
        postData: {
          devId,
          lon,
          lat,
        },
        v: '1.0',
      },
      (d: any) => {
        resolve(parseJSON(d));
      },
      (err: any) => {
        console.log(err);
        reject(err);
      }
    );
  });
};

/**
 * @description: 是否支持生物节律高级功能
 */
export const isSupportRhythm = (): Promise<boolean> => {
  const { devId } = TYSdk.devInfo;
  return new Promise((resolve, reject) => {
    TYSdk.native.apiRNRequest(
      {
        a: 'tuya.m.light.high.power.get',
        postData: {
          devId,
          abilityCode: 'tyabiyrjd7',
        },
        v: '1.0',
      },
      (d: any) => {
        const { vasEnabled } = parseJSON(d);
        resolve(vasEnabled || false);
      },
      err => {
        console.log(err);
        // eslint-disable-next-line prefer-promise-reject-errors
        reject(err);
      }
    );
  });
};

const codeList = [
  'leona_rhythm_dp_dawn',
  'leona_rhythm_dp_sunrise',
  'leona_rhythm_dp_noon',
  'leona_rhythm_dp_sunset',
  'leona_rhythm_dp_dusk',
];

/**
 * @description: 更新生物节律模式信息
 * @param {Array} propertyList 数组
 * @returns boolean
 */
export const saveRhythmInfo = (propertyList: any[]): Promise<boolean> => {
  const { groupId, devId } = TYSdk.devInfo;
  return new Promise((resolve, reject) => {
    const inValidList = propertyList.filter(p => {
      return !codeList.find(c => c === p.code);
    });
    if (inValidList) {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject(('列表中存在非法的code' as unknown) as Error);
      console.warn(inValidList, '请检查');
      return;
    }
    TYSdk.native.apiRNRequest(
      {
        a: 's.m.dev.property.save',
        postData: {
          devId: groupId || devId,
          bizType: groupId ? 1 : 0,
          propertyList,
        },
        v: '4.0',
      },
      (d: boolean) => {
        resolve(d);
      },
      (err: any) => {
        console.log(err);
        reject(err);
      }
    );
  });
};

/**
 * @description: 触发定时生物节律开启关闭
 * @param {string} cronExp cron表达式，详情可搜索
 * cron 有如下两种语法格式：
 * 秒 分 小时 日期 月份 星期 年
 * 秒 分 小时 日期 月份 星期
 */
export const updateRhythmInfo = (cronExp?: string): Promise<boolean> => {
  const { groupId, devId } = TYSdk.devInfo;

  return new Promise((resolve, reject) => {
    const setTimeApi = 'tuya.m.light.rhythm.set.time.trigger';
    const timeMonthApi = 'tuya.m.light.rhythm.time.trigger';
    const groupApi = 'tuya.m.light.group.rhythm.schedule.save';
    const timerApi = cronExp ? setTimeApi : timeMonthApi;
    const api = groupId ? groupApi : timerApi;
    const groupParams = {
      groupId,
      cronExp,
    };
    const devParams = {
      devId,
      cron: cronExp,
    };
    const postData = groupId ? groupParams : devParams;
    TYSdk.native.apiRNRequest(
      {
        a: api,
        postData,
        v: '1.0',
      },
      (d: boolean) => {
        resolve(d);
      },
      (err: any) => {
        console.log(err);
        reject(err);
      }
    );
  });
};

/**
 * @description: 模糊查询面板生物节律dp信息
 * @param {string} bizId 群组id或设备id
 * @param {string} preCode code值，%结尾支持模糊查询leona_rhythms_%
 * @param {number} offset 起始页
 * @param {number} limit 条数
 */
const fuzzyQueryRhythm = (preCode: string, offset: number, limit: number) => {
  const { devId, groupId } = TYSdk.devInfo;
  return new Promise((resolve, reject) => {
    TYSdk.native.apiRNRequest(
      {
        a: 's.m.dev.property.get',
        postData: {
          devId: groupId || devId,
          preCode,
          offset,
          limit,
        },
        v: '3.1',
      },
      (r: any) => {
        const d = parseJSON(r);
        const arr = cloneDeep(d.datas) || [];
        const a = arr.map(m => {
          const obj = typeof m.value === 'string' ? JSON.parse(m.value) : m.value;
          return {
            code: m.code,
            value: obj,
          };
        });
        resolve(a);
      },
      (err: any) => {
        console.log(err);
        reject(err);
      }
    );
  });
};

type CityLocationInfo = {
  name: string;
  latitude: string;
  longitude: string;
};
/**
 * 获取云端存储的城市信息
 */
export const getCloudCityInfo = async (): Promise<CityLocationInfo | undefined> => {
  const response: any = await fuzzyQueryRhythm('leona_rhythm_%', 0, 10);
  const infoList = response?.filter(n => n.code === 'leona_rhythm_info');
  const infoObj = infoList.length ? infoList[0] : {};
  return infoObj.value;
};

// eslint-disable-next-line no-shadow
enum EMode {
  normal, // 0-默认模式
  nature, // 1-自然模式
  custom, // 2-自定义模式
}
// eslint-disable-next-line no-shadow
enum EPower {
  close,
  open,
}

/**
 * 获取云端存储的日出日落信息
 */
type CustomRhythm = {
  value: {
    weeks: number;
    power: EPower;
    number: number;
    rhythm: {
      minute: number;
      hour: number;
      brightness: number;
      power: number;
      temperature: number;
      saturation: number;
      lightness: number;
      hue: number;
    };
    mode: EMode;
    version: number;
  };
  code:
    | 'leona_rhythm_dp_dawn'
    | 'leona_rhythm_dp_dusk'
    | 'leona_rhythm_dp_noon'
    | 'leona_rhythm_dp_sunrise'
    | 'leona_rhythm_dp_sunset';
};
export const getCloudCustomRhythm = async (): Promise<CustomRhythm[]> => {
  const response: any = await fuzzyQueryRhythm('leona_rhythm_%', 0, 10);
  const infoList = response?.filter(n => n.code !== 'leona_rhythm_info');
  return infoList;
};
