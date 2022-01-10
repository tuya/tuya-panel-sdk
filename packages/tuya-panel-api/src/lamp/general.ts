/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { NativeModules } from 'react-native';
import { TYSdk } from 'tuya-panel-kit';
import _ from 'lodash';
import { api } from './utils';
import StorageUtils from './storage';

const TYEvent = TYSdk.event;
const LOCAL_DATA_KEY = 'LOCAL_DATA_KEY';

/**
 * 同步操作类型
 */
// eslint-disable-next-line no-shadow
enum SyncType {
  ADD,
  UPDATE,
  REMOVE,
}

interface CacheData {
  status: number;
  type: SyncType;
  data: {
    time: number;
    data: any;
  };
}

// 云端数据对应的本地缓存
const formateCacheData = (data: Record<string, any>): Record<string, any> => {
  const result: any = {};
  Object.keys(data).forEach(key => {
    const {
      type,
      data: { data: value },
    } = data[key];
    if (type !== SyncType.REMOVE && value) {
      result[key] = value;
    }
  });
  return result;
};

const handleSyncCloudData = async (syncCloudData: any, syncLocalData: any) => {
  if (!_.isEmpty(syncCloudData) || !_.isEmpty(syncLocalData)) {
    TYEvent.emit('beginSyncCloudData', { syncCloudData, syncLocalData });
    if (!_.isEmpty(syncLocalData)) {
      const cacheData = (await StorageUtils.getDevItem(LOCAL_DATA_KEY)) || {};
      Object.keys(syncLocalData).forEach(key => {
        const { type } = syncLocalData[key];
        if (type === SyncType.REMOVE) {
          delete cacheData[key];
        } else {
          cacheData[key] = syncLocalData[key];
        }
      });
      StorageUtils.setDevItem(LOCAL_DATA_KEY, cacheData);
      if (_.isEmpty(syncCloudData)) {
        TYEvent.emit('endSyncCloudData', formateCacheData(cacheData));
      }
    }
    if (!_.isEmpty(syncCloudData)) {
      // 同步数据到云端
      const codes = Object.keys(syncCloudData);
      let total = codes.length;
      const handleEnd = () => {
        total--;
        if (total === 0) {
          StorageUtils.getDevItem(LOCAL_DATA_KEY).then((d: any) => {
            TYEvent.emit('endSyncCloudData', formateCacheData(d || {}));
          });
        }
      };

      codes.forEach(key => {
        const target = syncCloudData[key];
        let syncCount = 3; // 如果失败，会再次同步，共同步三次
        if (target.type === SyncType.REMOVE) {
          // 删除
          const handle = () => {
            syncCount--;
            handleSaveCloudConfig(key, { ...target, data: { time: target.data.time, data: null } })
              .then(handleEnd)
              .catch(() => {
                if (syncCount > 0) {
                  handle();
                } else {
                  TYEvent.emit('syncCloudDataError', { [key]: target.data });
                  handleEnd();
                }
              });
          };
          handle();
        } else {
          const handle = () => {
            syncCount--;
            handleSaveCloudConfig(key, target)
              .then(handleEnd)
              .catch(() => {
                if (syncCount > 0) {
                  handle();
                } else {
                  TYEvent.emit('syncCloudDataError', { [key]: target.data });
                  handleEnd();
                }
              });
          };
          handle();
        }
      });
    }
  }
};

const syncComplete = async (code: string, data: any) => {
  const cacheData: any = StorageUtils.getDevItem(LOCAL_DATA_KEY) || {};
  const target = cacheData[code];
  // 校验数据是否被动过
  if (_.isEqual(data, target)) {
    switch (data.type) {
      case SyncType.ADD:
      case SyncType.UPDATE:
        target.status = 1;
        break;
      case SyncType.REMOVE:
        delete cacheData[code];
        break;
      default:
    }

    StorageUtils.setDevItem(LOCAL_DATA_KEY, cacheData);
  }
};

