import { TYSdk } from 'tuya-panel-kit';
import { Observable } from 'rxjs';
import _isUndefined from 'lodash/isUndefined';
import _isFunction from 'lodash/isFunction';

import CustomError from '../CustomError';
import logger from '../LoggerUtils';

/**
 * 按顺序执行Promise，等待前一个Promise完成，再执行下一个。
 *
 * @param {Array} promises
 * @returns {Array | undefined}
 */
export async function sequencePromise(...promises: any[]) {
  const { length } = promises;
  if (length === 0) return;
  if (length === 1) return [await promises[0]()];
  const results = [];
  for (let index = 0; index < length; index++) {
    // eslint-disable-next-line no-await-in-loop
    results.push(await promises[index]());
  }
  return results;
}

export function handleError(e: Error): void {
  CustomError.handleError(e);
}

/** 创建单例 */
export const createSingleton = (createInstance: () => any): any => {
  let instance: any;
  return () => {
    if (instance) return instance;
    if (!instance) {
      instance = createInstance();
    }
    return instance;
  };
};

/**
 * 等待下一个符合期待的dp值
 *
 * @param {ExpectValues[]} expectValues
 */

type ExpectValues = {
  dpCode: string;
  value?: any;
  comparator?: (dpValue: any) => boolean;
};

interface expectValuesOpts {
  onError?: (e: Error) => void; // 如果传入处理错误方式，错误处理都走这个
}

export function awaitExpectDpsState(
  expectValues: ExpectValues[],
  timeOut = 32000,
  opts: expectValuesOpts = {}
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    let flag = 0;
    let timeCheck = 0;
    const nowTime = new Date().getTime();
    // const timeOut = 1;

    const handle = (deviceData: any) => {
      const { type, payload: data } = deviceData;

      try {
        if (type === 'dpData') {
          expectValues.forEach(({ dpCode, value, comparator }) => {
            // 一项dp符合期望时flag+1，flag大于0且不符合期望时-1；直到flag === 期望dp数量
            if (_isUndefined(data[dpCode])) return;
            if (_isFunction(comparator)) {
              if (comparator(data[dpCode])) flag++;
              if (!comparator(data[dpCode]) && flag !== 0) flag--;
            } else {
              if (data[dpCode] === value) flag++;
              if (data[dpCode] !== value && flag !== 0) flag--;
            }
          });
        }

        if (flag === expectValues.length) {
          resolve(true);
          TYSdk.event.remove('deviceDataChange', handle);
          clearInterval(timeCheck);
        }
      } catch (error) {
        TYSdk.event.remove('deviceDataChange', handle);
        clearInterval(timeCheck);
        if (opts.onError) {
          opts.onError(error);
          return;
        }
        resolve(false);
      }
    };
    TYSdk.event.on('deviceDataChange', handle);

    timeCheck = setInterval(() => {
      if (new Date().getTime() - nowTime >= timeOut) {
        logger.info('dp上报超时，取消等待');
        TYSdk.event.remove('deviceDataChange', handle);
        clearInterval(timeCheck);
        if (opts.onError) {
          opts.onError(new Error('DpTimeOut'));
          return;
        }
        resolve(false);
      }
    });
  });
}

/**
 * 等待下一个符合期待的值
 *
 * @param {ExpectValues[]} expectValues
 */
export function awaitExpectMapStoreState(
  expectValues: ExpectValues[],
  timeOut = 32000
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    let flag = 0;
    let timeCheck = 0;
    const nowTime = new Date().getTime();

    const handle = (data: any) => {
      expectValues.forEach(({ key, value, comparator }) => {
        // 一项key符合期望时flag+1，flag大于0且不符合期望时-1；直到flag === 期望dp数量
        if (_isUndefined(data[key])) return;
        if (_isFunction(comparator)) {
          if (comparator(data[key])) flag++;
          if (!comparator(data[key]) && flag !== 0) flag--;
        } else {
          if (data[key] === value) flag++;
          if (data[key] !== value && flag !== 0) flag--;
        }
      });

      if (flag === expectValues.length) {
        resolve(true);
        TYSdk.event.remove('robot_receive_mapStateChange', handle);
        clearInterval(timeCheck);
      }
    };
    TYSdk.event.on('robot_receive_mapStateChange', handle);
    // TYSdk.event.emit('robot_await_mapStateChange', handle);

    timeCheck = setInterval(() => {
      if (new Date().getTime() - nowTime >= timeOut) {
        logger.info('等待oss数据超时，取消等待');
        TYSdk.event.remove('robot_receive_mapStateChange', handle);
        clearInterval(timeCheck);
        resolve(false);
      }
    });
  });
}

/**
 * 缓存方法
 * @param fn 函数
 * @param resolve
 */
export function memorize<T>(fn: any, resolve?: (...params: any[]) => any): unknown {
  const toStr = Object.prototype.toString;
  const isFunction = (f: any) => {
    return typeof f === 'function' && toStr.call(f) === '[object Function]';
  };
  const isAsyncFunction = (f: any) => {
    return typeof f === 'function' && toStr.call(f) === '[object AsyncFunction]';
  };

  const isValid = (value: any) => typeof value !== 'undefined';

  if (!isFunction(fn)) {
    throw new TypeError('memorize: when provided, the first argument must be a function');
  }
  const cache: { [index: string]: any } = {};

  function result(...args: any) {
    if (args.length < 1) {
      throw new TypeError('memorize: arguments cannot be null or undefined');
    }
    const key = resolve
      ? resolve(...args)
      : args.length === 1
      ? `${args[0]}`
      : JSON.stringify(args);
    cache[key] = (isValid(cache[key]) && cache[key]) || fn.apply(fn, args);

    return cache[key] as T;
  }

  if (isAsyncFunction(fn)) {
    return async function (...args: any) {
      return result(...args);
    };
  }

  return result;
}

/**
 * 创建错误Json格式
 * @param message 信息
 * @param data 数据
 */
export function createJsonError(message: string, data: string) {
  return new Error(JSON.stringify({ message, data }));
}

/**
 * 创建单例
 * @param ClassObj 类
 * @param params 参数
 */
export function getClassSingletonInstance<T>(ClassObj: any, ...params: any[]) {
  const name = '__instance__';
  if (ClassObj[name]) {
    return ClassObj[name] as T;
  }
  ClassObj[name] = new ClassObj(...params);

  return ClassObj[name] as T;
}

/**
 * 统计消耗时间
 * @param fn 方法
 * @param key 名称
 */
export function CoastTime(fn: (...args: any[]) => any, key: string) {
  return (...args) => {
    const startTime = new Date();
    const res = fn(...args);
    const endTime = new Date();
    console.log(`coastTime-${key}`, endTime - startTime);
    return res;
  };
}

/**
 * 是否为数字
 * @param obj
 */
export function isNumber(obj: unknown): boolean {
  return typeof obj === 'number' && !isNaN(obj);
}

/**
 * 是否为错误
 * @param value
 */
export function isNotError(value: unknown): boolean {
  if (value instanceof Error) {
    handleError(value);
    return false;
  }
  return true;
}
/**
 * Rx错误处理
 * @param error
 */
export function extractError(error: Error) {
  return Observable.of(error);
}
