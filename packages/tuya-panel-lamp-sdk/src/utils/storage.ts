/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { AsyncStorage } from 'react-native';
import { TYSdk } from 'tuya-panel-kit';

const getDevKey = (name: string) => {
  const { devId } = TYSdk.devInfo;
  return `${devId}_${name}`;
};

const getPidKey = (name: string) => {
  const { productId } = TYSdk.devInfo;
  return `${productId}_${name}`;
};

const getUiKey = (name: string) => {
  const { uiId } = TYSdk.devInfo;
  return `${uiId}_${name}`;
};

export default {
  async setItem(key: string, value: any) {
    const data = { value, type: typeof value };
    const jsonValue = JSON.stringify(data);
    return new Promise((resolve, reject) => {
      AsyncStorage.setItem(key, jsonValue, err => {
        if (err) {
          reject(err);
          return;
        }
        resolve('');
      });
    });
  },
  async setDevItem(name: string, value: any) {
    const key = getDevKey(name);
    return this.setItem(key, value);
  },
  async setPidItem(name: string, value: any) {
    const key = getPidKey(name);
    return this.setItem(key, value);
  },
  async setUiItem(name: string, value: any) {
    const key = getUiKey(name);
    return this.setItem(key, value);
  },
  async getItem(key: string) {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(key, (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        if (data) {
          resolve(JSON.parse(data).value);
        }
        resolve(null);
      });
    });
  },
  async getDevItem(name: string) {
    const key = getDevKey(name);
    return this.getItem(key);
  },
  async getPidItem(name: string) {
    const key = getPidKey(name);
    return this.getItem(key);
  },
  async getUiItem(name: string) {
    const key = getUiKey(name);
    return this.getItem(key);
  },
  async removeItem(key: string) {
    return new Promise((resolve, reject) => {
      AsyncStorage.removeItem(key, err => {
        if (err) {
          reject(err);
          return;
        }
        resolve('');
      });
    });
  },

  async removeDevItem(name: string) {
    const key = getDevKey(name);
    return this.removeItem(key);
  },

  async removePidItem(name: string) {
    const key = getDevKey(name);
    return this.removeItem(key);
  },
  async removeUiItem(name: string) {
    const key = getUiKey(name);
    return this.removeItem(key);
  },
};
