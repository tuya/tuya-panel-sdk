import { NativeModules } from 'react-native';
const _TYDeviceDevice = NativeModules.TYRCTDeviceModule || NativeModules.TYRCTPanelManager;

const type = (val: any) => Object.prototype.toString.call(val).slice(8, -1).toLowerCase();

export const parseJson = (str: string) => {
  let result;
  if (str && type(str) === 'string') {
    // as jsonstring
    try {
      result = JSON.parse(str);
    } catch (parseError) {
      // error! use eval
      try {
        // eslint-disable-next-line no-eval
        result = eval(`(${str})`);
      } catch (evalError) {
        // normal string
        result = str;
      }
    }
  } else {
    result = typeof str === 'undefined' ? {} : str;
  }
  return result;
};

const sucStyle = 'background: green; color: #fff;';
const errStyle = 'background: red; color: #fff;';

export const apiRequest = <T>(
  a: string,
  postData: Record<string, any>,
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  v: string = '1.0'
): Promise<T> =>
  new Promise((resolve, reject) => {
    _TYDeviceDevice.apiRNRequest(
      {
        a,
        postData,
        v,
      },
      (d: any) => {
        const data = parseJson(d);
        if (__DEV__) {
          console.info(`API Success: %c${a}%o`, sucStyle, data);
        }
        resolve(data);
      },
      (err: any) => {
        const e = parseJson(err);
        if (__DEV__) {
          console.info(`API Failed: %c${a}%o`, errStyle, e.message || e.errorMsg || e);
        }
        reject(e);
      }
    );
  });

export const empty = ['0.00', '#', null, undefined, '', '0.0', '0', 0]; // 异常值

/**
 * @description 图表数据继承
 * @param source 图表数据源
 * @param needWrap 是否需要转化
 * @returns
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const wrapCharData = (source: Record<string, any>, needWrap = false) => {
  if (!needWrap) return source;
  const value = Object.values(source);
  const keys = Object.keys(source);
  const index1 = value.findIndex(d => !empty.includes(d)); // 找出第一个非空值
  const index2 = value.length - value.reverse().findIndex(d => !empty.includes(d)); // 找出最后一个非空值
  const targetArr = value.reverse().slice(index1, index2);
  const emptyArr1 = value.slice(0, index1).map(_ => '#'); // 异常数据统一转成#
  const emptyArr2 = value.slice(index2).map(_ => '#'); // 异常数据统一转成#
  const defaultValue = targetArr[0]; // 默认值
  const result = targetArr.reduce<any[]>((memo, item, index) => {
    if (empty.includes(item)) {
      // eslint-disable-next-line no-param-reassign
      memo = [...memo, memo[index - 1] || defaultValue];
      return memo;
    }
    // eslint-disable-next-line no-param-reassign
    memo = [...memo, item];
    return memo;
  }, []);
  const wrapResult = [...emptyArr1, ...result, ...emptyArr2]; // 组成新数组
  const target = wrapResult.reduce<Record<string, any>>((memo, item, index) => {
    // eslint-disable-next-line no-param-reassign
    memo = {
      ...memo,
      [keys[index]]: item,
    };
    return memo;
  }, {});

  return target;
};
