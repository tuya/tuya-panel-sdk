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

const setItem = async (key: string, value: any): Promise<any> => {
  const data = { value, type: typeof value };
  const jsonValue = JSON.stringify(data);
  return new Promise((resolve, reject) => {
    AsyncStorage.setItem(key, jsonValue, err => {
      if (err) {
        reject(err);
        return;
      }
      resolve(null);
    });
  });
};

const setDevItem = async (name: string, value: any): Promise<any> => {
  const key = getDevKey(name);
  return setItem(key, value);
};

const setPidItem = async (name: string, value: any): Promise<any> => {
  const key = getPidKey(name);
  return setItem(key, value);
};

const setUiItem = async (name: string, value: any): Promise<any> => {
  const key = getUiKey(name);
  return setItem(key, value);
};

const getItem = async (key: string): Promise<any> => {
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
};

const getDevItem = async (name: string): Promise<any> => {
  const key = getDevKey(name);
  return getItem(key);
};

const getPidItem = async (name: string): Promise<any> => {
  const key = getPidKey(name);
  return getItem(key);
};

const getUiItem = async (name: string): Promise<any> => {
  const key = getUiKey(name);
  return getItem(key);
};

const removeItem = async (key: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    AsyncStorage.removeItem(key, err => {
      if (err) {
        reject(err);
        return;
      }
      resolve(null);
    });
  });
};

const removeDevItem = async (name: string): Promise<any> => {
  const key = getDevKey(name);
  return removeItem(key);
};

const removePidItem = async (name: string): Promise<any> => {
  const key = getDevKey(name);
  return removeItem(key);
};

const removeUiItem = async (name: string): Promise<any> => {
  const key = getUiKey(name);
  return removeItem(key);
};

export default {
  setItem,
  setDevItem,
  setPidItem,
  setUiItem,
  getItem,
  getDevItem,
  getPidItem,
  getUiItem,
  removeItem,
  removeDevItem,
  removePidItem,
  removeUiItem,
};