const handleSaveCloudConfig = async (code: string, cacheData: CacheData): Promise<void> => {
  // @ts-ignore
  const { groupId, devId } = TYSdk.devInfo;
  return api(
    's.m.dev.property.save',
    {
      devId: groupId || devId,
      bizType: groupId ? 1 : 0,
      code,
      value: JSON.stringify(cacheData.data),
    },
    '3.0'
  ).then(() => {
    // 已同步
    syncComplete(code, cacheData);
  });
};

/**
 * @description: 获取产品dp面板配置
 * @param {string} name 配置key
 * @param {any} defaultValue 默认值
 */
const getCloudFun = (name: string, defaultValue: any = null): any => {
  return _.get(TYSdk, ['devInfo', 'panelConfig', 'fun', name], defaultValue);
};

/**
 * @description: 开启手机声音输入
 */
const startVoice = (): Promise<any> =>
  new Promise((resolve, reject) => {
    NativeModules.TYRCTMusicManager.startVoice(
      (d: any) => {
        TYSdk.native.screenAlwaysOn(true);
        resolve(d);
      },
      () => {
        reject();
      }
    );
  });

/**
 * @description: 关闭手机声音输入
 */
const stopVoice = (): Promise<any> =>
  new Promise((resolve, reject) => {
    NativeModules.TYRCTMusicManager.stopVoice((d: any) => {
      TYSdk.native.screenAlwaysOn(false);
      resolve(d);
    }, reject);
  });

/**
 * @description: 获取设备全部属性数据
 */
const getAllCloudConfig = (): Promise<Record<string, any>> => {
  // @ts-ignore
  const { groupId, devId } = TYSdk.devInfo;
  return api(
    's.m.dev.property.get',
    {
      devId: groupId || devId,
      bizType: groupId ? 1 : 0,
    },
    '2.0'
  ).then((data: Record<string, string>) => {
    const result: any = {};
    Object.keys(data).forEach(key => {
      try {
        const res = JSON.parse(data[key]);
        result[key] = res;
      } catch (e) {
        console.log(e);
      }
    });

    return result;
  });
};

/**
 * @description: 保存设备自定义属性数据
 * @param {string} code 自定义属性名
 * @param {any} data 自定义属性值
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const saveCloudConfig = async (code: string, data: any): Promise<any> => {
  const cacheConfigData = (await StorageUtils.getDevItem(LOCAL_DATA_KEY)) || {};
  let isExist = false;
  if (cacheConfigData && cacheConfigData[code]) {
    isExist = true;
  }
  // status 0 表示未同步, 1 为同步
  const cacheData = {
    status: 0,
    type: isExist ? SyncType.UPDATE : SyncType.ADD,
    data: { time: +new Date(), data }, // 加入一个时间标记数据的前后，这里依赖于客户端的时间，如果客户端手机时间不准确，可能会出现同步问题
  };
  cacheConfigData[code] = cacheData;
  await StorageUtils.setDevItem(LOCAL_DATA_KEY, cacheConfigData);
  handleSaveCloudConfig(code, cacheData);

  return Promise.resolve(formateCacheData(cacheConfigData));
};

/**
 * @description: 删除设备自定义属性数据
 * @param {string} code 自定义属性名
 */
const deleteCloudConfig = async (code: string): Promise<any> => {
  // 删除一个code, 不做真删除，只删除其数据
  const cacheConfigData = (await StorageUtils.getDevItem(LOCAL_DATA_KEY)) || {};
  let isExist = false;
  if (cacheConfigData && cacheConfigData[code]) {
    isExist = true;
  }
  if (isExist) {
    const data = cacheConfigData[code];
    // status 0 表示未同步, 1 为同步
    data.status = 0;
    data.type = SyncType.REMOVE;
    data.data.time = +new Date();
    data.data.data = null;
    await StorageUtils.setDevItem(LOCAL_DATA_KEY, cacheConfigData);
    handleSaveCloudConfig(code, data);
    return Promise.resolve();
  }
  return null;
};

/**
 * @description: 获取设备属性本地缓存数据
 */
const fetchLocalConfig = async (): Promise<Record<string, any>> => {
  // 获取配置缓存数据
  const cacheData = (await StorageUtils.getDevItem(LOCAL_DATA_KEY)) || {};
  // 存在缓存数据，优先以缓存数据显示
  if (cacheData) {
    return formateCacheData(cacheData);
  }
  return null;
};

/**
 * @description: 同步设备属性数据
 */
const syncCloudConfig = (): Promise<void> => {
  return getAllCloudConfig().then(res => {
    StorageUtils.getDevItem(LOCAL_DATA_KEY).then((cacheData: Record<string, any> = {}) => {
      const newCacheData = cacheData ? _.cloneDeep(cacheData) : {};
      // 同步数据
      const syncCloudData: any = {};
      const syncLocalData: any = {};
      const needSyncKeys = Object.keys(res);
      Object.keys(newCacheData).forEach(key => {
        const {
          type,
          data: { time },
        } = newCacheData[key];
        const cloudData = res[key];
        if (!cloudData) {
          if (type !== SyncType.REMOVE) {
            syncCloudData[key] = newCacheData[key];
          } else {
            // 删除数据
            delete newCacheData[key];
          }
        } else {
          // 删除掉已经比较的key
          needSyncKeys.splice(needSyncKeys.indexOf(key), 1);
          const { time: cloundTime, data: cloudValue } = cloudData;

          // 如果云端的时间大，则同步到本地
          if (cloundTime > time) {
            if (cloudValue) {
              // 同步本地数据
              syncLocalData[key] = { status: 1, type: SyncType.UPDATE, data: cloudData };
            } else {
              // 同步本地数据
              syncLocalData[key] = { status: 1, type: SyncType.REMOVE, data: cloudData };
            }
          } else if (cloundTime < time) {
            // 需要同步数据到云端
            syncCloudData[key] = newCacheData[key];
          } else {
            // 云端数据直接同步到本地数据
            newCacheData[key] = { status: 1, type: SyncType.UPDATE, data: cloudData };
            StorageUtils.setDevItem(LOCAL_DATA_KEY, newCacheData);
          }
        }
      });
      // 需要添加的数据
      if (needSyncKeys.length) {
        needSyncKeys.forEach(key => {
          syncLocalData[key] = { status: 1, type: SyncType.UPDATE, data: res[key] };
        });
      }
      // 同步数据, 触发同步数据事件
      handleSyncCloudData(syncCloudData, syncLocalData);
    });
  });
};

/**
 * @description: 获取设备属性云端数据(优先取缓存数据)
 */
const fetchCloudConfig = async (): Promise<Record<string, any>> => {
  // 获取配置缓存数据
  const cacheData = (await StorageUtils.getDevItem(LOCAL_DATA_KEY)) || {};
  // 存在缓存数据，优先以缓存数据显示
  if (cacheData) {
    // 同步数据
    syncCloudConfig();
    return Promise.resolve(formateCacheData(cacheData));
  }
  return getAllCloudConfig().then(data => {
    const result: any = {};
    Object.keys(data).forEach(key => {
      const target = data[key];
      result[key] = { status: 1, type: SyncType.UPDATE, data: target };
    });
    StorageUtils.setDevItem(LOCAL_DATA_KEY, result);
    return formateCacheData(result);
  });
};

/**
 * @description: 获取设备属性云端数据(只获取云端数据)
 * @param {boolean} needCache 是否缓存, 默认true
 */
const fetchOnlyCloudConfig = async (needCache = true): Promise<Record<string, any>> => {
  return getAllCloudConfig().then(data => {
    const result: any = {};
    Object.keys(data).forEach(key => {
      const target = data[key];
      result[key] = { status: 1, type: SyncType.UPDATE, data: target };
    });
    if (needCache) {
      StorageUtils.setDevItem(LOCAL_DATA_KEY, result);
    }
    return formateCacheData(result);
  });
};

export default {
  getCloudFun,
  startVoice,
  stopVoice,
  getAllCloudConfig,
  saveCloudConfig,
  deleteCloudConfig,
  fetchLocalConfig,
  syncCloudConfig,
  fetchCloudConfig,
  fetchOnlyCloudConfig,
};
